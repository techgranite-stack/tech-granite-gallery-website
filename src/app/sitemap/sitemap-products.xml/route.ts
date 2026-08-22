import { productsData } from '@/lib/product-data';
import { getAllMarble, getAllGranite } from '@/data/stone-index';

const BASE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://granitegalleryindia.com'
).replace(/\/$/, '');

export async function GET() {
  const lastMod = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Old /collections/[category]/[slug] pages
  for (const p of productsData) {
    xml += `
  <url>
    <loc>${BASE}/collections/${p.type}/${p.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  // New /marble/[slug] pages
  for (const stone of getAllMarble()) {
    xml += `
  <url>
    <loc>${BASE}/marble/${stone.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }

  // New /granite/[slug] pages
  for (const stone of getAllGranite()) {
    xml += `
  <url>
    <loc>${BASE}/granite/${stone.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
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
