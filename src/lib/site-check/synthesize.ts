import { runtimeEnv } from '../env';
import type { BuiltWithEvidence, LiveEvidence, SiteCheckLocale, SiteCheckResult } from './types';
import { buildPrompt, extractJsonObject, normalizeResult } from './prompt';

export type AiProvider = 'gemini' | 'openai' | 'anthropic';

const DEFAULT_MODELS: Record<AiProvider, string> = {
  // Flash Lite: cheap + available to new Gemini API keys. Override with SITE_CHECK_AI_MODEL.
  gemini: 'gemini-3.5-flash-lite',
  openai: 'gpt-4o-mini',
  anthropic: 'claude-haiku-4-5-20251001',
};

function configuredProvider(): AiProvider | null {
  const forced = (runtimeEnv('SITE_CHECK_AI_PROVIDER') || '').toLowerCase();
  if (forced === 'gemini' || forced === 'openai' || forced === 'anthropic') {
    return forced;
  }

  // Auto: prefer Gemini (search grounding + cost), then OpenAI, then Anthropic.
  if (runtimeEnv('GEMINI_API_KEY')) return 'gemini';
  if (runtimeEnv('OPENAI_API_KEY')) return 'openai';
  if (runtimeEnv('ANTHROPIC_API_KEY')) return 'anthropic';
  return null;
}

export function siteCheckAiConfigured(): boolean {
  return configuredProvider() !== null;
}

export function siteCheckAiStatus(): {
  provider: AiProvider | null;
  gemini: boolean;
  openai: boolean;
  anthropic: boolean;
} {
  return {
    provider: configuredProvider(),
    gemini: Boolean(runtimeEnv('GEMINI_API_KEY')),
    openai: Boolean(runtimeEnv('OPENAI_API_KEY')),
    anthropic: Boolean(runtimeEnv('ANTHROPIC_API_KEY')),
  };
}

function modelFor(provider: AiProvider): string {
  return runtimeEnv('SITE_CHECK_AI_MODEL') || DEFAULT_MODELS[provider];
}

function normalizeLocale(locale?: string): SiteCheckLocale {
  return locale === 'es' ? 'es' : 'en';
}

/** Tier-3 synthesis via Gemini, OpenAI, or Anthropic (whichever is configured). */
export async function synthesizeWithAi(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
  locale?: string,
): Promise<SiteCheckResult | null> {
  const provider = configuredProvider();
  if (!provider) return null;
  const loc = normalizeLocale(locale);

  try {
    if (provider === 'gemini') return await synthesizeGemini(domain, live, builtWith, loc);
    if (provider === 'openai') return await synthesizeOpenAI(domain, live, builtWith, loc);
    return await synthesizeAnthropic(domain, live, builtWith, loc);
  } catch (err) {
    console.error(`[site-check] ${provider} synthesis failed`, err);
    return null;
  }
}

async function synthesizeGemini(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
  locale: SiteCheckLocale,
): Promise<SiteCheckResult | null> {
  const apiKey = runtimeEnv('GEMINI_API_KEY');
  if (!apiKey) return null;

  const model = modelFor('gemini');
  const prompt = buildPrompt(domain, live, builtWith, { allowSearch: true, locale });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }],
      generationConfig: {
        temperature: 0.2,
        // Headroom for models that spend tokens on internal "thinking".
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('[site-check] gemini error', res.status, errText.slice(0, 500));
    // Retry without search grounding if the tool/model rejects the request.
    if (res.status === 400 || res.status === 404) {
      return synthesizeGeminiPlain(domain, live, builtWith, apiKey, model, locale);
    }
    return null;
  }

  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = (json.candidates?.[0]?.content?.parts ?? [])
    .map((p) => p.text)
    .filter(Boolean)
    .join('\n');
  // Search grounding sometimes returns an empty candidate set — fall back to plain.
  if (!text) {
    console.warn('[site-check] gemini search returned no text; retrying without grounding');
    return synthesizeGeminiPlain(domain, live, builtWith, apiKey, model, locale);
  }
  return normalizeResult(extractJsonObject(text), domain, live, builtWith.tech_chips, locale);
}

