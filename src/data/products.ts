import { ProductItem } from '../types';

export interface ExtendedProductItem extends ProductItem {
  finish: string;
  origin: string;
  tag?: string;
}

export const products: ExtendedProductItem[] = [
  {
    id: 'statuario',
    title: 'Statuario',
    category: 'italian-marble',
    finish: 'Mirror Polished',
    origin: 'Carrara, Tuscany, Italy',
    image: '/images/stones/statuario/statuario_catalog.webp',
    tag: 'Bestseller'
  },
  {
    id: 'artic-blue',
    title: 'Artic Blue',
    category: 'granite',
    finish: 'Polished',
    origin: 'Rajasthan, India',
    image: '/images/stones/artic-blue/artic-blue_catalog.webp',
    tag: 'Rare'
  },
  {
    id: 'english-teak',
    title: 'English Teak',
    category: 'sandstone',
    finish: 'Natural',
    origin: 'Nagaur, Rajasthan',
    image: '/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_catalog.webp',
    tag: 'Heritage'
  },
  {
    id: 'michelangelo',
    title: 'Michelangelo',
    category: 'imported-marble',
    finish: 'Polished',
    origin: 'Afyon, Turkey',
    image: '/images/stones/michelangelo-marble/michelangelo-marble_catalog.webp',
    tag: 'Premium'
  },
  {
    id: 'kandla-grey',
    title: 'Kandla Grey',
    category: 'sandstone',
    finish: 'Natural',
    origin: 'Rajasthan',
    image: '/images/collections/sandstone/kandla-grey-sandstone/kandla-grey-sandstone_catalog.webp',
    tag: 'Bestseller'
  },
  {
    id: 'cera-grey',
    title: 'Cera Grey',
    category: 'granite',
    finish: 'Polished',
    origin: 'Rajasthan, India',
    image: '/images/stones/cera-grey/cera-grey_catalog.webp',
    tag: 'Durable'
  },
  {
    id: 'vietnam-white',
    title: 'Vietnam White',
    category: 'imported-marble',
    finish: 'Polished',
    origin: 'Nghe An, Vietnam',
    image: '/images/stones/vietnam-white/vietnam-white_catalog.webp',
    tag: 'Premium'
  },
  {
    id: 'red-teak',
    title: 'Red Teak',
    category: 'sandstone',
    finish: 'Natural',
    origin: 'Rajasthan',
    image: '/images/collections/sandstone/red-teak-sandstone/red-teak-sandstone_catalog.webp',
    tag: 'Heritage'
  },
  {
    id: 'travertine',
    title: 'Travertine',
    category: 'italian-marble',
    finish: 'Honed & Filled',
    origin: 'Tivoli, Lazio, Italy',
    image: '/images/stones/travertine/travertine_catalog.webp',
    tag: 'Classic'
  },
  {
    id: 'woodland-buff',
    title: 'Woodland Buff',
    category: 'sandstone',
    finish: 'Natural',
    origin: 'Rajasthan',
    image: '/images/collections/sandstone/woodland-buff-sandstone/woodland-buff-sandstone_catalog.webp',
    tag: 'Rustic'
  },
  {
    id: 'jodhpur-sandstone',
    title: 'Jodhpur Sandstone',
    category: 'sandstone',
    finish: 'Natural',
    origin: 'Jodhpur, Rajasthan',
    image: '/images/collections/sandstone/jodhpur-sandstone/jodhpur-sandstone_catalog.webp',
    tag: 'Heritage'
  }
];
