/**
 * Contextual blog links for homepage "What we solve" cards.
 * Order matches `t.problems.items` in `src/i18n/{en,es}.ts`.
 * Set an entry to `null` to omit a link for that card.
 * Labels are short secondary link text (not the full post title).
 */
export type ProblemPostLink = {
  slug: string;
  label: { en: string; es: string };
};

export const problemPostLinks: Array<ProblemPostLink | null> = [
  // Tickets stay unresolved
  {
    slug: 'managed-it-reports-like-cio',
    label: {
      en: 'Read: Managed IT reports like a CIO',
      es: 'Leer: TI que reporta como un CIO',
    },
  },
  // IT spend is unpredictable
  {
    slug: 'fractional-cio-first-90-days',
    label: {
      en: 'Read: The fractional CIO first 90 days',
      es: 'Leer: Agenda del CIO fraccionario',
    },
  },
  // Nobody owns cybersecurity
  {
    slug: 'suspected-compromise-client-checklist',
    label: {
      en: 'Read: Suspected compromise checklist',
      es: 'Leer: Lista ante sospecha de compromiso',
    },
  },
  // Backups exist but aren’t tested
  {
    slug: 'how-small-business-avoids-downtime',
    label: {
      en: 'Read: How to avoid downtime',
      es: 'Leer: Cómo evitar caídas de TI',
    },
  },
  // No technology roadmap
  {
    slug: 'fractional-cio-first-90-days',
    label: {
      en: 'Read: The fractional CIO first 90 days',
      es: 'Leer: Agenda del CIO fraccionario',
    },
  },
  // Activity without outcomes
  {
    slug: 'managed-it-reports-like-cio',
    label: {
      en: 'Read: Managed IT reports like a CIO',
      es: 'Leer: TI que reporta como un CIO',
    },
  },
];
