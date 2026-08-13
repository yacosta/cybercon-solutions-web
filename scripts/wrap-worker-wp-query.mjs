#!/usr/bin/env node
/**
 * Astro's Cloudflare adapter writes dist/server/entry.mjs with no_bundle: true
 * and serves prerendered `/` from ASSETS before middleware runs. That means
 * `/?page_id=82` 200s the homepage unless we wrap the Worker fetch.
 *
 * Keep the redirect logic in sync with src/lib/wp-query-redirect.ts.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const serverDir = join(root, 'dist/server');
const wranglerPath = join(serverDir, 'wrangler.json');
const entryPath = join(serverDir, 'wp-query-entry.mjs');

const wrapper = `import astro from './entry.mjs';

const WP_ID_PARAMS = ['page_id', 'p', 'attachment_id'];

function wordpressQueryRedirectPath(url) {
  const hasWpId = WP_ID_PARAMS.some((key) => {
    const value = url.searchParams.get(key);
    return value !== null && /^[0-9]+$/.test(value);
  });
  if (!hasWpId) return null;
  const path = url.pathname;
  if (path === '/' || path === '/index.php') return '/';
  if (path === '/es' || path === '/es/') return '/es/';
  return null;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'GET' || request.method === 'HEAD') {
      const dest = wordpressQueryRedirectPath(new URL(request.url));
      if (dest) return Response.redirect(new URL(dest, request.url), 301);
    }
    return astro.fetch(request, env, ctx);
  },
};
`;

const wranglerRaw = await readFile(wranglerPath, 'utf8');
const wrangler = JSON.parse(wranglerRaw);
await writeFile(entryPath, wrapper);
wrangler.main = 'wp-query-entry.mjs';
wrangler.assets ??= {};
wrangler.assets.run_worker_first = ['/', '/es/', '/es', '/index.php'];
await writeFile(wranglerPath, JSON.stringify(wrangler));
console.log('Wrapped Worker entry: wp-query-entry.mjs (WordPress ?page_id= / ?p= 301)');
