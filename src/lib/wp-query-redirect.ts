/**
 * Legacy WordPress query permalinks (`?page_id=82`, `?p=123`).
 *
 * The prerendered homepage ignores the query string and returns 200 with full
 * homepage HTML + canonical `/`. Google still treats `/?page_id=82` as its own
 * URL (soft 404 / thin duplicate). `_redirects` cannot match query strings —
 * production 301s are the zone Single Redirect (`npm run cf:wp-query-redirect`).
 * This helper covers `astro dev` and any SSR request that reaches middleware.
 */

const WP_ID_PARAMS = ['page_id', 'p', 'attachment_id'] as const;

export function wordpressQueryRedirectPath(url: URL): string | null {
  const hasWpId = WP_ID_PARAMS.some((key) => {
    const value = url.searchParams.get(key);
    return value !== null && /^\d+$/.test(value);
  });
  if (!hasWpId) return null;

  const path = url.pathname;
  if (path === '/' || path === '/index.php') return '/';
  if (path === '/es' || path === '/es/') return '/es/';
  return null;
}
