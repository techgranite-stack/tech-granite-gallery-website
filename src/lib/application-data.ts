// ============================================================
// src/lib/application-data.ts
// Stone application areas — room & use-case specific guides.
// ============================================================

import { FAQItem } from '@/types';

export interface Application {
  slug: string;
  title: string;
  pageTitle?: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  gallery: string[];
  /** 5–8 sample photos (16:9) shown in the on-page crossfade gallery */
  sampleImages?: string[];
  suitableStones: string[];   // Stone slugs from product-data
  suitableFinishes: string[]; // Finish slugs from finish-data
  maintenanceLevel: 'low' | 'medium' | 'high';
  technicalRequirements: string[];
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  icon?: string; // emoji icon for cards
  faqs?: FAQItem[];
}

export const mockApplicationFallback: Application = {
  slug: 'flooring',
  title: 'Flooring',
  pageTitle: 'Natural Stone Flooring — Luxury Underfoot',
  tagline: 'Grand entrances & open-plan living',
  description: 'Transform any interior with natural stone flooring — durable, timeless, and infinitely beautiful.',
  longDescription: `Natural stone flooring is the ultimate foundation of luxury interior design. Unlike any manufactured material, each stone tile carries the geological fingerprint of millions of years — unique veining, colour gradation, and crystalline structure that no two slabs replicate exactly.

From the sweeping marble floors of Italian palazzo entrances to the bold black granite of contemporary penthouses, stone flooring sets the tone for the entire space. It regulates temperature naturally, lasts generations, and increases property value significantly.

At Granite Gallery, we supply large-format slabs (up to 3200×1800mm), standard tiles, mosaic inlays, and custom-cut border patterns — all processed at our Kishangarh factory to exact millimetre tolerances.`,
  heroImage: '/images/applications/flooring/flooring-hero.webp',
  gallery: [
    '/images/applications/flooring/flooring-stone-wall.webp',
    '/images/applications/flooring/flooring-stone-wall-1.webp',
  ],
  suitableStones: ['carrara-white-marble', 'absolute-black-granite', 'volakas-white-marble'],
  suitableFinishes: ['polished', 'honed', 'leathered', 'shot-blast'],
  maintenanceLevel: 'low',
  technicalRequirements: [
    'Substrate flatness: Level the base to within 3mm over 2m and grind or fill high and low spots — essential for large-format slabs to avoid lippage',
    'Structural deflection: The sub-floor must be rigid to an L/720 limit so floor movement never cracks the stone or grout',
    'Acclimatise the stone: Rest slabs in the room for 24–48 hours with underfloor heating off so temperature and moisture equalise before laying',
    'Full-bed adhesive: Fix with a flexible C2TE S1 adhesive, back-buttered for at least 95% coverage so no tile is left hollow',
    'Movement joints: Provide perimeter and intermediate movement joints — roughly every 4–5m and at every change of plane — to BS 5385',
    'Seal before grouting: Apply an impregnating sealer before grouting to stop grout haze staining porous marble and limestone',
  ],
  metaTitle: 'Natural Stone Flooring — Marble & Granite | Granite Gallery Kishangarh',
  metaDescription: 'Premium natural stone flooring solutions — Italian marble, black granite, and limestone. Large-format slabs cut to measure. Direct supply from Kishangarh.',
  faqs: [
    {
      question: "What is the best stone thickness for residential flooring?",
      answer: "We recommend a minimum thickness of 18mm for residential flooring slabs to ensure high structural stability and durability underfoot."
    },
    {
      question: "Which finishes are recommended for high-traffic natural stone floors?",
      answer: "Mirror polished finishes are classic and beautiful, but honed or leathered finishes are often recommended in higher-traffic zones as they show less wear and offer superior slip resistance."
    },
    {
      question: "Does natural stone flooring work with underfloor heating?",
      answer: "Yes. Natural stone has excellent thermal conductivity, making it the perfect material for underfloor heating systems as it retains and radiates heat very efficiently."
    }
  ]
};

