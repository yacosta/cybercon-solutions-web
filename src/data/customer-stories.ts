import type { LocaleText } from './service-details';

/**
 * Results / founder-leadership-experience industries for the nav accordion
 * (nav label moving from “Our Customers” to “Results”). Most of these posts
 * describe founder leadership experience — results Yezid Acosta achieved as
 * an internal CIO/CISO before founding Cybercon Solutions, not contracted
 * Cybercon Solutions customer engagements (see frontmatter `storyAttribution:
 * founder-leadership` on the individual posts). Posts opt in via frontmatter
 * `customerIndustry` matching `id`; those posts stay off the Blog index and
 * surface only under this accordion.
 */
export type CustomerIndustry = {
  id: string;
  /** Optional link to the matching industry page. */
  industrySlug?: string;
  label: LocaleText;
};

export const customerIndustries: CustomerIndustry[] = [
  {
    id: 'nonprofit',
    industrySlug: 'education-nonprofits',
    label: { en: 'Nonprofit', es: 'Sin fines de lucro' },
  },
  {
    id: 'education',
    industrySlug: 'education-nonprofits',
    label: { en: 'Education', es: 'Educación' },
  },
  {
    id: 'healthcare',
    industrySlug: 'healthcare-clinics',
    label: { en: 'Healthcare', es: 'Salud' },
  },
  {
    id: 'retail',
    industrySlug: 'distribution-retail-manufacturing',
    label: { en: 'Retail', es: 'Comercio minorista' },
  },
  {
    id: 'fitness',
    industrySlug: 'distribution-retail-manufacturing',
    label: { en: 'Fitness', es: 'Gimnasios' },
  },
  {
    id: 'professional',
    industrySlug: 'legal-professional-services',
    label: { en: 'Professional services', es: 'Servicios profesionales' },
  },
];

export function getCustomerIndustry(id: string): CustomerIndustry | undefined {
  return customerIndustries.find((item) => item.id === id);
}
