export const site = {
  name: 'Cybercon Solutions',
  legalName: 'Cybercon Solutions LLC',
  url: 'https://cybercon-solutions.com',
  email: 'info@cybercon-solutions.com',
  phone: '+1-973-573-0007',
  phoneDisplay: '973-573-0007',
  slogan: 'Technology, handled.',
  /** Legal / mailing address (PMB). Not the primary onsite service HQ. */
  address: {
    street: '407 Lincoln Rd. Suite 6H PMB 7209',
    locality: 'Miami Beach',
    region: 'FL',
    postalCode: '33139',
    country: 'US',
  },
  /** Where we deliver managed and onsite services. */
  serviceAreaFocus: 'Cooper City, Davie, and greater South Florida',
  serviceArea: ['Cooper City, FL', 'Davie, FL', 'Miami Beach, FL', 'South Florida', 'United States'],
  knowsAbout: [
    'Managed IT services',
    'Cybersecurity',
    'Endpoint management',
    'Server management',
    'Backup and disaster recovery',
    'IT compliance',
    'Cloud services',
    'AI consulting',
  ],
  /** JPEG keeps broad social-crawler compatibility while staying much smaller than PNG. */
  ogImage: '/og-image-social.jpg',
  social: {
    linkedin: 'https://www.linkedin.com/company/cybercon-solutions',
  },
} as const;

export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '');
  if (!path || path === '/') return `${base}/`;
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatMailingAddress(): string {
  const a = site.address;
  return `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}, United States`;
}
