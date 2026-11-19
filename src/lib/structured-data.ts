// ============================================================
// src/lib/structured-data.ts
// JSON-LD (schema.org) builders.
//
// Node graph, and where each one is emitted:
//
//   #organization  → root layout, every page   (who the company is)
//   #website       → root layout, every page   (what the site is)
//   #localbusiness → homepage + /contact only  (where the company physically is)
//   Product        → /marble/[slug], /granite/[slug], /collections/[c]/[slug]
//   BreadcrumbList → the same product routes
//   FAQPage        → emitted by the FAQAccordion component
//
// LocalBusiness is deliberately NOT site-wide. One authoritative node that
// Google can resolve by @id is a stronger signal than 133 competing copies, and
// duplicated LocalBusiness nodes across a site are a known cause of Google
// picking none of them.
// ============================================================

import type { StoneProduct } from '@/types/stone';
import { productPath } from '@/types/stone';
import { SITE_URL, abs } from '@/lib/seo-url';
import { siteConfig } from '@/config/site';
import { getProductPrice } from '@/data/product-prices';
import { getProductReviewSchema } from '@/lib/product-reviews';
import {
  businessAddress,
  businessGeo,
  openingHours,
  foundingYear,
  areasServed,
  primaryLocation,
} from '@/data/local-seo';

/** schema.org/PostalAddress built from the one structured copy of the address. */
function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: businessAddress.streetAddress,
    addressLocality: businessAddress.addressLocality,
    addressRegion: businessAddress.addressRegion,
    postalCode: businessAddress.postalCode,
    addressCountry: businessAddress.addressCountry,
  };
}

/** `areaServed` as typed schema.org place nodes rather than bare strings. */
function areaServed() {
  return areasServed.map((a) => ({ '@type': a.type, name: a.name }));
}

/**
 * schema.org/Organization — the identity node.
 * Referenced by @id from the WebSite, LocalBusiness and Product seller nodes so
 * Google resolves them all to one entity instead of four unrelated ones.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: siteConfig.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: abs('/Logo-black.png'),
    },
    image: abs('/images/hero/granite-gallery-marble-granite-sandstone.webp'),
    description: siteConfig.description,
    email: siteConfig.links.email,
    telephone: siteConfig.links.phoneRaw,
    address: postalAddress(),
    areaServed: areaServed(),
    // Only emitted once the business settles on one founding year — see
    // `foundingYear` in src/data/local-seo.ts for why it is currently null.
    ...(foundingYear ? { foundingDate: String(foundingYear) } : {}),
    sameAs: [siteConfig.links.instagram, siteConfig.links.youtube],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.links.phoneRaw,
      email: siteConfig.links.email,
      contactType: 'sales',
      areaServed: ['IN', 'AE', 'US', 'GB', 'AU'],
      availableLanguage: ['en', 'hi'],
    },
  };
}

/**
 * schema.org/LocalBusiness — the physical-premises node that makes the business
 * eligible for the local pack and Google Maps association.
 *
 * Typed as both Organization and LocalBusiness so it inherits the identity while
 * declaring premises. `HomeAndConstructionBusiness` is the closest standard
 * subtype for a stone manufacturer and supplier.
 *
 * Note: no `aggregateRating`. The 4.9 / 46 reviews shown in the footer come from
 * the Google Business Profile, and Google's structured-data policy prohibits
 * marking up ratings you collected elsewhere or about yourself — doing it risks a
 * manual action rather than a star snippet. The GBP surfaces those stars on its
 * own.
 */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: siteConfig.name,
    url: SITE_URL,
    logo: abs('/Logo-black.png'),
    image: [
      abs('/images/hero/granite-gallery-kishangarh-stone-facility.webp'),
      abs('/images/collections/showroom/marble-showroom-display-wall-kishangarh.webp'),
    ],
    description: siteConfig.description,
    email: siteConfig.links.email,
    telephone: siteConfig.links.phoneRaw,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessGeo.latitude,
      longitude: businessGeo.longitude,
    },
    hasMap: siteConfig.links.maps,
    areaServed: areaServed(),
    priceRange: '$$$',
    currenciesAccepted: 'INR',
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    // Null until confirmed — see `openingHours` in src/data/local-seo.ts.
    ...(openingHours
      ? {
          openingHoursSpecification: openingHours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    sameAs: [siteConfig.links.instagram, siteConfig.links.youtube],
  };
}

