#!/usr/bin/env node
/**
 * Refresh src/data/lastmod.json from `git log -1 --format=%cI`.
 * Run when page content genuinely changes. Do not run for metadata-only
 * SEO edits — those must keep the committed manifest dates.
 *
 * Shallow clones and CI checkouts without history cannot invent dates:
 * this script exits without rewriting the manifest. The build reads the
 * committed file instead (see scripts/apply-sitemap-lastmod.mjs).
 */

import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outFile = path.join(root, 'src/data/lastmod.json');

function git(args) {
  return execSync(`git ${args}`, { cwd: root, encoding: 'utf8' }).trim();
}

const shallow = git('rev-parse --is-shallow-repository') === 'true';
if (shallow) {
  console.error('update-lastmod: repository is shallow; leaving src/data/lastmod.json unchanged.');
  process.exit(0);
}

function gitDate(rel) {
  const value = git(`log -1 --format=%cI -- ${rel}`);
  return value || null;
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const files = {};
for (const relRoot of ['src/pages', 'src/content', 'src/data']) {
  for (const abs of walk(path.join(root, relRoot))) {
    if (!/\.(astro|md|ts)$/.test(abs)) continue;
    const rel = path.relative(root, abs);
    files[rel] = gitDate(rel);
  }
}

function slugs(file) {
  const text = readFileSync(path.join(root, file), 'utf8');
  return [...text.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
}

const urls = {};
function add(url, file) {
  urls[url] = files[file] ?? gitDate(file);
}

add('/', 'src/pages/index.astro');
add('/es/', 'src/pages/es/index.astro');
add('/about/', 'src/pages/about/index.astro');
add('/es/about/', 'src/pages/es/about/index.astro');
add('/accessibility/', 'src/pages/accessibility/index.astro');
add('/es/accessibility/', 'src/pages/es/accessibility/index.astro');
add('/assessment/', 'src/pages/assessment/index.astro');
add('/es/assessment/', 'src/pages/es/assessment/index.astro');
add('/blog/', 'src/pages/blog/index.astro');
add('/es/blog/', 'src/pages/es/blog/index.astro');
add('/contact/', 'src/pages/contact/index.astro');
add('/es/contact/', 'src/pages/es/contact/index.astro');
add('/privacy/', 'src/pages/privacy/index.astro');
add('/es/privacy/', 'src/pages/es/privacy/index.astro');
add('/terms/', 'src/pages/terms/index.astro');
add('/es/terms/', 'src/pages/es/terms/index.astro');
for (const slug of slugs('src/data/services.ts')) {
  add(`/services/${slug}/`, 'src/pages/services/[slug].astro');
  add(`/es/services/${slug}/`, 'src/pages/es/services/[slug].astro');
}
for (const city of ['cooper-city', 'davie', 'broward-county']) {
  add(`/services/managed-it/${city}/`, `src/pages/services/managed-it/${city}/index.astro`);
  add(`/es/services/managed-it/${city}/`, `src/pages/es/services/managed-it/${city}/index.astro`);
}
for (const slug of slugs('src/data/industries.ts')) {
  add(`/industries/${slug}/`, 'src/pages/industries/[slug].astro');
  add(`/es/industries/${slug}/`, 'src/pages/es/industries/[slug].astro');
}
const blogDir = path.join(root, 'src/content/blog');
for (const name of readdirSync(blogDir)) {
  if (name.endsWith('.md')) add(`/blog/${name.replace(/\.md$/, '')}/`, `src/content/blog/${name}`);
}
for (const name of readdirSync(path.join(blogDir, 'es'))) {
  if (name.endsWith('.md')) add(`/es/blog/${name.replace(/\.md$/, '')}/`, `src/content/blog/es/${name}`);
}

const previous = JSON.parse(readFileSync(outFile, 'utf8'));
const manifest = {
  note: previous.note,
  commit: git('rev-parse HEAD'),
  shallow: false,
  files,
  urls,
};
writeFileSync(outFile, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`update-lastmod: wrote ${Object.keys(urls).length} urls from git history`);
