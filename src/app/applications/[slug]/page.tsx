import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/sections/PageHero';
import RelatedGrid from '@/components/sections/RelatedGrid';
import CoverflowCarousel from '@/components/sections/CoverflowCarousel';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import HorizontalScrollGallery from '@/components/sections/HorizontalScrollGallery';
import FAQAccordion from '@/components/sections/FAQAccordion';
import BannerContactForm from '@/components/sections/BannerContactForm';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import ApplicationGallery from './ApplicationGallery';
import { testimonials } from '@/data/testimonials';
import { applicationsData } from '@/lib/application-data';
import { productsData } from '@/lib/product-data';
import { projectsData } from '@/lib/project-data';

// Sample photo fallbacks (16:9) if an entry in application-data.ts has no sampleImages.
const PLACEHOLDER_SAMPLES = [
  '/images/applications/flooring/flooring-stone-wall-1.webp',
  '/images/applications/wall-cladding/green-tan-marbled-villa-wall.webp',
  '/images/applications/kitchen-countertops/kitchen-stone-wall-1.webp',
  '/images/applications/bathroom/luxury-master-bathroom-sanctuary.webp',
  '/images/applications/staircase/light-brown-mottled-staircase-wall.webp',
  '/images/applications/tabletops/reddish-brown-swirling-tabletop-wall.webp',
];

// Marquee terms for the Pre-Installation Checklist section
const CHECKLIST_MARQUEE = [
  'Substrate Prepared',
  'Correct Adhesive Class',
  'Movement Joints',
  'Sealed & Protected',
  'Precision Fixing',
  'Spec Compliant',
];

// Helper for luxury majestic two-part titles
const getMajesticTitleParts = (slug: string, defaultTitle: string) => {
  switch (slug) {
    case 'flooring':
      return { title: 'Luxury', titleEm: 'Flooring' };
    case 'wall-cladding':
      return { title: 'Artistic', titleEm: 'Cladding' };
    case 'kitchen-countertops':
      return { title: 'Kitchen', titleEm: 'Countertops' };
    case 'bathroom':
      return { title: 'Spa', titleEm: 'Bathrooms' };
    case 'staircase':
      return { title: 'Sculptural', titleEm: 'Staircases' };
    case 'exterior-cladding':
      return { title: 'Architectural', titleEm: 'Facades' };
    case 'tabletops':
      return { title: 'Tabletops &', titleEm: 'Furniture' };
    default:
      const parts = defaultTitle.split(' ');
      if (parts.length > 1) {
        return {
          title: parts.slice(0, -1).join(' '),
          titleEm: parts[parts.length - 1],
        };
      }
      return { title: defaultTitle, titleEm: undefined };
  }
};

// Generate high-intent uppercase dynamic marquee items
const getMarqueeItems = (title: string): string[] => {
  const upperTitle = title.toUpperCase();
  return [
    `${upperTitle} SOLUTIONS`,
    'FACTORY DIRECT SOURCING',
    'PREMIUM QUALITY ASSURED',
    'EXQUISITE CRAFTSMANSHIP',
    'TAILORED CUT-TO-SIZE',
    'KISHANGARH DIRECT',
  ];
};

// Technical badges helper
const getTechnicalBadge = (slug: string): string => {
  switch (slug) {
    case 'flooring':
      return 'Slip Resistance: R10 Rated';
    case 'wall-cladding':
      return 'Anchor Load: Stainless Steel';
    case 'kitchen-countertops':
      return 'Hardness: 7 Mohs Scale';
    case 'bathroom':
      return 'Water Absorption: < 0.2%';
    case 'staircase':
      return 'Slab Thickness: 30mm Cantilever';
    case 'exterior-cladding':
      return 'Installation: Ventilated Facade';
    case 'tabletops':
      return 'Tension Frame: Structural Steel';
    default:
      return 'Standard Specification';
  }
};

// Unknown slugs 404 at the routing layer instead of rendering placeholder content.
export const dynamicParams = false;

export async function generateStaticParams() {
  return applicationsData.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const app = applicationsData.find((a) => a.slug === slug);
  if (!app) return {};
  return {
    title: app.metaTitle,
    description: app.metaDescription,
    keywords: app.keywords,
    openGraph: {
      title: app.metaTitle,
      description: app.metaDescription,
      ...(app.ogImage ?? app.heroImage ? { images: [app.ogImage ?? app.heroImage] } : {}),
    },
    alternates: { canonical: `/applications/${app.slug}` },
  };
}

