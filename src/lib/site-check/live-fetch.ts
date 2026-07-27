import type { LiveEvidence } from './types';

const INTERESTING_HEADERS = [
  'server',
  'cf-ray',
  'cf-cache-status',
  'x-amz-cf-id',
  'x-cache',
  'strict-transport-security',
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
  'content-type',
  'via',
] as const;

function pickHeaders(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const name of INTERESTING_HEADERS) {
    const value = headers.get(name);
    if (value) out[name] = value;
  }
  return out;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match?.[1]) return null;
  return decodeEntities(match[1].replace(/\s+/g, ' ').trim()).slice(0, 200) || null;
}

function extractMetaDescription(html: string): string | null {
  const match =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const raw = match?.[1]?.replace(/\s+/g, ' ').trim();
  return raw ? decodeEntities(raw).slice(0, 300) : null;
}

function extractCopyrightYear(html: string): string | null {
  const match = html.match(/©\s*(20\d{2})|(?:copyright)\s*(20\d{2})/i);
  return match?.[1] || match?.[2] || null;
}

async function lookupNs(domain: string): Promise<string[]> {
  try {
    const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=NS`;
    const res = await fetch(url, {
      headers: { accept: 'application/dns-json' },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { Answer?: { data?: string }[] };
    return (json.Answer ?? [])
      .map((a) => a.data?.replace(/\.$/, '').toLowerCase())
      .filter((d): d is string => Boolean(d))
      .slice(0, 8);
  } catch {
    return [];
  }
}

/** Tier-1 evidence: live homepage headers + HTML snippet + optional NS records. */
export async function fetchLiveEvidence(domain: string): Promise<LiveEvidence> {
  const dnsNs = await lookupNs(domain);
  const target = `https://${domain}/`;

  try {
    const res = await fetch(target, {
      redirect: 'follow',
      headers: {
        'user-agent':
          'CyberconSiteCheck/1.0 (+https://cybercon-solutions.com/site-check/; health-check)',
        accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(12000),
    });

    const headers = pickHeaders(res.headers);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf).slice(0, 8 * 1024);
    const htmlSnippet = new TextDecoder('utf-8', { fatal: false }).decode(bytes);

    const cloudflare =
      Boolean(headers['cf-ray'] || headers['cf-cache-status']) ||
      /cloudflare/i.test(headers.server ?? '') ||
      dnsNs.some((ns) => ns.includes('cloudflare'));
    const cloudfront = Boolean(headers['x-amz-cf-id']) || /cloudfront/i.test(headers.via ?? '');

    // 2xx = content retrieved. Other responses may still yield useful headers (e.g. CF challenge).
    const contentOk = res.status >= 200 && res.status < 300;

    return {
      ok: contentOk,
      finalUrl: res.url || target,
      status: res.status,
      headers,
      htmlSnippet: contentOk ? htmlSnippet : '',
      observed: {
        https: (res.url || target).startsWith('https://'),
        cloudflare,
        cloudfront,
        server: headers.server ?? null,
        title: contentOk ? extractTitle(htmlSnippet) : null,
        metaDescription: contentOk ? extractMetaDescription(htmlSnippet) : null,
        hasHsts: Boolean(headers['strict-transport-security']),
        hasCsp: Boolean(headers['content-security-policy']),
        hasXFrameOptions: Boolean(headers['x-frame-options']),
        copyrightYear: contentOk ? extractCopyrightYear(htmlSnippet) : null,
      },
      dnsNs,
      error: contentOk
        ? undefined
        : `HTTP ${res.status}${cloudflare ? ' (Cloudflare-fronted response)' : ''}`,
    };
  } catch (err) {
    return {
      ok: false,
      finalUrl: null,
      status: null,
      headers: {},
      htmlSnippet: '',
      observed: {
        https: false,
        cloudflare: dnsNs.some((ns) => ns.includes('cloudflare')),
        cloudfront: false,
        server: null,
        title: null,
        metaDescription: null,
        hasHsts: false,
        hasCsp: false,
        hasXFrameOptions: false,
        copyrightYear: null,
      },
      dnsNs,
      error: err instanceof Error ? err.message : 'Live fetch failed',
    };
  }
}
