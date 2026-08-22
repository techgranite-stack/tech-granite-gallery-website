// ============================================================
// src/lib/structured-data.ts
// JSON-LD (schema.org) builders for StoneProduct detail pages.
// Emitted on /marble/[slug] and /granite/[slug] for SEO/AEO.
// FAQPage schema is handled separately by the FAQAccordion component.
// ============================================================

import type { StoneProduct } from '@/types/stone';
import { productPath } from '@/types/stone';

const BASE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://granitegalleryindia.com'
).replace(/\/$/, '');

const ORG = {
  '@type': 'Organization',
  name: 'Granite Gallery',
  address: 'Kishangarh, Rajasthan, India',
} as const;

/** schema.org/Product for a stone product detail page. */
export function productJsonLd(stone: StoneProduct) {
  const categoryLabel = stone.category === 'granite' ? 'Granite' : 'Marble';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stone.name,
    description: stone.metaDescription || stone.description,
    image: [stone.ogImage ?? stone.heroImages[0], ...stone.galleryImages].filter(Boolean).slice(0, 6),
    sku: stone.slug,
    category: categoryLabel,
    ...(stone.altNames?.length ? { alternateName: stone.altNames } : {}),
    material: stone.name,
    brand: { '@type': 'Brand', name: 'Granite Gallery' },
    url: `${BASE}${productPath(stone)}`,
    offers: {
      '@type': 'Offer',
      availability: stone.inStock === false
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      priceCurrency: 'INR',
      url: `${BASE}${productPath(stone)}`,
      seller: ORG,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${BASE}/${categorySlug}` },
      { '@type': 'ListItem', position: 3, name: stone.name, item: `${BASE}${productPath(stone)}` },
    ],
  };
}
