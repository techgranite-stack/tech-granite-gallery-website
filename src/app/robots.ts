import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // ⚠️  NEVER add '/_next/' to this list.
        //
        // Every image on the site is rendered through next/image, which serves
        // from `/_next/image?url=...`. That transformed URL is what ships in the
        // HTML — the original `/images/...` path appears nowhere in `src` or
        // `srcset`. Disallowing `/_next/` therefore blocked Googlebot-Image from
        // fetching a single image on the site (149 pages indexed, 0 images).
        //
        // `/_next/static/` additionally holds the JS and CSS chunks Google needs
        // to render client components (/about, HeroSlider, MosaicGrid, every
        // carousel). Blocking it degrades rendering site-wide.
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // `host` intentionally omitted: it is a Yandex-only directive that Google
    // ignores, and it duplicated information already carried by the sitemap.
  };
}
