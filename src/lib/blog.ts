import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { customerIndustries, type CustomerIndustry } from '../data/customer-stories';

export type BlogPost = CollectionEntry<'blog'>;
export type BlogLocale = 'en' | 'es';

export type CustomerStoryGroup = {
  industry: CustomerIndustry;
  papers: { title: string; href: string; current: boolean }[];
};

/** Content id without locale prefix (`es/...` → slug). */
export function blogSlug(post: BlogPost | string): string {
  const id = typeof post === 'string' ? post : post.id;
  return id.replace(/^es\//, '');
}

export function postLocale(post: BlogPost): BlogLocale {
  return post.id.startsWith('es/') ? 'es' : 'en';
}

export function blogEntryId(slug: string, locale: BlogLocale): string {
  return locale === 'es' ? `es/${slug}` : slug;
}

export function blogPath(locale: string, slug?: string): string {
  const base = slug ? `/blog/${slug}/` : '/blog/';
  if (locale === 'es') return `/es${base}`;
  return base;
}

export function bannerImage(basename: string) {
  return {
    jpg: `/images/${basename}.jpg`,
    jpgSrcset: `/images/${basename}-768.jpg 768w, /images/${basename}-960.jpg 960w, /images/${basename}.jpg 1280w`,
    webpSrcset: `/images/${basename}-768.webp 768w, /images/${basename}-960.webp 960w, /images/${basename}.webp 1280w`,
    width: 1280,
    height: 854,
  };
}

export async function getPublishedPosts(locale: BlogLocale = 'en'): Promise<BlogPost[]> {
  const posts = await getCollection(
    'blog',
    (entry) => !entry.data.draft && postLocale(entry) === locale,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPublishedPost(
  slug: string,
  locale: BlogLocale,
): Promise<BlogPost | undefined> {
  const entry = await getEntry('blog', blogEntryId(slug, locale));
  if (!entry || entry.data.draft) return undefined;
  return entry;
}

export function postTitle(post: BlogPost): string {
  return post.data.title;
}

export function postDescription(post: BlogPost): string {
  return post.data.description;
}

export function formatPostDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-US' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** Published white papers grouped for the Our Customers nav accordion. */
export async function getCustomerStoryGroups(
  locale: BlogLocale,
  currentPath = '',
): Promise<CustomerStoryGroup[]> {
  const posts = await getCollection(
    'blog',
    (entry) =>
      !entry.data.draft &&
      postLocale(entry) === locale &&
      Boolean(entry.data.customerIndustry),
  );

  const byIndustry = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const id = post.data.customerIndustry!;
    const list = byIndustry.get(id) ?? [];
    list.push(post);
    byIndustry.set(id, list);
  }

  return customerIndustries
    .map((industry) => {
      const papers = (byIndustry.get(industry.id) ?? [])
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
        .map((post) => {
          const href = blogPath(locale, blogSlug(post));
          const normalized = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
          return {
            title: post.data.title,
            href,
            current: normalized === href,
          };
        });
      return { industry, papers };
    })
    .filter((group) => group.papers.length > 0);
}
