import { getAllGranite } from '@/data/stone-index';
import { SITE_URL } from '@/lib/seo-url';

export async function GET() {
  const lastMod = new Date().toISOString();
  const stones  = getAllGranite();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  // The /granite listing page itself lives in sitemap-main.xml alongside every
  // other listing page — carrying it here too put it in two sitemaps at once.

  for (const stone of stones) {
    xml += `
  <url>
    <loc>${SITE_URL}/granite/${stone.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
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
