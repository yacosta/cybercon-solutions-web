#!/usr/bin/env node
/**
 * Post-build SEO checks. Exits 1 on any failure.
 * Check 1 runs `npm run seo:lengths`.
 * Checks 2–4 scan every HTML file under dist/.
 * Check 5 skips 404, search, client, api, redirect stubs, and noindex pages.
 */

import { execSync } from 'node:child_process';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { findCanonicalRedirectGaps } from './check-canonical-redirects.mjs';

const root = path.resolve(import.meta.dirname, '..');
const distDir = path.join(root, 'dist');
const clientDir = path.join(distDir, 'client');
const site = 'https://cybercon-solutions.com';
const failures = [];

function fail(message) {
  failures.push(message);
}

async function walk(dir, acc = []) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function fileToPath(file) {
  const rel = path.relative(clientDir, file).split(path.sep).join('/');
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  if (rel.endsWith('.html')) {
    const trimmed = rel.slice(0, -'.html'.length);
    if (trimmed === 'index') return '/';
    return `/${trimmed}/`;
  }
  return null;
}

function pathToFile(urlPath) {
  if (urlPath === '/') return path.join(clientDir, 'index.html');
  return path.join(clientDir, urlPath.replace(/^\//, ''), 'index.html');
}

function skipPage(urlPath, html) {
  if (/http-equiv\s*=\s*["']refresh["']/i.test(html)) return true;
  if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) return true;
  if (/<meta\b[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html)) return true;
  if (!urlPath) return true;
  if (urlPath === '/404/' || urlPath.endsWith('/404/')) return true;
  if (urlPath === '/search/' || urlPath.startsWith('/search/') || urlPath === '/es/search/' || urlPath.startsWith('/es/search/')) {
    return true;
  }
  if (urlPath === '/client/' || urlPath.startsWith('/client/') || urlPath === '/es/client/' || urlPath.startsWith('/es/client/')) {
    return true;
  }
  if (urlPath.startsWith('/api/')) return true;
  return false;
}

function headOf(html) {
  const match = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return match ? match[1] : html;
}

function alternates(head) {
  const links = [];
  const re = /<link\b[^>]*>/gi;
  for (const tag of head.matchAll(re)) {
    const rel = tag[0].match(/\brel=["']([^"']+)["']/i)?.[1] ?? '';
    const href = tag[0].match(/\bhref=["']([^"']+)["']/i)?.[1] ?? '';
    const lang = tag[0].match(/\bhreflang=["']([^"']+)["']/i)?.[1];
    if (rel.split(/\s+/).includes('alternate') || rel.split(/\s+/).includes('canonical')) {
      links.push({ rel, href, lang });
    }
  }
  return links;
}

function typedIds(html) {
  const ids = [];
  const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of blocks) {
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch (error) {
      return { error: error.message, ids };
    }
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }
      if (node['@type'] && typeof node['@id'] === 'string') ids.push(node['@id']);
      for (const value of Object.values(node)) {
        if (value && typeof value === 'object') walk(value);
      }
    };
    walk(data);
  }
  return { ids };
}

function xmlWellFormed(xml) {
  const stripped = xml
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '');
  const stack = [];
  const re = /<\/?([A-Za-z0-9:_-]+)([^>]*)>/g;
  for (const tag of stripped.matchAll(re)) {
    const name = tag[1];
    const closing = tag[0].startsWith('</');
    const selfClosing = /\/>$/.test(tag[0]);
    if (closing) {
      if (stack.at(-1) !== name) return `expected </${stack.at(-1) ?? '?'}> but found </${name}>`;
      stack.pop();
    } else if (!selfClosing) stack.push(name);
  }
  return stack.length ? `unclosed <${stack.at(-1)}>` : null;
}

console.log('seo:verify check 0 — canonical redirect 301s');
const redirectGaps = findCanonicalRedirectGaps(
  await readFile(path.join(root, 'public/sitemap.txt'), 'utf8'),
  await readFile(path.join(root, 'public/_redirects'), 'utf8'),
);
for (const gap of redirectGaps) fail(gap);

console.log('seo:verify check 1 — seo:lengths');
try {
  execSync('npm run seo:lengths', { cwd: root, stdio: 'inherit' });
} catch {
  fail('seo:lengths failed');
}

const files = await walk(distDir);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
if (htmlFiles.length === 0) fail('no HTML files under dist/');

console.log('seo:verify checks 2–4 — forbidden strings');
for (const file of files) {
  let text = '';
  try {
    const info = await stat(file);
    if (info.size > 5_000_000) continue;
    text = await readFile(file, 'utf8');
  } catch {
    continue;
  }
  if (text.includes('/es/es/')) fail(`/es/es/ in ${path.relative(root, file)}`);
  if (text.includes('x.com/cybercon-solutions')) fail(`invalid X URL in ${path.relative(root, file)}`);
}

for (const localeDir of ['services/managed-it', 'es/services/managed-it']) {
  const dir = path.join(clientDir, localeDir);
  const pages = (await walk(dir)).filter((file) => file.endsWith('.html') && !file.includes(`${path.sep}broward-county${path.sep}`) && !file.includes(`${path.sep}cooper-city${path.sep}`) && !file.includes(`${path.sep}davie${path.sep}`));
  // The managed IT page itself is index.html directly in that directory.
  const page = path.join(dir, 'index.html');
  const html = await readFile(page, 'utf8');
  if (html.includes('#site-check')) fail(`#site-check in ${path.relative(root, page)}`);
  void pages;
}

