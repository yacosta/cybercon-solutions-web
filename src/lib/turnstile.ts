/** Public site key — available at build for prerendered pages via Vite env. */
export function turnstileSiteKey(): string | undefined {
  const key = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
  return typeof key === 'string' && key.trim() ? key.trim() : undefined;
}
