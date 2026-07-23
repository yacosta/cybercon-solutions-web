export const en = {
  meta: {
    title: 'Managed IT & Cybersecurity in South Florida | Cybercon',
    description:
      'Free assessment for managed IT, cybersecurity, cloud, and AI in Cooper City & Davie, Florida. We catch issues early and treat security as the baseline.',
  },
  nav: {
    search: 'Search',
    searchOpen: 'Open search',
    searchClose: 'Close search',
    searchLabel: 'Search the site',
    searchPlaceholder: 'Search services, pages…',
    searchResults: 'Search results',
    searchEmpty: 'No results for “{query}”.',
    searchUnavailable: 'Search isn’t available right now. Try again in a moment.',
    searchAllResults: 'View all results',
    home: 'Home',
  },
  hero: {
    eyebrow: 'Cooper City & Davie, Florida',
    title: 'Your IT department, without the overhead.',
    lede:
      'Managed IT, cybersecurity, cloud, and AI. We catch problems early, and we treat security as the baseline. Tell us where to start and a real engineer will follow up within one business day.',
    status: 'Serving South Florida businesses',
    cta: 'Book a free assessment',
  },
  form: {
    title: 'Book a free assessment',
    lede: 'Plain English, no obligation. You get a clear picture of where your technology stands.',
    name: 'Full name',
    company: 'Company name',
    email: 'Work email',
    submit: 'Request my free assessment',
    microcopy:
      'A real engineer replies within one business day. We never share your details.',
    thanksTitle: 'Thanks, we received your request.',
    thanksBody:
      "We'll be in touch within one business day. No sales pressure, just a clear next step.",
    namePlaceholder: 'Jordan Rivera',
    companyPlaceholder: 'Rivera Logistics, Inc.',
    emailPlaceholder: 'jordan@company.com',
    error: 'Something went wrong. Please try again.',
    turnstileError: 'Please complete the verification check.',
  },
  services: {
    eyebrow: 'What we handle',
    title: 'One partner for all of your technology.',
    lede:
      'We manage everything below proactively, with predictable per-user pricing. No break/fix surprises, and no jargon.',
    learnMore: 'Learn more',
  },
  servicePage: {
    back: 'All services',
    audienceTitle: 'Who it’s for',
    includedTitle: 'What’s included',
    processTitle: 'How we work',
    faqTitle: 'FAQ',
    ctaTitle: 'Want a clear picture of where your tech stands?',
    ctaBody: 'Book a free assessment. A real engineer replies within one business day.',
    cta: 'Book a free assessment',
  },
  blog: {
    nav: 'Blog',
    eyebrow: 'Blog',
    indexTitle: 'Blog | Cybercon Solutions',
    indexDescription:
      'Practical notes on enterprise AI, managed IT, and cybersecurity for South Florida leaders — measured ROI, governance, and operating discipline.',
    indexHeading: 'Insights for technology leaders',
    indexLede:
      'What we tell executives and boards: workflows that ship, governance that accelerates, and metrics that survive budget season.',
    readMore: 'Read the article',
    allPosts: 'All posts',
    englishBodyNote: 'This article is published in English.',
    ctaTitle: 'Ready to turn AI pilots into production?',
    ctaBody:
      'Book a free assessment. We map workflows, governance, and a measured automation plan — not another demo.',
    cta: 'Book a free assessment',
  },
  footer: {
    area: 'Serving Cooper City & Davie, Florida',
    mailing: 'Mailing address: Miami Beach, FL',
    copyright: 'Copyright 2026 CYBERCON SOLUTIONS. All Rights Reserved.',
    blog: 'Blog',
    privacy: 'Privacy & Cookies',
    cookies: 'Cookie settings',
  },
  search: {
    title: 'Search',
    lede: 'Find pages and services across the site.',
  },
  client: {
    title: 'Client area',
    lede: 'Sign in to view tickets, documents, and account details.',
    login: 'Sign in',
    logout: 'Sign out',
    welcome: 'Welcome back',
    dashboard: 'Your dashboard',
    placeholder:
      'Sign in to your support portal to view tickets, documents, and account details. Contact us if you need access.',
  },
  cookies: {
    title: 'Cookies & privacy',
    body: 'We use only strictly necessary cookies to run this site. With your consent we also use analytics to understand site traffic.',
    accept: 'Accept analytics',
    decline: 'Decline',
    policy: 'Privacy & Cookie Policy',
  },
  notFound: {
    title: 'Page not found | Cybercon',
    description:
      'That page does not exist. Explore managed IT and cybersecurity services for South Florida, or book a free assessment.',
    kicker: '404',
    heading: 'Page not found',
    lede: 'That link does not match a page on this site. Try one of these instead, or go back home.',
    home: 'Go to homepage',
    services: 'Browse services',
    assessment: 'Book a free assessment',
    privacy: 'Privacy & Cookies',
    search: 'Search the site',
    popular: 'Popular pages',
    languages: 'Language',
    homeEn: 'English homepage',
    homeEs: 'Spanish homepage',
    otherLocale: 'Español',
    otherLocaleHref: '/es/',
  },
} as const;

export type Messages = typeof en;
