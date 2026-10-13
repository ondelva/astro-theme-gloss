# Customization

Site settings live in `src/config.ts`, colours and spacing in `src/styles/`, fonts in `astro.config.mjs`. Nothing site-specific is hardcoded in components. For posts, notes and marks, see [content.md](content.md).

## Site identity

`src/config.ts`, `site`:

| Key              | What it is                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `name`           | The site's name: the header, page titles, the feed. For a personal site, usually your name.    |
| `description`    | The home page's meta description and the feed description.                                     |
| `url`            | Your domain, `https://…`, no trailing slash. Sitemap, canonical links and social cards use it. |
| `locale`         | The page language, `en`, `ko`, `de` …                                                          |
| `author`         | Your name in the footer, structured data and social cards.                                     |
| `defaultOgImage` | The social card for pages without their own: a 1200×630 PNG in `public/`.                      |

`seo.titleTemplate` sets page titles (`%s · Your Name`). `seo.jsonLd` says whether the site belongs to a `Person` or an `Organization`.

## Navigation

`nav.header` in `src/config.ts`: a list of `{ label, href }`. The current page is underlined. The name in the header always links home. The footer holds the copyright line and the RSS link: edit `src/components/common/Footer.astro`.

## The home page

`gloss` in `src/config.ts`:

| Key           | What it does                                                                  |
| ------------- | ----------------------------------------------------------------------------- |
| `intro`       | The opening sentence. `==text==` highlights, `++text++` underlines in pencil. |
| `introNote`   | One handwritten line under it. `''` leaves it out.                            |
| `homePosts`   | How many recent posts to list. The rest are in `/posts`.                      |
| `marginNotes` | `false` renders footnotes as an ordinary list instead of margin notes.        |

## Colours and other tokens

Every colour is a token in `src/styles/tokens.css`, written as `light-dark(<light>, <dark>)`. Do not edit that file: override tokens in `src/styles/theme.css`, which loads after it.

```css
:root {
  --primary: light-dark(#7a2e8a, #d6a3e0); /* pencil: links, notes, hand marks */
  --mark: light-dark(#bfe3f2, #24485a); /* highlighter */
}
```

| Token                            | Used for                                                          |
| -------------------------------- | ----------------------------------------------------------------- |
| `--background`                   | The paper.                                                        |
| `--surface`                      | Code blocks and inline code.                                      |
| `--foreground`                   | Text and table rules.                                             |
| `--muted`                        | Dates, reading times, long notes.                                 |
| `--border`                       | Hairlines between list rows.                                      |
| `--primary`                      | The pencil: links, margin notes, focus rings.                     |
| `--primary-hover`                | Links on hover.                                                   |
| `--mark`                         | The highlighter behind `==text==`. Text on it is `--foreground`.  |
| `--content-width`                | The text column, `40rem` (about 65 characters).                   |
| `--margin-width`, `--margin-gap` | The note margin and the space before it (`src/styles/gloss.css`). |

Run `pnpm check:contrast` after changing a colour. It checks every text colour against every background, in light and dark, and fails below 4.5:1.

### The pencil underline has its own colour

`++text++` is drawn with an SVG, and an SVG in CSS cannot read `--primary`. If you change `--primary`, copy the `--hand-line` block from the top of `src/styles/gloss.css` into `theme.css` and change the two `stroke='%23…'` colours (the hex value after `%23`, which is `#`).

## Dark mode

The site follows the reader's system setting; the switch in the header cycles system, light and dark and remembers the choice. Set `features.darkMode` to `false` to remove the switch (the system setting still applies).

## Fonts

`astro.config.mjs` loads the fonts through Astro's font API from Fontsource, Latin subset, all under the SIL Open Font License. There are three roles, each a CSS variable:

| Variable         | Role                               | Default |
| ---------------- | ---------------------------------- | ------- |
| `--font-body`    | Text, titles and long notes        | Gelasio |
| `--font-heading` | Navigation, dates, labels          | Geist   |
| `--font-hand`    | Margin notes and handwritten lines | Caveat  |

To use another face, change `name` in the `fonts` list and run `pnpm dev`. For a font that needs a wider character set, change `subsets`.

Fonts differ in how big they look at the same size. `src/styles/gloss.css` sets `font-size-adjust` per role to the x-heights of the default fonts, so another face you choose renders at about the same visual size. If your own font looks too large or small, adjust those three numbers.

## Footer credit

The footer carries one line crediting the theme: `Gloss theme by ondelva`, linking to the theme's page. It is a plain link in `src/components/common/Footer.astro`; delete it and the separator before it if you would rather not have it. Keeping it is how other people find the theme. Gloss Pro ships without it.

## Analytics

`analytics` in `src/config.ts`. Off by default: `provider: null` renders nothing and the site loads no third-party script.

| `provider`    | `id`                      | `host`                                 |
| ------------- | ------------------------- | -------------------------------------- |
| `'plausible'` | Your site's domain        | Your instance's origin, if self-hosted |
| `'umami'`     | The website ID            | Your instance's origin, if self-hosted |
| `'ga4'`       | The measurement ID, `G-…` | Ignored                                |

## Favicon and default social card

Replace `public/favicon.svg`, `public/favicon.ico` and `public/og-default.png` (1200×630).
