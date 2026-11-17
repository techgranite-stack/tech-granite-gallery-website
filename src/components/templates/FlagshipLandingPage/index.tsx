import dynamic from 'next/dynamic';
import HeroSlider from '@/components/sections/HeroSlider';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import HoverListReveal from '@/components/sections/HoverListReveal';
import MosaicGrid from '@/components/sections/MosaicGrid';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import FAQAccordion from '@/components/sections/FAQAccordion';
import { FlagshipPageData } from '@/data/flagship-pages';
import { teamMembers as defaultTeamMembers } from '@/data/team';
import { blogPosts as defaultBlogPosts } from '@/data/blog';
import { localBusinessJsonLd, localServiceJsonLd, trailJsonLd } from '@/lib/structured-data';

// Dynamically import below-the-fold interactive sections to reduce initial mobile bundle
const CoverflowCarousel = dynamic(() => import('@/components/sections/CoverflowCarousel'));
const HorizontalScrollGallery = dynamic(() => import('@/components/sections/HorizontalScrollGallery'));
const MarqueeTestimonials = dynamic(() => import('@/components/sections/MarqueeTestimonials'));
const GoogleReviews = dynamic(() => import('@/components/sections/GoogleReviews'));
const ProcessSteps = dynamic(() => import('@/components/sections/ProcessSteps'));
const PortraitTeamGrid = dynamic(() => import('@/components/sections/PortraitTeamGrid'));
const ArticleCardGrid = dynamic(() => import('@/components/sections/ArticleCardGrid'));
const BannerContactForm = dynamic(() => import('@/components/sections/BannerContactForm'));

interface FlagshipLandingPageProps {
  data: FlagshipPageData;
}

export default function FlagshipLandingPage({ data }: FlagshipLandingPageProps) {
  const isKishangarh = data.localInfo?.city.toLowerCase().includes('kishangarh') ?? false;

  return (
    <>
      {/* ── Structured Data: Local Business (Kishangarh premises) & Service Schemas ── */}
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
              name: data.service.name,
              description: data.metadata.description,
              url: `/${data.slug}`,
              serviceType: data.service.serviceType,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            trailJsonLd(data.breadcrumb.map((b) => ({ name: b.name, path: b.path })))
          ),
        }}
      />

      {/* 1. Full-Height Interactive Hero Slider */}
      <HeroSlider slides={data.heroSlides} />

      {/* 2. Trust Numbers & Factory Metrics */}
      <StatsBand stats={data.trustStats} />

      {/* 3. Marquee Keyword Tagline */}
      <ScrollingTagline items={data.scrollingTagline} />

      {/* 4. Interactive Hover List Reveal (Collections / Varieties) */}
      {data.categories && data.categories.length > 0 && (
        <HoverListReveal categories={data.categories} />
      )}

      {/* 5. Architectural Space Applications Mosaic */}
      {data.mosaicApps && data.mosaicApps.length > 0 && (
        <MosaicGrid
          apps={data.mosaicApps}
          title={data.mosaicHeading?.title}
          titleEm={data.mosaicHeading?.titleEm}
          eyebrow={data.mosaicHeading?.eyebrow}
          description={data.mosaicHeading?.description}
        />
      )}

      {/* 6. 3D Coverflow Carousel of Curated Slabs */}
      {data.products && data.products.length > 0 && (
        <CoverflowCarousel products={data.products} />
      )}

      {/* 7. Numbered Sourcing Reasons & Marquee */}
      {data.whyUs && (
        <NumberedCardGrid
          reasons={data.whyUs.reasons}
          marqueeItems={data.whyUs.marqueeItems}
          title={data.whyUs.title}
          eyebrow={data.whyUs.eyebrow}
          subtitle={data.whyUs.subtitle}
        />
      )}

      {/* 8. Pinned GSAP Horizontal Project Gallery */}
      {data.projects && data.projects.length > 0 && (
        <HorizontalScrollGallery
          projects={data.projects}
          eyebrow={data.projectHeading?.eyebrow}
          title={data.projectHeading?.title}
          desc={data.projectHeading?.desc}
        />
      )}

      {/* 9. Verified Client & Architect Reviews Marquee, Google Reviews & Process */}
      {data.testimonials && data.testimonials.length > 0 && (
        <>
          <MarqueeTestimonials testimonials={data.testimonials} />
          <GoogleReviews />
          <ProcessSteps />
        </>
      )}

      {/* 10. The Minds Behind Excellence — Leadership */}
      <PortraitTeamGrid members={data.teamMembers ?? defaultTeamMembers} />

      {/* 11. Knowledge Hub — Insights & Guides */}
      <ArticleCardGrid posts={data.blogPosts ?? defaultBlogPosts} />

      {/* 12. Rich Domain FAQs with Built-in Google FAQPage Schema */}
      {data.faqs && data.faqs.length > 0 && (
        <FAQAccordion
          items={data.faqs}
          eyebrow={data.faqHeading?.eyebrow}
          title={data.faqHeading?.title}
          titleEm={data.faqHeading?.titleEm}
          description={data.faqHeading?.description}
        />
      )}

      {/* 13. Ready to Begin? Transform Your Space with Premium Stone */}
      <BannerContactForm
        bannerEyebrow={data.bannerCta?.eyebrow ?? 'Ready to Begin?'}
        bannerHeadline={data.bannerCta?.headline ?? 'Transform Your Space with Premium Stone'}
      />
    </>
  );
}
