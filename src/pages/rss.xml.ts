import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, blogSlug } from '../lib/blog';
import { getMessages } from '../i18n';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts('en');
  const t = getMessages('en');
  return rss({
    title: t.blog.indexTitle,
    description: t.blog.indexDescription,
    site: context.site ?? 'https://cybercon-solutions.com',
    trailingSlash: true,
    customData: '<language>en-us</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.updatedDate ?? post.data.pubDate,
      link: `/blog/${blogSlug(post)}/`,
    })),
  });
}
