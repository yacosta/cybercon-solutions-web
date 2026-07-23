import type { APIRoute } from 'astro';
import { auth0Configured } from '../../lib/auth0';
import { runtimeEnv } from '../../lib/env';

export const prerender = false;

export const GET: APIRoute = async () => {
  // Booleans only — never expose secret values.
  const auth0Vars = {
    AUTH0_DOMAIN: Boolean(runtimeEnv('AUTH0_DOMAIN')),
    AUTH0_CLIENT_ID: Boolean(runtimeEnv('AUTH0_CLIENT_ID')),
    AUTH0_CLIENT_SECRET: Boolean(runtimeEnv('AUTH0_CLIENT_SECRET')),
    AUTH0_BASE_URL: Boolean(runtimeEnv('AUTH0_BASE_URL')),
    SESSION_SECRET: Boolean(runtimeEnv('SESSION_SECRET')),
  };

  return Response.json({
    ok: true,
    service: 'cybercon-solutions-web',
    time: new Date().toISOString(),
    turnstile: Boolean(runtimeEnv('TURNSTILE_SECRET_KEY')),
    web3forms: Boolean(runtimeEnv('WEB3FORMS_ACCESS_KEY')),
    auth0: auth0Configured(),
    auth0Vars,
  });
};
