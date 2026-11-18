import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { allStones } from '@/data/stone-index';
import { productsData } from '@/lib/product-data';
import { teamMembers } from '@/data/team';
import { applicationsData } from '@/lib/application-data';
import { finishesData } from '@/lib/finish-data';
import { projectsData } from '@/lib/project-data';
import { blogPostsData } from '@/lib/blog-data';
import { landingPages } from '@/lib/landing-pages-data';
import { getAllLandingSlugs, getLandingPage } from '@/lib/landing';
import { SITE_URL } from '@/lib/seo-url';
import { IMAGE_SITEMAP_NS } from '@/lib/sitemap-images';
import {
  resolveHeroImage,
  resolveStandImage,
  resolveCatalogImage,
  resolveCollectionImage,
} from '@/lib/product-detail';

interface ImageEntry {
  url: string;
  title: string;
  caption?: string;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const lastMod = new Date().toISOString();
  // Map of canonical page URL -> list of associated image assets
  const pageMap = new Map<string, ImageEntry[]>();

  const addImageToPage = (pageUrl: string, rawPath: string | undefined, title: string, caption?: string) => {
    if (!rawPath) return;
    if (rawPath.includes('unsplash.com')) return;

    let cleanPath = rawPath.trim();
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
      if (cleanPath.startsWith(SITE_URL)) {
        cleanPath = cleanPath.substring(SITE_URL.length);
      } else {
        // Discard any third-party or stock image domains
        return;
      }
    }

    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    // Only allow verified local asset directories
    if (!cleanPath.startsWith('/images/') && !cleanPath.startsWith('/Logo/')) {
      return;
    }

