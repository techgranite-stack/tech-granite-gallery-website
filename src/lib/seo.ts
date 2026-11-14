import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { SITE_URL, abs } from './seo-url';

export const DEFAULT_OG_IMAGE = {
  url: abs('/images/hero/granite-gallery-marble-granite-sandstone.webp'),
  width: 2400,
  height: 1600,
  alt: 'Granite Gallery — marble, granite and sandstone slabs at the Kishangarh facility, Rajasthan',
};

export interface OgImageOptions {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface BuildMetadataOptions {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  image?: string | OgImageOptions | (string | OgImageOptions)[];
  type?: 'website' | 'article' | 'profile';
}

/**
 * Standardized Open Graph and Twitter Card metadata builder.
 * Guarantees all required Open Graph protocol tags (og:title, og:description,
 * og:url, og:image, og:type) and recommended tags (og:site_name, og:locale)
 * are always emitted for every page.
 */
export function buildMetadata({
  title,
  description,
  canonical,
  keywords,
  image,
  type = 'website',
}: BuildMetadataOptions): Metadata {
  const cleanPath = canonical.startsWith('http')
    ? new URL(canonical).pathname
    : canonical.startsWith('/')
    ? canonical
    : `/${canonical}`;

  const absoluteUrl = abs(cleanPath);

  let ogImages: OgImageOptions[] = [];
  if (!image) {
    ogImages = [DEFAULT_OG_IMAGE];
  } else if (Array.isArray(image)) {
    ogImages = image
      .filter(Boolean)
      .map((img) => {
        if (typeof img === 'string') {
          return { url: abs(img), alt: title };
        }
        return { ...img, url: abs(img.url), alt: img.alt || title };
      });
    if (ogImages.length === 0) {
      ogImages = [DEFAULT_OG_IMAGE];
    }
  } else if (typeof image === 'string') {
    ogImages = [{ url: abs(image), alt: title }];
  } else {
    ogImages = [{ ...image, url: abs(image.url), alt: image.alt || title }];
  }

  return {
    title,
    description,
    keywords,
    alternates: { canonical: cleanPath },
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: 'en_IN',
      url: absoluteUrl,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImages[0].url],
    },
  };
}
