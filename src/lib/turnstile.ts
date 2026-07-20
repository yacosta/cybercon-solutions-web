export async function verifyTurnstile(token: string, remoteip?: string): Promise<boolean> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY not set — skipping verification in dev');
    return import.meta.env.DEV;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteip) body.set('remoteip', remoteip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

export function turnstileSiteKey(): string | undefined {
  return import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
}
