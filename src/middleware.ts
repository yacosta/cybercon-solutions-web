import { defineMiddleware, sequence } from 'astro:middleware';
import {
  auth0Configured,
  readSessionToken,
  SESSION_COOKIE,
} from './lib/auth0';
import { getPageMarkdown } from './lib/markdown-pages';
import { wordpressQueryRedirectPath } from './lib/wp-query-redirect';

const agentLinkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</llms.txt>; rel="service-doc"; type="text/plain"',
  '</auth.md>; rel="service-doc"; type="text/markdown"',
  '</sitemap-index.xml>; rel="describedby"',
  '</sitemap.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/mcp/server-card.json>; rel="mcp"',
].join(', ');

const wpQueryRedirectMiddleware = defineMiddleware(async (context, next) => {
  const method = context.request.method;
  if (method !== 'GET' && method !== 'HEAD') {
    return next();
  }
  const dest = wordpressQueryRedirectPath(context.url);
  if (dest) {
    return context.redirect(dest, 301);
  }
  return next();
});

const markdownMiddleware = defineMiddleware(async (context, next) => {
  const accept = context.request.headers.get('accept') ?? '';
  const mdIndex = accept.indexOf('text/markdown');
  const htmlIndex = accept.indexOf('text/html');
  const prefersMarkdown =
    mdIndex !== -1 && (htmlIndex === -1 || mdIndex < htmlIndex);

  // Also support explicit .md path suffix rewrite handled separately
  if (prefersMarkdown && context.request.method === 'GET') {
    const md = getPageMarkdown(context.url.pathname);
    if (md) {
      const tokens = Math.ceil(md.length / 4);
      return new Response(md, {
        status: 200,
        headers: {
          'content-type': 'text/markdown; charset=utf-8',
          'vary': 'Accept',
          'x-markdown-tokens': String(tokens),
          'cache-control': 'public, max-age=300',
          link: agentLinkHeader,
        },
      });
    }
  }

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set('vary', mergeVary(headers.get('vary'), 'Accept'));
  if (!headers.has('link')) {
    headers.set('link', agentLinkHeader);
  } else {
    headers.set('link', `${headers.get('link')}, ${agentLinkHeader}`);
  }
  // Security / a11y-friendly baseline headers for Pages
  headers.set('x-content-type-options', 'nosniff');
  headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  headers.set('permissions-policy', 'geolocation=(), microphone=(), camera=()');
  headers.set('x-frame-options', 'DENY');
  headers.set('cross-origin-opener-policy', 'same-origin');
  // Report-Only CSP — tighten to enforce after live violation review.
  if (!headers.has('content-security-policy-report-only')) {
    headers.set(
      'content-security-policy-report-only',
      [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "form-action 'self'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        "style-src 'self' 'unsafe-inline'",
        "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://assets.apollo.io https://cdnjs.cloudflare.com",
        "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://challenges.cloudflare.com https://api.web3forms.com https://*.apollo.io https://generativelanguage.googleapis.com",
        "frame-src 'self' https://challenges.cloudflare.com https://calendly.com https://*.calendly.com",
        "media-src 'self' blob:",
        "worker-src 'self' blob:",
      ].join('; '),
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});

function mergeVary(existing: string | null, value: string): string {
  if (!existing) return value;
  const parts = new Set(existing.split(',').map((s) => s.trim().toLowerCase()));
  parts.add(value.toLowerCase());
  return [...parts].join(', ');
}

function isEnClientPath(pathname: string): boolean {
  return pathname === '/client' || pathname.startsWith('/client/');
}

function isEsClientPath(pathname: string): boolean {
  return pathname === '/es/client' || pathname.startsWith('/es/client/');
}

const authMiddleware = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  const isEsClient = isEsClientPath(pathname);
  const isClientArea = isEnClientPath(pathname) || isEsClient;

  if (isClientArea) {
    const token = context.cookies.get(SESSION_COOKIE)?.value;
    const user = await readSessionToken(token);
    context.locals.user = user;

    const isPublicClientRoute =
      pathname === '/client/login' ||
      pathname === '/client/callback' ||
      pathname === '/client/logout' ||
      pathname === '/client/login/' ||
      pathname === '/client/callback/' ||
      pathname === '/client/logout/';

    // Fail closed: without Auth0, the portal is unavailable (no placeholder leak).
    if (!auth0Configured()) {
      const body = isEsClient
        ? 'El portal de clientes no está disponible temporalmente.'
        : 'Client portal is temporarily unavailable.';
      return new Response(body, {
        status: 503,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
          'x-robots-tag': 'noindex',
        },
      });
    }

    if (!user && !isPublicClientRoute) {
      return context.redirect('/client/login');
    }
  }

  return next();
});

export const onRequest = sequence(
  wpQueryRedirectMiddleware,
  markdownMiddleware,
  authMiddleware,
);

declare namespace App {
  interface Locals {
    user?: import('./lib/auth0').SessionUser | null;
  }
}
