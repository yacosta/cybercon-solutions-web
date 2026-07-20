import type { APIRoute } from 'astro';
import { auth0Configured, buildAuthorizeUrl } from '../../lib/auth0';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect, url }) => {
  if (!auth0Configured()) {
    return redirect('/client/?error=auth0_not_configured');
  }

  const state = crypto.randomUUID();
  cookies.set('auth0_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: url.protocol === 'https:',
    maxAge: 600,
  });

  return redirect(buildAuthorizeUrl(state));
};
