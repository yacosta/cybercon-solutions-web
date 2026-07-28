import type { APIRoute } from 'astro';
import { runtimeEnv } from '../../lib/env';
import {
  captureBreachCheckLead,
  checkRateLimits,
  getSampleResult,
  hibpConfigured,
  incrementRateLimits,
  isValidEmail,
  lookupBreachedAccount,
  normalizeEmail,
} from '../../lib/breach-check';
import { verifyTurnstile } from '../../lib/turnstile-verify';

export const prerender = false;

function normalizeLocale(value?: string): 'en' | 'es' {
  return value === 'es' ? 'es' : 'en';
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: {
    email?: string;
    sample?: boolean;
    turnstileToken?: string;
    locale?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const locale = normalizeLocale(body.locale);

  if (body.sample === true) {
    return Response.json({ ok: true, result: getSampleResult(locale) });
  }

  const secret = runtimeEnv('TURNSTILE_SECRET_KEY');
  if (secret) {
    const token = body.turnstileToken?.trim() ?? '';
    const ok = await verifyTurnstile(token, clientAddress);
    if (!ok) {
      return Response.json({ error: 'Turnstile verification failed' }, { status: 400 });
    }
  }

  const email = normalizeEmail(body.email);
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'Enter a valid work email' }, { status: 400 });
  }

  if (!hibpConfigured()) {
    return Response.json(
      {
        error: 'HIBP not configured',
        message:
          'Breach lookup is temporarily unavailable. Book a free assessment and we will review exposure with you.',
      },
      { status: 503 },
    );
  }

  const limits = await checkRateLimits(clientAddress || 'unknown');
  if (!limits.allowed) {
    return Response.json(
      {
        error: 'limit_reached',
        reason: limits.reason,
        message:
          limits.reason === 'global'
            ? 'We have hit today’s free breach-check budget. Book a free assessment and we will review exposure with you.'
            : 'You have reached today’s free breach-check limit. Book a free assessment and we will go deeper.',
      },
      { status: 429 },
    );
  }

  const lookup = await lookupBreachedAccount(email, locale);
  if (!lookup.ok) {
    const status = lookup.status === 429 ? 429 : lookup.status === 503 ? 503 : 502;
    return Response.json(
      {
        error: lookup.error,
        message:
          status === 429
            ? 'Have I Been Pwned asked us to slow down. Try again in a moment, or book a free assessment.'
            : 'Breach lookup failed. Please try again, or book a free assessment.',
      },
      { status },
    );
  }

  await captureBreachCheckLead(lookup.result, { email, locale, clientIp: clientAddress });
  await incrementRateLimits(clientAddress || 'unknown');

  return Response.json({ ok: true, result: lookup.result });
};
