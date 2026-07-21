import type { APIRoute } from 'astro';
import { attioConfigured } from '../../lib/attio';
import { runtimeEnv } from '../../lib/env';

export const prerender = false;

export const GET: APIRoute = async () => {
  return Response.json({
    ok: true,
    service: 'cybercon-solutions-web',
    time: new Date().toISOString(),
    // Booleans only — never expose secret values.
    attio: attioConfigured(),
    turnstile: Boolean(runtimeEnv('TURNSTILE_SECRET_KEY')),
    web3forms: Boolean(runtimeEnv('WEB3FORMS_ACCESS_KEY')),
  });
};
