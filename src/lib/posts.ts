import { getCollection, type CollectionEntry } from 'astro:content';
import { countWords, readingMinutes } from './text';

export { formatDate, formatYearMonth } from './text';

export type Post = CollectionEntry<'posts'> & { words: number; minutes: number };

/** Every published post, newest first. The only place drafts are filtered out. */
export const getPosts = async (): Promise<Post[]> =>
  (await getCollection('posts', ({ data }) => !data.draft))
    .map((entry) => {
      const words = countWords(entry.body ?? '');
      return { ...entry, words, minutes: readingMinutes(words) };
    })
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const postPath = (post: { id: string }): string => `/posts/${post.id}`;

/** Posts grouped by UTC year, newest year first. */
export const byYear = (posts: Post[]): [number, Post[]][] => {
  const years = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.date.getUTCFullYear();
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  return [...years];
};
