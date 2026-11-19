import { notFound } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';
import { landingPages } from '@/lib/landing-pages-data';
import {
  colorPages,
  getColorPageBySlug,
  getProductsByColor,
  getProductBySlug,
  getAllGranite,
  getAllMarble,
  getAllSandstone,
  getAllQuartzite,
  getAllSlate,
  getAllLimestone,
} from '@/data/stone-index';
import type { ColorFamily } from '@/types/stone';
import { fromStoneProduct, type ListingItem } from '@/lib/listing-item';
import ColorStonePage from '@/components/templates/ColorStonePage';
import PageHero from '@/components/sections/PageHero';
import LandingProse from '@/components/sections/LandingProse';
import LocalInfoBlock from '@/components/sections/LocalInfoBlock';
import StoneListingSection, { type FilterGroup } from '@/components/sections/StoneListingSection';
import FAQAccordion from '@/components/sections/FAQAccordion';
import LocalDeliveryCorridor from '@/components/sections/LocalDeliveryCorridor';
import BannerContactForm from '@/components/sections/BannerContactForm';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import StatsBand from '@/components/sections/StatsBand';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import MosaicGrid from '@/components/sections/MosaicGrid';
import HoverListReveal from '@/components/sections/HoverListReveal';
import ApplicationGallery from '@/components/sections/ApplicationGallery';
import ProcessSteps from '@/components/sections/ProcessSteps';
import FinishAboutSection from '@/components/sections/FinishAboutSection';
import OtherFinishesSection from '@/components/sections/OtherFinishesSection';
import RelatedColorsSection from '@/components/sections/RelatedColorsSection';
import StoneAboutSection from '@/components/sections/StoneAboutSection';
import ProductFinishesSection from '@/components/sections/ProductFinishesSection';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import GoogleReviews from '@/components/sections/GoogleReviews';
import FlagshipLandingPage from '@/components/templates/FlagshipLandingPage';
import { getFlagshipPage, getAllFlagshipSlugs } from '@/data/flagship-pages';
import { applicationsData } from '@/lib/application-data';
import { finishesData, type Finish } from '@/lib/finish-data';
import { testimonials } from '@/data/testimonials';
import { localBusinessJsonLd, localServiceJsonLd, trailJsonLd, productJsonLd } from '@/lib/structured-data';
import { getAllLandingSlugs, getLandingPage } from '@/lib/landing';
import { parseSlug } from '@/lib/landing/slug';
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

  const parsedSlug = parseSlug(params.slug);
  const isKishangarh = parsedSlug.location === 'kishangarh' || !parsedSlug.location;

  const stoneProduct = parsedSlug.stoneSlug
    ? getProductBySlug(parsedSlug.stoneSlug)
    : (getProductBySlug(params.slug) ??
       getProductBySlug(params.slug.replace(/-(granite|marble|sandstone|quartzite|slate|limestone|onyx|travertine)$/, '')) ??
       getProductBySlug(params.slug.replace(/-in-(kishangarh|delhi|rajasthan|jaipur|mumbai|bangalore|hyderabad|ahmedabad|pune|ludhiana|surat|indore|gurugram|nagpur|mysuru|karnataka)$/, '').replace(/-(granite|marble|sandstone|quartzite|slate|limestone|onyx|travertine)$/, '')));
  const isStonePage = Boolean(stoneProduct) || parsedSlug.pattern === 'P-Stone' || page.pattern === 'P-Stone' || Boolean(parsedSlug.stoneSlug);

  const isApplicationPage = Boolean(parsedSlug.application);
  const isFinishPage = Boolean(parsedSlug.finish) || page.pattern === 'P5' || page.pattern === 'P7';
  const isColorPage = Boolean(parsedSlug.color) || page.pattern === 'P6';
  const colorLabel = parsedSlug.color ? parsedSlug.color.charAt(0).toUpperCase() + parsedSlug.color.slice(1) : undefined;
  const finishSlug = parsedSlug.finish ?? (
    page.pattern === 'P5' || page.pattern === 'P7'
      ? (params.slug.match(/^(leathered|leather-finish|leather|lapatro|lapotra|lapato|lapatra|lepatro|honed|flamed|acid-wash|bush-hammered|shot-blast|chiseled|hydro-blast|polished|latino|antique)/)?.[1])
      : undefined
  );
  const resolvedFinishSlug = finishSlug && (
    finishSlug.startsWith('lapa') || finishSlug.startsWith('lapo') || finishSlug.startsWith('lepa') || finishSlug.includes('leather')
  ) ? 'leathered' : finishSlug;
  const finishData = resolvedFinishSlug ? finishesData.find((f) => f.slug === resolvedFinishSlug) : undefined;
  const isLapatro = Boolean(
    params.slug.includes('lapatro') ||
    params.slug.includes('lapotra') ||
    params.slug.includes('lapato') ||
    params.slug.includes('lapatra') ||
    params.slug.includes('lepatro')
  );
  const appData = parsedSlug.application
    ? applicationsData.find((a) => a.slug === parsedSlug.application)
    : undefined;
  const appTitle =
    appData?.title ??
    (parsedSlug.application
      ? parsedSlug.application.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : 'Application');
  const appGalleryImages =
    appData?.sampleImages && appData.sampleImages.length > 0
      ? appData.sampleImages
      : (appData?.gallery ?? []);

  const { hero, intro, blocks, showcase, tagline, localInfo, faqs, faqHeading, service } = page;

  const marqueeItems =
    page.numberedCards?.marqueeItems && page.numberedCards.marqueeItems.length > 0
      ? page.numberedCards.marqueeItems
      : (tagline && tagline.length > 0 ? tagline : []);

  // Resolve stones for the collection listing section based on material category
  const slugLower = page.slug.toLowerCase();
  const titleLower = (page.hero.h1 ?? '').toLowerCase();

  let categoryStones = getAllGranite();
  let defaultHeading = 'All Granite Collection';

  if (parsedSlug.color) {
    const colorStones = getProductsByColor(parsedSlug.color as ColorFamily);
    const matFiltered = parsedSlug.material
      ? colorStones.filter((s) => s.category === parsedSlug.material || (parsedSlug.material === 'marble' && s.category === 'imported-marble'))
      : colorStones;
    categoryStones = matFiltered.length > 0 ? matFiltered : colorStones;
    const matNameCap = parsedSlug.material ? parsedSlug.material.charAt(0).toUpperCase() + parsedSlug.material.slice(1) : 'Stone';
    defaultHeading = `${colorLabel} ${matNameCap} Collection`;
  } else if (slugLower.includes('marble') || titleLower.includes('marble')) {
    categoryStones = getAllMarble();
    defaultHeading = 'All Marble Collection';
  } else if (slugLower.includes('sandstone') || titleLower.includes('sandstone')) {
    categoryStones = getAllSandstone();
    defaultHeading = 'All Sandstone Collection';
  } else if (slugLower.includes('quartzite') || titleLower.includes('quartzite')) {
    categoryStones = getAllQuartzite();
    defaultHeading = 'All Quartzite Collection';
  } else if (slugLower.includes('slate') || titleLower.includes('slate')) {
    categoryStones = getAllSlate();
    defaultHeading = 'All Slate Collection';
  } else if (slugLower.includes('limestone') || titleLower.includes('limestone')) {
    categoryStones = getAllLimestone();
    defaultHeading = 'All Limestone Collection';
  }

  const primaryStones = (showcase?.slugs ?? [])
    .map((slug) => getProductBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // Combine matching stones first, followed by category stones (deduped by slug)
  const initialStones = stoneProduct ? [stoneProduct, ...primaryStones] : primaryStones;
  const allListingStones = Array.from(
    new Map([...initialStones, ...categoryStones].map((s) => [s.slug, s])).values()
  );

  const listingProducts: ListingItem[] = allListingStones.map(fromStoneProduct);

  const listingHeading = showcase
    ? `${showcase.heading} ${showcase.headingEm}`
    : isStonePage && stoneProduct
    ? `${stoneProduct.name} & Related ${stoneProduct.category === 'granite' ? 'Granites' : 'Stones'}`
    : defaultHeading;

  const listingEyebrow = showcase?.eyebrow ?? 'Curated Selection';

  // Merge product-specific FAQs with location/landing page FAQs
  const stoneFaqs = stoneProduct?.faqs ?? [];
  const mergedFaqs = [
    ...stoneFaqs,
    ...faqs.filter(
      (f) => !stoneFaqs.some((sf) => sf.question.trim().toLowerCase() === f.question.trim().toLowerCase())
    ),
  ];

  const resolvedFaqHeading = isStonePage && stoneProduct
    ? {
        title: 'Frequently Asked Questions',
        titleEm: `About ${stoneProduct.name} ${parsedSlug.material ? parsedSlug.material.charAt(0).toUpperCase() + parsedSlug.material.slice(1) : 'Stone'}${parsedSlug.location ? ` in ${parsedSlug.location.charAt(0).toUpperCase() + parsedSlug.location.slice(1)}` : ''}`,
        description: `Everything you need to know about ${stoneProduct.name} specifications, slab selection, pricing, and factory dispatch.`,
      }
    : faqHeading;

  // Map application showcase for HoverListReveal
  const mappedHoverApps = applicationsData.map((app) => {
    const samples = (app.sampleImages && app.sampleImages.length > 0 ? app.sampleImages : [app.heroImage]).slice(0, 3);
    return {
      id: app.slug,
      title: app.title,
      desc: app.tagline,
      tag: app.maintenanceLevel === 'low'
        ? 'Easy Care'
        : app.maintenanceLevel === 'medium'
          ? 'Moderate Care'
          : 'Specialist Care',
      image: samples[0],
      images: samples,
      href: `/applications/${app.slug}`,
    };
  });

  const matchedAppIdx = parsedSlug.application
    ? mappedHoverApps.findIndex(
        (a) => a.id.toLowerCase() === parsedSlug.application?.toLowerCase()
      )
    : -1;
  const initialAppIdx = matchedAppIdx >= 0 ? matchedAppIdx : 0;

  return (
    <>
      {/*
        LocalBusiness is emitted on pages with physical premises (Kishangarh facility)
        only. Delivery/out-of-town pages emit Service schema with areaServed.
      */}
      {isKishangarh && (
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
      {isStonePage && stoneProduct && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd(stoneProduct, hero.images)),
          }}
        />
      )}

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.h1}
        titleEm={hero.h1Em}
        subtitle={hero.subtitle}
        heroImages={hero.images}
        imageAlt={hero.imageAlt}
        badges={hero.badges?.map((b) => ({ value: b.value, label: b.label }))}
        fullHeight
      />

      {page.statsBand && page.statsBand.length > 0 && (
        <StatsBand stats={page.statsBand} />
      )}

      {/* Original Copper Marquee directly after StatsBand */}
      {marqueeItems && marqueeItems.length > 0 && (
        <ScrollingTagline items={marqueeItems} />
      )}

      {/* 1. For Specific Stone Pages: About This Stone section placed just after the 1st marquee */}
      {isStonePage && stoneProduct && (
        <StoneAboutSection
          product={stoneProduct}
          materialName={parsedSlug.material}
          locationName={parsedSlug.location}
        />
      )}

      {/* 1b. For Finish Pages: About This Finish section placed right after marquee */}
      {isFinishPage && finishData && (
        <FinishAboutSection
          finish={finishData}
          isLapatro={isLapatro}
          materialName={parsedSlug.material}
          locationName={parsedSlug.location}
        />
      )}

      {/* For non-finish pages, render standard intro prose. Finish pages have FinishAboutSection instead */}
      {!isFinishPage && <LandingProse block={intro} index={0} />}

      {/* For non-application and non-finish pages, render MosaicGrid if available */}
      {!isApplicationPage && !isFinishPage && page.mosaicApps && page.mosaicApps.length > 0 && (
        <MosaicGrid
          apps={page.mosaicApps}
          eyebrow="APPLICATION SHOWCASE"
          title="Architectural"
          titleEm="Applications"
          description="Engineered for high-traffic durability, stain resistance, and timeless luxury aesthetics."
        />
      )}

      {/* Blocks. On finish pages, skip redundant 'pros-cons' & 'intro' blocks since FinishAboutSection covers them. */}
      {blocks.map((block, idx) => {
        if (isFinishPage && (block.id === 'pros-cons' || block.id === 'intro')) {
          return null;
        }

        const isArchitecturalRigor =
          block.id === 'specifications' ||
          Boolean(block.eyebrow && block.eyebrow.toUpperCase().includes('ARCHITECTURAL RIGOR'));

        return (
          <React.Fragment key={block.id}>
            <LandingProse block={block} index={idx + 1} />
            {/* 2. After ARCHITECTURAL RIGOR section: add Available Finishes section from product page */}
            {isStonePage && stoneProduct && isArchitecturalRigor && (
              <>
                <ProductFinishesSection
                  product={stoneProduct}
                  materialName={parsedSlug.material}
                />
                {/* 3. For Specific Stone Pages: FAQs placed directly after Available Finishes */}
                {mergedFaqs.length > 0 && (
                  <FAQAccordion
                    items={mergedFaqs}
                    eyebrow="FAQ"
                    bg="var(--stone-100, #F2EBE0)"
                    {...(resolvedFaqHeading
                      ? {
                          title: resolvedFaqHeading.title,
                          titleEm: resolvedFaqHeading.titleEm,
                          description: resolvedFaqHeading.description,
                        }
                      : {})}
                  />
                )}
              </>
            )}
          </React.Fragment>
        );
      })}

      {/* For Application Pages: Gallery In Real Spaces placed directly before INSTALLATION PROTOCOL */}
      {isApplicationPage && appGalleryImages.length > 0 && (
        <ApplicationGallery images={appGalleryImages} title={appTitle} />
      )}

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
          showMarquee={false}
          bg="var(--stone-200)"
          cardBg="var(--stone-100)"
        />
      )}

      {/* For Application Pages: FAQs moved immediately after INSTALLATION PROTOCOL */}
      {isApplicationPage && mergedFaqs.length > 0 && (
        <FAQAccordion
          items={mergedFaqs}
          eyebrow="FAQ"
          bg="var(--stone-100, #F2EBE0)"
          {...(resolvedFaqHeading
            ? {
                title: resolvedFaqHeading.title,
                titleEm: resolvedFaqHeading.titleEm,
                description: resolvedFaqHeading.description,
              }
            : {})}
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

      {/* For Non-Application & Non-Stone Pages: FAQs (placed before Palette Variety & Visit Our Facility, with warm stone bg for contrast) */}
      {!isApplicationPage && (!isStonePage || !stoneProduct) && mergedFaqs.length > 0 && (
        <FAQAccordion
          items={mergedFaqs}
          eyebrow="FAQ"
          bg="var(--stone-100, #F2EBE0)"
          {...(resolvedFaqHeading
            ? {
                title: resolvedFaqHeading.title,
                titleEm: resolvedFaqHeading.titleEm,
                description: resolvedFaqHeading.description,
              }
            : {})}
        />
      )}

      {/* For Application Pages: Move APPLICATION SHOWCASE after FAQs */}
      {isApplicationPage && (
        <HoverListReveal
          categories={mappedHoverApps}
          eyebrow="APPLICATION SHOWCASE"
          title="Architectural"
          titleEm="Applications"
          subtitle="Engineered for high-traffic durability, stain resistance, and timeless luxury aesthetics."
          initialIndex={initialAppIdx}
          bg="var(--stone-200)"
        />
      )}

      {/* For Color Pages: Palette Variety / Explore Other Stone Colors placed after FAQs */}
      {isColorPage && (
        <RelatedColorsSection currentColor={parsedSlug.color} currentSlug={page.slug} />
      )}

      {/* For Finish Pages: Other Finishes / Explore More Finishes placed right after FAQs */}
      {isFinishPage && (
        <OtherFinishesSection currentSlug={finishData?.slug ?? ''} />
      )}

      {/* For Application Pages: From Brief to Installation placed right after FAQs */}
      {isApplicationPage && <ProcessSteps />}

      {/* VISIT OUR FACILITY */}
      {localInfo && <LocalInfoBlock info={localInfo} />}

      {/* Testimonials and Google Reviews placed after VISIT OUR FACILITY */}
      {(isStonePage || isFinishPage || isColorPage || isApplicationPage) && (
        <>
          {tagline && tagline.length > 0 && <ScrollingTagline items={tagline} />}
          <MarqueeTestimonials testimonials={testimonials} />
          <GoogleReviews />
        </>
      )}

      <BannerContactForm />

      {/* Direct Factory Dispatch & Delivery Corridors — in the bottom just before the footer */}
      <LocalDeliveryCorridor
        stoneSlug={parsedSlug.stoneSlug}
        material={parsedSlug.material}
        currentLocation={parsedSlug.location}
      />
    </>
  );
}
