import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Public health probe — intentionally minimal.
 * Detailed dependency status is at GET /api/health/detail with HEALTH_DETAIL_TOKEN.
 */
export const GET: APIRoute = async () => {
  return Response.json({
    ok: true,
    time: new Date().toISOString(),
  });
};
