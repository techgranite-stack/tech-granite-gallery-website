import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import StoneListingSection from '@/components/sections/StoneListingSection';
import LocalDeliveryCorridor from '@/components/sections/LocalDeliveryCorridor';
import FAQAccordion from '@/components/sections/FAQAccordion';
import BannerContactForm from '@/components/sections/BannerContactForm';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import type { StoneProduct, ColorFamily } from '@/types/stone';
import { fromStoneProduct } from '@/lib/listing-item';
import { colorPages } from '@/data/stone-index';
import type { FilterOption, FilterGroup } from '@/components/sections/StoneListingSection';
import styles from './ColorStonePage.module.css';

const SWATCH_HEX: Record<ColorFamily, string> = {
  white: '#f5f5f0',
  black: '#1f1f1f',
  grey: '#9e9e9e',
  pink: '#e8a598',
  red: '#a93226',
  green: '#27ae60',
  brown: '#795548',
  blue: '#2980b9',
  yellow: '#f1c40f',
  beige: '#d7ccc8',
  multi: '#b0bec5',
};

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
  beige:  ['Timeless Italian Beige', 'Botticino · Perlato · Travertine', 'Classic Elegance', 'Imported Direct'],
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

  const colorFaqs = [
    {
      question: `What makes ${colorLabel.toLowerCase()} natural stone varieties popular in luxury architecture?`,
      answer: `${colorLabel} natural stone offers a timeless aesthetic versatile across contemporary, neoclassical, and minimalist interiors. Whether in subtle crystalline granites or deeply veined marbles, ${colorLabel.toLowerCase()} stones reflect light gracefully and pair seamlessly with wood, brass, and glass fixtures.`,
    },
    {
      question: `What are the bestselling ${colorLabel.toLowerCase()} granite and marble varieties available in Kishangarh?`,
      answer: `Our Kishangarh collection features prominent ${colorLabel.toLowerCase()} stones including ${products.slice(0, 4).map((p) => p.name).join(', ')}${products.length > 4 ? ', and more' : ''}. Each variety is available in bookmatched pairs and full gangsaw lots.`,
    },
    {
      question: `How do I prevent staining and maintain ${colorLabel.toLowerCase()} stone surfaces?`,
      answer: `We recommend applying a high-grade penetrating impregnating sealer right after installation. Clean regularly with neutral pH stone cleaners and avoid harsh acidic detergents (such as vinegar or bleach) to preserve the stone's natural crystal matrix.`,
    },
    {
      question: `What is the price range for ${colorLabel.toLowerCase()} natural stone ex-factory Kishangarh?`,
      answer: `Wholesale ex-factory rates in Kishangarh typically range from ₹55 to ₹135/sq ft for commercial to standard gangsaw granite, and ₹140 to ₹380+/sq ft for premium imported or exotic ${colorLabel.toLowerCase()} marble varieties, depending on lot purity and slab thickness.`,
    },
    {
      question: `Can I inspect and reserve specific ${colorLabel.toLowerCase()} slab lots before shipment?`,
      answer: `Yes. You can visit our Kishangarh yard on the MEGA Highway for hands-on slab selection, or book lots remotely via 4K live video walkthroughs, dry-lay lot photos, and caliper thickness measurements before dispatch.`,
    },
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

      <section className={styles.relatedColorsSection}>
        <div className={styles.relatedColorsInner}>
          <span className={styles.relatedColorsEyebrow}>Palette Variety</span>
          <h2 className={styles.relatedColorsTitle}>Explore Other Stone Colors</h2>
          <div className={styles.colorsGrid}>
            {colorPages
              .filter((cp) => cp.slug !== data.slug)
              .map((cp) => (
                <Link key={cp.slug} href={`/${cp.slug}`} className={styles.colorCard}>
                  <span
                    className={styles.colorSwatch}
                    style={{ backgroundColor: SWATCH_HEX[cp.color] || '#ccc' }}
                  />
                  <span>{cp.title.replace(/ Collection$/, '')}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <FAQAccordion
        items={colorFaqs}
        eyebrow="FAQ"
        title={`${colorLabel} Stone`}
        titleEm="Frequently Asked Questions"
        description={`Expert answers on pricing, finishes, maintenance, and factory-direct dispatch for ${colorLabel.toLowerCase()} granite and marble slabs from Kishangarh.`}
      />

      <ScrollingTagline items={taglineItems} />

      <BannerContactForm hideBanner />

      {/* Direct Factory Dispatch & Delivery Corridors — in the bottom just before the footer */}
      <LocalDeliveryCorridor />
    </>
  );
}
