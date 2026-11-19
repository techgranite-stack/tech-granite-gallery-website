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

import { productsData } from '@/lib/product-data';
import { finishesData } from '@/lib/finish-data';
import { applicationsData } from '@/lib/application-data';
import { blogPostsData } from '@/lib/blog-data';
import { projectsData } from '@/lib/project-data';
import { getAllMarble, getAllGranite, colorPages, allStones } from '@/data/stone-index';
import { landingPages } from '@/lib/landing-pages-data';
import { teamMembers } from '@/data/team';
import { getAllLandingSlugs } from '@/lib/landing';
import { getAllBifurcatedSlugs } from '@/lib/landing/sitemaps';
import { SITE_URL } from '@/lib/seo-url';

interface SubSitemapInfo {
  path: string;
  count: number;
}

function getSubSitemapsWithCounts(): SubSitemapInfo[] {
  const bifurcated = getAllBifurcatedSlugs();
  const handcraftedSlugs = Object.keys(landingPages);
  const programmaticSlugs = getAllLandingSlugs();
  const allLandingSlugs = Array.from(new Set([...handcraftedSlugs, ...programmaticSlugs]));

  // 11 static routes + unique product categories + handcrafted landing pages
  const mainCount = 11 + new Set(productsData.map((p) => p.type)).size + handcraftedSlugs.length;

  // Total pages in image sitemap (pages that host image entries)
  const imagePageCount =
    teamMembers.length +
    productsData.length +
    allStones.length +
    applicationsData.length +
    finishesData.length +
    projectsData.length +
    blogPostsData.length +
    allLandingSlugs.length +
    1; // /collections

  return [
    { path: 'sitemap-main.xml', count: mainCount },
    { path: 'sitemap-marble.xml', count: getAllMarble().length },
    { path: 'sitemap-granite.xml', count: getAllGranite().length },
    { path: 'sitemap-colors.xml', count: colorPages.length },
    { path: 'sitemap-products.xml', count: productsData.length },
    { path: 'sitemap-finishes.xml', count: finishesData.length },
    { path: 'sitemap-applications.xml', count: applicationsData.length },
    { path: 'sitemap-blogs.xml', count: blogPostsData.length },
    { path: 'sitemap-projects.xml', count: projectsData.length },
    { path: 'sitemap-team.xml', count: teamMembers.length },
    { path: 'sitemap-landing-granite.xml', count: bifurcated.granite.length },
    { path: 'sitemap-landing-marble.xml', count: bifurcated.marble.length },
    { path: 'sitemap-landing-sandstone.xml', count: bifurcated.sandstone.length },
    { path: 'sitemap-landing-specialty.xml', count: bifurcated.specialty.length },
    { path: 'sitemap-landing-guides.xml', count: bifurcated.guides.length },
    { path: 'sitemap-landing.xml', count: allLandingSlugs.length },
    { path: 'sitemap-images.xml', count: imagePageCount },
  ];
}

export async function GET() {
  const lastMod = new Date().toISOString();
  const subs = getSubSitemapsWithCounts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subs.map(({ path, count }) => `  <sitemap>
    <loc>${SITE_URL}/sitemap/${path}</loc>
    <count>${count}</count>
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
