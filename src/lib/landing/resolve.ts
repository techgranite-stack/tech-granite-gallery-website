// ============================================================
// src/lib/landing/resolve.ts
// Resolves real catalogue stones and calculates dynamic engineering specs.
// ============================================================

import { Combo, ResolvedCombo } from './types';
import { allStones, StoneProduct } from '@/data/stone-index';
import { getLocation } from '@/data/seo-matrix/locations';
import { getMaterial } from '@/data/seo-matrix/materials';
import { getPriceBand } from '@/data/seo-matrix/prices';

export function resolveCombo(combo: Combo): ResolvedCombo {
  const location = combo.location ? getLocation(combo.location) : undefined;
  const material = combo.material ? getMaterial(combo.material) : undefined;
  const priceBand = combo.material ? getPriceBand(combo.material, combo.stoneSlug) : undefined;

  let matchingStones: StoneProduct[] = [];

  if (combo.stoneSlug) {
    const single = allStones.find((s) => s.slug === combo.stoneSlug);
    if (single) matchingStones = [single];
  }

  if (matchingStones.length === 0) {
    matchingStones = allStones.filter((s) => {
      // Filter by material
      if (combo.material === 'granite' && s.category !== 'granite') return false;
      if (combo.material === 'marble' && s.category !== 'marble' && s.category !== 'imported-marble') return false;
      if (combo.material === 'sandstone' && s.category !== 'sandstone') return false;
      if (combo.material === 'quartzite' && s.category !== 'quartzite') return false;
      if (combo.material === 'slate' && s.category !== 'slate') return false;
      if (combo.material === 'limestone' && s.category !== 'limestone') return false;

      // Filter by color
      if (combo.color && !s.colorFamily.includes(combo.color)) return false;

      // Filter by finish
      if (combo.finish) {
        const hasFinish = s.finishes.some(
          (f) => f.id.toLowerCase() === combo.finish?.toLowerCase() ||
                 f.label.toLowerCase().includes(combo.finish?.toLowerCase() ?? '')
        );
        if (!hasFinish) return false;
      }

      // Filter by application
      if (combo.application) {
        const hasApp = s.applications.some(
          (a) => a.id.toLowerCase().includes(combo.application?.toLowerCase() ?? '') ||
                 a.label.toLowerCase().includes(combo.application?.toLowerCase() ?? '')
        );
        if (!hasApp) return false;
      }

      return true;
    });
  }

  // Fallback to top category stones if specific intersection is narrow
  if (matchingStones.length === 0 && combo.material) {
    if (combo.material === 'granite') {
      matchingStones = allStones.filter((s) => s.category === 'granite').slice(0, 8);
    } else if (combo.material === 'marble') {
      matchingStones = allStones.filter((s) => s.category === 'marble' || s.category === 'imported-marble').slice(0, 8);
    } else if (combo.material === 'sandstone') {
      matchingStones = allStones.filter((s) => s.category === 'sandstone').slice(0, 8);
    } else if (combo.material === 'quartzite') {
      matchingStones = allStones.filter((s) => s.category === 'quartzite').slice(0, 8);
    } else if (combo.material === 'slate') {
      matchingStones = allStones.filter((s) => s.category === 'slate').slice(0, 8);
    } else if (combo.material === 'limestone') {
      matchingStones = allStones.filter((s) => s.category === 'limestone').slice(0, 8);
    } else {
      matchingStones = allStones.slice(0, 8);
    }
  }

  // Calculate dynamic engineering spec ranges across the matched stones
  const densities = matchingStones.map((s) => s.specs.density).filter(Boolean);
  const absorptions = matchingStones.map((s) => s.specs.waterAbsorption).filter(Boolean);
  const strengths = matchingStones.map((s) => s.specs.compressiveStrength).filter(Boolean);
  const hardnesses = matchingStones.map((s) => s.specs.hardness).filter(Boolean);

  const specRanges = {
    density: densities[0] ?? material?.densityRange ?? '2.65 g/cm³',
    absorption: absorptions[0] ?? material?.waterAbsorption ?? '< 0.20%',
    compressiveStrength: strengths[0] ?? material?.compressiveStrength ?? '160–220 MPa',
    hardness: hardnesses[0] ?? material?.hardnessMohs ?? 'Mohs 6–7',
  };

  return {
    combo,
    location,
    material,
    matchingStones,
    specRanges,
    priceBand,
  };
}
