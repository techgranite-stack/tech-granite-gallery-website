// ============================================================
// src/lib/product-data.ts
// Single source of truth for all stone product collection data.
// Templates fall back to mockProductFallback when array is empty.
// ============================================================

import { FAQItem } from '@/types';
import type { ColorFamily } from '@/types/stone';

export interface ProductSpec {
  density?: string;
  compressiveStrength?: string;
  waterAbsorption?: string;
  flexuralStrength?: string;
  hardness?: string;
}

export interface Product {
  slug: string;
  name: string;
  pageTitle?: string;
  type: 'marble' | 'granite' | 'quartzite' | 'onyx' | 'travertine' | 'exotic'
      | 'sandstone' | 'limestone' | 'slate' | 'porphyry';
  origin: string;
  primaryColor: string;
  /** Colour families for collection listing filters (optional) */
  colorFamily?: ColorFamily[];
  finish: string;
  tag?: string;
  finishesAvailable: string[];
  applications: string[];
  sizes: string[];
  specifications: ProductSpec;
  gallery: string[];
  heroImage: string;
  standImage?: string;
  catalogImage?: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  whatsappMsg?: string;
  faqs?: FAQItem[];
}

// ── Compulsory Starter Mock Fallback ──────────────────────────
// Used when productsData array is empty or a slug is not found.
export const mockProductFallback: Product = {
  slug: 'carrara-white-marble',
  name: 'Carrara White Marble',
  pageTitle: 'Statuesque Carrara White Italian Marble',
  type: 'marble',
  origin: 'Carrara, Italy',
  primaryColor: 'White with soft grey veining',
  finish: 'Mirror Polished',
  tag: 'Bestseller',
  finishesAvailable: ['polished', 'honed', 'brushed'],
  applications: ['kitchen-countertops', 'bathroom-flooring', 'wall-cladding'],
  sizes: ['3000×1800mm', '2400×1200mm', '600×600mm', '600×300mm'],
  specifications: {
    density: '2.71 g/cm³',
    compressiveStrength: '115 MPa',
    waterAbsorption: '< 0.2%',
    flexuralStrength: '12.8 MPa',
    hardness: '3 Mohs',
  },
  gallery: [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&fm=webp',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85&fm=webp',
    'https://images.unsplash.com/photo-1633505899122-4e5d56b63f8d?w=1400&q=85&fm=webp',
  ],
  heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=90&fm=webp',
  description: 'A timeless Italian classic — Carrara Marble features dynamic grey veining overlaying a brilliant warm-white backdrop.',
  longDescription: `Quarried from the mountains of Carrara in the Tuscany region of Northern Italy, Carrara White Marble has been the stone of choice for Renaissance masters and today's most visionary architects alike. Its signature soft grey veining dances across a brilliant crystalline-white base, offering organic elegance that no artificial material can replicate.

This ultra-premium stone is ideal for spaces that demand both grandeur and restraint. From bookmatched feature walls in five-star hotel lobbies to seamless kitchen island slabs — Carrara transforms every surface into a work of art.`,
  metaTitle: 'Carrara White Marble Slabs — Direct Exporters | Granite Gallery',
  metaDescription: 'Source premium Carrara White Italian Marble slabs directly from Kishangarh. Mirror polished, honed & brushed finishes. Global export. Get quote.',
  whatsappMsg: "Hello, I'm interested in Carrara White Marble. Please share slab details and pricing.",
  faqs: [
    {
      question: "Does Carrara White Marble stain easily?",
      answer: "Carrara Marble is a calcium-based natural stone, which makes it somewhat porous. While it can stain if exposed to acidic substances or dark liquids for prolonged periods, applying a high-quality impregnating sealer annually and wiping spills immediately keeps it pristine."
    },
    {
      question: "What is the recommended sealant frequency for Carrara Marble?",
      answer: "We recommend sealing Carrara Marble every 12 to 18 months for residential surfaces and every 6 months for heavy-use commercial areas. This keeps the protective barrier active and prevents staining."
    },
    {
      question: "Can Carrara White Marble be used for kitchen countertops?",
      answer: "Yes, but with care. It is highly sought-after for its classic look, but users should expect a natural patina to develop over time. Acidic liquids like lemon juice or vinegar will etch the polished surface, so honed or leathered finishes are often preferred to minimize visibility of etches."
    }
  ]
};

