// ============================================================
// src/lib/google-reviews.ts
//
// Data layer for the <GoogleReviews /> section — manual, no API.
//   • Reviews ........ src/data/google-reviews.ts   (edit by hand)
//   • Rating / count . src/data/local-seo.ts        (googleBusinessProfile)
//   • Links .......... siteConfig.links.maps, or overrides in the data file
// ============================================================

import { siteConfig } from '@/config/site';
import { googleBusinessProfile } from '@/data/local-seo';
import { googleReviews, googleListingLinks } from '@/data/google-reviews';

export interface GoogleReview {
  id: string;
  authorName: string;
  authorUrl?: string;
  authorPhoto?: string;
  /** 1–5 */
  rating: number;
  text: string;
  /** Google's own phrasing, e.g. "2 weeks ago" */
  relativeTime: string;
}

export interface GoogleReviewsData {
  placeName: string;
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
  /** "Read more Google reviews" */
  mapsUrl: string;
  /** "Write a review" */
  writeReviewUrl: string;
}

export interface GetGoogleReviewsOptions {
  /** Hide reviews below this star rating. Default 4. */
  minRating?: number;
  /** Max cards to show. Default 6. */
  limit?: number;
  /** Drop star-only reviews with no written text. Default true. */
  requireText?: boolean;
}

export function getGoogleReviews(options: GetGoogleReviewsOptions = {}): GoogleReviewsData {
  const { minRating = 4, limit = 6, requireText = true } = options;
  const mapsUrl = googleListingLinks.mapsUrl ?? siteConfig.links.maps;

  return {
    placeName: siteConfig.name,
    rating: googleBusinessProfile.ratingValue,
    totalReviews: googleBusinessProfile.reviewCount,
    reviews: googleReviews
      .filter((r) => r.rating >= minRating)
      .filter((r) => (requireText ? r.text.trim().length > 0 : true))
      .slice(0, limit),
    mapsUrl,
    writeReviewUrl: googleListingLinks.writeReviewUrl ?? mapsUrl,
  };
}
