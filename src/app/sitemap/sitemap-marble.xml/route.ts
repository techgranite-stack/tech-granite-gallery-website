import { getAllMarble } from '@/data/stone-index';
import { SITE_URL } from '@/lib/seo-url';
import { imageTags, IMAGE_SITEMAP_NS } from '@/lib/sitemap-images';
import { resolveHeroImage, resolveStandImage, resolveCatalogImage } from '@/lib/product-detail';

export async function GET() {
  const lastMod = new Date().toISOString();
  const stones  = getAllMarble();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="${IMAGE_SITEMAP_NS}">`;
  // The /marble listing page itself lives in sitemap-main.xml alongside every
  // other listing page — carrying it here too put it in two sitemaps at once.

  for (const stone of stones) {
    const heroImage = resolveHeroImage(stone.slug, stone.heroImages[0] ?? stone.thumbnail);
    const standImage = resolveStandImage(stone.slug, stone.heroImages[0] ?? stone.thumbnail);
    const catalogImage = resolveCatalogImage(stone.slug, stone.thumbnail);
    const images = Array.from(new Set([heroImage, standImage, catalogImage]));

    xml += `
  <url>
    <loc>${SITE_URL}/marble/${stone.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>${imageTags(images, `${stone.name} Marble Slab`)}
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
