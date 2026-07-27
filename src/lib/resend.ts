import { Resend } from 'resend';
import { runtimeEnv } from './env';

const DEFAULT_FROM = 'Cybercon Solutions <alerts@cybercon-solutions.com>';
const DEFAULT_TO = 'yacosta@cybercon-solutions.com';
const PLACEHOLDER_API_KEY = 're_xxxxxxxxx';

function resendApiKey(): string | undefined {
  const apiKey = runtimeEnv('RESEND_API_KEY');
  if (!apiKey || apiKey === PLACEHOLDER_API_KEY) return undefined;
  return apiKey;
}

export function resendConfigured(): boolean {
  return Boolean(resendApiKey());
}

/**
 * Send a transactional email via Resend.
 * Requires `RESEND_API_KEY` (replace `re_xxxxxxxxx` with your real key).
 * Optional: `RESEND_FROM`, `RESEND_TO`.
 */
export async function sendResendEmail(options: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = resendApiKey();
  if (!apiKey) {
    if (runtimeEnv('RESEND_API_KEY') === PLACEHOLDER_API_KEY) {
      console.warn(
        '[resend] RESEND_API_KEY is still the placeholder re_xxxxxxxxx — replace it with your real API key from https://resend.com/api-keys',
      );
    }
    return false;
  }

  const from = runtimeEnv('RESEND_FROM') || DEFAULT_FROM;
  const to = runtimeEnv('RESEND_TO') || DEFAULT_TO;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: options.subject,
      html: options.html,
      ...(options.replyTo ? { replyTo: options.replyTo } : {}),
    });

    if (error) {
      console.error('[resend] send failed', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[resend] send threw', err);
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Build a simple HTML body for form / lead notification emails. */
export function formNotificationHtml(fields: Record<string, string>): string {
  const rows = Object.entries(fields)
    .filter(([, value]) => value.trim())
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#555;"><strong>${escapeHtml(label)}</strong></td><td style="padding:6px 0;vertical-align:top;">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('');

  return `<p>New website submission:</p><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${rows}</table>`;
}
