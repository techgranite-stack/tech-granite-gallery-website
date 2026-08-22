import { landingPages } from '@/lib/landing-pages-data';
import { productsData } from '@/lib/product-data';

const BASE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://granitegalleryindia.com'
).replace(/\/$/, '');

export async function GET() {
  const lastMod = new Date().toISOString();

  const staticRoutes: { path: string; priority: string; changefreq: string }[] = [
    { path: '/',            priority: '1.0', changefreq: 'weekly'  },
    { path: '/marble',      priority: '0.9', changefreq: 'weekly'  },
    { path: '/granite',     priority: '0.9', changefreq: 'weekly'  },
    { path: '/collections', priority: '0.9', changefreq: 'weekly'  },
    { path: '/finishes',    priority: '0.8', changefreq: 'weekly'  },
    { path: '/applications',priority: '0.8', changefreq: 'weekly'  },
    { path: '/projects',    priority: '0.8', changefreq: 'weekly'  },
    { path: '/blogs',       priority: '0.8', changefreq: 'weekly'  },
    { path: '/about',       priority: '0.8', changefreq: 'monthly' },
    { path: '/team',        priority: '0.6', changefreq: 'monthly' },
  ];

  // Collection category listing pages (derived from data)
  const categories = Array.from(new Set(productsData.map((p) => p.type)));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const r of staticRoutes) {
    xml += `
  <url>
    <loc>${BASE}${r.path}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
  }

  for (const cat of categories) {
    xml += `
  <url>
    <loc>${BASE}/collections/${cat}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }

  // Landing pages (auto-populated from data)
  for (const page of Object.values(landingPages)) {
    xml += `
  <url>
    <loc>${BASE}/${page.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
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
