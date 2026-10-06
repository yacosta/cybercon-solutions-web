#!/usr/bin/env node
/**
 * Write /sitemap.txt from the XML sitemap @astrojs/sitemap just emitted.
 *
 * Google’s text-sitemap rules: UTF-8, one absolute URL per line, nothing else
 * (no header, comments, or blank lines). That same shape is what AI agents
 * can read without an XML parser — keep the file that strict.
 *
 * Run after `astro build` (needs dist/client/sitemap-*.xml). Writes:
 *   dist/client/sitemap.txt  — the file the Worker deploy serves
 *   public/sitemap.txt       — committed copy so `astro dev` serves the same list
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const clientDir = path.join(root, 'dist/client');
const SITE = 'https://cybercon-solutions.com';

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/g;
  for (const match of xml.matchAll(re)) {
    locs.push(decodeXml(match[1].trim()));
  }
  return locs;
}

/** Same exclusions as the sitemap filter in astro.config.mjs, plus client without a trailing slash. */
function excluded(url) {
  let pathname = '';
  try {
    pathname = new URL(url).pathname;
  } catch {
    return true;
  }
  return (
    url.includes('/client/') ||
    pathname === '/client' ||
    pathname.startsWith('/client/') ||
    pathname === '/es/client' ||
    pathname.startsWith('/es/client/') ||
    url.includes('/api/') ||
    url.includes('/search') ||
    url.includes('/404')
  );
}

function assertCanonical(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`sitemap.txt: invalid URL ${JSON.stringify(url)}`);
  }
  if (parsed.origin !== SITE) {
    throw new Error(`sitemap.txt: URL is not on ${SITE}: ${url}`);
  }
  if (parsed.search || parsed.hash) {
    throw new Error(`sitemap.txt: URL must be canonical (no query or hash): ${url}`);
  }
  if (parsed.pathname !== '/' && !parsed.pathname.endsWith('/')) {
    throw new Error(`sitemap.txt: URL must use a trailing slash: ${url}`);
  }
  if (url.includes('\n') || url.includes('\r')) {
    throw new Error('sitemap.txt: URL contains a newline');
  }
}

/**
 * Homepage first, then English paths, then Spanish. Alphabetical within each
 * group so a partial read still starts at the entry URL.
 */
function sortKey(url) {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return `0\t${pathname}`;
  const spanish = pathname === '/es/' || pathname.startsWith('/es/');
  return `${spanish ? '2' : '1'}\t${pathname}`;
}

async function urlsFromXmlSitemaps() {
  const names = await readdir(clientDir);
  const files = names.filter((name) => name.startsWith('sitemap') && name.endsWith('.xml'));
  if (files.length === 0) {
    throw new Error('sitemap.txt: no sitemap*.xml under dist/client (run astro build first)');
  }

  const urls = new Set();
  for (const name of files) {
    const xml = await readFile(path.join(clientDir, name), 'utf8');
    if (xml.includes('<sitemapindex')) continue;
    for (const loc of extractLocs(xml)) {
      if (excluded(loc)) {
        throw new Error(`sitemap.txt: XML sitemap ${name} includes a non-indexable URL: ${loc}`);
      }
      assertCanonical(loc);
      urls.add(loc);
    }
  }

  if (urls.size === 0) {
    throw new Error('sitemap.txt: XML sitemaps contained no indexable URLs');
  }

  return [...urls].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
}

const urls = await urlsFromXmlSitemaps();
const body = `${urls.join('\n')}\n`;
const targets = [
  path.join(clientDir, 'sitemap.txt'),
  path.join(root, 'public/sitemap.txt'),
];

for (const target of targets) {
  await writeFile(target, body, 'utf8');
}

console.log(`sitemap.txt: wrote ${urls.length} URLs`);
