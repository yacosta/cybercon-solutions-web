import type { APIRoute } from 'astro';
import { attioConfigured } from '../../lib/attio';
import { auth0Configured } from '../../lib/auth0';
import { runtimeEnv } from '../../lib/env';
import { resendConfigured } from '../../lib/resend';
import { siteCheckAiStatus } from '../../lib/site-check';

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

  const ai = siteCheckAiStatus();

  return Response.json({
    ok: true,
    service: 'cybercon-solutions-web',
    time: new Date().toISOString(),
    attio: attioConfigured(),
    turnstile: Boolean(runtimeEnv('TURNSTILE_SECRET_KEY')),
    resend: resendConfigured(),
    web3forms: Boolean(runtimeEnv('WEB3FORMS_ACCESS_KEY')),
    auth0: auth0Configured(),
    auth0Vars,
    siteCheck: {
      aiProvider: ai.provider,
      gemini: ai.gemini,
      openai: ai.openai,
      anthropic: ai.anthropic,
      builtwith: Boolean(runtimeEnv('BUILTWITH_API_KEY')),
      webhook: Boolean(runtimeEnv('SITE_CHECK_WEBHOOK_URL')),
    },
  });
};
