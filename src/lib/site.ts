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
    // TODO(owner): verify X/Twitter handle (cannot contain hyphens)
  },
} as const;

/**
 * Directory path on this site, with a trailing slash.
 * Strips `.html` / `index.html`. Leaves asset filenames (`/og-image.png`) alone.
 * Preserves a query string and hash.
 */
export function canonicalPath(path = '/'): string {
  if (!path) return '/';
  let hash = '';
  let query = '';
  let pathname = path;
  const hashAt = pathname.indexOf('#');
  if (hashAt !== -1) {
    hash = pathname.slice(hashAt);
    pathname = pathname.slice(0, hashAt);
  }
  const queryAt = pathname.indexOf('?');
  if (queryAt !== -1) {
    query = pathname.slice(queryAt);
    pathname = pathname.slice(0, queryAt);
  }
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  if (pathname.endsWith('/index.html')) pathname = pathname.slice(0, -'index.html'.length);
  else if (pathname.endsWith('.html')) pathname = pathname.slice(0, -'.html'.length);
  if (pathname === '/index') pathname = '/';
  else if (pathname.endsWith('/index')) pathname = pathname.slice(0, -'index'.length);
  const isFile = /\/[^/]+\.[a-z0-9]{1,8}$/i.test(pathname);
  if (!isFile && !pathname.endsWith('/')) pathname = `${pathname}/`;
  pathname = pathname.replace(/\/{2,}/g, '/') || '/';
  return `${pathname}${query}${hash}`;
}

/** Absolute URL on the primary domain. Directory paths always end with `/`. */
export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '');
  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      const url = new URL(path);
      if (url.origin !== base) return path;
      return `${base}${canonicalPath(`${url.pathname}${url.search}${url.hash}`)}`;
    } catch {
      return path;
    }
  }
  return `${base}${canonicalPath(path)}`;
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
