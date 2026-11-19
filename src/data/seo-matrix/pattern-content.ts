// ============================================================
// src/data/seo-matrix/pattern-content.ts
// Deep Domain Content & Asset Repository for Programmatic SEO Pages.
// Selects real images and authentic copywriting modules per pattern
// to eliminate content duplication and template monotony.
// ============================================================

import { applicationsData } from '@/lib/application-data';
import { finishesData } from '@/lib/finish-data';
import { getProductBySlug, allStones } from '@/data/stone-index';
import { ProseBlock, LandingHero } from '@/lib/landing-pages-data';
import { ManifestEntry, ResolvedCombo, LocationFacts, PriceBand } from '@/lib/landing/types';
import { calculateLandedCost } from './prices';
import { resolveProductExactPhotos } from '@/lib/product-detail';

export interface PatternContentOutput {
  heroImages: string[];
  imageAlt: string;
  heroEyebrow: string;
  heroH1: string;
  heroH1Em: string;
  heroSubtitle: string;
  intro: ProseBlock;
  blocks: ProseBlock[];
  statsBand?: { number: string; label: string }[];
  numberedCards?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    marqueeItems?: string[];
    reasons: { title: string; desc: string }[];
  };
  mosaicApps?: {
    title: string;
    sub: string;
    image: string;
    href?: string;
    wide?: boolean;
  }[];
  faqs: { question: string; answer: string }[];
  faqHeading: { title: string; titleEm: string; description: string };
}

/**
 * Resolves pattern-specific images from existing application, finish, stone, or showroom assets.
 */
export function resolvePatternImages(resolved: ResolvedCombo): { images: string[]; alt: string } {
  const { combo, material, location, matchingStones } = resolved;
  const matName = material?.name ?? 'Natural Stone';
  const locName = location?.name ?? 'Kishangarh';

  // 1. Specific Stone page: use exact stone photography matching the product page
  if (combo.stoneSlug) {
    const stone = getProductBySlug(combo.stoneSlug);
    if (stone) {
      const stonePhotos = resolveProductExactPhotos(stone);
      if (stonePhotos.length > 0) {
        return {
          images: stonePhotos.slice(0, 4),
          alt: `${stone.name} natural stone slabs, gangsaw lot and installed applications in ${locName}`,
        };
      }
    }
  }

  // 2. Application page: pull authentic application photos from application-data.ts
  if (combo.application) {
    const app = applicationsData.find((a) => a.slug === combo.application);
    if (app) {
      const appPhotos = [app.heroImage, ...(app.gallery ?? []), ...(app.sampleImages ?? [])].filter(Boolean);
      if (appPhotos.length > 0) {
        return {
          images: appPhotos.slice(0, 4),
          alt: `${matName} for ${app.title} architectural installations in ${locName}`,
        };
      }
    }
  }

  // 3. Finish page: pull authentic finish texture photos from finish-data.ts
  if (combo.finish) {
    const finish = finishesData.find((f) => f.slug === combo.finish);
    if (finish) {
      const finishPhotos = [
        finish.image,
        '/images/finishes/finishes-showroom-display-wall-kishangarh.webp',
        '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
      ].filter(Boolean);
      return {
        images: finishPhotos,
        alt: `${finish.name} finish ${matName.toLowerCase()} texture and slab surfaces at Kishangarh yard`,
      };
    }
  }

  // 4. Price Guide / Mandi Guide: use Kishangarh yard and showroom facility photos
  if (combo.pattern === 'G1' || combo.pattern === 'G1b' || combo.pattern === 'G1c' || combo.pattern === 'G5' || combo.pattern === 'G7') {
    return {
      images: [
        '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
        '/images/collections/showroom/marble-showroom-display-wall-kishangarh.webp',
        '/images/hero/granite-gallery-marble-granite-sandstone.webp',
        '/images/applications/flooring/flooring-stone-wall.webp',
      ],
      alt: `${matName} slab inventory and gangsaw processing at Granite Gallery yard on MEGA Highway, Kishangarh`,
    };
  }

  // 5. Default: matched stones or gallery fallbacks
  const stoneImages = matchingStones
    .flatMap((s) => [s.thumbnail, ...(s.heroImages ?? [])])
    .filter(Boolean);

  if (stoneImages.length >= 2) {
    return {
      images: stoneImages.slice(0, 4),
      alt: `${matName} slabs ready for dispatch to ${locName}`,
    };
  }

  return {
    images: [
      '/images/applications/flooring/flooring-stone-wall.webp',
      '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
      '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
    ],
    alt: `Architectural ${matName.toLowerCase()} slabs supplied in ${locName}`,
  };
}

/**
 * Builds rich, pattern-differentiated editorial content and component data.
 */