export default async function ApplicationDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const app = applicationsData.find((a) => a.slug === slug);
  if (!app) notFound();

  // Majestic two-part title components
  const { title, titleEm } = getMajesticTitleParts(app.slug, app.title);

  // Sample photos (16:9) for the on-page gallery — real per-app images fall back to placeholders
  const sampleImages = app.sampleImages && app.sampleImages.length > 0 ? app.sampleImages : PLACEHOLDER_SAMPLES;

  // Other applications (for the "Other Applications" explore-grid at the bottom)
  const otherApps = applicationsData
    .filter((a) => a.slug !== app.slug)
    .map((a) => ({
      href: `/applications/${a.slug}`,
      image: a.heroImage,
      category: 'Application',
      name: a.title,
      sub: a.tagline,
    }));

  // Map database elements to coverflow swiper
  const recommendedStones = productsData.filter((p) =>
    app.suitableStones.includes(p.slug)
  );
  const activeStones = recommendedStones.length > 0 ? recommendedStones : productsData.slice(0, 4);
  const mappedStones = activeStones.map((prod) => ({
    id: prod.slug,
    title: prod.name,
    category: prod.type.toUpperCase(),
    image: prod.heroImage,
    finish: prod.finish,
    origin: prod.origin,
    tag: prod.tag,
    whatsappMsg: prod.whatsappMsg,
  }));

  // Map database elements to pre-installation checklists
  const checklistReasons = app.technicalRequirements.map((req, i) => {
    const colonIdx = req.indexOf(':');
    const title = colonIdx !== -1 ? req.substring(0, colonIdx) : `Requirement ${i + 1}`;
    const desc = colonIdx !== -1 ? req.substring(colonIdx + 1).trim() : req;
    return {
      num: String(i + 1).padStart(2, '0'),
      title,
      desc,
    };
  });

  // Show all landmark projects
  const mappedProjects = projectsData.map((p) => ({
    title: p.title,
    category: p.category.toUpperCase(),
    image: p.heroImage,
    size: p.size,
  }));

  return (
    <>
      <PageHero
        eyebrow="Applications Guide"
        title={title}
        titleEm={titleEm}
        subtitle={app.tagline}
        heroImages={[app.heroImage]}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Applications', href: '/applications' },
          { label: app.title },
        ]}
        badges={[
          { value: app.maintenanceLevel.toUpperCase() + ' MAINTENANCE', label: 'Maintenance Level' },
          { value: getTechnicalBadge(app.slug), label: 'Technical Specification' },
        ]}
      />

      {/* 2. Sample image gallery — how this application looks in real spaces */}
      <ApplicationGallery images={sampleImages} title={app.title} />

      {/* 3. Pre-installation checklist */}
      <NumberedCardGrid
        reasons={checklistReasons}
        eyebrow="Installation Guide"
        title={`${app.title} Pre-Installation Checklist`}
        subtitle={`Six essentials our specialists get right before any ${app.title.toLowerCase()} stone is fixed on site.`}
        marqueeItems={CHECKLIST_MARQUEE}
        bg="var(--stone-200)"
        cardBg="var(--stone-100)"
      />

      {/* Recommended stones (Curated for Excellence — Featured Masterpieces) — commented out for now
      {mappedStones.length > 0 && (
        <CoverflowCarousel products={mappedStones} />
      )}
      */}

      {/* 4. FAQs accordion (default white/ivory background) */}
      {app.faqs && app.faqs.length > 0 && (
        <FAQAccordion
          items={app.faqs}
          title={app.title}
          titleEm="FAQs"
          eyebrow="FAQ"
        />
      )}

      {/* 5. Marquee divider (below FAQs) */}
      <ScrollingTagline items={getMarqueeItems(app.title)} />

      {/* 6. Other Applications — same "Explore More" style as the project detail page */}
      {otherApps.length > 0 && (
        <RelatedGrid
          eyebrow="Explore More"
          title="Other"
          titleEm="Applications"
          items={otherApps}
        />
      )}

      {/* 7. Landmark projects — all projects */}
      {mappedProjects.length > 0 && (
        <HorizontalScrollGallery projects={mappedProjects} />
      )}

      {/* 8. Testimonials — same as the home page */}
      <MarqueeTestimonials testimonials={testimonials} />

      <BannerContactForm />
    </>
  );
}
