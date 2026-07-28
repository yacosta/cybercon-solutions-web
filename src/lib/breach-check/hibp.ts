import { runtimeEnv } from '../env';
import { maskEmail } from './mask';
import type { BreachCheckResult, BreachItem, BreachStatus, HibpBreach } from './types';

const HIBP_BASE = 'https://haveibeenpwned.com/api/v3';
const USER_AGENT = 'Cybercon-Solutions-Web (cybercon-solutions.com; breach-check widget)';
const MAX_BREACHES_SHOWN = 5;

export function hibpConfigured(): boolean {
  return Boolean(runtimeEnv('HIBP_API_KEY')?.trim());
}

function statusForCount(count: number): BreachStatus {
  if (count <= 0) return 'clear';
  if (count <= 2) return 'exposed';
  return 'elevated';
}

function statusLabel(status: BreachStatus, locale: 'en' | 'es'): string {
  if (locale === 'es') {
    if (status === 'clear') return 'Sin filtraciones conocidas';
    if (status === 'exposed') return 'Exposición detectada';
    return 'Exposición elevada';
  }
  if (status === 'clear') return 'No known breaches';
  if (status === 'exposed') return 'Exposure detected';
  return 'Elevated exposure';
}

function summarize(
  status: BreachStatus,
  count: number,
  locale: 'en' | 'es',
): { summary: string; finding: string } {
  if (locale === 'es') {
    if (status === 'clear') {
      return {
        summary: 'Have I Been Pwned no tiene filtraciones conocidas para esta dirección.',
        finding:
          'Una búsqueda limpia no significa riesgo cero — contraseñas reutilizadas, phishing y filtraciones futuras siguen importando. Podemos revisar MFA, identidad y monitoreo contigo.',
      };
    }
    return {
      summary: `Have I Been Pwned reporta ${count} filtración${count === 1 ? '' : 'es'} conocida${count === 1 ? '' : 's'} para esta dirección.`,
      finding:
        count >= 3
          ? 'Varias filtraciones aumentan el riesgo de reutilización de contraseñas y toma de cuentas. Prioriza rotación de credenciales, MFA y un plan de respuesta.'
          : 'Esta dirección aparece en filtraciones conocidas. Revisa dónde se reutilizó la contraseña y activa MFA en cuentas de trabajo.',
    };
  }

  if (status === 'clear') {
    return {
      summary: 'Have I Been Pwned has no known breaches for this address.',
      finding:
        'A clean lookup is not zero risk — password reuse, phishing, and future breaches still matter. We can review MFA, identity, and monitoring with you.',
    };
  }

  return {
    summary: `Have I Been Pwned reports ${count} known breach${count === 1 ? '' : 'es'} for this address.`,
    finding:
      count >= 3
        ? 'Multiple breaches raise the odds of password reuse and account takeover. Prioritize credential rotation, MFA, and a response plan.'
        : 'This address appears in known breaches. Check where that password was reused and turn on MFA for work accounts.',
  };
}

function mapBreach(raw: HibpBreach): BreachItem | null {
  const name = (raw.Name || '').trim();
  if (!name) return null;
  return {
    name,
    title: (raw.Title || name).trim(),
    breachDate: raw.BreachDate || null,
    dataClasses: Array.isArray(raw.DataClasses) ? raw.DataClasses.filter(Boolean) : [],
    isVerified: Boolean(raw.IsVerified),
    isSensitive: Boolean(raw.IsSensitive),
  };
}

function buildResult(
  email: string,
  breaches: BreachItem[],
  locale: 'en' | 'es',
): BreachCheckResult {
  const sorted = [...breaches].sort((a, b) => {
    const da = a.breachDate || '';
    const db = b.breachDate || '';
    return db.localeCompare(da);
  });
  const shown = sorted.slice(0, MAX_BREACHES_SHOWN);
  const status = statusForCount(sorted.length);
  const { summary, finding } = summarize(status, sorted.length, locale);

  return {
    email_masked: maskEmail(email),
    breach_count: sorted.length,
    status,
    status_label: statusLabel(status, locale),
    one_line_summary: summary,
    top_finding: finding,
    breaches: shown,
    additional_breach_count: Math.max(0, sorted.length - shown.length),
    hibp_checked: true,
  };
}

export type HibpLookupOutcome =
  | { ok: true; result: BreachCheckResult }
  | { ok: false; error: string; status?: number };

/** Query HIBP breachedAccount for a single email (server-side only). */
export async function lookupBreachedAccount(
  email: string,
  locale: 'en' | 'es',
): Promise<HibpLookupOutcome> {
  const apiKey = runtimeEnv('HIBP_API_KEY')?.trim();
  if (!apiKey) {
    return { ok: false, error: 'HIBP_API_KEY not configured', status: 503 };
  }

  const url = `${HIBP_BASE}/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'hibp-api-key': apiKey,
        'user-agent': USER_AGENT,
        accept: 'application/json',
      },
      signal: AbortSignal.timeout(12000),
    });

    if (res.status === 404) {
      return { ok: true, result: buildResult(email, [], locale) };
    }

    if (res.status === 401 || res.status === 403) {
      console.error('[breach-check] HIBP auth failed', res.status, await res.text());
      return { ok: false, error: 'HIBP authorization failed', status: 502 };
    }

    if (res.status === 429) {
      const retryAfter = res.headers.get('retry-after');
      console.warn('[breach-check] HIBP rate limited', retryAfter);
      return { ok: false, error: 'HIBP rate limited — try again shortly', status: 429 };
    }

    if (!res.ok) {
      console.error('[breach-check] HIBP error', res.status, await res.text());
      return { ok: false, error: `HIBP HTTP ${res.status}`, status: 502 };
    }

    const json = (await res.json()) as HibpBreach[] | HibpBreach;
    const list = Array.isArray(json) ? json : [json];
    const breaches = list.map(mapBreach).filter((b): b is BreachItem => Boolean(b));
    return { ok: true, result: buildResult(email, breaches, locale) };
  } catch (err) {
    console.error('[breach-check] HIBP request failed', err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'HIBP request failed',
      status: 502,
    };
  }
}
