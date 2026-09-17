import { HeroSlide, StatItem } from '../types';

/**
 * Homepage hero.
 *
 * ⚠️ Slide 1 supplies the homepage <h1>. The slider rotates the headline every
 * 5.5s, but only the first slide is present in the server-rendered HTML, so
 * slide 1's `title` is the H1 Google reads and weighs.
 *
 * It used to be "Where Stone Meets Timeless Elegance" — no product, no
 * material, no place. The <title> tag was meanwhile targeting "Premium Marble &
 * Granite Kishangarh", so the page's two strongest on-page signals were pointing
 * at different things. The brand line now runs as the sub, where it still opens
 * the page, and the H1 carries what the page is actually about.
 *
 * Keep the primary keyword in slide 1 if these are ever reordered.
 */
export const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero/granite-gallery-premium-granite-collection.webp',
    title: 'Premium Marble & Granite from Kishangarh',
    sub: "Where stone meets timeless elegance — exporters of the world's finest marble and natural stone.",
    eyebrow: 'Kishangarh, Rajasthan',
    alt: 'Polished premium granite slabs displayed at the Granite Gallery facility in Kishangarh, Rajasthan',
  },
  {
    image: '/images/hero/granite-gallery-natural-stone-masterpiece.webp',
    title: 'Transforming Spaces Into Masterpieces',
    sub: 'Trusted by architects, designers & builders across 30+ countries.',
    alt: 'Luxury interior finished in natural stone, showing book-matched marble wall cladding and stone flooring',
  },
  {
    image: '/images/hero/granite-gallery-marble-granite-sandstone.webp',
    title: 'Marble, Granite & Sandstone',
    sub: 'One trusted supplier for every natural stone your project demands.',
    alt: 'Marble, granite and sandstone slabs racked side by side for selection at the Kishangarh yard',
  },
  {
    image: '/images/hero/granite-gallery-natural-stone-export.webp',
    title: 'Export Quality, Delivered Worldwide',
    sub: 'Premium Indian and imported stone shipped to over 30 countries.',
    alt: 'Crated natural stone slabs prepared for export container loading at Granite Gallery, Kishangarh',
  }
];

export const trustStats: StatItem[] = [
  { value: 10, suffix: '+', label: 'Countries Exported' },
  { value: 100, suffix: '+', label: 'Projects Delivered' },
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 150, suffix: '+', label: 'Stone Varieties' },
  { value: 400, suffix: '+', label: 'Architects Served' },
  { value: 15, suffix: '+', label: 'Exotic Stones' }
].map(s => ({
  number: s.value + s.suffix,
  label: s.label
}));

export const marqueeItems = [
  'Granite Gallery Collection', 'Premium Exotic Quartzite', 'Italian Statuario Marble',
  'Crafted Slabs & Tiles', 'Architectural Stone Projects', 'Curated Global Sourcing',
  'Mirror-Finished Onyx', 'Granite Gallery Collection', 'Premium Exotic Quartzite',
  'Italian Statuario Marble', 'Crafted Slabs & Tiles', 'Architectural Stone Projects',
  'Curated Global Sourcing', 'Mirror-Finished Onyx'
];
