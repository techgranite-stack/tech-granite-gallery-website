import { allMarble } from './marble-products';
import { graniteProducts } from './granite-products';
import type { StoneProduct, ColorFamily, StoneCategory } from '@/types/stone';

export type { StoneProduct, ColorFamily, StoneCategory };

/** Every stone in the catalogue */
export const allStones: StoneProduct[] = [...allMarble, ...graniteProducts];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): StoneProduct | undefined {
  return allStones.find((s) => s.slug === slug);
}

export function getProductsByCategory(category: StoneCategory): StoneProduct[] {
  return allStones.filter((s) => s.category === category);
}

/** Returns all marble (domestic + imported) */
export function getAllMarble(): StoneProduct[] {
  return allStones.filter((s) => s.category !== 'granite');
}

export function getAllGranite(): StoneProduct[] {
  return allStones.filter((s) => s.category === 'granite');
}

export function getProductsByColor(color: ColorFamily): StoneProduct[] {
  return allStones.filter((s) => s.colorFamily.includes(color));
}

export function getFeaturedProducts(): StoneProduct[] {
  return allStones.filter((s) => s.featured);
}

/** Products with the same primary colour family */
export function getRelatedByColor(product: StoneProduct, limit = 4): StoneProduct[] {
  const primary = product.colorFamily[0];
  return allStones
    .filter((s) => s.slug !== product.slug && s.colorFamily.includes(primary))
    .slice(0, limit);
}

/** Products in the same category */
export function getRelatedByCategory(product: StoneProduct, limit = 4): StoneProduct[] {
  return allStones
    .filter((s) => s.slug !== product.slug && s.category === product.category)
    .slice(0, limit);
}

// ─── Slug maps (for Next.js generateStaticParams) ────────────────────────────

/** All slugs for /marble/[slug] */
export function getAllMarbleSlugs(): string[] {
  return getAllMarble().map((s) => s.slug);
}

/** All slugs for /granite/[slug] */
export function getAllGraniteSlugs(): string[] {
  return getAllGranite().map((s) => s.slug);
}

// ─── Color SEO page data ──────────────────────────────────────────────────────

