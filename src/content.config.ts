import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One file per post. The filename is the URL: /posts/<filename>.
// Not fields, computed in src/lib/posts.ts: word count, reading time, year grouping.
// Footnotes ([^1]) in the body become margin notes (src/lib/gloss-plugin.ts).
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // the italic line under the title; also the meta description
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      // One short handwritten line next to the post in lists, e.g. "start here if you're new".
      note: z.string().max(60).optional(),
      tags: z.array(z.string()).default([]),
      ogImage: image().optional(), // absent: site.defaultOgImage
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
