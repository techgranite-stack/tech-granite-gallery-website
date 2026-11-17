import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { pageSeo } from '@/data/page-seo';
import { localBusinessJsonLd } from '@/lib/structured-data';
import HeroSlider from "@/components/sections/HeroSlider";
import StatsBand from "@/components/sections/StatsBand";
import ScrollingTagline from "@/components/sections/ScrollingTagline";
import HoverListReveal from "@/components/sections/HoverListReveal";
import MosaicGrid from "@/components/sections/MosaicGrid";
import NumberedCardGrid from "@/components/sections/NumberedCardGrid";
import GoogleReviews from "@/components/sections/GoogleReviews";
import ProcessSteps from "@/components/sections/ProcessSteps";

// Dynamically import below-the-fold interactive sections to reduce initial mobile JS bundle
const CoverflowCarousel = dynamic(() => import("@/components/sections/CoverflowCarousel"));
const HorizontalScrollGallery = dynamic(() => import("@/components/sections/HorizontalScrollGallery"));
const MarqueeTestimonials = dynamic(() => import("@/components/sections/MarqueeTestimonials"));
const PortraitTeamGrid = dynamic(() => import("@/components/sections/PortraitTeamGrid"));
const ArticleCardGrid = dynamic(() => import("@/components/sections/ArticleCardGrid"));
const BannerContactForm = dynamic(() => import("@/components/sections/BannerContactForm"));

// Import data
import { heroSlides, trustStats, marqueeItems } from "@/data/landing";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { applicationsData } from "@/lib/application-data";
import { projects } from "@/data/projects";
import { teamMembers } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog";
import { whyUsReasons, whyUsMarquee } from "@/data/whyus";

import { buildMetadata } from '@/lib/seo';

const seo = pageSeo['/'];


export const metadata: Metadata = buildMetadata({
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  canonical: '/',
  image: seo.ogImage,
});

// "Stone for Every Space" mosaic — real applications with hand-picked 16:9 photos
// (varied colours so the grid isn't all one tone).
const MOSAIC_IMAGE: Record<string, string> = {
  'flooring': '/images/applications/flooring/flooring-stone-wall.webp',
  'wall-cladding': '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
  'kitchen-countertops': '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
  'bathroom': '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
  'staircase': '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
  'exterior-cladding': '/images/applications/exterior-cladding/beige-textured-stone-external-cladding-wall.webp',
  'tabletops': '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
};
const mosaicApps = applicationsData.map((app) => ({
  title: app.title,
  sub: app.tagline,
  image: MOSAIC_IMAGE[app.slug] ?? app.sampleImages?.[0] ?? app.heroImage,
  href: `/applications/${app.slug}`,
}));

export default function Home() {
  return (
    <>
      {/*
        LocalBusiness — emitted on the homepage, /contact and the Kishangarh
        landing page only. Organization and WebSite come from the root layout on
        every page; this node adds the physical premises, geo pin and areaServed
        that make the business eligible for the local pack. Deliberately not
        site-wide: duplicated LocalBusiness nodes compete with each other.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />

      {/* 1. Hero — full viewport, self-contained background */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Trust Numbers — mahogany band, self-contained */}
      <StatsBand stats={trustStats} />

      {/* 3. Marquee Strip */}
      <ScrollingTagline items={marqueeItems} />

      {/* 4. Categories — ivory, self-contained */}
      <HoverListReveal categories={categories} />

      {/* 5. Applications — mahogany full-width mosaic, self-contained */}
      <MosaicGrid apps={mosaicApps} />

      {/* 6. Featured Products — light stone, self-contained */}
      <CoverflowCarousel products={products} />

      {/* 7. Why Us — ivory, self-contained */}
      <NumberedCardGrid reasons={whyUsReasons} marqueeItems={whyUsMarquee} />

      {/* 8. Projects Gallery — mahogany, full viewport, self-contained */}
      <HorizontalScrollGallery projects={projects} />

      {/* 9a. Testimonials — ivory, self-contained */}
      <MarqueeTestimonials testimonials={testimonials} />

      {/* 9b. Google Reviews — sits directly below "What Our Clients Say" */}
      <GoogleReviews />

      {/* 9c. How we work — selection → visualization → dispatch → installation */}
      <ProcessSteps />

      {/* 10. Team — ivory, self-contained */}
      <PortraitTeamGrid members={teamMembers} />

      {/* 11. Blog — ivory, self-contained */}
      <ArticleCardGrid posts={blogPosts} />

      {/* 12. CTA Contact — white + mahogany banner, self-contained */}
      <BannerContactForm />
    </>
  );
}
