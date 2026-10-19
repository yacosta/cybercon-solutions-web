import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, blogSlug } from '../../lib/blog';
import { getMessages } from '../../i18n';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts('es');
  const t = getMessages('es');
  return rss({
    title: t.blog.indexTitle,
    description: t.blog.indexDescription,
    site: context.site ?? 'https://cybercon-solutions.com',
    trailingSlash: true,
    customData: '<language>es-us</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.updatedDate ?? post.data.pubDate,
      link: `/es/blog/${blogSlug(post)}/`,
    })),
  });
}
