#!/usr/bin/env node
/**
 * Purge Cloudflare edge cache for the production hostnames.
 *
 * Required env:
 *   CLOUDFLARE_API_TOKEN  — needs Zone → Cache Purge
 *   CLOUDFLARE_ZONE_ID    — zone id for cybercon-solutions.com
 *                           (default: 41a145bf2688a227f9e321a31055fe19)
 *
 * Usage:
 *   npm run cf:purge-cache
 */

const DEFAULT_ZONE_ID = '41a145bf2688a227f9e321a31055fe19';
const HOSTS = ['cybercon-solutions.com', 'www.cybercon-solutions.com'];
const API = 'https://api.cloudflare.com/client/v4';

const token = process.env.CLOUDFLARE_API_TOKEN;
const zoneId = process.env.CLOUDFLARE_ZONE_ID || DEFAULT_ZONE_ID;

if (!token) {
  console.error(
    [
      'Missing CLOUDFLARE_API_TOKEN.',
      '',
      'Dashboard alternative:',
      '  Caching → Configuration → Purge Cache → Custom Purge → Hostname',
      `  Hosts: ${HOSTS.join(', ')}`,
      '',
      'Docs: https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/',
    ].join('\n'),
  );
  process.exit(1);
}

const res = await fetch(`${API}/zones/${zoneId}/purge_cache`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ hosts: HOSTS }),
});

const body = await res.json().catch(() => ({}));
if (!res.ok || body.success === false) {
  const detail = JSON.stringify(body.errors ?? body, null, 2);
  console.error(`Cache purge failed (${res.status}): ${detail}`);
  process.exit(1);
}

console.log(`Purged Cloudflare cache for ${HOSTS.join(', ')} (id: ${body.result?.id ?? 'ok'})`);
