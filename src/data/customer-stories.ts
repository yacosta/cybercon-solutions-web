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
];

export function getCustomerIndustry(id: string): CustomerIndustry | undefined {
  return customerIndustries.find((item) => item.id === id);
}
