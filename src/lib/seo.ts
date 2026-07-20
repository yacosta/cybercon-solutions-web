import { services } from '../data/services';
import { absoluteUrl, site } from './site';

type Locale = 'en' | 'es';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    alternateName: 'CYBERCON',
    url: site.url,
    logo: absoluteUrl('/favicon.svg'),
    image: absoluteUrl(site.ogImage),
    email: site.email,
    telephone: site.phone,
    slogan: site.slogan,
    priceRange: '$$',
    description:
      'Proactive, security-first managed IT services for growing organizations — endpoint and server management, cybersecurity, backup and disaster recovery, and compliance, at a predictable monthly rate.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceArea,
    knowsAbout: [...site.knowsAbout],
    sameAs: [site.social.linkedin],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      telephone: site.phone,
      availableLanguage: ['English', 'Spanish'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Managed IT Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title.en,
          description: service.summary.en,
          url: absoluteUrl(`/services/${service.slug}/`),
        },
      })),
    },
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    publisher: { '@id': `${site.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: (typeof services)[number], locale: Locale) {
  const path = locale === 'es' ? `/es/services/${service.slug}/` : `/services/${service.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title[locale],
    description: service.summary[locale],
    url: absoluteUrl(path),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: site.serviceArea,
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
