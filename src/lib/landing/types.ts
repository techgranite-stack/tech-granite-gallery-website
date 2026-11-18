// ============================================================
// src/lib/landing/types.ts
// Core TypeScript interfaces for the Programmatic SEO Landing Engine.
// ============================================================

import type { LandingPageData } from '@/lib/landing-pages-data';
import type { ColorFamily, StoneCategory, StoneProduct } from '@/types/stone';

export type PatternId =
  | 'P1'        // Material x Location
  | 'P2'        // Application x Location
  | 'P3'        // Material x Application
  | 'P4'        // Material x Application x Location
  | 'P5'        // Finish x Material x Location
  | 'P6'        // Color x Material x Location
  | 'P7'        // Material x Finish
  | 'P8'        // Sector x Material
  | 'P9'        // Buyer x Material x Location
  | 'P-Stone'   // Specific Stone x Location
  | 'G1'        // Material Price in Location
  | 'G1b'       // Application Cost Guide
  | 'G1c'       // Finish Cost & Uses Guide
  | 'G3'        // Material vs Material Comparison
  | 'G3b'       // Stone vs Stone Comparison
  | 'G3c'       // Finish vs Finish Comparison
  | 'G4'        // Quality Inspection Checklist
  | 'G5'        // Wholesale & B2B Sourcing Guide
  | 'G6'        // Best-For Application / Best-Finish Guide
  | 'G7'        // Mandi Sourcing Guide
  | 'G8'        // Care & Maintenance Protocol
  | 'G10'       // Interactive Cost Calculator Guide
  | 'FAQ'       // Dedicated Topic FAQ Hub
  | 'Trust'     // Reviews & Proof Hub
  | 'P-Flagship'; // Flagship Homepage-Grade Landing Page

export type LocationId =
  | 'kishangarh'
  | 'delhi'
  | 'rajasthan'
  | 'jaipur'
  | 'mumbai'
  | 'bangalore'
  | 'hyderabad'
  | 'ahmedabad'
  | 'pune'
  | 'ludhiana'
  | 'surat'
  | 'indore'
  | 'gurugram'
  | 'nagpur'
  | 'mysuru'
  | 'karnataka';

export type MaterialId =
  | 'granite'
  | 'marble'
  | 'sandstone'
  | 'quartzite'
  | 'onyx'
  | 'travertine'
  | 'slate'
  | 'limestone'
  | 'imported-marble'
  | 'exotic'
  | 'porphyry';

export type ApplicationId =
  | 'flooring'
  | 'wall-cladding'
  | 'kitchen-countertops'
  | 'bathroom'
  | 'staircase'
  | 'exterior-cladding'
  | 'tabletops';

export type FinishId =
  | 'polished'
  | 'honed'
  | 'leathered'
  | 'flamed'
  | 'shot-blast'
  | 'bush-hammered'
  | 'chiseled'
  | 'acid-wash'
  | 'latino'
  | 'antique'
  | 'hydro-blast'
  | 'natural-cleft';

export interface LocationFacts {
  id: LocationId;
  name: string;
  kind: 'base' | 'regional' | 'metro';
  hasFacility: boolean;
  distanceKm: number;
  transitHours: string;
  routeDescription: string;
  freightGuidelines: string;
  typicalBuyers: string[];
  localUses: string[];
  relevantProjects: string[];
  verified: boolean;
  freightPerSqftMin?: number;
  freightPerSqftMax?: number;
  unloadingPerSqft?: number;
  transitDays?: string;
}

export interface MaterialFacts {
  id: MaterialId;
  name: string;
  category: StoneCategory | 'sandstone' | 'quartzite' | 'onyx' | 'travertine';
  geologicalOrigin: string;
  densityRange: string;
  hardnessMohs: string;
  waterAbsorption: string;
  compressiveStrength: string;
  idealApplications: ApplicationId[];
  suitableFinishes: FinishId[];
  maintenanceSummary: string;
}

export interface Combo {
  pattern: PatternId;
  location?: LocationId;
  material?: MaterialId;
  application?: ApplicationId;
  finish?: FinishId;
  color?: ColorFamily;
  stoneSlug?: string;
}

export interface ManifestEntry {
  id: number;
  slug: string;
  route: string;
  pattern: PatternId;
  primaryKeyword: string;
  metaTitle: string;
  categoryDimensions: string;
  wave: string;
  catalogGrounding: string;
  verified: boolean;
}

export interface PriceBand {
  material: MaterialId;
  stoneSlug?: string;
  finish?: FinishId;
  application?: ApplicationId;
  lowPrice: number;
  highPrice: number;
  unit: 'sqft';
  basis: string;
  thicknessMm: string;
  updatedAt: string;
  verified: boolean;
  commercialLow?: number;
  commercialHigh?: number;
  standardLow?: number;
  standardHigh?: number;
  premiumLow?: number;
  premiumHigh?: number;
  marketNotes?: string;
}

export interface ResolvedCombo {
  combo: Combo;
  location?: LocationFacts;
  material?: MaterialFacts;
  matchingStones: StoneProduct[];
  specRanges: {
    density?: string;
    absorption?: string;
    compressiveStrength?: string;
    hardness?: string;
  };
  priceBand?: PriceBand;
}

export type PatternComposer = (resolved: ResolvedCombo) => LandingPageData;
