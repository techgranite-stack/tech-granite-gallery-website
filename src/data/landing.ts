import { HeroSlide, StatItem } from '../types';

export const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero/granite-gallery-premium-granite-collection.webp',
    title: 'Where Stone Meets Timeless Elegance',
    sub: "Exporters of the world's finest marble and natural stone."
  },
  {
    image: '/images/hero/granite-gallery-natural-stone-masterpiece.webp',
    title: 'Transforming Spaces Into Masterpieces',
    sub: 'Trusted by architects, designers & builders across 30+ countries.'
  },
  {
    image: '/images/hero/granite-gallery-marble-granite-sandstone.webp',
    title: 'Marble, Granite & Sandstone',
    sub: 'One trusted supplier for every natural stone your project demands.'
  },
  {
    image: '/images/hero/granite-gallery-natural-stone-export.webp',
    title: 'Export Quality, Delivered Worldwide',
    sub: 'Premium Indian and imported stone shipped to over 30 countries.'
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
