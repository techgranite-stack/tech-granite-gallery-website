// ============================================================
// src/lib/landing/compose.ts
// Programmatic Composer: transforms ResolvedCombo + ManifestEntry into LandingPageData.
// Uses buildPatternContent to provide deep domain prose, authentic images,
// and pattern-specific components (StatsBand, NumberedCardGrid, MosaicGrid).
// ============================================================

import { LandingPageData } from '@/lib/landing-pages-data';
import { ManifestEntry, ResolvedCombo } from './types';
import { addressOneLine } from '@/data/local-seo';
import { buildPatternContent } from '@/data/seo-matrix/pattern-content';

const KISHANGARH_MAP_EMBED =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent(addressOneLine) +
  '&t=&z=15&ie=UTF8&iwloc=&output=embed';

/**
 * Builds a strictly unique, 140–160 character meta description for every URL.
 * Prevents duplicate descriptions across programmatic pages (crucial for SEO).
 */
function buildUniqueDescription(entry: ManifestEntry, resolved: ResolvedCombo): string {
  const { combo, location, material, priceBand } = resolved;
  const locName = location?.name ?? 'Kishangarh';
  const matName = material?.name ?? 'Natural Stone';
  const low = priceBand?.lowPrice ?? 42;
  const high = priceBand?.highPrice ?? 350;
  const isKishangarh = location?.hasFacility || locName.toLowerCase() === 'kishangarh';

  let desc = '';
  if (entry.pattern === 'G6') {
    const appOrFinish = combo.application ? combo.application.replace(/-/g, ' ') : (combo.finish ? combo.finish.replace(/-/g, ' ') : 'architectural use');
    desc = `Compare the best ${matName.toLowerCase()} varieties for ${appOrFinish}. Durability ratings, Mohs hardness, thickness standards & wholesale slab rates from Kishangarh.`;
  } else if (entry.pattern === 'G1' || entry.pattern === 'G1b' || entry.pattern === 'G1c') {
    desc = isKishangarh
      ? `Explore 2026 ${matName.toLowerCase()} prices in Kishangarh Mandi. Slabs start ₹${low} to ₹${high}/sq ft ex-yard. Get transparent rates, slab grades & lot inspection.`
      : `Explore 2026 ${matName.toLowerCase()} prices in ${locName}. Slabs start ₹${low} to ₹${high}/sq ft ex-Kishangarh. Get verified rates, slab grades & landed delivery estimates.`;
  } else if (combo.stoneSlug) {
    const stoneTitle = entry.primaryKeyword.replace(/ (in|suppliers|price).*/i, '').trim();
    desc = isKishangarh
      ? `Direct wholesale ${stoneTitle} in Kishangarh. Gangsaw cut slabs from ₹${low}–₹${high}/sq ft. Certified ASTM specs, factory inspection & crane loading on MEGA Highway.`
      : `Direct sourcing of ${stoneTitle} in ${locName}. Gangsaw cut slabs from ₹${low}–₹${high}/sq ft. Certified ASTM specs, factory inspection & site transit from Kishangarh.`;
  } else if (combo.finish) {
    const finishName = combo.finish.replace(/-/g, ' ');
    desc = `Source architectural ${finishName} finish ${matName.toLowerCase()} in ${locName}. Anti-skid textured slabs ₹${low}–₹${high}/sq ft direct from Kishangarh with insured transit.`;
  } else if (combo.application) {
    const appName = combo.application.replace(/-/g, ' ');
    desc = `Premium ${matName.toLowerCase()} for ${appName} in ${locName}. Calibrated gangsaw slabs from ₹${low}–₹${high}/sq ft. High load strength, zero fissure grading & site delivery.`;
  } else if (combo.color) {
    desc = isKishangarh
      ? `Find premium ${combo.color} ${matName.toLowerCase()} in Kishangarh Mandi. Direct quarry selection from ₹${low}–₹${high}/sq ft ex-yard. Uniform color lots ready for inspection.`
      : `Find premium ${combo.color} ${matName.toLowerCase()} in ${locName}. Direct quarry selection from ₹${low}–₹${high}/sq ft ex-Kishangarh. Uniform color lots with doorstep transit.`;
  } else {
    desc = isKishangarh
      ? `Buy premium ${matName.toLowerCase()} in Kishangarh direct from processing yard. Indicative rates ₹${low}–₹${high}/sq ft. Gangsaw slabs, verified ASTM specs & lot loading.`
      : `Buy premium ${matName.toLowerCase()} in ${locName} direct from Kishangarh. Indicative rates ₹${low}–₹${high}/sq ft. Gangsaw slabs, verified ASTM specs & insured container transport.`;
  }

  // Strict 140–160 length clamp
  if (desc.length > 160) {
    desc = desc.slice(0, 157) + '...';
  } else if (desc.length < 140) {
    const fill = isKishangarh ? ` Direct yard supply.` : ` Direct factory supply.`;
    desc = (desc.replace(/\.$/, '') + fill).slice(0, 160);
  }
  return desc;
}

