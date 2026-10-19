#!/usr/bin/env node
/**
 * Scan built HTML for <title> and meta description lengths.
 * Hard limits fail the process. Soft targets are printed as warnings.
 *
 * Title: soft 50–60, hard 45–70.
 * Description: soft 120–155, hard 110–165.
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { decodeHTML } from 'entities';

const root = path.resolve(import.meta.dirname, '..');
const distDir = path.join(root, 'dist');

const TITLE_HARD = { min: 45, max: 70 };
const TITLE_SOFT = { min: 50, max: 60 };
const DESC_HARD = { min: 110, max: 165 };
const DESC_SOFT = { min: 120, max: 155 };

function shouldSkip(urlPath, html) {
  if (/http-equiv\s*=\s*["']refresh["']/i.test(html)) return true;
  if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html) || /<meta[^>]+content=["'][^"']*noindex/i.test(html)) {
    return true;
  }
  const p = urlPath.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  const normalized = p.startsWith('/') ? p : `/${p}`;
  if (normalized === '/404' || normalized === '/404/' || normalized.endsWith('/404/') || normalized.endsWith('/404.html')) {
    return true;
  }
  if (normalized === '/search' || normalized.startsWith('/search/') || normalized === '/es/search' || normalized.startsWith('/es/search/')) {
    return true;
  }
  if (normalized === '/client' || normalized.startsWith('/client/') || normalized === '/es/client' || normalized.startsWith('/es/client/')) {
    return true;
  }
  if (normalized === '/api' || normalized.startsWith('/api/') || normalized.includes('/api/')) return true;
  return false;
}

function fileToPath(rel) {
  let p = `/${rel.replaceAll(path.sep, '/')}`;
  if (p.endsWith('/index.html')) p = p.slice(0, -'index.html'.length);
  else if (p.endsWith('.html')) p = p.slice(0, -'.html'.length);
  if (!p.endsWith('/')) p += '/';
  return p;
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
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function field(html, kind) {
  if (kind === 'title') {
    const match = html.match(/<title>([\s\S]*?)<\/title>/i);
    return match ? decodeHTML(match[1]).trim() : '';
  }
  const match = html.match(/<meta\s+[^>]*name=["']description["'][^>]*>/i);
  if (!match) return '';
  const content = match[0].match(/\bcontent=["']([\s\S]*?)["']/i);
  return content ? decodeHTML(content[1]).trim() : '';
}

function limits(kind) {
  return kind === 'title'
    ? { hard: TITLE_HARD, soft: TITLE_SOFT }
    : { hard: DESC_HARD, soft: DESC_SOFT };
}

const files = await walk(distDir);
if (files.length === 0) {
  console.error('seo:lengths: no HTML files under dist/. Run npm run build first.');
  process.exit(1);
}

const hards = [];
const softs = [];

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const rel = path.relative(path.join(distDir, 'client'), file);
  const urlPath = fileToPath(rel.startsWith('..') ? path.relative(distDir, file) : rel);
  if (shouldSkip(urlPath, html)) continue;
  for (const kind of ['title', 'description']) {
    const text = field(html, kind);
    const count = Array.from(text).length;
    const { hard, soft } = limits(kind);
    const row = { urlPath, kind, count, text };
    if (!text || count < hard.min || count > hard.max) hards.push(row);
    else if (count < soft.min || count > soft.max) softs.push(row);
  }
}

for (const row of softs) {
  console.log(`WARN ${row.kind} ${row.count} ${row.urlPath}\n  ${row.text}`);
}
for (const row of hards) {
  console.error(`FAIL ${row.kind} ${row.count} ${row.urlPath}\n  ${row.text}`);
}

if (hards.length) {
  console.error(`seo:lengths: ${hards.length} hard violation(s)`);
  process.exit(1);
}
console.log(`seo:lengths: 0 hard violations (${softs.length} soft warnings)`);
