import type { APIRoute, GetStaticPaths } from 'astro';
import { getPageMarkdown, listMarkdownPaths, markdownUrlFor } from '../../lib/markdown-pages';

/**
 * Static Markdown twins of every page in the Markdown map, written at build
 * time to /md/<path>.md (e.g. /md/services/managed-it.md, /md/index.md).
 *
 * Why static: marketing pages are prerendered and Cloudflare serves them as
 * assets before the Worker runs, so `Accept: text/markdown` negotiation in
 * src/middleware.ts never reaches them. These files always work. Headers
 * (text/markdown + noindex) are set for /md/* in public/_headers.
 */
export const prerender = true;

export const getStaticPaths = (() =>
  listMarkdownPaths().flatMap((pagePath) => {
    const url = markdownUrlFor(pagePath);
    if (!url) return [];
    return [{ params: { path: url.replace(/^\/md\//, '') }, props: { pagePath } }];
  })) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const md = getPageMarkdown(props.pagePath as string) ?? '';
  return new Response(md, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
