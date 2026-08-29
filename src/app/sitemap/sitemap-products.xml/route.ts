import { productsData } from '@/lib/product-data';
import { SITE_URL } from '@/lib/seo-url';

export async function GET() {
  const lastMod = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Legacy /collections/[category]/[slug] pages only.
  // /marble/* and /granite/* live in sitemap-marble.xml and sitemap-granite.xml —
  // listing them here too put all 55 stone URLs in two sitemaps at once.
  for (const p of productsData) {
    xml += `
  <url>
    <loc>${SITE_URL}/collections/${p.type}/${p.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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
