// ============================================================
// src/lib/landing/slug.ts
// Bi-directional slug parser and compiler for the SEO matrix.
// ============================================================

import { Combo, PatternId, LocationId, MaterialId, ApplicationId, FinishId } from './types';
import { ColorFamily } from '@/types/stone';

const KNOWN_LOCATIONS: LocationId[] = [
  'kishangarh', 'delhi', 'rajasthan', 'jaipur', 'mumbai',
  'bangalore', 'hyderabad', 'ahmedabad', 'pune',
];

const KNOWN_MATERIALS: MaterialId[] = [
  'granite', 'marble', 'sandstone', 'quartzite', 'onyx', 'travertine',
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
    case 'P-Stone':
      return `${combo.stoneSlug}-${combo.material}-in-${combo.location}`;
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
      break;
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

  // Check finish
  for (const fin of KNOWN_FINISHES) {
    if (
      slug.includes(fin) ||
      (fin === 'leathered' && (slug.includes('leather-finish') || slug.includes('lapotra')))
    ) {
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
  }

  // Check color (can be prefix or infix e.g. best-black-granite)
  for (const col of KNOWN_COLORS) {
    if (slug.includes(`-${col}-`) || slug.startsWith(`${col}-`)) {
      result.color = col;
      break;
    }
  }

  return result;
}