async function synthesizeGeminiPlain(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
  apiKey: string,
  model: string,
  locale: SiteCheckLocale,
): Promise<SiteCheckResult | null> {
  const prompt = buildPrompt(domain, live, builtWith, { allowSearch: false, locale });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    }),
    signal: AbortSignal.timeout(45000),
  });
  if (!res.ok) {
    console.error('[site-check] gemini plain error', res.status, await res.text());
    return null;
  }
  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = (json.candidates?.[0]?.content?.parts ?? [])
    .map((p) => p.text)
    .filter(Boolean)
    .join('\n');
  if (!text) return null;
  return normalizeResult(extractJsonObject(text), domain, live, builtWith.tech_chips, locale);
}

async function synthesizeOpenAI(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
  locale: SiteCheckLocale,
): Promise<SiteCheckResult | null> {
  const apiKey = runtimeEnv('OPENAI_API_KEY');
  if (!apiKey) return null;

  const model = modelFor('openai');
  const prompt = buildPrompt(domain, live, builtWith, { allowSearch: true, locale });

  // Prefer Responses API with web_search; fall back to chat completions.
  const responsesRes = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
      tools: [{ type: 'web_search_preview' }],
      temperature: 0.2,
      max_output_tokens: 1000,
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (responsesRes.ok) {
    const json = (await responsesRes.json()) as {
      output_text?: string;
      output?: { type?: string; content?: { type?: string; text?: string }[] }[];
    };
    let text = json.output_text ?? '';
    if (!text && Array.isArray(json.output)) {
      text = json.output
        .flatMap((item) => item.content ?? [])
        .filter((c) => c.type === 'output_text' || c.text)
        .map((c) => c.text ?? '')
        .join('\n');
    }
    if (text) {
      return normalizeResult(extractJsonObject(text), domain, live, builtWith.tech_chips, locale);
    }
  } else {
    const errText = await responsesRes.text();
    console.warn('[site-check] openai responses failed, trying chat', responsesRes.status, errText.slice(0, 300));
  }

  const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'Return only valid JSON for the website health check schema.',
        },
        {
          role: 'user',
          content: buildPrompt(domain, live, builtWith, { allowSearch: false, locale }),
        },
      ],
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!chatRes.ok) {
    console.error('[site-check] openai chat error', chatRes.status, await chatRes.text());
    return null;
  }

  const chatJson = (await chatRes.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = chatJson.choices?.[0]?.message?.content;
  if (!text) return null;
  return normalizeResult(extractJsonObject(text), domain, live, builtWith.tech_chips, locale);
}

async function synthesizeAnthropic(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
  locale: SiteCheckLocale,
): Promise<SiteCheckResult | null> {
  const apiKey = runtimeEnv('ANTHROPIC_API_KEY');
  if (!apiKey) return null;

  const model = modelFor('anthropic');
  const body = {
    model,
    max_tokens: 1000,
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 2,
      },
    ],
    messages: [
      { role: 'user', content: buildPrompt(domain, live, builtWith, { allowSearch: true, locale }) },
    ],
  };

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('[site-check] anthropic error', res.status, errText.slice(0, 500));
    if (res.status === 400 && /web_search|tool/i.test(errText)) {
      return synthesizeAnthropicPlain(domain, live, builtWith, apiKey, model, locale);
    }
    return null;
  }

  const json = (await res.json()) as { content?: { type: string; text?: string }[] };
  const text = (json.content ?? [])
    .filter((c) => c.type === 'text' && c.text)
    .map((c) => c.text)
    .join('\n');
  if (!text) return null;
  return normalizeResult(extractJsonObject(text), domain, live, builtWith.tech_chips, locale);
}

async function synthesizeAnthropicPlain(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
  apiKey: string,
  model: string,
  locale: SiteCheckLocale,
): Promise<SiteCheckResult | null> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: buildPrompt(domain, live, builtWith, { allowSearch: false, locale }),
        },
      ],
    }),
    signal: AbortSignal.timeout(45000),
  });
  if (!res.ok) {
    console.error('[site-check] anthropic plain error', res.status, await res.text());
    return null;
  }
  const json = (await res.json()) as { content?: { type: string; text?: string }[] };
  const text = (json.content ?? [])
    .filter((c) => c.type === 'text' && c.text)
    .map((c) => c.text)
    .join('\n');
  if (!text) return null;
  return normalizeResult(extractJsonObject(text), domain, live, builtWith.tech_chips, locale);
}
