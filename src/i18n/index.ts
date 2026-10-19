import type { Messages } from './en';
import { en } from './en';
import { es } from './es';

export type { Messages };

const catalogs: Record<string, Messages> = { en, es };

export function getMessages(locale: string): Messages {
  return catalogs[locale] ?? en;
}

/**
 * Locale-prefix a site path. Idempotent for Spanish: a path that already
 * starts with `/es` is not prefixed again. Hash-only anchors and absolute
 * URLs (including protocol-relative) are returned unchanged.
 */
export function localePath(locale: string, path = '/'): string {
  if (locale !== 'es') return path;
  if (path.startsWith('#') || path.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(path)) {
    return path;
  }
  const hashAt = path.indexOf('#');
  const hash = hashAt === -1 ? '' : path.slice(hashAt);
  let pathname = hashAt === -1 ? path : path.slice(0, hashAt);
  if (!pathname) pathname = '/';
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  pathname = pathname.replace(/^\/es(?=\/|$)/, '') || '/';
  if (pathname === '/') return `/es/${hash}`;
  return `/es${pathname}${hash}`;
}

export function alternateLocale(current: string): { locale: string; path: string } {
  return current === 'es'
    ? { locale: 'en', path: '/' }
    : { locale: 'es', path: '/es/' };
}
