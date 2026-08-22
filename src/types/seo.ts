/**
 * Standard SEO metadata interface used across every page data file.
 *
 * Rules (must be followed when writing values):
 *
 * metaTitle
 *   - Max 60 characters
 *   - Primary keyword near the beginning
 *   - Unique per page — no two pages share the same title
 *   - Natural language; no keyword stuffing
 *   - Append "| Granite Gallery" when space allows
 *
 * metaDescription
 *   - 140–160 characters
 *   - Clearly describes the page content
 *   - Primary keyword used naturally (once)
 *   - Action-oriented where appropriate ("Explore", "Buy", "Get quote")
 *   - Unique across all pages
 *
 * keywords
 *   - 5–10 terms or phrases
 *   - Mix of primary, secondary, and long-tail keywords
 *   - No duplicates; no terms unrelated to the page content
 *
 * ogImage (optional)
 *   - Absolute URL to a representative image (min 1200×630)
 *   - If omitted, the nearest heroImage / gallery[0] is used as fallback
 */
export interface SeoMeta {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Absolute image URL for Open Graph / Twitter card */
  ogImage?: string;
}