/** schema.org/WebSite — ties the domain to the organization. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/**
 * schema.org/Product for a stone product detail page.
 *
 * `images` must be passed in by the caller. It used to be derived here from
 * `stone.ogImage ?? stone.heroImages[0]` plus `stone.galleryImages` — but
 * `ogImage` is set on zero stones, and the hero/gallery fields point at a shared
 * pool of ~7 room photos rather than the per-slug photography the page actually
 * renders. So the image in the structured data was a different file from the
 * image on screen, and the same file across all 55 stones. The route resolves
 * the real ones via resolveHeroImage/resolveStandImage/resolveCatalogImage and
 * hands them over.
 */
export function productJsonLd(stone: StoneProduct, images: string[] = []) {
  const categoryLabel = stone.category === 'granite' ? 'Granite' : 'Marble';
  const url = abs(productPath(stone));
  const pricing = stone.priceRange ?? getProductPrice(stone.slug, stone.category);
  const reviews = getProductReviewSchema(
    stone.slug,
    stone.name,
    stone.category,
    pricing.high,
    pricing.low
  );

  // Fall back to the old derivation only if the caller passed nothing, so an
  // un-migrated call site degrades rather than emitting an empty image array.
  const resolved = images.length
    ? images
    : [stone.ogImage ?? stone.heroImages[0], ...stone.galleryImages];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stone.name,
    description: stone.metaDescription || stone.description,
    // Absolute URLs: schema.org requires them and Google silently discards
    // relative ones, which is why no Product node on the site had a usable image.
    image: Array.from(new Set(resolved.filter(Boolean))).map(abs).slice(0, 6),
    sku: stone.slug,
    category: categoryLabel,
    ...(stone.altNames?.length ? { alternateName: stone.altNames } : {}),
    material: stone.name,
    brand: { '@type': 'Brand', name: siteConfig.name },
    manufacturer: { '@id': `${SITE_URL}/#organization` },
    // Where the stone is quarried — a genuine provenance signal, and for the
    // Rajasthan stones it reinforces the regional association.
    countryOfOrigin: { '@type': 'Country', name: primaryLocation.country },
    url,
    aggregateRating: reviews.aggregateRating,
    review: reviews.review,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: String(pricing.low),
      highPrice: String(pricing.high),
      offerCount: '1',
      priceValidUntil: '2027-12-31',
      availability:
        stone.inStock === false
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      url,
      seller: { '@id': `${SITE_URL}/#organization` },
      areaServed: areaServed(),
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

/** schema.org/BreadcrumbList: Home → Marble|Granite → Stone. */
export function breadcrumbJsonLd(stone: StoneProduct) {
  const categoryLabel = stone.category === 'granite' ? 'Granite' : 'Marble';
  const categorySlug = stone.category === 'granite' ? 'granite' : 'marble';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryLabel,
        item: `${SITE_URL}/${categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: stone.name,
        item: abs(productPath(stone)),
      },
    ],
  };
}

/** Generic BreadcrumbList for non-product routes (landing pages, /contact). */
export function trailJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

/**
 * schema.org/Service — used by the Kishangarh landing page to declare what is
 * offered and where, which is the pairing local queries actually match against.
 */
export function localServiceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: abs(opts.url),
    provider: { '@id': `${SITE_URL}/#localbusiness` },
    areaServed: areaServed(),
  };
}
