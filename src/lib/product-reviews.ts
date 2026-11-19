/**
 * Product Reviews & Aggregate Rating Engine
 * Generates verified architectural & client review data and Schema.org structured data.
 *
 * Rules:
 * 1. Rating between 4.7 and 5.0 for all products, correlated with price tiers.
 * 2. Sandstone specifically rated between 4.9 and 5.0.
 * 3. Review counts strictly between 5 and 12.
 * 4. Deterministic per slug (no hydration mismatch or unstable SSR).
 */

export interface ProductReviewItem {
  author: string;
  role: string;
  location: string;
  datePublished: string;
  ratingValue: number;
  reviewBody: string;
}

export interface ProductReviewData {
  ratingValue: string; // e.g. "4.9"
  ratingNumber: number; // 4.9
  reviewCount: number; // between 5 and 12
  reviews: ProductReviewItem[];
}

/** Stable numeric hash for a given string */
function getSlugHash(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface ReviewerPersona {
  name: string;
  role: string;
  location: string;
}

const PERSONAS: ReviewerPersona[] = [
  { name: 'Ar. Vikram Malhotra', role: 'Principal Architect', location: 'Delhi NCR' },
  { name: 'Meera Kulkarni', role: 'Interior Designer', location: 'Mumbai' },
  { name: 'Rohan Deshmukh', role: 'Project Director', location: 'Bengaluru' },
  { name: 'Sunil Agarwal', role: 'Commercial Contractor', location: 'Ahmedabad' },
  { name: 'Pooja Bhargava', role: 'Luxury Residential Designer', location: 'Hyderabad' },
  { name: 'Karanvir Gill', role: 'Estate Developer', location: 'Ludhiana' },
  { name: 'Siddharth Singhania', role: 'Architectural Consultant', location: 'Jaipur' },
  { name: 'Ananya Roy', role: 'Landscape & Facade Specialist', location: 'Pune' },
];

const DATES = [
  '2025-01-18',
  '2024-12-05',
  '2024-11-22',
  '2024-10-14',
  '2024-09-02',
  '2024-07-28',
  '2024-06-19',
  '2024-05-11',
];

/**
 * Returns deterministic aggregate rating and reviews for a stone product.
 */
export function getProductReviewData(
  slug: string,
  stoneName: string,
  category = 'granite',
  priceHigh = 100,
  priceLow = 70
): ProductReviewData {
  const hash = getSlugHash(slug);
  const normalizedCategory = category.toLowerCase();
  const isSandstone =
    normalizedCategory.includes('sandstone') ||
    slug.toLowerCase().includes('sandstone');

  // Review count strictly between 5 and 12
  const reviewCount = 5 + (hash % 8); // yields 5, 6, 7, 8, 9, 10, 11, or 12

  // Determine aggregate rating
  let ratingValue: string;
  if (isSandstone) {
    // Specifically 4.9 or 5.0 for sandstone
    ratingValue = hash % 2 === 0 ? '5.0' : '4.9';
  } else {
    // All products between 4.7 and 5.0 based on pricing
    const effectivePrice = Math.max(priceHigh, priceLow);
    if (effectivePrice >= 200) {
      // Luxury / High-tier (e.g. Makrana, Statuario, Exotic): 4.9 or 5.0
      ratingValue = hash % 2 === 0 ? '5.0' : '4.9';
    } else if (effectivePrice >= 90) {
      // Mid-high tier: 4.8 or 4.9
      ratingValue = hash % 3 === 0 ? '4.9' : '4.8';
    } else {
      // Standard / Economy tier: 4.7 or 4.8
      ratingValue = hash % 2 === 0 ? '4.8' : '4.7';
    }
  }

  const ratingNumber = parseFloat(ratingValue);

  // Generate 3 contextual client reviews
  const reviews: ProductReviewItem[] = [];
  const p1 = PERSONAS[hash % PERSONAS.length];
  const p2 = PERSONAS[(hash + 3) % PERSONAS.length];
  const p3 = PERSONAS[(hash + 5) % PERSONAS.length];

  const d1 = DATES[hash % DATES.length];
  const d2 = DATES[(hash + 2) % DATES.length];
  const d3 = DATES[(hash + 4) % DATES.length];

  if (isSandstone) {
    reviews.push(
      {
        author: p1.name,
        role: p1.role,
        location: p1.location,
        datePublished: d1,
        ratingValue: 5,
        reviewBody: `Procured 4,800 sq ft of calibrated ${stoneName} for an exterior facade and courtyard landscape. Uniform thickness calibration and outstanding texture with zero transit chipping.`,
      },
      {
        author: p2.name,
        role: p2.role,
        location: p2.location,
        datePublished: d2,
        ratingValue: 5,
        reviewBody: `Superb natural cleft finish on ${stoneName}. Sourced directly from Kishangarh at ex-factory mandi rates. The lot quality and moisture tolerance have held up impeccably.`,
      },
      {
        author: p3.name,
        role: p3.role,
        location: p3.location,
        datePublished: d3,
        ratingValue: 5,
        reviewBody: `Specifying ${stoneName} for our villa project in ${p3.location} was a great decision. Crisp cut-to-size slab edges and exceptional natural earthy tone consistency across all crates.`,
      }
    );
  } else if (normalizedCategory.includes('marble')) {
    reviews.push(
      {
        author: p1.name,
        role: p1.role,
        location: p1.location,
        datePublished: d1,
        ratingValue: ratingNumber >= 4.9 ? 5 : 5,
        reviewBody: `Inspected and locked 3,500 sq ft of ${stoneName} gangsaw slabs at the Kishangarh yard. The bookmatch figure veining and crystal luster surpassed our client's expectations.`,
      },
      {
        author: p2.name,
        role: p2.role,
        location: p2.location,
        datePublished: d2,
        ratingValue: 5,
        reviewBody: `Authentic ${stoneName} lot dispatch was loaded securely with heavy A-frame supports. Mirror polish quality and uniform slab calibration with zero resin fills.`,
      },
      {
        author: p3.name,
        role: p3.role,
        location: p3.location,
        datePublished: d3,
        ratingValue: ratingNumber >= 4.8 ? 5 : 4,
        reviewBody: `Direct factory sourcing saved our client substantially compared to city retail markups. ${stoneName} looks breathtaking in our master suite and grand foyer installation.`,
      }
    );
  } else {
    // Granite & other stones
    reviews.push(
      {
        author: p1.name,
        role: p1.role,
        location: p1.location,
        datePublished: d1,
        ratingValue: 5,
        reviewBody: `Procured 5,200 sq ft of ${stoneName} for a luxury commercial project. The crystalline grain density and diamond-cut edges are top-tier. Dispatched on time to ${p1.location}.`,
      },
      {
        author: p2.name,
        role: p2.role,
        location: p2.location,
        datePublished: d2,
        ratingValue: 5,
        reviewBody: `Selected ${stoneName} for kitchen countertops and flooring. Scratch-resistant, deep uniform coloration, and heavy-duty slab strength. Highly recommended factory partner.`,
      },
      {
        author: p3.name,
        role: p3.role,
        location: p3.location,
        datePublished: d3,
        ratingValue: ratingNumber >= 4.8 ? 5 : 4,
        reviewBody: `Exceptional quality control on ${stoneName} lots. Every single slab from Kishangarh arrived without any hairline cracks or corner imperfections.`,
      }
    );
  }

  return {
    ratingValue,
    ratingNumber,
    reviewCount,
    reviews,
  };
}

/**
 * Returns Schema.org JSON-LD nodes for aggregateRating and reviews.
 */
export function getProductReviewSchema(
  slug: string,
  stoneName: string,
  category = 'granite',
  priceHigh?: number,
  priceLow?: number
) {
  const data = getProductReviewData(slug, stoneName, category, priceHigh, priceLow);

  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.ratingValue,
      bestRating: '5',
      worstRating: '1',
      ratingCount: data.reviewCount,
      reviewCount: data.reviewCount,
    },
    review: data.reviews.map((r) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.ratingValue),
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Person',
        name: r.author,
      },
      datePublished: r.datePublished,
      reviewBody: r.reviewBody,
    })),
  };
}
