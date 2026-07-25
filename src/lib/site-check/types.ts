export type LetterGrade = 'A' | 'B' | 'C' | 'D' | 'F';
export type CategoryGrade = LetterGrade | 'N';

export interface CategoryResult {
  name: string;
  grade: CategoryGrade;
  note: string;
}

export interface SiteCheckResult {
  site_name: string;
  domain: string;
  live_checked: boolean;
  verified: boolean;
  overall_grade: LetterGrade;
  one_line_summary: string;
  categories: CategoryResult[];
  top_finding: string;
  additional_findings_count: number;
  tech_chips: string[];
  sample?: boolean;
}

export interface LiveEvidence {
  ok: boolean;
  finalUrl: string | null;
  status: number | null;
  headers: Record<string, string>;
  htmlSnippet: string;
  observed: {
    https: boolean;
    cloudflare: boolean;
    cloudfront: boolean;
    server: string | null;
    title: string | null;
    metaDescription: string | null;
    hasHsts: boolean;
    hasCsp: boolean;
    hasXFrameOptions: boolean;
    copyrightYear: string | null;
  };
  dnsNs: string[];
  error?: string;
}

export interface BuiltWithEvidence {
  ok: boolean;
  groups: string[];
  tech_chips: string[];
  lastUpdated: string | null;
  rawSummary: string;
  error?: string;
}

export interface ScanLogEntry {
  domain: string;
  site_name: string;
  overall_grade: string;
  timestamp: string;
  tech_chips: string[];
}

export const CATEGORY_NAMES = [
  'Security signals',
  'Performance signals',
  'Trust & credibility',
  'Search visibility',
] as const;
