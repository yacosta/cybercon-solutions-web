import type { Messages } from './en';
import { en } from './en';
import { es } from './es';

const catalogs: Record<string, Messages> = { en, es };

export function getMessages(locale: string): Messages {
  return catalogs[locale] ?? en;
}

export function localePath(locale: string, path = '/'): string {
  if (locale === 'en') return path;
  return path === '/' ? '/es/' : `/es${path}`;
}

export function alternateLocale(current: string): { locale: string; path: string } {
  return current === 'es'
    ? { locale: 'en', path: '/' }
    : { locale: 'es', path: '/es/' };
}
