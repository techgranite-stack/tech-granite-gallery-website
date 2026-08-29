// ============================================================
// src/lib/seo-url.ts
// Single source of truth for the site's absolute base URL.
//
// Previously eleven sitemap routes, robots.ts and structured-data.ts each
// declared their own copy — and they disagreed: six used
// `NEXT_PUBLIC_SITE_URL ?? NEXT_PUBLIC_APP_URL` with a trailing-slash strip,
// five used the reverse precedence with no strip. If both vars were ever set
// to different values the site would advertise two hostnames and split its
// own canonical signals. Import from here instead.
// ============================================================

/** Absolute origin, no trailing slash. e.g. "https://granitegalleryindia.com" */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  'https://granitegalleryindia.com'
).replace(/\/$/, '');

/**
 * Absolute URL for a site-relative path. Pass-through for URLs that are
 * already absolute, so it is safe to map over mixed local/remote image lists.
 *
 * schema.org requires absolute URLs — relative ones are silently discarded by
 * Google, which is why every Product node on the site had no usable image.
 */
export function abs(path: string): string {
  if (!path) return path;
  return /^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`;
}

/** Escapes a string for safe interpolation into XML text nodes. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
