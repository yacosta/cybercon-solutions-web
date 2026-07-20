import type { APIRoute } from 'astro';
import {
  auth0Configured,
  createSessionToken,
  exchangeCodeForUser,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '../../lib/auth0';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  if (!auth0Configured()) {
    return redirect('/client/?error=auth0_not_configured');
  }

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expected = cookies.get('auth0_state')?.value;

  if (!code || !state || !expected || state !== expected) {
    return redirect('/client/login?error=invalid_state');
  }

  cookies.delete('auth0_state', { path: '/' });

  try {
    const user = await exchangeCodeForUser(code);
    const token = await createSessionToken(user);
    cookies.set(SESSION_COOKIE, token, sessionCookieOptions(url.protocol === 'https:'));
    return redirect('/client/');
  } catch (err) {
    console.error(err);
    return redirect('/client/login?error=exchange_failed');
  }
};
