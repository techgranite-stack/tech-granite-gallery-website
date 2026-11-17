import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import ArticleCardGrid from '@/components/sections/ArticleCardGrid';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import GoogleReviews from '@/components/sections/GoogleReviews';
import ProcessSteps from '@/components/sections/ProcessSteps';
import BannerContactForm from '@/components/sections/BannerContactForm';
import { blogPostsData } from '@/lib/blog-data';
import { marqueeItems } from '@/data/landing';
import { testimonials } from '@/data/testimonials';
import { blogReasons, blogMarquee } from '@/data/whyus';
import { pageSeo } from '@/data/page-seo';
import { buildMetadata } from '@/lib/seo';

const seo = pageSeo['/blogs'];

export const metadata: Metadata = buildMetadata({
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  canonical: '/blogs',
  image: seo.ogImage,
});

export default function BlogsPage() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge Hub"
        title="Insights &"
        titleEm="Guides"
        subtitle="Expert advice on selecting premium Italian marble, comparing stone durability, maintenance guidelines, and dynamic luxury interior design trends in 2025."
        heroImage="/images/collections/showroom/marble-showroom-display-wall-kishangarh.webp"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Blogs' },
        ]}
        align="center"
      />

      <ArticleCardGrid posts={blogPostsData} showAll={true} />

      {/* Marquee band */}
      <ScrollingTagline items={marqueeItems} />

      {/* Why Industry Leaders Read Our Insights — 6 points with same design */}
      <NumberedCardGrid
        reasons={blogReasons}
        marqueeItems={blogMarquee}
        title="Why Architects & Builders Trust Our Insights"
        bg="#C8B89A"
        cardBg="#FFFFFF"
      />

      {/* Client Voices, Google Reviews & Process Journey */}
      <MarqueeTestimonials testimonials={testimonials} />
      <GoogleReviews />
      <ProcessSteps />

      <BannerContactForm />
    </>
  );
}
