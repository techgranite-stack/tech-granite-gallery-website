import type { FAQItem } from '@/types';

export type StoneCategory = 'marble' | 'imported-marble' | 'granite';

export type ColorFamily =
  | 'white' | 'black' | 'grey' | 'pink' | 'red'
  | 'green' | 'brown' | 'blue' | 'yellow' | 'beige' | 'multi';

export type StoneTag = 'Bestseller' | 'Premium' | 'Rare' | 'Exclusive' | 'Classic' | 'New';

export interface StoneFinish {
  id: string;
  label: string;
  /** 2–4 room/slab images showing this finish */
  images: string[];
}

export interface StoneApplication {
  id: string;
  label: string;
  /** 2–3 images showing this stone in this application */
  images: string[];
}

export interface StoneSize {
  label: string;        // "18 × 18 in"
  dimensions: string;  // "457 × 457 mm"
}

export interface StoneSpecs {
  hardness?: string;            // "Mohs 3–4"
  density?: string;             // "2.65 g/cm³"
  waterAbsorption?: string;     // "< 0.2%"
  compressiveStrength?: string; // "80–120 MPa"
  porosity?: string;            // "Low" | "Medium"
  abrasionResistance?: string;  // "High"
  thickness?: string;           // "16–18 mm (standard slab)"
}

export interface StoneProduct {
  slug: string;
  name: string;
  /** Alternative trade names, e.g. ["Kotda"] for Majestic Black */
  altNames?: string[];
  category: StoneCategory;
  colorFamily: ColorFamily[];
  /** One-line marketing tagline */
  tagline: string;
  /** City/region of origin */
  origin: string;
  /** 2–3 sentence SEO description for the product page */
  description: string;

  /** 3–4 room/hall/kitchen implementation images (hero slider) */
  heroImages: string[];
  /** Single card image for listing & grid views */
  thumbnail: string;
  /** Full gallery images for horizontal scroll section */
  galleryImages: string[];

  specs: StoneSpecs;
  finishes: StoneFinish[];
  applications: StoneApplication[];
  sizes: StoneSize[];

  /** 3–5 highlight bullet points */
  highlights: string[];

  /* SEO — edit these in the data file to manage SEO independently */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Absolute OG image URL; falls back to heroImages[0] if omitted */
  ogImage?: string;

  /** Answer-engine (AEO) FAQ pairs — rendered as accordion + FAQPage schema */
  faqs?: FAQItem[];

  tag?: StoneTag;
  featured?: boolean;
  inStock?: boolean;
}

/** URL prefix derived from category */
export function categoryPath(category: StoneCategory): string {
  return category === 'granite' ? 'granite' : 'marble';
}

/** Full canonical path for a product */
export function productPath(product: Pick<StoneProduct, 'slug' | 'category'>): string {
  return `/${categoryPath(product.category)}/${product.slug}`;
}