export const colorPages: {
  color: ColorFamily;
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
}[] = [
  {
    color: 'white',
    slug: 'white-marble',
    title: 'White Marble & Granite Collection',
    description: 'Explore our full range of white natural stones — from pure Makrana White marble to premium imported Vietnam White and P White granite. Perfect for luxury flooring, bathrooms, and kitchen countertops.',
    metaTitle: 'White Marble Collection | Granite Gallery',
    metaDescription: 'Buy premium white marble & granite — Makrana White, Vietnam White, Statuario & P White. Direct supply from Kishangarh. Polished, honed & antique finishes.',
    keywords: ['white marble india', 'makrana white marble', 'white granite', 'buy white stone kishangarh', 'vietnam white marble', 'white marble flooring'],
  },
  {
    color: 'black',
    slug: 'black-granite',
    title: 'Black Granite Collection',
    description: 'Discover India\'s finest black granites — Black Galaxy, Majestic Black, Telephone Black, and more. Premium quality for kitchen countertops, flooring, and architectural cladding.',
    metaTitle: 'Black Granite Collection | Granite Gallery',
    metaDescription: 'India\'s finest black granites — Black Galaxy, Majestic Black, Telephone Black. Mirror polish for kitchen countertops & flooring. Export quality from Kishangarh.',
    keywords: ['black granite india', 'black galaxy granite', 'majestic black granite', 'absolute black granite', 'black kitchen countertop stone', 'black granite price'],
  },
  {
    color: 'grey',
    slug: 'grey-granite',
    title: 'Grey Granite & Stone Collection',
    description: 'Explore our range of grey natural stones — from pale Cera Grey and soft Narlai Grey to bold Steel Grey and Kandla Grey. Versatile neutrals for contemporary interiors and outdoor paving.',
    metaTitle: 'Grey Granite Collection | Granite Gallery',
    metaDescription: 'Premium grey granite — Steel Grey, Cera Grey, Kandla Grey & Narlai Grey. Ideal for flooring, outdoor paving & contemporary interiors. Direct from Kishangarh.',
    keywords: ['grey granite india', 'steel grey granite', 'kandla grey paving', 'cera grey granite', 'light grey granite flooring', 'grey stone outdoor paving'],
  },
  {
    color: 'pink',
    slug: 'pink-granite',
    title: 'Pink Granite Collection',
    description: 'Unique and rare pink granite stones including Rosy Pink and Cheema Pink from Rajasthan. Perfect for luxury bathrooms, bedrooms, and boutique hospitality interiors.',
    metaTitle: 'Pink Granite Collection | Granite Gallery',
    metaDescription: 'Rare pink granite — Rosy Pink & Cheema Pink from Rajasthan. Polished & honed finishes for luxury bathrooms, bedrooms & hospitality interiors.',
    keywords: ['pink granite india', 'rosy pink granite', 'cheema pink granite', 'pink granite rajasthan', 'rose granite flooring', 'pink stone bathroom'],
  },
  {
    color: 'red',
    slug: 'red-granite',
    title: 'Red Granite Collection',
    description: 'Bold red granites including Himalayan Red, Lakha Red, Jhansi Red, and Classic Red. Ideal for exterior cladding, monumental buildings, and heritage architecture.',
    metaTitle: 'Red Granite Collection | Granite Gallery',
    metaDescription: 'Bold red granite — Himalayan Red, Lakha Red, Jhansi Red. UV-stable colour for exterior cladding, monuments & heritage buildings. Export from Kishangarh.',
    keywords: ['red granite india', 'himalayan red granite', 'lakha red granite', 'red stone exterior cladding', 'jhansi red granite', 'red granite paving india'],
  },
  {
    color: 'green',
    slug: 'green-granite',
    title: 'Green Granite Collection',
    description: 'Rare green granites — Devda Green, Mokalsar Green, Apple Green, Hassan Green, and the prestigious Green Pearl. Statement stones for luxury countertops and feature walls.',
    metaTitle: 'Green Granite Collection | Granite Gallery',
    metaDescription: 'Rare green granite — Green Pearl, Hassan Green, Devda Green & Apple Green. Statement stones for luxury countertops & feature walls. Export from Kishangarh.',
    keywords: ['green granite india', 'green pearl granite', 'hassan green granite', 'devda green granite', 'forest green stone countertop', 'imported green granite'],
  },
  {
    color: 'brown',
    slug: 'brown-granite',
    title: 'Brown Granite & Stone Collection',
    description: 'Warm brown natural stones including Almond Brown, Tan Brown, Brazil Brown, and Emperador Marble. Perfect for kitchen countertops, flooring, and contemporary interiors.',
    metaTitle: 'Brown Granite Collection | Granite Gallery',
    metaDescription: 'Warm brown granite & stone — Tan Brown, Almond Brown, Brazil Brown & Emperador Marble. Perfect for kitchen countertops & flooring. Export from Kishangarh.',
    keywords: ['brown granite india', 'tan brown granite', 'almond brown granite', 'emperador marble', 'brown kitchen countertop stone', 'brown granite price india'],
  },
  {
    color: 'blue',
    slug: 'blue-granite',
    title: 'Blue Granite Collection',
    description: 'Exclusive blue granites including the prestigious Blue Pearl from Norway and Artic Blue from Rajasthan. Extraordinary stones for luxury kitchen islands and feature walls.',
    metaTitle: 'Blue Granite Collection | Granite Gallery',
    metaDescription: 'Exclusive blue granite — Blue Pearl from Norway and Artic Blue from Rajasthan. Iridescent luxury slabs for countertops & feature walls from Kishangarh.',
    keywords: ['blue granite india', 'blue pearl granite', 'norwegian granite india', 'artic blue granite', 'ice blue granite', 'blue kitchen countertop granite', 'luxury blue stone'],
  },
  {
    color: 'beige',
    slug: 'beige-marble',
    title: 'Beige & Cream Marble Collection',
    description: 'Classic beige and cream marbles including Botticino, Perlato, Golden Lisa, and Travertine. Timeless Italian and European stones for elegant flooring and wall cladding.',
    metaTitle: 'Beige Marble Collection | Granite Gallery',
    metaDescription: 'Classic beige marble — Botticino, Perlato Sicilia, Golden Lisa and Travertine. Premium Italian stone for flooring & wall cladding. Kishangarh stock.',
    keywords: ['beige marble india', 'botticino marble', 'perlato marble', 'travertine india', 'cream marble flooring', 'italian beige marble supplier india'],
  },
  {
    color: 'yellow',
    slug: 'yellow-granite',
    title: 'Yellow & Gold Stone Collection',
    description: 'Rare yellow and golden natural stones — Crystal Yellow Granite and Honey Onyx. Warm, luminous choices for kitchen countertops and backlit feature walls.',
    metaTitle: 'Yellow Granite & Gold Stone | Granite Gallery',
    metaDescription: 'Rare yellow & gold stones — Crystal Yellow Granite & Honey Onyx. Luminous warm tones for kitchen countertops & backlit feature walls. From Kishangarh.',
    keywords: ['yellow granite india', 'crystal yellow granite', 'honey onyx india', 'gold stone countertop', 'yellow stone flooring', 'backlit onyx india'],
  },
];

export function getColorPageBySlug(slug: string) {
  return colorPages.find((p) => p.slug === slug);
}

export function getColorPageByColor(color: ColorFamily) {
  return colorPages.find((p) => p.color === color);
}
