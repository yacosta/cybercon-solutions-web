import { attioConfigured, createAssessmentProspect, type AssessmentProspect } from './attio';
import { runtimeEnv } from './env';

export type LeadPayload = AssessmentProspect & {
  /** Optional subject override for Web3Forms email. */
  emailSubject?: string;
};

export type LeadDeliveryResult =
  | { ok: true; via: 'attio' | 'web3forms' | 'attio+web3forms' | 'dev-console' }
  | { ok: false; status: 502 | 503; error: string };

function web3formsConfigured(): boolean {
  return Boolean(runtimeEnv('WEB3FORMS_ACCESS_KEY'));
}

/** True when at least one durable production sink is configured. */
export function leadDeliveryConfigured(): boolean {
  return attioConfigured() || web3formsConfigured();
}

async function sendWeb3Forms(payload: LeadPayload): Promise<boolean> {
  const accessKey = runtimeEnv('WEB3FORMS_ACCESS_KEY');
  if (!accessKey) return false;

  const subject =
    payload.emailSubject ??
    `Website lead — ${payload.company}${payload.source ? ` (${payload.source})` : ''}`;

  try {
    const formRes = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: 'Cybercon Solutions Website',
        name: payload.name,
        company: payload.company,
        email: payload.email,
        locale: payload.locale ?? 'en',
        source: payload.source ?? '',
        message: payload.message ?? '',
        phone: payload.phone ?? '',
        employees: payload.employees ?? '',
        locations: payload.locations ?? '',
        challenge: payload.challenge ?? '',
        serviceInterest: payload.serviceInterest ?? '',
        currentItModel: payload.currentItModel ?? '',
        desiredStart: payload.desiredStart ?? '',
        attribution: payload.attribution ? JSON.stringify(payload.attribution) : '',
      }),
    });
    if (!formRes.ok) {
      console.error('[lead-delivery] web3forms failed', formRes.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[lead-delivery] web3forms error', err);
    return false;
  }
}

/**
 * Deliver a lead with Attio primary and Web3Forms fallback.
 *
 * Production: requires at least one sink; returns 503 if neither is configured,
 * 502 if every configured sink fails. Never reports success on console-only.
 *
 * Development: when no sink is configured, logs to the console and returns ok
 * so local form UX still works (see AGENTS.md).
 */
export async function deliverLead(payload: LeadPayload): Promise<LeadDeliveryResult> {
  const hasAttio = attioConfigured();
  const hasWeb3 = web3formsConfigured();

  if (!hasAttio && !hasWeb3) {
    if (import.meta.env.DEV) {
      console.log('[lead-delivery][dev]', {
        name: payload.name,
        company: payload.company,
        email: payload.email,
        locale: payload.locale,
        source: payload.source,
        message: payload.message,
        attribution: payload.attribution,
      });
      return { ok: true, via: 'dev-console' };
    }
    console.error(
      '[lead-delivery] No Attio or Web3Forms configured — refusing silent success in production',
    );
    return {
      ok: false,
      status: 503,
      error: 'Lead delivery is temporarily unavailable',
    };
  }

  let attioOk = false;
  let web3Ok = false;

  if (hasAttio) {
    try {
      attioOk = await createAssessmentProspect(payload);
      if (!attioOk) {
        console.warn('[lead-delivery] Attio upsert failed — attempting Web3Forms fallback');
      }
    } catch (err) {
      console.error('[lead-delivery] Attio threw — attempting Web3Forms fallback', err);
      attioOk = false;
    }
  }

  // Always attempt Web3Forms when configured: as primary if Attio missing/failed,
  // or as secondary email alert when Attio succeeded.
  if (hasWeb3 && (!attioOk || hasAttio)) {
    web3Ok = await sendWeb3Forms(payload);
  }

  if (attioOk && web3Ok) return { ok: true, via: 'attio+web3forms' };
  if (attioOk) return { ok: true, via: 'attio' };
  if (web3Ok) return { ok: true, via: 'web3forms' };

  console.error('[lead-delivery] All configured sinks failed', {
    hasAttio,
    hasWeb3,
    email: payload.email,
  });
  return { ok: false, status: 502, error: 'Delivery failed' };
}
