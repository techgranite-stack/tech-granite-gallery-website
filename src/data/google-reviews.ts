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

export const googleReviews: GoogleReview[] = [
  // Example — copy this block for each review, newest first:
  // {
  //   id: 'r1',
  //   authorName: 'Reviewer Name',
  //   rating: 5,
  //   text: 'Exact review text copied from Google…',
  //   relativeTime: '2 weeks ago',
  //   // authorUrl: 'https://www.google.com/maps/contrib/…',   // optional
  //   // authorPhoto: 'https://lh3.googleusercontent.com/…',   // optional
  // },
];