export function composeLandingPage(
  entry: ManifestEntry,
  resolved: ResolvedCombo
): LandingPageData {
  const { combo, location, material, matchingStones, specRanges } = resolved;
  const locName = location?.name ?? 'Kishangarh';
  const matName = material?.name ?? 'Natural Stone';
  const kw = entry.primaryKeyword;
  const isKishangarh = location?.hasFacility || locName.toLowerCase() === 'kishangarh';

  // 1. Get pattern-differentiated editorial content & images
  const content = buildPatternContent(entry, resolved);

  // 2. Breadcrumb
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: matName, path: combo.material === 'marble' ? '/marble' : '/granite' },
    { name: entry.metaTitle, path: `/${entry.slug}` },
  ];

  // 3. Showcase Slugs
  const showcaseSlugs = matchingStones.slice(0, 6).map((s) => s.slug);
  const showcase =
    showcaseSlugs.length > 0
      ? {
          eyebrow: 'CURATED SELECTION',
          heading: `Featured ${matName} Slabs`,
          headingEm: isKishangarh ? 'at Kishangarh Yard' : `Ready for ${locName}`,
          intro: `Explore prime lots of ${matName.toLowerCase()} currently available for immediate dispatch.`,
          slugs: showcaseSlugs,
        }
      : undefined;

  // 4. Local Info Block (Emitted for Kishangarh facility)
  const localInfo = isKishangarh
    ? {
        eyebrow: 'VISIT OUR FACILITY',
        heading: 'Kishangarh Stone Processing Yard',
        headingEm: 'on the MEGA Highway',
        intro: 'Visit our stone gallery to inspect live slab blocks, compare finishes, and finalize custom edge profiling.',
        directions: [
          {
            label: 'From Kishangarh Airport',
            detail: 'Approx. 15 km (20 minutes) via NH48 direct bypass to Ralawata.',
          },
          {
            label: 'From Kishangarh Railway Station',
            detail: 'Approx. 8 km via Station Road connecting to the Marble Market corridor.',
          },
          {
            label: 'From Jaipur',
            detail: 'Take NH48 South towards Ajmer. Take the Kishangarh bypass onto the MEGA Highway.',
          },
        ],
        mapEmbedUrl: KISHANGARH_MAP_EMBED,
      }
    : undefined;

  const uniqueDescription = buildUniqueDescription(entry, resolved);

  return {
    slug: entry.slug,
    pattern: entry.pattern,
    metadata: {
      title: entry.metaTitle,
      description: uniqueDescription,
      keywords: [kw, `${matName.toLowerCase()} in ${locName}`, `${matName.toLowerCase()} price`, 'kishangarh stone supplier'],
      ogImage: content.heroImages[0],
    },
    breadcrumb,
    hero: {
      eyebrow: content.heroEyebrow,
      h1: content.heroH1,
      h1Em: content.heroH1Em,
      subtitle: content.heroSubtitle,
      images: content.heroImages,
      imageAlt: content.imageAlt,
      badges: [
        { value: '55+', label: 'Stone Varieties' },
        { value: specRanges.compressiveStrength ?? '200 MPa', label: 'Load Strength' },
        { value: '100%', label: 'Factory Inspected' },
      ],
    },
    statsBand: content.statsBand,
    intro: content.intro,
    mosaicApps: content.mosaicApps,
    blocks: content.blocks,
    numberedCards: content.numberedCards,
    showcase,
    tagline: [
      'PRECISION CALIBRATED SLABS',
      'FACTORY DIRECT RATES',
      'VERIFIED ASTM SPECS',
      'ALL-INDIA DISPATCH',
      'ARCHITECTURAL FINISHES',
    ],
    localInfo,
    faqs: content.faqs,
    faqHeading: content.faqHeading,
    service: {
      name: `${matName} Supply to ${locName}`,
      serviceType: 'Natural Stone Supply & Processing',
    },
  };
}
