import type { APIRoute } from 'astro';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { localPages } from '../data/local-pages';
import { getPageMarkdown, markdownUrlFor } from '../lib/markdown-pages';

/**
 * llms-full.txt — the full Markdown text of the site's key pages, built from
 * the same sources as the HTML (src/lib/markdown-pages.ts), so it never drifts.
 * llms.txt (public/) stays the short, curated map.
 */
export const prerender = true;

const SITE = 'https://cybercon-solutions.com';

const caseStudies = [
  ['miami-nonprofit-digital-tech-strategy-case-study', 'A digital and tech strategy the board can fund (Miami nonprofit)'],
  ['nonprofit-board-funded-ai-case-study', 'Board-funded AI for nonprofits'],
  ['healthcare-nonprofit-it-transformation-case-study', '$1.3M saved: healthcare nonprofit IT transformation'],
  ['education-saas-city-scale-case-study', 'Education SaaS at city scale'],
  ['retail-it-six-countries-case-study', 'Retail IT across six countries'],
  ['enterprise-integration-mpos-case-study', 'Enterprise integration and mPOS'],
  ['gym-franchise-hybrid-it-case-study', 'National gym franchise hybrid IT'],
] as const;

/** Drop a page's YAML frontmatter and label the section with its canonical URL. */
function section(pagePath: string): string {
  const md = getPageMarkdown(pagePath);
  if (!md) return '';
  const body = md.replace(/^---\n[\s\S]*?\n---\n+/, '').trim();
  const mdUrl = markdownUrlFor(pagePath);
  return `<!-- Source: ${SITE}${pagePath}${mdUrl ? ` · Markdown: ${SITE}${mdUrl}` : ''} -->\n\n${body}`;
}

const keyPages = [
  '/',
  '/about/',
  ...services.map((service) => `/services/${service.slug}/`),
  ...localPages.map((page) => `/services/managed-it/${page.slug}/`),
  ...industries.map((industry) => `/industries/${industry.slug}/`),
  '/contact/',
];

const header = `# Cybercon Solutions: full site text for AI agents

> Managed IT, cybersecurity, cloud, and AI services for South Florida businesses and nonprofits with roughly 15–150 employees. Founder-led, based in Cooper City, Florida; serving Cooper City, Davie, and Broward County, onsite and remote, in English and Spanish.

This file holds the full Markdown text of the site's key pages, generated at build time from the same content as the HTML pages. For the short curated map, see ${SITE}/llms.txt. Every page below also has its own Markdown file under ${SITE}/md/ (for example ${SITE}/md/services/managed-it.md).

## Key facts

- Legal name: Cybercon Solutions LLC
- Founder: Yezid Acosta, CIO/CISO and Founder, with 25+ years of technology and security leadership (${SITE}/about/)
- Service area: Cooper City, Davie, and Broward County, Florida (onsite home base in Cooper City), plus remote support across South Florida
- Contact: info@cybercon-solutions.com · (754) 300-9786 · ${SITE}/contact/
- Legal mailing address (no customer visits): 407 Lincoln Rd. Suite 6H PMB 7209, Miami Beach, FL 33139
- Languages: English and Spanish (${SITE}/es/)
- Managed IT pricing model: flat per-user monthly packages with no per-incident trip charges. Dollar figures are quoted after a free assessment and are not published.
- Web design pricing: Essential website $750 (fixed price); Growth website from $1,150; custom web projects scoped and quoted.
- Free tools: IT cost and risk assessment (${SITE}/assessment/), website health check (${SITE}/services/web-design-development/#site-check), email breach check (${SITE}/services/cybersecurity/#breach-check)
- Response: a real engineer replies within one business day of an assessment request.

## Founder-leadership case studies

These describe results Yezid Acosta led as an internal CIO/CISO before founding Cybercon Solutions. They are not Cybercon Solutions client engagements.

${caseStudies.map(([slug, label]) => `- [${label}](${SITE}/blog/${slug}/): Markdown ${SITE}/md/blog/${slug}.md`).join('\n')}

---
`;

export const GET: APIRoute = () => {
  const body = [header, ...keyPages.map(section).filter(Boolean)].join('\n\n---\n\n');
  return new Response(`${body}\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
