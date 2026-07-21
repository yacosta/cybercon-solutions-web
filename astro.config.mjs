// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cybercon-solutions.com',
  output: 'server',
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
    }),
  ],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
