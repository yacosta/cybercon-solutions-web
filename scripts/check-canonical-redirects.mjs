#!/usr/bin/env node
/**
 * Every indexable URL must be a trailing-slash canonical that returns 200,
 * with static 301s for the variants Cloudflare html_handling would 307:
 *   /page  → /page/
 *   /page.html → /page/
 *   /page/index.html → /page/
 *
 * Those 301s have to stay above the first splat in public/_redirects.
 * After a splat, Cloudflare counts every later rule toward the 100 dynamic limit.
 *
 * Also keeps /404/, /search/, and /es/search/ on permanent redirects and out of
 * the sitemap (they are noindex utility pages).
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const SITE = 'https://cybercon-solutions.com';
const UTILITY_PATHS = ['/404/', '/search/', '/es/search/'];

/**
 * @param {string} sitemapText
 * @param {string} redirectsText
 * @returns {string[]}
 */
export function findCanonicalRedirectGaps(sitemapText, redirectsText) {
  const gaps = [];
  const lines = redirectsText.split('\n');
  /** @type {{ from: string, to: string, code: string, dynamic: boolean }[]} */
  const rules = [];
  let seenSplat = false;
  let dynamicCount = 0;

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [from, to, code = '302'] = trimmed.split(/\s+/);
    if (!from || !to) continue;
    const dynamicToken = from.includes('*') || /:[A-Za-z]/.test(from);
    if (dynamicToken) seenSplat = true;
    if (seenSplat) dynamicCount += 1;
    rules.push({ from, to, code, dynamic: seenSplat });
  }

  if (dynamicCount > 100) {
    gaps.push(
      `public/_redirects has ${dynamicCount} rules from the first splat onward (Cloudflare limit is 100)`,
    );
  }

  const byFrom = new Map(rules.map((rule) => [rule.from, rule]));

  /** @param {string} pathname */
  function variants(pathname) {
    if (pathname === '/') return ['/index.html'];
    const bare = pathname.replace(/\/$/, '');
    return [bare, `${bare}.html`, `${pathname}index.html`];
  }

  /** @param {string} pathname @param {string} label */
  function requireRedirects(pathname, label) {
    for (const from of variants(pathname)) {
      const rule = byFrom.get(from);
      if (!rule) {
        gaps.push(`${label}: missing static 301 ${from} → ${pathname}`);
        continue;
      }
      if (rule.code !== '301' || rule.to !== pathname) {
        gaps.push(`${label}: ${from} → ${rule.to} ${rule.code} (want ${pathname} 301)`);
      } else if (rule.dynamic) {
        gaps.push(
          `${label}: ${from} is below the first splat, so Cloudflare may drop it with the dynamic-rule limit`,
        );
      }
    }
    const slash = byFrom.get(pathname);
    if (slash && slash.to !== pathname) {
      gaps.push(`${label}: canonical ${pathname} redirects to ${slash.to} and cannot be a 200 sitemap URL`);
    }
  }

  const urls = sitemapText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (urls.length === 0) gaps.push('sitemap.txt has no URLs');

  const pathnames = [];
  for (const url of urls) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      gaps.push(`sitemap.txt has an invalid URL: ${url}`);
      continue;
    }
    if (parsed.origin !== SITE) gaps.push(`sitemap URL is not on ${SITE}: ${url}`);
    if (parsed.search || parsed.hash) gaps.push(`sitemap URL is not canonical: ${url}`);
    if (parsed.pathname !== '/' && !parsed.pathname.endsWith('/')) {
      gaps.push(`sitemap URL is missing a trailing slash: ${url}`);
    }
    if (/\/(search|client|api|404|rss)(\/|$)/.test(parsed.pathname)) {
      gaps.push(`sitemap includes a non-indexable URL: ${url}`);
    }
    pathnames.push(parsed.pathname);
    requireRedirects(parsed.pathname, url);
  }

  const listed = new Set(pathnames);
  for (const utility of UTILITY_PATHS) {
    if (listed.has(utility)) gaps.push(`utility page must stay out of the sitemap: ${utility}`);
    requireRedirects(utility, `utility ${utility}`);
  }

  return gaps;
}

async function main() {
  const sitemapText = await readFile(path.join(root, 'public/sitemap.txt'), 'utf8');
  const redirectsText = await readFile(path.join(root, 'public/_redirects'), 'utf8');
  const gaps = findCanonicalRedirectGaps(sitemapText, redirectsText);
  if (gaps.length) {
    console.error(`canonical redirects: ${gaps.length} problem(s)`);
    for (const gap of gaps) console.error(`  ${gap}`);
    process.exit(1);
  }
  const count = sitemapText.trim().split('\n').filter(Boolean).length;
  console.log(`canonical redirects: ${count} sitemap URLs and utility pages have permanent 301s`);
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((error) => {
    console.error(error.stack || error.message || error);
    process.exit(1);
  });
}
