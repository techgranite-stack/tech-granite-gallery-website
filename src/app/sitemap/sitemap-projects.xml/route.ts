import { projectsData } from '@/lib/project-data';
import { SITE_URL } from '@/lib/seo-url';
import { imageTags, IMAGE_SITEMAP_NS } from '@/lib/sitemap-images';

export async function GET() {
  const lastMod = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="${IMAGE_SITEMAP_NS}">`;

  projectsData.forEach((p) => {
    xml += `
  <url>
    <loc>${SITE_URL}/projects/${p.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>${imageTags([p.heroImage, ...p.images], p.title)}
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
