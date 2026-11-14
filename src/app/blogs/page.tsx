import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import ArticleCardGrid from '@/components/sections/ArticleCardGrid';
import { blogPostsData } from '@/lib/blog-data';
import BannerContactForm from '@/components/sections/BannerContactForm';
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

      <BannerContactForm />
    </>
  );
}
