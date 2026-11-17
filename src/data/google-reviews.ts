// ============================================================
// src/data/google-reviews.ts
//
// MANUAL SNAPSHOT of real Google reviews — the fallback layer.
//
// The <GoogleReviews /> section resolves its data in this order:
//   1. Live from the Google Places API   (needs GOOGLE_PLACES_API_KEY)
//   2. This snapshot                      (used if the API is unset / down)
//   3. Summary-only (rating + count + CTAs, no cards)
//
// ⚠️ Only paste reviews that really exist on the Google Business Profile,
// word-for-word, with the reviewer's real name. Never invent or edit reviews:
// fabricated reviews breach Google's policies and Indian consumer-protection
// rules on fake reviews, and put the Business Profile at risk of suspension.
//
// Leave the array empty until real ones are added — the section degrades
// gracefully to the summary view.
// ============================================================

import type { GoogleReview } from '@/lib/google-reviews';

export const googleReviewsSnapshot: GoogleReview[] = [
  // {
  //   id: 'snapshot-1',
  //   authorName: 'Reviewer Name',
  //   rating: 5,
  //   text: 'Exact review text copied from Google…',
  //   relativeTime: '2 weeks ago',
  // },
];
