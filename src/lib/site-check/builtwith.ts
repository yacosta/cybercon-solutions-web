import { runtimeEnv } from '../env';
import type { BuiltWithEvidence } from './types';

interface BuiltWithGroup {
  Name?: string;
  Categories?: { Name?: string; Technologies?: { Name?: string; Tag?: string }[] }[];
  Technologies?: { Name?: string; Tag?: string; LastDetected?: number; IsPremium?: string }[];
}

interface BuiltWithResponse {
  domain?: string;
  groups?: BuiltWithGroup[];
  Result?: {
    Paths?: {
      Technologies?: { Name?: string; Tag?: string; LastDetected?: number }[];
    }[];
  };
  Errors?: unknown;
}

function chipsFromGroups(groups: BuiltWithGroup[]): { groups: string[]; chips: string[] } {
  const groupNames: string[] = [];
  const chips: string[] = [];
  const seen = new Set<string>();

  for (const group of groups) {
    if (group.Name) groupNames.push(group.Name);

    const techs =
      group.Technologies ??
      group.Categories?.flatMap((c) => c.Technologies ?? []) ??
      [];

    for (const tech of techs) {
      const name = (tech.Name || tech.Tag || '').trim();
      if (!name || seen.has(name.toLowerCase())) continue;
      seen.add(name.toLowerCase());
      chips.push(name);
      if (chips.length >= 12) break;
    }
    if (chips.length >= 12) break;
  }

  return { groups: groupNames, chips };
}

/** Tier-2 evidence: BuiltWith Free API (crawled DB — may lag on small sites). */
export async function fetchBuiltWith(domain: string): Promise<BuiltWithEvidence> {
  const key = runtimeEnv('BUILTWITH_API_KEY');
  if (!key) {
    return {
      ok: false,
      groups: [],
      tech_chips: [],
      lastUpdated: null,
      rawSummary: '',
      error: 'BUILTWITH_API_KEY not configured',
    };
  }

  try {
    const url = `https://api.builtwith.com/free1/api.json?KEY=${encodeURIComponent(key)}&LOOKUP=${encodeURIComponent(domain)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      return {
        ok: false,
        groups: [],
        tech_chips: [],
        lastUpdated: null,
        rawSummary: '',
        error: `BuiltWith HTTP ${res.status}`,
      };
    }

    const json = (await res.json()) as BuiltWithResponse;
    if (json.Errors) {
      return {
        ok: false,
        groups: [],
        tech_chips: [],
        lastUpdated: null,
        rawSummary: '',
        error: 'BuiltWith returned errors',
      };
    }

    const groups = json.groups ?? [];
    const { groups: groupNames, chips } = chipsFromGroups(groups);

    // Free API sometimes nests under Result.Paths
    if (chips.length === 0 && json.Result?.Paths) {
      for (const path of json.Result.Paths) {
        for (const tech of path.Technologies ?? []) {
          const name = (tech.Name || tech.Tag || '').trim();
          if (name && !chips.includes(name)) chips.push(name);
          if (chips.length >= 12) break;
        }
      }
    }

    const rawSummary = JSON.stringify({
      domain: json.domain ?? domain,
      groups: groupNames,
      technologies: chips,
    }).slice(0, 2000);

    return {
      ok: chips.length > 0 || groupNames.length > 0,
      groups: groupNames,
      tech_chips: chips,
      lastUpdated: null,
      rawSummary,
    };
  } catch (err) {
    return {
      ok: false,
      groups: [],
      tech_chips: [],
      lastUpdated: null,
      rawSummary: '',
      error: err instanceof Error ? err.message : 'BuiltWith request failed',
    };
  }
}
