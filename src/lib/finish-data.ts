// ============================================================
// src/lib/finish-data.ts
// All surface finish types offered by Granite Gallery.
// Source: Company records (handwritten notes)
// Finishes: Leather, Latino, Shot Blast, Flamed, Hydro Blast,
//           Chiseled, Plain/Polished, Rock Face, Bush Hammered, Acid Wash
// ============================================================

import { FAQItem } from '@/types';

export interface Finish {
  slug: string;
  name: string;
  pageTitle?: string;
  subtitle: string;
  description: string;
  longDescription: string;
  texture: 'smooth' | 'rough' | 'textured' | 'matte' | 'glossy';
  maintenanceLevel: 'low' | 'medium' | 'high';
  bestFor: string[];     // Stone types best suited for this finish
  applications: string[]; // Best use cases
  pros: string[];
  cons: string[];
  careInstructions: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  faqs?: FAQItem[];
}

// ── Compulsory Starter Mock Fallback ──────────────────────────
export const mockFinishFallback: Finish = {
  slug: 'polished',
  name: 'Mirror Polished',
  pageTitle: 'Mirror Polish Finish — The Classic Luxury Standard',
  subtitle: 'The timeless high-gloss surface that defines luxury stone',
  texture: 'glossy',
  maintenanceLevel: 'medium',
  description: 'A mirror-polished finish delivers maximum reflectivity, bringing out the deepest colours and veining in natural stone.',
  longDescription: `The mirror polish is the definitive luxury stone finish. Achieved through a progressive sequence of abrasive polishing — from coarse grinding all the way to ultra-fine diamond-pad buffing — a polished finish transforms the natural crystalline structure of stone into a brilliantly reflective surface.

The process reveals the stone's truest colour depth, saturation, and the finest details of its veining. A polished Calacatta slab, for example, becomes a mirror of dramatic geological art. The surface is also naturally denser and less porous than untreated stone, offering improved resistance to staining.`,
  bestFor: ['marble', 'granite', 'quartzite', 'limestone'],
  applications: ['Kitchen Countertops', 'Bathroom Vanities', 'Feature Walls', 'Flooring', 'Staircase Treads'],
  pros: [
    'Maximum colour depth and visual vibrancy',
    'Highly reflective — brightens spaces',
    'Denser, less porous surface',
    'Easy to clean and wipe down',
  ],
  cons: [
    'Shows scratches and fingerprints more easily',
    'Slippery when wet — not ideal for outdoor use',
    'Requires regular sealing on porous stones',
  ],
  careInstructions: 'Clean with a pH-neutral stone cleaner and a soft microfibre cloth. Reseal annually on marble. Avoid acidic cleaners (vinegar, lemon) which etch the surface.',
  image: '/images/finishes/polished.webp',
  metaTitle: 'Mirror Polished Stone Finish | Granite Gallery Kishangarh',
  metaDescription: 'Mirror polished marble and granite finish — maximum colour depth and luxury reflectivity. Available on all stone types. Export from Kishangarh.',
  faqs: [
    {
      question: "What are the primary benefits of a Mirror Polished finish?",
      answer: "A polished finish creates a high-gloss, highly reflective surface that maximizes the depth and vibrancy of the stone's natural colors and veining. It is also naturally denser and more stain-resistant than textured finishes."
    },
    {
      question: "Is a polished finish safe for bathroom floors?",
      answer: "No, a highly polished stone surface becomes very slippery when wet. For bathroom floors or outdoor paving, we recommend honed, leathered, or textured finishes to ensure proper slip resistance underfoot."
    },
    {
      question: "How often should polished marble be sealed?",
      answer: "Polished marble should be sealed with a high-quality impregnating sealer every 12 to 18 months in residential settings to maintain its barrier against moisture and stains."
    }
  ]
};

