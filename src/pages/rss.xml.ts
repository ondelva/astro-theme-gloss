import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '../config';
import { getPosts, postPath } from '../lib/posts';

// Titles and descriptions only. Full text would need the margin notes rendered back
// into footnotes for feed readers, which do not get the theme's CSS.
export const GET: APIRoute = async (context) =>
  rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.tags,
    })),
    customData: `<language>${site.locale}</language>`,
  });
