# Changelog

All notable changes to this theme are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

## [1.1.1] - 2026-10-14

### Fixed

- With analytics set to GA4, `gtag()` is now on `window`, so your own events can call it (it was a function local to the snippet).
- Chinese and Japanese are counted by character for the reading time; a sentence without spaces used to count as one word.

## [1.1.0] - 2026-10-13

### Added

- A quote's last paragraph, when it starts with an em dash, is set as its attribution (class `gloss-attribution`).
- Task lists get a pencilled box with a hand-drawn tick.
- `docs/content.md` covers pictures and captions, quotes and lists.

## [1.0.0] - 2026-10-13

First release. The demo is live at https://gloss-free.ondelva.com, with screenshots in
`docs/screenshots/` and the link to Pro.

### Fixed

- A caption is now only a paragraph set wholly in emphasis right after a picture; a paragraph with one emphasised word there stays body text. The caption gets class `gloss-caption`.
- A picture without a caption keeps the usual space below it.
- Page titles end in `site.name` instead of a fixed name.
- The theme toggle reaches Dark when the browser blocks storage.
- Reference-style images (`![alt][ref]`) are left out of word counts, like inline ones.

## [0.9.2] - 2026-10-13

### Changed

- More room on the page: body line height 1.7 (Gelasio's larger x-height needs it), 1.2em between paragraphs, headings set apart from the paragraph above (2.2em) and closer to their own (0.75em), 64px between the text and the margin notes.
- The side margin grows with the screen, from 20px on a phone to 32px (`--gutter` in `src/styles/gloss.css`).
- Long margin notes get a little more leading.

## [0.9.1] - 2026-10-13

### Changed

- The text face is now Gelasio instead of Alegreya: a calmer screen serif with kerning, so the handwritten notes are the only hand on the page. Body 18px with a 1.6 line height, lining figures in running text, tighter paragraph spacing.
- Long margin notes are set in the text face, italic, instead of the UI sans, so a page uses three typefaces instead of four.
- The theme switch announces itself as "Theme: System/Light/Dark" to screen readers and no longer claims to be a two-state toggle.

### Added

- Pictures in posts with plain-Markdown captions, and three new sample essays, two with public-domain photographs.

## [0.9.0] - 2026-10-13

First snapshot.

### Added

- Posts in Markdown and MDX, a home page with an opening line and a handwritten note, an archive by year, an About page, RSS, sitemap, structured data.
- Margin notes: footnotes set in handwriting beside their paragraph, under it on small screens; long notes in small print; `gloss.marginNotes` to switch back to ordinary footnotes.
- `==highlight==` and `++pencil underline++` in posts and in `gloss.intro`.
