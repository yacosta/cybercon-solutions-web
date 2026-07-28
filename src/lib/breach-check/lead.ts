import { attioConfigured, createAssessmentProspect } from '../attio';
import { runtimeEnv } from '../env';
import type { BreachCheckResult } from './types';

function nameFromEmail(email: string): string {
  const local = email.split('@')[0]?.trim() || 'Visitor';
  const cleaned = local.replace(/[._+-]+/g, ' ').replace(/\d+/g, ' ').trim();
  if (!cleaned) return 'Security visitor';
  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function companyFromEmail(email: string): string {
  const domain = email.split('@')[1]?.trim() || 'Unknown';
  const base = domain.split('.')[0] || domain;
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/** Log every breach check as a lead (Attio when configured; always console). */
export async function captureBreachCheckLead(
  result: BreachCheckResult,
  options: { email: string; locale?: string; clientIp?: string },
): Promise<void> {
  const email = options.email.trim().toLowerCase();
  const locale = options.locale === 'es' ? 'es' : 'en';
  const domain = email.includes('@') ? email.split('@')[1] : undefined;

  const payload = {
    email_masked: result.email_masked,
    breach_count: result.breach_count,
    status: result.status,
    hibp_checked: result.hibp_checked,
    email,
    timestamp: new Date().toISOString(),
    clientIp: options.clientIp || null,
  };

  console.log('[breach-check]', JSON.stringify(payload));

  const accessKey = runtimeEnv('WEB3FORMS_ACCESS_KEY');
  if (accessKey) {
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Breach check — ${result.email_masked} (${result.status}, ${result.breach_count})`,
          from_name: 'Cybercon Solutions Website',
          email,
          email_masked: result.email_masked,
          breach_count: result.breach_count,
          status: result.status,
          one_line_summary: result.one_line_summary,
          breaches: result.breaches.map((b) => b.title).join(', '),
        }),
      });
    } catch (err) {
      console.error('[breach-check] web3forms failed', err);
    }
  }

  if (!attioConfigured()) return;

  try {
    const ok = await createAssessmentProspect({
      name: nameFromEmail(email),
      company: companyFromEmail(email),
      email,
      locale,
      companyDomain: domain,
      source: 'cybercon-solutions.com/services/cybersecurity/#breach-check',
      message: [
        `Lite breach check status: ${result.status} (${result.breach_count} known)`,
        `Summary: ${result.one_line_summary}`,
        `Top finding: ${result.top_finding}`,
        `Breaches: ${result.breaches.map((b) => b.title).join(', ') || 'none'}`,
        result.additional_breach_count > 0
          ? `Additional breaches not listed: ${result.additional_breach_count}`
          : null,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    if (!ok) {
      console.error('[breach-check] attio prospect upsert returned false');
    }
  } catch (err) {
    console.error('[breach-check] attio lead capture failed', err);
  }
}