console.log('seo:verify check 5 — per-page HTML');
const pageHtml = new Map();
for (const file of htmlFiles) {
  if (!file.startsWith(clientDir)) continue;
  const urlPath = fileToPath(file);
  if (!urlPath || urlPath.endsWith('.xml/')) continue;
  const html = await readFile(file, 'utf8');
  pageHtml.set(urlPath, html);
}

for (const [urlPath, html] of pageHtml) {
  if (skipPage(urlPath, html)) continue;
  const h1s = html.match(/<h1\b/gi) ?? [];
  if (h1s.length !== 1) fail(`${urlPath} has ${h1s.length} h1 elements`);

  const head = headOf(html);
  const links = alternates(head);
  const canonical = links.find((link) => link.rel.split(/\s+/).includes('canonical'));
  const expectedCanonical = `${site}${urlPath === '/' ? '/' : urlPath}`;
  if (!canonical) fail(`${urlPath} missing canonical`);
  else if (canonical.href !== expectedCanonical) fail(`${urlPath} canonical ${canonical.href} != ${expectedCanonical}`);

  const byLang = Object.fromEntries(links.filter((link) => link.lang).map((link) => [link.lang, link.href]));
  for (const lang of ['en-US', 'es-US', 'x-default']) {
    if (!byLang[lang]) fail(`${urlPath} missing hreflang ${lang}`);
  }
  if (byLang['x-default'] && byLang['en-US'] && byLang['x-default'] !== byLang['en-US']) {
    fail(`${urlPath} x-default does not match en-US`);
  }
  for (const lang of ['en-US', 'es-US']) {
    const href = byLang[lang];
    if (!href) continue;
    let targetPath = '';
    try {
      targetPath = new URL(href).pathname;
    } catch {
      fail(`${urlPath} hreflang ${lang} is not a URL`);
      continue;
    }
    const targetFile = pathToFile(targetPath);
    try {
      await stat(targetFile);
    } catch {
      fail(`${urlPath} hreflang ${lang} target missing: ${targetPath}`);
      continue;
    }
    const targetHtml = pageHtml.get(targetPath) ?? (await readFile(targetFile, 'utf8'));
    pageHtml.set(targetPath, targetHtml);
    const back = alternates(headOf(targetHtml)).find((link) => link.lang === (urlPath.startsWith('/es/') ? 'es-US' : 'en-US'));
    const self = `${site}${urlPath}`;
    if (!back || back.href !== self) fail(`${urlPath} hreflang ${lang} is not reciprocal (${back?.href ?? 'missing'})`);
  }

  const jsonLd = typedIds(html);
  if (jsonLd.error) fail(`${urlPath} JSON-LD parse error: ${jsonLd.error}`);
  const seen = new Set();
  for (const id of jsonLd.ids ?? []) {
    if (seen.has(id)) fail(`${urlPath} duplicate JSON-LD @id ${id}`);
    seen.add(id);
  }
}

console.log('seo:verify check 6 — direct answers');
for (const [urlPath, html] of pageHtml) {
  if (!html.includes('data-direct-answer')) continue;
  const h1 = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i);
  if (!h1) {
    fail(`${urlPath} direct answer without h1`);
    continue;
  }
  const after = html.slice(h1.index + h1[0].length);
  const next = after.match(/^\s*<p\b([^>]*)>/i);
  if (!next || !next[1].includes('data-direct-answer')) {
    fail(`${urlPath} data-direct-answer is not the element immediately after h1`);
  }
  const para = html.match(/<p\b[^>]*data-direct-answer[^>]*>([\s\S]*?)<\/p>/i);
  const text = (para?.[1] ?? '').replace(/<[^>]+>/g, '').trim();
  const count = text ? text.split(/\s+/).length : 0;
  if (count < 40 || count > 60) fail(`${urlPath} direct answer has ${count} words`);
}

console.log('seo:verify check 7 — sitemap');
const sitemap = await readFile(path.join(clientDir, 'sitemap-0.xml'), 'utf8');
const indexXml = await readFile(path.join(clientDir, 'sitemap-index.xml'), 'utf8');
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
if (new Set(lastmods).size < 2) fail('sitemap-0.xml lastmod values are not distinct');
const newest = lastmods.reduce((best, value) => (Date.parse(value) > Date.parse(best) ? value : best));
const indexLastmod = indexXml.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
if (indexLastmod !== newest) fail(`sitemap index lastmod ${indexLastmod} != newest ${newest}`);
for (const href of sitemap.matchAll(/<xhtml:link\b[^>]*href="([^"]+)"/g)) {
  const pathname = new URL(href[1]).pathname;
  try {
    await stat(pathToFile(pathname));
  } catch {
    fail(`sitemap hreflang target missing: ${pathname}`);
  }
}

console.log('seo:verify check 8 — RSS');
for (const feed of ['dist/rss.xml', 'dist/es/rss.xml']) {
  const xml = await readFile(path.join(root, feed), 'utf8');
  const problem = xmlWellFormed(xml);
  if (problem) fail(`${feed} is not well-formed XML (${problem})`);
  if (!xml.includes('<item>')) fail(`${feed} has no items`);
}
for (const [urlPath, html] of pageHtml) {
  if (skipPage(urlPath, html)) continue;
  const head = headOf(html);
  const expected = urlPath.startsWith('/es/') ? '/es/rss.xml' : '/rss.xml';
  const rss = [...head.matchAll(/<link\b[^>]*>/gi)].find((tag) => /application\/rss\+xml/i.test(tag[0]) && tag[0].includes(`href="${expected}"`));
  if (!rss) fail(`${urlPath} missing RSS alternate ${expected}`);
}

if (failures.length) {
  console.error(`seo:verify: ${failures.length} failure(s)`);
  for (const message of failures) console.error(`FAIL ${message}`);
  process.exit(1);
}
console.log('seo:verify: all checks passed');
