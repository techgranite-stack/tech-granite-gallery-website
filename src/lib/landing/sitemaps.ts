import { getAllLandingSlugs, getLandingPage } from './index';
import { parseSlug } from './slug';
import { landingPages } from '@/lib/landing-pages-data';
import { SITE_URL } from '@/lib/seo-url';
import { imageTags, IMAGE_SITEMAP_NS } from '@/lib/sitemap-images';

export type LandingSitemapCategory =
  | 'granite'
  | 'marble'
  | 'sandstone'
  | 'specialty'
  | 'guides';

export function getAllBifurcatedSlugs(): Record<LandingSitemapCategory, string[]> {
  const handcraftedSlugs = Object.keys(landingPages);
  const programmaticSlugs = getAllLandingSlugs();
  const allSlugs = Array.from(new Set([...handcraftedSlugs, ...programmaticSlugs]));

  const result: Record<LandingSitemapCategory, string[]> = {
    granite: [],
    marble: [],
    sandstone: [],
    specialty: [],
    guides: [],
  };

  for (const slug of allSlugs) {
    const isGuideOrPrice =
      slug.includes('guide') ||
      slug.includes('price') ||
      slug.includes('mandi') ||
      slug.includes('cost') ||
      slug.startsWith('best-') ||
      slug.includes('faqs');

    if (isGuideOrPrice) {
      result.guides.push(slug);
      continue;
    }

    const parsed = parseSlug(slug);

    if (parsed.material === 'marble' || slug.includes('marble')) {
      result.marble.push(slug);
    } else if (parsed.material === 'sandstone' || slug.includes('sandstone')) {
      result.sandstone.push(slug);
    } else if (
      parsed.material === 'quartzite' ||
      parsed.material === 'slate' ||
      parsed.material === 'limestone' ||
      parsed.material === 'onyx' ||
      parsed.material === 'travertine' ||
      slug.includes('quartzite') ||
      slug.includes('slate') ||
      slug.includes('limestone') ||
      slug.includes('onyx') ||
      slug.includes('travertine') ||
      slug.includes('exotic') ||
      slug.includes('porphyry')
    ) {
      result.specialty.push(slug);
    } else {
      // Default / Granite
      result.granite.push(slug);
    }
  }

  return result;
}

export function buildSitemapXmlForSlugs(slugs: string[]): string {
  const lastMod = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="${IMAGE_SITEMAP_NS}">`;

  for (const slug of slugs) {
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
  return xml;
}

export function createBifurcatedSitemapResponse(category: LandingSitemapCategory): Response {
  const categorized = getAllBifurcatedSlugs();
  const slugs = categorized[category] ?? [];
  const xml = buildSitemapXmlForSlugs(slugs);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
