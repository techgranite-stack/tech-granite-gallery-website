// ============================================================
// src/lib/landing-pages-data.ts
//
// Content model for keyword-targeted landing pages under the
// `(landing-pages)` route group.
//
// ── Why this file was rewritten ──────────────────────────────
// The previous shape carried only { slug, metadata, sections[] }, where each
// section was a component name plus a colour variant:
//
//     { type: 'hero', personality: 'marble', grid: 'luxury' }
//
// That is a *layout* schema, not a *content* schema. The route rendered
// `<HeroSlider />`, `<NumberedCardGrid />` and `<CoverflowCarousel />` with no
// props, so every one of them fell back to the homepage's own data. The result:
//
//     /                                H1 "Where Stone Meets Timeless Elegance"
//     /marble-exporters-in-kishangarh  H1 "Where Stone Meets Timeless Elegance"
//
// Identical H1, 679 words of which every sentence also appeared on the
// homepage, and the word "Kishangarh" present only in the footer address. The
// page targeting the primary local keyword was a duplicate of the homepage, and
// no amount of new slugs could fix that while the type had nowhere to put
// unique copy.
//
// This model gives each page its own H1, prose, local block, FAQs and schema.
// Layout choices stay, but they now decorate real content instead of standing
// in for it.
// ============================================================

import type { FAQItem } from '@/types';
import {
  primaryLocation,
  areasServed,
  addressOneLine,
  dispatch,
} from '@/data/local-seo';

/** Hero band — supplies the page's single H1. */
export interface LandingHero {
  eyebrow: string;
  /** The H1. Must be unique per page and carry the target keyword naturally. */
  h1: string;
  /** Italic copper fragment rendered after the H1 text. */
  h1Em?: string;
  subtitle: string;
  images: string[];
  /** Describes the photograph, for image search. Not a keyword dump. */
  imageAlt: string;
  badges?: { value: string; label: string }[];
}

/** A prose section: H2 + paragraphs, optionally with a definition list. */
export interface ProseBlock {
  id: string;
  eyebrow?: string;
  heading: string;
  /** Italic copper fragment rendered after the heading. */
  headingEm?: string;
  body: string[];
  bullets?: { title: string; text: string }[];
  /** Renders on the mahogany ground instead of ivory. */
  dark?: boolean;
}

/** Pulls real stones from the catalogue into the page by slug. */
export interface StoneShowcase {
  eyebrow: string;
  heading: string;
  headingEm?: string;
  intro?: string;
  /** Slugs resolved against the stone catalogue at render time. */
  slugs: string[];
}

/** The NAP + directions block. The substance of an on-page local signal. */
export interface LandingLocalInfo {
  eyebrow: string;
  heading: string;
  headingEm?: string;
  intro: string;
  /** Plain-language travel directions — genuinely useful, and locally specific. */
  directions: { label: string; detail: string }[];
  /** Google Maps embed URL. */
  mapEmbedUrl: string;
}

export interface LandingPageData {
  slug: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  /** Visible trail + BreadcrumbList schema. */
  breadcrumb: { name: string; path: string }[];
  hero: LandingHero;
  /** Opening prose — the first thing under the hero. */
  intro: ProseBlock;
  /** Body sections, rendered in order. */
  blocks: ProseBlock[];
  showcase?: StoneShowcase;
  /** Marquee strip between the showcase and the local block. */
  tagline?: string[];
  localInfo?: LandingLocalInfo;
  faqs: FAQItem[];
  /** Heading for the FAQ accordion. Falls back to a generic pair if omitted. */
  faqHeading?: { title: string; titleEm: string; description: string };
  /** Drives the schema.org/Service node. */
  service: { name: string; serviceType: string };
  /** Pattern ID for structured layout differentiation */
  pattern?: string;
  /** High-impact numerical metrics band */
  statsBand?: { number: string; label: string }[];
  /** Step-by-step numbered guide (e.g. Quality inspection, Sourcing workflow) */
  numberedCards?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    marqueeItems?: string[];
    reasons: { title: string; desc: string }[];
  };
  /** Visual mosaic grid for applications, finishes, or spaces */
  mosaicApps?: {
    title: string;
    sub: string;
    image: string;
    href?: string;
    wide?: boolean;
  }[];
}

// ─── Shared: the Google Maps embed for the Kishangarh facility ────────────────

const KISHANGARH_MAP_EMBED =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent(addressOneLine) +
  '&t=&z=15&ie=UTF8&iwloc=&output=embed';

// ─── Pages ───────────────────────────────────────────────────────────────────

