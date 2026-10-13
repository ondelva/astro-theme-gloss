// pnpm test: the Gloss plugins on a small document. Fails loudly, no framework.
import assert from 'node:assert/strict';
import { markdownToHtml, mdxToJs, type MarkdownToHtmlResult } from 'satteri';
import { glossMarks, glossNotes, LONG_NOTE, splitMarks } from './gloss-plugin.ts';

// Synchronous: neither plugin is async.
const render = (src: string, notes = true) =>
  (
    markdownToHtml(src, {
      mdastPlugins: notes ? [glossNotes, glossMarks] : [glossMarks],
    }) as MarkdownToHtmlResult
  ).html;

const doc = `First ==marked== and ++drawn++ text.[^b]

- a list item[^a]

Second mention[^b] and a missing one[^zz].

[^a]: Short *note* with [a link](https://example.com).
[^b]: ${'Long. '.repeat(LONG_NOTE / 6 + 2)}
`;
const html = render(doc);

// Numbered by first reference, not by label.
assert.match(html, /id="ref-b"><a href="#note-b" aria-label="Note 1">1</);
assert.match(html, /<a href="#note-a" aria-label="Note 2">2</);
// Each note sits right after the block that first references it.
assert.match(html, /text\.<sup[^]*?<\/p>\s*<p class="gloss-note is-long" id="note-b" role="note">/);
assert.match(
  html,
  /<\/ul>\s*<p class="gloss-note" id="note-a" role="note"><span class="gloss-num">2<\/span> Short <em>note<\/em> with <a href="https:\/\/example.com">a link<\/a>/,
);
// A second reference does not repeat the note; no footnote section; unknown labels stay as text.
assert.equal(html.match(/id="note-b"/g)?.length, 1);
assert.doesNotMatch(html, /footnotes/);
assert.match(html, /missing one\[\^zz\]/);
// Marks.
assert.match(html, /<mark>marked<\/mark>/);
assert.match(html, /<span class="hand-u">drawn<\/span>/);
// A caption is a paragraph wholly in emphasis after an image; one emphasised word is not.
const pics = render('![a](x.jpg)\n\n*Caption.*\n\n![b](y.jpg)\n\nThis was *not* it.\n');
assert.match(pics, /<p class="gloss-caption"><em>Caption\.<\/em><\/p>/);
assert.equal(pics.match(/gloss-caption/g)?.length, 1);
// The last paragraph of a quote is its attribution only when it starts with an em dash.
const quotes = render('> Said.\n>\n> — Someone\n\n> One line — not credited.\n');
assert.match(quotes, /<p class="gloss-attribution">— Someone<\/p>/);
assert.equal(quotes.match(/gloss-attribution/g)?.length, 1);
assert.equal(splitMarks('C++ and i++ stay'), null);
assert.equal(splitMarks('a == b'), null);
// Switched off: ordinary footnotes, marks still work.
const off = render(doc, false);
assert.match(off, /class="footnotes"/);
assert.match(off, /<mark>marked<\/mark>/);

// MDX cannot carry raw HTML nodes: the plugins must build plain mdast (2026-10-13, 8b).
await mdxToJs(doc, { mdastPlugins: [glossNotes, glossMarks] });

console.log('gloss: ok');
