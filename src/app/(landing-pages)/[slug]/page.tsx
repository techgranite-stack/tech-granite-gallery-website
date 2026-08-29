import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { landingPages } from '@/lib/landing-pages-data';
import {
  colorPages,
  getColorPageBySlug,
  getProductsByColor,
} from '@/data/stone-index';
import ColorStonePage from '@/components/templates/ColorStonePage';
import SectionPersonality from '@/components/ui/SectionPersonality';
import HeroSlider from '@/components/sections/HeroSlider';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import HoverListReveal from '@/components/sections/HoverListReveal';
import CoverflowCarousel from '@/components/sections/CoverflowCarousel';
import MosaicGrid from '@/components/sections/MosaicGrid';
import HorizontalScrollGallery from '@/components/sections/HorizontalScrollGallery';
import PortraitTeamGrid from '@/components/sections/PortraitTeamGrid';
import BannerContactForm from '@/components/sections/BannerContactForm';

interface PageProps {
  params: { slug: string };
}

// Pre-generate static paths for both landing pages AND color pages
export function generateStaticParams() {
  const landingSlugs = Object.keys(landingPages).map((slug) => ({ slug }));
  const colorSlugs   = colorPages.map((cp) => ({ slug: cp.slug }));
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
    return {
      title: pageData.metadata.title,
      description: pageData.metadata.description,
      keywords: pageData.metadata.keywords,
      alternates: { canonical: `/${pageData.slug}` },
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

  // ── Marketing landing page ──────────────────────────────────────────────────
  const pageData = landingPages[params.slug];
  if (!pageData) notFound();

  return (
    <>
      {pageData.sections.map((section, index) => {
        const { type, personality, grid, variant } = section;
        return (
          <SectionPersonality
            key={`${type}-${index}`}
            personality={personality}
            grid={grid}
            variant={variant}
            padding={type === 'hero' ? 'none' : 'large'}
          >
            {type === 'hero'         && <HeroSlider />}
            {type === 'why-us'       && <NumberedCardGrid />}
            {type === 'categories'   && <HoverListReveal />}
            {type === 'products'     && <CoverflowCarousel />}
            {type === 'applications' && <MosaicGrid />}
            {type === 'projects'     && <HorizontalScrollGallery />}
            {type === 'team'         && <PortraitTeamGrid />}
            {type === 'contact'      && <BannerContactForm />}
          </SectionPersonality>
        );
      })}
    </>
  );
}
