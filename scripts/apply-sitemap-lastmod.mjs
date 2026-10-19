#!/usr/bin/env node
/**
 * Replace sitemap <lastmod> with content dates.
 * Never uses the build clock. Sources, in order:
 *   1. lastReviewed on a service/industry record (src/data/*.ts)
 *   2. blog updatedDate ?? pubDate
 *   3. src/data/lastmod.json (pre-edit git committer dates)
 * If none of those exist, the <lastmod> element is removed.
 * sitemap-index.xml lastmod is set to the newest lastmod in sitemap-0.xml.
 */

import { copyFile, mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const clientDir = path.join(root, 'dist/client');

function frontmatterDate(markdown) {
  const fm = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const updated = fm[1].match(/^updatedDate:\s*['"]?(\d{4}-\d{2}-\d{2})/m);
  const published = fm[1].match(/^pubDate:\s*['"]?(\d{4}-\d{2}-\d{2})/m);
  return updated?.[1] ?? published?.[1] ?? null;
}

async function blogDates() {
  const dates = {};
  async function walk(dir, locale) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'es' && locale === 'en') await walk(full, 'es');
        continue;
      }
      if (!entry.name.endsWith('.md')) continue;
      const slug = entry.name.replace(/\.md$/, '');
      const url = locale === 'es' ? `/es/blog/${slug}/` : `/blog/${slug}/`;
      const date = frontmatterDate(await readFile(full, 'utf8'));
      if (date) dates[url] = date;
    }
  }
  await walk(path.join(root, 'src/content/blog'), 'en');
  return dates;
}

function explicitSlugDates(source) {
  const dates = {};
  const re = /lastReviewed:\s*'(\d{4}-\d{2}-\d{2})'/g;
  let match;
  while ((match = re.exec(source))) {
    const before = source.slice(0, match.index);
    const keys = [...before.matchAll(/^  (?:'([a-z0-9-]+)'|([A-Za-z][A-Za-z0-9-]*)): \{/gm)];
    const slug = keys.at(-1)?.[1] ?? keys.at(-1)?.[2];
    if (slug) dates[slug] = match[1];
  }
  return dates;
}

async function explicitUrls() {
  const urls = {};
  const services = explicitSlugDates(await readFile(path.join(root, 'src/data/service-details.ts'), 'utf8'));
  for (const [slug, date] of Object.entries(services)) {
    urls[`/services/${slug}/`] = date;
    urls[`/es/services/${slug}/`] = date;
  }
  const industries = explicitSlugDates(await readFile(path.join(root, 'src/data/industries.ts'), 'utf8'));
  for (const [slug, date] of Object.entries(industries)) {
    urls[`/industries/${slug}/`] = date;
    urls[`/es/industries/${slug}/`] = date;
  }
  return urls;
}

const manifest = JSON.parse(await readFile(path.join(root, 'src/data/lastmod.json'), 'utf8'));
const manifestUrls = manifest.urls ?? {};
const blogs = await blogDates();
const explicit = await explicitUrls();

function lastmodFor(pathname) {
  return explicit[pathname] ?? blogs[pathname] ?? manifestUrls[pathname] ?? null;
}

const sitemapFiles = (await readdir(clientDir)).filter((name) => /^sitemap-\d+\.xml$/.test(name));
if (sitemapFiles.length === 0) {
  console.error('apply-sitemap-lastmod: no sitemap-N.xml in dist/client');
  process.exit(1);
}

let newest = null;
for (const name of sitemapFiles) {
  const file = path.join(clientDir, name);
  let xml = await readFile(file, 'utf8');
  xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (block) => {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) return block;
    const pathname = new URL(locMatch[1]).pathname;
    const lastmod = lastmodFor(pathname);
    let next = block.replace(/<lastmod>[^<]*<\/lastmod>/g, '');
    if (lastmod) {
      next = next.replace('</loc>', `</loc><lastmod>${lastmod}</lastmod>`);
      const time = Date.parse(lastmod);
      if (!newest || time > newest.time) newest = { time, value: lastmod };
    }
    return next;
  });
  await writeFile(file, xml);
}

if (!newest) {
  console.error('apply-sitemap-lastmod: no lastmod values were written');
  process.exit(1);
}

const indexPath = path.join(clientDir, 'sitemap-index.xml');
let index = await readFile(indexPath, 'utf8');
if (/<lastmod>[^<]*<\/lastmod>/.test(index)) {
  index = index.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${newest.value}</lastmod>`);
} else {
  index = index.replace('</loc>', `</loc><lastmod>${newest.value}</lastmod>`);
}
await writeFile(indexPath, index);
console.log(`apply-sitemap-lastmod: index lastmod ${newest.value}`);

// Astro emits prerendered feeds under dist/client. Mirror the paths the
// verifier checks (`dist/rss.xml`, `dist/es/rss.xml`).
await mkdir(path.join(root, 'dist/es'), { recursive: true });
await copyFile(path.join(clientDir, 'rss.xml'), path.join(root, 'dist/rss.xml'));
await copyFile(path.join(clientDir, 'es/rss.xml'), path.join(root, 'dist/es/rss.xml'));
