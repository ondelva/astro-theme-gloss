// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { gloss, site } from './src/config.ts';
import { glossMarks, glossNotes } from './src/lib/gloss-plugin.ts';
import { math } from './src/lib/math.ts';

// Webfonts (fontsource, latin subset, all OFL). --font-body: book text and titles,
// --font-heading: UI and meta, --font-hand: margin notes only. Gelasio is a calm screen serif
// (Georgia's proportions, with kerning and lining figures), so the Caveat notes are the only hand.
/** @type {NonNullable<import('astro').AstroUserConfig['fonts']>} */
const fonts = [
  {
    provider: fontProviders.fontsource(),
    name: 'Gelasio',
    cssVariable: '--font-body',
    weights: [400, 700],
    styles: ['normal', 'italic'],
    subsets: ['latin'],
    fallbacks: ['Georgia', 'serif'],
  },
  {
    provider: fontProviders.fontsource(),
    name: 'Geist',
    cssVariable: '--font-heading',
    weights: [400, 500, 600],
    styles: ['normal'],
    subsets: ['latin'],
    fallbacks: ['system-ui', 'sans-serif'],
  },
  {
    provider: fontProviders.fontsource(),
    name: 'Caveat',
    cssVariable: '--font-hand',
    weights: [500, 600],
    styles: ['normal'],
    subsets: ['latin'],
    fallbacks: ['cursive'],
  },
];

// https://astro.build/config
export default defineConfig({
  // SITE_URL overrides config.ts at build time (used by demo deploys).
  site: process.env.SITE_URL ?? site.url,
  markdown: {
    // Astro 7 renders Markdown with Sätteri: plugins are mdast visitors, not remark plugins.
    // math: $…$ and $$…$$ become KaTeX HTML at build time (src/lib/math.ts). It runs last.
    processor: satteri({
      features: { math: true },
      mdastPlugins: gloss.marginNotes ? [glossNotes, glossMarks, math] : [glossMarks, math],
    }),
    // The default github-dark sets comments at about 3:1 on its background, under WCAG AA.
    shikiConfig: { theme: 'github-dark-high-contrast' },
  },
  // Pictures in posts get a srcset sized to the text column instead of shipping the original.
  image: { layout: 'constrained' },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.endsWith('/styleguide/') }),
    {
      name: 'theme-styleguide',
      hooks: {
        'astro:config:setup': ({ command, injectRoute }) => {
          // Dev only: the styleguide is a design tool, not a page buyers ship.
          if (command === 'dev')
            injectRoute({ pattern: '/styleguide', entrypoint: './src/pages/_styleguide.astro' });
        },
      },
    },
  ],
  fonts,
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep light-dark() native. Vite's default target makes Lightning CSS lower it to
      // prefers-color-scheme blocks, which the theme switcher then cannot override.
      // Older browsers fall back to the light values in tokens.css.
      cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5'],
    },
  },
});
