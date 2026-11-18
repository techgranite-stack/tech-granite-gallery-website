// ============================================================
// src/lib/product-detail.ts
// Normalizes the two parallel product data systems (StoneProduct
// and Product) into a single shape consumed by the shared
// <ProductCatalog> detail-content component.
// ============================================================

import fs from 'fs';
import path from 'path';
import type { StoneProduct } from '@/types/stone';
import type { Product } from '@/lib/product-data';
import { getProductPrice } from '@/data/product-prices';

export interface DetailSpecRow {
  key: string;
  val: string;
}

export interface DetailPill {
  label: string;
  href: string;
}

export interface ProductDetailData {
  eyebrow: string;
  /** Big serif product name */
  title: string;
  /** Small label under the title, e.g. "Indian Marble" / "Granite" */
  subtitle: string;
  /** Multi-paragraph copy (split on \n\n inside the component) */
  description: string;
  /** Highlight bullets — may be empty (collections products have none) */
  highlights: string[];
  specRows: DetailSpecRow[];
  finishes: DetailPill[];
  applications: DetailPill[];
  /** Single, already-resolved image (stand.webp or fallback) */
  image: string;
  imageAlt: string;
  whatsappUrl: string;
  backHref: string;
  backLabel: string;
  priceFormatted?: string;
  priceNote?: string;
}

