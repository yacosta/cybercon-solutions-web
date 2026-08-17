/**
 * Shared Cloudflare API token loading for zone scripts.
 *
 * Wrangler trims CLOUDFLARE_API_TOKEN; raw fetch does not. A trailing newline
 * in the GitHub secret deploys fine and 401s zone APIs.
 *
 * Preference order:
 *   CLOUDFLARE_FLUSH_CACHE     — Cache Purge token (GitHub secret)
 *   CLOUDFLARE_ZONE_API_TOKEN  — optional zone-capable token
 *   CLOUDFLARE_API_TOKEN       — Workers deploy token (often lacks Cache Purge)
 */

const TOKEN_ENV_KEYS = [
  'CLOUDFLARE_FLUSH_CACHE',
  'CLOUDFLARE_ZONE_API_TOKEN',
  'CLOUDFLARE_API_TOKEN',
];

export function cloudflareApiToken() {
  for (const source of TOKEN_ENV_KEYS) {
    const raw = process.env[source] ?? '';
    if (!raw.trim()) continue;
    return {
      token: raw.trim(),
      source,
      hadWhitespace: raw !== raw.trim(),
      present: true,
    };
  }
  return {
    token: '',
    source: 'CLOUDFLARE_FLUSH_CACHE',
    hadWhitespace: false,
    present: false,
  };
}

export function cloudflareAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}
