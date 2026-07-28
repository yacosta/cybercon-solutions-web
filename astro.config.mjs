// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cybercon-solutions.com',
  output: 'server',
  // Keep empty alt="" on decorative images for a11y scanners (minify would strip them).
  compressHTML: false,
  // Canonical URLs use trailing slashes; pair with Workers html_handling + _redirects 301s.
  trailingSlash: 'always',
  adapter: cloudflare({
    platformProxy: { enabled: true },
    // Default prerenderEnvironment is workerd so `cloudflare:workers` env
    // bindings resolve the same way as production (Node cannot load that module).
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
      filter: (page) =>
        !page.includes('/client/') &&
        !page.includes('/api/') &&
        !page.includes('/search') &&
        !page.includes('/404'),
      // Astro's i18n sitemap omits x-default; Google expects it alongside en-US / es-US.
      serialize(item) {
        const links = item.links ? [...item.links] : [];
        const en = links.find((l) => l.lang === 'en-US');
        if (en && !links.some((l) => l.lang === 'x-default')) {
          links.push({ url: en.url, lang: 'x-default' });
        }
        return {
          ...item,
          links: links.length ? links : undefined,
          // Signal freshness so GSC revalidates after policy/SEO fixes.
          lastmod: item.lastmod ?? new Date().toISOString(),
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
  },
});