/** Title-cases a slug-ish string: "kitchen-countertops" → "Kitchen Countertops" */
function titleCase(value: string): string {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Canonical application slug normalization to avoid 404 links */
export const CANONICAL_APPLICATION_MAP: Record<string, string> = {
  'kitchen-counter': 'kitchen-countertops',
  'kitchen-countertop': 'kitchen-countertops',
  'kitchen': 'kitchen-countertops',
  'feature-walls': 'wall-cladding',
  'feature-wall': 'wall-cladding',
  'backlit-feature-walls': 'wall-cladding',
  'fireplace': 'wall-cladding',
  'fireplaces': 'wall-cladding',
  'wall': 'wall-cladding',
  'outdoor-paving': 'exterior-cladding',
  'landscaping': 'exterior-cladding',
  'garden': 'exterior-cladding',
  'pool-surround': 'exterior-cladding',
  'exterior': 'exterior-cladding',
  'bar-counter': 'tabletops',
  'bar-counters': 'tabletops',
  'tabletop': 'tabletops',
  'table-tops': 'tabletops',
  'bathroom-vanities': 'bathroom',
  'bathroom-flooring': 'bathroom',
  'bath': 'bathroom',
  'flooring': 'flooring',
  'staircase': 'staircase',
  'wall-cladding': 'wall-cladding',
  'kitchen-countertops': 'kitchen-countertops',
  'exterior-cladding': 'exterior-cladding',
  'tabletops': 'tabletops',
};

/** Canonical finish slug normalization to avoid 404 links */
export const CANONICAL_FINISH_MAP: Record<string, string> = {
  'leather': 'leathered',
  'brushed': 'leathered',
  'unfilled-brushed': 'antique',
  'honed-filled': 'honed',
  'filled-polished': 'polished',
  'backlit': 'polished',
  'natural': 'chiseled',
  'sandblasted': 'shot-blast',
  'polished': 'polished',
  'leathered': 'leathered',
  'flamed': 'flamed',
  'shot-blast': 'shot-blast',
  'bush-hammered': 'bush-hammered',
  'chiseled': 'chiseled',
  'acid-wash': 'acid-wash',
  'honed': 'honed',
  'latino': 'latino',
  'antique': 'antique',
  'hydro-blast': 'hydro-blast',
};

/**
 * Server-only. Returns `/images/stones/<slug>/stand.webp` when that file
 * exists in /public, otherwise the supplied fallback image. Only ~15 marble
 * slugs currently ship a stand image; granite & collections fall back.
 */
export function resolveStandImage(slug: string, fallback: string): string {
  const candidates = [`${slug}_stand.webp`, `${slug}-stand.webp`, 'stand.webp'];
  for (const file of candidates) {
    const p = path.join(process.cwd(), 'public', 'images', 'stones', slug, file);
    if (fs.existsSync(p)) return `/images/stones/${slug}/${file}`;
  }
  return fallback;
}

export function resolveHeroImage(slug: string, fallback: string): string {
  const candidates = [`${slug}_hero.webp`, `${slug}-hero.webp`, 'hero.webp'];
  for (const file of candidates) {
    const p = path.join(process.cwd(), 'public', 'images', 'stones', slug, file);
    if (fs.existsSync(p)) return `/images/stones/${slug}/${file}`;
  }
  return fallback;
}

export function resolveCatalogImage(slug: string, fallback: string): string {
  const candidates = [`${slug}_catalog.webp`, `${slug}-catalog.webp`, 'catalog.webp'];
  for (const file of candidates) {
    const p = path.join(process.cwd(), 'public', 'images', 'stones', slug, file);
    if (fs.existsSync(p)) return `/images/stones/${slug}/${file}`;
  }
  return fallback;
}

/**
 * Server-only. System-B (collections) images live under
 * `public/images/collections/<category>/<slug>/<kind>.webp` (kind = hero |
 * stand | catalog). Returns that path when the file exists, else the fallback.
 */
export function resolveCollectionImage(
  category: string,
  slug: string,
  kind: 'hero' | 'stand' | 'catalog',
  fallback: string,
): string {
  const candidates = [`${slug}_${kind}.webp`, `${slug}-${kind}.webp`, `${kind}.webp`];
  for (const file of candidates) {
    const imgPath = path.join(process.cwd(), 'public', 'images', 'collections', category, slug, file);
    if (fs.existsSync(imgPath)) {
      return `/images/collections/${category}/${slug}/${file}`;
    }
  }
  return fallback;
}

/**
 * Returns exact, authentic product photography matching what is shown
 * on the stone detail page (hero.webp, stand.webp, catalog.webp).
 * Excludes generic room stock photography.
 */
export function resolveProductExactPhotos(stone: StoneProduct): string[] {
  const photos: string[] = [];

  // 1. Try stones/<slug>/ (Granite & Marble)
  const heroImg = resolveHeroImage(stone.slug, '');
  if (heroImg) photos.push(heroImg);
  const standImg = resolveStandImage(stone.slug, '');
  if (standImg) photos.push(standImg);
  const catalogImg = resolveCatalogImage(stone.slug, '');
  if (catalogImg) photos.push(catalogImg);

  // 2. Try collections/<category>/<slug>/ (Sandstone, Quartzite, Slate, Limestone)
  const collHero = resolveCollectionImage(stone.category, stone.slug, 'hero', '');
  if (collHero) photos.push(collHero);
  const collStand = resolveCollectionImage(stone.category, stone.slug, 'stand', '');
  if (collStand) photos.push(collStand);
  const collCatalog = resolveCollectionImage(stone.category, stone.slug, 'catalog', '');
  if (collCatalog) photos.push(collCatalog);

  // 3. Fallback to product images only if not generic /applications/ stock rooms
  const otherImages = [
    stone.thumbnail,
    ...(stone.heroImages || []),
    ...(stone.galleryImages || []),
  ].filter((img) => Boolean(img) && !img.includes('/applications/'));

  photos.push(...otherImages);

  const unique = Array.from(new Set(photos.filter(Boolean)));
  return unique.length > 0 ? unique : [stone.thumbnail || '/images/hero/granite-gallery-marble-granite-sandstone.webp'];
}

interface StoneDetailOpts {
  /** Small label under the title, e.g. "Indian Marble" / "Granite" */
  subtitle: string;
  backHref: string;
  backLabel: string;
  image: string;
  whatsappUrl: string;
}

/** System A — StoneProduct (powers /marble and /granite). */
export function fromStoneDetail(p: StoneProduct, opts: StoneDetailOpts): ProductDetailData {
  const price = p.priceRange ?? getProductPrice(p.slug, p.category);
  const priceFormatted = `₹${price.low} – ₹${price.high} / ${price.unit || 'sq ft'}`;

  const specRows: DetailSpecRow[] = [
    { key: 'Indicative Price', val: `${priceFormatted} (ex-factory)` },
    { key: 'Origin', val: p.origin },
    { key: 'Stone Type', val: opts.subtitle },
    ...(p.specs.density ? [{ key: 'Density', val: p.specs.density }] : []),
    ...(p.specs.compressiveStrength ? [{ key: 'Compressive Strength', val: p.specs.compressiveStrength }] : []),
    ...(p.specs.waterAbsorption ? [{ key: 'Water Absorption', val: p.specs.waterAbsorption }] : []),
    ...(p.specs.hardness ? [{ key: 'Hardness (Mohs)', val: p.specs.hardness }] : []),
    ...(p.specs.porosity ? [{ key: 'Porosity', val: p.specs.porosity }] : []),
    ...(p.specs.thickness ? [{ key: 'Thickness', val: p.specs.thickness }] : []),
    ...(p.sizes.length > 0 ? [{ key: 'Available Sizes', val: p.sizes.map((s) => s.label).join(' · ') }] : []),
  ];

  return {
    eyebrow: 'About This Stone',
    title: p.name,
    subtitle: opts.subtitle,
    description: p.description,
    highlights: p.highlights ?? [],
    specRows,
    finishes: p.finishes.map((f) => {
      const canonicalSlug = CANONICAL_FINISH_MAP[f.id] || f.id;
      return { label: f.label, href: `/finishes/${canonicalSlug}` };
    }),
    applications: p.applications.map((a) => {
      const canonicalSlug = CANONICAL_APPLICATION_MAP[a.id] || a.id;
      return { label: a.label, href: `/applications/${canonicalSlug}` };
    }),
    image: opts.image,
    imageAlt: `${p.name} — ${opts.subtitle}`,
    whatsappUrl: opts.whatsappUrl,
    backHref: opts.backHref,
    backLabel: opts.backLabel,
    priceFormatted,
    priceNote: 'Wholesale & factory rates (ex-Kishangarh). Contact for customized sizes & container export quotes.',
  };
}

interface CollectionDetailOpts {
  backHref: string;
  backLabel: string;
  image: string;
  whatsappUrl: string;
}

/** System B — Product (powers /collections/[category]/[slug]). */
export function fromCollectionDetail(p: Product, opts: CollectionDetailOpts): ProductDetailData {
  const typeLabel = p.type.charAt(0).toUpperCase() + p.type.slice(1);
  const price = p.priceRange ?? getProductPrice(p.slug, p.type);
  const priceFormatted = `₹${price.low} – ₹${price.high} / ${price.unit || 'sq ft'}`;

  const specRows: DetailSpecRow[] = [
    { key: 'Indicative Price', val: `${priceFormatted} (ex-factory)` },
    { key: 'Origin', val: p.origin },
    { key: 'Stone Type', val: typeLabel },
    ...(p.specifications.density ? [{ key: 'Density', val: p.specifications.density }] : []),
    ...(p.specifications.compressiveStrength ? [{ key: 'Compressive Strength', val: p.specifications.compressiveStrength }] : []),
    ...(p.specifications.waterAbsorption ? [{ key: 'Water Absorption', val: p.specifications.waterAbsorption }] : []),
    ...(p.specifications.hardness ? [{ key: 'Hardness (Mohs)', val: p.specifications.hardness }] : []),
    ...(p.sizes.length > 0 ? [{ key: 'Available Sizes', val: p.sizes.join(' · ') }] : []),
    { key: 'Primary Colour', val: p.primaryColor },
  ];

  return {
    eyebrow: 'About This Stone',
    title: p.name,
    subtitle: typeLabel,
    description: p.longDescription,
    highlights: [],
    specRows,
    finishes: p.finishesAvailable.map((f) => {
      const canonicalSlug = CANONICAL_FINISH_MAP[f] || f;
      return { label: titleCase(f), href: `/finishes/${canonicalSlug}` };
    }),
    applications: p.applications.map((a) => {
      const canonicalSlug = CANONICAL_APPLICATION_MAP[a] || a;
      return { label: titleCase(a), href: `/applications/${canonicalSlug}` };
    }),
    image: opts.image,
    imageAlt: `${p.name} — ${typeLabel}`,
    whatsappUrl: opts.whatsappUrl,
    backHref: opts.backHref,
    backLabel: opts.backLabel,
    priceFormatted,
    priceNote: 'Wholesale & factory rates (ex-Kishangarh). Contact for customized sizes & container export quotes.',
  };
}
