// ============================================================
// src/data/flagship-pages.ts
// Deep-domain flagship landing page data objects.
// Built with the complete home-page interactive component stack:
// HeroSlider, StatsBand, ScrollingTagline, HoverListReveal,
// MosaicGrid, CoverflowCarousel, NumberedCardGrid,
// HorizontalScrollGallery, MarqueeTestimonials, FAQAccordion, BannerContactForm.
// ============================================================

import React from 'react';
import { HeroSlide, StatItem, CategoryItem, ApplicationItem, WhyUsReason, ProjectItem, FAQItem } from '@/types';
import { ExtendedProductItem } from '@/data/products';
import { testimonials as homeTestimonials, ExtendedTestimonialItem } from '@/data/testimonials';
import { projects as homeProjects, ExtendedProjectItem } from '@/data/projects';
import { ExtendedTeamMember } from '@/data/team';
import { ExtendedBlogPostItem } from '@/data/blog';

export interface FlagshipPageData {
  slug: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonical: string;
  };
  breadcrumb: { name: string; path: string }[];
  heroSlides: HeroSlide[];
  trustStats: StatItem[];
  scrollingTagline: string[];
  categories: CategoryItem[];
  mosaicApps: ApplicationItem[];
  mosaicHeading: {
    title: string;
    titleEm: string;
    eyebrow: string;
    description: string;
  };
  products: ExtendedProductItem[];
  whyUs: {
    reasons: WhyUsReason[];
    marqueeItems: string[];
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  projects: ExtendedProjectItem[];
  projectHeading: {
    eyebrow: string;
    title: React.ReactNode;
    desc: React.ReactNode;
  };
  testimonials: ExtendedTestimonialItem[];
  teamMembers?: ExtendedTeamMember[];
  blogPosts?: ExtendedBlogPostItem[];
  faqs: FAQItem[];
  faqHeading: {
    eyebrow: string;
    title: string;
    titleEm: string;
    description: string;
  };
  bannerCta?: {
    eyebrow?: string;
    headline?: string;
  };
  service: {
    name: string;
    serviceType: string;
  };
  localInfo?: {
    city: string;
    state: string;
    address: string;
    transitTime: string;
    freightPerSqft: string;
  };
}

