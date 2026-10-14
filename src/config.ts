// src/config.ts — single entry point for site settings. Everything site-specific lives here; never hardcode in components.
export const site = {
  name: 'Hana Ito', // the site's name: header, titles, feed
  description: 'Essays on slow software and the tools that outlast us.',
  url: 'https://example.com',
  locale: 'en', // BCP 47, e.g. 'en', 'ko'
  author: 'Hana Ito', // Fictional demo author. Replace with your name
  defaultOgImage: '/og-default.png',
} as const;

export const nav = {
  header: [
    { label: 'Essays', href: '/posts' },
    { label: 'About', href: '/about' },
  ],
} as const;

export const seo = {
  titleTemplate: `%s · ${site.name}`,
  twitterHandle: '',
  jsonLd: { type: 'Person' as 'Person' | 'Organization', name: site.author },
};

// The Gloss: handwritten margin notes and marks.
export const gloss = {
  // Footnotes ([^1]) as handwritten notes in the margin. false: an ordinary footnote list.
  marginNotes: true,
  // Home page opening line. ==text== highlights, ++text++ draws an underline.
  intro: 'Essays on slow software and ==the tools that outlast us==.',
  // One handwritten line under it. Empty string to leave it out.
  introNote: 'writing here since 2019, about once a month',
  homePosts: 6,
};

export const features = {
  darkMode: true,
};

export const analytics = {
  provider: null as null | 'plausible' | 'ga4' | 'umami',
  id: '',
  // Self-hosted Plausible or Umami: the origin serving the script, no trailing slash.
  // Empty means the hosted service. GA4 ignores it.
  host: '',
};

// Every word the theme prints, in one place: translate these and set site.locale, which also
// sets the language of dates and numbers. Counts are functions, so plurals stay right:
// essays: (count) => `${count} Essays`.
const n = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;
export const ui = {
  skipToContent: 'Skip to content',
  mainNav: 'Main', // read out for the header links
  rss: 'RSS',
  theme: { name: 'Theme', system: 'System', light: 'Light', dark: 'Dark' },
  minutes: (count: number) => `${count} min`, // a list row
  minutesRead: (count: number) => `${count} min read`, // under a title, and on its social card
  words: (count: string) => `${count} words`, // count arrives formatted: 1,794
  updated: 'updated',
  recentEssays: 'Recent essays', // read out before the home list
  allEssays: (count: number) => `All ${count} essays`,
  archive: {
    title: 'Essays',
    description: (count: number) => `All ${count} essays, newest first.`,
    count: (count: number) => `${n(count, 'essay', 'essays')}, newest first.`,
  },
  filedUnder: 'Filed under',
  moreEssays: 'More essays', // read out for the earlier/later links
  earlier: 'Earlier',
  later: 'Later',
  note: (number: number) => `Note ${number}`, // read out for a margin note's number
  notFound: {
    title: 'Page not found',
    text: 'This page is not here. It may have moved, or never existed.',
    hand: 'try the list of essays instead',
    allEssays: 'All essays',
    home: 'Home',
  },
};
