// ============================================================
// src/data/seo-matrix/rules.ts
// Programmatic SEO quality gates and material compatibility rules.
// ============================================================

import { MaterialId, ApplicationId, FinishId, Combo } from '@/lib/landing/types';

// Gate G1: Material-Finish Compatibility
export const FINISH_COMPATIBILITY: Record<MaterialId, FinishId[]> = {
  granite: [
    'polished',
    'honed',
    'leathered',
    'flamed',
    'shot-blast',
    'bush-hammered',
    'acid-wash',
    'latino',
    'hydro-blast',
  ],
  marble: [
    'polished',
    'honed',
    'antique',
    'latino',
  ],
  sandstone: [
    'honed',
    'shot-blast',
    'chiseled',
    'bush-hammered',
    'antique',
  ],
  quartzite: [
    'polished',
    'leathered',
    'honed',
  ],
  onyx: [
    'polished',
    'honed',
  ],
  travertine: [
    'honed',
    'antique',
    'polished',
    'bush-hammered',
  ],
};

// Gate G1: Material-Application Compatibility
export const APPLICATION_COMPATIBILITY: Record<MaterialId, ApplicationId[]> = {
  granite: [
    'kitchen-countertops',
    'flooring',
    'wall-cladding',
    'staircase',
    'exterior-cladding',
    'tabletops',
  ],
  marble: [
    'flooring',
    'bathroom',
    'wall-cladding',
    'tabletops',
    'staircase',
    'kitchen-countertops',
  ],
  sandstone: [
    'exterior-cladding',
    'wall-cladding',
    'flooring',
    'staircase',
  ],
  quartzite: [
    'kitchen-countertops',
    'wall-cladding',
    'flooring',
    'tabletops',
  ],
  onyx: [
    'wall-cladding',
    'tabletops',
    'bathroom',
  ],
  travertine: [
    'wall-cladding',
    'flooring',
    'bathroom',
  ],
};

/**
 * Gate G1 Validation: Verifies that the combination does not propose an
 * engineering anti-pattern (e.g. Acid wash onyx or marble exterior cladding).
 */
export function isComboValid(combo: Combo): boolean {
  if (combo.material) {
    if (combo.finish) {
      const allowedFinishes = FINISH_COMPATIBILITY[combo.material] ?? [];
      if (!allowedFinishes.includes(combo.finish)) return false;
    }
    if (combo.application) {
      const allowedApps = APPLICATION_COMPATIBILITY[combo.material] ?? [];
      if (!allowedApps.includes(combo.application)) return false;
    }
  }
  return true;
}

/**
 * Gate G2 Validation: Ensures a generated page has enough real catalogue
 * stones in stock to provide a genuine user experience (minimum 3–4 stones).
 */
export function hasSufficientCatalogue(matchingStonesCount: number, pattern: string): boolean {
  if (pattern === 'P8' || pattern === 'P9' || pattern === 'G6' || pattern.startsWith('G')) {
    return matchingStonesCount >= 1;
  }
  if (pattern === 'P-Stone') {
    return matchingStonesCount >= 1;
  }
  return matchingStonesCount >= 3;
}
