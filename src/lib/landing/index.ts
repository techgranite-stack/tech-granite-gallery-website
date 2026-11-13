// ============================================================
// src/lib/landing/index.ts
// Public API for the Programmatic SEO Landing Engine.
// ============================================================

import { LandingPageData } from '@/lib/landing-pages-data';
import { getManifestEntryBySlug, getAllManifestSlugs, MANIFEST_ENTRIES } from '@/data/seo-matrix/manifest';
import { parseSlug } from './slug';
import { resolveCombo } from './resolve';
import { composeLandingPage } from './compose';
import { Combo } from './types';

export { getAllManifestSlugs, MANIFEST_ENTRIES };

/**
 * Resolves and composes a programmatic landing page for the given slug.
 * Returns undefined if the slug is not registered in the manifest.
 */
export function getLandingPage(slug: string): LandingPageData | undefined {
  const entry = getManifestEntryBySlug(slug);
  if (!entry) return undefined;

  // Extract dimensions from the entry or parse from slug
  const parsed = parseSlug(slug);
  const combo: Combo = {
    pattern: entry.pattern,
    location: parsed.location ?? 'kishangarh',
    material: parsed.material ?? 'granite',
    application: parsed.application,
    finish: parsed.finish,
    color: parsed.color,
  };

  const resolved = resolveCombo(combo);
  return composeLandingPage(entry, resolved);
}

/**
 * Returns all active programmatic landing page slugs.
 */
export function getAllLandingSlugs(): string[] {
  return getAllManifestSlugs();
}
