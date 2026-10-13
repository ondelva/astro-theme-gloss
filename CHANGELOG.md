# Changelog

All notable changes to this theme are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

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
