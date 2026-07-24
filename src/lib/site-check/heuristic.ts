import type { BuiltWithEvidence, LiveEvidence, LetterGrade, SiteCheckResult } from './types';

/**
 * Honest heuristic fallback when Claude is unavailable.
 * Follows accuracy rules: never invent CDN absence; Performance stays N.
 */
export function heuristicResult(
  domain: string,
  live: LiveEvidence,
  builtWith: BuiltWithEvidence,
): SiteCheckResult {
  const o = live.observed;
  const securityNotes: string[] = [];
  let securityScore = 0;

  if (!live.ok) {
    securityNotes.push(
      live.status
        ? `The host responded (HTTP ${live.status})${o.cloudflare ? ' behind Cloudflare' : ''}, but we could not retrieve a clean homepage HTML body in this pass.`
        : `We could not load a live response from ${domain} in this pass (${live.error ?? 'unreachable'}).`,
    );
    if (o.cloudflare) {
      securityNotes.push('Cloudflare signals appear in response headers or DNS NS records.');
    }
  } else {
    if (o.https) {
      securityScore += 2;
      securityNotes.push('The homepage loaded over HTTPS.');
    } else {
      securityNotes.push('The live response did not stay on HTTPS.');
    }
    if (o.hasHsts) {
      securityScore += 1;
      securityNotes.push('Strict-Transport-Security is present on the response.');
    }
    if (o.hasXFrameOptions || o.hasCsp) {
      securityScore += 1;
      securityNotes.push(
        o.hasCsp
          ? 'A Content-Security-Policy header is present.'
          : 'X-Frame-Options is set on the response.',
      );
    }
    if (o.cloudflare) {
      securityNotes.push('Cloudflare signals appear in headers or DNS NS records.');
    } else if (o.cloudfront) {
      securityNotes.push('Amazon CloudFront signals appear in response headers.');
    }
  }

  const securityGrade: LetterGrade | 'N' = !live.ok
    ? o.cloudflare || o.hasHsts
      ? 'C'
      : 'N'
    : securityScore >= 3
      ? 'B'
      : securityScore >= 2
        ? 'C'
        : 'D';

  const trustNotes: string[] = [];
  let trustGrade: LetterGrade | 'N' = 'N';
  if (o.title) {
    trustNotes.push(`Live title: “${o.title.slice(0, 80)}”.`);
    trustGrade = o.metaDescription ? 'B' : 'C';
    if (o.metaDescription) {
      trustNotes.push('A meta description is present on the homepage.');
    } else {
      trustNotes.push('No meta description showed up in the first bytes of the homepage.');
    }
    if (o.copyrightYear) {
      trustNotes.push(`Copyright year visible in the HTML snippet: ${o.copyrightYear}.`);
    }
  } else if (live.ok) {
    trustNotes.push('The live page returned HTML, but we could not read a clear <title>.');
    trustGrade = 'D';
  } else {
    trustNotes.push('Trust signals need a reachable homepage — we could not confirm them live.');
  }

  const searchNote = o.title
    ? 'Lite check only — live title is present; local search depth is for the full assessment.'
    : 'Search visibility needs more than a surface peek — that is part of the full assessment.';

  const overall: LetterGrade = !live.ok
    ? 'D'
    : securityGrade === 'B' && (trustGrade === 'B' || trustGrade === 'C')
      ? 'B'
      : securityGrade === 'D' || trustGrade === 'D'
        ? 'D'
        : 'C';

  const siteName = o.title?.split(/[|\-–—]/)[0]?.trim().slice(0, 80) || domain;

  // Prefer observed infra in the short note (accuracy: claim presence only, never absence).
  const preferredSecurityNotes = [
    ...securityNotes.filter((n) => /cloudflare|cloudfront/i.test(n)),
    ...securityNotes.filter((n) => /HTTPS|HSTS|Content-Security|X-Frame|responded|could not/i.test(n)),
  ];
  const securityNote =
    [...new Set(preferredSecurityNotes)].slice(0, 2).join(' ') ||
    securityNotes.slice(0, 2).join(' ') ||
    'Limited security headers observed on the live response.';

  return {
    site_name: siteName,
    domain,
    live_checked: live.ok,
    verified: builtWith.ok,
    overall_grade: overall,
    one_line_summary: live.ok
      ? `A lite surface peek at ${domain} — enough to start a conversation, not a full assessment.`
      : `We reached ${domain} but could not finish a clean live HTML review; grades stay conservative.`,
    categories: [
      {
        name: 'Security signals',
        grade: securityGrade,
        note: securityNote,
      },
      {
        name: 'Performance signals',
        grade: 'N',
        note: 'Not graded on a lite check — timing and Core Web Vitals are what the full assessment measures.',
      },
      {
        name: 'Trust & credibility',
        grade: trustGrade,
        note: trustNotes.slice(0, 2).join(' '),
      },
      {
        name: 'Search visibility',
        grade: 'N',
        note: searchNote,
      },
    ],
    top_finding: live.ok
      ? `From a quick outside look at ${domain}: ${securityNotes[0] ?? 'we reviewed response headers and the opening HTML.'} A free 30-minute assessment is where we go deeper — and map fixes if you want help.`
      : `We could not retrieve a clean live homepage body for ${domain}${o.cloudflare ? ' (Cloudflare is in front of the host)' : ''}. That alone is worth a short call so we can confirm reachability, bot protection, and monitoring — and talk through next steps.`,
    additional_findings_count: 4,
    tech_chips: builtWith.tech_chips,
  };
}
