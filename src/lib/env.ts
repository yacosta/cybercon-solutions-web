import { env as cloudflareEnv } from 'cloudflare:workers';

/**
 * Read a Cloudflare Worker secret/var at runtime.
 *
 * Dashboard secrets are NOT available via `import.meta.env` in production —
 * those are Vite build-time substitutions. Use `cloudflare:workers` instead,
 * with `import.meta.env` as a local `.env` / build-time fallback.
 *
 * @see https://docs.astro.build/en/guides/integrations-guide/cloudflare/#environment-variables-and-bindings
 */
export function runtimeEnv(name: string): string | undefined {
  const fromCf = (cloudflareEnv as Record<string, unknown>)[name];
  if (typeof fromCf === 'string' && fromCf.trim()) return fromCf.trim();

  const fromMeta = (import.meta.env as Record<string, unknown>)[name];
  if (typeof fromMeta === 'string' && fromMeta.trim()) return fromMeta.trim();
  return undefined;
}
