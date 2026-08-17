#!/usr/bin/env node
/**
 * Flush Cloudflare edge cache for the production zone after deploy.
 *
 * Default: purge everything in the zone (HTML PoPs can HIT with
 * must-revalidate). Set CF_PURGE_HOSTS=1 to purge only production hostnames.
 *
 * Required env:
 *   CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_API_TOKEN — Zone → Cache Purge
 *   CLOUDFLARE_ZONE_ID — zone id for cybercon-solutions.com
 *                        (default: 41a145bf2688a227f9e321a31055fe19)
 *
 * Usage:
 *   npm run cf:purge-cache
 */

import {
  cloudflareApiToken,
  cloudflareAuthHeaders,
} from './lib/cloudflare-api-token.mjs';

const DEFAULT_ZONE_ID = '41a145bf2688a227f9e321a31055fe19';
const HOSTS = ['cybercon-solutions.com', 'www.cybercon-solutions.com'];
const API = 'https://api.cloudflare.com/client/v4';

const { token, source, hadWhitespace, present } = cloudflareApiToken();
const zoneId = (process.env.CLOUDFLARE_ZONE_ID || DEFAULT_ZONE_ID).trim();
const hostsOnly = process.env.CF_PURGE_HOSTS === '1';

const PERMISSION_HELP = [
  'The Workers-only GitHub token can wrangler-deploy but cannot call zone APIs',
  '(HTTP 401/403, Cloudflare code 10000 Authentication error).',
  '',
  'Fix — edit the deploy token, or add a GitHub Actions secret CLOUDFLARE_ZONE_API_TOKEN:',
  '  Cloudflare dashboard → My Profile → API Tokens',
  '  Permissions:',
  '    Zone → Cache Purge → Purge',
  '    Zone → Zone → Read',
  '  Zone Resources: Include → Specific zone → cybercon-solutions.com',
  '  (The Edit Cloudflare Workers template is Account-scoped and omits the zone.)',
  '',
  'Dashboard fallback (no token change):',
  '  Caching → Configuration → Purge Cache → Purge Everything',
  `  or Custom Purge → Hostname: ${HOSTS.join(', ')}`,
  '',
  'Docs: https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/',
].join('\n');

if (!present) {
  console.error(['Missing CLOUDFLARE_API_TOKEN (or CLOUDFLARE_ZONE_API_TOKEN).', '', PERMISSION_HELP].join('\n'));
  process.exit(1);
}

async function cfGet(path) {
  const res = await fetch(`${API}${path}`, {
    headers: cloudflareAuthHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

async function diagnose() {
  const lines = [
    `Using ${source} (length ${token.length}${hadWhitespace ? ', trimmed whitespace' : ''}).`,
    `Zone id: ${zoneId}.`,
  ];
  const verify = await cfGet('/user/tokens/verify');
  lines.push(
    `Token verify: HTTP ${verify.status} success=${verify.body.success === true}` +
      (verify.body.errors?.length ? ` errors=${JSON.stringify(verify.body.errors)}` : ''),
  );
  const zone = await cfGet(`/zones/${zoneId}`);
  const zoneName = zone.body.result?.name;
  lines.push(
    `Zone GET: HTTP ${zone.status} success=${zone.body.success === true}` +
      (zoneName ? ` name=${zoneName}` : '') +
      (zone.body.errors?.length ? ` errors=${JSON.stringify(zone.body.errors)}` : ''),
  );
  if (verify.status === 200 && zone.status !== 200) {
    lines.push('Diagnosis: token is valid but cannot see this zone (missing Zone resources / Zone Read).');
  } else if (verify.status === 200 && zone.status === 200) {
    lines.push('Diagnosis: token can see the zone; add Zone → Cache Purge → Purge if purge still 401/403.');
  } else if (verify.status === 401) {
    lines.push('Diagnosis: token rejected (expired, revoked, or still malformed after trim).');
  }
  return lines.join('\n');
}

const payload = hostsOnly ? { hosts: HOSTS } : { purge_everything: true };

const res = await fetch(`${API}/zones/${zoneId}/purge_cache`, {
  method: 'POST',
  headers: cloudflareAuthHeaders(token),
  body: JSON.stringify(payload),
});

const body = await res.json().catch(() => ({}));
if (!res.ok || body.success === false) {
  const detail = JSON.stringify(body.errors ?? body, null, 2);
  console.error(`Cache purge failed (${res.status}): ${detail}`);
  try {
    console.error(await diagnose());
  } catch (err) {
    console.error(`Diagnostics failed: ${err instanceof Error ? err.message : err}`);
  }
  console.error(PERMISSION_HELP);
  process.exit(1);
}

if (hostsOnly) {
  console.log(`Purged Cloudflare cache for ${HOSTS.join(', ')} (id: ${body.result?.id ?? 'ok'})`);
} else {
  console.log(`Purged Cloudflare zone cache (purge_everything, id: ${body.result?.id ?? 'ok'})`);
}
