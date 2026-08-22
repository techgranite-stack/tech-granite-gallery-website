// ============================================================
// src/lib/listing-item.ts
// Shared, UI-facing model for the stone listing grid (StoneCard /
// StoneListingSection). Decouples the presentation components from the
// two underlying data systems:
//   • StoneProduct (src/types/stone.ts) — powers /marble, /granite
//   • Product      (src/lib/product-data.ts) — powers /collections/[category]
// Adapters below map each system onto one ListingItem shape.
// ============================================================

import type { StoneProduct, ColorFamily } from '@/types/stone';
import { productPath } from '@/types/stone';
import type { Product } from '@/lib/product-data';
import { resolveCatalogImage, resolveCollectionImage } from '@/lib/product-detail';

export interface ListingItem {
  slug: string;
  name: string;
  tagline: string;
  origin: string;
  thumbnail: string;
  /** Colour-family chips shown on the card image (optional — not every stone has these) */
  colorFamily?: ColorFamily[];
  /**
   * Filterable facets keyed by filter-group key, e.g.
   * `{ color: ['grey'], type: ['marble'], finish: ['polished'] }`.
   * The listing section matches its configured filter groups against these.
   * A collection that has no colours simply omits the `color` key (and the page
   * omits the colour filter group) — filters are fully data-driven per collection.
   */
  facets: Record<string, string[]>;
  /** Precomputed detail-page link */
  href: string;
  /** Chip text, e.g. "Indian Marble" / "Granite" / "Sandstone" */
  categoryLabel: string;
  tag?: string;
  altNames?: string[];
}

function stoneCategoryLabel(category: StoneProduct['category']): string {
  return category === 'imported-marble' ? 'Imported Marble'
    : category === 'marble' ? 'Indian Marble'
    : 'Granite';
}

/** Adapt a rich StoneProduct (marble/granite system) to a ListingItem. */
export function fromStoneProduct(p: StoneProduct): ListingItem {
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    origin: p.origin,
    thumbnail: resolveCatalogImage(p.slug, p.thumbnail),
    colorFamily: p.colorFamily,
    facets: {
      color: p.colorFamily,
      type: [p.category],
    },
    href: productPath(p),
    categoryLabel: stoneCategoryLabel(p.category),
    tag: p.tag,
    altNames: p.altNames,
  };
}

/** Adapt a collection Product to a ListingItem for a given category title. */
export function fromCollectionProduct(p: Product, categoryLabel: string): ListingItem {
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.description,
    origin: p.origin,
    thumbnail: resolveCollectionImage(p.type, p.slug, 'catalog', p.heroImage),
    colorFamily: p.colorFamily,
    facets: {
      ...(p.colorFamily && p.colorFamily.length ? { color: p.colorFamily } : {}),
      finish: p.finishesAvailable,
      application: p.applications,
    },
    href: `/collections/${p.type}/${p.slug}`,
    categoryLabel,
    tag: p.tag,
  };
}
