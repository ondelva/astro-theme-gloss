// pnpm test: word counts and dates.
import assert from 'node:assert/strict';
import { countWords, formatDate, formatYearMonth, readingMinutes, renderMarks } from './text.ts';

assert.equal(countWords('One ==two== ++three++ [four](https://x.y/a b).[^1]\n\n[^1]: five'), 5);
assert.equal(countWords('a\n\n```js\nconst x = 1;\n```\n\nb <!-- hidden words -->'), 2);
assert.equal(countWords('— 12 · ok'), 2);
assert.equal(countWords('![A long alt text here](./images/x.jpg)\n\n*Caption words.*'), 2);
assert.equal(readingMinutes(0), 1);
assert.equal(readingMinutes(690), 3);
// Midnight UTC stays on its day.
assert.equal(formatDate(new Date('2026-10-04')), 'October 4, 2026');
assert.equal(formatYearMonth(new Date('2026-01-01')), '2026·01');

// Config strings: marks render, HTML does not.
assert.equal(
  renderMarks('a ==b c== and ++d++ <i>'),
  'a <mark>b c</mark> and <span class="hand-u">d</span> &lt;i&gt;',
);
assert.equal(renderMarks('C++ and i++'), 'C++ and i++');

console.log('posts: ok');
