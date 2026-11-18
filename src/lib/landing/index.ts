// ============================================================
// src/lib/landing/index.ts
// Public API for the Programmatic SEO Landing Engine.
// ============================================================

import { LandingPageData } from '@/lib/landing-pages-data';
import { getManifestEntryBySlug, getAllManifestSlugs, MANIFEST_ENTRIES } from '@/data/seo-matrix/manifest';
import { parseSlug, buildSlug, KNOWN_LOCATIONS } from './slug';
import { resolveCombo } from './resolve';
import { composeLandingPage } from './compose';
import { Combo, ManifestEntry, MaterialId } from './types';
import { getProductBySlug, allStones } from '@/data/stone-index';
import { getLocation } from '@/data/seo-matrix/locations';

export { getAllManifestSlugs, MANIFEST_ENTRIES };

/**
 * Resolves and composes a programmatic landing page for the given slug.
 * Supports both static manifest entries and dynamic P-Stone (Product x City) matrix combinations.
 */
export function getLandingPage(slug: string): LandingPageData | undefined {
  let entry = getManifestEntryBySlug(slug);
  const parsed = parseSlug(slug);

  // If not explicitly in manifest, synthesize verified entry if it represents a valid Product x City combo
  if (!entry && parsed.pattern === 'P-Stone' && parsed.stoneSlug && parsed.location) {
    const stone = getProductBySlug(parsed.stoneSlug);
    const loc = getLocation(parsed.location);
    if (stone && loc) {
      const mat = (stone.category === 'imported-marble' ? 'marble' : stone.category) as string;
      const matCap = mat.charAt(0).toUpperCase() + mat.slice(1);
      entry = {
        id: 10000 + Math.abs(slug.split('').reduce((acc, c) => ((acc << 5) - acc) + c.charCodeAt(0), 0) % 90000),
        slug,
        route: `/${slug}`,
        pattern: 'P-Stone',
        primaryKeyword: `${stone.name.toLowerCase()} in ${loc.name.toLowerCase()}`,
        metaTitle: `${stone.name} in ${loc.name} | Slabs & Rates`,
        categoryDimensions: `Stone:${stone.name}|L:${loc.name}|M:${matCap}`,
        wave: 'Wave 3',
        catalogGrounding: `${stone.slug}|${parsed.location}`,
        verified: true,
      };
    }
  }

  if (!entry) return undefined;

  const combo: Combo = {
    pattern: entry.pattern,
    location: parsed.location ?? 'kishangarh',
    material: parsed.material ?? 'granite',
    application: parsed.application,
    finish: parsed.finish,
    color: parsed.color,
    stoneSlug: parsed.stoneSlug,
  };

  const resolved = resolveCombo(combo);
  return composeLandingPage(entry, resolved);
}

/**
 * Returns all active programmatic landing page slugs across the entire catalog and city matrix.
 */
export function getAllLandingSlugs(): string[] {
  const manifestSlugs = getAllManifestSlugs();
  const stoneCitySlugs: string[] = [];

  for (const stone of allStones) {
    const mat = (stone.category === 'imported-marble' ? 'marble' : stone.category) as MaterialId;
    for (const loc of KNOWN_LOCATIONS) {
      const slug = buildSlug({
        pattern: 'P-Stone',
        stoneSlug: stone.slug,
        material: mat,
        location: loc,
      });
      stoneCitySlugs.push(slug);
    }
  }

  return Array.from(new Set([...manifestSlugs, ...stoneCitySlugs]));
}
