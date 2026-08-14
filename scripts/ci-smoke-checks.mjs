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

import { readFile } from 'node:fs/promises';
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

async function main() {
  console.log('Running CI smoke checks…');
  await checkHomepageBuiltAndNotPlaceholder();
  await checkHealthDetailOrAboutPresent();
  await checkSecurityHeaders();
  await checkLeadDeliveryFailsClosed();

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
