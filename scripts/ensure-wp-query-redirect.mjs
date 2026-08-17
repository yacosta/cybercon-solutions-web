#!/usr/bin/env node
/**
 * Ensure a Cloudflare Single Redirect that 301s leftover WordPress query
 * permalinks (`/?page_id=82`, `/?p=123`) to the locale homepage.
 *
 * Workers `_redirects` cannot match query strings (see Cloudflare docs).
 * The prerendered homepage would otherwise 200 the same HTML at that URL,
 * which GSC reports as a soft 404 / thin duplicate.
 *
 * Required env:
 *   CLOUDFLARE_API_TOKEN  — Zone → Redirect Rules / Single Redirects → Edit
 *   CLOUDFLARE_ZONE_ID    — zone id for cybercon-solutions.com
 *                           (default: 41a145bf2688a227f9e321a31055fe19)
 *
 * Usage:
 *   npm run cf:wp-query-redirect
 */

import { cloudflareApiToken, cloudflareAuthHeaders } from './lib/cloudflare-api-token.mjs';

const DEFAULT_ZONE_ID = '41a145bf2688a227f9e321a31055fe19';

const RULE_REF = 'wp_query_permalink_301';
const RULE_DESCRIPTION =
  '301 WordPress ?page_id= / ?p= query permalinks to the locale homepage (GSC soft 404)';
const RULE_EXPRESSION =
  '(http.request.uri.path in {"/" "/es" "/es/" "/index.php"} and http.request.uri.query matches "(^|&)(page_id|p|attachment_id)=[0-9]+")';
/** Always apex; drop the WP query so we do not bounce to the same URL. */
const TARGET_URL_EXPRESSION =
  'concat("https://cybercon-solutions.com", starts_with(http.request.uri.path, "/es") ? "/es/" : "/")';
const PHASE = 'http_request_dynamic_redirect';
const API = 'https://api.cloudflare.com/client/v4';

const { token } = cloudflareApiToken();
const zoneId = (process.env.CLOUDFLARE_ZONE_ID || DEFAULT_ZONE_ID).trim();

if (!token) {
  console.error(
    [
      'Missing CLOUDFLARE_API_TOKEN.',
      '',
      'Dashboard alternative:',
      '  Rules → Redirect Rules → Create rule',
      `  When: ${RULE_EXPRESSION}`,
      `  Then: Dynamic URL → ${TARGET_URL_EXPRESSION}`,
      '  Status: 301 Permanent; Preserve query string: off',
      '',
      'Docs: https://developers.cloudflare.com/rules/url-forwarding/single-redirects/',
    ].join('\n'),
  );
  process.exit(1);
}

const desiredRule = {
  ref: RULE_REF,
  description: RULE_DESCRIPTION,
  expression: RULE_EXPRESSION,
  action: 'redirect',
  enabled: true,
  action_parameters: {
    from_value: {
      target_url: {
        expression: TARGET_URL_EXPRESSION,
      },
      status_code: 301,
      preserve_query_string: false,
    },
  },
};

async function cf(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: cloudflareAuthHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    const err = new Error(
      `${method} ${path} failed (${res.status}): ${JSON.stringify(json.errors ?? json, null, 2)}`,
    );
    err.status = res.status;
    err.payload = json;
    throw err;
  }
  return json.result;
}

function isOurRule(rule) {
  return rule?.ref === RULE_REF || rule?.description === RULE_DESCRIPTION;
}

function ruleMatchesDesired(rule) {
  return (
    isOurRule(rule) &&
    rule.expression === RULE_EXPRESSION &&
    rule.action === 'redirect' &&
    rule.enabled !== false &&
    rule.action_parameters?.from_value?.status_code === 301 &&
    rule.action_parameters?.from_value?.preserve_query_string === false &&
    rule.action_parameters?.from_value?.target_url?.expression ===
      TARGET_URL_EXPRESSION
  );
}

function serializeExisting(rule) {
  return {
    ...(rule.ref ? { ref: rule.ref } : {}),
    ...(rule.id && !rule.ref ? { id: rule.id } : {}),
    expression: rule.expression,
    description: rule.description,
    action: rule.action,
    action_parameters: rule.action_parameters,
    enabled: rule.enabled !== false,
  };
}

async function main() {
  let ruleset;
  try {
    ruleset = await cf(`/zones/${zoneId}/rulesets/phases/${PHASE}/entrypoint`);
  } catch (err) {
    if (err.status !== 404) throw err;
    console.log(`Creating zone ruleset for phase ${PHASE}…`);
    ruleset = await cf(`/zones/${zoneId}/rulesets`, {
      method: 'POST',
      body: {
        name: 'Redirect rules ruleset',
        description: 'Zone-level Single Redirects',
        kind: 'zone',
        phase: PHASE,
        rules: [desiredRule],
      },
    });
    console.log(`Applied: ${RULE_REF} → 301 WordPress query permalinks`);
    return;
  }

  const existing = (ruleset.rules ?? []).find(isOurRule);
  if (existing && ruleMatchesDesired(existing)) {
    console.log(`OK: rule "${RULE_REF}" already set.`);
    return;
  }

  const others = (ruleset.rules ?? []).filter((r) => !isOurRule(r)).map(serializeExisting);
  const updated = await cf(`/zones/${zoneId}/rulesets/${ruleset.id}`, {
    method: 'PUT',
    body: { rules: [...others, desiredRule] },
  });

  if (!updated.rules?.some(isOurRule)) {
    throw new Error('Rule upsert completed but rule not found in ruleset result');
  }
  console.log(`Applied: ${RULE_REF} → 301 WordPress query permalinks`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
