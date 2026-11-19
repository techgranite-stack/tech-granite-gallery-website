// ============================================================
// src/data/google-reviews.ts
//
// MANUAL Google reviews — the single place to edit.
//
// How to update (takes ~2 minutes):
//   1. Open the Google Business Profile / Maps listing
//      (siteConfig.links.maps) and pick the reviews you want to feature.
//   2. Copy each one WORD-FOR-WORD (Hindi/English as written), with the
//      reviewer's real name and Google's "x weeks ago" label.
//   3. Reviews are automatically prioritized based on review length (longest first)
//      so that detailed, helpful testimonials are featured prominently.
//   4. Keep the headline rating / count in src/data/local-seo.ts
//      (`googleBusinessProfile`) in sync with the listing.
//
// ⚠️ Never invent, translate-and-alter or "improve" a review. Fabricated or
// edited reviews breach Google's policies and Indian consumer-protection
// rules on fake reviews, and can get the Business Profile suspended.
//
// Empty array = the section shows only the rating summary + buttons.
// ============================================================

import type { GoogleReview } from '@/lib/google-reviews';

/** Overrides for the two section links. Leave undefined to use the defaults. */
export const googleListingLinks: {
  /** "Read more Google reviews" — default: siteConfig.links.maps */
  mapsUrl?: string;
  /**
   * "Write a review" — default: the Maps listing. For a direct review dialog use
   * https://search.google.com/local/writereview?placeid=<YOUR_PLACE_ID>
   * (find the Place ID at developers.google.com/maps/documentation/places/web-service/place-id)
   */
  writeReviewUrl?: string;
} = {};

/**
 * Snapshot of authentic Google Reviews.
 * Prioritized based on review length (longest/most detailed reviews first).
 */
const rawGoogleReviews: GoogleReview[] = [
  {
    id: 'rachna-kabra',
    authorName: 'Rachna Kabra',
    rating: 5,
    relativeTime: '3 years ago',
    text: 'Amazing display of stones for almost everyplace, office , home, kitchen tiles, exterior elevation. Owners arevery cooperative , and suggested the best stone with beautiful patterns for my place at very good prices . Totally satisfied with quality and price. Visitors at my home compliments me about the flooring and wall tiles, all thanks @granite gallery india #granite gallery india',
  },
  {
    id: 'keshav-malani',
    authorName: 'Keshav Malani',
    rating: 5,
    relativeTime: 'a year ago',
    text: 'I have never seen such a variety of stone anywhere else in Kishangarh... In Kishangarh, everyone tells about 100 colors, 200 colors, 500 colors. By using 5 types of colors on the same material, the number of variety is increased... Granite gallery has a real variety of materials and all are natural. After working with these, the macha came',
  },
  {
    id: 'sanjay-kr-sharma',
    authorName: 'Sanjay Kr Sharma',
    rating: 5,
    relativeTime: '22 hours ago',
    text: 'All the best to Amit Ji and his team. They are genuine and trustworthy professionals with strong business ethics. An excellent and reliable destination for all your natural, precious, and decorative stone requirements. Highly recommended!',
  },
  {
    id: 'nandkishor-saini',
    authorName: 'Nandkishor Saini',
    rating: 5,
    relativeTime: '3 weeks ago',
    text: 'As a whileseller distributor our reputation depends on delivering uniform quality stones to retailers granite gallery supplies with atmost quality and trust',
  },
  {
    id: 'ajay-sharma',
    authorName: 'Ajay Sharma',
    rating: 5,
    relativeTime: '3 years ago',
    text: 'The quality and variety of sandstone was amazing, I enjoyed working with it... Great process Full satisfaction',
  },
  {
    id: 'kayum-pathan',
    authorName: 'Kayum Pathan',
    rating: 5,
    relativeTime: '3 years ago',
    text: 'Very nice and wide variety of wooden finishes they have like stone, aluminum, veneer and slate...',
  },
  {
    id: 'manojkumar-babra',
    authorName: 'manojkumar babra',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Good staffs and minimum price and best quality',
  },
  {
    id: 'imtiyaz-ahmed',
    authorName: 'Imtiyaz Ahmed',
    rating: 5,
    relativeTime: '11 months ago',
    text: 'Best palace for exotic stone .and finished..',
  },
  {
    id: 'shaitan-choudhary',
    authorName: 'Shaitan Choudhary',
    rating: 5,
    relativeTime: '2 years ago',
    text: "Strong and best item's in this gallery",
  },
  {
    id: 'ranjeet-nuwad',
    authorName: 'Ranjeet Nuwad',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Product is. Too good and best quality',
  },
  {
    id: 'piyush-malpani',
    authorName: 'piyush malpani',
    rating: 5,
    relativeTime: '3 months ago',
    text: 'Yha highest variety of stones dekha',
  },
  {
    id: 'akhlesh-maurya',
    authorName: 'Akhlesh Maurya',
    rating: 5,
    relativeTime: 'a year ago',
    text: 'Best quality Stone and design View',
  },
  {
    id: 'vicky-vicky',
    authorName: 'Vicky Vicky',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Good quality marble and granite',
  },
  {
    id: 'kshitiz-garg',
    authorName: 'Kshitiz Garg',
    rating: 5,
    relativeTime: 'a year ago',
    text: 'Wow Product Quality and Degein',
  },
  {
    id: 'vinit-joshi',
    authorName: 'Vinit Joshi',
    rating: 5,
    relativeTime: 'a year ago',
    text: 'Osm Quality And Best Price',
  },
  {
    id: 'sunil-darda',
    authorName: 'Sunil Darda',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Osm look good quality',
  },
  {
    id: 'arun-sharma',
    authorName: 'Arun Sharma',
    rating: 5,
    relativeTime: '3 months ago',
    text: 'Very nice experience',
  },
  {
    id: 'ruparam-khatotiya',
    authorName: 'Ruparam Khatotiya',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Top quality market',
  },
];

/**
 * Reviews prioritized descending by review character length (most detailed first).
 */
export const googleReviews: GoogleReview[] = [...rawGoogleReviews].sort(
  (a, b) => b.text.trim().length - a.text.trim().length
);