export const flagshipPages: Record<string, FlagshipPageData> = {
  // ── 1. GRANITE MANUFACTURERS IN KISHANGARH ─────────────────────────────────
  'granite-manufacturers-in-kishangarh': {
    slug: 'granite-manufacturers-in-kishangarh',
    metadata: {
      title: 'Granite Manufacturers in Kishangarh | Granite Gallery',
      description: 'Granite manufacturers in Kishangarh. Direct factory gangsaw slabs, 16 multi-wire machines, automated line polishing & wholesale pricing on MEGA Highway.',
      keywords: [
        'granite manufacturers in kishangarh',
        'granite factory kishangarh',
        'granite exporters in rajasthan',
        'kishangarh granite mandi wholesale',
        'gangsaw granite slabs kishangarh',
        'granite suppliers in kishangarh',
        'black granite factory kishangarh',
      ],
      ogImage: '/images/collections/showroom/granite-showroom-display-wall-kishangarh.webp',
      canonical: '/granite-manufacturers-in-kishangarh',
    },
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Granite', path: '/granite' },
      { name: 'Granite Manufacturers in Kishangarh', path: '/granite-manufacturers-in-kishangarh' },
    ],
    heroSlides: [
      {
        image: '/images/stones/steel-grey/steel-grey_stand.webp',
        title: 'Direct Gangsaw Granite Manufacturing',
        sub: '16 high-speed multi-wire gangsaw lines operating 24/7 on the MEGA Highway in Kishangarh.',
      },
      {
        image: '/images/stones/telephone-black/telephone-black_stand.webp',
        title: 'Precision 18mm & 20mm Calibrated Slabs',
        sub: 'Automated 16-head line polishers delivering mirror gloss and uniform millimeter thickness.',
      },
      {
        image: '/images/stones/black-galaxy/black-galaxy_stand.webp',
        title: 'Export-Grade Slabs & Lot Selection',
        sub: 'Ultrasonic fissure detection and single-quarry lot reservations for large commercial projects.',
      },
      {
        image: '/images/stones/tan-brown/tan-brown_stand.webp',
        title: 'Direct Factory Gate Wholesale Rates',
        sub: 'Eliminate trader markups. Inspect whole gangsaw blocks with complimentary digital weighbridge verification.',
      },
    ],
    trustStats: [
      { number: '38,000+', label: 'Sq Ft Daily Processing' },
      { number: '₹45–₹350', label: 'Wholesale Rates / sqft' },
      { number: '16 Wire', label: 'Automated Gangsaws' },
      { number: '55+', label: 'Quarry Granite Varieties' },
    ],
    scrollingTagline: [
      'Direct Factory Manufacturing',
      'MEGA Highway Kishangarh Yard',
      '18mm Precision Calibration',
      'Ultrasonic Flaw Inspection',
      'Factory Gate Dispatch',
      'All-India Highway Transport',
    ],
    categories: [
      {
        id: 'black-granite',
        title: 'Jet Black Granites',
        desc: 'Telephone Black · Black Galaxy · Rajasthan Black',
        tag: 'High Density',
        image: '/images/stones/telephone-black/telephone-black_catalog.webp',
        images: [
          '/images/stones/telephone-black/telephone-black_stand.webp',
          '/images/stones/black-galaxy/black-galaxy_stand.webp',
          '/images/stones/r-black/r-black_stand.webp',
        ],
        href: '/collections/black-granite',
        count: 12,
      },
      {
        id: 'grey-granite',
        title: 'Architectural Greys',
        desc: 'Steel Grey · Cera Grey · Godhra Grey',
        tag: 'Bestseller',
        image: '/images/stones/steel-grey/steel-grey_catalog.webp',
        images: [
          '/images/stones/steel-grey/steel-grey_stand.webp',
          '/images/stones/cera-grey/cera-grey_catalog.webp',
        ],
        href: '/granite',
        count: 8,
      },
      {
        id: 'textured-granite',
        title: 'Lapotra & Flamed Granites',
        desc: 'Anti-Skid Outdoor Textures · Leathered Kitchen Tops',
        tag: 'Surface Processing',
        image: '/images/stones/tan-brown/tan-brown_catalog.webp',
        images: [
          '/images/stones/tan-brown/tan-brown_stand.webp',
          '/images/stones/lakha-red/lakha-red_stand.webp',
        ],
        href: '/finishes',
        count: 14,
      },
      {
        id: 'white-granite',
        title: 'North Indian Whites',
        desc: 'P White · S White · Cotton White',
        tag: 'Value Engineering',
        image: '/images/stones/p-white/p-white_catalog.webp',
        images: [
          '/images/stones/p-white/p-white_catalog.webp',
        ],
        href: '/granite',
        count: 6,
      },
    ],
    mosaicHeading: {
      title: 'Architectural Granite for',
      titleEm: 'Every Scale',
      eyebrow: 'MANUFACTURING APPLICATIONS',
      description: 'Precision-processed gangsaw slabs engineered for structural integrity, zero abrasion, and lifelong luxury aesthetics.',
    },
    mosaicApps: [
      {
        title: 'High-Traffic Flooring',
        sub: 'Calibrated 18mm gangsaw slabs for commercial complexes, malls, and luxury residences.',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
      },
      {
        title: 'Kitchen Countertops & Islands',
        sub: 'Heatproof, stain-resistant natural granite with bespoke edge bullnosing.',
        image: '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
        href: '/applications/kitchen-countertops',
      },
      {
        title: 'Exterior Facades & Elevation',
        sub: 'Weatherproof mechanical dry cladding engineered for extreme wind and thermal loads.',
        image: '/images/applications/exterior-cladding/beige-textured-stone-external-cladding-wall.webp',
        href: '/applications/exterior-cladding',
      },
      {
        title: 'Staircase Steps & Treads',
        sub: 'Monolithic steps with flamed anti-skid grooves and full bullnose edges.',
        image: '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
        href: '/applications/staircase',
      },
      {
        title: 'Heavy-Duty Driveway Paving',
        sub: '20mm–30mm flamed and bush-hammered granite withstanding heavy vehicular loads.',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
      },
    ],
    products: [
      {
        id: 'telephone-black',
        title: 'Telephone Black',
        category: 'granite',
        finish: 'Mirror Polished',
        origin: 'Rajasthan, India',
        image: '/images/stones/telephone-black/telephone-black_catalog.webp',
        tag: 'Export Quality',
      },
      {
        id: 'black-galaxy',
        title: 'Black Galaxy',
        category: 'granite',
        finish: 'High Gloss / Lapotra',
        origin: 'Andhra Pradesh, India',
        image: '/images/stones/black-galaxy/black-galaxy_catalog.webp',
        tag: 'Golden Flakes',
      },
      {
        id: 'steel-grey',
        title: 'Steel Grey',
        category: 'granite',
        finish: 'Lapotra / Polished',
        origin: 'Telangana, India',
        image: '/images/stones/steel-grey/steel-grey_catalog.webp',
        tag: 'Architect Favorite',
      },
      {
        id: 'tan-brown',
        title: 'Tan Brown',
        category: 'granite',
        finish: 'Polished / Flamed',
        origin: 'Telangana, India',
        image: '/images/stones/tan-brown/tan-brown_catalog.webp',
        tag: 'Heavy Duty',
      },
      {
        id: 'lakha-red',
        title: 'Lakha Red',
        category: 'granite',
        finish: 'Mirror Polished',
        origin: 'Jodhpur, Rajasthan',
        image: '/images/stones/lakha-red/lakha-red_catalog.webp',
        tag: 'Monumental',
      },
      {
        id: 'p-white',
        title: 'P White',
        category: 'granite',
        finish: 'Polished',
        origin: 'Rajasthan, India',
        image: '/images/stones/p-white/p-white_catalog.webp',
        tag: 'Value Flooring',
      },
    ],
    whyUs: {
      eyebrow: 'MANUFACTURING RIGOR',
      title: 'Why Source Directly from Our Kishangarh Plant',
      subtitle: 'Complete quality control from raw quarry block to crated consignment.',
      marqueeItems: ['Multi-Wire Gangsaws', 'Line Polish Calibration', 'Ultrasonic Crack Testing', 'Direct Factory Invoicing', '16-Head Line Polish', 'Direct Quarry Supply'],
      reasons: [
        {
          num: '01',
          title: 'Automated Multi-Wire Gangsaw Slicing',
          desc: 'Our high-speed diamond multi-wire saws cut blocks with ± 1mm thickness precision, completely preventing floor lippage and installation leveling issues.',
        },
        {
          num: '02',
          title: 'Zero Epoxy Crack Fillers',
          desc: 'We reject structural fissures at the raw block stage. Every slab is tested ultrasonically to guarantee 100% solid natural crystalline integrity.',
        },
        {
          num: '03',
          title: 'Single-Block Lot Batching',
          desc: 'Reserve entire gangsaw cuts (3,000–5,000 sq ft) from a single block to ensure identical color tone, grain distribution, and vein harmony across your building.',
        },
        {
          num: '04',
          title: 'Transparent Factory Weighbridge Dispatch',
          desc: 'Consignments are loaded with high-capacity gantry cranes and verified on our industrial weighbridge on the MEGA Highway, eliminating hidden weight surcharges.',
        },
        {
          num: '05',
          title: '16-Head Line Polish Mirror Calibrators',
          desc: 'State-of-the-art Italian abrasive polishing lines achieving 90+ gloss reflectivity without artificial waxes or superficial chemical coatings.',
        },
        {
          num: '06',
          title: 'Direct Quarry Block Sourcing',
          desc: 'Raw granite blocks sourced directly from company-associated quarries across Rajasthan, South India, and Norway, guaranteeing unbroken supply chains.',
        },
      ],
    },
    projectHeading: {
      eyebrow: 'PROVEN ENDURANCE',
      title: 'Supplying India’s Defining Infrastructure',
      desc: 'Our gangsaw-calibrated granites form the foundation of high-traffic national monuments, international airports, and five-star luxury resorts.',
    },
    projects: homeProjects,
    testimonials: homeTestimonials,
    faqHeading: {
      eyebrow: 'FACTORY FAQS',
      title: 'Frequently Asked Questions',
      titleEm: 'About Granite Manufacturing',
      description: 'Clear answers on MOQ, slab thickness calibration, factory gate pricing, and yard visits on the MEGA Highway.',
    },
    faqs: [
      {
        question: 'What is the minimum order quantity (MOQ) for direct factory orders from Kishangarh?',
        answer: 'For individual residential orders, our minimum order quantity is 500 sq ft. For wholesale dealer consignments and commercial infrastructure projects, we ship full trailer loads (approx. 3,800 to 4,200 sq ft of 18mm stone / 21–25 metric tons) directly from our factory gate.',
      },
      {
        question: 'What slab thicknesses do you manufacture at your Kishangarh plant?',
        answer: 'Our multi-wire gangsaw machines are calibrated for 16mm, 18mm, 20mm, and 30mm thickness. 18mm is the standard residential benchmark, while 20mm and 30mm are engineered for heavy-traffic driveway paving, stairs, and structural cladding.',
      },
      {
        question: 'How do gangsaw-cut slabs compare to circular cutter-cut slabs?',
        answer: 'Gangsaw slabs offer much larger dimensions (up to 3200×1800mm vs 2400×900mm on small cutters), uniform thickness tolerances of ± 1mm (eliminating installation lippage), and zero undulating waves on the surface.',
      },
      {
        question: 'Can I visit the Kishangarh manufacturing yard to inspect slabs in person?',
        answer: 'Yes. Our processing plant and yard are located on the MEGA Highway in Kishangarh, Rajasthan. We welcome architects, builders, and homeowners 7 days a week. For remote buyers, we provide 4K live video inspections and wet-test lot confirmation.',
      },
      {
        question: 'What is the price range of granite slabs ex-factory Kishangarh?',
        answer: 'Commercial varieties like P White and Chima Pink start from ₹45–₹65/sq ft. Standard residential granites (Steel Grey, Tan Brown, Markino) range from ₹65–₹130/sq ft. Premium export varieties like Telephone Black and Black Galaxy range from ₹140–₹350/sq ft.',
      },
    ],
    service: {
      name: 'Granite Manufacturing & Wholesale Sourcing',
      serviceType: 'Stone Manufacturing',
    },
    localInfo: {
      city: 'Kishangarh',
      state: 'Rajasthan',
      address: 'Granite Gallery Processing Plant & Stockyard, MEGA Highway, Kishangarh, Rajasthan 305801',
      transitTime: 'Immediate Yard Pickup / Same-Day Dispatch',
      freightPerSqft: 'Zero extra freight for yard pickup',
    },
  },

  // ── 2. ITALIAN MARBLE IN KISHANGARH ────────────────────────────────────────
  'italian-marble-in-kishangarh': {
    slug: 'italian-marble-in-kishangarh',
    metadata: {
      title: 'Italian Marble in Kishangarh | Slabs, Rates & Stockyard',
      description: 'Buy imported Italian marble in Kishangarh. Statuario, Botticino & Calacatta slabs. Gangsaw calibrated 18mm, bookmatched lot inspection & wholesale mandi rates.',
      keywords: [
        'italian marble in kishangarh',
        'imported marble suppliers kishangarh',
        'statuario marble price in kishangarh',
        'italian marble wholesale market rajasthan',
        'best italian marble for living room',
        'imported marble stockyard kishangarh',
        'botticino marble kishangarh',
      ],
      ogImage: '/images/stones/statuario/statuario_stand.webp',
      canonical: '/italian-marble-in-kishangarh',
    },
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Marble', path: '/marble' },
      { name: 'Italian Marble in Kishangarh', path: '/italian-marble-in-kishangarh' },
    ],
    heroSlides: [
      {
        image: '/images/stones/statuario/statuario_stand.webp',
        title: 'Directly Imported Italian Marble Slabs',
        sub: 'Hand-selected Carrara Statuario, Calacatta Gold, and Botticino blocks processed in Kishangarh.',
      },
      {
        image: '/images/stones/botticino/botticino_stand.webp',
        title: 'Authentic Bookmatched Vein Matching',
        sub: 'Sequential gangsaw slices offering flawless mirrored symmetry for expansive luxury living halls.',
      },
      {
        image: '/images/stones/honey-onyx/honey-onyx_stand.webp',
        title: 'Translucent Onyx & Exotic Italian Geologies',
        sub: 'Luminous honey and jade onyx illuminated by backlighting for feature walls and statement bars.',
      },
      {
        image: '/images/stones/emperador/emperador_stand.webp',
        title: 'Vacuum Resin Line Reinforcement',
        sub: 'Processed with high-grade Italian epoxy resins and fiberglass netting for structural permanence.',
      },
    ],
    trustStats: [
      { number: '150+ Slabs', label: 'Imported Marble Batches' },
      { number: '₹280–₹1,800', label: 'Imported Rates / sqft' },
      { number: '18mm', label: 'Gangsaw Calibrated' },
      { number: '100%', label: 'Bookmatch Verified' },
    ],
    scrollingTagline: [
      'Direct Carrara Imports',
      'Asia Largest Marble Hub Kishangarh',
      'Bookmatched Vein Alignment',
      'Italian Resin Line Netting',
      'Live Dry-Lay Yard Inspection',
      'Insured Wooden A-Frame Transit',
    ],
    categories: [
      {
        id: 'white-italian',
        title: 'Carrara & Statuario Whites',
        desc: 'Statuario Luxe · Calacatta Gold · Carrara White',
        tag: 'Pinnacle Luxury',
        image: '/images/stones/statuario/statuario_catalog.webp',
        images: [
          '/images/stones/statuario/statuario_stand.webp',
          '/images/stones/michelangelo-marble/michelangelo-marble_stand.webp',
        ],
        href: '/marble',
        count: 10,
      },
      {
        id: 'beige-italian',
        title: 'Botticino & Dyna Beiges',
        desc: 'Botticino Classic · Royal Dyna · Perlato Sicilia',
        tag: 'Timeless Warmth',
        image: '/images/stones/botticino/botticino_catalog.webp',
        images: [
          '/images/stones/botticino/botticino_stand.webp',
          '/images/stones/golden-lisa/golden-lisa_stand.webp',
        ],
        href: '/marble',
        count: 12,
      },
      {
        id: 'exotic-onyx',
        title: 'Backlit Honey & Green Onyx',
        desc: 'Translucent Crystalline Feature Slabs',
        tag: 'Rare Gemstone',
        image: '/images/stones/honey-onyx/honey-onyx_catalog.webp',
        images: [
          '/images/stones/honey-onyx/honey-onyx_stand.webp',
        ],
        href: '/collections/onyx',
        count: 6,
      },
      {
        id: 'dark-italian',
        title: 'Emperador & Dark Marbles',
        desc: 'Dark Emperador · Grey William · Nero Marquina',
        tag: 'Dramatic Accents',
        image: '/images/stones/emperador/emperador_catalog.webp',
        images: [
          '/images/stones/emperador/emperador_stand.webp',
        ],
        href: '/marble',
        count: 8,
      },
    ],
    mosaicHeading: {
      title: 'Italian Marble for',
      titleEm: 'Masterpiece Interiors',
      eyebrow: 'EXCLUSIVELY SPECIFIED SPACES',
      description: 'Transforming private villas, duplex penthouses, and presidential suites with natural stone veining that cannot be replicated.',
    },
    mosaicApps: [
      {
        title: 'Palatial Living Room Flooring',
        sub: 'High-gloss bookmatched Italian marble reflecting ambient light and architectural grandeur.',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
      },
      {
        title: 'Bookmatched Feature Walls',
        sub: 'Mirrored Statuario and Michelangelo slabs creating a monumental work of natural art.',
        image: '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
        href: '/applications/wall-cladding',
      },
      {
        title: 'Master Bathroom Sanctuary',
        sub: 'Seamless floor-to-ceiling Italian marble cladding with integrated vanity countertops.',
        image: '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
        href: '/applications/bathroom',
      },
      {
        title: 'Designer Dining Tabletops',
        sub: 'Custom-contoured marble table slabs with eased edges and stain-resistant sealer.',
        image: '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
        href: '/applications/tabletops',
      },
      {
        title: 'Grand Helical Staircases',
        sub: 'Solid marble treads and bookmatched risers engineered for seamless luxury flow.',
        image: '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
        href: '/applications/staircase',
      },
    ],
    products: [
      {
        id: 'statuario',
        title: 'Statuario Luxe',
        category: 'italian-marble',
        finish: 'Mirror Polished',
        origin: 'Carrara, Tuscany, Italy',
        image: '/images/stones/statuario/statuario_catalog.webp',
        tag: 'Iconic Veining',
      },
      {
        id: 'botticino',
        title: 'Botticino Classic',
        category: 'italian-marble',
        finish: 'High Gloss / Honed',
        origin: 'Brescia, Italy',
        image: '/images/stones/botticino/botticino_catalog.webp',
        tag: 'Cream Luxury',
      },
      {
        id: 'honey-onyx',
        title: 'Honey Onyx',
        category: 'imported-marble',
        finish: 'Polished Translucent',
        origin: 'Eskisehir, Turkey',
        image: '/images/stones/honey-onyx/honey-onyx_catalog.webp',
        tag: 'Backlit Masterpiece',
      },
      {
        id: 'emperador',
        title: 'Dark Emperador',
        category: 'imported-marble',
        finish: 'Polished',
        origin: 'Yecla, Spain',
        image: '/images/stones/emperador/emperador_catalog.webp',
        tag: 'Chocolate Crystal',
      },
      {
        id: 'michelangelo',
        title: 'Michelangelo White',
        category: 'imported-marble',
        finish: 'Mirror Polished',
        origin: 'Afyon, Turkey',
        image: '/images/stones/michelangelo-marble/michelangelo-marble_catalog.webp',
        tag: 'Fine Grey Web',
      },
      {
        id: 'travertine-classic',
        title: 'Classic Beige Travertine',
        category: 'imported-marble',
        finish: 'Honed & Filled',
        origin: 'Denizli, Turkey',
        image: '/images/stones/travertine/travertine_catalog.webp',
        tag: 'Warm Architectural',
      },
    ],
    whyUs: {
      eyebrow: 'IMPORT EXPERTISE',
      title: 'Why Kishangarh is Asia’s Hub for Italian Marble',
      subtitle: 'Sourcing directly from Kishangarh stockyards saves 30% to 45% compared to city retail showrooms.',
      marqueeItems: ['Direct Port Consignments', 'Live Dry-Lay Dry Runs', 'Automated Resin Lines', 'Zero Middleman Overhead', '18mm Gangsaw Calibration', 'Insured Transit'],
      reasons: [
        {
          num: '01',
          title: 'Direct Block Imports from Italian Quarries',
          desc: 'We import raw marble blocks directly from Carrara, Brescia, and Verona into Mundra port, cutting out intermediate multi-tier distributors.',
        },
        {
          num: '02',
          title: 'Computerized Resin Line Reinforcement',
          desc: 'Every imported slab passes through automated epoxy vacuum lines with oven curing and fiberglass backing, ensuring structural stability without fissures.',
        },
        {
          num: '03',
          title: 'Sequential Dry-Lay Inspection Hall',
          desc: 'Our expansive yard allows buyers and architects to lay out 30+ slabs sequentially across our inspection floor to review room-wise bookmatching before loading.',
        },
        {
          num: '04',
          title: 'Certified Calibrated 18mm Thickness',
          desc: 'Unlike retail sellers who supply shaved 15mm–16mm slabs, our Kishangarh facility enforces a strict 18mm gangsaw calibration standard.',
        },
        {
          num: '05',
          title: 'Zero-Wax High-Reflectance Mirror Polish',
          desc: 'Finished using progressive 16-head diamond abrasives to reveal natural crystalline translucency without artificial waxes or silicone coatings.',
        },
        {
          num: '06',
          title: 'A-Frame Wooden Crating & Insured Highway Transit',
          desc: 'Packed vertically with treated wooden A-frames, heavy strapping, and comprehensive transport insurance for damage-free delivery anywhere in India.',
        },
      ],
    },
    projectHeading: {
      eyebrow: 'LUXURY SHOWCASE',
      title: 'Bespoke Landmarks Finished in Italian Stone',
      desc: 'Supplying museum-grade imported marbles to premier private estates, luxury resorts, and high-end commercial monuments.',
    },
    projects: homeProjects,
    testimonials: homeTestimonials,
    faqHeading: {
      eyebrow: 'BUYER GUIDANCE',
      title: 'Frequently Asked Questions',
      titleEm: 'About Italian Marble in Kishangarh',
      description: 'Expert answers on pricing, bookmatching, maintenance, and transportation to your project site.',
    },
    faqs: [
      {
        question: 'What is the price of Italian marble in Kishangarh per sq ft?',
        answer: 'Wholesale prices for genuine Italian marble in Kishangarh range from ₹280 to ₹1,800/sq ft. Botticino and Dyna start around ₹280–₹450/sq ft, while premium Statuario and Calacatta range from ₹650 to ₹1,800/sq ft depending on white purity and vein clarity.',
      },
      {
        question: 'Why should I buy Italian marble from Kishangarh instead of my local city showroom?',
        answer: 'Kishangarh is Asia’s primary stone processing and importing hub, housing over 1,500 yards. Sourcing directly from our Kishangarh facility eliminates 2 to 3 tiers of middleman markups, saving you 30% to 45%, while giving you access to 50+ unbroken block lots rather than small 5-slab showroom remnants.',
      },
      {
        question: 'How do you prevent slab breakage during transit from Kishangarh?',
        answer: 'All Italian marble slabs are reinforced with high-density epoxy netting on the back. Consignments are packed in heavy-duty fumigated wooden A-frames with closed-cell foam sheets between slabs and covered with all-risk transit insurance.',
      },
      {
        question: 'What is bookmatched Italian marble and where is it used?',
        answer: 'Bookmatching is when consecutive slabs cut from the same block are polished on opposite faces, so their vein patterns mirror each other like an open book. It is heavily specified for luxury living room feature walls, dining halls, and grand master suites.',
      },
      {
        question: 'How should Italian marble flooring be maintained in Indian homes?',
        answer: 'Italian marble has a Mohs hardness of 3–4. It should be sealed with a penetrating fluoropolymer sealer upon installation and cleaned daily with pH-neutral stone cleaner. Avoid acidic cleaners like vinegar or bleach.',
      },
    ],
    service: {
      name: 'Italian Marble Wholesale Sourcing',
      serviceType: 'Imported Natural Stone',
    },
    localInfo: {
      city: 'Kishangarh',
      state: 'Rajasthan',
      address: 'Granite Gallery Italian Marble Stockyard, MEGA Highway, Kishangarh, Rajasthan 305801',
      transitTime: 'Immediate Selection & Lot Reservation',
      freightPerSqft: 'Direct factory gate dispatch',
    },
  },

  // ── 3. GRANITE SUPPLIERS IN DELHI NCR ──────────────────────────────────────
  'granite-suppliers-in-delhi': {
    slug: 'granite-suppliers-in-delhi',
    metadata: {
      title: 'Granite Suppliers in Delhi NCR | Direct Kishangarh Factory',
      description: 'Granite suppliers in Delhi NCR. Direct factory dispatch from Kishangarh to Delhi, Gurgaon & Noida. 18mm gangsaw slabs, ₹45–₹350/sqft & 24–48h site delivery.',
      keywords: [
        'granite suppliers in delhi',
        'delhi ncr granite wholesale',
        'black granite suppliers delhi',
        'granite slabs delivery delhi gurgaon noida',
        'kishangarh granite in delhi',
        'granite price in delhi per sq ft',
        'steel grey granite delhi',
      ],
      ogImage: '/images/stones/steel-grey/steel-grey_stand.webp',
      canonical: '/granite-suppliers-in-delhi',
    },
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Granite', path: '/granite' },
      { name: 'Granite Suppliers in Delhi NCR', path: '/granite-suppliers-in-delhi' },
    ],
    heroSlides: [
      {
        image: '/images/stones/steel-grey/steel-grey_stand.webp',
        title: 'Direct Kishangarh Granite Slabs in Delhi NCR',
        sub: 'Bypassing Chhatarpur and Mayapuri dealer markups with direct factory supply from Kishangarh.',
      },
      {
        image: '/images/stones/telephone-black/telephone-black_stand.webp',
        title: 'Jet Black Kitchen Countertops Delivered to Site',
        sub: 'Zero-stain, scratch-proof Telephone Black & Black Galaxy slabs shipped directly to Delhi villas.',
      },
      {
        image: '/images/stones/tan-brown/tan-brown_stand.webp',
        title: 'Anti-Skid Outdoor & Flooring Granites',
        sub: 'Calibrated 18mm & 20mm flamed and lapotra slabs for Gurgaon farmhouses and Noida complexes.',
      },
      {
        image: '/images/stones/lakha-red/lakha-red_stand.webp',
        title: 'Trusted by India’s Premier Capital Projects',
        sub: 'Supplied monumental stone to the Parliament of India, National War Memorial & Central Vista.',
      },
    ],
    trustStats: [
      { number: '350 km', label: 'Direct NH48 Corridor' },
      { number: '24–48h', label: 'Doorstep Transit to NCR' },
      { number: '₹8–₹14', label: 'Direct Freight / sqft' },
      { number: '5,000+', label: 'Completed Delhi Projects' },
    ],
    scrollingTagline: [
      'Direct Kishangarh to Delhi NCR',
      '24–48h Doorstep Site Delivery',
      'Zero Chhatarpur Dealer Markup',
      'Fumigated Wooden A-Frame Packaging',
      'All-Risk Highway Insurance',
      'Crane Loading & Offloading Support',
    ],
    categories: [
      {
        id: 'delhi-black',
        title: 'Jet Black Kitchen Slabs',
        desc: 'Telephone Black · Black Galaxy · Absolute Black',
        tag: 'Kitchen Standard',
        image: '/images/stones/telephone-black/telephone-black_catalog.webp',
        images: [
          '/images/stones/telephone-black/telephone-black_stand.webp',
          '/images/stones/black-galaxy/black-galaxy_stand.webp',
        ],
        href: '/collections/black-granite',
        count: 12,
      },
      {
        id: 'delhi-grey',
        title: 'Steel Grey Flooring Slabs',
        desc: 'Steel Grey Lapotra · Honed Grey · Flamed Paving',
        tag: 'Gurgaon Favorite',
        image: '/images/stones/steel-grey/steel-grey_catalog.webp',
        images: [
          '/images/stones/steel-grey/steel-grey_stand.webp',
        ],
        href: '/granite',
        count: 8,
      },
      {
        id: 'delhi-outdoor',
        title: 'Farmhouse Elevation & Driveways',
        desc: 'Flamed R-Black · Tan Brown · Bush-Hammered Stones',
        tag: 'Heavy Traffic',
        image: '/images/stones/tan-brown/tan-brown_catalog.webp',
        images: [
          '/images/stones/tan-brown/tan-brown_stand.webp',
          '/images/stones/lakha-red/lakha-red_stand.webp',
        ],
        href: '/finishes',
        count: 14,
      },
      {
        id: 'delhi-white',
        title: 'Apartment Flooring Whites',
        desc: 'P White · S White · Cotton White Slabs',
        tag: 'High Durability',
        image: '/images/stones/p-white/p-white_catalog.webp',
        images: [
          '/images/stones/p-white/p-white_catalog.webp',
        ],
        href: '/granite',
        count: 6,
      },
    ],
    mosaicHeading: {
      title: 'Granite Solutions Across',
      titleEm: 'Delhi NCR Architecture',
      eyebrow: 'CAPITAL RESIDENCES & INFRASTRUCTURE',
      description: 'From South Delhi duplex kitchens to Gurgaon farmhouses and Noida high-rise lobbies, natural stone delivered with zero hassle.',
    },
    mosaicApps: [
      {
        title: 'Luxury Kitchen Islands & Countertops',
        sub: 'High-density black and exotic granites impervious to turmeric, lemon, and hot utensils.',
        image: '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
        href: '/applications/kitchen-countertops',
      },
      {
        title: 'Commercial & Residential Flooring',
        sub: '18mm gangsaw calibrated slabs ensuring flush, lippage-free surfaces across expansive floors.',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
      },
      {
        title: 'Gurgaon Farmhouse Facades & Elevation',
        sub: 'Weather-proof mechanical dry-cladding granites resistant to Delhi NCR smog and thermal shock.',
        image: '/images/applications/exterior-cladding/beige-textured-stone-external-cladding-wall.webp',
        href: '/applications/exterior-cladding',
      },
      {
        title: 'Staircase Steps & Risers',
        sub: 'Full bullnosed black and grey granite steps with grooved anti-slip risers.',
        image: '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
        href: '/applications/staircase',
      },
      {
        title: 'Driveways, Ramps & Parking Paving',
        sub: '20mm–30mm flamed and bush-hammered granite that withstands luxury SUV vehicular wear.',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
      },
    ],
    products: [
      {
        id: 'telephone-black',
        title: 'Telephone Black',
        category: 'granite',
        finish: 'Mirror Polished',
        origin: 'Rajasthan, India',
        image: '/images/stones/telephone-black/telephone-black_catalog.webp',
        tag: 'Zero Stain',
      },
      {
        id: 'steel-grey',
        title: 'Steel Grey',
        category: 'granite',
        finish: 'Lapotra / Polished',
        origin: 'Telangana, India',
        image: '/images/stones/steel-grey/steel-grey_catalog.webp',
        tag: 'NCR Favorite',
      },
      {
        id: 'black-galaxy',
        title: 'Black Galaxy',
        category: 'granite',
        finish: 'Mirror Polished',
        origin: 'Andhra Pradesh, India',
        image: '/images/stones/black-galaxy/black-galaxy_catalog.webp',
        tag: 'Gold Fleck',
      },
      {
        id: 'tan-brown',
        title: 'Tan Brown',
        category: 'granite',
        finish: 'Polished / Flamed',
        origin: 'Telangana, India',
        image: '/images/stones/tan-brown/tan-brown_catalog.webp',
        tag: 'Farmhouse Grade',
      },
      {
        id: 'p-white',
        title: 'P White',
        category: 'granite',
        finish: 'Polished',
        origin: 'Rajasthan, India',
        image: '/images/stones/p-white/p-white_catalog.webp',
        tag: 'Economical Floor',
      },
      {
        id: 'lakha-red',
        title: 'Lakha Red',
        category: 'granite',
        finish: 'Mirror Polished',
        origin: 'Jodhpur, Rajasthan',
        image: '/images/stones/lakha-red/lakha-red_catalog.webp',
        tag: 'Monument Grade',
      },
    ],
    whyUs: {
      eyebrow: 'DIRECT DISPATCH ADVANTAGE',
      title: 'Why Delhi NCR Builders Order from Our Kishangarh Facility',
      subtitle: 'Fast 24–48 hour transit directly to your project site via the NH48 expressway corridor.',
      marqueeItems: ['24–48h Delivery', 'Direct Highway Corridor', 'Zero Retail Markup', '100% Insured Consignment', 'Single-Block Consistency', 'Technical Laying Advisory'],
      reasons: [
        {
          num: '01',
          title: '30% Savings Over Chhatarpur & Mayapuri',
          desc: 'Local Delhi stone markets add significant warehouse rent, dealer commissions, and multiple loading markups. Buying direct from Kishangarh saves ₹30–₹80 per sq ft.',
        },
        {
          num: '02',
          title: 'Direct NH48 Highway Logistics (24–48 Hours)',
          desc: 'Our dedicated freight trucks run daily from Kishangarh to Delhi, Gurgaon, Noida, and Faridabad, delivering straight to your unloading crane at the construction site.',
        },
        {
          num: '03',
          title: 'Export-Grade Fumigated Wooden A-Frames',
          desc: 'Every consignment is secured in heavy-duty wooden A-frames with high-density foam padding and covered by all-risk transit insurance against accidental cracks.',
        },
        {
          num: '04',
          title: 'Live 4K Digital Sourcing & Caliper Verification',
          desc: 'Can’t travel to Kishangarh? Our sales engineers provide live 4K video walk-throughs, dry-lay lot photos, caliper thickness checks, and wet-tests before dispatch.',
        },
        {
          num: '05',
          title: 'Single-Block Gangsaw Consistency for Entire Bungalows',
          desc: 'Reserve 2,000 to 10,000 sq ft from identical quarry blocks, eliminating the mismatched lot variations and color shifts common in city retail yards.',
        },
        {
          num: '06',
          title: 'On-Site Technical Laying Advisory',
          desc: 'Comprehensive guidance on moisture-resistant white polymer adhesives, expansion joints, and crystallization polishing tailored to North India’s extreme temperature swings.',
        },
      ],
    },
    projectHeading: {
      eyebrow: 'CAPITAL TRACK RECORD',
      title: 'Landmarks Delivered in the Capital Region',
      desc: 'Proud suppliers of granite and architectural stone to India’s most prestigious government and commercial institutions in New Delhi.',
    },
    projects: homeProjects,
    testimonials: homeTestimonials,
    faqHeading: {
      eyebrow: 'DELHI LOGISTICS',
      title: 'Frequently Asked Questions',
      titleEm: 'About Delhi NCR Granite Supply',
      description: 'Everything you need to know about freight rates, transit times, offloading, and order tracking from Kishangarh to Delhi.',
    },
    faqs: [
      {
        question: 'How long does delivery take from Kishangarh to Delhi, Gurgaon, or Noida?',
        answer: 'Transit from our Kishangarh yard to Delhi NCR typically takes 24 to 48 hours via the NH48 expressway corridor. Consignments are dispatched with GPS vehicle tracking and contact details for the trailer captain.',
      },
      {
        question: 'What is the freight cost per square foot from Kishangarh to Delhi NCR?',
        answer: 'Freight typically ranges between ₹8 and ₹14 per sq ft for 18mm granite slabs depending on total consignment tonnage and exact drop location in Delhi, Gurgaon, Noida, or Greater Noida.',
      },
      {
        question: 'Can you supply part-loads or is a full truckload required for Delhi orders?',
        answer: 'We supply both! For individual home renovations requiring 500 to 1,500 sq ft, we offer consolidated part-load shipments with weekly scheduled drops. For commercial projects, direct dedicated multi-axle trailers (3,800–4,200 sq ft) are dispatched.',
      },
      {
        question: 'How are slabs unloaded safely at my construction site in Delhi?',
        answer: 'We coordinate with hydraulic crane operators in Delhi NCR or dispatch trucks equipped with lifting tackle. Slabs are packed vertically in A-frame crates so crane slings can easily hoist entire batches safely to your ground floor or stilt parking.',
      },
      {
        question: 'How do I inspect slabs if I cannot travel to Kishangarh from Delhi?',
        answer: 'Our sales engineers conduct live 4K video inspections. We walk you through your reserved lots, wipe slabs with water to reveal true color, check thickness with digital calipers at all four corners, and send high-resolution photos before you confirm the order.',
      },
    ],
    service: {
      name: 'Granite Supply to Delhi NCR',
      serviceType: 'Natural Stone Logistics',
    },
    localInfo: {
      city: 'Delhi NCR',
      state: 'Delhi / Haryana / UP',
      address: 'Direct Delivery to Delhi, Gurgaon, Noida, Faridabad & Ghaziabad from Kishangarh Facility',
      transitTime: '24–48 Hours Doorstep Transit',
      freightPerSqft: '₹8–₹14 / sq ft via dedicated NH48 corridor',
    },
  },

  // ── 4. MARBLE SUPPLIERS IN DELHI NCR ───────────────────────────────────────
  'marble-suppliers-in-delhi': {
    slug: 'marble-suppliers-in-delhi',
    metadata: {
      title: 'Marble Suppliers in Delhi NCR | Italian & Makrana Slabs',
      description: 'Marble suppliers in Delhi NCR. Buy Makrana White & Italian Statuario direct from Kishangarh. 18mm gangsaw slabs, 100% single-block lots & 24–48h site delivery.',
      keywords: [
        'marble suppliers in delhi',
        'italian marble in delhi',
        'makrana white marble delhi ncr',
        'kishangarh marble suppliers for delhi villas',
        'marble flooring slabs delhi',
        'best marble showroom delhi gurgaon',
        'statuario marble price delhi',
      ],
      ogImage: '/images/stones/makrana-white/makrana-white_stand.webp',
      canonical: '/marble-suppliers-in-delhi',
    },
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Marble', path: '/marble' },
      { name: 'Marble Suppliers in Delhi NCR', path: '/marble-suppliers-in-delhi' },
    ],
    heroSlides: [
      {
        image: '/images/stones/statuario/statuario_stand.webp',
        title: 'Authentic Italian & Indian Marble in Delhi NCR',
        sub: 'Direct Kishangarh supply of Makrana White, Statuario, Botticino & Calacatta Gold slabs.',
      },
      {
        image: '/images/stones/makrana-white/makrana-white_stand.webp',
        title: 'Historic Makrana Pure White Marble',
        sub: '98% calcium purity, zero pinholes, and natural brilliance that lasts generations.',
      },
      {
        image: '/images/stones/botticino/botticino_stand.webp',
        title: 'Classic Botticino & Dyna Beige Slabs',
        sub: 'Warm, luminous Italian flooring delivered directly to South Delhi and Gurgaon luxury residences.',
      },
      {
        image: '/images/stones/honey-onyx/honey-onyx_stand.webp',
        title: 'Illuminated Onyx & Bookmatched Masterpieces',
        sub: 'Custom-crating and zero-breakage insured transit to construction sites across Delhi NCR.',
      },
    ],
    trustStats: [
      { number: '24–48h', label: 'Delivery to Delhi NCR' },
      { number: '100%', label: 'Single-Block Lots' },
      { number: '₹10–₹16', label: 'Highway Freight / sqft' },
      { number: '18mm', label: 'Uniform Calibration' },
    ],
    scrollingTagline: [
      'Direct Kishangarh to Delhi NCR',
      'Single-Block Lot Integrity',
      'Zero Shade Variation Guarantee',
      'Makrana & Italian Marble',
      'Insured Wooden A-Frame Transit',
      'Doorstep Site Delivery',
    ],
    categories: [
      {
        id: 'delhi-italian-white',
        title: 'Statuario & Calacatta Slabs',
        desc: 'Bookmatched Italian White Slabs for Delhi Living Rooms',
        tag: 'Ultra Luxury',
        image: '/images/stones/statuario/statuario_catalog.webp',
        images: [
          '/images/stones/statuario/statuario_stand.webp',
          '/images/stones/michelangelo-marble/michelangelo-marble_stand.webp',
        ],
        href: '/marble',
        count: 10,
      },
      {
        id: 'delhi-makrana',
        title: 'Heritage Makrana White',
        desc: 'Makrana Pure White · Albeta · Dungri',
        tag: 'Taj Mahal Quality',
        image: '/images/stones/makrana-white/makrana-white_catalog.webp',
        images: [
          '/images/stones/makrana-white/makrana-white_stand.webp',
        ],
        href: '/marble',
        count: 8,
      },
      {
        id: 'delhi-beige',
        title: 'Botticino & Royal Dyna',
        desc: 'Warm Cream Marbles for Elegant Bedrooms & Halls',
        tag: 'Bestseller',
        image: '/images/stones/botticino/botticino_catalog.webp',
        images: [
          '/images/stones/botticino/botticino_stand.webp',
          '/images/stones/golden-lisa/golden-lisa_stand.webp',
        ],
        href: '/marble',
        count: 12,
      },
      {
        id: 'delhi-onyx',
        title: 'Translucent Honey Onyx',
        desc: 'Bar Counters · Backlit Feature Walls · Vanities',
        tag: 'Exotic Gemstone',
        image: '/images/stones/honey-onyx/honey-onyx_catalog.webp',
        images: [
          '/images/stones/honey-onyx/honey-onyx_stand.webp',
        ],
        href: '/collections/onyx',
        count: 6,
      },
    ],
    mosaicHeading: {
      title: 'Marble Elegance for',
      titleEm: 'Delhi’s Finest Residences',
      eyebrow: 'ARCHITECTURAL APPLICATION',
      description: 'Supplying museum-grade natural marble to farmhouses in Chhatarpur, luxury villas in Gurgaon, and penthouses across Delhi NCR.',
    },
    mosaicApps: [
      {
        title: 'South Delhi Villa Living Halls',
        sub: 'Expansive mirror-polished bookmatched Italian marble flooring with seamless vein flow.',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
      },
      {
        title: 'Gurgaon Penthouse Master Bathrooms',
        sub: 'Full-slab wall cladding and integrated custom vanity basins in Statuario and Botticino.',
        image: '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
        href: '/applications/bathroom',
      },
      {
        title: 'Sacred Mandir & Pooja Rooms',
        sub: 'Pure Makrana White marble with zero color blemish and eternal crystalline brilliance.',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
      },
      {
        title: 'Bookmatched Feature Walls & Bars',
        sub: 'Backlit translucent honey onyx and dramatically veined marble accent walls.',
        image: '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
        href: '/applications/wall-cladding',
      },
      {
        title: 'Sculptural Dining Tables & Islands',
        sub: 'Custom-cut solid marble slabs with beveled edges and protective fluoropolymer sealing.',
        image: '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
        href: '/applications/tabletops',
      },
    ],
    products: [
      {
        id: 'statuario',
        title: 'Statuario Luxe',
        category: 'italian-marble',
        finish: 'Mirror Polished',
        origin: 'Carrara, Tuscany, Italy',
        image: '/images/stones/statuario/statuario_catalog.webp',
        tag: 'Iconic Veining',
      },
      {
        id: 'makrana-white',
        title: 'Makrana Pure White',
        category: 'marble',
        finish: 'Mirror Polished',
        origin: 'Makrana, Rajasthan',
        image: '/images/stones/makrana-white/makrana-white_catalog.webp',
        tag: 'Heritage Quality',
      },
      {
        id: 'botticino',
        title: 'Botticino Classic',
        category: 'italian-marble',
        finish: 'Polished',
        origin: 'Brescia, Italy',
        image: '/images/stones/botticino/botticino_catalog.webp',
        tag: 'Warm Classic',
      },
      {
        id: 'honey-onyx',
        title: 'Honey Onyx',
        category: 'imported-marble',
        finish: 'Polished Translucent',
        origin: 'Eskisehir, Turkey',
        image: '/images/stones/honey-onyx/honey-onyx_catalog.webp',
        tag: 'Backlit Feature',
      },
      {
        id: 'vietnam-white',
        title: 'Vietnam Crystal White',
        category: 'imported-marble',
        finish: 'High Gloss',
        origin: 'Luc Yen, Vietnam',
        image: '/images/stones/vietnam-white/vietnam-white_catalog.webp',
        tag: 'Pure White',
      },
      {
        id: 'golden-lisa',
        title: 'Golden Lisa',
        category: 'imported-marble',
        finish: 'Polished',
        origin: 'Burdur, Turkey',
        image: '/images/stones/golden-lisa/golden-lisa_catalog.webp',
        tag: 'Golden Veins',
      },
    ],
    whyUs: {
      eyebrow: 'DIRECT MANDI SUPPLY',
      title: 'Why Buy Marble from Kishangarh Instead of Delhi Showrooms',
      subtitle: 'Complete single-block lot transparency with 30% to 40% direct savings.',
      marqueeItems: ['Single-Block Lots', 'Zero Dye Mixing', '18mm Gangsaw Standard', 'Insured Direct Transit', '4K Video Inspection', 'Direct Freight Logistics'],
      reasons: [
        {
          num: '01',
          title: 'Guaranteed Single-Block Lot Integrity',
          desc: 'City showrooms often mix slabs from different quarry batches, causing ugly shade clashes once laid. We supply entire orders from a single numbered gangsaw block.',
        },
        {
          num: '02',
          title: 'Substantial 35% Price Advantage',
          desc: 'By sourcing directly from our Kishangarh yard on the MEGA Highway, you bypass expensive South Delhi showroom rents, dealer margins, and middleman markups.',
        },
        {
          num: '03',
          title: 'True 18mm Calibrated Thickness',
          desc: 'We never compromise on thickness. While retail markets frequently sell thin 15mm or 16mm commercial cuts, our slabs adhere strictly to 18mm gangsaw calibration.',
        },
        {
          num: '04',
          title: 'Direct Doorstep Offloading Support in NCR',
          desc: 'Our freight trucks navigate direct to your site in Delhi, Gurgaon, or Noida, equipped with heavy wooden A-frames designed for crane offloading without chipping.',
        },
        {
          num: '05',
          title: 'Live 4K Digital Slab Approval & Video Dry Lay',
          desc: 'Inspect full blocks virtually with high-resolution video scans, wet-surface vein clarity tests, and micrometer thickness measurements before dispatch.',
        },
        {
          num: '06',
          title: 'Zero-Defect Transit Insurance & Direct Freight Coordination',
          desc: 'Insured door-to-site transit with dedicated GPS tracking and experienced drivers trained in transporting heavy luxury stone consignments.',
        },
      ],
    },
    projectHeading: {
      eyebrow: 'CAPITAL LANDMARKS',
      title: 'Enduring Natural Stone Across New Delhi',
      desc: 'Our natural marble and stone adorn India’s landmark government buildings, diplomatic enclaves, and prominent luxury villas.',
    },
    projects: homeProjects,
    testimonials: homeTestimonials,
    faqHeading: {
      eyebrow: 'NCR FAQS',
      title: 'Frequently Asked Questions',
      titleEm: 'About Marble Delivery to Delhi',
      description: 'Clear answers on pricing, delivery timelines, crack insurance, and video inspection from Kishangarh.',
    },
    faqs: [
      {
        question: 'What is the price of marble delivered to Delhi NCR from Kishangarh?',
        answer: 'Indian marble (like Makrana White or Morwad) starts around ₹75–₹250/sq ft. Imported Italian marble ranges from ₹280–₹1,800/sq ft ex-Kishangarh. Adding ₹10–₹16/sq ft freight and 18% GST gives you the complete delivered cost, saving 30–45% over Delhi retail prices.',
      },
      {
        question: 'How do you guarantee that slabs won’t crack during the 350 km highway transit?',
        answer: 'Slabs are strapped vertically on certified heavy-duty wooden A-frames with high-density foam buffers between slabs. Each truck consignment is protected under comprehensive all-risk marine/transit insurance.',
      },
      {
        question: 'How much marble should I order for a 3,000 sq ft house in Delhi?',
        answer: 'For a 3,000 sq ft net floor area, architects recommend adding 10% to 15% wastage (approx. 3,300 to 3,450 sq ft) for pattern matching, edge cuts, and skirting tiles. Ordering the full amount from a single block lot ensures zero shade variation.',
      },
      {
        question: 'Can I inspect the slabs via video call before they leave Kishangarh?',
        answer: 'Yes. We offer high-definition 4K video inspections. Our engineers showcase the exact slabs reserved for your order, wet the stone to reveal natural color patterns, and measure thickness with digital calipers live on call.',
      },
      {
        question: 'How long does delivery take to Gurgaon, South Delhi, or Noida?',
        answer: 'Once loaded at our Kishangarh yard, transit via the NH48 expressway takes 24 to 48 hours directly to your designated site in Delhi, Gurgaon, Noida, or Greater Noida.',
      },
    ],
    service: {
      name: 'Marble Supply to Delhi NCR',
      serviceType: 'Luxury Natural Stone Logistics',
    },
    localInfo: {
      city: 'Delhi NCR',
      state: 'Delhi / Haryana / UP',
      address: 'Direct Factory Sourcing from Kishangarh to Delhi, Gurgaon, Noida, Faridabad',
      transitTime: '24–48 Hours Doorstep Delivery',
      freightPerSqft: '₹10–₹16 / sq ft via dedicated NH48 corridor',
    },
  },

  // ── 5. NATURAL STONE FOR LUXURY VILLAS ──────────────────────────────────────
  'natural-stone-for-luxury-villas': {
    slug: 'natural-stone-for-luxury-villas',
    metadata: {
      title: 'Natural Stone for Luxury Villas | Bookmatched Slabs',
      description: 'Natural stone for luxury villas. Bookmatched Statuario marble, flamed granite facades, travertine baths & backlit onyx. Direct Kishangarh factory supply.',
      keywords: [
        'natural stone for luxury villas',
        'marble and granite for luxury homes',
        'luxury villa flooring stone india',
        'bookmatched marble for living rooms',
        'custom architectural stone kishangarh',
        'villa facade stone cladding',
        'imported marble for farmhouses',
      ],
      ogImage: '/images/stones/statuario/statuario_stand.webp',
      canonical: '/natural-stone-for-luxury-villas',
    },
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Applications', path: '/applications' },
      { name: 'Natural Stone for Luxury Villas', path: '/natural-stone-for-luxury-villas' },
    ],
    heroSlides: [
      {
        image: '/images/stones/statuario/statuario_stand.webp',
        title: 'Architectural Stone for Bespoke Luxury Villas',
        sub: 'Monolithic bookmatched Italian marble, flamed exterior facades, and handcrafted natural stone surfaces.',
      },
      {
        image: '/images/stones/honey-onyx/honey-onyx_stand.webp',
        title: 'Turnkey Architectural Stone Sourcing',
        sub: 'Curating harmonized quarry lots for grand double-height living halls, master suites, and outdoor landscapes.',
      },
      {
        image: '/images/stones/black-galaxy/black-galaxy_stand.webp',
        title: 'Tactile Finishes for Indoor & Outdoor Flow',
        sub: 'Leathered Lapotra, flamed anti-skid pool copings, and diamond mirror-polished luxury slabs.',
      },
      {
        image: '/images/stones/travertine/travertine_stand.webp',
        title: 'Direct Quarry to Villa White-Glove Logistics',
        sub: 'Precision 18mm gangsaw calibration, sequential dry-lay matching, and insured site delivery across India.',
      },
    ],
    trustStats: [
      { number: '100%', label: 'Bookmatch Verified' },
      { number: 'Mohs 6–7', label: 'Granite Scratch Hardness' },
      { number: '< 0.20%', label: 'Water Absorption' },
      { number: 'White-Glove', label: 'Doorstep Logistics' },
    ],
    scrollingTagline: [
      'Bespoke Villa Architectural Sourcing',
      'Bookmatched Italian Statuario',
      'Flamed Outdoor Pool Coping',
      'Translucent Onyx Feature Walls',
      'Single-Block Lot Integrity',
      'White-Glove Insured Delivery',
    ],
    categories: [
      {
        id: 'villa-living',
        title: 'Grand Living Room Marbles',
        desc: 'Statuario Luxe · Botticino · Michelangelo White',
        tag: 'Statement Flooring',
        image: '/images/stones/statuario/statuario_catalog.webp',
        images: [
          '/images/stones/statuario/statuario_stand.webp',
          '/images/stones/michelangelo-marble/michelangelo-marble_stand.webp',
        ],
        href: '/marble',
        count: 10,
      },
      {
        id: 'villa-facade',
        title: 'Exterior Facades & Cladding',
        desc: 'Bansi Paharpur · Jodhpur Sandstone · Flamed Granite',
        tag: 'Monumental Elevation',
        image: '/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_catalog.webp',
        images: [
          '/images/collections/sandstone/english-teak-sandstone/english-teak-sandstone_catalog.webp',
          '/images/stones/tan-brown/tan-brown_stand.webp',
        ],
        href: '/finishes',
        count: 12,
      },
      {
        id: 'villa-bathroom',
        title: 'Master Suite Bathrooms',
        desc: 'Natural Beige Travertine · Honey Onyx Vanities',
        tag: 'Spa Sanctuary',
        image: '/images/stones/honey-onyx/honey-onyx_catalog.webp',
        images: [
          '/images/stones/honey-onyx/honey-onyx_stand.webp',
          '/images/stones/travertine/travertine_stand.webp',
        ],
        href: '/collections/onyx',
        count: 8,
      },
      {
        id: 'villa-outdoor',
        title: 'Driveways & Pool Coping',
        desc: 'Flamed R Black · Bush-Hammered Stones · Anti-Skid',
        tag: 'Permanent Landscape',
        image: '/images/stones/r-black/r-black_catalog.webp',
        images: [
          '/images/stones/r-black/r-black_stand.webp',
          '/images/stones/tan-brown/tan-brown_stand.webp',
        ],
        href: '/granite',
        count: 10,
      },
    ],
    mosaicHeading: {
      title: 'Architectural Stone Across the',
      titleEm: 'Luxury Villa Canvas',
      eyebrow: 'INTEGRATED DESIGN HARMONY',
      description: 'Creating seamless visual continuity from the grand entry foyer to private bedroom terraces and outdoor landscaped gardens.',
    },
    mosaicApps: [
      {
        title: 'Double-Height Living Hall',
        sub: 'Flawless bookmatched Statuario marble reflecting natural sunlight with dramatic grey veining.',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
      },
      {
        title: 'Gourmet Kitchen Island & Countertop',
        sub: 'Solid 20mm Telephone Black and Quartzite slabs impervious to thermal shock and food stains.',
        image: '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
        href: '/applications/kitchen-countertops',
      },
      {
        title: 'Master Bathroom Sanctuary',
        sub: 'Porous beige travertine and backlit honey onyx walls creating a private six-star spa experience.',
        image: '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
        href: '/applications/bathroom',
      },
      {
        title: 'Helical Floating Staircase',
        sub: 'Monolithic cut-to-size marble treads with mitred returns and continuous vein alignment.',
        image: '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
        href: '/applications/staircase',
      },
      {
        title: 'Outdoor Infinity Pool & Patio',
        sub: 'Thermal-flamed and brushed anti-skid granite copings comfortable under bare feet in direct sun.',
        image: '/images/applications/exterior-cladding/beige-textured-stone-external-cladding-wall.webp',
        href: '/applications/exterior-cladding',
      },
    ],
    products: [
      {
        id: 'statuario',
        title: 'Statuario Luxe',
        category: 'italian-marble',
        finish: 'Mirror Polished',
        origin: 'Carrara, Italy',
        image: '/images/stones/statuario/statuario_catalog.webp',
        tag: 'Bookmatched Masterpiece',
      },
      {
        id: 'honey-onyx',
        title: 'Honey Onyx',
        category: 'imported-marble',
        finish: 'Polished Translucent',
        origin: 'Eskisehir, Turkey',
        image: '/images/stones/honey-onyx/honey-onyx_catalog.webp',
        tag: 'Backlit Bar & Bath',
      },
      {
        id: 'travertine-classic',
        title: 'Natural Beige Travertine',
        category: 'imported-marble',
        finish: 'Honed & Filled',
        origin: 'Denizli, Turkey',
        image: '/images/stones/travertine/travertine_catalog.webp',
        tag: 'Architectural Warmth',
      },
      {
        id: 'black-galaxy',
        title: 'Black Galaxy Lapotra',
        category: 'granite',
        finish: 'Leathered Lapotra',
        origin: 'Andhra Pradesh, India',
        image: '/images/stones/black-galaxy/black-galaxy_catalog.webp',
        tag: 'Matte Tactile Luxury',
      },
      {
        id: 'telephone-black',
        title: 'Telephone Black',
        category: 'granite',
        finish: 'Mirror Polished',
        origin: 'Rajasthan, India',
        image: '/images/stones/telephone-black/telephone-black_catalog.webp',
        tag: 'Kitchen Countertop',
      },
      {
        id: 'lakha-red',
        title: 'Lakha Red Flamed',
        category: 'granite',
        finish: 'Flamed Anti-Skid',
        origin: 'Rajasthan, India',
        image: '/images/stones/lakha-red/lakha-red_catalog.webp',
        tag: 'Driveway Paving',
      },
    ],
    whyUs: {
      eyebrow: 'BESPOKE RESIDENTIAL SOURCING',
      title: 'Why Leading Villa Architects Partner with Granite Gallery',
      subtitle: 'End-to-end material curation, slab mapping, and precision gangsaw fabrication.',
      marqueeItems: ['Curated Quarry Lots', 'Dry-Lay CAD Mapping', '18mm/20mm Calibrated', 'White-Glove Site Logistics', 'CNC Pre-Cutting', 'Export-Grade Crating'],
      reasons: [
        {
          num: '01',
          title: 'Architect Concierge & CAD Vein Mapping',
          desc: 'We assist architects in virtually dry-laying bookmatched slabs against project architectural floor plans, ensuring harmonious vein flow across doorways and corners.',
        },
        {
          num: '02',
          title: 'Single-Block Lot Integrity for Large Estates',
          desc: 'For villas requiring 10,000 to 40,000 sq ft of stone, we reserve entire consecutive quarry blocks, guaranteeing zero color variation between rooms or levels.',
        },
        {
          num: '03',
          title: 'Multi-Surface Finish Customization',
          desc: 'Specify the same stone in mirror polished for the interior hall, leathered for the kitchen island, and flamed for the adjoining outdoor patio for seamless spatial continuity.',
        },
        {
          num: '04',
          title: 'Direct Factory Sourcing Without Showroom Premiums',
          desc: 'Sourcing directly from our Kishangarh facility allows villa owners to reallocate 35% of their stone budget into higher-grade bookmatched slabs or exotic gemstones.',
        },
        {
          num: '05',
          title: 'Precision Waterjet Edge Profiling & Pre-Cutting',
          desc: 'Customized CNC edge profiling, bullnosing, and mitered apron cutting delivered ready for immediate assembly without messy site fabrication.',
        },
        {
          num: '06',
          title: 'White-Glove Export Crating & Insured Site Delivery',
          desc: 'Heavy-duty vertical wooden A-frame packaging with foam interleaving, ensuring zero edge chipping from factory yard to site crane.',
        },
      ],
    },
    projectHeading: {
      eyebrow: 'SIGNATURE PORTFOLIO',
      title: 'Architectural Stone in Landmark Luxury Projects',
      desc: 'Our natural stone graces award-winning five-star hospitality retreats, historic heritage suites, and private country estates.',
    },
    projects: homeProjects,
    testimonials: homeTestimonials,
    faqHeading: {
      eyebrow: 'VILLA SPECIFICATIONS',
      title: 'Frequently Asked Questions',
      titleEm: 'About Villa Stone Sourcing',
      description: 'Expert advice on material selection, thickness standards, maintenance, and white-glove site delivery.',
    },
    faqs: [
      {
        question: 'How do you coordinate stone selection for a complete luxury villa?',
        answer: 'Our architectural team reviews your CAD drawings to calculate exact square footage per space. We then reserve matching block lots for living halls (bookmatched marble), kitchens (high-density granite/quartzite), bathrooms (travertine/onyx), and outdoor driveways (flamed stone), providing dry-lay photos before shipping.',
      },
      {
        question: 'Why is natural stone preferred over large-format porcelain tiles for luxury villas?',
        answer: 'Porcelain tiles are merely printed ceramic with a 1mm glaze that chips easily, cannot be refinished, and produces hollow footstep acoustics. Natural stone is solid, cool underfoot, repairable, gains a distinguished patina over decades, and significantly increases real estate valuation.',
      },
      {
        question: 'What thickness is recommended for luxury villa stone applications?',
        answer: '18mm gangsaw calibrated slabs are the standard for interior flooring and walls. For kitchen islands, cantilevered counters, stair treads, and outdoor driveway vehicular paving, 20mm to 30mm thickness is recommended for structural strength.',
      },
      {
        question: 'How do you protect outdoor stone against weather and algae in Indian climates?',
        answer: 'We supply high-density, low-absorption natural granites and sandstones with slip-resistant flamed or bush-hammered textures. Applying a deep-penetrating silane/siloxane sealer protects the stone against rainwater, UV fading, and organic mold without creating a slippery film.',
      },
      {
        question: 'Can you deliver directly to villa construction sites in remote or gated locations?',
        answer: 'Yes. We deliver across India—from Delhi NCR farmhouses and Alibaug coastal villas to Bangalore gated communities and Goa holiday homes—using dedicated trucks with all-risk insurance and customized crane offloading.',
      },
    ],
    service: {
      name: 'Turnkey Natural Stone for Luxury Villas',
      serviceType: 'Architectural Stone Specification',
    },
    localInfo: {
      city: 'Pan-India Villa Belts',
      state: 'Direct Dispatch from Kishangarh Facility',
      address: 'Granite Gallery Architectural Sourcing Studio, MEGA Highway, Kishangarh, Rajasthan 305801',
      transitTime: '24–72 Hours Express Delivery to Site',
      freightPerSqft: 'Consolidated Dedicated Transport with All-Risk Insurance',
    },
  },
};

export function getFlagshipPage(slug: string): FlagshipPageData | undefined {
  return flagshipPages[slug];
}

export function getAllFlagshipSlugs(): string[] {
  return Object.keys(flagshipPages);
}
