# Writing

Everything you publish lives in `src/content/`. A post is one Markdown (`.md`) or MDX (`.mdx`) file; the filename is its URL. This page covers the fields, the margin notes, the hand marks, and pictures, quotes and lists.

## A post

```md
---
title: On keeping a commonplace book
description: Three centuries of readers kept one notebook for everything. I started again.
date: 2026-10-04
tags: [notebooks, reading]
---

For three centuries, readers kept a single notebook for everything worth
remembering.[^1] The habit faded when paper got cheap.

[^1]: Locke published a method for indexing one in 1685.
```

Save it as `src/content/posts/commonplace-book.md` and it appears at `/posts/commonplace-book`, on the home page, in the archive and in the RSS feed.

## Fields

| Field         | Required | What it does                                                                                  |
| ------------- | -------- | --------------------------------------------------------------------------------------------- |
| `title`       | yes      | The heading, the page title, the feed item.                                                   |
| `description` | yes      | The italic line under the title; also the search-engine and social description.               |
| `date`        | yes      | `YYYY-MM-DD`. Sorts the lists and groups the archive by year.                                 |
| `updated`     |          | Shown after the date as "updated …" when you revise a post.                                   |
| `note`        |          | Up to 60 characters, set in handwriting under the title in lists: `start here if you're new`. |
| `tags`        |          | A list. Printed under the post as "Filed under …".                                            |
| `ogImage`     |          | An image in `src/` for social cards. Without it, `site.defaultOgImage`.                       |
| `draft`       |          | `true` keeps the post out of every page, list, feed and search index, in development too.     |

Word count and reading time are counted from the text at build time. They are not fields.

## Margin notes

Write footnotes the usual Markdown way: a marker in the text, the note anywhere below.

```md
It took eleven seconds to save.[^save]

[^save]: I timed it with a kitchen timer, twice.
```

Gloss turns each footnote into a handwritten note in the margin, beside the paragraph that first mentions it.[^here] On phones the note sits under that paragraph instead. There is no list of footnotes at the end of the page.

- Labels can be numbers or words (`[^1]`, `[^save]`). Notes are numbered in reading order, whatever the label.
- A second mention of the same footnote shows its number again but does not repeat the note.
- A note longer than 200 characters is set in small print rather than handwriting, because long handwriting is tiring to read. The limit is `LONG_NOTE` in `src/lib/gloss-plugin.ts`.
- A note can hold links, `*italics*` and `` `code` ``. Several paragraphs in one note are joined with line breaks.
- A marker with no matching note stays visible as you wrote it, so you can spot it.

Prefer ordinary footnotes? Set `gloss.marginNotes` to `false` in `src/config.ts` and they render as a list at the end of the post.

[^here]: Like this one, if you are reading this on the demo site. On GitHub it is an ordinary footnote.

## Highlighter and pencil underline

```md
Search makes retrieval free, so ==nothing gets filed==.
It was ++how often I went back++ that surprised me.
```

`==text==` is a highlighter stroke, `++text++` a pencil underline. Both work inside plain text and do not reach across a link, emphasis or code. Text like `C++` or `a == b` is left alone because the marks need a word right after the opening pair.

The home page opening line in `src/config.ts` (`gloss.intro`) takes the same two marks.

## Math

Write a formula between dollar signs: `$…$` inside a sentence, `$$…$$` on lines of its own. It works in margin notes too. It is set with KaTeX when the site is built, so the page needs no script, and only a post with math loads KaTeX's stylesheet. Chemical equations use mhchem: `$\ce{2H2 + O2 -> 2H2O}$`.

Two dollar signs in one paragraph (`$20 and $30`) read as a formula between them. Write `\$` for a dollar sign you mean literally. A highlighter or pencil mark does not reach across a formula, as it does not across code.

## Pictures, quotes and lists

Put pictures next to the post, in `src/content/posts/images/`, and link them relatively. They are resized at build time. A line set wholly in italics right after a picture is its caption:

```md
![A page of printed proof with handwritten corrections in every margin](./images/proof.jpg)

_A page of Balzac's Eugénie Grandet, 1833. The Morgan Library & Museum, public domain._
```

A quote whose last paragraph starts with an em dash gets that paragraph set as its attribution, small and upright:

```md
> The first draft of anything is a way of finding out what you think.
>
> — A note pinned above my desk
```

Task lists (`- [x] done`, `- [ ] not yet`) get a pencilled box, ticked by hand. Ordinary lists, tables, code blocks and `###` subheadings are styled too.

## Pages

`src/pages/about.md` is an ordinary Markdown page with `layout: ../layouts/Page.astro` in its frontmatter. Footnotes become margin notes there too. Copy it for any other page (`colophon.md`, `uses.md`) and link it from `nav.header` in `src/config.ts`.

## Adding a field

Add it to the `posts` schema in `src/content.config.ts`, then use it where you want it shown, usually `src/pages/posts/[slug].astro`. Run `pnpm check` afterwards: every sample post is validated against the schema.
