import { runtimeEnv } from '../env';
import { siteCheckAiStatus, type AiProvider } from '../site-check';
import { buildKnowledgePack, matchFaq } from './knowledge';
import { getChatAgent } from './agents';

export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatCtaId = 'assessment' | 'site-check' | 'breach-check' | 'contact' | 'call';

export type ChatCta = {
  id: ChatCtaId;
  label: string;
  href: string;
};

const MAX_HISTORY = 8;
const MAX_MESSAGE_CHARS = 800;

const DEFAULT_MODELS: Record<AiProvider, string> = {
  gemini: 'gemini-3.5-flash-lite',
  openai: 'gpt-4o-mini',
  anthropic: 'claude-haiku-4-5-20251001',
};

function modelFor(provider: AiProvider): string {
  return runtimeEnv('CHAT_AI_MODEL') || runtimeEnv('SITE_CHECK_AI_MODEL') || DEFAULT_MODELS[provider];
}

function configuredProvider(): AiProvider | null {
  const forced = (runtimeEnv('CHAT_AI_PROVIDER') || runtimeEnv('SITE_CHECK_AI_PROVIDER') || '').toLowerCase();
  if (forced === 'gemini' || forced === 'openai' || forced === 'anthropic') return forced;
  return siteCheckAiStatus().provider;
}

export function chatAiStatus() {
  const status = siteCheckAiStatus();
  return {
    ...status,
    provider: configuredProvider(),
  };
}

export function normalizeChatLocale(value?: string): 'en' | 'es' {
  return value === 'es' ? 'es' : 'en';
}

export function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  const out: ChatMessage[] = [];
  for (const item of input) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as { role?: string }).role;
    const content = (item as { content?: string }).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const trimmed = content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (!trimmed) continue;
    out.push({ role, content: trimmed });
    if (out.length >= MAX_HISTORY) break;
  }
  return out;
}

export function extractEmail(...parts: Array<string | undefined>): string | null {
  const blob = parts.filter(Boolean).join(' ');
  const match = blob.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0].toLowerCase() : null;
}

function systemPrompt(locale: 'en' | 'es', agentId?: string | null): string {
  const agent = getChatAgent(agentId);
  const knowledge = buildKnowledgePack(locale);
  if (locale === 'es') {
    const humanAsk = agent.gender === 'm' ? 'si eres humano' : 'si eres humana';
    const liveRole = agent.gender === 'm' ? 'ingeniero en vivo' : 'ingeniera en vivo';
    return `Eres ${agent.name}, guía con IA del sitio web de Cybercon Solutions. Habla en primera persona como ${agent.name}: cálido/a, claro/a y profesional.
Responde en español, de forma breve (2–4 frases).
Nunca inventes precios, certificaciones ni clientes.
Si el visitante quiere precios, una propuesta o ayuda con TI, invita a la evaluación gratuita o a llamar.
Si preguntan algo fuera de alcance, dilo y ofrece evaluación o contacto.
Deja claro con naturalidad que eres una guía con IA cuando pregunten ${humanAsk}; no digas que eres ${liveRole}.

Conocimiento permitido:
${knowledge}`;
  }

  return `You are ${agent.name}, the AI guide for the Cybercon Solutions website. Speak in the first person as ${agent.name}: warm, clear, and professional.
Reply in English, briefly (2–4 sentences).
Never invent prices, certifications, or customers.
If the visitor wants pricing, a proposal, or IT help, invite the free assessment or a phone call.
If asked something out of scope, say so and offer the assessment or contact.
If asked whether you are human, say naturally that you are Cybercon’s AI guide — do not claim to be a live engineer.

Allowlisted knowledge:
${knowledge}`;
}

function fallbackReply(locale: 'en' | 'es', userMessage: string): { reply: string; ctaIds: ChatCtaId[] } {
  const faq = matchFaq(userMessage, locale);
  if (faq) {
    return { reply: faq[locale], ctaIds: faq.ctas ?? ['assessment'] };
  }

  if (locale === 'es') {
    return {
      reply:
        'Puedo ayudarte con lo básico sobre Cybercon: servicios, zona de cobertura y cómo empezar. Para precios o un plan a tu medida, lo mejor es la evaluación gratuita — respondemos en un día hábil.',
      ctaIds: ['assessment', 'contact'],
    };
  }

  return {
    reply:
      'I can help with the basics on Cybercon — services, service area, and how to get started. For pricing or a tailored plan, the free assessment is the best next step. We reply within one business day.',
    ctaIds: ['assessment', 'contact'],
  };
}

