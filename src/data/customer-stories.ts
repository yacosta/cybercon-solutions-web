import type { LocaleText } from './service-details';

/**
 * Customer-story industries for the “Our Customers” nav accordion.
 * Blog posts opt in via frontmatter `customerIndustry` matching `id`.
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
    label: { en: 'Retail', es: 'Retail' },
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
