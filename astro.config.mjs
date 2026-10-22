// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://cybercon-solutions.com';

/** Static 301 sources in public/_redirects. Sitemap locs must not be one of these. */
function permanentRedirectSources() {
  const text = readFileSync(new URL('./public/_redirects', import.meta.url), 'utf8');
  const sources = new Set();
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [from, to, code = '302'] = trimmed.split(/\s+/);
    if (!from || from.includes('*') || /:[A-Za-z]/.test(from)) continue;
    if (code === '301' && to && to !== from) sources.add(from);
  }
  return sources;
}

const permanentRedirects = permanentRedirectSources();

/**
 * Sitemap locs are the trailing-slash canonical on the apex host.
 * Keep in sync with canonicalPath() in src/lib/site.ts.
 * @param {string} raw
 */
function canonicalizeSitemapUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return undefined;
  }
  if (url.protocol !== 'https:' || url.hostname !== 'cybercon-solutions.com') return undefined;
  let pathname = url.pathname;
  if (pathname.endsWith('/index.html')) pathname = pathname.slice(0, -'index.html'.length) || '/';
  else if (pathname.endsWith('.html')) pathname = pathname.slice(0, -'.html'.length);
  if (pathname === '/index') pathname = '/';
  else if (pathname.endsWith('/index')) pathname = pathname.slice(0, -'index'.length);
  const isFile = /\/[^/]+\.[a-z0-9]{1,8}$/i.test(pathname);
  if (isFile) return undefined;
  if (pathname !== '/' && !pathname.endsWith('/')) pathname += '/';
  const blocked =
    pathname === '/client' ||
    pathname.startsWith('/client/') ||
    pathname === '/es/client' ||
    pathname.startsWith('/es/client/') ||
    pathname.startsWith('/api/') ||
    pathname === '/search' ||
    pathname.startsWith('/search/') ||
    pathname === '/es/search' ||
    pathname.startsWith('/es/search/') ||
    pathname.includes('/rss') ||
    pathname === '/404' ||
    pathname.startsWith('/404/') ||
    pathname === '/es/404' ||
    pathname.startsWith('/es/404/');
  if (blocked || permanentRedirects.has(pathname)) return undefined;
  return `${SITE}${pathname}`;
}

export default defineConfig({
  site: 'https://cybercon-solutions.com',
  output: 'server',
  // Keep empty alt="" on decorative images for a11y scanners (minify would strip them).
  compressHTML: false,
  // Canonical URLs use trailing slashes; pair with Workers html_handling + _redirects 301s.
  trailingSlash: 'always',
  // Auth0 cookies handle /client; do not auto-provision Cloudflare KV for Astro sessions.
  session: false,
  adapter: cloudflare({
    platformProxy: { enabled: true },
    // Default prerenderEnvironment is workerd so `cloudflare:workers` env
    // bindings resolve the same way as production (Node cannot load that module).
    // Site uses static <img>, not astro:assets — skip IMAGES binding.
    imageService: 'passthrough',
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-US',
        },
      },
      filter: (page) => canonicalizeSitemapUrl(page) !== undefined,
      // Astro's i18n sitemap omits x-default; Google expects it alongside en-US / es-US.
      serialize(item) {
        const url = canonicalizeSitemapUrl(item.url);
        if (!url) return undefined;
        const links = [];
        for (const link of item.links ?? []) {
          const href = canonicalizeSitemapUrl(link.url);
          if (!href) continue;
          links.push({ ...link, url: href });
        }
        const en = links.find((l) => l.lang === 'en-US');
        if (en && !links.some((l) => l.lang === 'x-default')) {
          links.push({ url: en.url, lang: 'x-default' });
        }
        return {
          ...item,
          url,
          links: links.length ? links : undefined,
        };
      },
    }),
  ],
  prefetch: true,
  // Component CSS chunks (Footer ~18KB, ServicesGrid ~5KB) exceed Vite's
  // default 4KB inline limit and become separate render-blocking requests on
  // mobile. Inlining keeps critical CSS in the HTML document.
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    // Cloudflare adapter 14.2.5 omits these from SSR optimizeDeps.include.
    // A cold Vite cache then discovers them mid-request and workerd crashes
    // (withastro/astro#17788). User-level include is merged into the adapter list.
    optimizeDeps: {
      include: ['astro/assets/services/noop', 'astro/logger/json'],
    },
  },
});
