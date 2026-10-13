// Pure helpers, no astro: imports, so src/lib/posts.check.ts can run them under plain node.

const WORDS_PER_MINUTE = 230;

/** Words a reader reads: code, HTML comments, images, link targets and mark syntax are not counted. */
export const countWords = (markdown: string): number =>
  markdown
    .replace(/^(```|~~~)[^]*?^\1/gm, ' ')
    .replace(/<!--[^]*?-->/g, ' ')
    .replace(/!\[[^\]]*\](\([^)]*\)|\[[^\]]*\])/g, ' ')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/\[\^[^\]]+\]:?/g, ' ')
    .replace(/==|\+\+/g, '')
    .split(/\s+/)
    .filter((token) => /\p{L}|\p{N}/u.test(token)).length;

export const readingMinutes = (words: number): number =>
  Math.max(1, Math.round(words / WORDS_PER_MINUTE));

// UTC, or the date shifts back a day for readers west of Greenwich.
const long = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' });
const yearMonth = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: '2-digit',
  timeZone: 'UTC',
});

/** "October 4, 2026" */
export const formatDate = (date: Date): string => long.format(date);

/** "2026·10", the list column. */
export const formatYearMonth = (date: Date): string => {
  const parts = Object.fromEntries(yearMonth.formatToParts(date).map((p) => [p.type, p.value]));
  return `${parts.year}·${parts.month}`;
};

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": '#39' }[c]};`,
  );

/** A config string with ==highlight== and ++underline++ as HTML, everything else escaped. */
export const renderMarks = (text: string): string =>
  escape(text).replace(/(==|\+\+)(?=\S)(.+?)(?<=\S)\1/g, (_, mark: string, inner: string) =>
    mark === '==' ? `<mark>${inner}</mark>` : `<span class="hand-u">${inner}</span>`,
  );
