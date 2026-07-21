import { defineMiddleware, sequence } from 'astro:middleware';
import {
  auth0Configured,
  readSessionToken,
  SESSION_COOKIE,
} from './lib/auth0';
import { getPageMarkdown } from './lib/markdown-pages';

const agentLinkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</llms.txt>; rel="service-doc"; type="text/plain"',
  '</auth.md>; rel="service-doc"; type="text/markdown"',
  '</sitemap-index.xml>; rel="describedby"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/mcp/server-card.json>; rel="mcp"',
].join(', ');

/** Prefer https://cybercon-solutions.com/.../ over www / missing trailing slash. */
const canonicalizeMiddleware = defineMiddleware(async (context, next) => {
  const url = context.url;
  const host = url.hostname.toLowerCase();

  if (host.startsWith('www.')) {
    const target = new URL(url);
    target.protocol = 'https:';
    target.hostname = host.slice(4);
    return Response.redirect(target, 301);
  }

  const { pathname } = url;
  const hasFileExtension = /\.[a-zA-Z0-9]{1,8}$/.test(pathname);
  const skipTrailingSlash =
    hasFileExtension ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/pagefind/') ||
    pathname.startsWith('/cdn-cgi/');

  if (!skipTrailingSlash && pathname !== '/' && !pathname.endsWith('/')) {
    const target = new URL(url);
    target.protocol = 'https:';
    target.pathname = `${pathname}/`;
    return Response.redirect(target, 301);
  }

  // Normalize bare apex URL (no trailing slash in the request URL) to canonical `/`.
  const requestPath = context.request.url.split('?')[0] ?? '';
  if (pathname === '/' && requestPath !== '' && !requestPath.endsWith('/')) {
    const target = new URL(url);
    target.protocol = 'https:';
    target.pathname = '/';
    return Response.redirect(target, 301);
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

const authMiddleware = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  if (pathname.startsWith('/client')) {
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

    if (!user && !isPublicClientRoute) {
      if (!auth0Configured()) {
        return next();
      }
      return context.redirect('/client/login');
    }
  }

  return next();
});

export const onRequest = sequence(canonicalizeMiddleware, markdownMiddleware, authMiddleware);

declare namespace App {
  interface Locals {
    user?: import('./lib/auth0').SessionUser | null;
  }
}
