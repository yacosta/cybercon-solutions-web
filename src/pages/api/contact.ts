import type { APIRoute } from 'astro';
import { attioConfigured, createAssessmentProspect } from '../../lib/attio';
import { runtimeEnv } from '../../lib/env';
import { verifyTurnstile } from '../../lib/turnstile-verify';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: {
    name?: string;
    company?: string;
    email?: string;
    message?: string;
    locale?: string;
    turnstileToken?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const company = body.company?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';
  const locale = body.locale ?? 'en';
  const turnstileToken = body.turnstileToken?.trim() ?? '';

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (message.length > 4000) {
    return Response.json({ error: 'Message too long' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  const secret = runtimeEnv('TURNSTILE_SECRET_KEY');
  if (secret) {
    const ok = await verifyTurnstile(turnstileToken, clientAddress);
    if (!ok) {
      return Response.json({ error: 'Turnstile verification failed' }, { status: 400 });
    }
  }

  const companyLabel = company || 'Not specified';
  const accessKey = runtimeEnv('WEB3FORMS_ACCESS_KEY');
  let delivered = false;

  if (attioConfigured()) {
    const prospectOk = await createAssessmentProspect({
      name,
      company: companyLabel,
      email,
      locale,
      message,
      source: 'https://cybercon-solutions.com/contact/',
    });
    if (!prospectOk) {
      return Response.json({ error: 'CRM delivery failed' }, { status: 502 });
    }
    delivered = true;
  } else {
    console.warn(
      '[contact] ATTIO_API_KEY not configured — skipping CRM upsert. Set it on the Worker and confirm GET /api/health → "attio": true',
    );
  }

  if (accessKey) {
    const formRes = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Contact — ${companyLabel}`,
        from_name: 'Cybercon Solutions Website',
        name,
        company: companyLabel,
        email,
        message,
        locale,
      }),
    });
    if (!formRes.ok) {
      if (!delivered) {
        return Response.json({ error: 'Delivery failed' }, { status: 502 });
      }
      console.error('[contact] web3forms failed after Attio success', formRes.status);
    } else {
      delivered = true;
    }
  }

  if (!delivered) {
    console.log('[contact]', { name, company: companyLabel, email, message, locale });
  }

  return Response.json({ ok: true });
};
