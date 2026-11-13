// ============================================================
// src/data/product-prices.ts
// Verified Kishangarh market indicative price ranges (₹ / sq ft).
// Grounded in live market research, trade benchmarks & supplier records.
// ============================================================

export interface ProductPriceRange {
  low: number;
  high: number;
  unit: string;
}

export const PRODUCT_PRICES: Record<string, ProductPriceRange> = {
  // ── 1. Granite Products (40 stones) ──────────────────────────
  'majestic-black': { low: 65, high: 110, unit: 'sqft' },
  'artic-blue': { low: 75, high: 135, unit: 'sqft' },
  'brazil-brown': { low: 85, high: 145, unit: 'sqft' },
  'r-black': { low: 50, high: 75, unit: 'sqft' },
  'malkot': { low: 55, high: 85, unit: 'sqft' },
  'p-white': { low: 42, high: 65, unit: 'sqft' },
  'rosy-pink': { low: 38, high: 65, unit: 'sqft' },
  'cheema-pink': { low: 45, high: 70, unit: 'sqft' },
  'himalayan-red': { low: 65, high: 120, unit: 'sqft' },
  'markino': { low: 60, high: 95, unit: 'sqft' },
  'multi-red': { low: 65, high: 110, unit: 'sqft' },
  'crystal-yellow': { low: 65, high: 115, unit: 'sqft' },
  's-white': { low: 45, high: 75, unit: 'sqft' },
  'coin-black': { low: 60, high: 95, unit: 'sqft' },
  'cera-grey': { low: 55, high: 85, unit: 'sqft' },
  'steel-grey': { low: 65, high: 110, unit: 'sqft' },
  'devda-green': { low: 65, high: 110, unit: 'sqft' },
  'mokalsar-green': { low: 65, high: 110, unit: 'sqft' },
  'narlai-grey': { low: 55, high: 85, unit: 'sqft' },
  'cotton-white': { low: 55, high: 85, unit: 'sqft' },
  'lakha-red': { low: 90, high: 195, unit: 'sqft' },
  'almond-brown': { low: 65, high: 115, unit: 'sqft' },
  'z-brown': { low: 65, high: 115, unit: 'sqft' },
  'green-pearl': { low: 85, high: 145, unit: 'sqft' },
  'apple-green': { low: 55, high: 85, unit: 'sqft' },
  'jhansi-red': { low: 85, high: 145, unit: 'sqft' },
  'kharda-red': { low: 65, high: 110, unit: 'sqft' },
  'fish-black': { low: 65, high: 110, unit: 'sqft' },
  'kandla-grey': { low: 55, high: 85, unit: 'sqft' },
  'china-white': { low: 50, high: 80, unit: 'sqft' },
  'classic-red': { low: 70, high: 120, unit: 'sqft' },
  'blue-pearl': { low: 320, high: 550, unit: 'sqft' },
  'brown-pearl': { low: 300, high: 520, unit: 'sqft' },
  'black-galaxy': { low: 150, high: 250, unit: 'sqft' },
  'tan-brown': { low: 80, high: 145, unit: 'sqft' },
  'telephone-black': { low: 130, high: 220, unit: 'sqft' },
  'hassan-green': { low: 95, high: 165, unit: 'sqft' },
  'madka-brown': { low: 65, high: 110, unit: 'sqft' },
  'godhra-grey': { low: 55, high: 85, unit: 'sqft' },
  'aadhunik-brown': { low: 65, high: 115, unit: 'sqft' },

  // ── 2. Marble Products (15 stones) ───────────────────────────
  'makrana-white': { low: 80, high: 1800, unit: 'sqft' },
  'nizarana-white': { low: 50, high: 120, unit: 'sqft' },
  'agariya-white': { low: 55, high: 150, unit: 'sqft' },
  'talai-marble': { low: 45, high: 90, unit: 'sqft' },
  'umraya-white': { low: 55, high: 120, unit: 'sqft' },
  'botticino': { low: 200, high: 450, unit: 'sqft' },
  'dyna-marble': { low: 180, high: 350, unit: 'sqft' },
  'perlato-marble': { low: 240, high: 380, unit: 'sqft' },
  'michelangelo-marble': { low: 400, high: 1200, unit: 'sqft' },
  'travertine': { low: 260, high: 600, unit: 'sqft' },
  'statuario': { low: 500, high: 3500, unit: 'sqft' },
  'honey-onyx': { low: 450, high: 1800, unit: 'sqft' },
  'golden-lisa': { low: 250, high: 420, unit: 'sqft' },
  'emperador': { low: 420, high: 750, unit: 'sqft' },
  'vietnam-white': { low: 320, high: 850, unit: 'sqft' },

  // ── 3. Collections Products (43 stones) ───────────────────────
  // A. Imported & Exotics
  'carrara-white-marble': { low: 250, high: 900, unit: 'sqft' },
  'calacatta-gold-marble': { low: 600, high: 3000, unit: 'sqft' },
  'statuario-luxe-marble': { low: 600, high: 3500, unit: 'sqft' },
  'absolute-black-granite': { low: 120, high: 220, unit: 'sqft' },
  'jade-green-onyx': { low: 700, high: 1800, unit: 'sqft' },
  'volakas-white-marble': { low: 320, high: 550, unit: 'sqft' },
  'rainforest-brown-marble': { low: 110, high: 220, unit: 'sqft' },

  // B. Sandstone
  'english-teak-sandstone': { low: 45, high: 110, unit: 'sqft' },
  'mp-beige-sandstone': { low: 40, high: 95, unit: 'sqft' },
  'woodland-buff-sandstone': { low: 45, high: 105, unit: 'sqft' },
  'leheriya-sandstone': { low: 50, high: 115, unit: 'sqft' },
  'raveena-sandstone': { low: 45, high: 105, unit: 'sqft' },
  'kandla-grey-sandstone': { low: 50, high: 100, unit: 'sqft' },
  'autumn-brown-sandstone': { low: 45, high: 105, unit: 'sqft' },
  'raj-green-sandstone': { low: 45, high: 110, unit: 'sqft' },
  'kahareda-brown-sandstone': { low: 48, high: 115, unit: 'sqft' },
  'red-teak-sandstone': { low: 50, high: 120, unit: 'sqft' },
  'bansi-pink-sandstone': { low: 45, high: 115, unit: 'sqft' },
  'ebony-green-sandstone': { low: 50, high: 115, unit: 'sqft' },
  'gwalior-mint-sandstone': { low: 55, high: 130, unit: 'sqft' },
  'bansi-paharpur-sandstone': { low: 65, high: 160, unit: 'sqft' },
  'ganj-basoda-sandstone': { low: 45, high: 105, unit: 'sqft' },
  'khatu-teak-sandstone': { low: 55, high: 125, unit: 'sqft' },
  'balesar-sandstone': { low: 45, high: 105, unit: 'sqft' },
  'jodhpur-sandstone': { low: 35, high: 90, unit: 'sqft' },

  // C. Limestone
  'jaisalmer-yellow-limestone': { low: 45, high: 110, unit: 'sqft' },
  'ita-gold-limestone': { low: 45, high: 110, unit: 'sqft' },
  'kadappa-limestone': { low: 30, high: 65, unit: 'sqft' },

  // D. Slate
  'monsoon-slate': { low: 35, high: 80, unit: 'sqft' },
  'sangarwas-slate': { low: 35, high: 80, unit: 'sqft' },
  'silver-gray-slate': { low: 38, high: 85, unit: 'sqft' },
  'matrix-slate': { low: 40, high: 90, unit: 'sqft' },
  'raymond-slate': { low: 35, high: 80, unit: 'sqft' },
  'himachal-slate': { low: 40, high: 95, unit: 'sqft' },
  'marine-soapstone': { low: 45, high: 105, unit: 'sqft' },

  // E. Porphyry & Quartzite
  'multi-porphyry': { low: 110, high: 220, unit: 'sqft' },
  'black-porphyry': { low: 120, high: 240, unit: 'sqft' },
  'kandla-lining-quartzite': { low: 95, high: 220, unit: 'sqft' },
  'roma-grey-quartzite': { low: 110, high: 260, unit: 'sqft' },
  'sea-shell-quartzite': { low: 120, high: 280, unit: 'sqft' },
  'kandla-quartzite': { low: 95, high: 220, unit: 'sqft' },
  'woodland-quartzite': { low: 110, high: 260, unit: 'sqft' },
  'bansi-pink-quartzite': { low: 120, high: 280, unit: 'sqft' },
};