function intentCtas(userMessage: string, reply: string): ChatCtaId[] {
  const blob = `${userMessage} ${reply}`.toLowerCase();
  const ids: ChatCtaId[] = [];
  const push = (id: ChatCtaId) => {
    if (!ids.includes(id)) ids.push(id);
  };

  if (/site check|website check|revisi[oó]n.*(sitio|web)|#site-check/.test(blob)) push('site-check');
  if (/breach|filtraci[oó]n|hibp|#breach-check/.test(blob)) push('breach-check');
  if (/assess|evaluaci[oó]n|pric|cost|precio|cu[aá]nto|quote|budget/.test(blob)) push('assessment');
  if (/call|phone|llamar|tel[eé]fono/.test(blob)) push('call');
  if (/contact|contacto|email|correo/.test(blob)) push('contact');

  if (ids.length === 0) push('assessment');
  return ids.slice(0, 3);
}

export function resolveCtas(locale: 'en' | 'es', ids: ChatCtaId[]): ChatCta[] {
  const prefix = locale === 'es' ? '/es' : '';
  const labels =
    locale === 'es'
      ? {
          assessment: 'Reservar evaluación gratuita',
          'site-check': 'Revisión gratuita del sitio',
          'breach-check': 'Revisión de filtraciones',
          contact: 'Contactar',
          call: 'Llamar',
        }
      : {
          assessment: 'Book free assessment',
          'site-check': 'Run free site check',
          'breach-check': 'Run breach check',
          contact: 'Contact us',
          call: 'Call us',
        };

  const hrefs: Record<ChatCtaId, string> = {
    assessment: `${prefix}/assessment/`,
    'site-check': `${prefix}/services/web-design-development/#site-check`,
    'breach-check': `${prefix}/services/cybersecurity/#breach-check`,
    contact: `${prefix}/contact/`,
    call: 'tel:+13053205335',
  };

  return ids.map((id) => ({ id, label: labels[id], href: hrefs[id] }));
}

async function replyWithGemini(
  locale: 'en' | 'es',
  messages: ChatMessage[],
  agentId?: string | null,
): Promise<string | null> {
  const apiKey = runtimeEnv('GEMINI_API_KEY');
  if (!apiKey) return null;
  const model = modelFor('gemini');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt(locale, agentId) }] },
      contents,
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 512,
      },
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) {
    console.error('[chat] gemini error', res.status, (await res.text()).slice(0, 400));
    return null;
  }

  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim();
  return text || null;
}

async function replyWithOpenAI(
  locale: 'en' | 'es',
  messages: ChatMessage[],
  agentId?: string | null,
): Promise<string | null> {
  const apiKey = runtimeEnv('OPENAI_API_KEY');
  if (!apiKey) return null;
  const model = modelFor('openai');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: 400,
      messages: [{ role: 'system', content: systemPrompt(locale, agentId) }, ...messages],
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) {
    console.error('[chat] openai error', res.status, (await res.text()).slice(0, 400));
    return null;
  }

  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return json.choices?.[0]?.message?.content?.trim() || null;
}

async function replyWithAnthropic(
  locale: 'en' | 'es',
  messages: ChatMessage[],
  agentId?: string | null,
): Promise<string | null> {
  const apiKey = runtimeEnv('ANTHROPIC_API_KEY');
  if (!apiKey) return null;
  const model = modelFor('anthropic');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      temperature: 0.35,
      system: systemPrompt(locale, agentId),
      messages: messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) {
    console.error('[chat] anthropic error', res.status, (await res.text()).slice(0, 400));
    return null;
  }

  const json = (await res.json()) as { content?: Array<{ type?: string; text?: string }> };
  const text = json.content?.filter((c) => c.type === 'text').map((c) => c.text ?? '').join('').trim();
  return text || null;
}

export async function generateChatReply(
  locale: 'en' | 'es',
  messages: ChatMessage[],
  agentId?: string | null,
): Promise<{ reply: string; ctas: ChatCta[]; provider: AiProvider | 'faq' }> {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  const provider = configuredProvider();

  let reply: string | null = null;
  if (provider === 'gemini') reply = await replyWithGemini(locale, messages, agentId);
  else if (provider === 'openai') reply = await replyWithOpenAI(locale, messages, agentId);
  else if (provider === 'anthropic') reply = await replyWithAnthropic(locale, messages, agentId);

  if (reply) {
    return {
      reply,
      ctas: resolveCtas(locale, intentCtas(lastUser, reply)),
      provider,
    };
  }

  const faq = fallbackReply(locale, lastUser);
  return {
    reply: faq.reply,
    ctas: resolveCtas(locale, faq.ctaIds),
    provider: 'faq',
  };
}

export function shouldAskEmail(messages: ChatMessage[], knownEmail: string | null): boolean {
  if (knownEmail) return false;
  const userTurns = messages.filter((m) => m.role === 'user').length;
  return userTurns >= 2;
}
