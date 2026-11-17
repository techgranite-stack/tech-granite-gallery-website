// ============================================================
// src/lib/google-reviews.ts
//
// Server-only data layer for the <GoogleReviews /> section.
//
// Source: Google Places API (New) — Place Details.
//   GET https://places.googleapis.com/v1/places/{PLACE_ID}
//
// Env vars (set in .env.local and the Vercel dashboard — never commit):
//   GOOGLE_PLACES_API_KEY   Required for live data. Restrict the key to the
//                           "Places API (New)" and to server use only.
//   GOOGLE_PLACE_ID         Optional. If omitted, the Place ID is resolved once
//                           via Text Search and cached for 30 days.
//
// Known API limits (Google's, not ours):
//   • Place Details returns at most 5 reviews ("most relevant").
//   • `rating` and `userRatingCount` always reflect ALL reviews.
//   • Review content may be cached for max 30 days — we revalidate every 24h.
//   • Author name/photo/link must be shown (we do) with Google attribution.
// For the full review list you need the Business Profile API (OAuth + access
// approval) or a third-party widget.
// ============================================================

import { siteConfig } from '@/config/site';
import { businessGeo, googleBusinessProfile } from '@/data/local-seo';
import { googleReviewsSnapshot } from '@/data/google-reviews';

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
  /** ISO timestamp — used for sorting when available */
  publishTime?: string;
}

export interface GoogleReviewsData {
  source: 'google-places' | 'snapshot' | 'summary-only';
  placeName: string;
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
  /** Public Google Maps listing — "Read more reviews" */
  mapsUrl: string;
  /** Deep link that opens Google's "write a review" dialog */
  writeReviewUrl: string;
}

export interface GetGoogleReviewsOptions {
  /** Hide reviews below this star rating. Default 4. */
  minRating?: number;
  /** Max cards to return. Default 5 (the API's ceiling). */
  limit?: number;
  /** Drop star-only reviews with no written text. Default true. */
  requireText?: boolean;
}

const API_BASE = 'https://places.googleapis.com/v1';
const DAY = 60 * 60 * 24;

/* ── Fallback summary, from the single source of truth in local-seo.ts ── */
function summaryOnly(placeId?: string | null): GoogleReviewsData {
  return {
    source: 'summary-only',
    placeName: siteConfig.name,
    rating: googleBusinessProfile.ratingValue,
    totalReviews: googleBusinessProfile.reviewCount,
    reviews: [],
    mapsUrl: siteConfig.links.maps,
    writeReviewUrl: placeId
      ? `https://search.google.com/local/writereview?placeid=${placeId}`
      : siteConfig.links.maps,
  };
}

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;

  try {
    const res = await fetch(`${API_BASE}/places:searchText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName',
      },
      body: JSON.stringify({
        textQuery: 'Granite Gallery India, Kishangarh, Rajasthan',
        locationBias: {
          circle: {
            center: { latitude: businessGeo.latitude, longitude: businessGeo.longitude },
            radius: 3000,
          },
        },
        maxResultCount: 1,
      }),
      next: { revalidate: DAY * 30 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.places?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalise(raw: any, i: number): GoogleReview | null {
  const text: string = raw?.originalText?.text ?? raw?.text?.text ?? '';
  const rating = Number(raw?.rating);
  if (!rating) return null;
  return {
    id: raw?.name ?? `google-${i}`,
    authorName: raw?.authorAttribution?.displayName ?? 'Google user',
    authorUrl: raw?.authorAttribution?.uri,
    authorPhoto: raw?.authorAttribution?.photoUri,
    rating,
    text: text.trim(),
    relativeTime: raw?.relativePublishTimeDescription ?? '',
    publishTime: raw?.publishTime,
  };
}

function curate(reviews: GoogleReview[], opts: Required<GetGoogleReviewsOptions>) {
  return reviews
    .filter((r) => r.rating >= opts.minRating)
    .filter((r) => (opts.requireText ? r.text.length > 0 : true))
    .sort((a, b) => (b.publishTime ?? '').localeCompare(a.publishTime ?? ''))
    .slice(0, opts.limit);
}

export async function getGoogleReviews(
  options: GetGoogleReviewsOptions = {},
): Promise<GoogleReviewsData> {
  const opts: Required<GetGoogleReviewsOptions> = {
    minRating: options.minRating ?? 4,
    limit: options.limit ?? 5,
    requireText: options.requireText ?? true,
  };

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = apiKey ? await resolvePlaceId(apiKey) : null;

  /* 1 — live from Google */
  if (apiKey && placeId) {
    try {
      const res = await fetch(`${API_BASE}/places/${placeId}`, {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'displayName,rating,userRatingCount,googleMapsUri,reviews',
        },
        next: { revalidate: DAY },
      });

      if (res.ok) {
        const json = await res.json();
        const reviews = curate(
          (json.reviews ?? [])
            .map(normalise)
            .filter((r: GoogleReview | null): r is GoogleReview => r !== null),
          opts,
        );
        return {
          source: 'google-places',
          placeName: json.displayName?.text ?? siteConfig.name,
          rating: json.rating ?? googleBusinessProfile.ratingValue,
          totalReviews: json.userRatingCount ?? googleBusinessProfile.reviewCount,
          reviews,
          mapsUrl: json.googleMapsUri ?? siteConfig.links.maps,
          writeReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
        };
      }
      console.warn(`[google-reviews] Places API responded ${res.status}`);
    } catch (err) {
      console.warn('[google-reviews] Places API fetch failed', err);
    }
  }

  /* 2 — manual snapshot */
  const snapshot = curate(googleReviewsSnapshot, opts);
  if (snapshot.length > 0) {
    return { ...summaryOnly(placeId), source: 'snapshot', reviews: snapshot };
  }

  /* 3 — summary only */
  return summaryOnly(placeId);
}
