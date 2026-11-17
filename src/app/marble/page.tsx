import type { Metadata } from 'next';
import HeroSlider from '@/components/sections/HeroSlider';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import StoneListingSection from '@/components/sections/StoneListingSection';
import HorizontalScrollGallery from '@/components/sections/HorizontalScrollGallery';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import GoogleReviews from '@/components/sections/GoogleReviews';
import ProcessSteps from '@/components/sections/ProcessSteps';
import BannerContactForm from '@/components/sections/BannerContactForm';
import { getAllMarble } from '@/data/stone-index';
import { fromStoneProduct } from '@/lib/listing-item';
import { testimonials } from '@/data/testimonials';
import { categories } from '@/data/categories';
import type { FilterGroup } from '@/components/sections/StoneListingSection';
import { pageSeo } from '@/data/page-seo';
import type { HeroSlide, StatItem } from '@/types';
import { buildMetadata } from '@/lib/seo';

const seo = pageSeo['/marble'];

export const metadata: Metadata = buildMetadata({
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  canonical: '/marble',
  image: seo.ogImage,
});

const marbleSlides: HeroSlide[] = [
  {
    image: '/images/stones/statuario/statuario_stand.webp',
    title: 'Statuario Luxe White Marble',
    sub: 'Pure white Italian marble with dramatic grey veining — the pinnacle of luxury flooring.',
  },
  {
    image: '/images/stones/botticino/botticino_stand.webp',
    title: 'Classic Botticino Beige Marble',
    sub: 'Warm cream tones with delicate webbed veining — ideal for timeless elegant spaces.',
  },
  {
    image: '/images/stones/emperador/emperador_stand.webp',
    title: 'Dark & Light Emperador Marble',
    sub: 'Rich dark chocolate hues with light crystal veining — sophisticated interior accents.',
  },
  {
    image: '/images/stones/honey-onyx/honey-onyx_stand.webp',
    title: 'Translucent Honey Onyx Marble',
    sub: 'Luminous golden-yellow tones that illuminate back-lit feature walls and vanity tops.',
  },
  {
    image: '/images/stones/travertine/travertine_stand.webp',
    title: 'Natural Beige Travertine Marble',
    sub: 'Earth-toned porous beauty — classic architectural stone for luxury walls and floors.',
  },
  {
    image: '/images/stones/makrana-white/makrana-white_stand.webp',
    title: 'Historic Makrana Pure White Marble',
    sub: 'The iconic Indian marble used in the Taj Mahal — legendary durability and brilliance.',
  },
];

const marbleStats: StatItem[] = [
  { number: '15', label: 'Marble Varieties' },
  { number: '4', label: 'Origins' },
  { number: '8+', label: 'Surface Finishes' },
  { number: '10+', label: 'Countries Shipped' },
  { number: '100+', label: 'Projects Completed' },
  { number: '20+', label: 'Years Experience' },
];

const FILTERS: FilterGroup[] = [
  {
    key: 'type',
    label: 'Type',
    options: [
      { value: 'marble', label: 'Indian Marble' },
      { value: 'imported-marble', label: 'Imported Marble' },
    ],
  },
  {
    key: 'color',
    label: 'Color',
    display: 'swatch',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'grey', label: 'Grey' },
      { value: 'brown', label: 'Brown' },
      { value: 'yellow', label: 'Yellow / Gold' },
    ],
  },
];

export default function MarblePage() {
  const products = getAllMarble().map(fromStoneProduct);

  // All categories except marble variants → shown as "Explore other collections"
  const otherCollections = categories
    .filter(c => c.id !== 'marble' && c.id !== 'imported')
    .map(c => ({
      title: c.title,
      category: c.desc,
      image: c.image,
      size: c.tag,
      href: c.href ?? `/collections/${c.id}`,
    }));

  return (
    <>
      <HeroSlider slides={marbleSlides} />
      <StatsBand stats={marbleStats} />
      <ScrollingTagline items={['Direct from Quarry', 'Indian & Imported Marble', 'Polished · Honed · Antique', 'Ships to 30+ Countries', 'Premium Quality', 'Kishangarh, Rajasthan']} />
      <StoneListingSection
        products={products}
        filters={FILTERS}
        heading="All Marble"
      />
      <HorizontalScrollGallery
        projects={otherCollections}
        eyebrow="Explore More"
        title={<>Other <em>Collections</em></>}
        desc="Granite, quartzite, sandstone and more — browse our full range of natural stones."
        btnLabel="Explore Collection"
      />
      <MarqueeTestimonials testimonials={testimonials} />
      <GoogleReviews />
      <ProcessSteps />
      <BannerContactForm />
    </>
  );
}
