import { services } from '../data/services';
import type { LocaleText } from '../data/service-details';
import { getServiceDetails } from '../data/service-details';
import { getServiceFeatureImagePath } from './service-editorial';
import { absoluteUrl, formatMailingAddress, site } from './site';

type Locale = 'en' | 'es';

function areaServedPlaces() {
  return [
    {
      '@type': 'City',
      name: 'Cooper City',
      containedInPlace: { '@type': 'State', name: 'Florida' },
    },
    {
      '@type': 'City',
      name: 'Davie',
      containedInPlace: { '@type': 'State', name: 'Florida' },
    },
    {
      '@type': 'City',
      name: 'Miami Beach',
      containedInPlace: { '@type': 'State', name: 'Florida' },
    },
    {
      '@type': 'AdministrativeArea',
      name: 'South Florida',
    },
    {
      '@type': 'Country',
      name: 'United States',
    },
  ];
}

const orgCopy: Record<
  Locale,
  { description: string; catalogName: string; contactType: string }
> = {
  en: {
    description: `Proactive managed IT for growing organizations, with security as the baseline: endpoint and server management, cybersecurity, backup and disaster recovery, and compliance, at a predictable monthly rate. Mailing address is in Miami Beach, Florida (${formatMailingAddress()}). Onsite and managed services focus on ${site.serviceAreaFocus}.`,
    catalogName: 'Managed IT Services',
    contactType: 'sales',
  },
  es: {
    description: `TI administrada proactiva para organizaciones en crecimiento, con la seguridad como base: gestión de endpoints y servidores, ciberseguridad, respaldo y recuperación ante desastres, y cumplimiento, a una tarifa mensual predecible. La dirección postal está en Miami Beach, Florida (${formatMailingAddress()}). Los servicios gestionados y en sitio se centran en Cooper City, Davie y el sur de Florida.`,
    catalogName: 'Servicios de TI administrada',
    contactType: 'sales',
  },
};

export function organizationJsonLd(locale: Locale = 'en') {
  const copy = orgCopy[locale];
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    alternateName: 'CYBERCON',
    url: site.url,
    logo: absoluteUrl('/cybercon-mark.svg'),
    image: absoluteUrl(site.ogImage),
    email: site.email,
    telephone: site.phone,
    slogan: site.slogan,
    priceRange: '$$',
    description: copy.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: areaServedPlaces(),
    knowsAbout: [...site.knowsAbout],
    sameAs: [site.social.linkedin],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: copy.contactType,
      email: site.email,
      telephone: site.phone,
      availableLanguage: ['English', 'Spanish'],
      areaServed: site.serviceAreaFocus,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: copy.catalogName,
      itemListElement: services.map((service) => {
        const servicePath =
          locale === 'es' ? `/es/services/${service.slug}/` : `/services/${service.slug}/`;
        return {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title[locale],
            description: service.summary[locale],
            url: absoluteUrl(servicePath),
            areaServed: areaServedPlaces(),
          },
        };
      }),
    },
  };
}

export function websiteJsonLd(locale: Locale) {
  const searchPath = locale === 'es' ? '/es/search/' : '/search/';
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
        urlTemplate: `${site.url}${searchPath}?q={search_term_string}`,
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
  const details = getServiceDetails(service.slug);
  const imagePath = getServiceFeatureImagePath(service.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title[locale],
    description: details?.metaDescription[locale] ?? service.summary[locale],
    url: absoluteUrl(path),
    ...(imagePath ? { image: absoluteUrl(imagePath) } : {}),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: areaServedPlaces(),
    serviceType: service.title[locale],
  };
}

export function faqPageJsonLd(faqs: { question: LocaleText; answer: LocaleText }[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[locale],
      },
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: Date;
  dateModified: Date;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    image: opts.image,
    datePublished: opts.datePublished.toISOString(),
    dateModified: opts.dateModified.toISOString(),
    inLanguage: opts.locale === 'es' ? 'es-US' : 'en-US',
    author: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/cybercon-mark.svg'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(opts.path),
    },
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
