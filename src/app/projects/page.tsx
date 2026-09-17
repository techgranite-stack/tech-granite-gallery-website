import type { Metadata } from 'next';
import HeroSlider from '@/components/sections/HeroSlider';
import StatsBand from '@/components/sections/StatsBand';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import ProjectsFilterList from './ProjectsFilterList';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import BannerContactForm from '@/components/sections/BannerContactForm';
import { projectsData } from '@/lib/project-data';
import { testimonials } from '@/data/testimonials';
import { pageSeo } from '@/data/page-seo';
import type { HeroSlide, StatItem, WhyUsReason } from '@/types';

const seo = pageSeo['/projects'];

export const metadata: Metadata = {
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  openGraph: { title: seo.metaTitle, description: seo.metaDescription, ...(seo.ogImage ? { images: [seo.ogImage] } : {}) },
  alternates: { canonical: '/projects' },
};

const projectSlides: HeroSlide[] = [
  {
    image: '/images/projects/national-war-memorial/National-war-memorial-project.webp',
    eyebrow: 'National War Memorial',
    title: 'A Nation\'s Tribute in Stone',
    sub: 'Cement-free Lakha Red laid across a kilometre-long circular walk at the Amar Jawan Jyoti, New Delhi.',
  },
  {
    image: '/images/projects/lohagarh-resort/Lohagarh-project_1.webp',
    eyebrow: 'Lohagarh Resort',
    title: 'Crafted for the Landscape',
    sub: 'Sandstone, marble and landscape stone — with bespoke artifacts and sculptures — shaping the resort\'s natural character.',
  },
  {
    image: '/images/projects/palace-on-wheels/Palace-on-wheel-project.webp',
    eyebrow: 'Palace on Wheels',
    title: 'Luxury on Rails',
    sub: 'Vietnam White and our exclusive Red Teak dress the royal train — the canvas for its mother-of-pearl inlay and copper engraving.',
  },
];

const projectStats: StatItem[] = [
  { number: '8', label: 'Landmark Projects' },
  { number: '3', label: 'Government Commissions' },
  { number: '3', label: 'Luxury Hotel Installations' },
  { number: '100+', label: 'Projects Completed' },
  { number: '10+', label: 'Countries Shipped' },
];

const projectsMarquee = [
  'Taj Pushkar Resort', 'Parliament of India', 'Jewar Airport',
  'Central Vista', 'Palace on Wheels', 'War Memorial',
  'Chola Sheraton', 'Mandawa Resort', 'Direct from Kishangarh',
];

// Project-specific numbered grid — what makes Granite Gallery the right partner
const projectReasons: WhyUsReason[] = [
  {
    num: '01',
    title: 'On-Site Delivery Management',
    desc: 'We co-ordinate with your site team and deliver stone phased to your programme — minimising on-site storage and keeping your schedule on track.',
  },
  {
    num: '02',
    title: 'Monument & Govt. Grade Quality',
    desc: 'Our stone has been approved for India\'s Parliament, Central Vista, and national memorials — tested to the highest government and BIS specifications.',
  },
  {
    num: '03',
    title: 'Large-Scale Volume Capability',
    desc: 'From 1,000 to 240,000+ sq ft in a single project. We hold dedicated quarry allocations to guarantee uninterrupted supply for large-scale commissions.',
  },
  {
    num: '04',
    title: 'Dedicated Project Manager',
    desc: 'Every project — from five-star hotel to airport terminal — gets a named project manager accountable from specification to final installation.',
  },
  {
    num: '05',
    title: 'Export-Ready Documentation',
    desc: 'Full material certifications, country-of-origin declarations, and customs documentation prepared for international project sites in 30+ countries.',
  },
  {
    num: '06',
    title: 'Post-Installation Support',
    desc: 'We remain available after handover — advising on maintenance, sourcing matching stone for future phases, and supporting warranty queries.',
  },
];

const projectGridMarquee = [
  'Phased Delivery', 'Monument-Grade Stone', '240K+ Sq Ft Capacity',
  'Dedicated Project Manager', 'Export Documentation', 'Post-Installation Support',
];

export default function ProjectsPage() {
  return (
    <>
      {/* 1. Hero Slider */}
      <HeroSlider slides={projectSlides} />

      {/* 2. Trust numbers */}
      <StatsBand stats={projectStats} />

      {/* 3. Marquee */}
      <ScrollingTagline items={projectsMarquee} />

      {/* 4. Projects filter & listing */}
      <ProjectsFilterList projects={projectsData} />

      {/* 5. Why we're the right partner — project-specific */}
      <NumberedCardGrid
        reasons={projectReasons}
        marqueeItems={projectGridMarquee}
        title="Why Leading Projects Choose Us"
        bg="var(--stone-200)"
        cardBg="var(--stone-100)"
      />

      {/* 6. Testimonials */}
      <MarqueeTestimonials testimonials={testimonials} />

      {/* 7. Contact */}
      <BannerContactForm />
    </>
  );
}
