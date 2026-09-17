import type { StoneProduct, StoneFinish, StoneApplication, StoneSize } from '@/types/stone';

// ─── Shared image pools ───────────────────────────────────────────────────────

const MARBLE_ROOMS = {
  bath1:    '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
  bath2:    '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
  bath3:    '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
  kitchen1: '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
  kitchen2: '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
  kitchen3: '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
  floor1:   '/images/applications/flooring/flooring-stone-wall.webp',
  floor2:   '/images/applications/flooring/flooring-stone-wall-1.webp',
  wall1:    '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
  wall2:    '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
  living1:  '/images/applications/flooring/flooring-stone-wall-2.webp',
  slab1:    '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
  slab2:    '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
  stair1:   '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
};

const DARK_MARBLE_ROOMS = {
  bath1:    '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
  kitchen1: '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
  floor1:   '/images/applications/flooring/flooring-stone-wall.webp',
  wall1:    '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
  slab1:    '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
};

// ─── Shared finishes ──────────────────────────────────────────────────────────

const marbleFinishes: StoneFinish[] = [
  {
    id: 'polished',
    label: 'Polished',
    images: [MARBLE_ROOMS.bath1, MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.floor1],
  },
  {
    id: 'honed',
    label: 'Honed',
    images: [MARBLE_ROOMS.floor2, MARBLE_ROOMS.wall1, MARBLE_ROOMS.living1],
  },
  {
    id: 'brushed',
    label: 'Brushed',
    images: [MARBLE_ROOMS.bath2, MARBLE_ROOMS.stair1, MARBLE_ROOMS.floor1],
  },
  {
    id: 'antique',
    label: 'Antique',
    images: [MARBLE_ROOMS.stair1, MARBLE_ROOMS.wall2, MARBLE_ROOMS.living1],
  },
];

// ─── Shared applications ─────────────────────────────────────────────────────

const marbleApplications: StoneApplication[] = [
  {
    id: 'flooring',
    label: 'Flooring',
    images: [MARBLE_ROOMS.floor1, MARBLE_ROOMS.floor2, MARBLE_ROOMS.living1],
  },
  {
    id: 'wall-cladding',
    label: 'Wall Cladding',
    images: [MARBLE_ROOMS.wall1, MARBLE_ROOMS.wall2, MARBLE_ROOMS.bath1],
  },
  {
    id: 'kitchen-counter',
    label: 'Kitchen Counter',
    images: [MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.kitchen2, MARBLE_ROOMS.kitchen3],
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    images: [MARBLE_ROOMS.bath1, MARBLE_ROOMS.bath2, MARBLE_ROOMS.bath3],
  },
  {
    id: 'staircase',
    label: 'Staircase',
    images: [MARBLE_ROOMS.stair1, MARBLE_ROOMS.floor2, MARBLE_ROOMS.living1],
  },
];

// ─── Shared sizes ─────────────────────────────────────────────────────────────

const standardSizes: StoneSize[] = [
  { label: '12 × 12 in', dimensions: '305 × 305 mm' },
  { label: '18 × 18 in', dimensions: '457 × 457 mm' },
  { label: '24 × 24 in', dimensions: '610 × 610 mm' },
  { label: '24 × 48 in', dimensions: '610 × 1220 mm' },
  { label: 'Custom Slab', dimensions: 'Up to 240 × 140 cm' },
];

// ─── Domestic Marble ─────────────────────────────────────────────────────────

