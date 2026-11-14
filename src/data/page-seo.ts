/**
 * SEO metadata for every static / listing page.
 * Edit this file to update page titles, descriptions, and keywords without
 * touching any page.tsx component.
 *
 * Key: exact route path (e.g. '/marble', '/')
 */
import type { SeoMeta } from '@/types/seo';

export const pageSeo: Record<string, SeoMeta> = {

  '/': {
    metaTitle: 'Granite Gallery | Premium Marble & Granite Kishangarh',
    metaDescription: 'India\'s premier source for Italian marble, granite, onyx & exotic stones. Manufacturer & exporters from Kishangarh, Rajasthan. Get a free quote today.',
    keywords: [
      'granite gallery kishangarh',
      'marble supplier india',
      'italian marble india',
      'granite exporters rajasthan',
      'natural stone supplier kishangarh',
      'buy marble online india',
    ],
    ogImage: '/images/collections/showroom/marble-showroom-display-wall-kishangarh.webp',
  },

  '/marble': {
    metaTitle: 'Marble Collection | Indian & Imported Marble',
    metaDescription: 'Explore 15 premium marbles — Makrana White, Statuario, Botticino, Travertine & more. Indian & imported, polished & honed. Direct supply from Kishangarh.',
    keywords: [
      'marble collection india',
      'white marble kishangarh',
      'makrana white marble',
      'italian marble india',
      'imported marble price',
      'marble supplier rajasthan',
    ],
    ogImage: '/images/stones/statuario/statuario_stand.webp',
  },

  '/granite': {
    metaTitle: 'Granite Collection | 40+ Varieties | Granite Gallery',
    metaDescription: 'Browse 40+ granite varieties — Black Galaxy, Tan Brown, Blue Pearl, Steel Grey & more. Indian & imported granite, export quality. Direct from Kishangarh.',
    keywords: [
      'granite collection india',
      'black galaxy granite',
      'tan brown granite',
      'granite supplier kishangarh',
      'buy granite india',
      'granite kitchen countertop india',
    ],
    ogImage: '/images/stones/black-galaxy/black-galaxy_stand.webp',
  },

  '/collections': {
    metaTitle: 'Stone Collections | Marble, Granite & Onyx',
    metaDescription: 'Browse Granite Gallery\'s full stone catalogue — Italian marble, Indian granite, onyx & exotic stones. Premium quality, global export from Kishangarh.',
    keywords: [
      'natural stone collection india',
      'marble granite catalogue',
      'exotic stone india',
      'onyx stone supplier',
      'premium stone kishangarh',
    ],
    ogImage: '/images/collections/showroom/granite-showroom-display-wall-kishangarh.webp',
  },

  '/finishes': {
    metaTitle: 'Stone Finishes | Polished, Honed, Flamed & More',
    metaDescription: 'Explore 8 surface finishes for marble & granite — polished, honed, flamed, leathered, bush hammered & more. Expert advice from Granite Gallery, Kishangarh.',
    keywords: [
      'stone finish types',
      'polished marble finish',
      'flamed granite finish',
      'honed stone surface',
      'leathered granite',
      'natural stone finishes india',
    ],
    ogImage: '/images/finishes/finishes-showroom-display-wall-kishangarh.webp',
  },

  '/applications': {
    metaTitle: 'Stone Applications | Flooring, Walls, Kitchens',
    metaDescription: 'Natural stone for every application — flooring, wall cladding, kitchen countertops, bathrooms, staircases & exterior cladding. Expert supply from Kishangarh.',
    keywords: [
      'stone flooring india',
      'marble kitchen countertop',
      'stone wall cladding',
      'granite bathroom',
      'natural stone applications',
      'stone for hotels india',
    ],
    ogImage: '/images/applications/flooring/flooring-granite-crystalline-wall.webp',
  },

  '/projects': {
    metaTitle: 'Stone Projects Portfolio | Granite Gallery',
    metaDescription: 'Landmark projects supplied by Granite Gallery — Taj Hotels, Parliament of India, Central Vista, Jewar Airport & more. Premium natural stone since 1985.',
    keywords: [
      'granite gallery projects',
      'natural stone landmark projects india',
      'marble supplier parliament india',
      'taj hotel stone supplier',
      'granite gallery portfolio',
    ],
    ogImage: '/images/hero/granite-gallery-natural-stone-export.webp',
  },

  '/blogs': {
    metaTitle: 'Stone Design Blog | Marble & Granite Insights',
    metaDescription: 'Expert guides on marble selection, granite comparisons, stone design trends & maintenance tips. Learn from India\'s leading natural stone specialists.',
    keywords: [
      'marble granite blog india',
      'stone design tips',
      'how to choose marble',
      'granite vs marble',
      'natural stone guide',
      'stone maintenance tips india',
    ],
    ogImage: '/images/collections/showroom/marble-showroom-display-wall-kishangarh.webp',
  },

  '/team': {
    metaTitle: 'Our Team | Granite Gallery Kishangarh',
    metaDescription: 'Meet the expert team behind Granite Gallery — stone specialists, quarry experts & design consultants dedicated to premium natural stone solutions.',
    keywords: [
      'granite gallery team',
      'stone experts kishangarh',
      'natural stone consultants india',
    ],
    ogImage: '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
  },

  '/about': {
    // Was 72 chars — over the 60-char ceiling in src/types/seo.ts, so Google
    // truncated it mid-phrase. Now 54.
    metaTitle: 'About Granite Gallery | Stone Manufacturer, Kishangarh',
    // Was 197 chars, well past the 140–160 band. Now 156.
    metaDescription: 'A family-run stone manufacturer in Kishangarh, Rajasthan — own mines, in-house processing and exports to 30+ countries. Four decades in natural stone.',
    keywords: [
      'about granite gallery',
      'kishangarh stone manufacturer',
      'granite gallery history',
      'natural stone exporter india',
      'family stone business kishangarh',
      'infinite possibilities stone',
    ],
    ogImage: '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
  },

  '/contact': {
    metaTitle: 'Contact | Marble & Granite Supplier, Kishangarh',
    metaDescription:
      'Contact Granite Gallery in Kishangarh, Rajasthan. Call, WhatsApp or visit our slab yard and processing facility. Same-day quotes on marble and granite.',
    keywords: [
      'granite gallery contact',
      'marble supplier kishangarh contact',
      'granite supplier near me kishangarh',
      'stone yard kishangarh address',
      'marble factory kishangarh phone number',
      'natural stone enquiry rajasthan',
    ],
    ogImage: '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
  },

  '/sitemap': {
    metaTitle: 'Sitemap | Granite Gallery',
    metaDescription: 'Complete directory of all pages, products, and content on the Granite Gallery website.',
    keywords: ['granite gallery sitemap'],
    ogImage: '/images/hero/granite-gallery-marble-granite-sandstone.webp',
  },

};
