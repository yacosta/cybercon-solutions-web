export const site = {
  name: 'Cybercon Solutions',
  legalName: 'Cybercon Solutions LLC',
  url: 'https://cybercon-solutions.com',
  email: 'info@cybercon-solutions.com',
  phone: '+1-973-573-0007',
  phoneDisplay: '973-573-0007',
  address: {
    street: '407 Lincoln Rd. Suite 6H PMB 7209',
    locality: 'Miami Beach',
    region: 'FL',
    postalCode: '33139',
    country: 'US',
  },
  serviceArea: ['Cooper City, FL', 'Davie, FL', 'South Florida'],
  ogImage: '/og-image.png',
  social: {
    // Add when available
  },
} as const;

export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '');
  if (!path || path === '/') return `${base}/`;
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
