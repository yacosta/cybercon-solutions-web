import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

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

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postTitle(post: BlogPost, locale: string): string {
  return locale === 'es' && post.data.titleEs ? post.data.titleEs : post.data.title;
}

export function postDescription(post: BlogPost, locale: string): string {
  return locale === 'es' && post.data.descriptionEs
    ? post.data.descriptionEs
    : post.data.description;
}

export function formatPostDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-US' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