// ── Production Data Collection ─────────────────────────────────
// Add new Product objects here. If empty → mockProductFallback is used.
export const productsData: Product[] = [
  {
    slug: 'calacatta-gold-marble',
    name: 'Calacatta Gold',
    pageTitle: 'Imperial Calacatta Gold Italian Marble',
    type: 'marble',
    origin: 'Carrara, Italy',
    primaryColor: 'Bright white with bold gold & grey veining',
    finish: 'Mirror Polished',
    tag: 'Premium',
    finishesAvailable: ['polished', 'honed'],
    applications: ['kitchen-countertops', 'bathroom', 'feature-walls'],
    sizes: ['3200×1800mm', '2800×1600mm', '600×600mm'],
    specifications: {
      density: '2.72 g/cm³',
      compressiveStrength: '130 MPa',
      waterAbsorption: '< 0.15%',
      flexuralStrength: '14.2 MPa',
      hardness: '3 Mohs',
    },
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1400&q=85&fm=webp',
    ],
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=90&fm=webp',
    description: 'The crown jewel of Italian marble — Calacatta Gold features dramatic gold veining on a pure white canvas.',
    longDescription: `Calacatta Gold is widely regarded as the most luxurious marble on earth. Unlike its close cousin Carrara, Calacatta features bolder, more dramatic veining in shades of warm gold and deep grey — all set against a brilliant, almost luminous white background.

Extracted from a single quarry zone in the Apuan Alps of Carrara, each slab is a unique geological painting. Its rarity and striking visual impact make it the material of choice for the world's most exclusive interiors — from presidential suites to private superyacht bathrooms.`,
    metaTitle: 'Calacatta Gold Italian Marble Slabs | Direct Export — Granite Gallery',
    metaDescription: 'Premium Calacatta Gold Italian Marble — bold gold veining on brilliant white. Direct export from Kishangarh. Mirror polished & honed finishes available.',
    whatsappMsg: "Hello, I'm interested in Calacatta Gold Marble. Please share slab availability and pricing.",
    faqs: [
      {
        question: "Why is Calacatta Gold more premium than standard marble?",
        answer: "Calacatta Gold is quarried in limited quantities from specific high-elevation zones in Carrara, Italy. Its dramatic gold and grey veining on a pure white background makes it highly rare and prized by designers worldwide."
      },
      {
        question: "Is Calacatta Gold marble suitable for bathroom floors?",
        answer: "Yes. Calacatta Gold is excellent for luxury bathroom flooring and walls. We recommend using a honed or textured finish on flooring to improve slip resistance when wet."
      },
      {
        question: "How do I clean and maintain my Calacatta Gold countertops?",
        answer: "Clean daily using a soft cloth and a pH-neutral stone cleaner. Avoid abrasive pads, bleach, and vinegar. Reseal the surface periodically using a premium impregnating sealer."
      }
    ]
  },
  {
    slug: 'statuario-luxe-marble',
    name: 'Statuario Luxe',
    pageTitle: 'Statuario Marble — The Stone of Sculptors',
    type: 'marble',
    origin: 'Carrara, Italy',
    primaryColor: 'Brilliant white with dramatic charcoal veining',
    finish: 'High Gloss',
    tag: 'Exclusive',
    finishesAvailable: ['polished', 'honed', 'leathered'],
    applications: ['feature-walls', 'bathroom', 'flooring'],
    sizes: ['3000×1800mm', '2600×1600mm', '600×600mm'],
    specifications: {
      density: '2.73 g/cm³',
      compressiveStrength: '122 MPa',
      waterAbsorption: '< 0.18%',
      flexuralStrength: '13.5 MPa',
      hardness: '3 Mohs',
    },
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85&fm=webp',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=90&fm=webp',
    description: 'The stone that Michelangelo carved the David from — Statuario is the apex of Italian marblecraft.',
    longDescription: `Statuario — literally "of the sculptor" in Italian — is the marble Michelangelo selected for the David. Its pure, unadulterated white background carries dramatic, expressive veining in shades of deep charcoal and warm grey. No two slabs are identical, making every installation a one-of-a-kind artistic statement.

Historically reserved for the world's greatest sculptures and monuments, Statuario is now the defining stone of ultra-luxury residential and hospitality design. Its crystalline surface responds magnificently to bookmatching — creating symmetrical vein patterns that read as abstract masterpieces.`,
    metaTitle: 'Statuario Luxe Italian Marble — Bookmatched Slabs | Granite Gallery',
    metaDescription: 'Premium Statuario Marble from Carrara, Italy. Dramatic charcoal veining on pure white. Bookmatched slabs available. Export from Kishangarh.',
    whatsappMsg: "Hello, I'm interested in Statuario Luxe Marble. Please share slab availability and pricing.",
    faqs: [
      {
        question: "What makes Statuario Marble ideal for bookmatching?",
        answer: "Statuario features bold, sweeping charcoal veins that run in predictable directions across sequence-cut slabs. When sequence-cut slabs are laid side-by-side, they create striking, mirror-image geometric patterns that resemble natural abstract artwork."
      },
      {
        question: "Can Statuario Marble be used outdoors?",
        answer: "No, we do not recommend Statuario Marble for outdoor applications. High UV exposure and environmental weathering can accelerate the wear of polished calcite structures and lead to dulling."
      },
      {
        question: "What finishes are available for Statuario Luxe?",
        answer: "We offer Statuario Luxe in high gloss (polished), honed (matte), and soft-brushed leathered finishes, depending on your architectural application."
      }
    ]
  },
  {
    slug: 'absolute-black-granite',
    name: 'Absolute Black Granite',
    pageTitle: 'Absolute Black Granite — The Bold Statement',
    type: 'granite',
    origin: 'Karnataka, India',
    primaryColor: 'Deep jet black, zero grain',
    finish: 'Velvet Matte',
    tag: 'Classic',
    finishesAvailable: ['polished', 'flamed', 'honed', 'sandblasted'],
    applications: ['flooring', 'kitchen-countertops', 'exterior-cladding', 'staircase'],
    sizes: ['3000×1800mm', '600×600mm', '600×300mm', '300×300mm'],
    specifications: {
      density: '2.96 g/cm³',
      compressiveStrength: '248 MPa',
      waterAbsorption: '< 0.08%',
      flexuralStrength: '18.4 MPa',
      hardness: '7 Mohs',
    },
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1625479610681-f789345a8157?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1400&q=85&fm=webp',
    ],
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=90&fm=webp',
    description: 'Absolute Black is the gold standard in black granite — zero grain, zero compromise, pure presence.',
    longDescription: `Quarried from deep within the Deccan Plateau of Karnataka, Absolute Black Granite is the definitive statement stone for architects who demand total visual control. Its near-perfect uniform jet-black surface, devoid of any visible grain or mineral variation, creates an effect of pure, bold modernity.

With a hardness of 7 on the Mohs scale, Absolute Black is among the most durable natural stones on earth — making it equally suited to heavy-traffic commercial flooring as to precision-engineered kitchen worktops. The flamed finish creates a beautifully rough, anti-slip surface ideal for exterior terraces and pool decks.`,
    metaTitle: 'Absolute Black Granite Slabs — India | Granite Gallery Kishangarh',
    metaDescription: 'Premium Absolute Black Granite from Karnataka. Polished, flamed & honed finishes. Zero grain. Commercial & residential. Export from Kishangarh.',
    whatsappMsg: "Hello, I'm interested in Absolute Black Granite. Please share slab availability and pricing.",
    faqs: [
      {
        question: "Is Absolute Black Granite genuinely zero-grain and uniform?",
        answer: "Yes. Our premium selection of Absolute Black Granite is sourced directly from specialized Deccanese quarries, offering an exceptionally uniform, deep black appearance with practically zero mineral grains or variance."
      },
      {
        question: "Does Absolute Black Granite require regular sealing?",
        answer: "Because it is extremely dense and has a water absorption rate under 0.08%, Absolute Black Granite requires much less sealing than marble. A single application every 2-3 years is typically sufficient for full protection."
      },
      {
        question: "Can this granite withstand high heat in kitchens?",
        answer: "Absolutely. Granite is naturally heat-resistant. You can place hot pots and pans directly onto Absolute Black Granite countertops without risking scorch marks or thermal cracking."
      }
    ]
  },
  {
    slug: 'jade-green-onyx',
    name: 'Jade Green Onyx',
    pageTitle: 'Jade Green Onyx — Translucent Luxury',
    type: 'onyx',
    origin: 'Tehran, Iran',
    primaryColor: 'Deep emerald green with white and gold veining',
    finish: 'Backlit Grade Polished',
    tag: 'Exclusive',
    finishesAvailable: ['polished'],
    applications: ['backlit-feature-walls', 'bar-counters', 'bathroom'],
    sizes: ['2400×1200mm', '1800×900mm', 'Custom'],
    specifications: {
      density: '2.65 g/cm³',
      compressiveStrength: '88 MPa',
      waterAbsorption: '< 0.3%',
      hardness: '3.5 Mohs',
    },
    gallery: [
      'https://images.unsplash.com/photo-1625479610681-f789345a8157?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85&fm=webp',
    ],
    heroImage: 'https://images.unsplash.com/photo-1625479610681-f789345a8157?w=1800&q=90&fm=webp',
    description: 'When backlit, Jade Green Onyx transforms into an otherworldly emerald lantern — nature\'s finest artwork.',
    longDescription: `Sourced from ancient deposits in Iran, Jade Green Onyx is one of the rarest and most visually dramatic stones in the natural world. Its deep emerald green translucency — interlaced with flowing white and gold veining — creates an almost ethereal glow when illuminated from behind.

This remarkable property makes it the definitive choice for statement backlit feature walls in hotel lobbies, luxury bars, and executive boardrooms. Each slab is a unique geological fingerprint, making every installation a singular work of art that cannot be replicated.`,
    metaTitle: 'Jade Green Onyx — Backlit Slabs Export | Granite Gallery',
    metaDescription: 'Premium Jade Green Onyx slabs from Iran. Backlit grade polished finish. Translucent emerald luxury stone. Export from Kishangarh.',
    whatsappMsg: "Hello, I'm interested in Jade Green Onyx. Please share slab availability and backlighting options.",
    faqs: [
      {
        question: "How is the backlighting effect for Jade Green Onyx set up?",
        answer: "To achieve the classic glowing effect, custom LED panels are installed behind the slab on a sturdy acrylic or glass support frame. This illuminates the stone's translucent emerald crystal matrix and flowing veins beautifully."
      },
      {
        question: "Is Onyx durable enough for kitchen countertops?",
        answer: "Onyx is a softer, more delicate stone with a hardness of 3.5 Mohs. While stunning, it is not recommended for high-traffic kitchen worktops due to its susceptibility to scratching and acid etching. It is best suited for vanity tops, bar fronts, and feature walls."
      },
      {
        question: "What maintenance does Jade Green Onyx require?",
        answer: "Onyx must be sealed immediately upon installation using a high-grade impregnating sealer. Clean only with specialized, non-acidic stone care solutions and wipe spills immediately."
      }
    ]
  },
  {
    slug: 'volakas-white-marble',
    name: 'Volakas Classic',
    pageTitle: 'Volakas White Marble — The Mediterranean Classic',
    type: 'marble',
    origin: 'Drama, Greece',
    primaryColor: 'Warm white with delicate grey & rose veining',
    finish: 'Polished',
    tag: 'Popular',
    finishesAvailable: ['polished', 'honed', 'brushed'],
    applications: ['flooring', 'wall-cladding', 'bathroom', 'staircase'],
    sizes: ['2800×1600mm', '600×600mm', '600×300mm', '300×300mm'],
    specifications: {
      density: '2.68 g/cm³',
      compressiveStrength: '108 MPa',
      waterAbsorption: '< 0.25%',
      flexuralStrength: '11.2 MPa',
      hardness: '3 Mohs',
    },
    gallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85&fm=webp',
    ],
    heroImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1800&q=90&fm=webp',
    description: 'Volakas carries the warmth of the Aegean — a refined white marble with delicate rose and grey veining.',
    longDescription: `Quarried near the city of Drama in northern Greece, Volakas Marble is celebrated for its warm, creamy-white base adorned with elegant, delicate veining in soft grey and subtle rose tones. It possesses the quiet sophistication of classic Mediterranean architecture.

Its relative consistency of patterning makes it an excellent choice for large-format floor installations and dramatic staircase runs where a cohesive, refined aesthetic is essential. Volakas polishes to a beautiful high-sheen surface while its honed finish offers a more understated, matte luxuriousness.`,
    metaTitle: 'Volakas White Greek Marble Slabs | Granite Gallery Kishangarh',
    metaDescription: 'Premium Volakas White Marble from Greece. Warm white with delicate grey veining. Polished & honed finishes. Direct export from Kishangarh.',
    whatsappMsg: "Hello, I'm interested in Volakas Classic Marble. Please share slab availability and pricing.",
    faqs: [
      {
        question: "Where is Volakas Marble sourced and what are its key features?",
        answer: "Volakas Marble is quarried in Drama, Greece. It is known for its warm, creamy white backdrop and elegant diagonal veins in soft grey and faint rose colors, offering a classic Mediterranean feel."
      },
      {
        question: "Is Volakas Marble durable enough for high-traffic flooring?",
        answer: "Yes. Volakas is a dense marble with a compressive strength of 108 MPa. It is widely used for hotel lobbies and villas, though regular sealing is advised to protect against foot-traffic staining."
      },
      {
        question: "Can Volakas marble be customized to specific tile sizes?",
        answer: "Yes, we process Volakas at our Kishangarh facility in custom gang-saw slabs, standard 600x600mm tiles, and custom-tailored staircase steps."
      }
    ]
  },
  {
    slug: 'rainforest-brown-marble',
    name: 'Rainforest Brown',
    pageTitle: 'Rainforest Brown — India\'s Exotic Luxury Stone',
    type: 'exotic',
    origin: 'Rajasthan, India',
    primaryColor: 'Rich brown with golden and cream organic veining',
    finish: 'Antique Finish',
    tag: 'Rare',
    finishesAvailable: ['polished', 'antique', 'brushed', 'sandblasted'],
    applications: ['flooring', 'wall-cladding', 'exterior-cladding', 'landscaping'],
    sizes: ['2400×1200mm', '600×600mm', '600×300mm', 'Random'],
    specifications: {
      density: '2.64 g/cm³',
      compressiveStrength: '95 MPa',
      waterAbsorption: '< 0.35%',
      flexuralStrength: '10.8 MPa',
      hardness: '3 Mohs',
    },
    gallery: [
      'https://images.unsplash.com/photo-1601897690942-bcacbad33e55?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1400&q=85&fm=webp',
      'https://images.unsplash.com/photo-1625479610681-f789345a8157?w=1400&q=85&fm=webp',
    ],
    heroImage: 'https://images.unsplash.com/photo-1601897690942-bcacbad33e55?w=1800&q=90&fm=webp',
    description: 'Inspired by the organic flow of ancient rainforests — a one-of-a-kind exotic marble from Rajasthan.',
    longDescription: `Rainforest Brown is one of India's most celebrated exotic natural stones. Quarried from select zones in Rajasthan, its deep, rich brown base is animated by flowing organic veining in warm gold and cream — creating a visual texture that genuinely resembles an aerial view of a tropical forest canopy.

Its unique patterning means no two slabs are identical, making every installation a completely bespoke artistic expression. The antique finish enhances its natural character while the polished finish delivers a warm, glossy depth perfect for interior feature walls and premium flooring in luxury hotels and heritage residences.`,
    metaTitle: 'Rainforest Brown Indian Marble — Exotic Stone | Granite Gallery',
    metaDescription: 'Rainforest Brown exotic marble from Rajasthan. Rich brown with gold veining. Antique & polished finishes. Export worldwide from Kishangarh.',
    whatsappMsg: "Hello, I'm interested in Rainforest Brown Marble. Please share slab availability and pricing.",
    faqs: [
      {
        question: "What makes Rainforest Brown Marble unique?",
        answer: "Rainforest Brown is a highly exotic stone from Rajasthan, India, characterized by an intricate network of dark brown and gold veining that resembles a tropical forest canopy. It is exceptionally hard for a marble and takes an excellent antique finish."
      },
      {
        question: "Can Rainforest Brown be used for outdoor landscaping?",
        answer: "Yes. Unlike most European marbles, Rainforest Brown possesses high resistance to weathering and can be used on outdoor cladding, pool surrounds, and landscaping with an antique or sandblasted finish."
      },
      {
        question: "What finish best highlights the texture of Rainforest Brown?",
        answer: "The 'Antique Finish' is highly recommended, as it brushes away the softer minerals in the veining, creating a tactile, three-dimensional textured surface that highlights the stone's organic character."
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Collection stones — Sandstone · Limestone · Slate · Porphyry · Quartzite
  // Data web-researched (origin + headline specs); ranges marked "class-typical"
  // are stone-class values pending varietal lab data / client verification.
  // Images are placeholders pending client photography.
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: "english-teak-sandstone",
    name: "English Teak",
    pageTitle: "English Teak Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Nagaur, Rajasthan",
    primaryColor: "Golden-brown with dark wood-grain veining",
    colorFamily: ["brown", "yellow"],
    finish: "Natural",
    tag: "Bestseller",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_hero.webp", "/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_catalog.webp", "/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_catalog.webp",
    description: "English Teak is a sandstone from Nagaur, Rajasthan, characterised by its golden-brown with dark wood-grain veining. Part of the celebrated teakwood family, its straight grain mimics polished timber.",
    longDescription: "English Teak is quarried in Nagaur, Rajasthan and is distinguished by its golden-brown with dark wood-grain veining. Part of the celebrated teakwood family, its straight grain mimics polished timber. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, English Teak suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports English Teak worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "English Teak Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "English Teak sandstone from Nagaur, Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["english teak sandstone", "english teak sandstone price", "sandstone supplier india", "english teak tiles", "nagaur sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in English Teak Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is English Teak sandstone quarried?",
        answer: "English Teak is quarried in Nagaur, Rajasthan. Part of the celebrated teakwood family, its straight grain mimics polished timber. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for English Teak?",
        answer: "English Teak is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for English Teak?",
        answer: "We supply English Teak in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "mp-beige-sandstone",
    name: "MP Beige",
    pageTitle: "MP Beige Sandstone — Natural Stone from Madhya Pradesh",
    type: "sandstone",
    origin: "Madhya Pradesh",
    primaryColor: "Soft, uniform beige",
    colorFamily: ["beige"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/mp-beige-sandstone/mp-beige-sandstone_hero.webp", "/images/collections/sandstone/mp-beige-sandstone/mp-beige-sandstone_catalog.webp", "/images/collections/sandstone/mp-beige-sandstone/mp-beige-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/mp-beige-sandstone/mp-beige-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/mp-beige-sandstone/mp-beige-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/mp-beige-sandstone/mp-beige-sandstone_catalog.webp",
    description: "MP Beige is a sandstone from Madhya Pradesh, characterised by its soft, uniform beige. Prized for its calm, even tone and consistent fine grain.",
    longDescription: "MP Beige is quarried in Madhya Pradesh and is distinguished by its soft, uniform beige. Prized for its calm, even tone and consistent fine grain. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, MP Beige suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports MP Beige worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "MP Beige Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "MP Beige sandstone from Madhya Pradesh — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["mp beige sandstone", "mp beige sandstone price", "sandstone supplier india", "mp beige tiles", "madhya pradesh sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in MP Beige Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is MP Beige sandstone quarried?",
        answer: "MP Beige is quarried in Madhya Pradesh. Prized for its calm, even tone and consistent fine grain. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for MP Beige?",
        answer: "MP Beige is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for MP Beige?",
        answer: "We supply MP Beige in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "woodland-buff-sandstone",
    name: "Woodland Buff",
    pageTitle: "Woodland Buff Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Rajasthan",
    primaryColor: "Warm buff with brown wood-grain bands",
    colorFamily: ["brown", "beige"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/woodland-buff-sandstone/gallery/woodland.png", "/images/collections/sandstone/woodland-buff-sandstone/gallery/woodland_flooring.png", "/images/collections/sandstone/woodland-buff-sandstone/gallery/woodland_kitchen.png"],
    heroImage: "/images/collections/sandstone/woodland-buff-sandstone/woodland-buff-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/woodland-buff-sandstone/woodland-buff-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/woodland-buff-sandstone/woodland-buff-sandstone_catalog.webp",
    description: "Woodland Buff is a sandstone from Rajasthan, characterised by its warm buff with brown wood-grain bands. A riven, earthy stone popular for rustic patios and garden paving.",
    longDescription: "Woodland Buff is quarried in Rajasthan and is distinguished by its warm buff with brown wood-grain bands. A riven, earthy stone popular for rustic patios and garden paving. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Woodland Buff suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Woodland Buff worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Woodland Buff Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Woodland Buff sandstone from Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["woodland buff sandstone", "woodland buff sandstone price", "sandstone supplier india", "woodland buff tiles", "rajasthan sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Woodland Buff Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Woodland Buff sandstone quarried?",
        answer: "Woodland Buff is quarried in Rajasthan. A riven, earthy stone popular for rustic patios and garden paving. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Woodland Buff?",
        answer: "Woodland Buff is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Woodland Buff?",
        answer: "We supply Woodland Buff in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "leheriya-sandstone",
    name: "Leheriya",
    pageTitle: "Leheriya Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Rajasthan",
    primaryColor: "Multicolour with wave-like banding",
    colorFamily: ["multi"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/leheriya-sandstone/leheriya-sandstone_hero.webp", "/images/collections/sandstone/leheriya-sandstone/leheriya-sandstone_catalog.webp", "/images/collections/sandstone/leheriya-sandstone/leheriya-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/leheriya-sandstone/leheriya-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/leheriya-sandstone/leheriya-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/leheriya-sandstone/leheriya-sandstone_catalog.webp",
    description: "Leheriya is a sandstone from Rajasthan, characterised by its multicolour with wave-like banding. Named for its leheriya (wave) patterning of brown, gold and grey.",
    longDescription: "Leheriya is quarried in Rajasthan and is distinguished by its multicolour with wave-like banding. Named for its leheriya (wave) patterning of brown, gold and grey. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Leheriya suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Leheriya worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Leheriya Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Leheriya sandstone from Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["leheriya sandstone", "leheriya sandstone price", "sandstone supplier india", "leheriya tiles", "rajasthan sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Leheriya Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Leheriya sandstone quarried?",
        answer: "Leheriya is quarried in Rajasthan. Named for its leheriya (wave) patterning of brown, gold and grey. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Leheriya?",
        answer: "Leheriya is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Leheriya?",
        answer: "We supply Leheriya in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "raveena-sandstone",
    name: "Raveena",
    pageTitle: "Raveena Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Rajasthan",
    primaryColor: "Pale pink-beige with subtle veining",
    colorFamily: ["pink", "beige"],
    finish: "Natural",
    tag: "Popular",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/raveena-sandstone/raveena-sandstone_hero.webp", "/images/collections/sandstone/raveena-sandstone/raveena-sandstone_catalog.webp", "/images/collections/sandstone/raveena-sandstone/raveena-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/raveena-sandstone/raveena-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/raveena-sandstone/raveena-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/raveena-sandstone/raveena-sandstone_catalog.webp",
    description: "Raveena is a sandstone from Rajasthan, characterised by its pale pink-beige with subtle veining. One of India’s most exported paving sandstones, valued for its calibrated consistency.",
    longDescription: "Raveena is quarried in Rajasthan and is distinguished by its pale pink-beige with subtle veining. One of India’s most exported paving sandstones, valued for its calibrated consistency. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Raveena suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Raveena worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Raveena Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Raveena sandstone from Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["raveena sandstone", "raveena sandstone price", "sandstone supplier india", "raveena tiles", "rajasthan sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Raveena Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Raveena sandstone quarried?",
        answer: "Raveena is quarried in Rajasthan. One of India’s most exported paving sandstones, valued for its calibrated consistency. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Raveena?",
        answer: "Raveena is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Raveena?",
        answer: "We supply Raveena in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "kandla-grey-sandstone",
    name: "Kandla Grey",
    pageTitle: "Kandla Grey Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Rajasthan",
    primaryColor: "Cool blue-grey",
    colorFamily: ["grey"],
    finish: "Natural",
    tag: "Bestseller",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "< 3%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/kandla-grey-sandstone/kandla-grey-sandstone_hero.webp", "/images/collections/sandstone/kandla-grey-sandstone/kandla-grey-sandstone_catalog.webp", "/images/collections/sandstone/kandla-grey-sandstone/kandla-grey-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/kandla-grey-sandstone/kandla-grey-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/kandla-grey-sandstone/kandla-grey-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/kandla-grey-sandstone/kandla-grey-sandstone_catalog.webp",
    description: "Kandla Grey is a sandstone from Rajasthan, characterised by its cool blue-grey. Its exceptionally low porosity (~3%) gives near-granite weather resistance.",
    longDescription: "Kandla Grey is quarried in Rajasthan and is distinguished by its cool blue-grey. Its exceptionally low porosity (~3%) gives near-granite weather resistance. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Kandla Grey suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Kandla Grey worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Kandla Grey Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Kandla Grey sandstone from Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["kandla grey sandstone", "kandla grey sandstone price", "sandstone supplier india", "kandla grey tiles", "rajasthan sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Kandla Grey Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Kandla Grey sandstone quarried?",
        answer: "Kandla Grey is quarried in Rajasthan. Its exceptionally low porosity (~3%) gives near-granite weather resistance. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Kandla Grey?",
        answer: "Kandla Grey is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Kandla Grey?",
        answer: "We supply Kandla Grey in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "autumn-brown-sandstone",
    name: "Autumn Brown",
    pageTitle: "Autumn Brown Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Rajasthan",
    primaryColor: "Tan, buff and brown riven tones",
    colorFamily: ["brown"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/autumn-brown-sandstone/autumn-brown-sandstone_hero.webp", "/images/collections/sandstone/autumn-brown-sandstone/autumn-brown-sandstone_catalog.webp", "/images/collections/sandstone/autumn-brown-sandstone/autumn-brown-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/autumn-brown-sandstone/autumn-brown-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/autumn-brown-sandstone/autumn-brown-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/autumn-brown-sandstone/autumn-brown-sandstone_catalog.webp",
    description: "Autumn Brown is a sandstone from Rajasthan, characterised by its tan, buff and brown riven tones. Its warm autumnal palette deepens beautifully when wet.",
    longDescription: "Autumn Brown is quarried in Rajasthan and is distinguished by its tan, buff and brown riven tones. Its warm autumnal palette deepens beautifully when wet. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Autumn Brown suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Autumn Brown worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Autumn Brown Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Autumn Brown sandstone from Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["autumn brown sandstone", "autumn brown sandstone price", "sandstone supplier india", "autumn brown tiles", "rajasthan sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Autumn Brown Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Autumn Brown sandstone quarried?",
        answer: "Autumn Brown is quarried in Rajasthan. Its warm autumnal palette deepens beautifully when wet. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Autumn Brown?",
        answer: "Autumn Brown is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Autumn Brown?",
        answer: "We supply Autumn Brown in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "raj-green-sandstone",
    name: "Raj Green",
    pageTitle: "Raj Green Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Rajasthan",
    primaryColor: "Light green with brown and plum tones",
    colorFamily: ["green"],
    finish: "Natural",
    tag: "Popular",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/raj-green-sandstone/raj-green-sandstone_hero.webp", "/images/collections/sandstone/raj-green-sandstone/raj-green-sandstone_catalog.webp", "/images/collections/sandstone/raj-green-sandstone/raj-green-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/raj-green-sandstone/raj-green-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/raj-green-sandstone/raj-green-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/raj-green-sandstone/raj-green-sandstone_catalog.webp",
    description: "Raj Green is a sandstone from Rajasthan, characterised by its light green with brown and plum tones. A worldwide favourite for paving and restoration; the green tones intensify when wet.",
    longDescription: "Raj Green is quarried in Rajasthan and is distinguished by its light green with brown and plum tones. A worldwide favourite for paving and restoration; the green tones intensify when wet. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Raj Green suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Raj Green worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Raj Green Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Raj Green sandstone from Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["raj green sandstone", "raj green sandstone price", "sandstone supplier india", "raj green tiles", "rajasthan sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Raj Green Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Raj Green sandstone quarried?",
        answer: "Raj Green is quarried in Rajasthan. A worldwide favourite for paving and restoration; the green tones intensify when wet. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Raj Green?",
        answer: "Raj Green is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Raj Green?",
        answer: "We supply Raj Green in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "kahareda-brown-sandstone",
    name: "Kahareda Brown",
    pageTitle: "Kahareda Brown Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Kahareda, Rajasthan",
    primaryColor: "Earthy reddish-brown",
    colorFamily: ["brown"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/kahareda-brown-sandstone/kahareda-brown-sandstone_hero.webp", "/images/collections/sandstone/kahareda-brown-sandstone/kahareda-brown-sandstone_catalog.webp", "/images/collections/sandstone/kahareda-brown-sandstone/kahareda-brown-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/kahareda-brown-sandstone/kahareda-brown-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/kahareda-brown-sandstone/kahareda-brown-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/kahareda-brown-sandstone/kahareda-brown-sandstone_catalog.webp",
    description: "Kahareda Brown is a sandstone from Kahareda, Rajasthan, characterised by its earthy reddish-brown. Quarried near Kahareda and valued for its rich, even brown body.",
    longDescription: "Kahareda Brown is quarried in Kahareda, Rajasthan and is distinguished by its earthy reddish-brown. Quarried near Kahareda and valued for its rich, even brown body. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Kahareda Brown suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Kahareda Brown worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Kahareda Brown Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Kahareda Brown sandstone from Kahareda, Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["kahareda brown sandstone", "kahareda brown sandstone price", "sandstone supplier india", "kahareda brown tiles", "kahareda sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Kahareda Brown Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Kahareda Brown sandstone quarried?",
        answer: "Kahareda Brown is quarried in Kahareda, Rajasthan. Quarried near Kahareda and valued for its rich, even brown body. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Kahareda Brown?",
        answer: "Kahareda Brown is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Kahareda Brown?",
        answer: "We supply Kahareda Brown in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "red-teak-sandstone",
    name: "Red Teak",
    pageTitle: "Red Teak Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Rajasthan",
    primaryColor: "Red-brown with wood-grain veining",
    colorFamily: ["red", "brown"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/red-teak-sandstone/red-teak-sandstone_hero.webp", "/images/collections/sandstone/red-teak-sandstone/red-teak-sandstone_catalog.webp", "/images/collections/sandstone/red-teak-sandstone/red-teak-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/red-teak-sandstone/red-teak-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/red-teak-sandstone/red-teak-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/red-teak-sandstone/red-teak-sandstone_catalog.webp",
    description: "Red Teak is a sandstone from Rajasthan, characterised by its red-brown with wood-grain veining. A red-toned member of the teakwood family with striking linear grain.",
    longDescription: "Red Teak is quarried in Rajasthan and is distinguished by its red-brown with wood-grain veining. A red-toned member of the teakwood family with striking linear grain. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Red Teak suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Red Teak worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Red Teak Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Red Teak sandstone from Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["red teak sandstone", "red teak sandstone price", "sandstone supplier india", "red teak tiles", "rajasthan sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Red Teak Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Red Teak sandstone quarried?",
        answer: "Red Teak is quarried in Rajasthan. A red-toned member of the teakwood family with striking linear grain. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Red Teak?",
        answer: "Red Teak is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Red Teak?",
        answer: "We supply Red Teak in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "bansi-pink-sandstone",
    name: "Bansi Pink",
    pageTitle: "Bansi Pink Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Bansi Paharpur, Bharatpur, Rajasthan",
    primaryColor: "Soft rose pink",
    colorFamily: ["pink"],
    finish: "Natural",
    tag: "Heritage",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/bansi-pink-sandstone/bansi-pink-sandstone_hero.webp", "/images/collections/sandstone/bansi-pink-sandstone/bansi-pink-sandstone_catalog.webp", "/images/collections/sandstone/bansi-pink-sandstone/bansi-pink-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/bansi-pink-sandstone/bansi-pink-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/bansi-pink-sandstone/bansi-pink-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/bansi-pink-sandstone/bansi-pink-sandstone_catalog.webp",
    description: "Bansi Pink is a sandstone from Bansi Paharpur, Bharatpur, Rajasthan, characterised by its soft rose pink. The same prized pink stone selected for the Ram Mandir at Ayodhya.",
    longDescription: "Bansi Pink is quarried in Bansi Paharpur, Bharatpur, Rajasthan and is distinguished by its soft rose pink. The same prized pink stone selected for the Ram Mandir at Ayodhya. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Bansi Pink suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Bansi Pink worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Bansi Pink Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Bansi Pink sandstone from Bansi Paharpur, Bharatpur, Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["bansi pink sandstone", "bansi pink sandstone price", "sandstone supplier india", "bansi pink tiles", "bansi paharpur sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Bansi Pink Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Bansi Pink sandstone quarried?",
        answer: "Bansi Pink is quarried in Bansi Paharpur, Bharatpur, Rajasthan. The same prized pink stone selected for the Ram Mandir at Ayodhya. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Bansi Pink?",
        answer: "Bansi Pink is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Bansi Pink?",
        answer: "We supply Bansi Pink in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "ebony-green-sandstone",
    name: "Ebony Green",
    pageTitle: "Ebony Green Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Rajasthan",
    primaryColor: "Deep green-black",
    colorFamily: ["green", "black"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/ebony-green-sandstone/ebony-green-sandstone_hero.webp", "/images/collections/sandstone/ebony-green-sandstone/ebony-green-sandstone_catalog.webp", "/images/collections/sandstone/ebony-green-sandstone/ebony-green-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/ebony-green-sandstone/ebony-green-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/ebony-green-sandstone/ebony-green-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/ebony-green-sandstone/ebony-green-sandstone_catalog.webp",
    description: "Ebony Green is a sandstone from Rajasthan, characterised by its deep green-black. A dark, dramatic sandstone for bold contemporary facades.",
    longDescription: "Ebony Green is quarried in Rajasthan and is distinguished by its deep green-black. A dark, dramatic sandstone for bold contemporary facades. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Ebony Green suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Ebony Green worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Ebony Green Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Ebony Green sandstone from Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["ebony green sandstone", "ebony green sandstone price", "sandstone supplier india", "ebony green tiles", "rajasthan sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Ebony Green Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Ebony Green sandstone quarried?",
        answer: "Ebony Green is quarried in Rajasthan. A dark, dramatic sandstone for bold contemporary facades. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Ebony Green?",
        answer: "Ebony Green is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Ebony Green?",
        answer: "We supply Ebony Green in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "gwalior-mint-sandstone",
    name: "Gwalior Mint",
    pageTitle: "Gwalior Mint Sandstone — Natural Stone from Madhya Pradesh",
    type: "sandstone",
    origin: "Gwalior, Madhya Pradesh",
    primaryColor: "Muted yellow with mint-green hints",
    colorFamily: ["yellow", "green"],
    finish: "Natural",
    tag: "Popular",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/gwalior-mint-sandstone/gwalior-mint-sandstone_hero.webp", "/images/collections/sandstone/gwalior-mint-sandstone/gwalior-mint-sandstone_catalog.webp", "/images/collections/sandstone/gwalior-mint-sandstone/gwalior-mint-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/gwalior-mint-sandstone/gwalior-mint-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/gwalior-mint-sandstone/gwalior-mint-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/gwalior-mint-sandstone/gwalior-mint-sandstone_catalog.webp",
    description: "Gwalior Mint is a sandstone from Gwalior, Madhya Pradesh, characterised by its muted yellow with mint-green hints. A sturdy exterior stone widely used for wall cladding and flooring.",
    longDescription: "Gwalior Mint is quarried in Gwalior, Madhya Pradesh and is distinguished by its muted yellow with mint-green hints. A sturdy exterior stone widely used for wall cladding and flooring. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Gwalior Mint suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Gwalior Mint worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Gwalior Mint Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Gwalior Mint sandstone from Gwalior, Madhya Pradesh — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["gwalior mint sandstone", "gwalior mint sandstone price", "sandstone supplier india", "gwalior mint tiles", "gwalior sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Gwalior Mint Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Gwalior Mint sandstone quarried?",
        answer: "Gwalior Mint is quarried in Gwalior, Madhya Pradesh. A sturdy exterior stone widely used for wall cladding and flooring. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Gwalior Mint?",
        answer: "Gwalior Mint is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Gwalior Mint?",
        answer: "We supply Gwalior Mint in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "bansi-paharpur-sandstone",
    name: "Bansi Paharpur",
    pageTitle: "Bansi Paharpur Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Bansi Paharpur, Bharatpur, Rajasthan",
    primaryColor: "Light heritage pink",
    colorFamily: ["pink"],
    finish: "Natural",
    tag: "Heritage",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/bansi-paharpur-sandstone/bansi-paharpur-sandstone_hero.webp", "/images/collections/sandstone/bansi-paharpur-sandstone/bansi-paharpur-sandstone_catalog.webp", "/images/collections/sandstone/bansi-paharpur-sandstone/bansi-paharpur-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/bansi-paharpur-sandstone/bansi-paharpur-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/bansi-paharpur-sandstone/bansi-paharpur-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/bansi-paharpur-sandstone/bansi-paharpur-sandstone_catalog.webp",
    description: "Bansi Paharpur is a sandstone from Bansi Paharpur, Bharatpur, Rajasthan, characterised by its light heritage pink. A premium light-pink sandstone famed for temple and heritage architecture.",
    longDescription: "Bansi Paharpur is quarried in Bansi Paharpur, Bharatpur, Rajasthan and is distinguished by its light heritage pink. A premium light-pink sandstone famed for temple and heritage architecture. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Bansi Paharpur suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Bansi Paharpur worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Bansi Paharpur Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Bansi Paharpur sandstone from Bansi Paharpur, Bharatpur, Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a…",
    keywords: ["bansi paharpur sandstone", "bansi paharpur sandstone price", "sandstone supplier india", "bansi paharpur tiles", "bansi paharpur sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Bansi Paharpur Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Bansi Paharpur sandstone quarried?",
        answer: "Bansi Paharpur is quarried in Bansi Paharpur, Bharatpur, Rajasthan. A premium light-pink sandstone famed for temple and heritage architecture. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Bansi Paharpur?",
        answer: "Bansi Paharpur is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Bansi Paharpur?",
        answer: "We supply Bansi Paharpur in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "ganj-basoda-sandstone",
    name: "Ganj Basoda",
    pageTitle: "Ganj Basoda Sandstone — Natural Stone from Madhya Pradesh",
    type: "sandstone",
    origin: "Ganj Basoda, Madhya Pradesh",
    primaryColor: "Beige and white",
    colorFamily: ["beige", "white"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/ganj-basoda-sandstone/ganj-basoda-sandstone_hero.webp", "/images/collections/sandstone/ganj-basoda-sandstone/ganj-basoda-sandstone_catalog.webp", "/images/collections/sandstone/ganj-basoda-sandstone/ganj-basoda-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/ganj-basoda-sandstone/ganj-basoda-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/ganj-basoda-sandstone/ganj-basoda-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/ganj-basoda-sandstone/ganj-basoda-sandstone_catalog.webp",
    description: "Ganj Basoda is a sandstone from Ganj Basoda, Madhya Pradesh, characterised by its beige and white. From the dimensional-stone hub of Ganj Basoda, available in many calibrated formats.",
    longDescription: "Ganj Basoda is quarried in Ganj Basoda, Madhya Pradesh and is distinguished by its beige and white. From the dimensional-stone hub of Ganj Basoda, available in many calibrated formats. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Ganj Basoda suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Ganj Basoda worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Ganj Basoda Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Ganj Basoda sandstone from Ganj Basoda, Madhya Pradesh — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["ganj basoda sandstone", "ganj basoda sandstone price", "sandstone supplier india", "ganj basoda tiles", "ganj basoda sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Ganj Basoda Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Ganj Basoda sandstone quarried?",
        answer: "Ganj Basoda is quarried in Ganj Basoda, Madhya Pradesh. From the dimensional-stone hub of Ganj Basoda, available in many calibrated formats. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Ganj Basoda?",
        answer: "Ganj Basoda is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Ganj Basoda?",
        answer: "We supply Ganj Basoda in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "khatu-teak-sandstone",
    name: "Khatu Teak",
    pageTitle: "Khatu Teak Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Khatu, Rajasthan",
    primaryColor: "Light yellow with wooden-grain veining",
    colorFamily: ["yellow", "brown"],
    finish: "Natural",
    tag: "Bestseller",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/khatu-teak-sandstone/khatu-teak-sandstone_hero.webp", "/images/collections/sandstone/khatu-teak-sandstone/khatu-teak-sandstone_catalog.webp", "/images/collections/sandstone/khatu-teak-sandstone/khatu-teak-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/khatu-teak-sandstone/khatu-teak-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/khatu-teak-sandstone/khatu-teak-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/khatu-teak-sandstone/khatu-teak-sandstone_catalog.webp",
    description: "Khatu Teak is a sandstone from Khatu, Rajasthan, characterised by its light yellow with wooden-grain veining. The classic teakwood sandstone, quarried near Khatu, with timber-like grain.",
    longDescription: "Khatu Teak is quarried in Khatu, Rajasthan and is distinguished by its light yellow with wooden-grain veining. The classic teakwood sandstone, quarried near Khatu, with timber-like grain. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Khatu Teak suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Khatu Teak worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Khatu Teak Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Khatu Teak sandstone from Khatu, Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["khatu teak sandstone", "khatu teak sandstone price", "sandstone supplier india", "khatu teak tiles", "khatu sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Khatu Teak Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Khatu Teak sandstone quarried?",
        answer: "Khatu Teak is quarried in Khatu, Rajasthan. The classic teakwood sandstone, quarried near Khatu, with timber-like grain. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Khatu Teak?",
        answer: "Khatu Teak is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Khatu Teak?",
        answer: "We supply Khatu Teak in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "balesar-sandstone",
    name: "Balesar",
    pageTitle: "Balesar Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Balesar, Jodhpur, Rajasthan",
    primaryColor: "Pink to light red",
    colorFamily: ["pink", "red"],
    finish: "Natural",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.4 g/cm³",
      compressiveStrength: "40–65 MPa (class-typical)",
      waterAbsorption: "1–6%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/balesar-sandstone/balesar-sandstone_hero.webp", "/images/collections/sandstone/balesar-sandstone/balesar-sandstone_catalog.webp", "/images/collections/sandstone/balesar-sandstone/balesar-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/balesar-sandstone/balesar-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/balesar-sandstone/balesar-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/balesar-sandstone/balesar-sandstone_catalog.webp",
    description: "Balesar is a sandstone from Balesar, Jodhpur, Rajasthan, characterised by its pink to light red. A Jodhpur-belt sandstone known for easy carving and durability.",
    longDescription: "Balesar is quarried in Balesar, Jodhpur, Rajasthan and is distinguished by its pink to light red. A Jodhpur-belt sandstone known for easy carving and durability. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Balesar suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Balesar worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Balesar Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Balesar sandstone from Balesar, Jodhpur, Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["balesar sandstone", "balesar sandstone price", "sandstone supplier india", "balesar tiles", "balesar sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Balesar Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Balesar sandstone quarried?",
        answer: "Balesar is quarried in Balesar, Jodhpur, Rajasthan. A Jodhpur-belt sandstone known for easy carving and durability. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Balesar?",
        answer: "Balesar is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Balesar?",
        answer: "We supply Balesar in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "jodhpur-sandstone",
    name: "Jodhpur Sandstone",
    pageTitle: "Jodhpur Sandstone — Natural Stone from Rajasthan",
    type: "sandstone",
    origin: "Jodhpur, Rajasthan",
    primaryColor: "Pink to red-brown",
    colorFamily: ["pink", "red"],
    finish: "Natural",
    tag: "Bestseller",
    finishesAvailable: ["shot-blast", "bush-hammered", "chiseled", "flamed"],
    applications: ["flooring", "wall-cladding", "exterior-cladding", "staircase"],
    sizes: ["600×600mm", "600×300mm", "560×560mm", "Custom cut-to-size"],
    specifications: {
      density: "2.42 g/cm³",
      compressiveStrength: "~38 MPa",
      waterAbsorption: "1.25%",
      hardness: "6–7 Mohs"
    },
    gallery: ["/images/collections/sandstone/jodhpur-sandstone/jodhpur-sandstone_hero.webp", "/images/collections/sandstone/jodhpur-sandstone/jodhpur-sandstone_catalog.webp", "/images/collections/sandstone/jodhpur-sandstone/jodhpur-sandstone_stand.webp"],
    heroImage: "/images/collections/sandstone/jodhpur-sandstone/jodhpur-sandstone_hero.webp",
    standImage: "/images/collections/sandstone/jodhpur-sandstone/jodhpur-sandstone_stand.webp",
    catalogImage: "/images/collections/sandstone/jodhpur-sandstone/jodhpur-sandstone_catalog.webp",
    description: "Jodhpur Sandstone is a natural stone from Jodhpur, Rajasthan, characterised by its pink to red-brown. A quartz-rich heritage stone (SiO₂ ~96.6%) used across Jodhpur’s historic architecture.",
    longDescription: "Jodhpur Sandstone is quarried in Jodhpur, Rajasthan and is distinguished by its pink to red-brown. A quartz-rich heritage stone (SiO₂ ~96.6%) used across Jodhpur’s historic architecture. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural sandstone, Jodhpur Sandstone suits flooring, wall cladding, exterior cladding and staircase. It is supplied in shot blast, bush hammered, chiseled and flamed finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Jodhpur Sandstone worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Jodhpur Sandstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Jodhpur Sandstone from Jodhpur, Rajasthan — 4 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["jodhpur sandstone", "jodhpur sandstone price", "sandstone supplier india", "jodhpur sandstone tiles", "jodhpur sandstone", "indian sandstone exporter"],
    whatsappMsg: "Hello, I'm interested in Jodhpur Sandstone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Jodhpur Sandstone quarried?",
        answer: "Jodhpur Sandstone is quarried in Jodhpur, Rajasthan. A quartz-rich heritage stone (SiO₂ ~96.6%) used across Jodhpur’s historic architecture. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Jodhpur Sandstone?",
        answer: "Jodhpur Sandstone is ideal for flooring, wall cladding, exterior cladding and staircase. As a natural sandstone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Jodhpur Sandstone?",
        answer: "We supply Jodhpur Sandstone in shot blast, bush hammered, chiseled and flamed finishes and formats including 600×600mm, 600×300mm and 560×560mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "jaisalmer-yellow-limestone",
    name: "Jaisalmer Yellow",
    pageTitle: "Jaisalmer Yellow Limestone — Natural Stone from Rajasthan",
    type: "limestone",
    origin: "Mulsagar, Jaisalmer, Rajasthan",
    primaryColor: "Warm golden-yellow",
    colorFamily: ["yellow"],
    finish: "Honed",
    tag: "Heritage",
    finishesAvailable: ["polished", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "staircase", "tabletops"],
    sizes: ["600×600mm", "600×400mm", "305×305mm", "Custom cut-to-size"],
    specifications: {
      density: "2.53 g/cm³",
      compressiveStrength: "58 MPa",
      waterAbsorption: "1.67%",
      hardness: "3–4 Mohs"
    },
    gallery: [
      "/images/collections/limestone/jaisalmer-yellow-limestone/jaisalmer-yellow-limestone_hero.webp",
      "/images/collections/limestone/jaisalmer-yellow-limestone/jaisalmer-yellow-limestone_catalog.webp",
      "/images/collections/limestone/jaisalmer-yellow-limestone/jaisalmer-yellow-limestone_stand.webp"
    ],
    heroImage: "/images/collections/limestone/jaisalmer-yellow-limestone/jaisalmer-yellow-limestone_hero.webp",
    standImage: "/images/collections/limestone/jaisalmer-yellow-limestone/jaisalmer-yellow-limestone_stand.webp",
    catalogImage: "/images/collections/limestone/jaisalmer-yellow-limestone/jaisalmer-yellow-limestone_catalog.webp",
    subtitle: "Golden yellow limestone of Jaisalmer Fort — iconic warm architectural stone.",
    description: "Jaisalmer Yellow is a limestone from Mulsagar, Jaisalmer, Rajasthan, characterised by its warm golden-yellow. The golden stone of the UNESCO-listed Jaisalmer Fort (“Sonar Qila”).",
    longDescription: "Jaisalmer Yellow is quarried in Mulsagar, Jaisalmer, Rajasthan and is distinguished by its warm golden-yellow. The golden stone of the UNESCO-listed Jaisalmer Fort (“Sonar Qila”). Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural limestone, Jaisalmer Yellow suits flooring, wall cladding, staircase and tabletops. It is supplied in polished, shot blast and bush hammered finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Jaisalmer Yellow worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Jaisalmer Yellow Limestone Slabs & Tiles | Granite Gallery",
    metaDescription: "Jaisalmer Yellow limestone from Mulsagar, Jaisalmer, Rajasthan — 3 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["jaisalmer yellow limestone", "jaisalmer yellow limestone price", "limestone supplier india", "jaisalmer yellow tiles", "mulsagar limestone", "indian limestone exporter"],
    whatsappMsg: "Hello, I'm interested in Jaisalmer Yellow Limestone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Jaisalmer Yellow limestone quarried?",
        answer: "Jaisalmer Yellow is quarried in Mulsagar, Jaisalmer, Rajasthan. The golden stone of the UNESCO-listed Jaisalmer Fort (“Sonar Qila”). We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Jaisalmer Yellow?",
        answer: "Jaisalmer Yellow is ideal for flooring, wall cladding, staircase and tabletops. As a natural limestone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Jaisalmer Yellow?",
        answer: "We supply Jaisalmer Yellow in polished, shot blast and bush hammered finishes and formats including 600×600mm, 600×400mm and 305×305mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "ita-gold-limestone",
    name: "Ita Gold",
    pageTitle: "Ita Gold Limestone — Natural Stone from Rajasthan",
    type: "limestone",
    origin: "Rajasthan",
    primaryColor: "Light-to-medium gold",
    colorFamily: ["yellow"],
    finish: "Honed",
    finishesAvailable: ["polished", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "staircase", "tabletops"],
    sizes: ["600×600mm", "600×400mm", "305×305mm", "Custom cut-to-size"],
    specifications: {
      density: "2.5 g/cm³",
      compressiveStrength: "~58 MPa (class-typical)",
      waterAbsorption: "1–2%",
      hardness: "3–4 Mohs"
    },
    gallery: ["/images/collections/limestone/ita-gold-limestone/ita-gold-limestone_catalog.webp", "/images/collections/limestone/ita-gold-limestone/ita-gold-limestone_stand.webp", "/images/collections/limestone/ita-gold-limestone/ita-gold-limestone_hero.webp"],
    heroImage: "/images/collections/limestone/ita-gold-limestone/ita-gold-limestone_hero.webp",
    standImage: "/images/collections/limestone/ita-gold-limestone/ita-gold-limestone_stand.webp",
    catalogImage: "/images/collections/limestone/ita-gold-limestone/ita-gold-limestone_catalog.webp",
    subtitle: "Stain-resistant, non-slip golden yellow limestone slab for flooring & walls.",
    description: "Ita Gold is a limestone from Rajasthan, characterised by its light-to-medium gold. A stain-resistant, non-slip golden limestone for interior and exterior use.",
    longDescription: "Ita Gold is quarried in Rajasthan and is distinguished by its light-to-medium gold. A stain-resistant, non-slip golden limestone for interior and exterior use. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural limestone, Ita Gold suits flooring, wall cladding, staircase and tabletops. It is supplied in polished, shot blast and bush hammered finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Ita Gold worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Ita Gold Limestone Slabs & Tiles | Granite Gallery",
    metaDescription: "Ita Gold limestone from Rajasthan — 3 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["ita gold limestone", "ita gold limestone price", "limestone supplier india", "ita gold tiles", "rajasthan limestone", "indian limestone exporter"],
    whatsappMsg: "Hello, I'm interested in Ita Gold Limestone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Ita Gold limestone quarried?",
        answer: "Ita Gold is quarried in Rajasthan. A stain-resistant, non-slip golden limestone for interior and exterior use. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Ita Gold?",
        answer: "Ita Gold is ideal for flooring, wall cladding, staircase and tabletops. As a natural limestone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Ita Gold?",
        answer: "We supply Ita Gold in polished, shot blast and bush hammered finishes and formats including 600×600mm, 600×400mm and 305×305mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
/*
  {
    slug: "kadappa-limestone",
    name: "Kadappa",
    pageTitle: "Kadappa Limestone — Natural Stone from Andhra Pradesh",
    type: "limestone",
    origin: "Cuddapah (Kadapa), Andhra Pradesh",
    primaryColor: "Charcoal-black, turning deep black when wet",
    colorFamily: ["black"],
    finish: "Honed",
    tag: "Classic",
    finishesAvailable: ["polished", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "staircase", "tabletops"],
    sizes: ["600×600mm", "600×400mm", "305×305mm", "Custom cut-to-size"],
    specifications: {
      density: "2.7 g/cm³",
      compressiveStrength: "~75 MPa (class-typical)",
      waterAbsorption: "< 0.5%",
      hardness: "3.5 Mohs"
    },
    gallery: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1400&q=85&fm=webp", "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1400&q=85&fm=webp", "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1400&q=85&fm=webp"],
    heroImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1800&q=90&fm=webp",
    description: "Kadappa is a limestone from Cuddapah (Kadapa), Andhra Pradesh, characterised by its charcoal-black, turning deep black when wet. Also called Cuddapah Black; oil-resistant and non-slip, ideal for floors.",
    longDescription: "Kadappa is quarried in Cuddapah (Kadapa), Andhra Pradesh and is distinguished by its charcoal-black, turning deep black when wet. Also called Cuddapah Black; oil-resistant and non-slip, ideal for floors. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural limestone, Kadappa suits flooring, wall cladding, staircase and tabletops. It is supplied in polished, shot blast and bush hammered finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Kadappa worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Kadappa Limestone Slabs & Tiles | Granite Gallery",
    metaDescription: "Kadappa limestone from Cuddapah (Kadapa), Andhra Pradesh — 3 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["kadappa limestone", "kadappa limestone price", "limestone supplier india", "kadappa tiles", "cuddapah (kadapa) limestone", "indian limestone exporter"],
    whatsappMsg: "Hello, I'm interested in Kadappa Limestone. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Kadappa limestone quarried?",
        answer: "Kadappa is quarried in Cuddapah (Kadapa), Andhra Pradesh. Also called Cuddapah Black; oil-resistant and non-slip, ideal for floors. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Kadappa?",
        answer: "Kadappa is ideal for flooring, wall cladding, staircase and tabletops. As a natural limestone it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Kadappa?",
        answer: "We supply Kadappa in polished, shot blast and bush hammered finishes and formats including 600×600mm, 600×400mm and 305×305mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
*/
  {
    slug: "monsoon-slate",
    name: "Monsoon Slate",
    pageTitle: "Monsoon Slate — Natural Stone from Rajasthan",
    type: "slate",
    origin: "Rajasthan",
    primaryColor: "Grey-green multicolour",
    colorFamily: ["grey", "green"],
    finish: "Natural Cleft",
    finishesAvailable: ["leathered", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "exterior-cladding"],
    sizes: ["600×300mm", "300×300mm", "400×400mm", "Random strips"],
    specifications: {
      density: "2.7–2.8 g/cm³",
      compressiveStrength: "~90 MPa (class-typical)",
      waterAbsorption: "< 0.5%",
      hardness: "3–4 Mohs"
    },
    gallery: [
      "/images/collections/slate/monsoon-slate/monsoon-slate_hero.webp",
      "/images/collections/slate/monsoon-slate/monsoon-slate_catalog.webp",
      "/images/collections/slate/monsoon-slate/monsoon-slate_stand.webp"
    ],
    heroImage: "/images/collections/slate/monsoon-slate/monsoon-slate_hero.webp",
    standImage: "/images/collections/slate/monsoon-slate/monsoon-slate_stand.webp",
    catalogImage: "/images/collections/slate/monsoon-slate/monsoon-slate_catalog.webp",
    subtitle: "Naturally riven slate with cloudy grey-green tones and subtle sheen.",
    description: "Monsoon is a slate from Rajasthan, characterised by its grey-green multicolour. A naturally riven slate with cloudy grey-green tones.",
    longDescription: "Monsoon is quarried in Rajasthan and is distinguished by its grey-green multicolour. A naturally riven slate with cloudy grey-green tones. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural slate, Monsoon suits flooring, wall cladding and exterior cladding. It is supplied in leathered, shot blast and bush hammered finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Monsoon worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Monsoon Slate Slabs & Tiles | Granite Gallery",
    metaDescription: "Monsoon slate from Rajasthan — 3 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["monsoon slate", "monsoon slate price", "slate supplier india", "monsoon tiles", "rajasthan slate", "indian slate exporter"],
    whatsappMsg: "Hello, I'm interested in Monsoon Slate. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Monsoon slate quarried?",
        answer: "Monsoon is quarried in Rajasthan. A naturally riven slate with cloudy grey-green tones."
      }
    ],
  },
  {
    slug: "sangarwas-slate",
    name: "Sangarwas Slate",
    pageTitle: "Sangarwas Slate — Natural Stone from Rajasthan",
    type: "slate",
    origin: "Sangarwas, Rajasthan",
    primaryColor: "Earthy multicolour",
    colorFamily: ["multi"],
    finish: "Natural Cleft",
    finishesAvailable: ["leathered", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "exterior-cladding"],
    sizes: ["600×300mm", "300×300mm", "400×400mm", "Random strips"],
    specifications: {
      density: "2.7–2.8 g/cm³",
      compressiveStrength: "~90 MPa (class-typical)",
      waterAbsorption: "< 0.5%",
      hardness: "3–4 Mohs"
    },
    gallery: [
      "/images/collections/slate/sangarwas-slate/sangarwas-slate_hero.webp",
      "/images/collections/slate/sangarwas-slate/sangarwas-slate_catalog.webp",
      "/images/collections/slate/sangarwas-slate/sangarwas-slate_stand.webp"
    ],
    heroImage: "/images/collections/slate/sangarwas-slate/sangarwas-slate_hero.webp",
    standImage: "/images/collections/slate/sangarwas-slate/sangarwas-slate_stand.webp",
    catalogImage: "/images/collections/slate/sangarwas-slate/sangarwas-slate_catalog.webp",
    subtitle: "Regional Rajasthani slate with warm rustic earthy banding.",
    description: "Sangarwas is a slate from Sangarwas, Rajasthan, characterised by its earthy multicolour. A regional Rajasthani slate with warm rustic banding.",
    longDescription: "Sangarwas is quarried in Sangarwas, Rajasthan and is distinguished by its earthy multicolour. A regional Rajasthani slate with warm rustic banding. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural slate, Sangarwas suits flooring, wall cladding and exterior cladding.",
    metaTitle: "Sangarwas Slate Slabs & Tiles | Granite Gallery",
    metaDescription: "Sangarwas slate from Sangarwas, Rajasthan — 3 finishes. Ideal for flooring and wall cladding. Direct export from Kishangarh.",
    keywords: ["sangarwas slate", "sangarwas slate price", "slate supplier india"],
    whatsappMsg: "Hello, I'm interested in Sangarwas Slate. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Sangarwas slate quarried?",
        answer: "Sangarwas is quarried in Sangarwas, Rajasthan."
      }
    ],
  },
  {
    slug: "silver-gray-slate",
    name: "Silver Gray Slate",
    pageTitle: "Silver Gray Slate — Natural Stone from Rajasthan",
    type: "slate",
    origin: "Rajasthan",
    primaryColor: "Silver-grey",
    colorFamily: ["grey"],
    finish: "Natural Cleft",
    finishesAvailable: ["leathered", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "exterior-cladding"],
    sizes: ["600×300mm", "300×300mm", "400×400mm", "Random strips"],
    specifications: {
      density: "2.7–2.8 g/cm³",
      compressiveStrength: "~90 MPa (class-typical)",
      waterAbsorption: "< 0.5%",
      hardness: "3–4 Mohs"
    },
    gallery: [
      "/images/collections/slate/silver-gray-slate/silver-gray-slate_hero.webp",
      "/images/collections/slate/silver-gray-slate/silver-gray-slate_catalog.webp",
      "/images/collections/slate/silver-gray-slate/silver-gray-slate_stand.webp"
    ],
    heroImage: "/images/collections/slate/silver-gray-slate/silver-gray-slate_hero.webp",
    standImage: "/images/collections/slate/silver-gray-slate/silver-gray-slate_stand.webp",
    catalogImage: "/images/collections/slate/silver-gray-slate/silver-gray-slate_catalog.webp",
    subtitle: "Cool, contemporary silver-grey slate with soft metallic sheen.",
    description: "Silver Gray is a slate from Rajasthan, characterised by its silver-grey. A cool, contemporary slate with a soft metallic sheen.",
    longDescription: "Silver Gray is quarried in Rajasthan and is distinguished by its silver-grey. A cool, contemporary slate with a soft metallic sheen. Each block is hand-selected and processed at our Kishangarh facility.",
    metaTitle: "Silver Gray Slate Slabs & Tiles | Granite Gallery",
    metaDescription: "Silver Gray slate from Rajasthan — 3 finishes. Ideal for flooring and wall cladding.",
    keywords: ["silver gray slate", "silver gray slate price"],
    whatsappMsg: "Hello, I'm interested in Silver Gray Slate. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Silver Gray slate quarried?",
        answer: "Silver Gray is quarried in Rajasthan."
      }
    ],
  },
  {
    slug: "matrix-slate",
    name: "Matrix Slate",
    pageTitle: "Matrix Slate — Natural Stone from India",
    type: "slate",
    origin: "India",
    primaryColor: "Dark multicolour",
    colorFamily: ["multi"],
    finish: "Natural Cleft",
    finishesAvailable: ["leathered", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "exterior-cladding"],
    sizes: ["600×300mm", "300×300mm", "400×400mm", "Random strips"],
    specifications: {
      density: "2.7–2.8 g/cm³",
      compressiveStrength: "~90 MPa (class-typical)",
      waterAbsorption: "< 0.5%",
      hardness: "3–4 Mohs"
    },
    gallery: [
      "/images/collections/slate/matrix-slate/matrix-slate_hero.webp",
      "/images/collections/slate/matrix-slate/matrix-slate_catalog.webp",
      "/images/collections/slate/matrix-slate/matrix-slate_stand.webp"
    ],
    heroImage: "/images/collections/slate/matrix-slate/matrix-slate_hero.webp",
    standImage: "/images/collections/slate/matrix-slate/matrix-slate_stand.webp",
    catalogImage: "/images/collections/slate/matrix-slate/matrix-slate_catalog.webp",
    subtitle: "Bold blended dark multicolour slate for architectural feature facades.",
    description: "Matrix is a slate from India, characterised by its dark multicolour. A bold blended slate for feature walls and façades.",
    longDescription: "Matrix is quarried in India and is distinguished by its dark multicolour. A bold blended slate for feature walls and façades. Processed at our Kishangarh facility.",
    metaTitle: "Matrix Slate Slabs & Tiles | Granite Gallery",
    metaDescription: "Matrix slate from India — 3 finishes. Ideal for feature walls and cladding.",
    keywords: ["matrix slate", "matrix slate price"],
    whatsappMsg: "Hello, I'm interested in Matrix Slate. Please share pricing.",
    faqs: [
      {
        question: "Where is Matrix slate quarried?",
        answer: "Matrix is quarried in India."
      }
    ],
  },
  {
    slug: "raymond-slate",
    name: "Raymond Slate",
    pageTitle: "Raymond Slate — Natural Stone from India",
    type: "slate",
    origin: "India",
    primaryColor: "Grey-black blend",
    colorFamily: ["grey", "black"],
    finish: "Natural Cleft",
    finishesAvailable: ["leathered", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "exterior-cladding"],
    sizes: ["600×300mm", "300×300mm", "400×400mm", "Random strips"],
    specifications: {
      density: "2.7–2.8 g/cm³",
      compressiveStrength: "~90 MPa (class-typical)",
      waterAbsorption: "< 0.5%",
      hardness: "3–4 Mohs"
    },
    gallery: [
      "/images/collections/slate/raymond-slate/raymond-slate_hero.webp",
      "/images/collections/slate/raymond-slate/raymond-slate_catalog.webp",
      "/images/collections/slate/raymond-slate/raymond-slate_stand.webp"
    ],
    heroImage: "/images/collections/slate/raymond-slate/raymond-slate_hero.webp",
    standImage: "/images/collections/slate/raymond-slate/raymond-slate_stand.webp",
    catalogImage: "/images/collections/slate/raymond-slate/raymond-slate_catalog.webp",
    subtitle: "Consistent grey-black slate suited for heavy cladding & flooring.",
    description: "Raymond is a slate from India, characterised by its grey-black blend. A consistent grey-black slate suited to cladding and flooring.",
    longDescription: "Raymond is quarried in India and is distinguished by its grey-black blend. A consistent grey-black slate suited to cladding and flooring.",
    metaTitle: "Raymond Slate Slabs & Tiles | Granite Gallery",
    metaDescription: "Raymond slate from India — 3 finishes. Ideal for cladding & flooring.",
    keywords: ["raymond slate", "raymond slate price"],
    whatsappMsg: "Hello, I'm interested in Raymond Slate. Please share pricing.",
    faqs: [
      {
        question: "Where is Raymond slate quarried?",
        answer: "Raymond is quarried in India."
      }
    ],
  },
  {
    slug: "himachal-slate",
    name: "Himachal Slate",
    pageTitle: "Himachal Slate — Natural Stone from Himachal Pradesh",
    type: "slate",
    origin: "Himachal Pradesh",
    primaryColor: "Consistent jet black",
    colorFamily: ["black"],
    finish: "Natural Cleft",
    tag: "Popular",
    finishesAvailable: ["leathered", "shot-blast", "bush-hammered"],
    applications: ["flooring", "wall-cladding", "exterior-cladding"],
    sizes: ["600×300mm", "300×300mm", "400×400mm", "Random strips"],
    specifications: {
      density: "2.7–2.8 g/cm³",
      compressiveStrength: "~90 MPa (class-typical)",
      waterAbsorption: "< 0.4%",
      hardness: "3–4 Mohs"
    },
    gallery: [
      "/images/collections/slate/himachal-slate/himachal-slate_hero.webp",
      "/images/collections/slate/himachal-slate/himachal-slate_catalog.webp",
      "/images/collections/slate/himachal-slate/himachal-slate_stand.webp"
    ],
    heroImage: "/images/collections/slate/himachal-slate/himachal-slate_hero.webp",
    standImage: "/images/collections/slate/himachal-slate/himachal-slate_stand.webp",
    catalogImage: "/images/collections/slate/himachal-slate/himachal-slate_catalog.webp",
    subtitle: "Non-porous grano-blastic black slate — fireproof and anti-slip.",
    description: "Himachal Slate is a natural stone from Himachal Pradesh, characterised by its consistent jet black. A non-porous, fine grano-blastic black slate that is fireproof and non-slip.",
    longDescription: "Himachal Slate is quarried in Himachal Pradesh and is distinguished by its consistent jet black. A non-porous, fine grano-blastic black slate that is fireproof and non-slip.",
    metaTitle: "Himachal Slate Slabs & Tiles | Granite Gallery",
    metaDescription: "Himachal Slate from Himachal Pradesh — 3 finishes. Ideal for flooring and wall cladding.",
    keywords: ["himachal slate", "himachal slate price"],
    whatsappMsg: "Hello, I'm interested in Himachal Slate. Please share pricing.",
    faqs: [
      {
        question: "Where is Himachal Slate quarried?",
        answer: "Himachal Slate is quarried in Himachal Pradesh."
      }
    ],
  },
  {
    slug: "marine-soapstone",
    name: "Marine Soapstone",
    pageTitle: "Marine Soapstone Slate — Natural Stone from India",
    type: "slate",
    origin: "India",
    primaryColor: "Deep ocean grey-green",
    colorFamily: ["grey", "green"],
    finish: "Honed / Smooth",
    tag: "Exotic",
    finishesAvailable: ["honed", "polished", "leathered"],
    applications: ["flooring", "kitchen-countertops", "wall-cladding", "fireplaces"],
    sizes: ["600×300mm", "600×600mm", "Gang-saw slabs"],
    specifications: {
      density: "2.75 g/cm³",
      compressiveStrength: "~100 MPa",
      waterAbsorption: "< 0.2%",
      hardness: "3 Mohs"
    },
    gallery: [
      "/images/collections/slate/marine-soapstone/marine-soapstone_hero.webp",
      "/images/collections/slate/marine-soapstone/marine-soapstone_catalog.webp",
      "/images/collections/slate/marine-soapstone/marine-soapstone_stand.webp"
    ],
    heroImage: "/images/collections/slate/marine-soapstone/marine-soapstone_hero.webp",
    standImage: "/images/collections/slate/marine-soapstone/marine-soapstone_stand.webp",
    catalogImage: "/images/collections/slate/marine-soapstone/marine-soapstone_catalog.webp",
    subtitle: "Silky smooth heat-resistant soapstone with oceanic grey-green veining.",
    description: "Marine Soapstone is a dense, silky-smooth natural stone with rich ocean grey-green hues, renowned for high thermal resistance.",
    longDescription: "Marine Soapstone is quarried in India and processed in Kishangarh. Its high talc content gives it an unmistakable soft touch, complete chemical imperviousness, and extraordinary heat retention.",
    metaTitle: "Marine Soapstone Slabs & Tiles | Granite Gallery",
    metaDescription: "Marine Soapstone from India — honed heat-resistant stone for countertops & fireplaces.",
    keywords: ["marine soapstone", "soapstone india", "soapstone slabs"],
    whatsappMsg: "Hello, I'm interested in Marine Soapstone. Please share pricing.",
    faqs: [
      {
        question: "Is Marine Soapstone heat resistant?",
        answer: "Yes, soapstone is impervious to thermal shock and acids."
      }
    ],
  },
  {
    slug: "multi-porphyry",
    name: "Multi Porphyry",
    pageTitle: "Multi Porphyry — Natural Stone from India",
    type: "porphyry",
    origin: "India",
    primaryColor: "Grey, green, purple and red blend",
    colorFamily: ["multi"],
    finish: "Natural",
    tag: "Durable",
    finishesAvailable: ["flamed", "shot-blast", "bush-hammered", "chiseled"],
    applications: ["flooring", "exterior-cladding", "staircase"],
    sizes: ["Random cobbles", "100×100mm setts", "300×300mm", "Cut-to-size"],
    specifications: {
      density: "2.6 g/cm³",
      compressiveStrength: "> 150 MPa",
      waterAbsorption: "< 0.4%",
      hardness: "7 Mohs"
    },
    gallery: ["https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1400&q=85&fm=webp", "https://images.unsplash.com/photo-1601897690942-bcacbad33e55?w=1400&q=85&fm=webp", "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1400&q=85&fm=webp"],
    heroImage: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1800&q=90&fm=webp",
    description: "Multi Porphyry is a natural stone from India, characterised by its grey, green, purple and red blend. A dense volcanic rock (~70% silica) that hides dirt and resists stains.",
    longDescription: "Multi Porphyry is quarried in India and is distinguished by its grey, green, purple and red blend. A dense volcanic rock (~70% silica) that hides dirt and resists stains. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural porphyry, Multi Porphyry suits flooring, exterior cladding and staircase. It is supplied in flamed, shot blast, bush hammered and chiseled finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Multi Porphyry worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Multi Porphyry Slabs & Tiles | Granite Gallery",
    metaDescription: "Multi Porphyry from India — 4 finishes. Ideal for flooring and exterior cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["multi porphyry", "multi porphyry price", "porphyry supplier india", "multi porphyry tiles", "india porphyry", "indian porphyry exporter"],
    whatsappMsg: "Hello, I'm interested in Multi Porphyry. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Multi Porphyry quarried?",
        answer: "Multi Porphyry is quarried in India. A dense volcanic rock (~70% silica) that hides dirt and resists stains. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Multi Porphyry?",
        answer: "Multi Porphyry is ideal for flooring, exterior cladding and staircase. As a natural porphyry it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Multi Porphyry?",
        answer: "We supply Multi Porphyry in flamed, shot blast, bush hammered and chiseled finishes and formats including Random cobbles, 100×100mm setts and 300×300mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "black-porphyry",
    name: "Black Porphyry",
    pageTitle: "Black Porphyry — Natural Stone from India",
    type: "porphyry",
    origin: "India",
    primaryColor: "Dark charcoal-black",
    colorFamily: ["black"],
    finish: "Natural",
    finishesAvailable: ["flamed", "shot-blast", "bush-hammered", "chiseled"],
    applications: ["flooring", "exterior-cladding", "staircase"],
    sizes: ["Random cobbles", "100×100mm setts", "300×300mm", "Cut-to-size"],
    specifications: {
      density: "2.6 g/cm³",
      compressiveStrength: "> 150 MPa",
      waterAbsorption: "< 0.4%",
      hardness: "7 Mohs"
    },
    gallery: ["https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1400&q=85&fm=webp", "https://images.unsplash.com/photo-1601897690942-bcacbad33e55?w=1400&q=85&fm=webp", "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1400&q=85&fm=webp"],
    heroImage: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1800&q=90&fm=webp",
    description: "Black Porphyry is a natural stone from India, characterised by its dark charcoal-black. A hard-wearing volcanic paver for high-traffic outdoor surfaces.",
    longDescription: "Black Porphyry is quarried in India and is distinguished by its dark charcoal-black. A hard-wearing volcanic paver for high-traffic outdoor surfaces. Each block is hand-selected and processed at our Kishangarh facility for consistent colour, thickness and calibration across every consignment.\n\nAs a natural porphyry, Black Porphyry suits flooring, exterior cladding and staircase. It is supplied in flamed, shot blast, bush hammered and chiseled finishes and a range of slab and tile formats for both interior and exterior projects. Granite Gallery exports Black Porphyry worldwide, with quality checks at every stage from quarry to container.",
    metaTitle: "Black Porphyry Slabs & Tiles | Granite Gallery",
    metaDescription: "Black Porphyry from India — 4 finishes. Ideal for flooring and exterior cladding. Direct export from Kishangarh. Get a quote.",
    keywords: ["black porphyry", "black porphyry price", "porphyry supplier india", "black porphyry tiles", "india porphyry", "indian porphyry exporter"],
    whatsappMsg: "Hello, I'm interested in Black Porphyry. Please share slab/tile sizes and pricing.",
    faqs: [
      {
        question: "Where is Black Porphyry quarried?",
        answer: "Black Porphyry is quarried in India. A hard-wearing volcanic paver for high-traffic outdoor surfaces. We source it directly and process every block at our Kishangarh, Rajasthan facility for consistent quality."
      },
      {
        question: "What are the best applications for Black Porphyry?",
        answer: "Black Porphyry is ideal for flooring, exterior cladding and staircase. As a natural porphyry it performs well indoors and outdoors; our team can advise the right finish and thickness for your use."
      },
      {
        question: "Which finishes and sizes are available for Black Porphyry?",
        answer: "We supply Black Porphyry in flamed, shot blast, bush hammered and chiseled finishes and formats including Random cobbles, 100×100mm setts and 300×300mm plus custom cut-to-size. Share your requirement and we will confirm availability and pricing."
      }
    ],
  },
  {
    slug: "kandla-lining-quartzite",
    name: "Kandla Lining Quartzite",
    pageTitle: "Kandla Lining Quartzite — Natural Stone from Rajasthan",
    type: "quartzite",
    origin: "Rajasthan, India",
    primaryColor: "Linear Silver-Grey",
    colorFamily: ["grey"],
    finish: "Natural / Honed",
    tag: "Bestseller",
    finishesAvailable: ["polished", "honed", "leathered", "flamed", "shot-blast"],
    applications: ["flooring", "kitchen-countertops", "wall-cladding", "exterior-cladding"],
    sizes: ["600×600mm", "600×300mm", "Gang-saw slabs", "Custom tiles"],
    specifications: {
      density: "2.65 g/cm³",
      compressiveStrength: "> 165 MPa",
      waterAbsorption: "0.25%",
      hardness: "7 Mohs"
    },
    gallery: [
      "/images/collections/quartzite/kandla-lining-quartzite/kandla-lining-quartzite_hero.webp",
      "/images/collections/quartzite/kandla-lining-quartzite/kandla-lining-quartzite_catalog.webp",
      "/images/collections/quartzite/kandla-lining-quartzite/kandla-lining-quartzite_stand.webp"
    ],
    heroImage: "/images/collections/quartzite/kandla-lining-quartzite/kandla-lining-quartzite_hero.webp",
    standImage: "/images/collections/quartzite/kandla-lining-quartzite/kandla-lining-quartzite_stand.webp",
    catalogImage: "/images/collections/quartzite/kandla-lining-quartzite/kandla-lining-quartzite_catalog.webp",
    subtitle: "Linear-grained silver-grey quartzite slab with high flexural strength.",
    description: "Kandla Lining Quartzite is a premium silver-grey natural quartzite quarried in Rajasthan, featuring distinctive parallel linear graining and extreme surface hardness.",
    longDescription: "Kandla Lining Quartzite is quarried in Rajasthan, India, and processed at our state-of-the-art Kishangarh gangsaw facility. Known for its sophisticated silver-grey palette and clean linear striping, this dense quartzitic stone offers superior Mohs 7 hardness and near-zero water absorption.\n\nIt is ideally suited for interior flooring, luxury kitchen countertops, architectural feature walls, and exterior facade cladding in both residential and commercial projects worldwide.",
    metaTitle: "Kandla Lining Quartzite Slabs & Tiles | Granite Gallery",
    metaDescription: "Kandla Lining Quartzite from Rajasthan — linear silver-grey quartzite slabs & tiles. Export quality from Kishangarh. Get a quote.",
    keywords: ["kandla lining quartzite", "kandla lining quartzite price", "linear grey quartzite", "rajasthan quartzite exporter"],
    whatsappMsg: "Hello, I'm interested in Kandla Lining Quartzite. Please share pricing and slab availability.",
    faqs: [
      {
        question: "What makes Kandla Lining Quartzite unique?",
        answer: "Kandla Lining Quartzite is distinguished by its uniform parallel graining and neutral silver-grey tone. It is exceptionally hard (7 Mohs) and stain-resistant."
      },
      {
        question: "Is Kandla Lining Quartzite suitable for outdoor cladding?",
        answer: "Yes, due to its high density, weather resistance, and low absorption, it performs exceptionally well for exterior facades, pool decks, and architectural cladding."
      }
    ]
  },
  {
    slug: "roma-grey-quartzite",
    name: "Roma Grey Quartzite",
    pageTitle: "Roma Grey Quartzite — Natural Stone from Rajasthan",
    type: "quartzite",
    origin: "Rajasthan, India",
    primaryColor: "Smokey Grey & Charcoal",
    colorFamily: ["grey", "black"],
    finish: "Polished",
    tag: "Premium",
    finishesAvailable: ["polished", "leathered", "honed", "flamed"],
    applications: ["flooring", "kitchen-countertops", "wall-cladding", "bathroom-vanities"],
    sizes: ["Gang-saw slabs", "600×600mm", "800×800mm", "Custom cut-to-size"],
    specifications: {
      density: "2.68 g/cm³",
      compressiveStrength: "> 170 MPa",
      waterAbsorption: "0.20%",
      hardness: "7 Mohs"
    },
    gallery: [
      "/images/collections/quartzite/roma-grey-quartzite/roma-grey-quartzite_hero.webp",
      "/images/collections/quartzite/roma-grey-quartzite/roma-grey-quartzite_catalog.webp",
      "/images/collections/quartzite/roma-grey-quartzite/roma-grey-quartzite_stand.webp"
    ],
    heroImage: "/images/collections/quartzite/roma-grey-quartzite/roma-grey-quartzite_hero.webp",
    standImage: "/images/collections/quartzite/roma-grey-quartzite/roma-grey-quartzite_stand.webp",
    catalogImage: "/images/collections/quartzite/roma-grey-quartzite/roma-grey-quartzite_catalog.webp",
    subtitle: "Sophisticated dark & light grey quartzite with subtle crystalline veining.",
    description: "Roma Grey Quartzite is an elegant grey stone featuring deep smokey tones, graphite veins, and crystalline quartz highlights.",
    longDescription: "Roma Grey Quartzite brings timeless Roman elegance to modern architecture. Sourced directly from Rajasthan mines and processed in Kishangarh, it displays a rich backdrop of mid-to-dark grey tones infused with delicate white quartz movement.\n\nStronger and more scratch-resistant than marble, Roma Grey is a top choice for kitchen islands, high-traffic commercial flooring, and feature accent walls.",
    metaTitle: "Roma Grey Quartzite Slabs & Tiles | Granite Gallery",
    metaDescription: "Roma Grey Quartzite from Rajasthan — polished grey quartzite slabs for luxury interiors & countertops. Direct export from Kishangarh.",
    keywords: ["roma grey quartzite", "roma grey quartzite price", "grey quartzite slabs", "rajasthan grey stone"],
    whatsappMsg: "Hello, I'm interested in Roma Grey Quartzite. Please share pricing and slab availability.",
    faqs: [
      {
        question: "Is Roma Grey Quartzite durable for kitchen counters?",
        answer: "Yes, Roma Grey is a true quartzite with 7 Mohs hardness, making it resistant to scratches, heat, and kitchen acid etching."
      }
    ]
  },
  {
    slug: "sea-shell-quartzite",
    name: "Sea Shell Quartzite",
    pageTitle: "Sea Shell Quartzite — Natural Stone from Rajasthan",
    type: "quartzite",
    origin: "Rajasthan, India",
    primaryColor: "Pearl Beige & Fossil Grey",
    colorFamily: ["beige", "grey"],
    finish: "Polished",
    tag: "Exotic",
    finishesAvailable: ["polished", "leathered", "honed"],
    applications: ["flooring", "kitchen-countertops", "wall-cladding", "feature-walls"],
    sizes: ["Gang-saw slabs", "600×600mm", "Custom cut-to-size"],
    specifications: {
      density: "2.64 g/cm³",
      compressiveStrength: "> 160 MPa",
      waterAbsorption: "0.22%",
      hardness: "7 Mohs"
    },
    gallery: [
      "/images/collections/quartzite/sea-shell-quartzite/sea-shell-quartzite_hero.webp",
      "/images/collections/quartzite/sea-shell-quartzite/sea-shell-quartzite_catalog.webp",
      "/images/collections/quartzite/sea-shell-quartzite/sea-shell-quartzite_stand.webp"
    ],
    heroImage: "/images/collections/quartzite/sea-shell-quartzite/sea-shell-quartzite_hero.webp",
    standImage: "/images/collections/quartzite/sea-shell-quartzite/sea-shell-quartzite_stand.webp",
    catalogImage: "/images/collections/quartzite/sea-shell-quartzite/sea-shell-quartzite_catalog.webp",
    subtitle: "Exotic fossilised ocean-pattern quartzite with pearlescent lustre.",
    description: "Sea Shell Quartzite is a striking natural stone with subtle shell-like fossil motifs, warm pearlescent tones, and crystalline quartz depth.",
    longDescription: "Sea Shell Quartzite is one of Rajasthan's most exquisite natural stones. Quarried in select deposits and processed with high precision, it features warm cream, pearl, and soft grey waves resembling natural sea bed formations.\n\nIt is ideal for luxury interior feature walls, master bathroom vanities, resort flooring, and high-end residential countertops.",
    metaTitle: "Sea Shell Quartzite Slabs & Tiles | Granite Gallery",
    metaDescription: "Sea Shell Quartzite from Rajasthan — pearlescent fossil quartzite slabs for luxury feature walls & counters. Direct supply from Kishangarh.",
    keywords: ["sea shell quartzite", "sea shell quartzite price", "fossil quartzite", "exotic indian quartzite"],
    whatsappMsg: "Hello, I'm interested in Sea Shell Quartzite. Please share pricing and slab availability.",
    faqs: [
      {
        question: "What finishes look best on Sea Shell Quartzite?",
        answer: "A high-gloss polished finish enhances its pearlescent depth and shell patterns, while a leathered finish gives a luxurious tactile texture."
      }
    ]
  },
  {
    slug: "kandla-quartzite",
    name: "Kandla Grey Quartzite",
    pageTitle: "Kandla Grey Quartzite — Natural Stone from Rajasthan",
    type: "quartzite",
    origin: "Rajasthan, India",
    primaryColor: "Silver-grey",
    colorFamily: ["grey"],
    finish: "Natural / Honed",
    tag: "Popular",
    finishesAvailable: ["polished", "leathered", "flamed", "shot-blast"],
    applications: ["flooring", "kitchen-countertops", "wall-cladding", "exterior-cladding"],
    sizes: ["600×600mm", "610×305mm", "Custom slabs"],
    specifications: {
      density: "2.65 g/cm³",
      compressiveStrength: "> 155 MPa",
      waterAbsorption: "0.3%",
      hardness: "7 Mohs"
    },
    gallery: [
      "/images/collections/quartzite/kandla-quartzite/kandla-quartzite_hero.webp",
      "/images/collections/quartzite/kandla-quartzite/kandla-quartzite_catalog.webp",
      "/images/collections/quartzite/kandla-quartzite/kandla-quartzite_stand.webp"
    ],
    heroImage: "/images/collections/quartzite/kandla-quartzite/kandla-quartzite_hero.webp",
    standImage: "/images/collections/quartzite/kandla-quartzite/kandla-quartzite_stand.webp",
    catalogImage: "/images/collections/quartzite/kandla-quartzite/kandla-quartzite_catalog.webp",
    subtitle: "Durable silver-grey natural quartzite for heavy-duty paving & flooring.",
    description: "Kandla Grey is a classic quartzite from Rajasthan, characterized by its elegant silver-grey palette and exceptional resistance to weathering.",
    longDescription: "Kandla Grey is quarried in Rajasthan and is distinguished by its uniform silver-grey tone. Marketed across Europe and global markets as a premier grey quartzite, it features extremely low porosity (~0.3%) and Mohs 7 hardness.\n\nEach block is hand-selected and processed at our Kishangarh facility. Suitable for interior flooring, kitchen countertops, wall cladding, and exterior landscaping paving.",
    metaTitle: "Kandla Grey Quartzite Slabs & Tiles | Granite Gallery",
    metaDescription: "Kandla Grey Quartzite from Rajasthan — durable grey quartzite slabs & tiles. Direct export from Kishangarh.",
    keywords: ["kandla grey quartzite", "kandla quartzite price", "quartzite supplier india", "kandla grey tiles"],
    whatsappMsg: "Hello, I'm interested in Kandla Grey Quartzite. Please share pricing and sizes.",
    faqs: [
      {
        question: "Where is Kandla Grey quartzite quarried?",
        answer: "Kandla Grey is quarried in Rajasthan and processed at our Kishangarh facility."
      }
    ]
  },
  {
    slug: "woodland-quartzite",
    name: "Woodland Quartzite",
    pageTitle: "Woodland Quartzite — Natural Stone from Rajasthan",
    type: "quartzite",
    origin: "Rajasthan, India",
    primaryColor: "Buff-brown with wood-grain bands",
    colorFamily: ["brown", "beige"],
    finish: "Natural / Honed",
    finishesAvailable: ["polished", "leathered", "flamed", "shot-blast"],
    applications: ["flooring", "kitchen-countertops", "wall-cladding", "exterior-cladding"],
    sizes: ["600×600mm", "610×305mm", "Custom slabs"],
    specifications: {
      density: "2.62 g/cm³",
      compressiveStrength: "> 150 MPa",
      waterAbsorption: "0.35%",
      hardness: "7 Mohs"
    },
    gallery: [
      "/images/collections/quartzite/woodland-quartzite/woodland-quartzite_hero.webp",
      "/images/collections/quartzite/woodland-quartzite/woodland-quartzite_catalog.webp",
      "/images/collections/quartzite/woodland-quartzite/woodland-quartzite_stand.webp"
    ],
    heroImage: "/images/collections/quartzite/woodland-quartzite/woodland-quartzite_hero.webp",
    standImage: "/images/collections/quartzite/woodland-quartzite/woodland-quartzite_stand.webp",
    catalogImage: "/images/collections/quartzite/woodland-quartzite/woodland-quartzite_catalog.webp",
    subtitle: "Warm buff-brown quartzite with natural timber-like grain and high density.",
    description: "Woodland is a quartzitic stone from Rajasthan characterized by its warm buff-brown tones and natural wood-grain banding patterns.",
    longDescription: "Woodland Quartzite combines the rustic aesthetic of timber with the indestructible strength of natural quartzite. Quarried in Rajasthan and processed in Kishangarh, it is ideal for warm-toned interior flooring, feature walls, and outdoor patios.",
    metaTitle: "Woodland Quartzite Slabs & Tiles | Granite Gallery",
    metaDescription: "Woodland Quartzite from Rajasthan — timber-pattern buff brown quartzite slabs. Direct export from Kishangarh.",
    keywords: ["woodland quartzite", "woodland stone india", "brown quartzite rajasthan"],
    whatsappMsg: "Hello, I'm interested in Woodland Quartzite. Please share pricing.",
    faqs: [
      {
        question: "Where is Woodland quartzite quarried?",
        answer: "Woodland Quartzite is quarried in Rajasthan and processed at our Kishangarh facility."
      }
    ]
  },
  {
    slug: "bansi-pink-quartzite",
    name: "Bansi Pink Quartzite",
    pageTitle: "Bansi Pink Quartzite — Natural Stone from Rajasthan",
    type: "quartzite",
    origin: "Rajasthan, India",
    primaryColor: "Soft Pink",
    colorFamily: ["pink"],
    finish: "Natural / Honed",
    finishesAvailable: ["polished", "leathered", "flamed", "shot-blast"],
    applications: ["flooring", "kitchen-countertops", "wall-cladding", "exterior-cladding"],
    sizes: ["600×600mm", "610×305mm", "Custom slabs"],
    specifications: {
      density: "2.63 g/cm³",
      compressiveStrength: "> 155 MPa",
      waterAbsorption: "0.3%",
      hardness: "7 Mohs"
    },
    gallery: [
      "/images/collections/quartzite/bansi-pink-quartzite/bansi-pink-quartzite_hero.webp",
      "/images/collections/quartzite/bansi-pink-quartzite/bansi-pink-quartzite_catalog.webp",
      "/images/collections/quartzite/bansi-pink-quartzite/bansi-pink-quartzite_stand.webp"
    ],
    heroImage: "/images/collections/quartzite/bansi-pink-quartzite/bansi-pink-quartzite_hero.webp",
    standImage: "/images/collections/quartzite/bansi-pink-quartzite/bansi-pink-quartzite_stand.webp",
    catalogImage: "/images/collections/quartzite/bansi-pink-quartzite/bansi-pink-quartzite_catalog.webp",
    subtitle: "Soft pink to salmon quartzitic stone with exceptional weather resistance.",
    description: "Bansi Pink Quartzite is a famous soft-pink quartzitic stone from Rajasthan, renowned for its serene color tone and architectural heritage usage.",
    longDescription: "Bansi Pink Quartzite is quarried in Rajasthan, India. Celebrated for its delicate salmon-pink shade, this ultra-durable stone resists weathering, moisture, and acid etching, making it a preferred choice for sacred monuments, luxury hotel cladding, and pool surroundings.",
    metaTitle: "Bansi Pink Quartzite Slabs & Tiles | Granite Gallery",
    metaDescription: "Bansi Pink Quartzite from Rajasthan — elegant pink quartzite slabs. Direct export from Kishangarh.",
    keywords: ["bansi pink quartzite", "pink quartzite india", "rajasthan pink stone"],
    whatsappMsg: "Hello, I'm interested in Bansi Pink Quartzite. Please share pricing.",
    faqs: [
      {
        question: "Where is Bansi Pink quartzite quarried?",
        answer: "Bansi Pink is quarried in Rajasthan and processed at our Kishangarh facility."
      }
    ]
  }
];