export const domesticMarble: StoneProduct[] = [
  {
    slug: 'makrana-white',
    name: 'Makrana White',
    category: 'marble',
    colorFamily: ['white'],
    tagline: 'The stone that built the Taj Mahal',
    origin: 'Makrana, Nagaur, Rajasthan, India',
    description:
      'Makrana White is India\'s most celebrated marble, quarried from the ancient mines of Makrana in Nagaur district, Rajasthan — the same source used for the Taj Mahal. A highly calcitic stone (95–98% calcium carbonate), its luminous pure-white surface with subtle grey veining and exceptional polishability makes it the benchmark for luxury interiors across the world.',
    heroImages: [MARBLE_ROOMS.bath1, MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.floor1, MARBLE_ROOMS.living1],
    thumbnail: MARBLE_ROOMS.slab1,
    galleryImages: [
      MARBLE_ROOMS.bath1, MARBLE_ROOMS.bath2, MARBLE_ROOMS.kitchen1,
      MARBLE_ROOMS.floor1, MARBLE_ROOMS.floor2, MARBLE_ROOMS.wall1,
      MARBLE_ROOMS.stair1, MARBLE_ROOMS.slab1,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.71 g/cm³',
      waterAbsorption: '< 0.15%',
      compressiveStrength: '95–115 MPa',
      porosity: 'Low',
      abrasionResistance: 'Medium',
      thickness: '16–20 mm (standard slab)',
    },
    finishes: marbleFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Quarried from historic Makrana mines, Rajasthan',
      'Consistent pure-white base with fine grey veining',
      'Used in Taj Mahal, Victoria Memorial & global landmarks',
      'Excellent for high-footfall flooring applications',
      'Available in polished, honed and antique finishes',
    ],
    metaTitle: 'Makrana White Marble | India\'s Finest Pure White Marble',
    metaDescription:
      'Buy premium Makrana White Marble — the stone of the Taj Mahal. Pure white surface, fine grey veining. Available in polished, honed & antique finishes. Direct from Kishangarh quarries.',
    keywords: ['makrana white marble', 'white marble india', 'taj mahal marble', 'rajasthan marble', 'buy white marble', 'makrana marble price'],
    faqs: [
      {
        question: 'Is Makrana White the same marble used in the Taj Mahal?',
        answer: 'Yes. Makrana marble from Nagaur district, Rajasthan was used for the Taj Mahal\'s dome, overlay and minarets, as well as the Victoria Memorial in Kolkata. It is India\'s oldest commercial marble quarry, and our stock comes from the same historic belt.',
      },
      {
        question: 'Why is Makrana White considered more durable than other white marbles?',
        answer: 'Makrana is highly calcitic — 95 to 98% calcium carbonate — which gives it very low porosity, high density and excellent polishability. This makes it harder-wearing than most white marbles and suitable even for high-footfall flooring.',
      },
      {
        question: 'How should Makrana White Marble be maintained?',
        answer: 'Seal it with a quality impregnating sealer every 12–18 months, wipe spills promptly, and clean only with a pH-neutral stone cleaner. Avoid acidic agents like vinegar or lemon, which can etch any calcite-based marble.',
      },
    ],
    tag: 'Bestseller',
    featured: true,
    inStock: true,
  },

  {
    slug: 'nizarana-white',
    name: 'Nizarana White',
    category: 'marble',
    colorFamily: ['white'],
    tagline: 'Bright white with a silken surface',
    origin: 'Nizarana, Rajasthan, India',
    description:
      'Nizarana White marble is prized for its bright, even-toned white surface with minimal veining. Quarried near Kishangarh, it offers a cleaner look than Makrana and is a popular choice for residential flooring and contemporary interiors.',
    heroImages: [MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath2, MARBLE_ROOMS.kitchen2, MARBLE_ROOMS.wall1],
    thumbnail: MARBLE_ROOMS.wall2,
    galleryImages: [
      MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath2, MARBLE_ROOMS.kitchen2,
      MARBLE_ROOMS.wall1, MARBLE_ROOMS.slab2, MARBLE_ROOMS.stair1,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.68 g/cm³',
      waterAbsorption: '< 0.2%',
      compressiveStrength: '85–110 MPa',
      porosity: 'Low',
      thickness: '16–18 mm',
    },
    finishes: marbleFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Even bright-white tone with minimal veining',
      'Softer look compared to Makrana — ideal for modern spaces',
      'Excellent polishing capability for mirror finish',
      'Cost-effective premium alternative for large area flooring',
    ],
    metaTitle: 'Nizarana White Marble | Bright White Indian Marble',
    metaDescription:
      'Nizarana White Marble — bright, even-toned white with minimal veining. Perfect for flooring, walls, and countertops. Direct from Rajasthan quarries.',
    keywords: ['nizarana white marble', 'white marble rajasthan', 'kishangarh marble', 'indian white marble', 'nizarana marble price'],
    faqs: [
      {
        question: 'How is Nizarana White different from Makrana White?',
        answer: 'Nizarana White has a brighter, more even white tone with minimal veining, giving a cleaner, more contemporary look than Makrana\'s subtle grey veining. It is quarried near Kishangarh and offers excellent value as a premium alternative for large-area flooring.',
      },
      {
        question: 'Is Nizarana White suitable for full-house flooring?',
        answer: 'Yes. Its even tone and strong polishing response make it a popular choice for seamless residential flooring. We supply it in oversized slabs and calibrated tiles to keep joints and shade variation to a minimum.',
      },
      {
        question: 'What finishes are available for Nizarana White Marble?',
        answer: 'We offer Nizarana White in polished, honed, brushed and antique finishes. Polished delivers a mirror-like reflectivity, while honed gives a soft matte surface that is more forgiving of foot traffic.',
      },
    ],
    tag: 'Classic',
    inStock: true,
  },

  {
    slug: 'agariya-white',
    name: 'Agariya White',
    category: 'marble',
    colorFamily: ['white'],
    tagline: 'Smooth white elegance from Rajasthan',
    origin: 'Agariya, Rajasthan, India',
    description:
      'Agariya White is a fine-grained white marble from the Kishangarh belt, known for its smooth texture and subtle cream undertones. Ideal for residential flooring, bathroom vanities, and wall cladding in luxury homes.',
    heroImages: [MARBLE_ROOMS.bath3, MARBLE_ROOMS.floor1, MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.wall2],
    thumbnail: MARBLE_ROOMS.bath3,
    galleryImages: [
      MARBLE_ROOMS.bath3, MARBLE_ROOMS.floor1, MARBLE_ROOMS.kitchen1,
      MARBLE_ROOMS.wall2, MARBLE_ROOMS.slab1, MARBLE_ROOMS.living1,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.67 g/cm³',
      waterAbsorption: '< 0.25%',
      compressiveStrength: '80–105 MPa',
      porosity: 'Low–Medium',
      thickness: '16–18 mm',
    },
    finishes: marbleFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Subtle cream undertone — warmer than pure white',
      'Fine grain texture for a smooth, refined surface',
      'Great value for large residential flooring projects',
      'Available in oversized slabs for seamless layouts',
    ],
    metaTitle: 'Agariya White Marble | Rajasthan White Marble Supplier',
    metaDescription:
      'Agariya White Marble with subtle cream undertones and fine grain texture. Ideal for luxury flooring, bathrooms and kitchens. Sourced from Rajasthan.',
    keywords: ['agariya white marble', 'white marble kishangarh', 'cream white marble', 'rajasthan white marble', 'agariya marble price'],
    faqs: [
      {
        question: 'What gives Agariya White its warmer look?',
        answer: 'Agariya White carries subtle cream undertones rather than a stark, cool white. This warmer cast, combined with a fine, even grain, makes it ideal for spaces where you want a soft, refined white instead of a clinical one.',
      },
      {
        question: 'Where is Agariya White Marble quarried?',
        answer: 'It comes from the Kishangarh marble belt in Rajasthan, the same region we process and export from. Sourcing locally lets us control colour consistency and calibration across a full consignment.',
      },
      {
        question: 'Is Agariya White good value for large projects?',
        answer: 'Yes. It offers a premium white-marble appearance at a competitive price and is available in oversized slabs, making it a cost-effective choice for large residential floors, vanities and wall cladding.',
      },
    ],
    inStock: true,
  },

  {
    slug: 'talai-marble',
    name: 'Talai',
    category: 'marble',
    colorFamily: ['white', 'grey'],
    tagline: 'Distinct grey veining on pristine white',
    origin: 'Talai, Rajasthan, India',
    description:
      'Talai Marble is a distinctive Indian white marble characterized by bold grey and silver veining patterns against a white base. Its dramatic look makes it a popular choice for feature walls, staircase risers, and luxury bathroom applications.',
    heroImages: [MARBLE_ROOMS.wall1, MARBLE_ROOMS.stair1, MARBLE_ROOMS.bath1, MARBLE_ROOMS.floor2],
    thumbnail: MARBLE_ROOMS.wall1,
    galleryImages: [
      MARBLE_ROOMS.wall1, MARBLE_ROOMS.stair1, MARBLE_ROOMS.bath1,
      MARBLE_ROOMS.floor2, MARBLE_ROOMS.slab2, MARBLE_ROOMS.living1,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.70 g/cm³',
      waterAbsorption: '< 0.2%',
      compressiveStrength: '90–110 MPa',
      porosity: 'Low',
      thickness: '16–20 mm',
    },
    finishes: marbleFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Bold grey veining on a bright white base',
      'Dramatic statement for feature walls and staircases',
      'High contrast patterns — each slab is unique',
      'Excellent hardness for high-traffic floor areas',
    ],
    metaTitle: 'Talai Marble | White Marble with Grey Veining',
    metaDescription:
      'Talai Marble — premium Indian white marble with bold grey veining. Perfect for feature walls, staircases, and luxury bathrooms. Available from Granite Gallery, Kishangarh.',
    keywords: ['talai marble', 'white grey marble', 'veined marble india', 'marble with grey veins', 'talai marble price'],
    faqs: [
      {
        question: 'What makes Talai Marble visually distinctive?',
        answer: 'Talai is defined by bold grey and silver veining set against a bright white base. The high-contrast, dramatic patterning makes it a favourite for feature walls and staircase risers where you want the stone to be the focal point.',
      },
      {
        question: 'Will every Talai slab look the same?',
        answer: 'No — the veining is natural, so each slab is unique. For continuous walls or large floors we recommend selecting and dry-laying slabs together, and bookmatching is possible for symmetrical feature installations.',
      },
      {
        question: 'Is Talai Marble durable enough for floors and stairs?',
        answer: 'Yes. Talai has good hardness for a white marble and performs well in high-traffic areas. As with all marble, seal it periodically and use a honed finish on stairs and wet zones for better slip resistance.',
      },
    ],
    inStock: true,
  },

  {
    slug: 'umraya-white',
    name: 'Umraya White',
    category: 'marble',
    colorFamily: ['white'],
    tagline: 'Pure white with a pearl-like lustre',
    origin: 'Umraya, Rajasthan, India',
    description:
      'Umraya White is a premium Indian marble with an almost crystalline white appearance and a natural pearl-like lustre when polished. Its uniform tone and minimal patterning suit contemporary minimalist and Scandinavian-style interiors.',
    heroImages: [MARBLE_ROOMS.kitchen2, MARBLE_ROOMS.bath2, MARBLE_ROOMS.floor1, MARBLE_ROOMS.wall2],
    thumbnail: MARBLE_ROOMS.kitchen2,
    galleryImages: [
      MARBLE_ROOMS.kitchen2, MARBLE_ROOMS.bath2, MARBLE_ROOMS.floor1,
      MARBLE_ROOMS.wall2, MARBLE_ROOMS.slab1, MARBLE_ROOMS.stair1,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.69 g/cm³',
      waterAbsorption: '< 0.2%',
      compressiveStrength: '85–105 MPa',
      porosity: 'Low',
      thickness: '16–18 mm',
    },
    finishes: marbleFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Pearl-white surface with crystalline sparkle',
      'Extremely uniform tone — ideal for contemporary design',
      'Exceptional polishing response for mirror-gloss finish',
      'Popular for residential and hospitality interiors',
    ],
    metaTitle: 'Umraya White Marble | Pearl White Indian Marble',
    metaDescription:
      'Umraya White Marble — crystalline pearl-white surface with minimal veining. Ideal for minimalist and contemporary interiors. Direct from Rajasthan.',
    keywords: ['umraya white marble', 'pearl white marble', 'uniform white marble india', 'plain white marble', 'umraya marble price'],
    faqs: [
      {
        question: 'What does the "pearl-like lustre" of Umraya White mean?',
        answer: 'Umraya has an almost crystalline structure that, once polished, reflects light with a soft pearl-like glow rather than a flat sheen. This makes it especially striking in well-lit, minimalist interiors.',
      },
      {
        question: 'Is Umraya White suitable for contemporary and Scandinavian interiors?',
        answer: 'Very much so. Its extremely uniform tone and minimal patterning give the clean, calm backdrop those styles rely on, while still providing the depth and warmth of natural stone.',
      },
      {
        question: 'How well does Umraya White take a polish?',
        answer: 'Exceptionally well — it is one of the better-polishing Indian whites and achieves a near mirror-gloss finish. We also offer honed and brushed options for a more understated surface.',
      },
    ],
    inStock: true,
  },
];

