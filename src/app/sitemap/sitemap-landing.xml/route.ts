import { getAllLandingSlugs, getLandingPage } from '@/lib/landing';
import { landingPages } from '@/lib/landing-pages-data';
import { SITE_URL } from '@/lib/seo-url';
import { imageTags, IMAGE_SITEMAP_NS } from '@/lib/sitemap-images';

export async function GET() {
  const lastMod = new Date().toISOString();
  const handcraftedSlugs = Object.keys(landingPages);
  const programmaticSlugs = getAllLandingSlugs();

  const allSlugs = Array.from(new Set([...handcraftedSlugs, ...programmaticSlugs]));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="${IMAGE_SITEMAP_NS}">`;

  for (const slug of allSlugs) {
    const page = landingPages[slug] ?? getLandingPage(slug);
    if (!page) continue;

    const isPriceOrBuyerGuide = slug.includes('price') || slug.includes('guide') || slug.includes('mandi');
    const priority = isPriceOrBuyerGuide ? '0.90' : '0.80';
    const images = page.hero?.images ?? [];
    const alt = page.hero?.imageAlt ?? page.metadata.title;

    xml += `
  <url>
    <loc>${SITE_URL}/${slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${imageTags(images, alt)}
  </url>`;
  }

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
