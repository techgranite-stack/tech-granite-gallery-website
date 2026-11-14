import type { Metadata } from 'next';
import HeroSlider from '@/components/sections/HeroSlider';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import HoverListReveal from '@/components/sections/HoverListReveal';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import BannerContactForm from '@/components/sections/BannerContactForm';
import { applicationsData, mockApplicationFallback } from '@/lib/application-data';
import { testimonials } from '@/data/testimonials';
import { pageSeo } from '@/data/page-seo';
import { buildMetadata } from '@/lib/seo';
import type { HeroSlide, StatItem, WhyUsReason } from '@/types';

const seo = pageSeo['/applications'];

export const metadata: Metadata = buildMetadata({
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  canonical: '/applications',
  image: seo.ogImage,
});

const applicationSlides: HeroSlide[] = [
  {
    image: '/images/applications/flooring/flooring-granite-crystalline-wall.webp',
    title: 'Natural Stone Flooring',
    sub: 'Large-format marble and granite floors, cut to measure and laid to last generations.',
  },
  {
    image: '/images/applications/kitchen-countertops/r-black-kitchen-wall.webp',
    title: 'Kitchens That Last a Lifetime',
    sub: 'Granite and quartzite worktops that resist heat, scratches, and stains — engineered for daily life, crafted to impress.',
  },
  {
    image: '/images/applications/bathroom/bathroom-stone-wall-1.webp',
    title: 'Bathrooms Worth Lingering In',
    sub: 'Bookmatched marble shower walls, onyx vanity tops, and spa-grade flooring — bespoke stone for your most personal space.',
  },
  {
    image: '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
    title: 'Dramatic Wall Cladding',
    sub: 'Bookmatched feature walls and facades that turn natural stone into architecture.',
  },
  {
    image: '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
    title: 'Sculptural Staircases',
    sub: 'Custom-cut marble and granite treads for a grand, enduring statement.',
  },
  {
    image: '/images/applications/tabletops/pink-granite-tabletop-wall.webp',
    title: 'Tabletops & Furniture',
    sub: 'Bespoke stone tables and surfaces, fabricated to order in any format.',
  },
];

const applicationStats: StatItem[] = [
  { number: '7', label: 'Application Areas' },
  { number: '1000+', label: 'Installations Complete' },
  { number: '10+', label: 'Countries Served' },
  { number: '100+', label: 'Stone Varieties' },
  { number: '8+', label: 'Surface Finishes' },
  { number: 'Custom', label: 'Fabrication Available' },
];

const marqueeItems = [
  'Flooring', 'Wall Cladding', 'Kitchen Countertops', 'Bathrooms',
  'Staircases', 'Exterior Cladding', 'Tabletops',
  'Custom Fabrication', 'Direct from Kishangarh',
];

// Application-specific reasons for architects & designers
const architectReasons: WhyUsReason[] = [
  {
    num: '01',
    title: 'Bespoke Cut-to-Size',
    desc: 'Every slab is cut precisely to your drawings. We handle complex geometries, waterjet patterns, and radius work — ready for direct installation.',
  },
  {
    num: '02',
    title: 'Consistent Batch Supply',
    desc: 'We reserve matching stone from the same quarry batch for your entire project — guaranteeing colour and vein consistency across all floors and walls.',
  },
  {
    num: '03',
    title: 'Technical Stone Expertise',
    desc: 'Our team advises on the right stone for each application — from slip-resistance ratings for wet areas to freeze-thaw suitability for facades.',
  },
  {
    num: '04',
    title: 'Showroom Visit Welcome',
    desc: 'Visit our Kishangarh showroom to see full slabs in person. Our stone specialists walk you through the collection and help you shortlist for your project.',
  },
  {
    num: '05',
    title: 'Project Scheduling Support',
    desc: 'We align deliveries with your construction programme. Phased supply, on-site storage coordination, and dedicated project contacts as standard.',
  },
  {
    num: '06',
    title: 'Aftercare & Maintenance Guides',
    desc: 'Every project ships with full stone care documentation. We support your clients post-handover with sealing guidance and cleaning protocols.',
  },
];

const architectMarquee = [
  'Cut-to-Size Precision',
  'Consistent Batch Supply',
  'Slip-Resistance Testing',
  'Facade Grade Stone',
  'Showroom Visit Welcome',
  'Full Technical Support',
  'Project Scheduling',
  'Aftercare Included',
];

export default function ApplicationsPage() {
  const apps = applicationsData.length > 0 ? applicationsData : [mockApplicationFallback];

  // HoverListReveal — each application shows 3 of its own 16:9 sample photos
  const mappedHoverApps = apps.map((app) => {
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

  return (
    <>
      {/* 1. Hero Slider */}
      <HeroSlider slides={applicationSlides} />

      {/* 2. Trust numbers */}
      <StatsBand stats={applicationStats} />

      {/* 3. Marquee */}
      <ScrollingTagline items={marqueeItems} />

      {/* 4. Application hover reveal — 3 sample photos per application */}
      <HoverListReveal categories={mappedHoverApps} />

      {/* 6. Why Architects Choose Us — application-specific */}
      <NumberedCardGrid
        reasons={architectReasons}
        marqueeItems={architectMarquee}
        title="Why Architects & Designers Choose Us"
        bg="var(--stone-200)"
        cardBg="var(--stone-100)"
      />

      {/* 7. Testimonials */}
      <MarqueeTestimonials testimonials={testimonials} />

      {/* 8. Contact */}
      <BannerContactForm />
    </>
  );
}
