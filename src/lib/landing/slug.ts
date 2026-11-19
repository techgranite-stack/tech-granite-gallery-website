// ============================================================
// src/lib/landing/slug.ts
// Bi-directional slug parser and compiler for the SEO matrix.
// ============================================================

import { Combo, PatternId, LocationId, MaterialId, ApplicationId, FinishId } from './types';
import { ColorFamily } from '@/types/stone';
import { allStones } from '@/data/stone-index';

export const KNOWN_LOCATIONS: LocationId[] = [
  'kishangarh', 'delhi', 'rajasthan', 'jaipur', 'mumbai',
  'bangalore', 'hyderabad', 'ahmedabad', 'pune',
  'ludhiana', 'surat', 'indore', 'gurugram', 'nagpur', 'mysuru', 'karnataka',
];

export const KNOWN_MATERIALS: MaterialId[] = [
  'granite', 'marble', 'sandstone', 'quartzite', 'onyx', 'travertine', 'slate', 'limestone',
];

const KNOWN_APPLICATIONS: ApplicationId[] = [
  'kitchen-countertops', 'wall-cladding', 'exterior-cladding',
  'flooring', 'bathroom', 'staircase', 'tabletops',
];

const KNOWN_FINISHES: FinishId[] = [
  'leathered', 'flamed', 'acid-wash', 'bush-hammered', 'shot-blast',
  'honed', 'polished', 'latino', 'antique', 'hydro-blast',
];

const KNOWN_COLORS: ColorFamily[] = [
  'white', 'black', 'grey', 'pink', 'red', 'green',
  'brown', 'blue', 'yellow', 'beige', 'multi',
];

export function buildSlug(combo: Combo): string {
  switch (combo.pattern) {
    case 'P1':
      return `${combo.material}-suppliers-in-${combo.location}`;
    case 'P2':
      return `${combo.application}-stone-in-${combo.location}`;
    case 'P3':
      return `${combo.material}-${combo.application}`;
    case 'P4':
      return `${combo.material}-${combo.application}-in-${combo.location}`;
    case 'P5':
      return `${combo.finish}-granite-in-${combo.location}`;
    case 'P6':
      return `${combo.color}-${combo.material}-in-${combo.location}`;
    case 'P7':
      return `${combo.finish}-${combo.material}-slabs`;
    case 'P-Stone': {
      const mat = combo.material ?? 'granite';
      const baseSlug = combo.stoneSlug?.endsWith(`-${mat}`)
        ? combo.stoneSlug
        : `${combo.stoneSlug}-${mat}`;
      return `${baseSlug}-in-${combo.location}`;
    }
    case 'G1':
      return `${combo.material}-price-in-${combo.location}`;
    case 'G6':
      if (combo.finish) return `best-${combo.finish}-${combo.material ?? 'granite'}-finishes`;
      if (combo.color && combo.application) return `best-${combo.color}-${combo.material}-${combo.application}`;
      return `best-${combo.material ?? 'natural-stone'}-for-${combo.application ?? 'flooring'}`;
    default:
      return `${combo.material ?? 'stone'}-${combo.location ?? 'kishangarh'}`;
  }
}

