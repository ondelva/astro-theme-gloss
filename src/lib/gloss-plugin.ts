// The Gloss, build side: two Sätteri mdast plugins.
//
// glossNotes: Markdown footnotes ([^1]) become margin notes. Each note is placed right after
// the top-level block that first references it, so CSS can set it beside that paragraph on
// wide screens and under it on narrow ones. The end-of-page footnote list is not rendered.
// Turned off with gloss.marginNotes in src/config.ts (then footnotes render as usual).
//
// glossMarks: ==highlighted== becomes <mark>, ++underlined++ a hand-drawn underline span.
// Both work inside one run of plain text: they do not span links, emphasis or code.
// It also marks a caption: a paragraph wholly in emphasis right after a paragraph holding only
// an image gets class gloss-caption. And an attribution: the last paragraph of a blockquote,
// when it starts with an em dash, gets class gloss-attribution.
import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import { ui } from '../config.ts';

type Entry = NonNullable<SatteriProcessorOptions['mdastPlugins']>[number];
type Plugin = Extract<Entry, { name: string }>;
type Node = {
  type: string;
  identifier?: string;
  value?: string;
  children?: Node[];
  data?: unknown;
};

/** Notes longer than this (characters of text) are set small in the UI face, not in handwriting. */
export const LONG_NOTE = 200;

const refsIn = (node: Node, out: string[] = []): string[] => {
  if (node.type === 'footnoteReference' && node.identifier) out.push(node.identifier);
  for (const child of node.children ?? []) refsIn(child, out);
  return out;
};

// Plain copies: the visitor hands out read-only views, and new nodes must be plain objects.
const plain = (node: Node): Node => JSON.parse(JSON.stringify(node));

// A factory, so every document numbers its notes from 1.
export const glossNotes = (): Plugin => {
  const numbers = new Map<string, number>();
  return {
    name: 'gloss-notes',
    before(root, ctx) {
      const blocks = root.children as unknown as Node[];
      const defs = new Map<string, Node>();
      for (const node of blocks)
        if (node.type === 'footnoteDefinition' && node.identifier) defs.set(node.identifier, node);
      if (defs.size === 0) return;

      // Number by first reference, in reading order. Insert from the end so indexes hold.
      const placements: { at: number; ids: string[] }[] = [];
      blocks.forEach((block, at) => {
        if (block.type === 'footnoteDefinition') return;
        const ids = refsIn(block).filter((id) => defs.has(id) && !numbers.has(id));
        for (const id of ids) if (!numbers.has(id)) numbers.set(id, numbers.size + 1);
        if (ids.length) placements.push({ at, ids: [...new Set(ids)] });
      });

      for (const { at, ids } of placements.reverse()) {
        const notes = ids.map((id) => {
          const def = defs.get(id)!;
          const long = ctx.textContent(def as never).length > LONG_NOTE;
          // Several paragraphs in one note collapse into one, separated by line breaks.
          const children: Node[] = [];
          for (const para of def.children ?? []) {
            if (children.length) children.push({ type: 'break' });
            children.push(...(para.children ?? [para]).map(plain));
          }
          return {
            type: 'paragraph',
            data: {
              hName: 'p',
              hProperties: {
                className: long ? ['gloss-note', 'is-long'] : ['gloss-note'],
                id: `note-${id}`,
                role: 'note',
              },
            },
            children: [
              {
                type: 'emphasis',
                data: { hName: 'span', hProperties: { className: ['gloss-num'] } },
                children: [{ type: 'text', value: String(numbers.get(id)) }],
              },
              { type: 'text', value: ' ' },
              ...children,
            ],
          };
        });
        ctx.insertChildAt(root, at + 1, notes as never);
      }

      for (let i = blocks.length - 1; i >= 0; i--)
        if (blocks[i]!.type === 'footnoteDefinition') ctx.removeChildAt(root, i);
    },
    footnoteReference(node, ctx) {
      const n = numbers.get(node.identifier);
      // A reference with no definition stays visible as written, like an unknown link label.
      if (n === undefined)
        return ctx.replaceNode(node, { type: 'text', value: `[^${node.identifier}]` });
      // mdast with hName rather than raw HTML: MDX output cannot carry raw HTML nodes.
      ctx.replaceNode(node, {
        type: 'emphasis',
        data: {
          hName: 'sup',
          hProperties: { className: ['gloss-ref'], id: `ref-${node.identifier}` },
        },
        children: [
          {
            type: 'link',
            url: `#note-${node.identifier}`,
            data: { hProperties: { ariaLabel: ui.note(n) } },
            children: [{ type: 'text', value: String(n) }],
          },
        ],
      } as never);
    },
  };
};

const MARKS = /(==|\+\+)(?=\S)(.+?)(?<=\S)\1/g;

/** Splits one text run into text and mark/underline nodes. Exported for the check script. */
export const splitMarks = (value: string): Node[] | null => {
  const out: Node[] = [];
  let last = 0;
  for (const m of value.matchAll(MARKS)) {
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    out.push({
      type: 'emphasis',
      data:
        m[1] === '=='
          ? { hName: 'mark' }
          : { hName: 'span', hProperties: { className: ['hand-u'] } },
      children: [{ type: 'text', value: m[2] }],
    } as Node);
    last = m.index + m[0].length;
  }
  if (last === 0) return null;
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
};

const only = (node: Node | undefined, type: string) =>
  node?.type === 'paragraph' && node.children?.length === 1 && node.children[0]!.type === type;

export const glossMarks: Plugin = {
  name: 'gloss-marks',
  before(root, ctx) {
    const blocks = root.children as unknown as Node[];
    const swap = (i: number, node: Node) => {
      ctx.removeChildAt(root, i);
      ctx.insertChildAt(root, i, [node] as never);
    };
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i]!;
      if (i > 0 && only(blocks[i - 1], 'image') && only(block, 'emphasis')) {
        swap(i, { ...plain(block), data: { hProperties: { className: ['gloss-caption'] } } });
        continue;
      }
      const kids = block.type === 'blockquote' ? (block.children ?? []) : [];
      const last = kids[kids.length - 1];
      if (
        kids.length > 1 &&
        last?.type === 'paragraph' &&
        /^\s*—/.test(last.children?.[0]?.value ?? '')
      ) {
        const quote = plain(block);
        quote.children![kids.length - 1]!.data = {
          hProperties: { className: ['gloss-attribution'] },
        };
        swap(i, quote);
      }
    }
  },
  text(node, ctx) {
    const parts = splitMarks(node.value);
    if (parts) ctx.replaceNode(node, parts as never);
  },
};