// ─── Imported Marble ──────────────────────────────────────────────────────────

const importedFinishes: StoneFinish[] = [
  {
    id: 'polished',
    label: 'Polished',
    images: [MARBLE_ROOMS.bath1, MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.floor1],
  },
  {
    id: 'honed',
    label: 'Honed',
    images: [MARBLE_ROOMS.floor2, MARBLE_ROOMS.wall1, MARBLE_ROOMS.living1],
  },
  {
    id: 'brushed',
    label: 'Brushed',
    images: [MARBLE_ROOMS.bath2, MARBLE_ROOMS.stair1, MARBLE_ROOMS.wall2],
  },
];

export const importedMarble: StoneProduct[] = [
  {
    slug: 'botticino',
    name: 'Botticino',
    altNames: ['Bottincino', 'Botticino Classico'],
    category: 'imported-marble',
    colorFamily: ['beige'],
    tagline: 'Warm Italian beige with classic fossils',
    origin: 'Botticino, Brescia, Lombardy, Italy',
    description:
      'Botticino is a warm beige Italian marble — technically a compact micritic limestone — with distinctive fossil markings and a golden-cream palette. Quarried in the Botticino district near Brescia (Italy\'s second-largest dimensional-stone area after Carrara), it is prized for its low porosity and timeless Mediterranean character in hotels, lobbies, and luxury residences.',
    heroImages: [MARBLE_ROOMS.living1, MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath3, MARBLE_ROOMS.wall1],
    thumbnail: MARBLE_ROOMS.living1,
    galleryImages: [
      MARBLE_ROOMS.living1, MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath3,
      MARBLE_ROOMS.wall1, MARBLE_ROOMS.kitchen3, MARBLE_ROOMS.slab2,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.65 g/cm³',
      waterAbsorption: '< 0.4%',
      compressiveStrength: '75–100 MPa',
      porosity: 'Low–Medium',
      thickness: '18–20 mm',
    },
    finishes: importedFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Classic Italian beige with fossil inclusions',
      'Warm golden-cream palette perfect for lobbies and halls',
      'Available in large format slabs for uninterrupted layouts',
      'Pairs beautifully with bronze and gold hardware',
    ],
    metaTitle: 'Botticino Marble | Italian Beige Marble Supplier India',
    metaDescription:
      'Buy Botticino Italian Marble — warm beige with fossil markings, quarried near Brescia, Italy. Ideal for flooring, walls, and luxury interiors. Available at Granite Gallery.',
    keywords: ['botticino marble', 'bottincino marble', 'italian beige marble', 'beige marble india', 'fossil marble', 'botticino marble price india'],
    faqs: [
      {
        question: 'Is Botticino a marble or a limestone?',
        answer: 'Geologically Botticino is a compact micritic limestone, but it is sold and used as a marble because it takes a fine polish. It formed from limestone muds in an ancient inland sea, which is why it carries fossil inclusions.',
      },
      {
        question: 'Where does Botticino Marble come from?',
        answer: 'It is quarried in the Botticino district near Brescia in Lombardy, Italy — the country\'s second most important dimensional-stone area after Carrara. We import it directly for the Indian market.',
      },
      {
        question: 'Is Botticino suitable for high-traffic commercial floors?',
        answer: 'Yes. Botticino is a very compact carbonate stone with low water absorption and good wear resistance, which is why it is widely specified for hotel lobbies and commercial flooring. Periodic sealing is recommended.',
      },
    ],
    tag: 'Classic',
    inStock: true,
  },

  {
    slug: 'dyna-marble',
    name: 'Dyna',
    category: 'imported-marble',
    colorFamily: ['white', 'grey'],
    tagline: 'Dynamic veining in cool grey and white',
    origin: 'Turkey',
    description:
      'Dyna Marble is a Turkish white marble with dynamic grey veining that creates bold, flowing patterns across its surface. Its dramatic movement makes it a top choice for statement feature walls, reception counters, and luxury bathroom cladding.',
    heroImages: [MARBLE_ROOMS.wall1, MARBLE_ROOMS.bath1, MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.slab1],
    thumbnail: MARBLE_ROOMS.slab1,
    galleryImages: [
      MARBLE_ROOMS.wall1, MARBLE_ROOMS.bath1, MARBLE_ROOMS.kitchen1,
      MARBLE_ROOMS.slab1, MARBLE_ROOMS.stair1, MARBLE_ROOMS.floor2,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.68 g/cm³',
      waterAbsorption: '< 0.3%',
      compressiveStrength: '80–110 MPa',
      porosity: 'Low',
      thickness: '18–20 mm',
    },
    finishes: importedFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Bold dynamic veining — each slab a unique artwork',
      'Cool grey tones suit contemporary and transitional styles',
      'Consistent background with expressive movement',
      'Ideal for large-format feature walls',
    ],
    metaTitle: 'Dyna Marble | Turkish White Grey Veined Marble',
    metaDescription:
      'Dyna Turkish Marble — white base with bold grey veining. Perfect for feature walls, kitchen islands, and luxury bathrooms. Available in polished and honed finishes.',
    keywords: ['dyna marble', 'turkish marble india', 'grey veined marble', 'imported white marble', 'dyna marble price india'],
    faqs: [
      {
        question: 'Where is Dyna Marble quarried?',
        answer: 'Dyna is a Turkish white marble. It is known for dynamic grey veining that flows boldly across a consistent white background, which is where its name comes from.',
      },
      {
        question: 'What applications suit Dyna Marble best?',
        answer: 'Its expressive movement makes it ideal for statement feature walls, reception counters and bathroom cladding. Large-format slabs let the veining run uninterrupted for maximum visual impact.',
      },
      {
        question: 'Can Dyna Marble be bookmatched?',
        answer: 'Yes. Because its veins flow in clear directions, sequential slabs can be bookmatched to create mirror-image patterns — particularly effective on large feature walls and islands.',
      },
    ],
    inStock: true,
  },

  {
    slug: 'perlato-marble',
    name: 'Perlato',
    category: 'imported-marble',
    colorFamily: ['beige', 'white'],
    tagline: 'Italian ivory with warm fossilised detail',
    origin: 'Sicily, Italy',
    description:
      'Perlato Sicilia is an elegant ivory-cream Italian marble with warm beige tones and delicate fossilised shell markings. Its light, natural background and subtle variation make it a classic choice for hotels, spas, and high-end residential flooring.',
    heroImages: [MARBLE_ROOMS.bath3, MARBLE_ROOMS.floor1, MARBLE_ROOMS.living1, MARBLE_ROOMS.kitchen3],
    thumbnail: MARBLE_ROOMS.bath3,
    galleryImages: [
      MARBLE_ROOMS.bath3, MARBLE_ROOMS.floor1, MARBLE_ROOMS.living1,
      MARBLE_ROOMS.kitchen3, MARBLE_ROOMS.slab2, MARBLE_ROOMS.wall2,
    ],
    specs: {
      hardness: 'Mohs 3',
      density: '2.62 g/cm³',
      waterAbsorption: '< 0.5%',
      compressiveStrength: '70–95 MPa',
      porosity: 'Medium',
      thickness: '18–20 mm',
    },
    finishes: importedFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Warm ivory-cream base with fossilised shell markings',
      'Soft, consistent look — ideal for spa and wellness spaces',
      'Classic Sicilian marble used in historic architecture',
      'Low optical movement — great for large unbroken areas',
    ],
    metaTitle: 'Perlato Marble | Italian Ivory Marble India',
    metaDescription:
      'Perlato Sicilia Italian Marble — ivory-cream with fossilised detail. Perfect for spa floors, hotel lobbies, and luxury residences. Imported directly to Kishangarh.',
    keywords: ['perlato marble', 'perlato sicilia', 'italian ivory marble', 'fossil marble india', 'cream marble imported', 'perlato marble price'],
    faqs: [
      {
        question: 'What is Perlato Sicilia known for?',
        answer: 'Perlato Sicilia is an Italian ivory-cream marble from Sicily, recognised for its warm beige base and delicate fossilised shell markings. Its soft, consistent appearance suits spas, hotels and high-end residential flooring.',
      },
      {
        question: 'Does Perlato have a lot of veining?',
        answer: 'No — Perlato has relatively low optical movement and a uniform background, which makes it excellent for large unbroken floor areas where you want a calm, cohesive look.',
      },
      {
        question: 'How do I care for Perlato Marble?',
        answer: 'As a calcium-based marble it should be sealed periodically and cleaned with pH-neutral products. Wipe acidic spills immediately, and consider a honed finish in wet areas for added slip resistance.',
      },
    ],
    tag: 'Premium',
    inStock: true,
  },

  {
    slug: 'michelangelo-marble',
    name: 'Michelangelo',
    altNames: ['Michaelangelo', 'Michelangelo White'],
    category: 'imported-marble',
    colorFamily: ['white', 'grey'],
    tagline: 'Grand white marble with artful grey rivers',
    origin: 'Afyon, Turkey',
    description:
      'Michelangelo Marble is a striking Turkish white marble — quarried in the Afyonkarahisar region — that displays long, flowing grey rivers across a bright white canvas. Named in homage to the Renaissance master, it suits bold architectural statements, from grand entrance floors to dramatic bookmatched kitchen islands.',
    heroImages: [MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.floor1, MARBLE_ROOMS.bath1, MARBLE_ROOMS.wall1],
    thumbnail: MARBLE_ROOMS.kitchen1,
    galleryImages: [
      MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.floor1, MARBLE_ROOMS.bath1,
      MARBLE_ROOMS.wall1, MARBLE_ROOMS.slab1, MARBLE_ROOMS.stair1,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.70 g/cm³',
      waterAbsorption: '< 0.25%',
      compressiveStrength: '85–115 MPa',
      porosity: 'Low',
      thickness: '18–20 mm',
    },
    finishes: importedFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Long flowing grey rivers across bright white base',
      'Dramatic, artful patterns — ideal for prestige projects',
      'High density for heavy-use floor applications',
      'Bookmatching available for symmetrical installations',
    ],
    metaTitle: 'Michelangelo Marble | Turkish White Marble India',
    metaDescription:
      'Michelangelo Turkish Marble — bright white with flowing grey rivers. Ideal for grand entrances, kitchen islands, and luxury bathrooms. Available from Granite Gallery.',
    keywords: ['michelangelo marble', 'michaelangelo marble', 'turkish white marble india', 'flowing veined marble', 'afyon white marble'],
    faqs: [
      {
        question: 'Is Michelangelo Marble related to Calacatta?',
        answer: 'It shares the look of a bright white base with bold grey veining, but Michelangelo is a Turkish marble from the Afyon region, whereas Calacatta is Italian (Carrara). Michelangelo offers a similar dramatic aesthetic at a more accessible price.',
      },
      {
        question: 'What projects suit Michelangelo Marble?',
        answer: 'Its long, flowing grey rivers make it ideal for prestige applications — grand entrance floors, dramatic kitchen islands and bookmatched feature walls where a bold statement is desired.',
      },
      {
        question: 'Is Michelangelo Marble dense enough for floors?',
        answer: 'Yes. It has good density for a white marble and performs well on heavy-use floors. As with any marble, seal it periodically and choose a honed finish in wet or high-traffic areas.',
      },
    ],
    tag: 'Premium',
    inStock: true,
  },

  {
    slug: 'travertine',
    name: 'Travertine',
    category: 'imported-marble',
    colorFamily: ['beige'],
    tagline: 'Roman elegance with natural cellular texture',
    origin: 'Tivoli, Lazio, Italy',
    description:
      'Travertine is one of the world\'s most enduring building materials, formed by hot spring deposits over millennia near Tivoli, Italy. Its warm beige tones and characteristic pitted surface have graced the Colosseum, Vatican, and countless luxury villas.',
    heroImages: [MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath2, MARBLE_ROOMS.living1, MARBLE_ROOMS.wall1],
    thumbnail: MARBLE_ROOMS.floor2,
    galleryImages: [
      MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath2, MARBLE_ROOMS.living1,
      MARBLE_ROOMS.wall1, MARBLE_ROOMS.slab2, MARBLE_ROOMS.kitchen3,
    ],
    specs: {
      hardness: 'Mohs 3',
      density: '2.50 g/cm³',
      waterAbsorption: '< 1.5%',
      compressiveStrength: '55–85 MPa',
      porosity: 'Medium',
      thickness: '18–20 mm',
    },
    finishes: [
      { id: 'filled-polished', label: 'Filled & Polished', images: [MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath2, MARBLE_ROOMS.kitchen3] },
      { id: 'honed-filled', label: 'Honed & Filled', images: [MARBLE_ROOMS.living1, MARBLE_ROOMS.wall1, MARBLE_ROOMS.slab2] },
      { id: 'unfilled-brushed', label: 'Unfilled Brushed', images: [MARBLE_ROOMS.wall2, MARBLE_ROOMS.floor1, MARBLE_ROOMS.bath3] },
    ],
    applications: [
      ...marbleApplications,
      { id: 'pool-surround', label: 'Pool Surround', images: [MARBLE_ROOMS.floor2, MARBLE_ROOMS.slab2, MARBLE_ROOMS.wall1] },
    ],
    sizes: standardSizes,
    highlights: [
      'Natural cellular pitting — unique texture in every tile',
      'Warm earthy tones complement both classic and modern design',
      'Available filled (smooth) or unfilled (rustic) finishes',
      'Used in Roman architecture for over 2,000 years',
      'Great for indoor and outdoor applications',
    ],
    metaTitle: 'Travertine Marble | Italian Travertine Supplier India',
    metaDescription:
      'Italian Travertine — warm beige cellular stone from Tivoli. Available in filled/polished, honed, and brushed finishes. Perfect for flooring, walls, and pool surrounds.',
    keywords: ['travertine marble', 'italian travertine india', 'travertine flooring', 'beige travertine', 'imported travertine', 'travertine price india'],
    faqs: [
      {
        question: 'What is the difference between filled and unfilled Travertine?',
        answer: 'Travertine naturally has small cavities. Filled travertine has these pores filled and polished or honed for a smooth surface, ideal indoors. Unfilled (brushed) travertine keeps the natural pitting for a rustic, anti-slip texture suited to outdoor and pool areas.',
      },
      {
        question: 'Is Travertine a marble?',
        answer: 'Technically Travertine is a form of limestone deposited by mineral-rich hot springs, but it is grouped with marble commercially. The variety we supply comes from the famous quarries near Tivoli, Italy — the same stone used in the Colosseum.',
      },
      {
        question: 'Can Travertine be used outdoors?',
        answer: 'Yes — it is one of the best natural stones for outdoor use. In an unfilled or brushed finish it offers good grip for pool surrounds, patios and walkways, and its earthy tones weather beautifully.',
      },
    ],
    tag: 'Classic',
    inStock: true,
  },

  {
    slug: 'statuario',
    name: 'Statuario',
    altNames: ['Satvario'],
    category: 'imported-marble',
    colorFamily: ['white'],
    tagline: 'The pinnacle of Italian white marble',
    origin: 'Carrara, Tuscany, Italy',
    description:
      'Statuario — or Satvario — is the rarest and most coveted Italian marble from Carrara. Its bright white base with bold, free-flowing grey veins has been the medium of Michelangelo\'s sculptures and remains the ultimate status symbol in luxury architecture.',
    heroImages: [MARBLE_ROOMS.bath1, MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.slab1, MARBLE_ROOMS.wall1],
    thumbnail: MARBLE_ROOMS.slab1,
    galleryImages: [
      MARBLE_ROOMS.bath1, MARBLE_ROOMS.kitchen1, MARBLE_ROOMS.slab1,
      MARBLE_ROOMS.wall1, MARBLE_ROOMS.stair1, MARBLE_ROOMS.floor1,
      MARBLE_ROOMS.living1, MARBLE_ROOMS.bath3,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.72 g/cm³',
      waterAbsorption: '< 0.15%',
      compressiveStrength: '100–130 MPa',
      porosity: 'Very Low',
      abrasionResistance: 'High',
      thickness: '18–20 mm',
    },
    finishes: importedFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Rare Carrara marble — Michelangelo\'s preferred stone',
      'Brilliant white base with expressive bold grey veining',
      'Exceptional density — suitable for countertops and wet areas',
      'Bookmatching available for mirror-image installations',
      'Certificate of Italian origin available on request',
    ],
    metaTitle: 'Statuario Marble | Carrara Italian White Marble India',
    metaDescription:
      'Statuario / Satvario Italian Marble from Carrara — the world\'s most coveted white marble. Bold grey veining on brilliant white. Available polished & honed from Granite Gallery.',
    keywords: ['statuario marble', 'satvario marble', 'carrara marble india', 'italian white marble', 'luxury marble', 'statuario price india'],
    faqs: [
      {
        question: 'Why is Statuario the most coveted Italian marble?',
        answer: 'Statuario is quarried in limited quantities from the Carrara region of Tuscany and prized for its brilliant white base with bold, free-flowing grey veining. It is the marble Michelangelo chose for his sculptures, which cements its status as the ultimate luxury stone.',
      },
      {
        question: 'Is "Satvario" the same as Statuario?',
        answer: 'Yes. "Satvario" is a common spelling used in the Indian market for the same Carrara marble. We list it under both names so buyers find the genuine Italian stone.',
      },
      {
        question: 'Can Statuario be used for kitchen countertops?',
        answer: 'It can, thanks to its high density and very low porosity, but being calcite-based it will etch from acids over time. Many clients embrace the natural patina, or choose a honed finish; we always recommend sealing and prompt spill clean-up.',
      },
    ],
    tag: 'Exclusive',
    featured: true,
    inStock: true,
  },

  {
    slug: 'honey-onyx',
    name: 'Alabaster / Honey Onyx',
    altNames: ['Alabaster', 'Honey Onyx'],
    category: 'imported-marble',
    colorFamily: ['beige', 'yellow'],
    tagline: 'Translucent golden warmth — best backlit',
    origin: 'Iran & Pakistan',
    description:
      'Honey Onyx — also known as Alabaster — is a semi-translucent stone with warm amber, honey, and cream banding. When backlit, it glows with a mesmerizing golden warmth that transforms bars, reception counters, and feature walls into works of art.',
    heroImages: [MARBLE_ROOMS.wall2, MARBLE_ROOMS.living1, MARBLE_ROOMS.bath3, MARBLE_ROOMS.kitchen3],
    thumbnail: MARBLE_ROOMS.wall2,
    galleryImages: [
      MARBLE_ROOMS.wall2, MARBLE_ROOMS.living1, MARBLE_ROOMS.bath3,
      MARBLE_ROOMS.kitchen3, MARBLE_ROOMS.slab2, MARBLE_ROOMS.floor2,
    ],
    specs: {
      hardness: 'Mohs 3',
      density: '2.60 g/cm³',
      waterAbsorption: '< 0.3%',
      compressiveStrength: '60–90 MPa',
      porosity: 'Low',
      thickness: '15–20 mm',
    },
    finishes: [
      { id: 'polished', label: 'Polished', images: [MARBLE_ROOMS.wall2, MARBLE_ROOMS.living1, MARBLE_ROOMS.bath3] },
      { id: 'backlit', label: 'Backlit Panel', images: [MARBLE_ROOMS.wall2, MARBLE_ROOMS.kitchen3, MARBLE_ROOMS.slab2] },
    ],
    applications: [
      { id: 'feature-wall', label: 'Feature Wall', images: [MARBLE_ROOMS.wall2, MARBLE_ROOMS.living1, MARBLE_ROOMS.slab2] },
      { id: 'bar-counter', label: 'Bar Counter', images: [MARBLE_ROOMS.kitchen3, MARBLE_ROOMS.wall2, MARBLE_ROOMS.bath3] },
      { id: 'bathroom', label: 'Bathroom', images: [MARBLE_ROOMS.bath3, MARBLE_ROOMS.bath2, MARBLE_ROOMS.wall2] },
      { id: 'flooring', label: 'Flooring', images: [MARBLE_ROOMS.floor2, MARBLE_ROOMS.living1, MARBLE_ROOMS.floor1] },
    ],
    sizes: [
      { label: '12 × 12 in', dimensions: '305 × 305 mm' },
      { label: '18 × 18 in', dimensions: '457 × 457 mm' },
      { label: '24 × 24 in', dimensions: '610 × 610 mm' },
      { label: 'Custom Panel', dimensions: 'Up to 200 × 120 cm' },
    ],
    highlights: [
      'Semi-translucent — spectacular when backlit',
      'Warm amber and honey banding — every slab unique',
      'Ideal for bar tops, feature walls, and reception counters',
      'Available as thin panels (10–15 mm) for backlit applications',
    ],
    metaTitle: 'Honey Onyx Alabaster Marble | Translucent Stone India',
    metaDescription:
      'Honey Onyx / Alabaster — semi-translucent golden stone, stunning when backlit. Perfect for feature walls, bar counters, and luxury bathrooms. Available from Granite Gallery.',
    keywords: ['honey onyx', 'alabaster marble', 'translucent marble india', 'backlit onyx', 'golden onyx stone', 'backlit stone panel india'],
    faqs: [
      {
        question: 'How is Honey Onyx backlit?',
        answer: 'Because the stone is semi-translucent, LED panels are mounted behind a thin slab (typically 10–15 mm) on an acrylic or glass support frame. The light passes through the stone, making its amber and honey banding glow — ideal for bars, reception desks and feature walls.',
      },
      {
        question: 'Is Honey Onyx durable enough for countertops?',
        answer: 'Onyx is a softer, more delicate stone (around Mohs 3) and is prone to scratching and acid etching. We recommend it for vanity tops, bar fronts and feature walls rather than high-use kitchen worktops.',
      },
      {
        question: 'What is the difference between Honey Onyx and Alabaster?',
        answer: 'Both are soft, translucent calcium-based stones with warm banding, and the trade often uses the names interchangeably. We supply material from Iran and Pakistan selected specifically for its even honey colour and backlighting quality.',
      },
    ],
    tag: 'Rare',
    inStock: true,
  },

  {
    slug: 'golden-lisa',
    name: 'Golden Lisa',
    category: 'imported-marble',
    colorFamily: ['beige', 'yellow'],
    tagline: 'Golden beige with warm caramel flow',
    origin: 'Spain',
    description:
      'Golden Lisa is a Spanish marble with a warm golden-beige background and soft caramel-brown veining. Its rich tones bring warmth and opulence to kitchens, bathrooms, and hotel lobbies while maintaining a refined, understated elegance.',
    heroImages: [MARBLE_ROOMS.kitchen2, MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath3, MARBLE_ROOMS.living1],
    thumbnail: MARBLE_ROOMS.kitchen2,
    galleryImages: [
      MARBLE_ROOMS.kitchen2, MARBLE_ROOMS.floor2, MARBLE_ROOMS.bath3,
      MARBLE_ROOMS.living1, MARBLE_ROOMS.wall1, MARBLE_ROOMS.slab2,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.64 g/cm³',
      waterAbsorption: '< 0.4%',
      compressiveStrength: '75–100 MPa',
      porosity: 'Low–Medium',
      thickness: '18–20 mm',
    },
    finishes: importedFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Warm golden-beige with soft caramel veining',
      'Pairs beautifully with warm wood tones and brass fittings',
      'High contrast veining creates natural focal points',
      'Available in bookmatched pairs for symmetrical walls',
    ],
    metaTitle: 'Golden Lisa Marble | Spanish Golden Marble India',
    metaDescription:
      'Golden Lisa Spanish Marble — warm golden-beige with caramel veining. Perfect for kitchen counters, bathroom vanities, and luxury flooring. Import direct from Granite Gallery.',
    keywords: ['golden lisa marble', 'golden beige marble', 'spanish marble india', 'warm marble flooring', 'golden lisa marble price'],
    faqs: [
      {
        question: 'What colour is Golden Lisa Marble?',
        answer: 'Golden Lisa is a Spanish marble with a warm golden-beige background and soft caramel-brown veining. It brings warmth and opulence to interiors while staying refined and understated.',
      },
      {
        question: 'What interiors does Golden Lisa suit best?',
        answer: 'It pairs beautifully with warm wood tones and brass or bronze fittings, making it popular for kitchen counters, bathroom vanities and hotel lobbies. Its contrast veining creates natural focal points.',
      },
      {
        question: 'Can Golden Lisa be bookmatched?',
        answer: 'Yes. We can supply bookmatched pairs so the caramel veining mirrors symmetrically across a wall or island — a striking effect for feature surfaces.',
      },
    ],
    tag: 'Premium',
    inStock: true,
  },

  {
    slug: 'emperador',
    name: 'Emperador',
    category: 'imported-marble',
    colorFamily: ['brown'],
    tagline: 'Dark Spanish brown with silver veins',
    origin: 'Alicante & Murcia, Spain',
    description:
      'Emperador is a luxurious dark brown Spanish marble — quarried around Yecla and Jumilla in the Murcia–Alicante region — with fine white and gold veining running through a rich chocolatey-brown background. Available in Dark and Light variants, it creates dramatic, high-contrast interiors that exude wealth and sophistication.',
    heroImages: [DARK_MARBLE_ROOMS.bath1, DARK_MARBLE_ROOMS.kitchen1, DARK_MARBLE_ROOMS.wall1, DARK_MARBLE_ROOMS.floor1],
    thumbnail: DARK_MARBLE_ROOMS.slab1,
    galleryImages: [
      DARK_MARBLE_ROOMS.bath1, DARK_MARBLE_ROOMS.kitchen1, DARK_MARBLE_ROOMS.wall1,
      DARK_MARBLE_ROOMS.floor1, DARK_MARBLE_ROOMS.slab1, MARBLE_ROOMS.slab2,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.75 g/cm³',
      waterAbsorption: '< 0.2%',
      compressiveStrength: '100–140 MPa',
      porosity: 'Low',
      abrasionResistance: 'High',
      thickness: '18–20 mm',
    },
    finishes: importedFinishes,
    applications: [
      ...marbleApplications,
      { id: 'fireplace', label: 'Fireplace Surround', images: [DARK_MARBLE_ROOMS.wall1, DARK_MARBLE_ROOMS.slab1, DARK_MARBLE_ROOMS.bath1] },
    ],
    sizes: standardSizes,
    highlights: [
      'Rich dark brown with distinctive gold and white veining',
      'Available in Dark and Light Emperador variants',
      'Highest hardness among marbles — ideal for countertops',
      'Stunning contrast for fireplace surrounds and feature walls',
    ],
    metaTitle: 'Emperador Marble | Dark Brown Spanish Marble India',
    metaDescription:
      'Emperador Spanish Marble — rich dark brown with gold and white veining. Perfect for countertops, fireplaces, and dramatic feature walls. Available from Granite Gallery.',
    keywords: ['emperador marble', 'dark brown marble', 'spanish brown marble india', 'emperador dark marble price', 'light emperador marble'],
    faqs: [
      {
        question: 'What is the difference between Dark and Light Emperador?',
        answer: 'Dark Emperador has a deep chocolate-brown base with fine white and gold veining, while Light Emperador is a softer tan-brown with a more subtle pattern. Both are quarried in the Murcia–Alicante region of Spain.',
      },
      {
        question: 'Is Emperador really a marble?',
        answer: 'Emperador is a metamorphosed carbonate stone — often classified as a breccia or biogenic limestone — that polishes like marble and is sold as one. Its dense structure gives it some of the highest hardness among marbles.',
      },
      {
        question: 'Where is Emperador best used?',
        answer: 'Its rich dark tone and high density suit countertops, fireplace surrounds and dramatic feature walls. The strong contrast also makes it a popular accent stone against lighter marbles.',
      },
    ],
    tag: 'Premium',
    inStock: true,
  },

  {
    slug: 'vietnam-white',
    name: 'Vietnam White',
    category: 'imported-marble',
    colorFamily: ['white'],
    tagline: 'Crystal white from the mountains of Vietnam',
    origin: 'Nghe An Province, Vietnam',
    description:
      'Vietnam White Marble is quarried in the mountainous regions of Nghe An Province and is celebrated for its extremely bright, bluish-white surface with minimal veining. It is one of the purest white marbles in Asia and offers excellent value for luxury specification projects.',
    heroImages: [MARBLE_ROOMS.bath1, MARBLE_ROOMS.floor1, MARBLE_ROOMS.kitchen2, MARBLE_ROOMS.wall2],
    thumbnail: MARBLE_ROOMS.bath1,
    galleryImages: [
      MARBLE_ROOMS.bath1, MARBLE_ROOMS.floor1, MARBLE_ROOMS.kitchen2,
      MARBLE_ROOMS.wall2, MARBLE_ROOMS.slab1, MARBLE_ROOMS.bath3,
    ],
    specs: {
      hardness: 'Mohs 3–4',
      density: '2.68 g/cm³',
      waterAbsorption: '< 0.2%',
      compressiveStrength: '80–110 MPa',
      porosity: 'Low',
      thickness: '16–20 mm',
    },
    finishes: importedFinishes,
    applications: marbleApplications,
    sizes: standardSizes,
    highlights: [
      'Brilliant bluish-white surface — one of Asia\'s purest whites',
      'Minimal veining — ideal for seamless, clean installations',
      'Consistent large-format slabs available',
      'Excellent alternative to European white marble at better value',
    ],
    metaTitle: 'Vietnam White Marble | Crystal White Marble India',
    metaDescription:
      'Vietnam White Marble — crystal clear, bluish-white surface with minimal veining. One of Asia\'s purest white marbles. Available in large format slabs from Granite Gallery.',
    keywords: ['vietnam white marble', 'vietnamese marble india', 'crystal white marble', 'bluish white marble', 'imported white marble india', 'vietnam white marble price'],
    faqs: [
      {
        question: 'Why is Vietnam White considered a value alternative to European marble?',
        answer: 'Vietnam White delivers a brilliant, bluish-white surface comparable to premium European whites but at better value. It is quarried in the mountains of Nghe An Province and is one of the purest white marbles in Asia.',
      },
      {
        question: 'Does Vietnam White have much veining?',
        answer: 'Very little. Its minimal veining makes it ideal for seamless, clean installations where you want an even white field across floors and walls. Consistent large-format slabs are available.',
      },
      {
        question: 'Is Vietnam White suitable for countertops and flooring?',
        answer: 'Yes, for both. It is a dense, durable white marble; as with all marble, seal it periodically and choose a honed finish for wet areas. Its bright tone helps open up and brighten interiors.',
      },
    ],
    tag: 'Classic',
    inStock: true,
  },
];

export const allMarble: StoneProduct[] = [...domesticMarble, ...importedMarble];
