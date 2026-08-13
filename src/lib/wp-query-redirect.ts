/**
 * Legacy WordPress query permalinks (`?page_id=82`, `?p=123`).
 *
 * The prerendered homepage ignores the query string and returns 200 with full
 * homepage HTML + canonical `/`. Google still treats `/?page_id=82` as its own
 * URL (soft 404 / thin duplicate). `_redirects` cannot match query strings.
 *
 * Production: `scripts/wrap-worker-wp-query.mjs` wraps the Worker fetch
 * (`run_worker_first` on `/` and `/es/`) so this 301 runs before ASSETS.
 * `astro dev` uses the same helper via middleware. Keep both in sync.
 */

const WP_ID_PARAMS = ['page_id', 'p', 'attachment_id'] as const;

export function wordpressQueryRedirectPath(url: URL): string | null {
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
