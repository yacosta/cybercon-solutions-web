import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Basename under /images/ (uses existing -768/-960/full responsive set). */
    banner: z.string(),
    bannerAlt: z.object({
      en: z.string(),
      es: z.string(),
    }),
    /** Optional Spanish title/description for listing + meta; body stays English. */
    titleEs: z.string().optional(),
    descriptionEs: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
