import type { SiteCheckResult } from './types';

/** Hardcoded illustrative sample — always banner-labeled in the UI. */
export const SAMPLE_RESULT: SiteCheckResult = {
  site_name: 'Harbor Street Dental',
  domain: 'example-harborstreet.demo',
  live_checked: true,
  verified: true,
  overall_grade: 'C',
  one_line_summary:
    'A workable small-business site — this lite peek found a few gaps worth a deeper pass.',
  categories: [
    {
      name: 'Security signals',
      grade: 'B',
      note: 'Homepage loads over HTTPS with HSTS present.',
    },
    {
      name: 'Performance signals',
      grade: 'N',
      note: 'Not graded on a lite check — timing and Core Web Vitals are part of the full assessment.',
    },
    {
      name: 'Trust & credibility',
      grade: 'C',
      note: 'The privacy page still shows leftover template placeholders.',
    },
    {
      name: 'Search visibility',
      grade: 'C',
      note: 'Title and meta exist; local search depth needs a fuller review.',
    },
  ],
  top_finding:
    'The privacy policy still contains unfinished template text where a page title and contact email should be. Visitors notice that — and it is the kind of fix we would map on a short assessment call.',
  additional_findings_count: 4,
  tech_chips: ['WordPress', 'MySQL', 'PHP', 'Cloudflare'],
  sample: true,
};
