import { services } from '../data/services';
import type { LocaleText } from '../data/service-details';
import { getServiceDetails } from '../data/service-details';
import { webDesignPage } from '../data/web-design-page';
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
      '@type': 'AdministrativeArea',
      name: 'Broward County',
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
  { description: string; catalogName: string; contactType: string; slogan: string }
> = {
  en: {
    description: `Proactive managed IT for growing organizations, with security as the baseline: endpoint and server management, cybersecurity, backup and disaster recovery, and compliance, at a predictable monthly rate. Service-area business: onsite and managed services focus on ${site.serviceAreaFocus}. Mailing address only (no customer visits): ${formatMailingAddress()}.`,
    catalogName: 'Managed IT Services',
    contactType: 'sales',
    slogan: site.slogan,
  },
  es: {
    description: `TI administrada proactiva para organizaciones en crecimiento, con la seguridad como base: gestión de endpoints y servidores, ciberseguridad, copia de seguridad y recuperación ante desastres, y cumplimiento, a una tarifa mensual predecible. Área de servicio: Cooper City, Davie, el condado de Broward y el sur de Florida. Dirección postal únicamente (sin visitas de clientes): ${formatMailingAddress()}.`,
    catalogName: 'Servicios de TI administrada',
    contactType: 'sales',
    slogan: 'Tecnología, resuelta.',
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
    slogan: copy.slogan,
    priceRange: '$$',
    description: copy.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
      description:
        locale === 'es'
          ? 'Dirección postal únicamente — no hay visitas de clientes en esta ubicación.'
          : 'Mailing address only — no customer visits at this location.',
    },
    founder: { '@id': `${site.url}/#founder` },
    areaServed: areaServedPlaces(),
    knowsAbout: [...site.knowsAbout],
    sameAs: [site.social.linkedin, site.social.x],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: copy.contactType,
      email: site.email,
      telephone: site.phone,
      url: absoluteUrl('/contact/'),
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

export function contactPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${absoluteUrl(opts.path)}#webpage`,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: opts.locale === 'es' ? 'es-US' : 'en-US',
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#organization` },
    mainEntity: { '@id': `${site.url}/#organization` },
  };
}

export function webPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(opts.path)}#webpage`,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: opts.locale === 'es' ? 'es-US' : 'en-US',
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#organization` },
  };
}

/** Privacy & cookie policy page — distinct type so crawlers don't treat it as a thin generic WebPage. */
export function privacyPolicyJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  dateModified: string;
}) {
  const enPath = '/privacy/';
  const esPath = '/es/privacy/';
  return {
    '@context': 'https://schema.org',
    '@type': ['WebPage', 'PrivacyPolicy'],
    '@id': `${absoluteUrl(opts.path)}#webpage`,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: opts.locale === 'es' ? 'es-US' : 'en-US',
    dateModified: opts.dateModified,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(opts.path),
    significantLink: absoluteUrl(opts.locale === 'es' ? enPath : esPath),
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

/** Service JSON-LD for a single-city Managed IT landing page (areaServed narrowed to that place). */
export function localManagedItServiceJsonLd(opts: {
  path: string;
  locale: Locale;
  name: string;
  description: string;
  place: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: opts.place, containedInPlace: { '@type': 'State', name: 'Florida' } },
      ...areaServedPlaces(),
    ],
    serviceType: opts.name,
  };
}

/** Flat-rate web design packages as OfferCatalog (paired with the Service JSON-LD). */
export function webDesignOfferCatalogJsonLd(locale: Locale) {
  const path =
    locale === 'es'
      ? '/es/services/web-design-development/'
      : '/services/web-design-development/';
  const pricingUrl = absoluteUrl(`${path}#pricing`);
  const catalogName =
    locale === 'es' ? 'Paquetes de diseño y rediseño web' : 'Website design & redesign packages';

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${absoluteUrl(path)}#pricing-offers`,
    name: catalogName,
    url: pricingUrl,
    numberOfItems: webDesignPage.pricing.tiers.length,
    itemListElement: webDesignPage.pricing.tiers.map((tier, index) => {
      const offer: Record<string, unknown> = {
        '@type': 'Offer',
        position: index + 1,
        name: tier.name[locale],
        description: tier.description[locale],
        url: pricingUrl,
        seller: { '@id': `${site.url}/#organization` },
        areaServed: areaServedPlaces(),
        itemOffered: {
          '@type': 'Service',
          name: tier.name[locale],
          description: tier.description[locale],
          provider: { '@id': `${site.url}/#organization` },
          url: absoluteUrl(path),
        },
      };

      if (tier.priceMinUsd != null) {
        offer.priceCurrency = 'USD';
        offer.price = String(tier.priceMinUsd);
        offer.priceSpecification = {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          minPrice: tier.priceMinUsd,
          ...(tier.priceMaxUsd != null ? { maxPrice: tier.priceMaxUsd } : {}),
        };
      } else {
        offer.priceSpecification = {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          description: tier.priceFrom[locale],
        };
      }

      return offer;
    }),
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
      '@type': 'Person',
      '@id': `${site.url}/#founder`,
      name: site.founder.name,
      jobTitle: opts.locale === 'es' ? site.founder.roleEs : site.founder.role,
      url: absoluteUrl(opts.locale === 'es' ? site.founder.aboutPathEs : site.founder.aboutPath),
      worksFor: { '@id': `${site.url}/#organization` },
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

export function founderPersonJsonLd(locale: Locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#founder`,
    name: site.founder.name,
    jobTitle: locale === 'es' ? site.founder.roleEs : site.founder.role,
    url: absoluteUrl(locale === 'es' ? site.founder.aboutPathEs : site.founder.aboutPath),
    worksFor: { '@id': `${site.url}/#organization` },
    knowsAbout: [...site.knowsAbout],
    sameAs: [site.social.linkedin],
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
