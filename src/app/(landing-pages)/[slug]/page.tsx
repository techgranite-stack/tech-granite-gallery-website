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
import StatsBand from '@/components/sections/StatsBand';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import MosaicGrid from '@/components/sections/MosaicGrid';
import FlagshipLandingPage from '@/components/templates/FlagshipLandingPage';
import { getFlagshipPage, getAllFlagshipSlugs } from '@/data/flagship-pages';
import { localBusinessJsonLd, localServiceJsonLd, trailJsonLd } from '@/lib/structured-data';
import { getAllLandingSlugs, getLandingPage } from '@/lib/landing';

interface PageProps {
  params: { slug: string };
}

// Unknown slugs call notFound() explicitly if not matched in any data registry.
export const dynamicParams = true;

// Pre-generate static paths for landing pages, color pages, and programmatic matrix pages
export function generateStaticParams() {
  const flagshipSlugs = getAllFlagshipSlugs();
  const landingSlugs = Object.keys(landingPages);
  const colorSlugs = colorPages.map((cp) => cp.slug);
  const programmaticSlugs = getAllLandingSlugs();

  const allSlugs = Array.from(new Set([...flagshipSlugs, ...landingSlugs, ...colorSlugs, ...programmaticSlugs]));
  return allSlugs.map((slug) => ({ slug }));
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

  // Flagship landing page metadata (full home-page component stack)
  const flagship = getFlagshipPage(params.slug);
  if (flagship) {
    const { title, description, keywords, ogImage, canonical } = flagship.metadata;
    return {
      title,
      description,
      keywords,
      alternates: { canonical: canonical ?? `/${flagship.slug}` },
      openGraph: {
        type: 'website',
        title,
        description,
        url: `/${flagship.slug}`,
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

  // Hand-crafted landing page metadata or Programmatic matrix landing page
  const pageData = landingPages[params.slug] ?? getLandingPage(params.slug);
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
  // ── Flagship SEO page (full home-page component stack) ───────────────────────
  const flagship = getFlagshipPage(params.slug);
  if (flagship) {
    return <FlagshipLandingPage data={flagship} />;
  }

  // ── Color SEO page ──────────────────────────────────────────────────────────
  const colorPage = getColorPageBySlug(params.slug);
  if (colorPage) {
    const products = getProductsByColor(colorPage.color);
    return <ColorStonePage data={colorPage} products={products} />;
  }

  // ── Marketing / local landing page (Handcrafted or Programmatic) ─────────────
  const page = landingPages[params.slug] ?? getLandingPage(params.slug);
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
        LocalBusiness is emitted on pages with physical premises (Kishangarh facility)
        only. Delivery/out-of-town pages emit Service schema with areaServed.
      */}
      {localInfo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      )}
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

      {page.statsBand && page.statsBand.length > 0 && (
        <StatsBand stats={page.statsBand} />
      )}

      <LandingProse block={intro} />

      {page.mosaicApps && page.mosaicApps.length > 0 && (
        <MosaicGrid
          apps={page.mosaicApps}
          eyebrow="APPLICATION SHOWCASE"
          title="Architectural"
          titleEm="Applications"
          description="Engineered for high-traffic durability, stain resistance, and timeless luxury aesthetics."
        />
      )}

      {blocks.map((block) => (
        <LandingProse key={block.id} block={block} />
      ))}

      {page.numberedCards && page.numberedCards.reasons.length > 0 && (
        <NumberedCardGrid
          reasons={page.numberedCards.reasons.map((r, i) => ({
            num: String(i + 1).padStart(2, '0'),
            title: r.title,
            desc: r.desc,
          }))}
          eyebrow={page.numberedCards.eyebrow}
          title={page.numberedCards.title}
          subtitle={page.numberedCards.subtitle}
          marqueeItems={page.numberedCards.marqueeItems}
        />
      )}

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
