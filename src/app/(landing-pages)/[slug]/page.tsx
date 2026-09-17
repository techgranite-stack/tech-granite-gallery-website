import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { landingPages } from '@/lib/landing-pages-data';
import {
  colorPages,
  getColorPageBySlug,
  getProductsByColor,
  getProductBySlug,
} from '@/data/stone-index';
import { productPath } from '@/types/stone';
import { resolveCatalogImage } from '@/lib/product-detail';
import ColorStonePage from '@/components/templates/ColorStonePage';
import PageHero from '@/components/sections/PageHero';
import LandingProse from '@/components/sections/LandingProse';
import LocalInfoBlock from '@/components/sections/LocalInfoBlock';
import RelatedGrid from '@/components/sections/RelatedGrid';
import FAQAccordion from '@/components/sections/FAQAccordion';
import BannerContactForm from '@/components/sections/BannerContactForm';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import { localBusinessJsonLd, localServiceJsonLd, trailJsonLd } from '@/lib/structured-data';

interface PageProps {
  params: { slug: string };
}

// Unknown slugs must 404 rather than render, matching the rest of the site.
export const dynamicParams = false;

// Pre-generate static paths for both landing pages AND color pages
export function generateStaticParams() {
  const landingSlugs = Object.keys(landingPages).map((slug) => ({ slug }));
  const colorSlugs = colorPages.map((cp) => ({ slug: cp.slug }));
  return [...landingSlugs, ...colorSlugs];
}

export function generateMetadata({ params }: PageProps): Metadata {
  // Color page metadata — sourced from colorPages data in stone-index.ts
  const colorPage = getColorPageBySlug(params.slug);
  if (colorPage) {
    return {
      title: colorPage.metaTitle,
      description: colorPage.metaDescription,
      keywords: colorPage.keywords,
      alternates: { canonical: `/${colorPage.slug}` },
      openGraph: {
        title: colorPage.metaTitle,
        description: colorPage.metaDescription,
        ...(colorPage.ogImage ? { images: [colorPage.ogImage] } : {}),
      },
    };
  }

  // Landing page metadata
  const pageData = landingPages[params.slug];
  if (pageData) {
    const { title, description, keywords, ogImage } = pageData.metadata;
    return {
      title,
      description,
      keywords,
      alternates: { canonical: `/${pageData.slug}` },
      openGraph: {
        type: 'website',
        title,
        description,
        url: `/${pageData.slug}`,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
    };
  }

  return {};
}

export default function CatchAllPage({ params }: PageProps) {
  // ── Color SEO page ──────────────────────────────────────────────────────────
  const colorPage = getColorPageBySlug(params.slug);
  if (colorPage) {
    const products = getProductsByColor(colorPage.color);
    return <ColorStonePage data={colorPage} products={products} />;
  }

  // ── Marketing / local landing page ──────────────────────────────────────────
  const page = landingPages[params.slug];
  if (!page) notFound();

  const { hero, intro, blocks, showcase, tagline, localInfo, faqs, faqHeading, service } = page;

  // Resolve showcase slugs against the live catalogue, so a renamed or removed
  // stone surfaces as a missing card rather than a broken link.
  const showcaseItems =
    showcase?.slugs
      .map((slug) => getProductBySlug(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s))
      .map((s) => ({
        href: productPath(s),
        image: resolveCatalogImage(s.slug, s.thumbnail),
        category: s.category === 'granite' ? 'Granite' : 'Marble',
        name: s.name,
        sub: s.tagline,
      })) ?? [];

  return (
    <>
      {/*
        LocalBusiness is emitted here and on / and /contact only — the pages that
        actually speak about the premises. The Service node ties "what we do" to
        "where", which is the pairing local queries match against.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            localServiceJsonLd({
              name: service.name,
              description: page.metadata.description,
              url: `/${page.slug}`,
              serviceType: service.serviceType,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            trailJsonLd(page.breadcrumb.map((b) => ({ name: b.name, path: b.path })))
          ),
        }}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.h1}
        titleEm={hero.h1Em}
        subtitle={hero.subtitle}
        heroImages={hero.images}
        imageAlt={hero.imageAlt}
        badges={hero.badges?.map((b) => ({ value: b.value, label: b.label }))}
        breadcrumb={page.breadcrumb.map((b, i) => ({
          label: b.name,
          // Last crumb is the current page — no link.
          href: i === page.breadcrumb.length - 1 ? undefined : b.path,
        }))}
        fullHeight
      />

      <LandingProse block={intro} />

      {blocks.map((block) => (
        <LandingProse key={block.id} block={block} />
      ))}

      {showcase && showcaseItems.length > 0 && (
        <RelatedGrid
          eyebrow={showcase.eyebrow}
          title={showcase.heading}
          titleEm={showcase.headingEm}
          items={showcaseItems}
        />
      )}

      {tagline && tagline.length > 0 && <ScrollingTagline items={tagline} />}

      {localInfo && <LocalInfoBlock info={localInfo} />}

      {faqs.length > 0 && (
        <FAQAccordion
          items={faqs}
          eyebrow="FAQ"
          {...(faqHeading
            ? {
                title: faqHeading.title,
                titleEm: faqHeading.titleEm,
                description: faqHeading.description,
              }
            : {})}
        />
      )}

      <BannerContactForm />
    </>
  );
}
