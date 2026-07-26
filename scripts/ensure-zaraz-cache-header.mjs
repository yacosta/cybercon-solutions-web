#!/usr/bin/env node
/**
 * Ensure Cloudflare Response Header Transform Rule that sets a browser
 * Cache-Control on Zaraz's loader (`/cdn-cgi/zaraz/s.js`).
 *
 * That path is served by Cloudflare Zaraz (not Worker assets), so
 * `public/_headers` cannot set its TTL. Lighthouse flags it under
 * "Use efficient cache lifetimes" when Cache-Control is missing.
 *
 * Required env:
 *   CLOUDFLARE_API_TOKEN  — needs Zone Transform Rules Edit (+ Account Rulesets Read)
 *   CLOUDFLARE_ZONE_ID    — zone id for cybercon-solutions.com
 *                           (default: 41a145bf2688a227f9e321a31055fe19)
 *
 * Usage:
 *   npm run cf:zaraz-cache
 */

const DEFAULT_ZONE_ID = '41a145bf2688a227f9e321a31055fe19';

const RULE_REF = 'zaraz_sjs_browser_cache_control';
const RULE_DESCRIPTION = 'Browser Cache-Control for Zaraz s.js (Lighthouse cache lifetimes)';
const RULE_EXPRESSION =
  '(starts_with(http.request.uri.path, "/cdn-cgi/zaraz/s.js"))';
/** 7 days — helps repeat visits without pinning a frequently updated loader for a year. */
const CACHE_CONTROL = 'public, max-age=604800';
const PHASE = 'http_response_headers_transform';
const API = 'https://api.cloudflare.com/client/v4';

const token = process.env.CLOUDFLARE_API_TOKEN;
const zoneId = process.env.CLOUDFLARE_ZONE_ID || DEFAULT_ZONE_ID;

if (!token) {
  console.error(
    [
      'Missing CLOUDFLARE_API_TOKEN.',
      '',
      'Dashboard alternative (zone has no Response Header Transform yet):',
      '  Rules → Overview → Create rule → Modify response header',
      `  When: ${RULE_EXPRESSION}`,
      `  Then: Set static → header name Cache-Control → ${CACHE_CONTROL}`,
      '',
      'Docs: https://developers.cloudflare.com/rules/transform/response-header-modification/',
    ].join('\n'),
  );
  process.exit(1);
}

const desiredRule = {
  ref: RULE_REF,
  description: RULE_DESCRIPTION,
  expression: RULE_EXPRESSION,
  action: 'rewrite',
  enabled: true,
  action_parameters: {
    headers: {
      'Cache-Control': {
        operation: 'set',
        value: CACHE_CONTROL,
      },
    },
  },
};

async function cf(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
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
    rule.action === 'rewrite' &&
    rule.enabled !== false &&
    rule.action_parameters?.headers?.['Cache-Control']?.operation === 'set' &&
    rule.action_parameters?.headers?.['Cache-Control']?.value === CACHE_CONTROL
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
        name: 'Zone response header transforms',
        description: 'Zone-level Response Header Transform Rules',
        kind: 'zone',
        phase: PHASE,
        rules: [desiredRule],
      },
    });
    console.log(`Applied: ${RULE_REF} → Cache-Control: ${CACHE_CONTROL}`);
    return;
  }

  const existing = (ruleset.rules ?? []).find(isOurRule);
  if (existing && ruleMatchesDesired(existing)) {
    console.log(`OK: rule "${RULE_REF}" already set (${CACHE_CONTROL}).`);
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
  console.log(`Applied: ${RULE_REF} → Cache-Control: ${CACHE_CONTROL}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
