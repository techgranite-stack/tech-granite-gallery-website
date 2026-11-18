import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { landingPages } from '@/lib/landing-pages-data';
import {
  colorPages,
  getColorPageBySlug,
  getProductsByColor,
  getProductBySlug,
  getAllGranite,
  getAllMarble,
} from '@/data/stone-index';
import { fromStoneProduct, type ListingItem } from '@/lib/listing-item';
import ColorStonePage from '@/components/templates/ColorStonePage';
import PageHero from '@/components/sections/PageHero';
import LandingProse from '@/components/sections/LandingProse';
import LocalInfoBlock from '@/components/sections/LocalInfoBlock';
import StoneListingSection, { type FilterGroup } from '@/components/sections/StoneListingSection';
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
import { buildMetadata } from '@/lib/seo';

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

const COLOR_FILTERS: FilterGroup[] = [
  {
    key: 'color',
    label: 'Color',
    display: 'swatch',
    options: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'grey', label: 'Grey' },
      { value: 'pink', label: 'Pink' },
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'brown', label: 'Brown' },
      { value: 'blue', label: 'Blue' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'beige', label: 'Beige' },
    ],
  },
];

export function generateMetadata({ params }: PageProps): Metadata {
  // Color page metadata — sourced from colorPages data in stone-index.ts
  const colorPage = getColorPageBySlug(params.slug);
  if (colorPage) {
    const products = getProductsByColor(colorPage.color);
    const image = colorPage.ogImage || (products.length > 0 ? (products[0].heroImages?.[0] ?? products[0].thumbnail) : undefined);
    return buildMetadata({
      title: colorPage.metaTitle,
      description: colorPage.metaDescription,
      keywords: colorPage.keywords,
      canonical: `/${colorPage.slug}`,
      image,
    });
  }

  // Flagship landing page metadata (full home-page component stack)
  const flagship = getFlagshipPage(params.slug);
  if (flagship) {
    const { title, description, keywords, ogImage, canonical } = flagship.metadata;
    return buildMetadata({
      title,
      description,
      keywords,
      canonical: canonical ?? `/${flagship.slug}`,
      image: ogImage,
    });
  }

  // Hand-crafted landing page metadata or Programmatic matrix landing page
  const pageData = landingPages[params.slug] ?? getLandingPage(params.slug);
  if (pageData) {
    const { title, description, keywords, ogImage } = pageData.metadata;
    return buildMetadata({
      title,
      description,
      keywords,
      canonical: `/${pageData.slug}`,
      image: ogImage,
    });
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

  // Resolve stones for the collection listing section
  const isMarblePage =
    page.slug.includes('marble') ||
    page.hero.h1?.toLowerCase().includes('marble') ||
    page.service?.serviceType?.toLowerCase().includes('marble') ||
    page.hero.eyebrow?.toLowerCase().includes('marble');

  const primaryStones = (showcase?.slugs ?? [])
    .map((slug) => getProductBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const categoryStones = isMarblePage ? getAllMarble() : getAllGranite();

  // Combine matching stones first, followed by category stones (deduped by slug)
  const allListingStones = Array.from(
    new Map([...primaryStones, ...categoryStones].map((s) => [s.slug, s])).values()
  );

  const listingProducts: ListingItem[] = allListingStones.map(fromStoneProduct);

  const listingHeading = showcase
    ? `${showcase.heading} ${showcase.headingEm}`
    : isMarblePage
    ? 'All Marble Collection'
    : 'All Granite Collection';

  const listingEyebrow = showcase?.eyebrow ?? 'Curated Selection';

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

      <LandingProse block={intro} index={0} />

      {page.mosaicApps && page.mosaicApps.length > 0 && (
        <MosaicGrid
          apps={page.mosaicApps}
          eyebrow="APPLICATION SHOWCASE"
          title="Architectural"
          titleEm="Applications"
          description="Engineered for high-traffic durability, stain resistance, and timeless luxury aesthetics."
        />
      )}

      {blocks.map((block, idx) => (
        <LandingProse key={block.id} block={block} index={idx + 1} />
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

      {listingProducts.length > 0 && (
        <StoneListingSection
          products={listingProducts}
          filters={COLOR_FILTERS}
          heading={listingHeading}
          eyebrow={listingEyebrow}
          initialLimit={9}
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