// ── Production Finishes Collection ────────────────────────────
export const finishesData: Finish[] = [
  {
    slug: 'polished',
    name: 'Mirror Polished',
    pageTitle: 'Mirror Polish Finish — The Classic Luxury Standard',
    subtitle: 'The timeless high-gloss surface that defines luxury stone',
    texture: 'glossy',
    maintenanceLevel: 'medium',
    description: 'A mirror-polished finish delivers maximum reflectivity, bringing out the deepest colours and veining in natural stone.',
    longDescription: `The mirror polish is the definitive luxury stone finish. Achieved through progressive abrasive polishing — from coarse grinding to ultra-fine diamond-pad buffing — it transforms stone into a brilliantly reflective surface. The process reveals the stone's truest colour depth, saturation, and the finest details of its veining.`,
    bestFor: ['marble', 'granite', 'quartzite', 'limestone'],
    applications: ['Kitchen Countertops', 'Bathroom Vanities', 'Feature Walls', 'Flooring', 'Staircase Treads'],
    pros: ['Maximum colour depth', 'Highly reflective', 'Denser surface', 'Easy to clean'],
    cons: ['Shows scratches & fingerprints', 'Slippery when wet', 'Requires regular sealing'],
    careInstructions: 'Use pH-neutral cleaner and soft cloth. Reseal annually on marble. Avoid acidic cleaners.',
    image: '/images/finishes/polished.webp',
    metaTitle: 'Mirror Polished Stone Finish | Granite Gallery',
    metaDescription: 'Mirror polished marble & granite. Maximum colour depth and luxury reflectivity. Direct export from Kishangarh.',
    keywords: ['polished marble finish', 'mirror polish stone', 'polished granite india', 'glossy stone surface', 'high gloss marble'],
    faqs: [
      {
        question: "What are the primary benefits of a Mirror Polished finish?",
        answer: "A polished finish creates a high-gloss, highly reflective surface that maximizes the depth and vibrancy of the stone's natural colors and veining. It is also naturally denser and more stain-resistant than textured finishes."
      },
      {
        question: "Is a polished finish safe for bathroom floors?",
        answer: "No, a highly polished stone surface becomes very slippery when wet. For bathroom floors or outdoor paving, we recommend honed, leathered, or textured finishes to ensure proper slip resistance underfoot."
      },
      {
        question: "How often should polished marble be sealed?",
        answer: "Polished marble should be sealed with a high-quality impregnating sealer every 12 to 18 months in residential settings to maintain its barrier against moisture and stains."
      }
    ]
  },
  {
    slug: 'leathered',
    name: 'Leathered',
    pageTitle: 'Leathered Stone Finish — Organic Luxury Texture',
    subtitle: 'A sophisticated matte texture that highlights natural character',
    texture: 'textured',
    maintenanceLevel: 'low',
    description: 'The leathered finish creates a beautiful, softly-textured matte surface that retains the stone\'s natural pitting and character.',
    longDescription: `The leather finish is created by running diamond-tipped brushes across the stone surface at high speed. This opens and smooths the natural pitting and micro-pores of the stone, creating a supple, slightly undulating texture reminiscent of quality leather. It is the preferred finish for designers seeking a stone surface that feels organic and approachable rather than cold and formal.`,
    bestFor: ['marble', 'granite', 'quartzite'],
    applications: ['Kitchen Islands', 'Bar Countertops', 'Feature Walls', 'Outdoor Terraces'],
    pros: ['Hides fingerprints & smudges', 'Maintains natural stone character', 'Less slippery than polished', 'Sophisticated, understated aesthetic'],
    cons: ['Slightly harder to clean than polished', 'Not ideal for highly polished stone effect'],
    careInstructions: 'Wipe with damp microfibre cloth. Use stone-safe cleaner. Seal every 2 years.',
    image: '/images/finishes/leathered.webp',
    metaTitle: 'Leathered Stone Finish | Granite Gallery Kishangarh',
    metaDescription: 'Leathered marble & granite — organic textured matte finish. Ideal for kitchen countertops and feature walls. Export from Kishangarh.',
    keywords: ['leathered granite finish', 'leather stone surface', 'matte stone texture', 'leathered countertop india', 'leather finish stone india'],
    faqs: [
      {
        question: "What does a Leathered finish feel like?",
        answer: "A leathered finish has a sophisticated matte surface with a subtle, undulating texture that mimics the natural grains of premium leather. It feels soft and tactile rather than cold and formal."
      },
      {
        question: "Why choose leathered stone over polished stone?",
        answer: "Leathered stone is exceptional at hiding smudges, water spots, and fingerprints. This makes it a popular choice for high-use kitchen countertops and bar islands."
      },
      {
        question: "Is leathered stone harder to clean?",
        answer: "Only slightly. Because it has small, natural undulations, dust or flour can sometimes settle in the valleys. However, wiping it down with a damp microfiber cloth and a stone-safe cleaner is all that is required."
      }
    ]
  },
  {
    slug: 'flamed',
    name: 'Flamed',
    pageTitle: 'Flamed Granite Finish — Rough, Bold, Industrial',
    subtitle: 'Intense heat treatment creates a dramatic anti-slip surface',
    texture: 'rough',
    maintenanceLevel: 'low',
    description: 'An extremely high-temperature flame is applied to the stone surface, causing mineral crystals to burst and creating a coarse, non-slip texture.',
    longDescription: `The flamed finish is created by applying an intense oxyacetylene flame directly to the stone surface. The extreme heat causes the mineral crystals within the stone to rapidly expand and burst, producing a rough, naturally textured surface with excellent anti-slip properties. The process also reveals bolder, more contrasted colour tones in granite.`,
    bestFor: ['granite', 'sandstone', 'slate'],
    applications: ['Exterior Paving', 'Pool Decks', 'Steps & Staircases', 'Driveways', 'Exterior Wall Cladding'],
    pros: ['Excellent anti-slip surface', 'Extremely durable', 'Bold, dramatic aesthetic', 'Ideal for outdoor use'],
    cons: ['Rough texture can be uncomfortable underfoot', 'Not suitable for interior countertops'],
    careInstructions: 'Sweep regularly. Pressure wash periodically. Seal every 3 years for outdoor use.',
    image: '/images/finishes/flamed.webp',
    metaTitle: 'Flamed Granite Finish — Anti-Slip Stone | Granite Gallery',
    metaDescription: 'Flamed granite finish — rough, durable, anti-slip surface. Ideal for exterior paving, pool decks & steps. Export from Kishangarh.',
    keywords: ['flamed granite finish', 'anti-slip stone india', 'flamed granite paving', 'outdoor stone finish', 'rough stone surface'],
    faqs: [
      {
        question: "How is a Flamed finish created?",
        answer: "The stone is subjected to intense oxyacetylene heat. This causes the quartz crystals within the stone to burst, leaving a beautifully rough, natural, and highly slip-resistant surface."
      },
      {
        question: "Can all stones be flamed?",
        answer: "No, the flaming process requires stones with quartz crystals, such as granite. Marble and limestone cannot be flamed because they will crack or crumble under the extreme heat."
      },
      {
        question: "What are the best applications for flamed granite?",
        answer: "Due to its high slip-resistance, flamed granite is the gold standard for exterior paving, pool decks, outdoor steps, and walkways."
      }
    ]
  },
  {
    slug: 'shot-blast',
    name: 'Shot Blast',
    pageTitle: 'Shot Blast Finish — Uniform Matte Texture',
    subtitle: 'Steel shots propelled at high velocity create a uniform anti-slip matte finish',
    texture: 'textured',
    maintenanceLevel: 'low',
    description: 'Steel balls are propelled at high velocity against the stone surface, creating a uniformly textured, matte, and slip-resistant finish.',
    longDescription: `Shot blasting involves projecting steel balls or grit at high velocity against the stone surface using a centrifugal blasting wheel. The impact creates a uniformly textured, matte surface that is highly slip-resistant. Unlike the flame finish, shot blasting produces a more consistent and finer texture, making it equally suitable for both interior and exterior applications.`,
    bestFor: ['granite', 'limestone', 'sandstone'],
    applications: ['Commercial Flooring', 'Airport Terminals', 'Pedestrian Walkways', 'Exterior Paving'],
    pros: ['Uniform, consistent texture', 'Excellent anti-slip properties', 'Suitable for high-traffic areas', 'Can be used indoors and outdoors'],
    cons: ['Less visually striking than polished finishes', 'Slightly harder to maintain'],
    careInstructions: 'Regular sweeping and mopping with stone-safe cleaner. Reseal every 2-3 years.',
    image: '/images/finishes/shot-blast.webp',
    metaTitle: 'Shot Blast Stone Finish | Granite Gallery Kishangarh',
    metaDescription: 'Shot blast granite & limestone finish — uniform anti-slip matte texture. Commercial & exterior use. Export from Kishangarh.',
    keywords: ['shot blast stone finish', 'shot blast granite', 'anti-slip stone surface', 'commercial stone finish india', 'matte stone paving'],
    faqs: [
      {
        question: "What is a Shot Blast finish?",
        answer: "Steel shots are propelled at high velocity against the stone surface. This creates a uniform, finely-pitted matte surface with excellent anti-slip characteristics."
      },
      {
        question: "How does shot-blast compare to flamed finishes?",
        answer: "Shot blasting creates a much finer and more consistent texture than flaming, making it suitable for high-traffic interior commercial flooring as well as outdoor paving."
      }
    ]
  },
  {
    slug: 'bush-hammered',
    name: 'Bush Hammered',
    pageTitle: 'Bush Hammered Finish — Artisanal Heritage Texture',
    subtitle: 'Traditional hammer technique creates a rugged, aged natural texture',
    texture: 'rough',
    maintenanceLevel: 'medium',
    description: 'A multi-point chisel hammer repeatedly strikes the stone surface, creating a uniformly pocked texture that evokes aged, heritage stonework.',
    longDescription: `The bush hammered finish is one of the oldest stone finishing techniques, originating from traditional European masonry. A pneumatic or manual hammer fitted with a grid of pointed steel tips is repeatedly applied to the stone surface, creating a uniformly pocked, rough texture. The result closely resembles the aged, weathered appearance of historic stone buildings and monuments.`,
    bestFor: ['granite', 'limestone', 'sandstone', 'marble'],
    applications: ['Heritage Building Restoration', 'Exterior Facades', 'Garden Paths', 'Rustic Flooring'],
    pros: ['Heritage, artisanal aesthetic', 'Excellent grip and anti-slip', 'Evokes aged stone character', 'Durable and long-lasting'],
    cons: ['Labour-intensive and higher cost', 'Rough texture not suitable for all interiors'],
    careInstructions: 'Sweep and hose down regularly. Seal every 3 years for outdoor surfaces.',
    image: '/images/finishes/bush-hammered.webp',
    metaTitle: 'Bush Hammered Stone Finish — Heritage Texture',
    metaDescription: 'Bush hammered granite & limestone — traditional artisanal texture finish. Heritage buildings & exteriors. Export from Kishangarh.',
    keywords: ['bush hammered stone', 'bush hammered granite finish', 'heritage stone texture', 'artisanal stone finish india', 'rough stone exterior finish'],
    faqs: [
      {
        question: "What is a Bush Hammered finish?",
        answer: "A pneumatic hammer with a grid of small pointed tips repeatedly strikes the stone, creating a uniformly pocked, rustic texture that resembles historic masonry."
      },
      {
        question: "What is the maintenance level for bush-hammered stone?",
        answer: "Because of its deep mechanical pits, it is best swept regularly and pressure-washed occasionally when used outdoors. Sealing every 3 years is highly recommended."
      }
    ]
  },
  {
    slug: 'chiseled',
    name: 'Chiseled / Rock Face',
    pageTitle: 'Chiseled Rock Face Finish — Raw Natural Drama',
    subtitle: 'Hand-chiseled edges and faces that expose raw stone geology',
    texture: 'rough',
    maintenanceLevel: 'medium',
    description: 'Chiseling reveals the raw, fractured geology of natural stone — creating highly dramatic, three-dimensional surfaces with bold relief.',
    longDescription: `The chiseled or rock face finish is achieved by splitting and chiseling the stone along its natural cleavage planes, exposing a dramatically uneven, three-dimensional surface. The raw, fractured face reveals the internal geology of the stone in its most primal, unprocessed form. This finish is favoured for exterior feature walls, boundary cladding, and bespoke architectural elements where a bold, natural-drama aesthetic is required.`,
    bestFor: ['granite', 'sandstone', 'slate', 'limestone'],
    applications: ['Exterior Feature Walls', 'Garden Boundary Walls', 'Landscape Architecture', 'Water Features'],
    pros: ['Dramatic three-dimensional surface', 'Unique, non-repeating pattern', 'Exposes natural geology', 'Extremely durable outdoors'],
    cons: ['Not suitable for indoor worktops', 'Difficult to clean due to deep crevices'],
    careInstructions: 'Brush off debris regularly. Occasional pressure wash. No sealing required for exterior granite.',
    image: '/images/finishes/chiseled.webp',
    metaTitle: 'Chiseled Rock Face Stone Finish | Granite Gallery Kishangarh',
    metaDescription: 'Chiseled & rock face granite and sandstone. Bold 3D raw stone finish for feature walls & exteriors. Export from Kishangarh.',
    keywords: ['chiseled stone finish', 'rock face stone india', '3D stone finish', 'chiseled granite', 'rustic stone wall cladding'],
    faqs: [
      {
        question: "What are the primary applications of a chiseled rock-face finish?",
        answer: "This finish is highly dramatic and three-dimensional. It is primarily specified for accent walls, exterior boundary walls, landscape architecture, and water features."
      },
      {
        question: "How do you clean chiseled rock-face stone?",
        answer: "Due to deep crevices, it is best cleaned outdoors with a stiff brush or a high-pressure water hose to remove organic debris."
      }
    ]
  },
  {
    slug: 'acid-wash',
    name: 'Acid Wash',
    pageTitle: 'Acid Wash Finish — Aged Antiqued Stone Effect',
    subtitle: 'Controlled acid etching creates an antiqued, vintage stone surface',
    texture: 'matte',
    maintenanceLevel: 'medium',
    description: 'Controlled acid application etches the stone surface, creating a softly antiqued, aged appearance with a beautiful matte sheen.',
    longDescription: `The acid wash finish involves the controlled application of a dilute acid solution to the stone surface. The acid reacts with the calcium carbonate in marble and limestone, gently etching the surface to create a softly matte, antiqued appearance. The result is reminiscent of century-old stone floors found in Tuscan villas and Rajput palaces. The finish is particularly popular for travertine and limestone for heritage and classical interior projects.`,
    bestFor: ['marble', 'limestone', 'travertine'],
    applications: ['Heritage Interiors', 'Classical Flooring', 'Feature Wall Cladding', 'Bespoke Furniture Tops'],
    pros: ['Beautiful antiqued, aged aesthetic', 'Hides minor imperfections', 'Softer, non-reflective surface', 'Unique, one-of-a-kind finish per slab'],
    cons: ['Reduces natural stone sheen', 'Not suitable for granite', 'Requires careful professional application'],
    careInstructions: 'Use pH-neutral cleaner only. Never use acidic cleaners. Seal annually to protect the etched surface.',
    image: '/images/finishes/acid-wash.webp',
    metaTitle: 'Acid Wash Antiqued Stone Finish | Granite Gallery',
    metaDescription: 'Acid wash antiqued marble & limestone — aged, vintage stone effect. Heritage interiors & classical flooring. Export from Kishangarh.',
    keywords: ['acid wash stone finish', 'antiqued marble finish', 'vintage stone effect', 'aged marble surface', 'acid wash limestone india'],
    faqs: [
      {
        question: "What is an Acid Wash finish?",
        answer: "A diluted acid solution is applied in a controlled setting to etch the surface of calcium-based stones. This creates a soft, vintage, aged matte appearance."
      },
      {
        question: "Is acid wash suitable for granite?",
        answer: "No. Acid wash relies on a chemical reaction with calcium carbonate. Since granite does not contain calcium carbonate, acid washing has no texture effect on it."
      }
    ]
  },
  {
    slug: 'honed',
    name: 'Honed',
    pageTitle: 'Honed Stone Finish — Smooth Matte Elegance',
    subtitle: 'A smooth, non-reflective satin-matte surface that hides foot traffic wear',
    texture: 'matte',
    maintenanceLevel: 'medium',
    description: 'A honed finish offers a smooth, flat surface with a non-reflective satin sheen that conceals scratches and foot traffic wear.',
    longDescription: `The honed finish is created by grinding the stone surface with progressively finer diamond abrasives, stopping short of the high-gloss buffer step. The result is a smooth, satiny matte surface without light reflectivity. Honed surfaces are widely specified by interior architects for modern residential and commercial flooring, as they are far less prone to showing scuffs, scratches, and water spots than polished stone.`,
    bestFor: ['marble', 'limestone', 'slate', 'granite'],
    applications: ['Interior Flooring', 'Wall Cladding', 'Bathroom Floors', 'Staircase Steps', 'Commercial Foyer Flooring'],
    pros: ['Non-reflective smooth satin look', 'Hides foot-traffic scuffs & wear', 'Less slippery than mirror polished', 'Contemporary minimalist aesthetic'],
    cons: ['Slightly more porous than polished', 'Requires quality impregnating sealer'],
    careInstructions: 'Wipe down with pH-neutral cleaner. Avoid harsh acid or bleach. Reseal marble and limestone every 12 to 18 months.',
    image: '/images/finishes/honed.webp',
    metaTitle: 'Honed Stone Finish | Granite Gallery Kishangarh',
    metaDescription: 'Honed marble & limestone — smooth satin matte finish. Ideal for interior flooring & wall cladding. Direct export from Kishangarh.',
    keywords: ['honed marble finish', 'honed limestone', 'matte stone finish india', 'non reflective marble', 'honed floor tiles'],
    faqs: [
      {
        question: "What is a Honed finish?",
        answer: "A honed finish is a smooth, flat surface with a soft satin-matte sheen created by abrasive grinding without final mirror polishing."
      },
      {
        question: "Is honed marble better than polished marble for floors?",
        answer: "Honed marble is less slippery and far better at concealing scratches, etch marks, and high-traffic foot wear, making it a favorite for floors."
      }
    ]
  },
  {
    slug: 'latino',
    name: 'Latino',
    pageTitle: 'Latino Stone Finish — Micro-Textured Velvet Grip',
    subtitle: 'A fine micro-textured matte finish with subtle anti-slip velvet feel',
    texture: 'textured',
    maintenanceLevel: 'low',
    description: 'The Latino finish produces a refined micro-abrasive texture with a velvety matte surface and subtle anti-slip properties.',
    longDescription: `The Latino finish is an innovative mechanical surface treatment combining micro-abrasion with diamond brushing. It creates a subtle, uniform micro-relief across the stone face that feels like brushed velvet underhand while providing reliable slip resistance underfoot. Highly valued for modern interior paving, bathroom floors, and exterior verandah flooring where both tactile comfort and safety are essential.`,
    bestFor: ['granite', 'sandstone', 'limestone'],
    applications: ['Verandah Flooring', 'Bathroom Floor Tiles', 'Pool Decks', 'Interior Courtyards'],
    pros: ['Soft velvet-like tactile grip', 'Subtle anti-slip safety', 'Elegant non-glare surface', 'Easy to maintain'],
    cons: ['Requires periodic stone cleaning', 'Slight reduction in vivid color saturation'],
    careInstructions: 'Clean with mild soap or stone cleaner. Reseal every 2 years.',
    image: '/images/finishes/latino.webp',
    metaTitle: 'Latino Stone Finish | Granite Gallery',
    metaDescription: 'Latino stone finish — micro-textured velvet surface delivering high slip resistance and rich color depth for granite and sandstone. Supply from Kishangarh.',
    keywords: ['latino stone finish', 'micro textured stone', 'latino finish granite', 'velvet grip stone'],
    faqs: [
      {
        question: "What is a Latino finish on stone?",
        answer: "The Latino finish combines micro-abrasion and diamond brushing to give stone a velvet-soft tactile texture with reliable anti-slip properties."
      }
    ]
  },
  {
    slug: 'antique',
    name: 'Antique / Brushed',
    pageTitle: 'Antique Brushed Finish — Historic Patina & Soft Texture',
    subtitle: 'Wire-brushed treatment evoking the natural patina of historic aged stone',
    texture: 'textured',
    maintenanceLevel: 'low',
    description: 'An antique brushed finish uses rotary wire brushes to create a gently worn, historic patina with soft edges and rich tactile character.',
    longDescription: `The antique brushed finish replicates the century-old worn patina of heritage palace floors. Steel or nylon rotary brushes are driven across the stone surface, wearing away softer mineral veins while leaving harder quartz and crystal veins slightly raised. This produces a soft, undulating surface that feels warm and aged to the touch while enhancing the stone’s natural color variations.`,
    bestFor: ['marble', 'limestone', 'sandstone'],
    applications: ['Heritage Palace Flooring', 'Courtyard Paving', 'Fireplace Surrounds', 'Accent Wall Cladding'],
    pros: ['Authentic aged vintage patina', 'Hides wear & tear effortlessly', 'Warm, soft texture underfoot', 'High aesthetic value'],
    cons: ['Requires specialized diamond brushing', 'Higher production time'],
    careInstructions: 'Sweep regularly. Wash with stone-safe pH neutral cleaner. Seal every 2 years.',
    image: '/images/finishes/antique.webp',
    metaTitle: 'Antique Brushed Stone Finish | Granite Gallery',
    metaDescription: 'Antique brushed stone finish for marble and limestone — subtle weathered texture with historic patina. Ideal for heritage flooring. Export from Kishangarh.',
    keywords: ['antique stone finish', 'brushed marble finish', 'aged stone tiles', 'antique limestone india'],
    faqs: [
      {
        question: "How is an Antique finish achieved on natural stone?",
        answer: "Specialized rotary diamond wire brushes wear down softer mineral deposits while highlighting natural veins, creating an aged, soft-to-the-touch patina."
      }
    ]
  },
  {
    slug: 'hydro-blast',
    name: 'Hydro Blast',
    pageTitle: 'Hydro Blast Finish — Precision Water-Jet Texture',
    subtitle: 'High-pressure water jets reveal the stone\'s natural crystal structure',
    texture: 'textured',
    maintenanceLevel: 'low',
    description: 'Ultra-high-pressure water jets strip the polished surface layer to expose the natural crystal texture of the stone beneath.',
    longDescription: `The hydro blast (water jet) finish uses ultra-high-pressure water jets to strip the processed surface of the stone, revealing the natural crystalline texture beneath. Unlike other mechanical finishes, hydro blasting is chemical-free and produces a uniquely organic, naturally textured surface with excellent grip. The result varies significantly across stone types, making each installation truly bespoke.`,
    bestFor: ['granite', 'quartzite', 'sandstone'],
    applications: ['Commercial Flooring', 'Exterior Walkways', 'Institutional Spaces', 'Museum Floors'],
    pros: ['Chemical-free process', 'Reveals natural crystal structure', 'Unique, organic texture', 'Excellent grip'],
    cons: ['Result varies by stone type', 'Requires specialist equipment'],
    careInstructions: 'Regular sweeping. Periodic wash with stone-safe cleaner. Seal every 2 years.',
    image: '/images/finishes/hydro-blast.webp',
    metaTitle: 'Hydro Blast Stone Finish — Water Jet Texture',
    metaDescription: 'Hydro blast granite & quartzite — chemical-free water jet finish revealing natural crystal texture. Export from Kishangarh.',
    keywords: ['hydro blast stone finish', 'water jet stone texture', 'chemical free stone finish', 'hydro blast granite india', 'crystal texture stone surface'],
    faqs: [
      {
        question: "What makes the Hydro Blast finish unique?",
        answer: "Hydro blasting is a chemical-free process that uses ultra-high-pressure water jets to strip the top surface of the stone. It exposes the stone's natural crystal texture with outstanding grip underfoot."
      },
      {
        question: "Which stones are best suited to a Hydro Blast finish?",
        answer: "It works best on hard, crystalline stones such as granite, quartzite and dense sandstone, where the water jets can reveal the natural grain. Softer calcium-based stones like marble are generally finished by other methods."
      },
      {
        question: "Where is a Hydro Blast finish typically specified?",
        answer: "Because it is chemical-free and offers excellent slip resistance, it is popular for commercial flooring, exterior walkways, institutional spaces and museum floors where grip and a natural texture are both required."
      }
    ]
  },
];
