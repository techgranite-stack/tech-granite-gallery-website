import { productsData } from '@/lib/product-data';
import { SITE_URL } from '@/lib/seo-url';
import { imageTags, IMAGE_SITEMAP_NS } from '@/lib/sitemap-images';
import { resolveCollectionImage } from '@/lib/product-detail';

export async function GET() {
  const lastMod = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="${IMAGE_SITEMAP_NS}">`;

  // Legacy /collections/[category]/[slug] pages only.
  // /marble/* and /granite/* live in sitemap-marble.xml and sitemap-granite.xml —
  // listing them here too put all 55 stone URLs in two sitemaps at once.
  for (const p of productsData) {
    const heroImg = resolveCollectionImage(p.type, p.slug, 'hero', p.heroImage);
    const standImg = resolveCollectionImage(p.type, p.slug, 'stand', p.standImage ?? p.heroImage);
    const catalogImg = resolveCollectionImage(p.type, p.slug, 'catalog', p.catalogImage ?? p.heroImage);
    const images = Array.from(new Set([heroImg, standImg, catalogImg, ...(p.gallery ?? [])]));

    xml += `
  <url>
    <loc>${SITE_URL}/collections/${p.type}/${p.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${imageTags(images, `${p.name} Slab`)}
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
