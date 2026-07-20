import type { APIRoute } from 'astro';
import { auth0Configured, buildLogoutUrl, SESSION_COOKIE } from '../../lib/auth0';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(SESSION_COOKIE, { path: '/' });

  if (auth0Configured()) {
    return redirect(buildLogoutUrl());
  }

  return redirect('/client/');
};