export function parseSlug(slug: string): Partial<Combo> {
  const result: Partial<Combo> = {};

  if (slug.startsWith('best-')) {
    result.pattern = 'G6';
  }

  // Extract location if present at the end: "-in-{location}"
  for (const loc of KNOWN_LOCATIONS) {
    if (slug.endsWith(`-in-${loc}`)) {
      result.location = loc;
      const prefix = slug.slice(0, -(loc.length + 4));

      // 1. Check if prefix matches a specific catalog stone directly
      const exactStone = allStones.find((s) => s.slug === prefix);
      if (exactStone) {
        result.pattern = 'P-Stone';
        result.stoneSlug = exactStone.slug;
        result.material = (exactStone.category === 'imported-marble' ? 'marble' : exactStone.category) as MaterialId;
      } else {
        // 2. Strip trailing material suffix (e.g. "tan-brown-granite" -> "tan-brown", "statuario-marble" -> "statuario")
        const stripped = prefix.replace(/-(granite|marble|sandstone|quartzite|slate|limestone|onyx|travertine)$/, '');
        const matchedStone = allStones.find((s) => s.slug === stripped);
        if (matchedStone) {
          result.pattern = 'P-Stone';
          result.stoneSlug = matchedStone.slug;
          result.material = (matchedStone.category === 'imported-marble' ? 'marble' : matchedStone.category) as MaterialId;
        }
      }
      break;
    }
  }

  // Check if slug matches a specific catalog stone directly without location (e.g. "markino-granite" or "markino")
  if (!result.pattern && !result.stoneSlug) {
    const exactStone = allStones.find((s) => s.slug === slug);
    if (exactStone) {
      result.pattern = 'P-Stone';
      result.stoneSlug = exactStone.slug;
      result.material = (exactStone.category === 'imported-marble' ? 'marble' : exactStone.category) as MaterialId;
    } else {
      const stripped = slug.replace(/-(granite|marble|sandstone|quartzite|slate|limestone|onyx|travertine)$/, '');
      const matchedStone = allStones.find((s) => s.slug === stripped);
      if (matchedStone) {
        result.pattern = 'P-Stone';
        result.stoneSlug = matchedStone.slug;
        result.material = (matchedStone.category === 'imported-marble' ? 'marble' : matchedStone.category) as MaterialId;
      }
    }
  }

  // Check material
  for (const mat of KNOWN_MATERIALS) {
    if (slug.includes(mat)) {
      result.material = mat;
      break;
    }
  }

  // Check application
  for (const app of KNOWN_APPLICATIONS) {
    if (slug.includes(app)) {
      result.application = app;
      break;
    }
  }

  // Application synonyms and variants for G6 and buyer queries
  if (!result.application) {
    if (slug.includes('countertop') || slug.includes('kitchen')) {
      result.application = 'kitchen-countertops';
    } else if (slug.includes('elevation')) {
      result.application = 'exterior-cladding';
    } else if (slug.includes('cladding')) {
      result.application = 'wall-cladding';
    } else if (slug.includes('stair') || slug.includes('stairs')) {
      result.application = 'staircase';
    } else if (slug.includes('bathroom') || slug.includes('vanit')) {
      result.application = 'bathroom';
    } else if (slug.includes('floor') || slug.includes('paving') || slug.includes('parking') || slug.includes('driveway') || slug.includes('pooja') || slug.includes('living-room')) {
      result.application = 'flooring';
    } else if (slug.includes('tabletop') || slug.includes('dining')) {
      result.application = 'tabletops';
    }
  }

  // Check finish (including Indian mandi & trade names like Lapatro / Lapotra / Lapato for leathered finish)
  const isLeatherOrLapatro =
    slug.includes('leather') ||
    slug.includes('lapatro') ||
    slug.includes('lapotra') ||
    slug.includes('lapatra') ||
    slug.includes('lapato') ||
    slug.includes('lepatro') ||
    slug.includes('lepato') ||
    slug.includes('lapothro');

  if (isLeatherOrLapatro) {
    result.finish = 'leathered';
  } else {
    for (const fin of KNOWN_FINISHES) {
      if (slug.includes(fin)) {
        result.finish = fin;
        break;
      }
    }
    if (!result.finish) {
      if (slug.includes('flamed')) result.finish = 'flamed';
      else if (slug.includes('honed')) result.finish = 'honed';
      else if (slug.includes('acid-wash')) result.finish = 'acid-wash';
      else if (slug.includes('bush-hammered')) result.finish = 'bush-hammered';
      else if (slug.includes('shot-blast')) result.finish = 'shot-blast';
      else if (slug.includes('chiseled')) result.finish = 'chiseled';
      else if (slug.includes('hydro-blast')) result.finish = 'hydro-blast';
      else if (slug.includes('polished')) result.finish = 'polished';
      else if (slug.includes('antique')) result.finish = 'antique';
      else if (slug.includes('latino')) result.finish = 'latino';
    }
  }

  // Infer finish pattern (P5 for finish x material in location, P7 for finish x material slabs) if not already set
  if (!result.pattern && result.finish && result.material) {
    result.pattern = result.location ? 'P5' : 'P7';
  }

  // Check color (can be prefix or infix e.g. best-black-granite)
  for (const col of KNOWN_COLORS) {
    if (slug.includes(`-${col}-`) || slug.startsWith(`${col}-`)) {
      result.color = col;
      break;
    }
  }

  // Infer color pattern (P6 for color x material in location or base color stone) if not already set
  if (!result.pattern && result.color && result.material) {
    result.pattern = 'P6';
  }

  return result;
}

