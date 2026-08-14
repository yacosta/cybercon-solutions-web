import { runtimeEnv } from './env';
import { verifyTurnstile } from './turnstile-verify';

export type TurnstileGateResult =
  | { ok: true }
  | { ok: false; status: 400 | 503; error: string };

/**
 * Production requires Turnstile (secret must be set and token must verify).
 * Local/dev may skip when TURNSTILE_SECRET_KEY is unset.
 */
export async function requireTurnstile(
  token: string,
  remoteip?: string,
): Promise<TurnstileGateResult> {
  const secret = runtimeEnv('TURNSTILE_SECRET_KEY');

  if (!secret) {
    if (import.meta.env.DEV) {
      console.warn('[turnstile] secret unset — skipping verification in development');
      return { ok: true };
    }
    console.error('[turnstile] TURNSTILE_SECRET_KEY missing in production — refusing form');
    return {
      ok: false,
      status: 503,
      error: 'Bot protection is temporarily unavailable',
    };
  }

  const ok = await verifyTurnstile(token, remoteip);
  if (!ok) {
    return { ok: false, status: 400, error: 'Turnstile verification failed' };
  }
  return { ok: true };
}