    const fullUrl = `${SITE_URL}${cleanPath}`;
    const existing = pageMap.get(pageUrl) ?? [];
    if (!existing.some((entry) => entry.url === fullUrl)) {
      existing.push({
        url: fullUrl,
        title: title || 'Natural Stone Slabs',
        caption: caption || title,
      });
      pageMap.set(pageUrl, existing);
    }
  };

  // 1. Team Page Images
  for (const member of teamMembers) {
    const pageUrl = `${SITE_URL}/team/${member.slug}`;
    addImageToPage(
      pageUrl,
      member.image,
      `${member.name} — ${member.role} at Granite Gallery`,
      `${member.name}, ${member.expertise || member.role} in Kishangarh, Rajasthan`
    );
  }

  // 2. Product Data (Legacy & Collections)
  for (const p of productsData) {
    const pageUrl = `${SITE_URL}/collections/${p.type}/${p.slug}`;
    const pTitle = `${p.name} ${p.type === 'granite' ? 'Granite' : 'Marble'} Slab`;
    const heroImg = resolveCollectionImage(p.type, p.slug, 'hero', p.heroImage);
    const standImg = resolveCollectionImage(p.type, p.slug, 'stand', p.standImage ?? p.heroImage);
    const catalogImg = resolveCollectionImage(p.type, p.slug, 'catalog', p.catalogImage ?? p.heroImage);

    addImageToPage(pageUrl, heroImg, `${p.name} Hero Slab`, `${pTitle} - premium natural stone lot`);
    addImageToPage(pageUrl, standImg, `${p.name} Display Stand`, `${pTitle} display in Kishangarh showroom`);
    addImageToPage(pageUrl, catalogImg, `${p.name} Catalogue Cut`, `${pTitle} gangsaw calibrated cut`);
    for (const g of p.gallery ?? []) {
      addImageToPage(pageUrl, g, `${p.name} Installation Gallery`, `${pTitle} installed application`);
    }
  }

  // 3. Stone Catalogue Index (All 98 catalog stones: Granite, Marble, Sandstone, Quartzite, Slate, Limestone, etc.)
  for (const stone of allStones) {
    let pageUrl = `${SITE_URL}/granite/${stone.slug}`;
    if (stone.category === 'marble' || stone.category === 'imported-marble') {
      pageUrl = `${SITE_URL}/marble/${stone.slug}`;
    } else if (stone.category !== 'granite') {
      pageUrl = `${SITE_URL}/collections/${stone.category}/${stone.slug}`;
    }
    const stoneTitle = `${stone.name} ${stone.category === 'imported-marble' ? 'Imported Marble' : stone.category} Slab`;

    const hero = resolveHeroImage(stone.slug, stone.heroImages[0] ?? stone.thumbnail);
    const stand = resolveStandImage(stone.slug, stone.heroImages[0] ?? stone.thumbnail);
    const catalog = resolveCatalogImage(stone.slug, stone.thumbnail);

    addImageToPage(pageUrl, hero, `${stone.name} Gangsaw Slabs`, `${stoneTitle} ready for dispatch from Kishangarh`);
    addImageToPage(pageUrl, stand, `${stone.name} Showroom Stand`, `${stoneTitle} surface finish and texture`);
    addImageToPage(pageUrl, catalog, `${stone.name} Catalogue Cut`, `${stoneTitle} slab cut and calibration`);
  }

  // 4. Applications Showcase Images
  for (const app of applicationsData) {
    const pageUrl = `${SITE_URL}/applications/${app.slug}`;
    addImageToPage(pageUrl, app.heroImage, `${app.title} Stone Application Hero`, app.tagline || app.description);
    for (const img of app.gallery ?? []) {
      addImageToPage(pageUrl, img, `${app.title} Stone Installation`, `${app.title} natural stone architectural design`);
    }
    for (const sample of app.sampleImages ?? []) {
      addImageToPage(pageUrl, sample, `${app.title} Natural Stone Detail`, `${app.title} application texture`);
    }
  }

  // 5. Finish Texture Images
  for (const finish of finishesData) {
    const pageUrl = `${SITE_URL}/finishes/${finish.slug}`;
    addImageToPage(pageUrl, finish.image, `${finish.name} Surface Finish`, finish.subtitle || finish.description);
  }

  // 6. Landmark Project Images
  for (const project of projectsData) {
    const pageUrl = `${SITE_URL}/projects/${project.slug}`;
    addImageToPage(pageUrl, project.heroImage, `${project.title} Architectural Stone Project`, project.scope || project.category);
    for (const img of project.images ?? []) {
      addImageToPage(pageUrl, img, `${project.title} Gallery`, project.scope || project.category);
    }
  }

  // 7. Blog Article Images
  for (const blog of blogPostsData) {
    const pageUrl = `${SITE_URL}/blogs/${blog.slug}`;
    addImageToPage(pageUrl, blog.image, blog.title, blog.excerpt || blog.title);
  }

  // 8. All Landing Pages (Programmatic & Handcrafted Landing Pages with stone photos)
  const handcraftedSlugs = Object.keys(landingPages);
  const programmaticSlugs = getAllLandingSlugs();
  const allLandingSlugs = Array.from(new Set([...handcraftedSlugs, ...programmaticSlugs]));

  for (const slug of allLandingSlugs) {
    const page = landingPages[slug] ?? getLandingPage(slug);
    if (!page) continue;
    const pageUrl = `${SITE_URL}/${slug}`;
    const caption = Array.isArray(page.tagline)
      ? page.tagline.join(' · ')
      : (page.tagline || page.metadata.description);
    for (const img of page.hero.images) {
      addImageToPage(pageUrl, img, page.hero.imageAlt || page.hero.h1, caption);
    }
  }

  // 9. Filesystem Scan of public/images to catch any remaining asset and attach to /collections or /
  try {
    const publicImagesDir = join(process.cwd(), 'public', 'images');
    if (existsSync(publicImagesDir)) {
      const walkDir = (dir: string) => {
        const entries = readdirSync(dir);
        for (const entry of entries) {
          const fullPath = join(dir, entry);
          const stat = statSync(fullPath);
          if (stat.isDirectory()) {
            walkDir(fullPath);
          } else if (/\.(webp|png|jpe?g)$/i.test(entry)) {
            const relPath = fullPath.substring(fullPath.indexOf('/public/') + 7);
            const baseName = entry.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
            const formattedTitle = baseName.charAt(0).toUpperCase() + baseName.slice(1);
            // Default to collections hub if not already mapped
            addImageToPage(`${SITE_URL}/collections`, relPath, `${formattedTitle} Natural Stone Asset`, `Granite Gallery authentic stone inventory`);
          }
        }
      };
      walkDir(publicImagesDir);
    }
  } catch (err) {
    console.error('Error walking public/images:', err);
  }

  // Build standard Google Image Sitemap XML where <loc> is the hosting webpage URL
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="${IMAGE_SITEMAP_NS}">`;

  for (const [pageUrl, images] of Array.from(pageMap.entries())) {
    xml += `
  <url>
    <loc>${esc(pageUrl)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>`;
    for (const img of images) {
      xml += `
    <image:image>
      <image:loc>${esc(img.url)}</image:loc>
      <image:title>${esc(img.title)}</image:title>
      <image:caption>${esc(img.caption ?? img.title)}</image:caption>
    </image:image>`;
    }
    xml += `
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
