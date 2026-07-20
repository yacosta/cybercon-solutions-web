import type { APIRoute } from 'astro';

export const prerender = false;

/** Proxies Auth0 OIDC discovery when configured; otherwise returns site-local stub for agents. */
export const GET: APIRoute = async () => {
  const domain = import.meta.env.AUTH0_DOMAIN;
  if (domain) {
    return Response.redirect(`https://${domain}/.well-known/openid-configuration`, 302);
  }

  return Response.json({
    issuer: 'https://cybercon-solutions.com',
    authorization_endpoint: 'https://cybercon-solutions.com/client/login',
    token_endpoint: 'https://cybercon-solutions.com/client/callback',
    jwks_uri: 'https://cybercon-solutions.com/.well-known/jwks.json',
    response_types_supported: ['code'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256'],
    scopes_supported: ['openid', 'profile', 'email'],
    grant_types_supported: ['authorization_code'],
    service_documentation: 'https://cybercon-solutions.com/auth.md',
  });
};