export const landingPages: Record<string, LandingPageData> = {
  /**
   * PRIMARY LOCAL LANDING PAGE.
   *
   * Target cluster:
   *   marble exporters in kishangarh   (primary)
   *   marble supplier kishangarh
   *   granite manufacturer kishangarh
   *   kishangarh marble market / marble mandi kishangarh
   *   buy marble in kishangarh
   *
   * The copy below is written to answer what someone searching those terms
   * actually wants to know — where the yard is, what is in it, how slabs get
   * from Kishangarh to their site — rather than to repeat the keyword. Every
   * factual claim here is either already stated elsewhere on the site or is
   * checkable geography. Nothing is invented to fill space.
   */
  'marble-exporters-in-kishangarh': {
    slug: 'marble-exporters-in-kishangarh',
    metadata: {
      // 58 chars — inside the 60-char ceiling set by src/types/seo.ts.
      title: 'Marble Exporters in Kishangarh | Granite Gallery',
      // 154 chars — inside the 140–160 band.
      description:
        'Marble and granite exporters based in Kishangarh, Rajasthan. Slabs, tiles and blocks cut, polished and shipped worldwide from our own facility.',
      keywords: [
        'marble exporters in kishangarh',
        'marble supplier kishangarh',
        'granite manufacturer kishangarh',
        'kishangarh marble market',
        'marble mandi kishangarh',
        'buy marble in kishangarh',
        'kishangarh marble factory',
        'natural stone exporter rajasthan',
      ],
      ogImage: '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
    },
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Marble Exporters in Kishangarh', path: '/marble-exporters-in-kishangarh' },
    ],
    hero: {
      eyebrow: `${primaryLocation.label} · Since Day One`,
      h1: 'Marble Exporters in',
      h1Em: 'Kishangarh',
      subtitle:
        'Our yard, gantry saws and polishing lines sit on the MEGA Highway in Kishangarh — the centre of Asia’s largest marble market. Walk the slabs, mark the ones you want, and we ship them.',
      images: [
        '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
        '/images/collections/showroom/marble-showroom-display-wall-kishangarh.webp',
      ],
      imageAlt:
        'Granite Gallery stone processing facility on the MEGA Highway at Kishangarh, Rajasthan, with marble slabs racked for inspection',
      badges: [
        { value: '150+', label: 'Stone Varieties' },
        { value: '30+', label: 'Export Countries' },
        { value: 'On-site', label: 'Cutting & Polishing' },
      ],
    },
    intro: {
      id: 'why-kishangarh',
      eyebrow: 'The Location',
      heading: 'Why buyers come to',
      headingEm: 'Kishangarh',
      body: [
        `${primaryLocation.context}`,
        'For a buyer that concentration is the whole point. Blocks from Makrana, Banswara, Ambaji and Rajsamand arrive here within a few hours of the quarry, and containers of Italian, Turkish and Vietnamese stone are landed and re-cut in the same belt. It means a single visit puts hundreds of materials in front of you, in slab form, under daylight — instead of choosing from photographs and hoping the veining matches.',
        'Granite Gallery has its own facility inside that belt, on the MEGA Highway at Ralawata. We are not a trading desk that forwards your enquiry to a third yard. The slabs you select are the slabs we cut, polish, pack and dispatch.',
      ],
    },
    blocks: [
      {
        id: 'what-we-do',
        eyebrow: 'Capability',
        heading: 'What happens at the',
        headingEm: 'Kishangarh facility',
        body: [
          'Everything between the raw block and the crate happens on one site, which is what keeps shade variation under control and lead times honest.',
        ],
        bullets: [
          {
            title: 'Block selection',
            text: 'We buy at the block, not the slab, so the whole run for your project comes off one body of stone and the veining carries across the floor instead of breaking at every joint.',
          },
          {
            title: 'Gangsaw & cutting',
            text: 'Slabs cut to 16–20 mm standard, or to your thickness. Oversized formats up to 240 × 140 cm where the block allows it.',
          },
          {
            title: 'Finishing',
            text: 'Mirror polish, honed, leathered, flamed, bush hammered, shot blast, acid wash and chiselled — all in house, so a single order can carry different finishes of the same stone.',
          },
          {
            title: 'Inspection & packing',
            text: 'Every slab is checked by hand under daylight before it is crated. Fissures, patch work and shade outliers are pulled out at this stage, not discovered at your site.',
          },
          {
            title: 'Dispatch',
            text: `Domestic loads leave via the ${dispatch.highway} and the ${dispatch.railhead}. Export consignments are containerised for ${dispatch.port}.`,
          },
        ],
      },
      {
        id: 'visit',
        eyebrow: 'Before You Buy',
        heading: 'Selecting stone',
        headingEm: 'in person',
        dark: true,
        body: [
          'Natural stone is not a catalogue product. Two slabs from the same quarry, cut a month apart, can read as different materials once they are on a wall. Architects and contractors who are specifying for a whole building generally want to stand in front of the actual lot before committing, and that is the visit we are set up for.',
          'If you cannot travel, we do the same walk on a video call — slabs pulled out on the gantry, daylight, no filters — and send numbered photographs of the exact pieces reserved against your order. Tell us the format you need and we will hold the lot while you decide.',
        ],
      },
    ],
    showcase: {
      eyebrow: 'From Our Yard',
      heading: 'Stone dispatched from',
      headingEm: 'Kishangarh',
      intro:
        'A cross-section of what moves through the facility most often — Rajasthan marble quarried within a few hours’ drive, alongside imported and Indian granite.',
      // Resolved against the live catalogue, so these cannot drift out of sync
      // with the product pages they link to.
      slugs: [
        'makrana-white',
        'nizarana-white',
        'statuario',
        'black-galaxy',
        'tan-brown',
        'steel-grey',
      ],
    },
    tagline: [
      'Kishangarh, Rajasthan',
      'Own Processing Facility',
      'Block to Container',
      'Hand-Inspected Slabs',
      'Ships Worldwide',
      'Direct from Manufacturer',
    ],
    localInfo: {
      eyebrow: 'Find Us',
      heading: 'The Kishangarh',
      headingEm: 'facility',
      intro:
        'Visitors are welcome during working hours. Call ahead and we will have the materials on your list pulled out and standing when you arrive.',
      directions: [
        {
          label: 'By road',
          detail: `On the ${dispatch.highway} at Ralawata, Tehsil Kishangarh — roughly 30 minutes from Ajmer and about 100 km from Jaipur on NH-48.`,
        },
        {
          label: 'By air',
          detail: `${primaryLocation.airport} is the closest airport. Jaipur International (JAI) is the nearest major hub, about two hours by road.`,
        },
        {
          label: 'By rail',
          detail: `${dispatch.railhead} is the local station; Ajmer Junction is the nearest mainline stop with wider connections.`,
        },
      ],
      mapEmbedUrl: KISHANGARH_MAP_EMBED,
    },
    faqs: [
      {
        question: 'Where exactly is Granite Gallery located in Kishangarh?',
        answer: `Our facility is at ${addressOneLine}. It sits on the MEGA Highway at Ralawata, inside the Kishangarh stone belt, about 30 minutes from Ajmer and two hours from Jaipur.`,
      },
      {
        question: 'Are you a manufacturer or a trader?',
        answer:
          'A manufacturer. We buy blocks, and the cutting, polishing, finishing, inspection and packing all happen at our own Kishangarh site. The slab you select on a visit is the slab that ships — it is not re-sourced from another yard afterwards.',
      },
      {
        question: 'Can I visit the yard to select slabs myself?',
        answer:
          'Yes, and we would encourage it for any sizeable project. Call or WhatsApp ahead with the stones you are considering and we will have those lots pulled out and standing in daylight before you arrive. If you cannot travel, we run the same walkthrough on a video call and send numbered photographs of the exact slabs reserved for you.',
      },
      {
        question: 'Do you export from Kishangarh, and to where?',
        answer: `Yes. Export consignments are containerised at the facility and routed through ${dispatch.port}. We have supplied stone to over 30 countries. Send us the port of discharge and the quantity and we will quote FOB or CIF.`,
      },
      {
        question: 'Why is Kishangarh the place to buy marble in India?',
        answer: `${primaryLocation.context} Blocks arrive from Makrana, Banswara, Ambaji and Rajsamand within hours of the quarry, and imported containers are landed and re-cut in the same belt — so one visit puts hundreds of materials in front of you in slab form.`,
      },
      {
        question: 'What is the minimum order, and how long does dispatch take?',
        answer:
          'It depends on the stone and the format — some materials move in single slabs, others only by the container. Lead time is driven by the finish and by whether the lot is in stock or needs cutting from a block. Share your quantity, thickness and finish and we will give you a firm figure rather than a range.',
      },
    ],
    faqHeading: {
      title: 'Kishangarh',
      titleEm: 'Questions',
      description:
        'Practical answers about visiting the yard, how we process stone, and how orders leave Kishangarh.',
    },
    service: {
      name: 'Marble & Granite Export from Kishangarh',
      serviceType: 'Natural stone manufacturing, processing and export',
    },
  },
};

/** Every landing-page slug — used by generateStaticParams and the sitemap. */
export const landingPageSlugs = Object.keys(landingPages);

/** Areas served, re-exported so the route can render them without a second import. */
export { areasServed };
