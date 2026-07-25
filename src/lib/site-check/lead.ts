import { attioConfigured } from '../attio';
import { runtimeEnv } from '../env';
import type { SiteCheckResult } from './types';

const ATTIO_API = 'https://api.attio.com/v2';

async function attioFetch(path: string, init: RequestInit): Promise<Response> {
  const key = runtimeEnv('ATTIO_API_KEY');
  if (!key) throw new Error('ATTIO_API_KEY is not configured');
  return fetch(`${ATTIO_API}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${key}`,
      accept: 'application/json',
      'content-type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

/** Log every scan as a lead (Attio company + note when configured; always console). */
export async function captureSiteCheckLead(result: SiteCheckResult, clientIp?: string): Promise<void> {
  const payload = {
    domain: result.domain,
    site_name: result.site_name,
    overall_grade: result.overall_grade,
    live_checked: result.live_checked,
    verified: result.verified,
    tech_chips: result.tech_chips,
    additional_findings_count: result.additional_findings_count,
    timestamp: new Date().toISOString(),
    clientIp: clientIp || null,
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
    const companyRes = await attioFetch('/objects/companies/records?matching_attribute=domains', {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          values: {
            domains: [{ domain: result.domain }],
            name: [{ value: result.site_name || result.domain }],
            description: [
              {
                value: `Site-check prospect — grade ${result.overall_grade}. Tech: ${result.tech_chips.join(', ') || 'n/a'}.`,
              },
            ],
          },
        },
      }),
    });

    if (!companyRes.ok) {
      console.error('[site-check] attio company upsert failed', companyRes.status, await companyRes.text());
      return;
    }

    const companyJson = (await companyRes.json()) as { data?: { id?: { record_id?: string } } };
    const companyId = companyJson.data?.id?.record_id;
    if (!companyId) return;

    const noteRes = await attioFetch('/notes', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          parent_object: 'companies',
          parent_record_id: companyId,
          title: `Website health check — grade ${result.overall_grade}`,
          format: 'plaintext',
          content: [
            `Domain: ${result.domain}`,
            `Site: ${result.site_name}`,
            `Grade: ${result.overall_grade}`,
            `Summary: ${result.one_line_summary}`,
            `Top finding: ${result.top_finding}`,
            `Tech: ${result.tech_chips.join(', ') || 'n/a'}`,
            `Live checked: ${result.live_checked}`,
            `BuiltWith verified: ${result.verified}`,
            'Source: cybercon-solutions.com/site-check',
          ].join('\n'),
        },
      }),
    });

    if (!noteRes.ok) {
      console.error('[site-check] attio note failed', noteRes.status, await noteRes.text());
    }
  } catch (err) {
    console.error('[site-check] attio lead capture failed', err);
  }
}
