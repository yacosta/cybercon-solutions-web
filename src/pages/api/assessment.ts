import type { APIRoute } from 'astro';
import { deliverLead } from '../../lib/lead-delivery';
import type { LeadAttribution } from '../../lib/attio';
import {
  checkFormRateLimits,
  incrementFormRateLimits,
} from '../../lib/form-rate-limit';
import { requireTurnstile } from '../../lib/turnstile-gate';

export const prerender = false;

function parseAttribution(raw: unknown): LeadAttribution | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const a = raw as Record<string, unknown>;
  const str = (k: string) =>
    typeof a[k] === 'string' && a[k].trim() ? String(a[k]).trim().slice(0, 500) : undefined;
  const bool = (k: string) => (typeof a[k] === 'boolean' ? a[k] : undefined);
  const out: LeadAttribution = {
    firstLanding: str('firstLanding'),
    lastLanding: str('lastLanding'),
    referrer: str('referrer'),
    utmSource: str('utmSource'),
    utmMedium: str('utmMedium'),
    utmCampaign: str('utmCampaign'),
    utmContent: str('utmContent'),
    utmTerm: str('utmTerm'),
    cta: str('cta'),
    servicePage: str('servicePage'),
    siteCheckCompleted: bool('siteCheckCompleted'),
    breachCheckCompleted: bool('breachCheckCompleted'),
  };
  return Object.values(out).some((v) => v !== undefined) ? out : undefined;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: {
    name?: string;
    company?: string;
    email?: string;
    locale?: string;
    turnstileToken?: string;
    source?: string;
    message?: string;
    phone?: string;
    employees?: string;
    locations?: string;
    challenge?: string;
    serviceInterest?: string;
    currentItModel?: string;
    desiredStart?: string;
    attribution?: unknown;
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
  const source = body.source?.trim() || 'https://cybercon-solutions.com/assessment/';
  const message = body.message?.trim() || undefined;
  const phone = body.phone?.trim() || undefined;
  const employees = body.employees?.trim() || undefined;
  const locations = body.locations?.trim() || undefined;
  const challenge = body.challenge?.trim() || undefined;
  const serviceInterest = body.serviceInterest?.trim() || undefined;
  const currentItModel = body.currentItModel?.trim() || undefined;
  const desiredStart = body.desiredStart?.trim() || undefined;
  const attribution = parseAttribution(body.attribution);

  if (!name || !company || !email) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  const rate = await checkFormRateLimits(clientAddress);
  if (!rate.allowed) {
    return Response.json({ error: 'Too many requests. Try again tomorrow.' }, { status: 429 });
  }

  const turnstile = await requireTurnstile(turnstileToken, clientAddress);
  if (!turnstile.ok) {
    return Response.json({ error: turnstile.error }, { status: turnstile.status });
  }

  const result = await deliverLead({
    name,
    company,
    email,
    locale,
    source,
    message,
    phone,
    employees,
    locations,
    challenge,
    serviceInterest,
    currentItModel,
    desiredStart,
    attribution,
    emailSubject: `Assessment request — ${company}`,
  });

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  await incrementFormRateLimits(clientAddress);
  return Response.json({ ok: true, via: result.via });
};
