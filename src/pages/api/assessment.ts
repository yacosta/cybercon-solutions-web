import type { APIRoute } from 'astro';
import { attioConfigured, createAssessmentProspect } from '../../lib/attio';
import { verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: {
    name?: string;
    company?: string;
    email?: string;
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
  const locale = body.locale ?? 'en';
  const turnstileToken = body.turnstileToken?.trim() ?? '';

  if (!name || !company || !email) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const ok = await verifyTurnstile(turnstileToken, clientAddress);
    if (!ok) {
      return Response.json({ error: 'Turnstile verification failed' }, { status: 400 });
    }
  }

  const accessKey = import.meta.env.WEB3FORMS_ACCESS_KEY;
  let delivered = false;

  if (attioConfigured()) {
    const prospectOk = await createAssessmentProspect({ name, company, email, locale });
    if (!prospectOk) {
      return Response.json({ error: 'CRM delivery failed' }, { status: 502 });
    }
    delivered = true;
  }

  if (accessKey) {
    const formRes = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Assessment request — ${company}`,
        from_name: 'Cybercon Solutions Website',
        name,
        company,
        email,
        locale,
      }),
    });
    if (!formRes.ok) {
      // If Attio already stored the prospect, don't fail the user on email delivery.
      if (!delivered) {
        return Response.json({ error: 'Delivery failed' }, { status: 502 });
      }
      console.error('[assessment] web3forms failed after Attio success', formRes.status);
    } else {
      delivered = true;
    }
  }

  if (!delivered) {
    console.log('[assessment]', { name, company, email, locale });
  }

  return Response.json({ ok: true });
};
