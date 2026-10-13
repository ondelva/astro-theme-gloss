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
  titleTemplate: '%s · Hana Ito',
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
