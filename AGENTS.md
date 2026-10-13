# Gloss — guide for AI agents

Read this before editing the theme. It is the map of edit points: find the file here first, change that file, then run the checks at the bottom.

Gloss is a static Astro theme for a personal blog of long essays. No CMS, no server output, no database: Markdown and MDX in `src/content/posts/`, built to HTML in `dist/`.

## Commands

```bash
pnpm install
pnpm dev              # http://localhost:4321, styleguide at /styleguide (dev only)
pnpm build            # outputs dist/
pnpm preview          # serves dist/
pnpm check            # astro check (types). Use `pnpm check 2>&1 | head -40`
pnpm lint
pnpm format
pnpm test             # the margin-note and mark plugins, word counts, dates, slugs
pnpm check:contrast   # WCAG AA for every colour token, light and dark

# What CI also runs, after the build:
pnpm dlx @lhci/cli@0.15.1 autorun                    # Lighthouse, mobile, 95+ on four categories
pnpm dlx linkinator@8.1.0 dist --recurse --skip '^https?://(?!(localhost|127\.0\.0\.1|\[::1\])[:/])'
```

`pnpm check && pnpm build` must pass after any change. Change a colour and `pnpm check:contrast` must pass too. Touch `src/lib/` and `pnpm test` too.

## This theme

A book page with a reader's pencil marks on it. Text in a book face, a wide margin to its right, and the author's own notes in handwriting in that margin. One accent, the pencil (`--primary`), on links, notes and hand marks; one highlighter (`--mark`). No cards, no shadows, `--radius` is `0`.

