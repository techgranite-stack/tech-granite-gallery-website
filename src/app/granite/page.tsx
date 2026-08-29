import type { Metadata } from 'next';
import HeroSlider from '@/components/sections/HeroSlider';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import StoneListingSection from '@/components/sections/StoneListingSection';
import HorizontalScrollGallery from '@/components/sections/HorizontalScrollGallery';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import BannerContactForm from '@/components/sections/BannerContactForm';
import { getAllGranite } from '@/data/stone-index';
import { fromStoneProduct } from '@/lib/listing-item';
import { testimonials } from '@/data/testimonials';
import { categories } from '@/data/categories';
import type { FilterGroup } from '@/components/sections/StoneListingSection';
import { pageSeo } from '@/data/page-seo';
import type { HeroSlide, StatItem } from '@/types';

const seo = pageSeo['/granite'];

export const metadata: Metadata = {
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  alternates: { canonical: '/granite' },
  openGraph: {
    title: seo.metaTitle,
    description: seo.metaDescription,
    ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
  },
};

const graniteSlides: HeroSlide[] = [
  {
    image: '/images/stones/black-galaxy/black-galaxy_stand.webp',
    title: 'Black Galaxy Premium Granite',
    sub: 'Deep black surface studded with golden metallic flakes — timeless elegance for countertops & floors.',
  },
  {
    image: '/images/stones/p-white/p-white_stand.webp',
    title: 'Platinum White Granite',
    sub: 'Luminous white base with fine grey & black mineral specks — versatile and highly durable.',
  },
  {
    image: '/images/stones/tan-brown/tan-brown_stand.webp',
    title: 'Rich Tan Brown Granite',
    sub: 'Warm chocolate and reddish-brown crystal clusters — perfect for kitchen counters and facades.',
  },
  {
    image: '/images/stones/blue-pearl/blue-pearl_stand.webp',
    title: 'Iridescent Blue Pearl Granite',
    sub: 'Exotic imported Norwegian granite featuring shimmery blue labradorite crystals.',
  },
  {
    image: '/images/stones/lakha-red/lakha-red_stand.webp',
    title: 'Royal Lakha Red Granite',
    sub: 'Vibrant ruby-red granite from Rajasthan — striking statement stone for heritage architectures.',
  },
  {
    image: '/images/stones/apple-green/apple-green_stand.webp',
    title: 'Fresh Apple Green Granite',
    sub: 'Unique green tones with natural grey & black speckles — earthy and soothing aesthetic.',
  },
];

const graniteStats: StatItem[] = [
  { number: '40+', label: 'Granite Varieties' },
  { number: '9', label: 'Colour Families' },
  { number: '8+', label: 'Surface Finishes' },
  { number: '10+', label: 'Countries Shipped' },
  { number: '100+', label: 'Projects Completed' },
  { number: '20+', label: 'Years Experience' },
];

const FILTERS: FilterGroup[] = [
  {
    key: 'color',
    label: 'Color',
    display: 'swatch',
    options: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'grey', label: 'Grey' },
      { value: 'pink', label: 'Pink' },
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'brown', label: 'Brown' },
      { value: 'blue', label: 'Blue' },
      { value: 'yellow', label: 'Yellow' },
    ],
  },
];

export default function GranitePage() {
  const products = getAllGranite().map(fromStoneProduct);

  // All categories except granite → shown as "Explore other collections"
  const otherCollections = categories
    .filter(c => c.id !== 'granite')
    .map(c => ({
      title: c.title,
      category: c.desc,
      image: c.image,
      size: c.tag,
      href: c.href ?? `/collections/${c.id}`,
    }));

  return (
    <>
      <HeroSlider slides={graniteSlides} />
      <StatsBand stats={graniteStats} />
      <ScrollingTagline items={['40+ Granite Varieties', 'Indian & Imported', 'Polished · Honed · Flamed · Leather', 'Ships to 30+ Countries', 'Premium Quality', 'Kishangarh, Rajasthan']} />
      <StoneListingSection
        products={products}
        filters={FILTERS}
        heading="All Granite"
      />
      <HorizontalScrollGallery
        projects={otherCollections}
        eyebrow="Explore More"
        title={<>Other <em>Collections</em></>}
        desc="Marble, quartzite, sandstone and more — browse our full range of natural stones."
        btnLabel="Explore Collection"
      />
      <MarqueeTestimonials testimonials={testimonials} />
      <BannerContactForm />
    </>
  );
}