export const applicationsData: Application[] = [
  {
    slug: 'flooring',
    title: 'Flooring',
    pageTitle: 'Natural Stone Flooring — Luxury Underfoot',
    tagline: 'Grand entrances & open-plan living',
    description: 'The foundation of luxury interiors — natural stone flooring that outlasts generations.',
    longDescription: `Natural stone flooring is the ultimate foundation of luxury interior design. Unlike any manufactured material, each stone tile carries the geological fingerprint of millions of years — unique veining, colour gradation, and crystalline structure that no two slabs replicate exactly.

From sweeping marble floors of Italian palazzo entrances to bold black granite of contemporary penthouses, stone flooring sets the tone for the entire space. It regulates temperature naturally, lasts generations, and significantly increases property value.

We supply large-format slabs (up to 3200×1800mm), standard tiles, mosaic inlays, and custom-cut border patterns — all processed at our Kishangarh factory to exact millimetre tolerances.`,
    heroImage: '/images/applications/flooring/flooring-hero.webp',
    sampleImages: [
      '/images/applications/flooring/flooring-granite-crystalline-wall.webp',
      '/images/applications/flooring/pink-granite-flooring-wall.webp',
      '/images/applications/flooring/r-black-flooring-wall.webp',
      '/images/applications/flooring/flooring-stone-wall.webp',
      '/images/applications/flooring/flooring-stone-wall-1.webp',
      '/images/applications/flooring/flooring-stone-wall-2.webp',
      '/images/applications/flooring/flooring-stone-wall-3.webp',
    ],
    gallery: [
      '/images/applications/flooring/flooring-stone-wall.webp',
      '/images/applications/flooring/flooring-stone-wall-1.webp',
    ],
    suitableStones: ['carrara-white-marble', 'volakas-white-marble', 'absolute-black-granite', 'rainforest-brown-marble'],
    suitableFinishes: ['polished', 'leathered', 'honed', 'shot-blast'],
    maintenanceLevel: 'low',
    technicalRequirements: [
      'Substrate flatness: Level the base to within 3mm over 2m and grind or fill high and low spots — essential for large-format slabs to avoid lippage',
      'Structural deflection: The sub-floor must be rigid to an L/720 limit so floor movement never cracks the stone or grout',
      'Acclimatise the stone: Rest slabs in the room for 24–48 hours with underfloor heating off so temperature and moisture equalise before laying',
      'Full-bed adhesive: Fix with a flexible C2TE S1 adhesive, back-buttered for at least 95% coverage so no tile is left hollow',
      'Movement joints: Provide perimeter and intermediate movement joints — roughly every 4–5m and at every change of plane — to BS 5385',
      'Seal before grouting: Apply an impregnating sealer before grouting to stop grout haze staining porous marble and limestone',
    ],
    metaTitle: 'Natural Stone Flooring — Marble & Granite | Granite Gallery',
    metaDescription: 'Premium marble, granite & limestone flooring. Large-format slabs cut to measure. Direct supply from Kishangarh, Rajasthan.',
    keywords: ['natural stone flooring india', 'marble flooring supplier', 'granite floor tiles india', 'stone flooring kishangarh', 'large format stone flooring'],
    icon: '🏛️',
    faqs: [
      {
        question: "What is the best stone thickness for residential flooring?",
        answer: "We recommend a minimum thickness of 18mm for residential flooring slabs to ensure high structural stability and durability underfoot."
      },
      {
        question: "Which finishes are recommended for high-traffic natural stone floors?",
        answer: "Mirror polished finishes are classic and beautiful, but honed or leathered finishes are often recommended in higher-traffic zones as they show less wear and offer superior slip resistance."
      },
      {
        question: "Does natural stone flooring work with underfloor heating?",
        answer: "Yes. Natural stone has excellent thermal conductivity, making it the perfect material for underfloor heating systems as it retains and radiates heat very efficiently."
      }
    ]
  },
  {
    slug: 'wall-cladding',
    title: 'Wall Cladding',
    pageTitle: 'Stone Wall Cladding — Dramatic Feature Walls',
    tagline: 'Dramatic feature walls & exterior facades',
    description: 'Transform walls into geological artworks — bookmatched marble panels, stacked stone, and full-height slabs.',
    longDescription: `Stone wall cladding creates the most dramatic visual impact in any architectural space. A bookmatched marble panel — where two sequential slabs are opened like a book to create a mirror-image of natural veining — is the definitive statement of ultra-luxury design.

From exterior facade cladding on commercial buildings to intimate bedroom accent walls, natural stone transforms any vertical surface into a geological artwork. The material\'s inherent weight and texture creates a sense of permanence and quality that no alternative material can match.`,
    heroImage: '/images/applications/wall-cladding/wall-hero.webp',
    sampleImages: [
      '/images/applications/wall-cladding/beige-marble-villa-wall.webp',
      '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
      '/images/applications/wall-cladding/reddish-brown-swirling-villa-wall.webp',
      '/images/applications/wall-cladding/luxury-bedroom-interior-granite.webp',
      '/images/applications/wall-cladding/brownish-textured-wall.webp',
      '/images/applications/wall-cladding/reddish-brown-wall.webp',
      '/images/applications/wall-cladding/stone-wall-3.webp',
      '/images/applications/wall-cladding/stone-wall-4.webp',
    ],
    gallery: [
      '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
    ],
    suitableStones: ['calacatta-gold-marble', 'statuario-luxe-marble', 'jade-green-onyx'],
    suitableFinishes: ['polished', 'leathered', 'chiseled'],
    maintenanceLevel: 'low',
    technicalRequirements: [
      'Mechanical fixing first: Any panel over ~30kg or fixed at height must be mechanically anchored — adhesive alone is never the primary support',
      'Correct thickness: Specify a minimum 15–20mm for interior panels and 30mm for exterior, sized to the panel span and exposure',
      'Stainless steel anchors: Use only A2/A4 stainless kerf, dowel or undercut fixings so anchors never corrode, stain or fail behind the stone',
      'True, sound backing: Fix to a structurally sound, plumb substrate; batten or rail out uneven walls so every panel sits perfectly in plane',
      'Moisture management: Provide a moisture barrier and, on exteriors, a drained cavity of at least 25mm so trapped water cannot damage the build-up',
      'Engineered large panels: Get structural sign-off and a fixing schedule for panels over 2m² or bookmatched runs before any cutting begins',
    ],
    metaTitle: 'Stone Wall Cladding — Feature Walls & Facades | Granite Gallery',
    metaDescription: 'Bookmatched marble panels, stone feature walls & exterior facade cladding. Dramatic natural stone wall installations. Granite Gallery, Kishangarh.',
    keywords: ['stone wall cladding india', 'marble feature wall', 'bookmatched marble panels', 'exterior stone cladding india', 'granite facade cladding'],
    icon: '🪨',
    faqs: [
      {
        question: "Do large cladding stone slabs require mechanical anchoring?",
        answer: "Yes. Any wall cladding panels weighing over 30kg or installed at heights above 3 meters should be secured with stainless steel mechanical anchoring systems rather than just adhesive, to ensure absolute safety."
      },
      {
        question: "What is bookmatching, and when is it used on walls?",
        answer: "Bookmatching is the practice of matching two or more stone slabs cut sequentially from the same block so that their veining mirrors each other, like an open book. It is highly specified for premium focal feature walls."
      }
    ]
  },
  {
    slug: 'kitchen-countertops',
    title: 'Kitchen Countertops',
    pageTitle: 'Stone Kitchen Countertops — The Heart of Luxury Kitchens',
    tagline: 'Luxury worktops & splashbacks that define the modern kitchen',
    description: 'The centrepiece of the luxury kitchen — natural stone countertops that combine extreme beauty with daily practicality.',
    longDescription: `The kitchen countertop is the most-used surface in any home, and natural stone is the only material that combines extreme beauty with the durability required for daily culinary life. A Calacatta Gold marble island or a leathered Absolute Black granite worktop is not just a surface — it is the statement piece around which the entire kitchen is designed.

Granite offers unmatched hardness (7 Mohs) making it virtually scratch-proof and heat-resistant. Marble delivers incomparable beauty and timeless luxury. Quartzite provides the perfect combination of both — the look of marble with the strength of granite.`,
    heroImage: '/images/applications/kitchen-countertops/kitchen-hero.webp',
    sampleImages: [
      '/images/applications/kitchen-countertops/kitchen-granite-crystalline-wall.webp',
      '/images/applications/kitchen-countertops/pink-granite-kitchen-wall.webp',
      '/images/applications/kitchen-countertops/r-black-kitchen-wall.webp',
      '/images/applications/kitchen-countertops/kitchen-stone-wall.webp',
      '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
      '/images/applications/kitchen-countertops/kitchen-stone-wall-2.webp',
      '/images/applications/kitchen-countertops/kitchen-stone-wall-3.webp',
    ],
    gallery: [
      '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
    ],
    suitableStones: ['calacatta-gold-marble', 'absolute-black-granite', 'statuario-luxe-marble'],
    suitableFinishes: ['polished', 'leathered', 'honed'],
    maintenanceLevel: 'medium',
    technicalRequirements: [
      'Professional templating: Template on the finished, installed cabinets — never from drawings — so seams, cut-outs and overhangs land exactly right',
      'Level the cabinets: Shim the carcasses level to within 3mm across the run; an out-of-level base twists the slab and stresses the seams',
      'Support the overhang: Bracket or corbel any unsupported overhang beyond ~250–300mm (less for marble), and always at breakfast-bar seating',
      'Reinforce weak points: Rod narrow spans and radius every sink and hob cut-out corner — sharp internal corners are where stress cracks start',
      'Plan the seams: Place seams away from sinks and cooktops, bond them with colour-matched epoxy, and keep them tight and flush',
      'Seal and protect: Impregnate marble, limestone and porous quartzites, and side-mount dishwashers rather than screwing into the underside of the stone',
    ],
    metaTitle: 'Stone Kitchen Countertops — Marble & Granite | Granite Gallery',
    metaDescription: 'Natural stone kitchen countertops — Calacatta marble islands, black granite worktops & quartzite surfaces. Custom cut & fabricated. Granite Gallery.',
    keywords: ['stone kitchen countertop india', 'marble kitchen island', 'black granite worktop', 'granite kitchen slab india', 'quartzite countertop india'],
    icon: '🍳',
    faqs: [
      {
        question: "Which natural stone is most durable for kitchen countertops?",
        answer: "Granite is the most durable option with a hardness of 7 Mohs, making it highly scratch-resistant and completely heat-proof. Quartzite is also an excellent choice as it combines the strength of granite with the aesthetic of marble."
      },
      {
        question: "Can I place hot pans directly on a marble kitchen island?",
        answer: "No, we do not recommend placing hot pans directly on marble. Extreme local heat can cause thermal shock or discolor the protective sealants. Always use a trivet."
      }
    ]
  },
  {
    slug: 'bathroom',
    title: 'Bathroom',
    pageTitle: 'Stone Bathroom Design — Spa-Grade Luxury',
    tagline: 'Spa-grade shower walls, vanity stone & bathtub surrounds',
    description: 'Transform your bathroom into a private spa — stone shower walls, floating vanity tops, and freestanding stone bathtubs.',
    longDescription: `The bathroom is where natural stone truly comes into its own. In a wet environment, the inherent cooling properties of stone, its natural water resistance (particularly granite), and its depth of beauty create a spa-grade retreat unlike anything that porcelain or engineered materials can replicate.

Full stone shower enclosures in bookmatched marble slabs eliminate grout lines entirely — creating a seamless, hotel-suite aesthetic. A floating stone vanity top in Volakas or Calacatta is an object of quiet luxury. Onyx bathtub surrounds, backlit to glow, are the ultimate statement.`,
    heroImage: '/images/applications/bathroom/bathroom-hero.webp',
    sampleImages: [
      '/images/applications/bathroom/bathroom-granite-crystalline-wall.webp',
      '/images/applications/bathroom/pink-granite-bathroom-wall.webp',
      '/images/applications/bathroom/r-black-bathroom-wall.webp',
      '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
      '/images/applications/bathroom/bathroom-stone-wall.webp',
      '/images/applications/bathroom/bathroom-stone-wall-1.webp',
      '/images/applications/bathroom/bathroom-stone-wall-2.webp',
    ],
    gallery: [
      '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
    ],
    suitableStones: ['volakas-white-marble', 'carrara-white-marble', 'jade-green-onyx'],
    suitableFinishes: ['polished', 'honed', 'leathered'],
    maintenanceLevel: 'medium',
    technicalRequirements: [
      'Tank it first: Install a continuous waterproof membrane across floors and wet walls (turned up at least 150mm) before any stone is fixed',
      'Fall to drain: Build a floor gradient of at least 1:80 (about 1.5%) to the waste so water never pools on the stone',
      'Slip-safe finish: Specify a honed, leathered or brushed finish on floors and shower trays for adequate wet slip resistance (PTV 36+)',
      'Wet-area adhesive & grout: Fix with an S1 flexible adhesive and finish with epoxy grout — fully waterproof, stain-resistant and no ongoing sealing',
      'Seal porous stone: Impregnate marble, limestone and onyx before grouting and after fitting, and avoid acidic cleaners that etch calcareous stone',
      'Ventilate & allow movement: Ensure strong extraction and leave perimeter movement joints in silicone so heat and moisture cycling never cracks joints',
    ],
    metaTitle: 'Natural Stone Bathrooms — Marble & Onyx | Granite Gallery',
    metaDescription: 'Luxury stone bathroom solutions — bookmatched marble shower walls, onyx vanities & spa-grade stone suites. Custom fabricated. Granite Gallery, Kishangarh.',
    keywords: ['marble bathroom india', 'stone bathroom tiles', 'onyx bathroom vanity', 'luxury stone bathroom', 'marble shower wall india'],
    icon: '🛁',
    faqs: [
      {
        question: "Why is natural stone preferred for premium bathroom walls?",
        answer: "Natural stone shower enclosures in large-format slabs eliminate grout lines, creating a seamless, hygienic, and spa-like luxury aesthetic. When sealed properly, it is highly waterproof."
      },
      {
        question: "Which stone finish should be used for bathroom floors?",
        answer: "Honed, leathered, or satin finishes are recommended for wet flooring areas, as they provide a slip-resistant surface underfoot with a minimum R10 rating."
      }
    ]
  },
  {
    slug: 'staircase',
    title: 'Staircase',
    pageTitle: 'Natural Stone Staircases — The Grand Statement Centrepiece',
    tagline: 'Statement treads, risers & balustrades in natural stone',
    description: 'The stone staircase is the architectural centrepiece of any grand home — where craftsmanship, material quality, and visual impact converge.',
    longDescription: `A natural stone staircase is the defining architectural feature of any luxury residence. Rising through the home like a sculptural installation, it is the first thing guests see and the last they remember. The combination of stone treads, matching risers, and carved stone balustrades creates a level of permanence and grandeur that no other material achieves.

The choice of stone defines the personality of the space — bright Calacatta marble for classical European elegance, bold black granite for contemporary drama, warm travertine for Mediterranean warmth. Each tread must be precisely cut and edge-profiled to specification — an art that our Kishangarh facility has perfected over decades.`,
    heroImage: '/images/applications/staircase/staircase-hero.webp',
    sampleImages: [
      '/images/applications/staircase/granite-crystalline-staircase-wall.webp',
      '/images/applications/staircase/beige-marble-staircase-wall.webp',
      '/images/applications/staircase/pink-granite-staircase-wall.webp',
      '/images/applications/staircase/green-tan-marbled-staircase-wall.webp',
      '/images/applications/staircase/gray-textured-staircase-wall.webp',
      '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
      '/images/applications/staircase/r-black-staircase-wall.webp',
      '/images/applications/staircase/reddish-brown-swirling-staircase-wall.webp',
    ],
    gallery: [
      '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
    ],
    suitableStones: ['calacatta-gold-marble', 'volakas-white-marble', 'absolute-black-granite'],
    suitableFinishes: ['polished', 'leathered', 'honed'],
    maintenanceLevel: 'low',
    technicalRequirements: [
      'Structural sub-frame: Bed treads onto a sound concrete or steel-framed stair designed to carry the added dead load of solid stone',
      'Tread thickness: Use a minimum 30mm for cantilevered or open treads and 20mm for fully supported treads, sized to the going',
      'Uniform rise & going: Keep every riser height and tread depth consistent to building-regulation tolerance — uneven steps are a trip hazard and a defect',
      'Anti-slip nosing: Detail an anti-slip nosing (grooves, inset strips or a bull-nose) on every tread front edge — essential on polished stone',
      'Full bedding & even joints: Bed treads fully to avoid voids and hold a consistent 5–10mm joint between tread and riser for movement',
      'Specialist installation: Use an experienced stone mason for cutting, mitres and fixing — staircases are unforgiving of poor tolerances',
    ],
    metaTitle: 'Natural Stone Staircases — Marble & Granite Treads | Granite Gallery',
    metaDescription: 'Luxury marble and granite staircases — custom-cut treads, risers & balustrades. Grand statement stone staircases by Granite Gallery, Kishangarh.',
    keywords: ['marble staircase india', 'granite stair treads india', 'stone staircase supplier', 'marble risers india', 'luxury stone staircase'],
    icon: '🪜',
    faqs: [
      {
        question: "What is the minimum thickness for cantilevered (floating) stone stair treads?",
        answer: "Cantilevered floating staircases require a minimum stone thickness of 30mm, along with an internal structural steel anchor support, to handle high torsion and loads safely."
      },
      {
        question: "How is slip resistance achieved on polished stone staircases?",
        answer: "We can mill subtle anti-slip grooves near the front edge of each tread, apply sandblasted safety bands, or process the tread surface to a honed finish while keeping the riser polished."
      }
    ]
  },
  {
    slug: 'exterior-cladding',
    title: 'Exterior Cladding',
    pageTitle: 'Stone Exterior Cladding — Bold Architectural Facades',
    tagline: 'Weather-resistant stone cladding for buildings & boundary walls',
    description: 'Durable natural stone facades that make an architectural statement and withstand India\'s extreme weather cycles for generations.',
    longDescription: `Exterior stone cladding is architecture\'s boldest statement — a building clad in natural stone communicates permanence, quality, and ambition. Unlike paint, render, or composite panels, natural stone improves with age — developing a natural patina that only enhances its beauty over decades.

Granite is the premier choice for exterior cladding — with a Mohs hardness of 7, it is virtually impervious to weathering, freeze-thaw cycles, UV radiation, and India\'s extreme monsoon conditions. Sandstone and limestone create warmer, more traditional architectural aesthetics.`,
    heroImage: '/images/applications/exterior-cladding/external-clad-hero.webp',
    sampleImages: [
      '/images/applications/exterior-cladding/beige-marble-external-cladding-wall.webp',
      '/images/applications/exterior-cladding/light-green-marble-external-cladding-wall.webp',
      '/images/applications/exterior-cladding/reddish-brown-stone-external-cladding-wall.webp',
      '/images/applications/exterior-cladding/beige-textured-stone-external-cladding-wall.webp',
      '/images/applications/exterior-cladding/brown-textured-stone-external-cladding-wall.webp',
      '/images/applications/exterior-cladding/granite-crystalline-villa-wall.webp',
      '/images/applications/exterior-cladding/gray-textured-villa-wall.webp',
      '/images/applications/exterior-cladding/r-black-exterior-wall.webp',
    ],
    gallery: [
      '/images/applications/exterior-cladding/beige-textured-stone-external-cladding-wall.webp',
    ],
    suitableStones: ['absolute-black-granite', 'rainforest-brown-marble'],
    suitableFinishes: ['flamed', 'bush-hammered', 'chiseled', 'shot-blast'],
    maintenanceLevel: 'low',
    technicalRequirements: [
      'Freeze-thaw suitable stone: Select stone tested for freeze-thaw durability (ASTM C666/C67) with adequate flexural strength for the panel size',
      'Ventilated rainscreen: Design a drained, ventilated cavity of at least 25mm behind the stone with weep holes so water can drain and dry',
      'Stainless anchoring: Support every panel on engineered A4 stainless steel fixings (kerf, undercut or dowel) — never mortar or adhesive alone outdoors',
      'Wind-load engineering: Size fixings and thickness (minimum ~30mm) to the project wind loads, with structural approval for panels over 2m²',
      'Thermal & building movement: Build in expansion allowance and soft movement joints so thermal cycling and structural movement never crack panels',
      'Durable weather seals: Close joints with a 20-year-rated, non-staining sealant and detail flashings at every head, sill and penetration',
    ],
    metaTitle: 'Stone Exterior Cladding — Granite Facade | Granite Gallery',
    metaDescription: 'Natural stone exterior cladding — durable granite facades, sandstone walls & architectural stone cladding. Weather-resistant. Granite Gallery, Kishangarh.',
    keywords: ['exterior stone cladding india', 'granite facade india', 'stone wall cladding exterior', 'sandstone exterior wall', 'architectural stone cladding'],
    icon: '🏗️',
    faqs: [
      {
        question: "Which natural stones are suitable for exterior cladding?",
        answer: "Dense granites (such as Absolute Black) and selected Rajasthan quartzites are highly recommended. They are highly resistant to UV rays, acid rain, and extreme seasonal thermal cycles."
      },
      {
        question: "What is a ventilated facade system?",
        answer: "A ventilated facade is an installation method where a continuous air gap is left between the stone cladding slab and the structural wall. This keeps the building insulated and allows dry air circulation, protecting against moisture."
      }
    ]
  },
  {
    slug: 'tabletops',
    title: 'Tabletops & Furniture',
    pageTitle: 'Stone Tabletops & Bespoke Furniture',
    tagline: 'Dining tables, coffee tables & bespoke stone furniture',
    description: 'Stone tabletops that are functional sculptures — dining tables, coffee tables, and custom stone furniture that last lifetimes.',
    longDescription: `A stone dining table is not furniture — it is a family heirloom. The geological permanence of natural stone, combined with bespoke fabrication to exact specifications, creates pieces that define spaces and outlast generations of owners.

From dramatic 4-metre Calacatta dining tables for formal dining rooms to slim-line book-matched marble coffee tables for contemporary living rooms — stone furniture combines extreme material beauty with practical durability. Onyx coffee tables, backlit to glow, are the ultimate statement furnishing.`,
    heroImage: '/images/applications/tabletops/tabletops-hero.webp',
    sampleImages: [
      '/images/applications/tabletops/granite-crystalline-tabletop-wall.webp',
      '/images/applications/tabletops/beige-marble-tabletop-wall.webp',
      '/images/applications/tabletops/designer-coffee-table-polished-stone.webp',
      '/images/applications/tabletops/green-tan-marbled-tabletop-wall.webp',
      '/images/applications/tabletops/pink-granite-tabletop-wall.webp',
      '/images/applications/tabletops/gray-textured-tabletop-wall.webp',
      '/images/applications/tabletops/r-black-tabletop-wall.webp',
      '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
    ],
    gallery: [
      '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
    ],
    suitableStones: ['calacatta-gold-marble', 'jade-green-onyx', 'statuario-luxe-marble'],
    suitableFinishes: ['polished', 'leathered'],
    maintenanceLevel: 'medium',
    technicalRequirements: [
      'Engineered support frame: Provide a steel or timber sub-frame for dining and console tops — mandatory for spans over 1.8m to prevent sag and cracking',
      'Right thickness for the span: Use 20–30mm for dining tops; thin or long tops should be rodded or fibre-backed to add tensile strength',
      'Edge detailing: Profile and polish every edge (eased, bull-nose or mitred) — sharp arrises chip easily and are a safety risk on furniture',
      'Plan the joints: Keep tops single-piece where possible; where seamed, place and epoxy joints discreetly and keep them dead flush',
      'Seal & protect the surface: Impregnate marble, onyx and limestone, use felt pads and coasters, and reseal periodically in dining use',
      'Safe handling & transport: Move and store tops vertically on an A-frame and lift on edge — flat-lifting a large top will snap it',
    ],
    metaTitle: 'Stone Tabletops & Bespoke Furniture | Granite Gallery Kishangarh',
    metaDescription: 'Custom stone tabletops, marble dining tables & bespoke stone furniture. Calacatta marble, onyx coffee tables & quartzite islands. Granite Gallery.',
    keywords: ['stone tabletop india', 'marble dining table india', 'stone furniture india', 'onyx coffee table', 'custom stone furniture kishangarh'],
    icon: '🪑',
    faqs: [
      {
        question: "Do stone dining tables require special support frames?",
        answer: "Yes. Due to the high weight of a 20mm or 30mm natural stone slab, a sturdy structural steel or hardwood base frame is mandatory to support spans over 1.5 meters without sagging."
      },
      {
        question: "How do I protect my marble dining tabletop from wine or coffee stains?",
        answer: "We apply a professional commercial sealant to all tabletops before delivery. To maintain protection, avoid spills, clean immediately, and wipe with a soft cloth and neutral cleaner."
      }
    ]
  },
];
