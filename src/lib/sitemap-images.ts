import { SITE_URL } from '@/lib/seo-url';

export const IMAGE_SITEMAP_NS = 'http://www.google.com/schemas/sitemap-image/1.1';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Build <image:image> blocks (direct, stable image URLs — not /_next/image variants). */
export function imageTags(images: (string | undefined)[], title: string): string {
  const seen = new Set<string>();
  let out = '';
  for (const img of images) {
    if (!img || seen.has(img)) continue;
    seen.add(img);
    const loc = /^https?:\/\//.test(img) ? img : `${SITE_URL}${img.startsWith('/') ? '' : '/'}${img}`;
    out += `
    <image:image>
      <image:loc>${esc(loc)}</image:loc>
      <image:title>${esc(title)}</image:title>
    </image:image>`;
  }
  return out;
}
