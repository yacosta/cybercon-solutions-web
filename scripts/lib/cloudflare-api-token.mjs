/**
 * Shared Cloudflare API token loading for zone scripts.
 *
 * Wrangler trims CLOUDFLARE_API_TOKEN; raw fetch does not. A trailing newline
 * in the GitHub secret deploys fine and 401s zone APIs.
 *
 * Optional CLOUDFLARE_ZONE_API_TOKEN lets the Workers deploy token stay
 * account-scoped while zone Cache Purge / Transform / Redirect use a
 * zone-capable token.
 */

export function cloudflareApiToken() {
  const zoneRaw = process.env.CLOUDFLARE_ZONE_API_TOKEN ?? '';
  const deployRaw = process.env.CLOUDFLARE_API_TOKEN ?? '';
  const raw = zoneRaw.trim() ? zoneRaw : deployRaw;
  const source = zoneRaw.trim() ? 'CLOUDFLARE_ZONE_API_TOKEN' : 'CLOUDFLARE_API_TOKEN';
  return {
    token: raw.trim(),
    source,
    hadWhitespace: raw.length > 0 && raw !== raw.trim(),
    present: Boolean(raw.trim()),
  };
}

export function cloudflareAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}
