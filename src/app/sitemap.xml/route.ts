/**
 * Sitemap index — lists every category sub-sitemap.
 *
 * To add a new category sub-sitemap:
 *   1. Create src/app/sitemap/sitemap-<category>.xml/route.ts
 *   2. Import its count function below and add one <sitemap> entry.
 * The sub-sitemap itself derives its URLs purely from a data array import.
 */

import { productsData }                   from '@/lib/product-data';
import { finishesData }                   from '@/lib/finish-data';
import { applicationsData }               from '@/lib/application-data';
import { blogPostsData }                  from '@/lib/blog-data';
import { projectsData }                   from '@/lib/project-data';
import { getAllMarble, getAllGranite, colorPages } from '@/data/stone-index';
import { landingPages }                   from '@/lib/landing-pages-data';
import { teamMembers }                     from '@/data/team';

const BASE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://granitegalleryindia.com'
).replace(/\/$/, '');

interface SubSitemap {
  path: string;   // relative path under /sitemap/
  count: number;
}

export async function GET() {
  const lastMod = new Date().toISOString();

  // Every sub-sitemap with its live count (auto-updates as data grows)
  const subs: SubSitemap[] = [
    { path: 'sitemap-main.xml',         count: 9 + new Set(productsData.map((p) => p.type)).size + Object.keys(landingPages).length },
    { path: 'sitemap-marble.xml',       count: getAllMarble().length + 1 },         // +1 for /marble listing
    { path: 'sitemap-granite.xml',      count: getAllGranite().length + 1 },        // +1 for /granite listing
    { path: 'sitemap-colors.xml',       count: colorPages.length },
    { path: 'sitemap-products.xml',     count: productsData.length + getAllMarble().length + getAllGranite().length },
    { path: 'sitemap-finishes.xml',     count: finishesData.length },
    { path: 'sitemap-applications.xml', count: applicationsData.length },
    { path: 'sitemap-blogs.xml',        count: blogPostsData.length },
    { path: 'sitemap-projects.xml',     count: projectsData.length },
    { path: 'sitemap-team.xml',         count: teamMembers.length },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subs.map(({ path, count }) => `  <sitemap>
    <loc>${BASE}/sitemap/${path}</loc>
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
