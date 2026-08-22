import PageHero from '@/components/sections/PageHero';
import StoneListingSection from '@/components/sections/StoneListingSection';
import BannerContactForm from '@/components/sections/BannerContactForm';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import type { StoneProduct, ColorFamily } from '@/types/stone';
import { fromStoneProduct } from '@/lib/listing-item';
import type { FilterOption, FilterGroup } from '@/components/sections/StoneListingSection';

interface ColorPageData {
  color: ColorFamily;
  slug: string;
  title: string;
  description: string;
}

interface ColorStonePageProps {
  data: ColorPageData;
  products: StoneProduct[];
}

// ── Per-color hero images ─────────────────────────────────────────────────────
const COLOR_HERO_IMAGES: Record<ColorFamily, string[]> = {
  white: [
    '/images/stones/statuario/statuario_stand.webp',
    '/images/applications/flooring/flooring-stone-wall.webp',
  ],
  black: [
    '/images/stones/black-galaxy/black-galaxy_stand.webp',
    '/images/applications/flooring/r-black-flooring-wall.webp',
  ],
  grey: [
    '/images/collections/quartzite/roma-grey-quartzite/roma-grey-quartzite_stand.webp',
    '/images/applications/flooring/flooring-stone-wall-3.webp',
  ],
  pink: [
    '/images/applications/flooring/pink-granite-flooring-wall.webp',
  ],
  red: [
    '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
  ],
  green: [
    '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
  ],
  brown: [
    '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
  ],
  blue: [
    '/images/stones/blue-pearl/blue-pearl_stand.webp',
  ],
  yellow: [
    '/images/collections/limestone/jaisalmer-yellow-limestone/jaisalmer-yellow-limestone_stand.webp',
  ],
  beige: [
    '/images/applications/exterior-cladding/beige-textured-stone-external-cladding-wall.webp',
  ],
  multi: [
    '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
  ],
};

// Color-family → which category sub-filters to offer
function getSubFilters(products: StoneProduct[]) {
  const cats = Array.from(new Set(products.map((p) => p.category)));
  if (cats.length <= 1) return undefined;
  return cats.map((c) => ({
    value: c,
    label: c === 'imported-marble' ? 'Imported Marble' : c === 'marble' ? 'Indian Marble' : 'Granite',
  }));
}

const COLOR_TAGLINE_WORDS: Record<ColorFamily, string[]> = {
  white:  ['Purest White Stones', 'Makrana · Vietnam · Statuario', 'Polished & Honed', 'Ships Worldwide'],
  black:  ['Absolute Black', 'Black Galaxy · Majestic Black', 'Mirror Polish', 'Direct from Quarry'],
  grey:   ['Subtle & Sophisticated', 'Steel Grey · Cera Grey · Kandla', 'Honed & Flamed Options', 'Outdoor & Indoor Use'],
  pink:   ['Rare Rose Granite', 'Rosy Pink · Cheema Pink', 'Unique Pastel Tones', 'From Rajasthan'],
  red:    ['Bold Statement Red', 'Himalayan · Lakha · Jhansi', 'UV Stable', 'Monuments & Exteriors'],
  green:  ['Forest & Jade Greens', 'Devda · Hassan · Green Pearl', 'Rare Colours', 'Statement Countertops'],
  brown:  ['Warm Earthy Browns', 'Tan Brown · Almond · Emperador', 'Kitchen Favourite', 'Export Quality'],
  blue:   ['Electric Blue Stones', 'Blue Pearl · Artic Blue', 'Norwegian Labradorite', 'Luxury Countertops'],
  yellow: ['Warm Golden Tones', 'Crystal Yellow · Honey Onyx', 'Backlit Options Available', 'Rare & Luminous'],
  beige:  ['Timeless Italian Beige', 'Bottincino · Perlato · Travertine', 'Classic Elegance', 'Imported Direct'],
  multi:  ['Multicolour Stones', 'Unique Patterns', 'Every Slab Different', 'Premium Stock'],
};

const COLOR_FILTER_LIST: FilterOption[] = [
  { value: 'white',  label: 'White' },
  { value: 'black',  label: 'Black' },
  { value: 'grey',   label: 'Grey' },
  { value: 'pink',   label: 'Pink' },
  { value: 'red',    label: 'Red' },
  { value: 'green',  label: 'Green' },
  { value: 'brown',  label: 'Brown' },
  { value: 'blue',   label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'beige',  label: 'Beige' },
];

export default function ColorStonePage({ data, products }: ColorStonePageProps) {
  const heroImages = COLOR_HERO_IMAGES[data.color] ?? COLOR_HERO_IMAGES.white;
  const taglineItems = COLOR_TAGLINE_WORDS[data.color] ?? ['Premium Stones', 'Kishangarh', 'Ships Worldwide'];
  const subFilters = getSubFilters(products);
  const colorLabel = data.color.charAt(0).toUpperCase() + data.color.slice(1);

  const filters: FilterGroup[] = [
    ...(subFilters ? [{ key: 'type', label: 'Type', options: subFilters }] : []),
    { key: 'color', label: 'Color', display: 'swatch' as const, options: COLOR_FILTER_LIST },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${colorLabel} Stones`}
        title={data.title.replace(/ Collection$/, '')}
        titleEm="Collection"
        subtitle={data.description}
        heroImages={heroImages}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: `${colorLabel} Stones` },
        ]}
        badges={[
          { value: String(products.length), label: 'Varieties' },
          { value: colorLabel, label: 'Color Family' },
          { value: '5', label: 'Finishes' },
          { value: '30+', label: 'Countries Shipped' },
        ]}
      />

      <StoneListingSection
        products={products.map(fromStoneProduct)}
        filters={filters}
        heading={`${colorLabel} Stone Collection`}
      />

      <ScrollingTagline items={taglineItems} />

      <BannerContactForm hideBanner />
    </>
  );
}
