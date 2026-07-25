import type { BuiltWithEvidence, LiveEvidence, SiteCheckResult } from './types';
import { CATEGORY_NAMES } from './types';

export const ACCURACY_RULES = `
ACCURACY RULES (non-negotiable):
1. Never claim presence OR absence of infrastructure not directly observed in LIVE EVIDENCE headers/DNS (CDN, WAF, firewall, hosting, server config). Cloudflare-fronted sites often have no visible page footprint — only claim CDN/WAF if headers (cf-ray, x-amz-cf-id, server: cloudflare) or NS records show it. If not observed, stay silent or use grade N — do NOT say "no CDN" or "no WAF".
2. The live site is authoritative; the search index is not. If search snippets conflict with live HTML (dates, content freshness, redesign), discard the stale search claim entirely.
3. An honest "N" (not assessable from a surface scan) beats a guessed letter grade. Performance in particular cannot be graded without technical timing data — use N and note that the full assessment measures it.
4. Every note must be specific to this site and traceable to something actually observed in the evidence below.
5. Narrowly right beats broadly impressive. A technical prospect who knows their site must never catch a false claim.
`.trim();

export const FUNNEL_RULES = `
PRODUCT INTENT (lead-gen teaser — not a full audit):
- This is a LITE surface check meant to create a reason to call / book a free 30-minute assessment (and possibly hire Cybercon to fix the site).
- Do NOT exhaustively list every issue. Leave depth on the table.
- Share exactly ONE concrete top_finding (curiosity, not a punch list).
- Category notes: one short observed signal each — never a mini-audit.
- Prefer honest "N" over inventing depth (especially Performance). Frame N as "this is what the full assessment measures."
- additional_findings_count must be 3–5 so the visitor feels there is more to discuss on a call.
- Tone: calm sage, specific, zero fear-mongering. Never say the site is "fine / all clear" in a way that removes urgency — even strong sites get a lite grade plus an invitation to go deeper on monitoring, backups, or conversion.
- Do not recommend DIY fix steps. Point toward a short conversation for the full picture and remediation options.
`.trim();

export const SCHEMA_HINT = `
Return ONLY valid JSON (no markdown fences) matching:
{
  "site_name": "string",
  "live_checked": true|false,
  "overall_grade": "A"|"B"|"C"|"D"|"F",
  "one_line_summary": "one calm sentence: lite surface peek, not a full assessment",
  "categories": [
    {"name": "Security signals", "grade": "A"|"B"|"C"|"D"|"F"|"N", "note": "one short observed note"},
    {"name": "Performance signals", "grade": "A"|"B"|"C"|"D"|"F"|"N", "note": "..."},
    {"name": "Trust & credibility", "grade": "A"|"B"|"C"|"D"|"F"|"N", "note": "..."},
    {"name": "Search visibility", "grade": "A"|"B"|"C"|"D"|"F"|"N", "note": "..."}
  ],
  "top_finding": "1-2 sentences, one issue only, non-technical, invites a deeper pass — no DIY checklist",
  "additional_findings_count": 3|4|5
}
Voice: sage — calm, knowledgeable, specific. Tagline context: "Technology, handled." Never fear-monger.
`.trim();

export function buildPrompt(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
  options?: { allowSearch?: boolean },
): string {
  const allowSearch = options?.allowSearch !== false;
  return [
    `You are scoring a free ~60-second LITE website teaser check for ${domain} (Cybercon Solutions lead-gen widget).`,
    FUNNEL_RULES,
    ACCURACY_RULES,
    SCHEMA_HINT,
    '',
    '=== TIER-1 LIVE EVIDENCE (facts — authoritative; skim only) ===',
    JSON.stringify(
      {
        ok: live.ok,
        finalUrl: live.finalUrl,
        status: live.status,
        headers: live.headers,
        observed: live.observed,
        dnsNs: live.dnsNs,
        htmlSnippet: live.htmlSnippet.slice(0, 4000),
        error: live.error ?? null,
      },
      null,
      2,
    ),
    '',
    '=== TIER-2 BUILTWITH (optional tech chips; may lag on small sites) ===',
    builtWith.ok
      ? builtWith.rawSummary ||
        JSON.stringify({ tech_chips: builtWith.tech_chips, groups: builtWith.groups })
      : `Unavailable: ${builtWith.error ?? 'no data'}. Do not invent technologies.`,
    '',
    allowSearch
      ? '=== TIER-3 SEARCH (context only — never override live facts) ===\nYou may use web/search grounding ONLY for light reputation/visibility context. If search conflicts with live evidence, discard the search claim. Do not turn search into a full SEO audit.'
      : 'Do not invent search/reputation claims. Grade Search visibility as N unless live title/meta alone support a narrow note.',
  ].join('\n');
}

export function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fence?.[1]?.trim() ?? trimmed;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('No JSON object in model response');
  return JSON.parse(candidate.slice(start, end + 1));
}

function isGrade(value: unknown): value is SiteCheckResult['overall_grade'] {
  return value === 'A' || value === 'B' || value === 'C' || value === 'D' || value === 'F';
}

function isCategoryGrade(value: unknown): value is SiteCheckResult['categories'][0]['grade'] {
  return isGrade(value) || value === 'N';
}

export function normalizeResult(
  raw: unknown,
  domain: string,
  live: LiveEvidence,
  techChips: string[],
): SiteCheckResult {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const categoriesRaw = Array.isArray(obj.categories) ? obj.categories : [];

  const categories = CATEGORY_NAMES.map((name, i) => {
    const found =
      categoriesRaw.find(
        (c) =>
          c &&
          typeof c === 'object' &&
          typeof (c as { name?: unknown }).name === 'string' &&
          String((c as { name: string }).name)
            .toLowerCase()
            .includes(name.split(' ')[0]!.toLowerCase()),
      ) ?? categoriesRaw[i];

    const entry = (found && typeof found === 'object' ? found : {}) as Record<string, unknown>;
    return {
      name,
      grade: isCategoryGrade(entry.grade) ? entry.grade : 'N',
      note:
        typeof entry.note === 'string' && entry.note.trim()
          ? entry.note.trim().slice(0, 280)
          : 'Not enough surface evidence to grade this from a lite scan.',
    };
  });

  const additional = Number(obj.additional_findings_count);
  return {
    site_name:
      typeof obj.site_name === 'string' && obj.site_name.trim()
        ? obj.site_name.trim().slice(0, 120)
        : live.observed.title?.slice(0, 80) || domain,
    domain,
    live_checked: live.ok,
    verified: techChips.length > 0,
    overall_grade: isGrade(obj.overall_grade) ? obj.overall_grade : 'C',
    one_line_summary:
      typeof obj.one_line_summary === 'string' && obj.one_line_summary.trim()
        ? obj.one_line_summary.trim().slice(0, 220)
        : 'A quick surface review of the live site.',
    categories,
    top_finding:
      typeof obj.top_finding === 'string' && obj.top_finding.trim()
        ? obj.top_finding.trim().slice(0, 400)
        : 'We reviewed the live homepage; a full assessment would dig into configuration and monitoring next.',
    additional_findings_count:
      Number.isFinite(additional) && additional >= 3 && additional <= 5 ? Math.round(additional) : 4,
    tech_chips: techChips,
  };
}
