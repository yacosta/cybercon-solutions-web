import { attioConfigured, createAssessmentProspect } from '../attio';
import { runtimeEnv } from '../env';
import type { SiteCheckResult } from './types';

function nameFromEmail(email: string): string {
  const local = email.split('@')[0]?.trim() || 'Visitor';
  const cleaned = local.replace(/[._+-]+/g, ' ').replace(/\d+/g, ' ').trim();
  if (!cleaned) return 'Website visitor';
  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

/** Log every scan as a lead (Attio Person + Company + note when configured; always console). */
export async function captureSiteCheckLead(
  result: SiteCheckResult,
  options: { email: string; locale?: string; clientIp?: string },
): Promise<void> {
  const email = options.email.trim().toLowerCase();
  const locale = options.locale === 'es' ? 'es' : 'en';
  const payload = {
    domain: result.domain,
    site_name: result.site_name,
    overall_grade: result.overall_grade,
    live_checked: result.live_checked,
    verified: result.verified,
    tech_chips: result.tech_chips,
    additional_findings_count: result.additional_findings_count,
    email,
    timestamp: new Date().toISOString(),
    clientIp: options.clientIp || null,
  };

  console.log('[site-check]', JSON.stringify(payload));

  const accessKey = runtimeEnv('WEB3FORMS_ACCESS_KEY');
  if (accessKey) {
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Site check — ${result.domain} (grade ${result.overall_grade})`,
          from_name: 'Cybercon Solutions Website',
          email,
          domain: result.domain,
          site_name: result.site_name,
          overall_grade: result.overall_grade,
          tech_chips: result.tech_chips.join(', '),
          one_line_summary: result.one_line_summary,
        }),
      });
    } catch (err) {
      console.error('[site-check] web3forms failed', err);
    }
  }

  if (!attioConfigured()) return;

  try {
    const ok = await createAssessmentProspect({
      name: nameFromEmail(email),
      company: result.site_name || result.domain,
      email,
      locale,
      companyDomain: result.domain,
      source: 'cybercon-solutions.com/services/web-design-development/#site-check',
      message: [
        `Lite website check grade: ${result.overall_grade}`,
        `Summary: ${result.one_line_summary}`,
        `Top finding: ${result.top_finding}`,
        `Tech: ${result.tech_chips.join(', ') || 'n/a'}`,
        `Live checked: ${result.live_checked}`,
        `BuiltWith verified: ${result.verified}`,
      ].join('\n'),
    });

    if (!ok) {
      console.error('[site-check] attio prospect upsert returned false');
    }
  } catch (err) {
    console.error('[site-check] attio lead capture failed', err);
  }
}
