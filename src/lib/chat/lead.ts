import { attioConfigured, createAssessmentProspect } from '../attio';
import { runtimeEnv } from '../env';

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

function companyFromEmail(email: string): string {
  const domain = email.split('@')[1]?.trim().toLowerCase();
  if (!domain) return 'Website chat visitor';
  return domain;
}

/** Capture a chat lead when we have an email (Attio + optional Web3Forms + console). */
export async function captureChatLead(options: {
  email: string;
  name?: string;
  locale?: string;
  transcript?: string;
  clientIp?: string;
}): Promise<boolean> {
  const email = options.email.trim().toLowerCase();
  if (!email) return false;
  const locale = options.locale === 'es' ? 'es' : 'en';
  const name = options.name?.trim() || nameFromEmail(email);
  const transcript = (options.transcript ?? '').trim().slice(0, 4000);

  const payload = {
    email,
    name,
    locale,
    transcript: transcript || null,
    timestamp: new Date().toISOString(),
    clientIp: options.clientIp || null,
    source: 'cybercon-solutions.com chat assistant',
  };
  console.log('[chat-lead]', JSON.stringify(payload));

  const accessKey = runtimeEnv('WEB3FORMS_ACCESS_KEY');
  if (accessKey) {
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Chat lead — ${email}`,
          from_name: 'Cybercon Solutions Website Chat',
          email,
          name,
          message: transcript || 'Visitor engaged the website chat assistant.',
        }),
      });
    } catch (err) {
      console.error('[chat] web3forms failed', err);
    }
  }

  if (!attioConfigured()) return true;

  try {
    const ok = await createAssessmentProspect({
      name,
      company: companyFromEmail(email),
      email,
      locale,
      source: 'cybercon-solutions.com chat assistant',
      message: transcript || 'Visitor engaged the website chat assistant.',
    });
    if (!ok) {
      console.error('[chat] attio prospect upsert returned false');
      return false;
    }
    return true;
  } catch (err) {
    console.error('[chat] attio lead capture failed', err);
    return false;
  }
}
