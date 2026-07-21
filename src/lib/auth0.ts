import { SignJWT, jwtVerify } from 'jose';
import { runtimeEnv } from './env';

export type SessionUser = {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
};

const SESSION_COOKIE = 'cybercon_session';
const SESSION_MAX_AGE = 60 * 60 * 8;

function getSecret() {
  const secret = runtimeEnv('SESSION_SECRET');
  if (!secret) throw new Error('SESSION_SECRET is not configured');
  return new TextEncoder().encode(secret);
}

export function auth0Configured(): boolean {
  return Boolean(
    runtimeEnv('AUTH0_DOMAIN') &&
      runtimeEnv('AUTH0_CLIENT_ID') &&
      runtimeEnv('AUTH0_CLIENT_SECRET') &&
      runtimeEnv('AUTH0_BASE_URL') &&
      runtimeEnv('SESSION_SECRET'),
  );
}

export function auth0Config() {
  const domain = runtimeEnv('AUTH0_DOMAIN');
  const clientId = runtimeEnv('AUTH0_CLIENT_ID');
  const clientSecret = runtimeEnv('AUTH0_CLIENT_SECRET');
  const baseUrl = runtimeEnv('AUTH0_BASE_URL');
  const audience = runtimeEnv('AUTH0_AUDIENCE');

  if (!domain || !clientId || !clientSecret || !baseUrl) {
    throw new Error('Auth0 environment variables are not fully configured');
  }

  return { domain, clientId, clientSecret, baseUrl, audience };
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function readSessionToken(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return (payload.user as SessionUser) ?? null;
  } catch {
    return null;
  }
}

export function sessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
}

export { SESSION_COOKIE, SESSION_MAX_AGE };

export function buildAuthorizeUrl(state: string): string {
  const { domain, clientId, baseUrl, audience } = auth0Config();
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: `${baseUrl}/client/callback`,
    scope: 'openid profile email',
    state,
  });
  if (audience) params.set('audience', audience);
  return `https://${domain}/authorize?${params.toString()}`;
}

export async function exchangeCodeForUser(code: string): Promise<SessionUser> {
  const { domain, clientId, clientSecret, baseUrl } = auth0Config();
  const response = await fetch(`https://${domain}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${baseUrl}/client/callback`,
    }),
  });

  if (!response.ok) {
    throw new Error('Auth0 token exchange failed');
  }

  const tokens = (await response.json()) as { access_token: string };
  const profileResponse = await fetch(`https://${domain}/userinfo`, {
    headers: { authorization: `Bearer ${tokens.access_token}` },
  });

  if (!profileResponse.ok) {
    throw new Error('Auth0 userinfo request failed');
  }

  const profile = (await profileResponse.json()) as SessionUser;
  return profile;
}

export function buildLogoutUrl(): string {
  const { domain, clientId, baseUrl } = auth0Config();
  const params = new URLSearchParams({
    client_id: clientId,
    returnTo: `${baseUrl}/client/`,
  });
  return `https://${domain}/v2/logout?${params.toString()}`;
}
