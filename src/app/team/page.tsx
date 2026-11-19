import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import PortraitTeamGrid from '@/components/sections/PortraitTeamGrid';
import BannerContactForm from '@/components/sections/BannerContactForm';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import GoogleReviews from '@/components/sections/GoogleReviews';
import ProcessSteps from '@/components/sections/ProcessSteps';
import HeroSlider from '@/components/sections/HeroSlider';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import { whyUsReasons } from '@/data/whyus';
import { testimonials } from '@/data/testimonials';
import { pageSeo } from '@/data/page-seo';
import { buildMetadata } from '@/lib/seo';
import type { HeroSlide, StatItem } from '@/types';

const seo = pageSeo['/team'];

export const metadata: Metadata = buildMetadata({
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  canonical: '/team',
  image: seo.ogImage,
});

// ── Team-page hero slides (people & partnership focused) ──
const teamSlides: HeroSlide[] = [
  {
    image: '/images/hero/granite-gallery-kishangarh-stone-facility.webp',
    title: 'The People Behind Every Slab',
    sub: 'Meet the specialists who source, inspect, and deliver India\'s finest natural stone — from Kishangarh to the world.',
  },
  {
    image: '/images/hero/granite-gallery-natural-stone-export.webp',
    title: 'Relationships Built on Trust',
    sub: 'Decades of partnerships with architects, builders, and quarries across 30+ countries.',
  },
  {
    image: '/images/about/Marble_sculpture_in_marble_quarry.webp',
    title: 'Expertise at Every Step',
    sub: 'From quarry block selection to international logistics, a dedicated specialist guides each project personally.',
  },
];

// ── Custom trust numbers (leadership / team focused) ──
const teamStats: StatItem[] = [
  { number: '4', label: 'Stone Specialists' },
  { number: '25+', label: 'Combined Years of Experience' },
  { number: '50+', label: 'Architect & Builder Partners' },
  { number: '100+', label: 'Projects Delivered' },
  { number: '10+', label: 'Countries Served' },
  { number: '30 min', label: 'Avg. Response Time' },
];

// ── Team-page marquee (the team's values & strengths) ──
const teamMarquee = [
  'Trusted Advisors', 'Decades of Expertise', 'Quarry-to-Doorstep', 'Personal Service',
  'Master Stone Selectors', 'Architect Partners', 'Global Logistics', 'On-Spec Delivery',
];

export default function TeamPage() {
  return (
    <>

      {/* Hero slider */}
      <HeroSlider slides={teamSlides} />

      {/* Custom trust numbers */}
      <StatsBand stats={teamStats} />

      {/* Marquee */}
      <ScrollingTagline items={teamMarquee} />

      {/* Leadership Grid */}
      <PortraitTeamGrid />

      {/* Number cards — Sourcing Standards */}
      <NumberedCardGrid
        eyebrow="Our Working Philosophy"
        title="Why Architects Trust Us"
        subtitle="From initial quarry blocks inspection to international container shipping, our leadership guarantees precision at every step."
        reasons={whyUsReasons}
      />


      {/* Testimonials, Google Reviews & Process */}
      <MarqueeTestimonials testimonials={testimonials} />
      <GoogleReviews />
      <ProcessSteps />

      <BannerContactForm />
    </>
  );
}