/**
 * Returns the verified price range for any stone by slug.
 * Falls back to an estimated material category default if not explicitly listed.
 */
export function getProductPrice(slug: string, fallbackType: string = 'granite'): ProductPriceRange {
  if (PRODUCT_PRICES[slug]) {
    return PRODUCT_PRICES[slug];
  }

  // Suffix/prefix tolerance (e.g. 'carrara-white' vs 'carrara-white-marble')
  for (const [k, v] of Object.entries(PRODUCT_PRICES)) {
    const cleanK = k.replace(/-(?:granite|marble|sandstone|limestone|slate|quartzite)$/, '');
    const cleanSlug = slug.replace(/-(?:granite|marble|sandstone|limestone|slate|quartzite)$/, '');
    if (cleanK === cleanSlug) return v;
  }

  if (fallbackType === 'marble' || fallbackType === 'imported-marble') {
    return { low: 80, high: 450, unit: 'sqft' };
  }
  if (fallbackType === 'sandstone') {
    return { low: 45, high: 110, unit: 'sqft' };
  }
  if (fallbackType === 'limestone') {
    return { low: 40, high: 95, unit: 'sqft' };
  }
  if (fallbackType === 'slate') {
    return { low: 35, high: 85, unit: 'sqft' };
  }
  if (fallbackType === 'quartzite') {
    return { low: 95, high: 250, unit: 'sqft' };
  }
  if (fallbackType === 'onyx') {
    return { low: 650, high: 2200, unit: 'sqft' };
  }

  return { low: 55, high: 140, unit: 'sqft' };
}

