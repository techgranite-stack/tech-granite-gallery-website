/**
 * Sitemap index — lists every sub-sitemap.
 *
 * To add a new sub-sitemap:
 *   1. Create src/app/sitemap/sitemap-<category>.xml/route.ts
 *   2. Add its filename to SUB_SITEMAPS below.
 * The sub-sitemap itself derives its URLs purely from a data array import.
 *
 * The <sitemap> element accepts only <loc> and <lastmod> per the sitemaps.org
 * 0.9 schema. This file previously emitted a <count> child, which is not part
 * of the spec — validators reject it and parsers may discard the entry. The
 * per-sitemap URL counts it carried were also drifting out of sync with the
 * routes they described (main was hardcoded to 9 against 10 static paths), so
 * they are gone rather than corrected.
 */

import { SITE_URL } from '@/lib/seo-url';

const SUB_SITEMAPS = [
  'sitemap-main.xml',
  'sitemap-marble.xml',
  'sitemap-granite.xml',
  'sitemap-colors.xml',
  'sitemap-products.xml',
  'sitemap-finishes.xml',
  'sitemap-applications.xml',
  'sitemap-blogs.xml',
  'sitemap-projects.xml',
  'sitemap-team.xml',
  'sitemap-landing-granite.xml',
  'sitemap-landing-marble.xml',
  'sitemap-landing-sandstone.xml',
  'sitemap-landing-specialty.xml',
  'sitemap-landing-guides.xml',
  'sitemap-landing.xml',
  'sitemap-images.xml',
] as const;

export async function GET() {
  const lastMod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SUB_SITEMAPS.map((path) => `  <sitemap>
    <loc>${SITE_URL}/sitemap/${path}</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
