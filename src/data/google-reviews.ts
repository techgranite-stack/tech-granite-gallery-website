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
//   3. Add an entry below, newest first. Save, commit, deploy.
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
 * Snapshot taken 18 Nov 2026 (listing: 4.9 ★ from 52 reviews).
 * `relativeTime` is Google's label at that date and ages — refresh it when you
 * next update the list.
 *
 * Copied word-for-word, spelling and all. Not included: reviews whose text is
 * cut off with "…" or shown only as a Google machine translation.
 */
export const googleReviews: GoogleReview[] = [
  {
    id: 'nandkishor-saini',
    authorName: 'Nandkishor Saini',
    rating: 5,
    relativeTime: '3 weeks ago',
    text: 'As a whileseller distributor our reputation depends on delivering uniform quality stones to retailers granite gallery supplies with atmost quality and trust',
  },
  {
    id: 'piyush-malpani',
    authorName: 'piyush malpani',
    rating: 5,
    relativeTime: '3 months ago',
    text: 'Yha highest variety of stones dekha',
  },
  {
    id: 'arun-sharma',
    authorName: 'Arun Sharma',
    rating: 5,
    relativeTime: '3 months ago',
    text: 'Very nice experience',
  },
  {
    id: 'imtiyaz-ahmed',
    authorName: 'Imtiyaz Ahmed',
    rating: 5,
    relativeTime: '11 months ago',
    text: 'Best palace for exotic stone .and finished..',
  },
  {
    id: 'vinit-joshi',
    authorName: 'Vinit Joshi',
    rating: 5,
    relativeTime: 'a year ago',
    text: 'Osm Quality And Best Price',
  },
  {
    id: 'akhlesh-maurya',
    authorName: 'Akhlesh Maurya',
    rating: 5,
    relativeTime: 'a year ago',
    text: 'Best quality Stone and design View',
  },
  {
    id: 'kshitiz-garg',
    authorName: 'Kshitiz Garg',
    rating: 5,
    relativeTime: 'a year ago',
    text: 'Wow Product Quality and Degein',
  },
  {
    id: 'manojkumar-babra',
    authorName: 'manojkumar babra',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Good staffs and minimum price and best quality',
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
    id: 'sunil-darda',
    authorName: 'Sunil Darda',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Osm look good quality',
  },
  {
    id: 'vicky-vicky',
    authorName: 'Vicky Vicky',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Good quality marble and granite',
  },
  {
    id: 'ruparam-khatotiya',
    authorName: 'Ruparam Khatotiya',
    rating: 5,
    relativeTime: '2 years ago',
    text: 'Top quality market',
  },
  {
    id: 'rachna-kabra',
    authorName: 'Rachna Kabra',
    rating: 5,
    relativeTime: '3 years ago',
    text: 'Amazing display of stones for almost everyplace, office , home, kitchen tiles, exterior elevation. Owners arevery cooperative , and suggested the best stone with beautiful patterns for my place at very good prices . Totally satisfied with quality and price. Visitors at my home compliments me about the flooring and wall tiles, all thanks @granite gallery india #granite gallery india',
  },
  {
    id: 'ajay-sharma',
    authorName: 'Ajay Sharma',
    rating: 5,
    relativeTime: '3 years ago',
    text: 'Bahut badiya sandstone ki quality and variety in se kam kar ke maja aaya... Bahut badiya process Full satisfaction',
  },
];
