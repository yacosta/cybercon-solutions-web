import type { APIRoute } from 'astro';
import { runtimeEnv } from '../../lib/env';
import {
  captureSiteCheckLead,
  checkRateLimits,
  fetchBuiltWith,
  fetchLiveEvidence,
  heuristicResult,
  incrementRateLimits,
  normalizeDomain,
  SAMPLE_RESULT,
  synthesizeWithAi,
} from '../../lib/site-check';
import { verifyTurnstile } from '../../lib/turnstile-verify';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: {
    domain?: string;
    sample?: boolean;
    turnstileToken?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (body.sample === true) {
    return Response.json({ ok: true, result: SAMPLE_RESULT });
  }

  const secret = runtimeEnv('TURNSTILE_SECRET_KEY');
  if (secret) {
    const token = body.turnstileToken?.trim() ?? '';
    const ok = await verifyTurnstile(token, clientAddress);
    if (!ok) {
      return Response.json({ error: 'Turnstile verification failed' }, { status: 400 });
    }
  }

  const domain = normalizeDomain(body.domain ?? '');
  if (!domain) {
    return Response.json({ error: 'Enter a valid domain (e.g. example.com)' }, { status: 400 });
  }

  const limits = await checkRateLimits(clientAddress || 'unknown');
  if (!limits.allowed) {
    return Response.json(
      {
        error: 'limit_reached',
        reason: limits.reason,
        message:
          limits.reason === 'global'
            ? 'We have hit today’s scan budget. Book a free assessment and we will review your site directly.'
            : 'You have reached today’s free scan limit. Book a free assessment and we will go deeper.',
      },
      { status: 429 },
    );
  }

  // Optional n8n (or other) webhook — full pipeline lives there when configured.
  const webhook = runtimeEnv('SITE_CHECK_WEBHOOK_URL');
  if (webhook) {
    try {
      const proxied = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ domain, clientIp: clientAddress }),
        signal: AbortSignal.timeout(55000),
      });

      if (proxied.status === 429) {
        return Response.json(
          {
            error: 'limit_reached',
            message: 'Scan limit reached. Book a free assessment and we will review your site directly.',
          },
          { status: 429 },
        );
      }

      if (!proxied.ok) {
        console.error('[site-check] webhook failed', proxied.status, await proxied.text());
        return Response.json({ error: 'Scan upstream failed' }, { status: 502 });
      }

      const json = (await proxied.json()) as { result?: unknown; ok?: boolean };
      await incrementRateLimits(clientAddress || 'unknown');
      return Response.json({ ok: true, result: json.result ?? json });
    } catch (err) {
      console.error('[site-check] webhook error', err);
      return Response.json({ error: 'Scan upstream unavailable' }, { status: 502 });
    }
  }

  // Native Worker pipeline: live fetch + BuiltWith + AI synthesis (heuristic fallback).
  const [live, builtWith] = await Promise.all([fetchLiveEvidence(domain), fetchBuiltWith(domain)]);

  let result = await synthesizeWithAi(domain, live, builtWith);
  if (!result) {
    result = heuristicResult(domain, live, builtWith);
  }

  // Lead capture before returning results (success criteria #2).
  await captureSiteCheckLead(result, clientAddress);
  await incrementRateLimits(clientAddress || 'unknown');

  return Response.json({ ok: true, result });
};