The signature is **the gloss**. Markdown footnotes become margin notes: `src/lib/gloss-plugin.ts` (a Sätteri mdast plugin, `glossNotes`) moves each footnote right after the top-level block that first references it, as `<p class="gloss-note" role="note">`. `src/styles/gloss.css` puts it in the margin column from 64rem up (zero height, so a long note never stretches its paragraph's row) and under the paragraph below that. `src/components/gloss/GlossBody.astro` nudges a note down when it would overlap the one above. `glossMarks` in the same file turns `==text==` into `<mark>` and `++text++` into a pencil underline.

## Where to edit

| To change                                                              | Edit                                                                                   | Notes                                                                                         |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Site name, description, URL, locale, author, default card              | `src/config.ts` (`site`)                                                               | Never hardcode any of it in a component                                                       |
| Header links                                                           | `src/config.ts` (`nav.header`)                                                         | The footer is `src/components/common/Footer.astro`                                            |
| Home opening line, handwritten line, number of posts                   | `src/config.ts` (`gloss`)                                                              | `intro` takes `==` and `++`, rendered by `renderMarks` in `src/lib/text.ts`                   |
| Margin notes on or off                                                 | `src/config.ts` (`gloss.marginNotes`)                                                  | Read in `astro.config.mjs`; off gives ordinary footnotes                                      |
| Title template, JSON-LD owner, social cards                            | `src/config.ts` (`seo`)                                                                | `ogImages: false` falls back to `site.defaultOgImage`                                         |
| Webfonts                                                               | `fonts` in `astro.config.mjs`, `font-size-adjust` in `src/styles/gloss.css`            | Three variables: `--font-body`, `--font-heading`, `--font-hand`. Self-hosted; no font CDN     |
| Dark-mode toggle                                                       | `src/config.ts` (`features`)                                                           |                                                                                               |
| Analytics provider and id                                              | `src/config.ts` (`analytics`), `src/components/common/Analytics.astro`                 | `provider: null` renders nothing                                                              |
| Colours, widths, radius                                                | `src/styles/theme.css`                                                                 | Override tokens from `src/styles/tokens.css`; do not edit that file. Preview at `/styleguide` |
| The pencil underline colour                                            | `--hand-line` in `src/styles/gloss.css`                                                | An SVG: it cannot read `--primary`. Change both stroke colours with it                        |
| Note, mark and article body styles                                     | `src/styles/gloss.css`                                                                 | The only place the body is styled. No typography plugin                                       |
| How footnotes become notes; the marks; captions and quote attributions | `src/lib/gloss-plugin.ts`                                                              | Builds plain mdast with `hName`; never raw `html` nodes (MDX cannot compile them)             |
| Long-note threshold                                                    | `LONG_NOTE` in `src/lib/gloss-plugin.ts`                                               | Above it a note is small print, not handwriting                                               |
| Note overlap on wide screens                                           | `src/components/gloss/GlossBody.astro`                                                 | Works on `.gloss-note`                                                                        |
| Post rows (home, archive, tags)                                        | `src/components/gloss/PostList.astro`                                                  | One component for every list                                                                  |
| `<head>`, meta, JSON-LD                                                | `src/components/common/SEO.astro`                                                      | Pages pass `title` and `description`; the rest is derived                                     |
| Page shell, skip link, fonts, theme script                             | `src/layouts/Base.astro`                                                               | Preloads the text face at 400 and 700 only                                                    |
| A plain page (about, colophon)                                         | `src/pages/<name>.md` with `layout: ../layouts/Page.astro`                             | Footnotes become margin notes there too                                                       |
| Home, archive, post                                                    | `src/pages/index.astro`, `src/pages/posts/index.astro`, `src/pages/posts/[slug].astro` |                                                                                               |
| Posts                                                                  | `src/content/posts/<slug>.md` or `.mdx`                                                | The filename is the URL                                                                       |
| Post fields and validation                                             | `src/content.config.ts`                                                                | A new field must be optional or have a default                                                |
| Post list, drafts, word counts, tag slugs                              | `src/lib/posts.ts`, `src/lib/text.ts`                                                  | `getPosts()` is the one place that filters drafts. `text.ts` is pure and tested               |
| Feed, `robots.txt`                                                     | `src/pages/rss.xml.ts`, `robots.txt.ts`                                                | Titles and descriptions only                                                                  |
| Which tokens are contrast-checked                                      | The lists at the top of `scripts/check-contrast.mjs`                                   | Add a token there when you add one                                                            |
| What CI runs, the Lighthouse pages                                     | `.github/workflows/ci.yml`, `lighthouserc.cjs`                                         | The page list filters itself against `dist/`                                                  |
| The documentation for buyers                                           | `docs/customization.md`, `docs/content.md`, `docs/deploy.md`                           | Change a config key or a field, change the doc                                                |

## Content model

**posts** (`src/content/posts/*.md`, `.mdx`): `title`, `description`, `date`, optional `updated`, `note` (60 characters, handwritten in lists), `tags`, `ogImage`, `draft`. Full table in `docs/content.md`.

Computed, and therefore not fields: word count, reading time, year groups, note numbers, every URL. Do not add a field for any of them.

## Do not

- Emit raw HTML nodes (`{ type: 'html' }`) from a Markdown plugin. MDX posts then fail to build. Use mdast nodes with `data.hName` / `data.hProperties`.
- Give a margin note a height on wide screens, or make the note column a flex or float layout. The zero-height grid item is what keeps paragraphs from stretching; overlap is handled by the script.
- Turn notes into `<aside>`. Inside `<main>` that is a nested complementary landmark and fails accessibility checks.
- Set long passages in the handwriting face. It is for notes and one-line asides.
- Add a second accent colour or a coloured section background. Change the pencil and the highlighter instead.
- Replace rules with shadows, gradients, glass, pills or rounded cards. `--radius` stays `0`. The highlighter is a thick underline, not a gradient.
- Set a label in small uppercase with wide tracking.
- Give an input a fixed colour such as `#fff`. Use `var(--background)`.
- Add a client-side framework, or link a CDN for a font, script or icon. The only third-party script is the analytics tag, behind a config switch and off by default.
- Remove `cssTarget` in `astro.config.mjs`. Lightning CSS then lowers `light-dark()` into `prefers-color-scheme` blocks and the theme toggle stops working.
- Call `getCollection('posts')` in a page. Use `getPosts()`, or drafts leak.
- Use a raw `<img>`. Use `astro:assets`.
- Remove the skip link, focus rings, alt text or aria-labels. Breaking at 360px is a bug.
- Leave a link inside a sentence without an underline. Colour alone fails WCAG 1.4.1.
- Run `prettier --write` on `pnpm-lock.yaml`. `.prettierignore` holds the line that prevents it.
- Write the theme's own comments, strings or docs in any language other than English.

## Workflow

1. Find the file in the table above. If the request is not covered by it, say which file you intend to touch before touching it.
2. Make the change.
3. Run `pnpm check && pnpm build`, plus `pnpm check:contrast` for colour and `pnpm test` for `src/lib/`, and report the result.
4. For layout or colour work, check a long post in the browser at 360px and at 1280px or wider, where the notes move into the margin.
