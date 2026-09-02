export const site = {
  name: 'Cybercon Solutions',
  legalName: 'Cybercon Solutions LLC',
  url: 'https://cybercon-solutions.com',
  email: 'info@cybercon-solutions.com',
  phone: '+1-754-300-9786',
  phoneDisplay: '(754) 300-9786',
  slogan: 'Technology, handled.',
  /**
   * Legal / mailing address (PMB). Not a staffed customer-facing office.
   * Google Business Profile should be configured as a service-area business;
   * do not list this PMB as a visit-able location.
   */
  address: {
    street: '407 Lincoln Rd. Suite 6H PMB 7209',
    locality: 'Miami Beach',
    region: 'FL',
    postalCode: '33139',
    country: 'US',
    visitPolicy: 'mailing-only' as const,
  },
  /** Where we deliver managed and onsite services. */
  serviceAreaFocus: 'Cooper City, Davie, Broward County, and greater South Florida',
  serviceArea: [
    'Cooper City, FL',
    'Davie, FL',
    'Broward County, FL',
    'South Florida',
    'United States',
  ],
  founder: {
    name: 'Yezid Acosta',
    role: 'CIO/CISO and Founder',
    roleEs: 'CIO/CISO y Fundador',
    yearsLeadership: 25,
    aboutPath: '/about/',
    aboutPathEs: '/es/about/',
  },
  /** Ideal-fit employee range for managed IT (defensible operating model). */
  idealClientEmployees: { min: 15, max: 150 },
  knowsAbout: [
    'Managed IT services',
    'Cybersecurity',
    'AI security',
    'Endpoint management',
    'Server management',
    'Backup and disaster recovery',
    'IT compliance',
    'Cloud services',
    'AI consulting',
  ],
  ogImage: '/og-image.png',
  social: {
    linkedin: 'https://www.linkedin.com/company/cybercon-solutions-llc',
    x: 'https://x.com/CyberconInfo',
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

/** Optional meeting scheduler (Calendly or similar). Empty when unset. */
export function calendarBookingUrl(): string | undefined {
  const fromEnv =
    (typeof import.meta !== 'undefined' &&
      (import.meta.env as Record<string, unknown>).PUBLIC_CALENDAR_URL) ||
    undefined;
  if (typeof fromEnv === 'string' && fromEnv.trim()) return fromEnv.trim();
  return undefined;
}