export function buildPatternContent(entry: ManifestEntry, resolved: ResolvedCombo): PatternContentOutput {
  const { combo, location, material, matchingStones, specRanges, priceBand } = resolved;
  const locName = location?.name ?? 'Kishangarh';
  const matName = material?.name ?? 'Natural Stone';
  const pattern = entry.pattern;
  const isKishangarh = location?.hasFacility || locName.toLowerCase() === 'kishangarh';

  const { images: heroImages, alt: imageAlt } = resolvePatternImages(resolved);
  const landed = priceBand ? calculateLandedCost(priceBand, combo.location) : undefined;

  // ── BRANCH A: PRICE GUIDES (G1, G1b, G1c) ──────────────────────────
  if (pattern === 'G1' || pattern === 'G1b' || pattern === 'G1c') {
    const heroEyebrow = '2026 PRICE BENCHMARK & WHOLESALE RATE SHEET';
    const heroH1 = `${matName} Price per Sq Ft`;
    const heroH1Em = isKishangarh ? 'in Kishangarh Mandi' : `Landed in ${locName}`;
    const heroSubtitle = isKishangarh
      ? `Transparent ex-factory rates direct from Asia's largest stone hub on the MEGA Highway. Gangsaw calibrated 16mm/18mm slabs.`
      : `Verified ex-Kishangarh factory rates plus highway freight, crane loading, and 18% GST delivered direct to site in ${locName}.`;

    const intro: ProseBlock = {
      id: 'intro',
      eyebrow: 'DIRECT MANDI PRICING',
      heading: isKishangarh ? `Wholesale ${matName} Slab Rates` : `Transparent Landed ${matName} Cost`,
      headingEm: isKishangarh ? 'at Kishangarh Yard' : `for ${locName}`,
      body: [
        isKishangarh
          ? `Kishangarh is the nerve center of India's natural stone trade, processing over 70% of the country's gangsaw granite and marble. At Granite Gallery's processing facility on the MEGA Highway, we publish live lot-wise price bands so architects, builders, and homeowners can source with absolute transparency.`
          : `When sourcing ${matName.toLowerCase()} for projects in ${locName}, the true project cost depends on three clear variables: base ex-factory slab price in Kishangarh, dedicated highway freight via multi-axle trailers, and standard 18% GST. We eliminate middleman markups by shipping directly from our Kishangarh yard to your site.`,
        priceBand?.marketNotes ??
          `Natural stone rates are determined by block structural soundness, vein symmetry, slab thickness (calibrated 16mm/18mm/20mm), and whether the block was cut on an automated gangsaw or circular cutter.`,
      ],
      bullets: [
        {
          title: 'Direct Ex-Factory Base',
          text: priceBand
            ? `Indicative rates starting from ₹${priceBand.lowPrice} to ₹${priceBand.highPrice}/sq ft ex-Kishangarh yard.`
            : `Lot-wise wholesale pricing based on block recovery and background clarity.`,
        },
        {
          title: '3-Tier Quality Grading',
          text: `Commercial grade (₹${priceBand?.commercialLow ?? 40}–₹${priceBand?.commercialHigh ?? 60}), Standard Residential (₹${priceBand?.standardLow ?? 65}–₹${priceBand?.standardHigh ?? 130}), and Premium Export (₹${priceBand?.premiumLow ?? 140}–₹${priceBand?.premiumHigh ?? 380}/sq ft).`,
        },
        {
          title: isKishangarh ? 'Zero Middleman Overhead' : `Delivered Landed Cost in ${locName}`,
          text: isKishangarh
            ? `Direct factory gate pickup with complimentary crane loading on buyer trucks.`
            : `Estimated delivered site cost ₹${landed?.minLanded}–₹${landed?.maxLanded}/sq ft (includes ₹${location?.freightPerSqftMin ?? 8}–₹${location?.freightPerSqftMax ?? 14}/sq ft direct freight, loading, and 18% GST).`,
        },
      ],
    };

    const blocks: ProseBlock[] = [
      {
        id: 'pricing-breakdown',
        eyebrow: 'LOT-WISE PRICE MATRIX',
        heading: `${matName} Price Matrix & Slab Grading`,
        headingEm: isKishangarh ? 'Ex-Factory Kishangarh Yard' : `Ex-Kishangarh vs Delivered ${locName}`,
        body: [
          `Buying stone by the block lot rather than individual pieces ensures zero color variation across your rooms. Below is the transparent breakdown of how stone grades differ in density, vein clarity, and square foot pricing:`,
        ],
        bullets: [
          {
            title: 'Commercial Grade Slabs',
            text: `₹${priceBand?.commercialLow ?? 40} – ₹${priceBand?.commercialHigh ?? 60} / sq ft. Minor natural shade variations, ideal for parking, basements, and rental complexes.`,
          },
          {
            title: 'Standard Residential Grade',
            text: `₹${priceBand?.standardLow ?? 65} – ₹${priceBand?.standardHigh ?? 130} / sq ft. High color consistency, gangsaw cut, ideal for luxury villas, apartments, and kitchen counters.`,
          },
          {
            title: 'Premium / Export Grade',
            text: `₹${priceBand?.premiumLow ?? 140} – ₹${priceBand?.premiumHigh ?? 380} / sq ft. Zero structural fissures, bookmatched veining, mirror polish or Italian leather finish.`,
          },
          {
            title: isKishangarh ? 'Factory Gate Dispatch' : `Net Landed in ${locName}`,
            text: isKishangarh
              ? `Yard loading available 7 days a week on the MEGA Highway with digital weighbridge verification.`
              : `Delivered to site in ${location?.transitDays ?? '24–48 hours'} with fumigated wooden A-frame crating and all-risk transit insurance.`,
          },
        ],
      },
      {
        id: 'specifications',
        eyebrow: 'PHYSICAL RIGOR',
        heading: 'Physical Properties & Engineering Specs',
        headingEm: 'Tested under ASTM',
        dark: true,
        body: [
          `Every batch of ${matName.toLowerCase()} processed at Granite Gallery meets rigorous physical benchmarks to withstand heavy foot traffic, thermal cycles, and household acids.`,
        ],
        bullets: [
          { title: 'Density Range', text: specRanges.density ?? '2.65 g/cm³' },
          { title: 'Mohs Hardness', text: specRanges.hardness ?? 'Mohs 6–7' },
          { title: 'Water Absorption', text: specRanges.absorption ?? '< 0.20%' },
          { title: 'Compressive Strength', text: specRanges.compressiveStrength ?? '160–220 MPa' },
        ],
      },
    ];

    const statsBand = [
      { number: `₹${priceBand?.lowPrice ?? 45}`, label: 'Starting Ex-Yard / sqft' },
      { number: `₹${priceBand?.highPrice ?? 380}`, label: 'Premium Grade / sqft' },
      { number: isKishangarh ? '0' : `₹${landed?.freightEstimate ?? 10}`, label: isKishangarh ? 'Direct Yard Pickup' : `Freight to ${locName} / sqft` },
      { number: '18%', label: 'Standard GST (HSN 6802)' },
    ];

    const numberedCards = {
      eyebrow: 'COST TRANSPARENCY PROTOCOL',
      title: 'How to Calculate Your True Sourcing Cost',
      subtitle: 'Avoid common market pitfalls and hidden surcharges with our verified 6-step framework.',
      marqueeItems: ['Ex-Factory Rates', 'Zero Hidden Loading Fees', '18% Fixed GST', 'Consignment Transit Insurance', 'Weighbridge Verified', 'A-Frame Crating'],
      reasons: [
        {
          title: 'Base Slab Rate & Lot Reservation',
          desc: 'Always verify lot-wise pricing rather than single-piece sample rates. Booking entire gangsaw blocks guarantees zero shade variation across your floors.',
        },
        {
          title: 'Gangsaw vs Block-Cutter Calibration',
          desc: 'Insist on gangsaw-calibrated slabs (uniform 16mm/18mm). Slabs cut on local circular block-cutters often fluctuate from 14mm to 22mm, causing massive on-site grinding costs.',
        },
        {
          title: 'Weighbridge Slips & Mandi Commissions',
          desc: 'Confirm billing on actual industrial weighbridge slips. Open-mandi intermediaries frequently charge 10–15% hidden broker commissions and arbitrary loading tariffs.',
        },
        {
          title: 'Handling, Crating & Transit Insurance',
          desc: 'Ensure your quotation clearly items packaging and transit insurance. Heavy wooden A-frame strapping prevents transit vibration micro-fissures during long highway hauls.',
        },
        {
          title: 'Unloading & Site Dry Lay Inspection',
          desc: 'Before fixing slabs with mortar, lay them dry in natural light to confirm vein continuity, squareness, and polish reflection across the entire layout.',
        },
        {
          title: 'Adhesive, Sealing & Wastage Allowances',
          desc: 'Budget for high-grade polymer adhesives and penetrating sealers, planning for standard 7–10% wastage on diagonal cuts and edge profiling.',
        },
      ],
    };

    const faqs = [
      {
        question: `What is the price of ${matName.toLowerCase()} ${isKishangarh ? 'in Kishangarh' : `delivered to ${locName}`}?`,
        answer: priceBand
          ? `Ex-factory Kishangarh rates for ${matName.toLowerCase()} range from ₹${priceBand.lowPrice} to ₹${priceBand.highPrice}/sq ft depending on slab grade (Commercial: ₹${priceBand.commercialLow ?? priceBand.lowPrice}–₹${priceBand.commercialHigh ?? 60}, Standard: ₹${priceBand.standardLow ?? 65}–₹${priceBand.standardHigh ?? 130}, Premium: ₹${priceBand.premiumLow ?? 140}–₹${priceBand.premiumHigh ?? priceBand.highPrice}/sq ft). ${isKishangarh ? 'Direct yard pickup incurs zero extra freight.' : `For delivery to ${locName}, add ₹${location?.freightPerSqftMin ?? 8}–₹${location?.freightPerSqftMax ?? 14}/sq ft freight and 18% GST, bringing estimated landed site cost to approx. ₹${landed?.minLanded}–₹${landed?.maxLanded}/sq ft.`}`
          : `Pricing varies by quarry lot, vein density, and finish. Contact our Kishangarh sales desk for current ex-factory rate sheets.`,
      },
      {
        question: 'Why is there a price difference between gangsaw cut and cutter slabs?',
        answer: 'Gangsaw machines use multi-blade reciprocating frames that slice whole blocks with uniform 18mm thickness and zero taper. Circular block cutters produce uneven thicknesses (14mm to 22mm) requiring heavy on-site grinding. Gangsaw slabs save money in total installation cost.',
      },
      {
        question: 'What hidden costs should buyers beware of in the Kishangarh stone mandi?',
        answer: 'In the open mandi, watch out for unbilled loading charges (₹150–₹170/ton), wooden crating fees, and taxi middleman commissions (up to 15%). At Granite Gallery, our quotation includes all crating, weighbridge slips, loading, and transit insurance in a single transparent invoice.',
      },
      {
        question: `How is freight calculated for dispatch to ${locName}?`,
        answer: isKishangarh
          ? 'Local delivery within Kishangarh costs ₹1–₹2/sq ft, or buyers can arrange their own trucks with free crane loading at our yard.'
          : `Freight to ${locName} is charged per truckload. A standard 21–25 ton multi-axle trailer carries ~3,800 sq ft of 18mm stone, working out to ₹${location?.freightPerSqftMin ?? 8}–₹${location?.freightPerSqftMax ?? 14}/sq ft. Transit takes approximately ${location?.transitDays ?? '24–48 hours'}.`,
      },
      {
        question: 'Can I claim GST input tax credit on natural stone purchases?',
        answer: 'Yes. Natural stone attracts a standard 18% GST under HSN code 6802. We provide 100% compliant tax invoices enabling GST-registered builders, architects, and commercial developers to claim full input tax credit.',
      },
    ];

    return {
      heroImages,
      imageAlt,
      heroEyebrow,
      heroH1,
      heroH1Em,
      heroSubtitle,
      intro,
      blocks,
      statsBand,
      numberedCards,
      faqs,
      faqHeading: {
        title: 'Frequently Asked Questions',
        titleEm: `About ${matName} Pricing in ${locName}`,
        description: 'Clear answers on ex-factory rates, grading differences, freight calculations, and invoice transparency.',
      },
    };
  }

  // ── BRANCH E: BEST-FOR APPLICATION & FINISH BUYER GUIDES (G6) ────────
  if (pattern === 'G6') {
    const app = combo.application ? applicationsData.find((a) => a.slug === combo.application) : undefined;
    const appTitle = app?.title ?? (combo.application ? String(combo.application).replace(/-/g, ' ') : 'Architectural Slabs');

    const finish = combo.finish ? finishesData.find((f) => f.slug === combo.finish) : undefined;
    const finishName = finish?.name ?? (combo.finish ? String(combo.finish).replace(/-/g, ' ') : 'Architectural Surface');

    const colorName = combo.color ? combo.color.charAt(0).toUpperCase() + combo.color.slice(1) : '';

    let heroEyebrow = 'ARCHITECTURAL SPECIFICATION & BUYER GUIDE';
    let heroH1 = `Best ${matName}`;
    let heroH1Em = combo.application ? `for ${appTitle}` : 'Selection Guide';
    let heroSubtitle = `Comprehensive engineering comparison: ASTM hardness, stain resistance, slip safety ratings, and wholesale gangsaw slab rates.`;

    if (combo.finish) {
      heroEyebrow = 'ARCHITECTURAL FINISH SELECTION GUIDE';
      heroH1 = `Best ${finishName} ${matName}`;
      heroH1Em = combo.application ? `for ${appTitle}` : 'Finishes & Slabs';
      heroSubtitle = `Architectural evaluation of tactile grip, surface porosity, maintenance ease, and gangsaw processing from Kishangarh.`;
    } else if (combo.color) {
      heroEyebrow = 'CURATED COLOR & GEOLOGY GUIDE';
      heroH1 = `Best ${colorName} ${matName}`;
      heroH1Em = combo.application ? `for ${appTitle}` : 'Living Spaces';
      heroSubtitle = `Top-rated ${colorName.toLowerCase()} quarry lots, natural vein patterns, scratch resistance, and wholesale pricing from Kishangarh.`;
    }

    const intro: ProseBlock = {
      id: 'intro',
      eyebrow: 'EXPERT BUYER EVALUATION',
      heading: `Selecting the Best ${colorName ? colorName + ' ' : ''}${matName}`,
      headingEm: combo.application ? `for ${appTitle}` : (combo.finish ? `in ${finishName} Finish` : 'Specifications'),
      body: [
        `Choosing natural stone for ${appTitle.toLowerCase()} requires balancing compressive strength, porosity, chemical resistance, and long-term aesthetic patina. Unlike synthetic quartz or printed porcelain tiles, calibrated natural ${matName.toLowerCase()} delivers permanent structural resilience that withstands heavy foot traffic, high temperatures, and environmental weathering.`,
        `At Granite Gallery, we source direct from premier quarry concessions across Rajasthan and South India. Each block is cut on computerized multi-wire gangsaw machines at our Kishangarh facility, delivering millimeter-precise 18mm/20mm calibration that eliminates uneven lippage during installation.`,
      ],
      bullets: [
        {
          title: 'Mohs Surface Hardness',
          text: `Hardness rating of ${specRanges.hardness ?? 'Mohs 6–7'} resists abrasions from cutlery, heavy footwear, and industrial wear without dulling.`,
        },
        {
          title: 'Low Water Absorption',
          text: `Impermeable crystalline matrix (${specRanges.absorption ?? '< 0.20%'}) repels grease, spills, and moisture penetration when sealed.`,
        },
        {
          title: 'Extreme Thermal & UV Stability',
          text: 'Zero warping, resin degradation, or color fading under direct sunlight or hot cookware up to 400°C.',
        },
        {
          title: 'Kishangarh Yard Direct Batching',
          text: 'Book entire gangsaw lots from a single quarry block to guarantee harmonious color and vein consistency across your project.',
        },
      ],
    };

    const blocks: ProseBlock[] = [
      {
        id: 'specifications',
        eyebrow: 'ASTM PERFORMANCE BENCHMARKS',
        heading: 'Physical Properties & Engineering Specs',
        headingEm: 'for Heavy Wear',
        dark: true,
        body: [
          `Every batch of ${matName.toLowerCase()} processed at our Kishangarh facility undergoes strict ultrasonic flaw detection and ASTM standard testing. Below are the structural parameters for high-performance architectural applications:`,
        ],
        bullets: [
          { title: 'Compressive Strength', text: `${specRanges.compressiveStrength ?? '180–220 MPa'} — withstanding heavy vehicular or structural loads without fracture.` },
          { title: 'Density & Specific Gravity', text: `${specRanges.density ?? '2.65–2.75 g/cm³'} — dense crystalline matrix preventing deep liquid absorption.` },
          { title: 'Mohs Scratch Hardness', text: `${specRanges.hardness ?? 'Mohs 6–7'} — impervious to everyday scuffs and utensil impacts.` },
          { title: 'Calibrated Thickness', text: '18mm / 20mm uniform gangsaw tolerance ensuring seamless flush installation.' },
        ],
      },
      {
        id: 'selection-protocol',
        eyebrow: 'ARCHITECTURAL SOURCING PROTOCOL',
        heading: '4-Step Slab Verification Framework',
        headingEm: 'at Kishangarh Yard',
        body: [
          'To ensure you receive premium structural slabs free from cosmetic fillers or hidden hairline fissures, our stone engineers recommend this 4-step on-site protocol:',
        ],
        bullets: [
          {
            title: '1. Dry-Lay Vein & Shade Matching',
            text: 'Inspect slabs arranged sequentially as cut from the block. Verify bookmatched vein alignment and background tone consistency under daylight.',
          },
          {
            title: '2. Digital Caliper 4-Corner Verification',
            text: 'Measure slab thickness at all four corners and the center to confirm exact 18mm/20mm calibration, preventing costly installation grinding.',
          },
          {
            title: '3. Water & Solvent Strike Test',
            text: 'Apply water droplets or solvent to slab unpolished edges to verify natural stone density and ensure no artificial color waxes were applied.',
          },
          {
            title: '4. Lot-Wise Complete Order Reservation',
            text: 'Always reserve the full square footage required plus 10% wastage from a single block lot to prevent mismatched dye lots between shipments.',
          },
        ],
      },
      {
        id: 'logistics',
        eyebrow: 'FACTORY-DIRECT SOURCING',
        heading: 'Wholesale Pricing & Insured Dispatch',
        headingEm: 'from Kishangarh Mandi',
        body: [
          `Granite Gallery operates on the MEGA Highway in Kishangarh, Asia's premier stone trading hub. By eliminating intermediary dealer margins, we provide direct quarry pricing with complete consignment tracking.`,
          `All slabs are packed in heavy-duty fumigated wooden A-frames with high-density foam padding, backed by all-risk transit insurance and certified crane loading.`,
        ],
      },
    ];

    const statsBand = [
      { number: `₹${priceBand?.lowPrice ?? 45}`, label: 'Starting Ex-Yard / sqft' },
      { number: `${specRanges.hardness ?? 'Mohs 6–7'}`, label: 'Scratch Resistance' },
      { number: `${specRanges.absorption ?? '< 0.20%'}`, label: 'Porosity (ASTM C97)' },
      { number: '18mm / 20mm', label: 'Gangsaw Calibration' },
    ];

    const numberedCards = {
      eyebrow: 'EVALUATION CHECKLIST',
      title: `Buyer Checklist: Choosing the Right ${matName}`,
      subtitle: 'Critical technical criteria verified by senior architects before approving slab consignments.',
      marqueeItems: ['Gangsaw Calibrated', 'ASTM Rigor', 'Zero Artificial Wax', 'Single-Lot Integrity', 'Direct Yard Loading', 'Fiberglass Mesh Reinforcement'],
      reasons: [
        {
          title: 'Density & Acoustic Resonance',
          desc: 'A premium sound slab produces a clear ringing acoustic chime when tapped with a metal coin, confirming zero internal fractures or dry voids.',
        },
        {
          title: 'Uniform Surface Texture',
          desc: combo.finish
            ? `Confirm that the ${finishName} finish is executed with automated diamond heads, maintaining uniform slip resistance without bald spots.`
            : 'Ensure high-gloss mirror polish or consistent velvet matte honing without swirl marks or uneven epoxy patches.',
        },
        {
          title: 'Calibrated Thickness & Square Edges',
          desc: 'Verify laser-measured thickness across all four corners with zero taper, ensuring perfect 90° square cuts to prevent uneven floor joints and lippage.',
        },
        {
          title: 'Chemical Inertness & Non-Staining',
          desc: 'For high-utility surfaces, verify the stone does not react with turmeric, citric acids, or standard household cleaning solutions.',
        },
        {
          title: 'Quarry Origin & Single-Block Lot',
          desc: 'Source slabs tagged from verifiable quarry blocks to guarantee uniform mineral composition and thermal expansion behavior.',
        },
        {
          title: 'Structural Reinforcement & Back-Netting',
          desc: 'Ensure exotic and heavily veined slabs feature factory-applied epoxy resin backing with fiberglass mesh for maximum tensile stability during transit and cutting.',
        },
      ],
    };

    const faqs = [
      {
        question: `Why is natural ${matName.toLowerCase()} considered the best choice for ${appTitle.toLowerCase()}?`,
        answer: `Natural ${matName.toLowerCase()} delivers exceptional compressive strength, natural thermal resistance up to 400°C, and a dense mineral structure that resists wear for decades. Unlike composite quartz or printed ceramic tiles, it can be re-polished over its lifespan to restore original brilliance without replacing the substrate.`,
      },
      {
        question: `What thickness is recommended for ${matName.toLowerCase()} in ${appTitle.toLowerCase()}?`,
        answer: `For interior flooring and wall cladding, calibrated 18mm gangsaw slabs are the gold standard. For kitchen countertops with heavy overhangs, stair treads, or high-traffic driveway paving, 20mm to 30mm thickness is recommended for structural rigidity and edge moulding strength.`,
      },
      {
        question: `How does natural ${matName.toLowerCase()} compare to vitrified tiles or composite quartz?`,
        answer: `Vitrified tiles feature a thin glazed top layer that chips easily, revealing an ugly ceramic biscuit beneath, and cannot be refinished. Engineered quartz contains 7–10% petroleum resins that scorch and discolor under hot cookware. Natural ${matName.toLowerCase()} is 100% solid stone throughout, completely heatproof, and gains character with age.`,
      },
      {
        question: `What is the price range for premium ${matName.toLowerCase()} slabs?`,
        answer: priceBand
          ? `Wholesale rates ex-Kishangarh yard range from ₹${priceBand.lowPrice} to ₹${priceBand.highPrice}/sq ft depending on quarry lot clarity, background uniformity, and slab dimensions. Commercial lots start around ₹${priceBand.commercialLow ?? 45}/sq ft, while export-grade bookmatched slabs range from ₹${priceBand.standardHigh ?? 130} to ₹${priceBand.premiumHigh ?? 380}/sq ft.`
          : `Standard residential grades range from ₹55 to ₹130/sq ft, with premium export varieties ranging from ₹140 to ₹380/sq ft ex-factory Kishangarh.`,
      },
      {
        question: `Can I inspect and reserve the actual slab lot before dispatch?`,
        answer: `Yes. Granite Gallery provides full inspection support: visit our yard on the MEGA Highway in Kishangarh, or receive HD 4K video inspections, dry-lay lot photos, caliper measurements, and water-test clarity videos for your designated lots.`,
      },
    ];

    return {
      heroImages,
      imageAlt,
      heroEyebrow,
      heroH1,
      heroH1Em,
      heroSubtitle,
      intro,
      blocks,
      statsBand,
      numberedCards,
      faqs,
      faqHeading: {
        title: 'Frequently Asked Questions',
        titleEm: `About Best ${matName} for ${appTitle}`,
        description: 'Clear answers on material properties, thickness calibration, ASTM benchmarks, and Kishangarh yard inspection.',
      },
    };
  }

  // ── BRANCH B: APPLICATION PAGES (P2, P3, P4) ───────────────────────
  if (combo.application) {
    const app = applicationsData.find((a) => a.slug === combo.application);
    const appTitle = app?.title ?? combo.application.replace(/-/g, ' ');

    const heroEyebrow = `ARCHITECTURAL ${appTitle.toUpperCase()} SPECIFICATION`;
    const heroH1 = `${matName} for ${appTitle}`;
    const heroH1Em = isKishangarh ? 'in Kishangarh' : `Supplied to ${locName}`;
    const heroSubtitle = `Precision-calibrated gangsaw slabs engineered for ${appTitle.toLowerCase()} durability, stain resistance, and timeless luxury aesthetics.`;

    const intro: ProseBlock = {
      id: 'intro',
      eyebrow: 'STRUCTURAL APPLICATION',
      heading: `Engineered ${matName} Solutions`,
      headingEm: `for ${appTitle}`,
      body: [
        app?.description ??
          `Natural ${matName.toLowerCase()} delivers the ultimate foundation of enduring luxury. Unlike synthetic composites, calibrated natural stone withstands decades of heavy wear, thermal fluctuations, and everyday cleaning.`,
        `At Granite Gallery, we supply large-format gangsaw slabs (up to 3200×1800mm), precision-cut tiles, and bespoke edge profiles processed at our Kishangarh facility to exact millimeter tolerances.`,
      ],
      bullets: [
        {
          title: 'High Load Strength',
          text: `Compressive strength of ${specRanges.compressiveStrength ?? '200+ MPa'}, ensuring zero cracking under heavy structural loads.`,
        },
        {
          title: 'Precision Calibration',
          text: `Uniform 18mm/20mm thickness calibration prevents uneven lippage and minimizes installation labor.`,
        },
        {
          title: isKishangarh ? 'Factory Gate Sourcing' : `Door-to-Site Transit to ${locName}`,
          text: isKishangarh
            ? 'Inspect entire gangsaw bookmatched lots live at our MEGA Highway yard.'
            : `Delivered safely in heavy-duty wooden A-frames within ${location?.transitDays ?? '24–48 hours'}.`,
        },
      ],
    };

    const techReqs = app?.technicalRequirements ?? [
      'Substrate flatness: Level the base within 3mm over 2m to prevent hollow cavities.',
      'Full-bed adhesive: Fix with flexible C2TE S1 polymer adhesive back-buttered for 95%+ coverage.',
      'Movement joints: Maintain 2mm expansion joints across large floor spans.',
      'Impregnating Sealer: Apply solvent-based penetrating sealer within 48 hours of grouting.',
    ];

    const blocks: ProseBlock[] = [
      {
        id: 'technical-specs',
        eyebrow: 'INSTALLATION ENGINEERING',
        heading: `Technical Specifications & Requirements`,
        headingEm: `for ${appTitle}`,
        dark: true,
        body: [
          `Proper installation guarantees that your ${matName.toLowerCase()} ${appTitle.toLowerCase()} performs flawlessly for decades without cracks, stains, or hollow tiles.`,
        ],
        bullets: techReqs.slice(0, 4).map((req, i) => {
          const [title, ...descParts] = req.split(':');
          return {
            title: title ? title.trim() : `Standard ${i + 1}`,
            text: descParts.join(':').trim() || req,
          };
        }),
      },
    ];

    const statsBand = [
      { number: specRanges.compressiveStrength ?? '210 MPa', label: 'Compressive Load Strength' },
      { number: specRanges.hardness ?? 'Mohs 6–7', label: 'Scratch Hardness Rating' },
      { number: specRanges.absorption ?? '< 0.20%', label: 'Water Absorption Rate' },
      { number: '18–20 mm', label: 'Precision Calibration' },
    ];

    const numberedCards = {
      eyebrow: 'INSTALLATION PROTOCOL',
      title: `Architectural ${appTitle} Installation Guide`,
      subtitle: 'Engineered laying practices to prevent hollow spots, cracks, and moisture staining.',
      marqueeItems: ['Level Sub-base', 'Polymer Adhesive', '100% Back-Buttering', 'Expansion Grouting', 'Color-Matched Resin', 'Nano Sealer'],
      reasons: [
        {
          title: 'Sub-Floor Curing & Precision Leveling',
          desc: 'Ensure the concrete substrate is fully cured (minimum 28 days) and laser-leveled. Never lay heavy stone over uncured or uneven screeds.',
        },
        {
          title: 'Polymer-Modified White Adhesive',
          desc: 'For white marbles and light granites, use specialized white polymer adhesive instead of grey cement to avoid dark hydration staining bleeding through the stone.',
        },
        {
          title: 'Back-Buttering & 100% Bedding',
          desc: 'Apply complete adhesive coverage using notched trowels with mandatory back-buttering on slab undersides to eliminate hollow sound spots and air pockets.',
        },
        {
          title: 'Expansion Joints & Movement Seams',
          desc: 'Maintain 2mm expansion joints across large floor spans to absorb seasonal temperature differentials, preventing slabs from lifting or tenting.',
        },
        {
          title: 'Epoxy Resin Grouting',
          desc: 'Use non-shrink, stain-resistant epoxy resin grouts color-matched to the stone base tone, preventing water infiltration into capillary edges.',
        },
        {
          title: 'Impregnating Nano-Sealer',
          desc: 'Apply a solvent-based penetrating impregnator 72 hours after installation to seal microscopic pores against oil, turmeric, and acidic spills.',
        },
      ],
    };

    const mosaicApps = [
      {
        title: 'Interior Living & Lobby Flooring',
        sub: 'Precision 18mm gangsaw slabs with mirror polish',
        image: '/images/applications/flooring/flooring-stone-wall.webp',
        href: '/applications/flooring',
        wide: true,
      },
      {
        title: 'Monolithic Kitchen Islands',
        sub: 'High heat & scratch resistant 20mm calibrated tops',
        image: '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
        href: '/applications/kitchen-countertops',
        wide: false,
      },
      {
        title: 'Architectural Wall Cladding',
        sub: 'Dry-clad exterior facades & bookmatched lobby walls',
        image: '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
        href: '/applications/wall-cladding',
        wide: false,
      },
      {
        title: 'Master Bathroom Sanctuaries',
        sub: 'Water-resistant vanities & anti-skid textured paving',
        image: '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
        href: '/applications/bathroom',
        wide: true,
      },
    ];

    const baseAppFaqs = (app?.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer }));
    const defaultAppFaqs = [
      {
        question: `What thickness is recommended for ${matName.toLowerCase()} ${appTitle.toLowerCase()}?`,
        answer: `For residential and villa installations, 18mm gangsaw calibrated slabs are standard. For heavy commercial floors or outdoor cladding, 20mm to 30mm calibrated slabs ensure superior structural deflection resistance.`,
      },
      {
        question: `How do I prevent stains and etching on ${matName.toLowerCase()}?`,
        answer: `We recommend applying a high-grade penetrating impregnating sealer immediately after installation. This repels liquid spills like oil, wine, and turmeric while allowing the stone to breathe naturally.`,
      },
      {
        question: `Can large format slabs be delivered to ${locName}?`,
        answer: `Yes. Slabs up to 10×6 ft are packed in heavy-duty wooden A-frames with foam cushioning and shipped directly to ${locName} with full transit insurance.`,
      },
      {
        question: `What adhesive and joint spacing should be used for ${matName.toLowerCase()} ${appTitle.toLowerCase()}?`,
        answer: `Use polymer-modified flexible C2TE S1 thin-bed adhesives with minimum 95% back-buttering coverage to prevent hollow pockets. Maintain 2–3mm grout joints with movement joints every 4–5 meters to accommodate thermal expansion.`,
      },
      {
        question: `Why choose natural ${matName.toLowerCase()} over vitrified tiles for ${appTitle.toLowerCase()}?`,
        answer: `Natural ${matName.toLowerCase()} is 100% solid stone through its entire depth, meaning it can be restored, re-polished, and edge-moulded across generations without revealing an artificial ceramic biscuit or peeling top coat.`,
      },
      {
        question: `Can I inspect and select specific slab lots from Kishangarh before dispatch to ${locName}?`,
        answer: `Yes. We provide complete pre-dispatch transparency: visit our Kishangarh yard on the MEGA Highway or inspect lots via 4K live video calls, lot dry-lay photographs, and caliper thickness verification.`,
      },
    ];

    const combinedAppFaqs = [...baseAppFaqs];
    for (const item of defaultAppFaqs) {
      if (!combinedAppFaqs.some((f) => f.question.toLowerCase() === item.question.toLowerCase())) {
        combinedAppFaqs.push(item);
      }
    }
    const faqs = combinedAppFaqs.slice(0, 6);

    return {
      heroImages,
      imageAlt,
      heroEyebrow,
      heroH1,
      heroH1Em,
      heroSubtitle,
      intro,
      blocks,
      statsBand,
      numberedCards,
      mosaicApps,
      faqs,
      faqHeading: {
        title: 'Frequently Asked Questions',
        titleEm: `About ${matName} in ${appTitle}`,
        description: 'Expert guidance on thickness, adhesive selection, expansion joints, and long-term stone maintenance.',
      },
    };
  }

  // ── BRANCH C: FINISH PAGES (P5, P7) ────────────────────────────────
  if (combo.finish) {
    const finish = finishesData.find((f) => f.slug === combo.finish);
    const isLapatro =
      combo.finish === 'leathered' &&
      (entry.slug.includes('lapatro') ||
        entry.slug.includes('lapotra') ||
        entry.slug.includes('lapato') ||
        entry.slug.includes('lapatra') ||
        entry.slug.includes('lepatro'));

    const finishName = isLapatro ? 'Lapatro Finish' : (finish?.name ?? combo.finish.replace(/-/g, ' '));

    const heroEyebrow = 'ARCHITECTURAL SURFACE FINISHES';
    const heroH1 = `${finishName} ${matName}`;
    const heroH1Em = isKishangarh ? 'in Kishangarh Yard' : `for ${locName}`;
    const heroSubtitle = isLapatro
      ? `Tactile diamond-brushed surface delivering organic undulating texture, anti-skid safety, and fingerprint-resistant elegance.`
      : (finish?.subtitle ?? `Specialized mechanical surface processing delivering tactile elegance, anti-skid safety, and lasting outdoor resilience.`);

    const intro: ProseBlock = {
      id: 'intro',
      eyebrow: 'SURFACE ENGINEERING',
      heading: `Artisanal Texture & Slip Performance`,
      headingEm: `of ${finishName}`,
      body: isLapatro
        ? [
            `Lapatro finish (widely known in the international stone trade as leathered finish) is crafted by running high-speed diamond-embedded abrasive brushes across calibrated ${matName.toLowerCase()} slabs. This specialized mechanical treatment removes softer mineral crystals while contouring natural veins, creating a warm, undulating tactile surface with zero harsh reflections and exceptional slip resistance.`,
            `Highly specified by luxury architects across ${locName} for contemporary living rooms, outdoor verandahs, kitchen countertops, and feature wall cladding where an organic, tactile luxury texture is desired.`,
          ]
        : [
            finish?.longDescription ??
              `The ${finishName.toLowerCase()} finish is achieved through specialized processing line technology at our Kishangarh plant. Transforming the raw crystalline geology of ${matName.toLowerCase()}, it delivers distinct tactile depth, low maintenance, and superior slip resistance.`,
            `Ideal for luxury architects specifying non-reflective matte surfaces for minimalist living rooms, pool surrounds, and exterior cladding.`,
          ],
      bullets: [
        {
          title: 'Slip Safety Rating',
          text: 'Engineered anti-skid texture providing safe traction underfoot even when wet.',
        },
        {
          title: 'Mechanical Processing',
          text: '100% mechanical diamond or thermal treatment with zero artificial waxes or chemical coatings.',
        },
        {
          title: isKishangarh ? 'Kishangarh Stock' : `Delivered to ${locName}`,
          text: isKishangarh
            ? 'Touch and compare physical finish samples live at our Kishangarh gallery.'
            : `Fumigated wooden A-frame dispatch directly to ${locName} sites within ${location?.transitDays ?? '24–48 hours'}.`,
        },
      ],
    };

    const blocks: ProseBlock[] = [
      {
        id: 'pros-cons',
        eyebrow: 'PERFORMANCE CHARACTERISTICS',
        heading: `Advantages & Applications`,
        headingEm: `of ${finishName} ${matName}`,
        dark: true,
        body: [
          finish?.description ??
            `Choosing the right surface finish depends on lighting, wet exposure, and whether the space requires reflective brilliance or organic tactile warmth.`,
        ],
        bullets: [
          { title: 'Ideal Applications', text: finish?.applications?.join(', ') ?? 'Flooring, Kitchen Islands, Exterior Facades, Bathrooms' },
          { title: 'Texture Profile', text: finish?.texture ? `${finish.texture.toUpperCase()} finish — organic, tactile surface` : 'Tactile matte finish' },
          { title: 'Maintenance Level', text: finish?.maintenanceLevel ? `${finish.maintenanceLevel.toUpperCase()} maintenance — hides fingerprints and smudges` : 'Low maintenance' },
          { title: 'Care Protocol', text: finish?.careInstructions ?? 'Clean with pH-neutral stone cleaner and soft cloth. Reseal every 2 years.' },
        ],
      },
      {
        id: 'logistics',
        eyebrow: 'LOGISTICS & DISPATCH',
        heading: isKishangarh ? 'Inspecting Live Lots at Our Kishangarh Yard' : `How We Deliver ${finishName} Slabs to ${locName}`,
        headingEm: isKishangarh ? 'on the MEGA Highway' : 'Direct from Factory Gate',
        dark: true,
        body: [
          isKishangarh
            ? `Visit our primary processing facility on the MEGA Highway in Kishangarh to inspect live ${finishName.toLowerCase()} slab bundles in natural daylight, verify surface texture and thickness calibration, and oversee container loading.`
            : `Granite Gallery operates a dedicated logistics corridor connecting our Kishangarh yard to ${locName}. Slabs are secured in heavy-duty wooden A-frames with high-density foam interleaving, preventing surface friction and transit breakage. Complete consignment tracking and all-risk transit insurance are provided.`,
          location?.freightGuidelines ??
            `Full-trailer loads (21–25 tons / ~3,800 sq ft of 18mm stone) or curated multi-stone part loads available for dispatch.`,
        ],
      },
    ];

    const statsBand = [
      { number: 'R11', label: 'Anti-Skid Rating' },
      { number: '100%', label: 'Mechanical Texture' },
      { number: 'Zero', label: 'Artificial Wax' },
      { number: '25+ Yrs', label: 'Exterior Lifespan' },
    ];

    const baseFinishFaqs = (finish?.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer }));
    const defaultFinishFaqs = [
      ...(isLapatro
        ? [
            {
              question: `What is the difference between Lapatro finish and leather finish?`,
              answer: `Lapatro is the Indian natural stone trade name for a leathered finish. Both terms refer to the same specialized mechanical process where diamond-tipped brushes run over the slab surface to create a soft, undulating texture with a velvety matte feel.`,
            },
          ]
        : []),
      {
        question: `What are the benefits of ${finishName} ${matName.toLowerCase()}?`,
        answer: `${finishName} provides enhanced slip resistance, eliminates harsh lighting reflections, and conceals fingerprints and water marks far better than high-gloss mirror-polished surfaces.`,
      },
      {
        question: `Is ${finishName} stone suitable for outdoor and high-moisture areas?`,
        answer: `Yes. Textured finishes such as leathered, flamed, shot-blast, and honed are heavily specified for pool surrounds, verandahs, bathroom floors, and exterior facades due to their anti-slip grip (R10 to R12 ratings).`,
      },
      {
        question: `How do you clean and maintain a ${finishName} stone surface?`,
        answer: `Clean with a soft nylon brush or microfibre mop using neutral pH stone cleaners. Avoid acidic or abrasive cleansers that can degrade stone minerals or strip applied sealers.`,
      },
      {
        question: `Does ${finishName} stone need to be sealed?`,
        answer: `Yes. While mechanical texturing opens stone pores slightly, applying an impregnating penetrating sealer seals internal capillaries against oil and water while preserving the tactile matte texture.`,
      },
      {
        question: `How does the price of ${finishName} compare to polished stone?`,
        answer: `Processing ${finishName} typically adds ₹10 to ₹35/sq ft over standard raw or polished slabs, depending on whether specialized diamond abrasive brushes, automated flaming torches, or acoustic waterjets are required.`,
      },
      {
        question: `Can I order ${finishName} slabs delivered directly to ${locName}?`,
        answer: `Yes. All ${finishName} slabs are processed in our Kishangarh factory, calibrated to 18mm/20mm/30mm, packed in fumigated wooden A-frames, and dispatched to ${locName} with transit insurance.`,
      },
    ];

    const combinedFinishFaqs = [...baseFinishFaqs];
    for (const item of defaultFinishFaqs) {
      if (!combinedFinishFaqs.some((f) => f.question.toLowerCase() === item.question.toLowerCase())) {
        combinedFinishFaqs.push(item);
      }
    }
    const faqs = combinedFinishFaqs.slice(0, 6);

    return {
      heroImages,
      imageAlt,
      heroEyebrow,
      heroH1,
      heroH1Em,
      heroSubtitle,
      intro,
      blocks,
      statsBand,
      faqs,
      faqHeading: {
        title: 'Frequently Asked Questions',
        titleEm: `About ${finishName} Stone Finish`,
        description: 'Clear answers on slip resistance, cleaning protocols, outdoor longevity, and sealing frequency.',
      },
    };
  }

  // ── BRANCH D: DEFAULT GEO & STONE SOURCING (P1, P6, P-Stone, G5) ────
  const colName = combo.color ? combo.color.charAt(0).toUpperCase() + combo.color.slice(1) : undefined;
  const stone = combo.stoneSlug ? getProductBySlug(combo.stoneSlug) : undefined;
  const stoneName = stone ? stone.name : (colName ? `${colName} ${matName}` : matName);

  const heroEyebrow = isKishangarh
    ? (colName
        ? `${colName.toUpperCase()} ${matName.toUpperCase()} • PRIMARY PROCESSING & EXPORT YARD`
        : (stone ? `${stone.name.toUpperCase()} • PRIMARY PROCESSING & EXPORT YARD` : 'PRIMARY PROCESSING & EXPORT YARD'))
    : (colName
        ? `${colName.toUpperCase()} ${matName.toUpperCase()} • ${locName.toUpperCase()} DIRECT HIGHWAY CORRIDOR`
        : `${locName.toUpperCase()} DIRECT HIGHWAY CORRIDOR`);
  const heroH1 = `${stoneName} in`;
  const heroH1Em = locName;
  const heroSubtitle = isKishangarh
    ? (colName
        ? `Direct factory wholesale sourcing of certified ${colName.toLowerCase()} ${matName.toLowerCase()} gangsaw slabs, custom cuts, and lot inspection on the MEGA Highway.`
        : (stone
            ? `Direct factory wholesale sourcing of certified ${stone.name} gangsaw slabs, custom cuts, and lot inspection on the MEGA Highway.`
            : `Direct factory wholesale sourcing of certified ${matName.toLowerCase()} gangsaw slabs, custom cuts, and lot inspection on the MEGA Highway.`))
    : (colName
        ? `Direct quarry and factory dispatch of certified ${colName.toLowerCase()} ${matName.toLowerCase()} slabs from our Kishangarh yard direct to site in ${locName}.`
        : (stone
            ? `Direct quarry and factory dispatch of certified ${stone.name} slabs from our Kishangarh yard direct to site in ${locName}.`
            : `Direct quarry and factory dispatch of certified ${matName.toLowerCase()} slabs from our Kishangarh yard direct to site in ${locName}.`));

  const intro: ProseBlock = {
    id: 'intro',
    eyebrow: isKishangarh ? 'KISHANGARH MANDI SOURCING' : `${locName.toUpperCase()} SUPPLY & LOGISTICS`,
    heading: isKishangarh ? `Direct Wholesale Sourcing of ${stoneName}` : `Direct Factory Supply of ${stoneName}`,
    headingEm: isKishangarh ? 'at Kishangarh Mandi' : `to ${locName}`,
    body: [
      isKishangarh
        ? `Granite Gallery operates premier stone processing and gangsaw facilities directly on the MEGA Highway in Kishangarh, Rajasthan. Sourcing directly from exclusive quarry concessions, our yard stocks premium ${stoneName} in calibrated gangsaw slabs ready for immediate inspection and dispatch.`
        : `Granite Gallery delivers export-grade gangsaw slabs of ${stoneName} direct from our Kishangarh processing plant to ${locName}. Each slab undergoes strict quality control for thickness uniformity (16mm/18mm/20mm), structural soundness, and aesthetic vein flow.`,
      isKishangarh
        ? `Whether you are a wholesale marble trader, commercial developer, or private villa owner, our Kishangarh yard offers complete block transparency, automated gangsaw cutting, and immediate crane loading.`
        : `Consignments are transported via dedicated highway corridors with fumigated wooden A-frame packaging, all-risk transit insurance, and GPS vehicle tracking.`,
    ],
    bullets: [
      {
        title: 'Direct Wholesale Pricing',
        text: priceBand
          ? `Indicative rates starting from ₹${priceBand.lowPrice} to ₹${priceBand.highPrice}/sq ft ex-factory Kishangarh.`
          : `Lot-wise wholesale pricing with zero middleman commissions.`,
      },
      {
        title: 'ASTM Engineering Standards',
        text: `Compressive strength of ${specRanges.compressiveStrength ?? '200 MPa'}, density of ${specRanges.density ?? '2.65 g/cm³'}, and water absorption < 0.20%.`,
      },
      {
        title: isKishangarh ? 'Kishangarh Yard Pickup' : `Safe Site Delivery to ${locName}`,
        text: isKishangarh
          ? 'Complimentary crane and forklift loading at our MEGA Highway facility.'
          : `Doorstep delivery within ${location?.transitDays ?? '24–48 hours'}. Landed estimate: ₹${landed?.minLanded}–₹${landed?.maxLanded}/sq ft.`,
      },
    ],
  };

  const blocks: ProseBlock[] = [
    {
      id: 'specifications',
      eyebrow: 'ARCHITECTURAL RIGOR',
      heading: 'Physical Properties & Engineering Specs',
      headingEm: 'for Lasting Durability',
      body: [
        `${stoneName} is chosen by architects and structural engineers for its exceptional durability and natural elegance. Tested under ASTM standards, our stones deliver industry-leading performance across indoor and outdoor environments.`,
      ],
      bullets: [
        { title: 'Density Range', text: specRanges.density ?? '2.65 g/cm³' },
        { title: 'Mohs Hardness', text: specRanges.hardness ?? 'Mohs 6–7' },
        { title: 'Water Absorption', text: specRanges.absorption ?? '< 0.20%' },
        { title: 'Compressive Strength', text: specRanges.compressiveStrength ?? '160–220 MPa' },
      ],
    },
    {
      id: 'logistics',
      eyebrow: 'LOGISTICS & DISPATCH',
      heading: isKishangarh ? 'Visiting Our Kishangarh Yard' : `How We Deliver ${stoneName} Slabs to ${locName}`,
      headingEm: isKishangarh ? 'on the MEGA Highway' : 'Direct from Factory Gate',
      dark: true,
      body: [
        isKishangarh
          ? `Our primary stone processing facility is situated in the heart of the Kishangarh marble and granite belt on the MEGA Highway. Buyers and architects can personally inspect entire gangs of ${stoneName.toLowerCase()} slabs, verify thickness calibration, and oversee container or trailer loading.`
          : `Granite Gallery operates a dedicated logistics corridor connecting our Kishangarh yard to ${locName}. Slabs of ${stoneName.toLowerCase()} are secured in heavy-duty wooden A-frames with high-density foam interleaving, preventing surface friction and transit breakage. Complete consignment tracking and all-risk transit insurance are provided.`,
        location?.freightGuidelines ??
          `Full-trailer loads (21–25 tons / ~3,800 sq ft of 18mm stone) or curated multi-stone part loads available for dispatch.`,
      ],
    },
  ];

  const statsBand = [
    { number: `${location?.distanceKm ?? 0} km`, label: 'Corridor from Kishangarh' },
    { number: isKishangarh ? 'Immediate' : (location?.transitDays ?? '24–48h'), label: 'Dispatch Timeline' },
    { number: `₹${location?.freightPerSqftMin ?? 8}–₹${location?.freightPerSqftMax ?? 14}`, label: 'Direct Freight / sqft' },
    { number: '55+', label: 'Varieties Ready to Ship' },
  ];

  const colorFaqs = colName ? [
    {
      question: `What makes ${colName.toLowerCase()} ${matName.toLowerCase()} varieties popular in luxury architecture?`,
      answer: `${colName} ${matName.toLowerCase()} offers a timeless aesthetic versatile across contemporary, neoclassical, and minimalist interiors. Whether in subtle crystalline granites or deeply veined marbles, ${colName.toLowerCase()} stones reflect light gracefully and pair seamlessly with wood, brass, and glass fixtures.`,
    },
    {
      question: `What are the bestselling ${colName.toLowerCase()} ${matName.toLowerCase()} varieties available in Kishangarh?`,
      answer: `Our Kishangarh collection features prominent ${colName.toLowerCase()} ${matName.toLowerCase()} varieties including ${colName === 'Grey' ? 'Steel Grey, Cera Grey, and Godhra Grey' : colName === 'Black' ? 'Absolute Black, Black Galaxy, and Telephone Black' : colName === 'White' ? 'Makrana White, Statuario, and Albeta' : 'exclusive regional quarry concessions'}. Each variety is available in bookmatched pairs and full gangsaw lots.`,
    },
    {
      question: `How do I prevent staining and maintain ${colName.toLowerCase()} ${matName.toLowerCase()} surfaces?`,
      answer: `We recommend applying a high-grade penetrating impregnating sealer right after installation. Clean regularly with neutral pH stone cleaners and avoid harsh acidic detergents to preserve the stone's natural crystal matrix.`,
    },
  ] : [];

  const baseFaqs = [
    {
      question: `What is the price of ${stoneName} in ${locName}?`,
      answer: priceBand
        ? `Ex-factory Kishangarh rates for ${stoneName} range from ₹${priceBand.lowPrice} to ₹${priceBand.highPrice}/sq ft depending on slab grade. ${isKishangarh ? 'Direct yard pickup incurs zero extra freight.' : `For delivery to ${locName}, add ₹${location?.freightPerSqftMin ?? 8}–₹${location?.freightPerSqftMax ?? 14}/sq ft freight and 18% GST, bringing estimated landed site cost to approx. ₹${landed?.minLanded}–₹${landed?.maxLanded}/sq ft.`}`
        : `Pricing varies based on quarry lot, background consistency, and finish. Contact our sales desk for current rate sheets.`,
    },
    {
      question: `How long does delivery take from Kishangarh to ${locName}?`,
      answer: isKishangarh
        ? `For pickup in Kishangarh, slab lots can be loaded immediately upon selection and payment clearance.`
        : `Transit from our Kishangarh yard to ${locName} takes approximately ${location?.transitDays ?? '24–48 hours'} via direct national highway corridors.`,
    },
    {
      question: `Can I inspect the actual ${stoneName} slabs before dispatch to ${locName}?`,
      answer: `Yes. You can visit our Kishangarh yard on the MEGA Highway in person. For clients in ${locName} unable to travel, our sales engineers provide 4K live video inspections, wet-test color verification, dry-lay lot photos, and caliper thickness measurements of the exact slabs reserved for your order.`,
    },
    {
      question: `What finishes are available for ${stoneName}?`,
      answer: stone && stone.finishes?.length
        ? `${stoneName} is processed in ${stone.finishes.map((f) => f.label).join(', ')} finishes.`
        : `We process ${stoneName} in High Gloss Mirror Polished, Leathered/Lapotra, Flamed, Honed, Shot-Blast, and Acid-Wash finishes.`,
    },
    {
      question: `What is the minimum order quantity (MOQ) for dispatch to ${locName}?`,
      answer: `We supply projects of all scales—from individual home renovations (minimum 500–1,000 sq ft) to commercial IT parks and residential townships requiring full trailer consignments (10,000–100,000+ sq ft).`,
    },
  ];

  const faqs = [...colorFaqs, ...baseFaqs];

  return {
    heroImages,
    imageAlt,
    heroEyebrow,
    heroH1,
    heroH1Em,
    heroSubtitle,
    intro,
    blocks,
    statsBand,
    faqs,
    faqHeading: {
      title: 'Frequently Asked Questions',
      titleEm: `About ${stoneName} in ${locName}`,
      description: 'Clear answers on pricing, delivery timelines, minimum order quantities, and slab inspection.',
    },
  };
}
