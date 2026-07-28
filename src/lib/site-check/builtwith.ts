import { runtimeEnv } from '../env';
import type { BuiltWithEvidence } from './types';

/** Free API uses lowercase keys; some payloads use PascalCase. */
interface BuiltWithCategory {
  Name?: string;
  name?: string;
  live?: number;
  Live?: number;
  Technologies?: BuiltWithTech[];
  technologies?: BuiltWithTech[];
}

interface BuiltWithTech {
  Name?: string;
  name?: string;
  Tag?: string;
  tag?: string;
  LastDetected?: number;
  IsPremium?: string;
}

interface BuiltWithGroup {
  Name?: string;
  name?: string;
  Categories?: BuiltWithCategory[];
  categories?: BuiltWithCategory[];
  Technologies?: BuiltWithTech[];
  technologies?: BuiltWithTech[];
}

interface BuiltWithResponse {
  domain?: string;
  first?: number;
  last?: number;
  groups?: BuiltWithGroup[];
  Result?: {
    Paths?: {
      Technologies?: BuiltWithTech[];
    }[];
  };
  Errors?: unknown;
  errors?: unknown;
}

function label(obj: { Name?: string; name?: string; Tag?: string; tag?: string } | undefined): string {
  if (!obj) return '';
  return String(obj.Name ?? obj.name ?? obj.Tag ?? obj.tag ?? '').trim();
}

function liveCount(cat: BuiltWithCategory): number {
  const n = cat.live ?? cat.Live;
  return typeof n === 'number' ? n : 0;
}

function epochToIso(ms: number | undefined): string | null {
  if (typeof ms !== 'number' || !Number.isFinite(ms) || ms <= 0) return null;
  try {
    return new Date(ms).toISOString();
  } catch {
    return null;
  }
}

/**
 * Free API (`free1`): groups + categories with live/dead counts (no per-tech list).
 * Prefer live categories as chips; fall back to group names.
 */
function chipsFromGroups(groups: BuiltWithGroup[]): { groups: string[]; chips: string[] } {
  const groupNames: string[] = [];
  const liveChips: string[] = [];
  const otherChips: string[] = [];
  const seen = new Set<string>();

  const pushChip = (name: string, live: boolean) => {
    const key = name.toLowerCase();
    if (!name || seen.has(key)) return;
    seen.add(key);
    (live ? liveChips : otherChips).push(name);
  };

  for (const group of groups) {
    const gName = label(group);
    if (gName) groupNames.push(gName);

    const techs = group.Technologies ?? group.technologies ?? [];
    for (const tech of techs) {
      pushChip(label(tech), true);
    }

    const cats = group.Categories ?? group.categories ?? [];
    for (const cat of cats) {
      const nested = cat.Technologies ?? cat.technologies ?? [];
      if (nested.length > 0) {
        for (const tech of nested) pushChip(label(tech), liveCount(cat) > 0);
        continue;
      }
      // Free API: category name is the technology/category signal
      pushChip(label(cat), liveCount(cat) > 0);
    }
  }

  const chips = [...liveChips, ...otherChips].slice(0, 12);
  return { groups: groupNames, chips };
}

/** Tier-2 evidence: BuiltWith Free API JSON (crawled DB — may lag on small sites). */
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
    if (json.Errors || json.errors) {
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

    // Domain-style payloads sometimes nest under Result.Paths
    if (chips.length === 0 && json.Result?.Paths) {
      for (const path of json.Result.Paths) {
        for (const tech of path.Technologies ?? []) {
          const name = label(tech);
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
      lastUpdated: epochToIso(json.last),
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
