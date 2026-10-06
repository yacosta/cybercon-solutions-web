#!/usr/bin/env node
/**
 * Lightweight, dependency-free smoke checks that run after `npm run build` in
 * CI. These are not a substitute for real end-to-end testing (Playwright/axe/
 * Lighthouse) — see README "Recommended next steps for CI" — but they catch
 * regressions that have shipped before: a stale "coming soon" placeholder
 * build, a security-header rollback, or lead delivery silently reporting
 * success with no configured sink.
 *
 * Usage: node scripts/ci-smoke-checks.mjs
 */

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const failures = [];

function fail(message) {
  failures.push(message);
}

function ok(message) {
  console.log(`  ok  ${message}`);
}

async function checkHomepageBuiltAndNotPlaceholder() {
  const label = 'dist/client/index.html exists and is not a placeholder';
  const indexPath = path.join(root, 'dist/client/index.html');
  if (!existsSync(indexPath)) {
    fail(`${label} — file not found (did \`npm run build\` run first?)`);
    return;
  }
  const html = await readFile(indexPath, 'utf8');
  const placeholders = ['Coming soon', 'Your new IT department is being built'];
  const found = placeholders.filter((needle) => html.includes(needle));
  if (found.length > 0) {
    fail(`${label} — found placeholder copy: ${found.join(', ')}`);
    return;
  }
  ok(label);
}

async function checkHealthDetailOrAboutPresent() {
  const label = 'detailed health route in source OR built about page';
  const detailRoute = path.join(root, 'src/pages/api/health/detail.ts');
  const aboutBuilt = path.join(root, 'dist/client/about/index.html');
  const aboutEsBuilt = path.join(root, 'dist/client/es/about/index.html');
  if (existsSync(detailRoute) || existsSync(aboutBuilt) || existsSync(aboutEsBuilt)) {
    ok(label);
    return;
  }
  fail(`${label} — neither src/pages/api/health/detail.ts nor a built /about/ page was found`);
}

async function checkSecurityHeaders() {
  const label = 'security headers present in src/middleware.ts';
  const middlewarePath = path.join(root, 'src/middleware.ts');
  if (!existsSync(middlewarePath)) {
    fail(`${label} — src/middleware.ts not found`);
    return;
  }
  const source = await readFile(middlewarePath, 'utf8');
  const required = ['content-security-policy-report-only', 'x-frame-options'];
  const missing = required.filter((needle) => !source.includes(needle));
  if (missing.length > 0) {
    fail(`${label} — missing: ${missing.join(', ')}`);
    return;
  }
  ok(label);
}

async function checkLeadDeliveryFailsClosed() {
  const label = 'lead delivery refuses silent success without a configured sink';
  const leadDeliveryPath = path.join(root, 'src/lib/lead-delivery.ts');
  if (!existsSync(leadDeliveryPath)) {
    fail(`${label} — src/lib/lead-delivery.ts not found`);
    return;
  }
  const source = await readFile(leadDeliveryPath, 'utf8');
  if (!source.includes('Lead delivery is temporarily unavailable')) {
    fail(`${label} — expected error string not found`);
    return;
  }
  ok(label);
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/g;
  for (const match of xml.matchAll(re)) {
    locs.push(
      match[1]
        .trim()
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&apos;', "'"),
    );
  }
  return locs;
}

async function checkPlainTextSitemap() {
  const label = 'sitemap.txt matches XML locs and stays a bare URL list';
  const txtPath = path.join(root, 'dist/client/sitemap.txt');
  const publicPath = path.join(root, 'public/sitemap.txt');
  if (!existsSync(txtPath) || !existsSync(publicPath)) {
    fail(`${label} — dist/client/sitemap.txt or public/sitemap.txt missing`);
    return;
  }

  const built = await readFile(txtPath, 'utf8');
  const published = await readFile(publicPath, 'utf8');
  if (built !== published) {
    fail(`${label} — public/sitemap.txt differs from dist/client/sitemap.txt`);
    return;
  }
  if (!built.endsWith('\n') || built.includes('\n\n') || built.startsWith('\n')) {
    fail(`${label} — file must be one URL per line with a single trailing newline`);
    return;
  }

  const lines = built.trimEnd().split('\n');
  const bad = lines.filter(
    (line) =>
      !line.startsWith('https://cybercon-solutions.com/') ||
      line.includes(' ') ||
      line.includes('/search') ||
      line.includes('/client') ||
      line.includes('/api/') ||
      line.includes('/404') ||
      (line !== 'https://cybercon-solutions.com/' && !line.endsWith('/')),
  );
  if (bad.length > 0) {
    fail(`${label} — unexpected lines: ${bad.slice(0, 5).join(', ')}`);
    return;
  }
  if (lines[0] !== 'https://cybercon-solutions.com/') {
    fail(`${label} — first URL must be the homepage`);
    return;
  }

  const clientDir = path.join(root, 'dist/client');
  const names = await readdir(clientDir);
  const xmlUrls = new Set();
  for (const name of names) {
    if (!name.startsWith('sitemap') || !name.endsWith('.xml')) continue;
    const xml = await readFile(path.join(clientDir, name), 'utf8');
    if (xml.includes('<sitemapindex')) continue;
    for (const loc of extractLocs(xml)) xmlUrls.add(loc);
  }
  const txtUrls = new Set(lines);
  const missing = [...xmlUrls].filter((url) => !txtUrls.has(url));
  const extra = [...txtUrls].filter((url) => !xmlUrls.has(url));
  if (missing.length || extra.length) {
    fail(
      `${label} — drift vs XML (missing ${missing.length}, extra ${extra.length})`,
    );
    return;
  }

  const robots = await readFile(path.join(root, 'public/robots.txt'), 'utf8');
  const headers = await readFile(path.join(root, 'public/_headers'), 'utf8');
  if (!robots.includes('Sitemap: https://cybercon-solutions.com/sitemap.txt')) {
    fail(`${label} — robots.txt is missing the sitemap.txt directive`);
    return;
  }
  if (!headers.includes('/sitemap.txt') || !headers.includes('text/plain; charset=utf-8')) {
    fail(`${label} — _headers must serve sitemap.txt as text/plain`);
    return;
  }

  ok(`${label} (${lines.length} URLs)`);
}

async function main() {
  console.log('Running CI smoke checks…');
  await checkHomepageBuiltAndNotPlaceholder();
  await checkHealthDetailOrAboutPresent();
  await checkSecurityHeaders();
  await checkLeadDeliveryFailsClosed();
  await checkPlainTextSitemap();

  if (failures.length > 0) {
    console.error('\nSmoke checks failed:');
    for (const message of failures) {
      console.error(`  ✗ ${message}`);
    }
    process.exit(1);
  }

  console.log('\nAll smoke checks passed.');
}

main().catch((err) => {
  console.error(err.stack || err.message || err);
  process.exit(1);
});
