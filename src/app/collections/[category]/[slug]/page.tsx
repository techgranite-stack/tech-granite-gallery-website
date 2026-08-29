import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import BannerContactForm from '@/components/sections/BannerContactForm';
import FAQAccordion from '@/components/sections/FAQAccordion';
import StoneCard from '@/components/ui/StoneCard';
import Reveal from '@/components/ui/Reveal';
import ProductCatalog from '@/components/sections/ProductCatalog';
import { productsData } from '@/lib/product-data';
import { fromCollectionProduct } from '@/lib/listing-item';
import { fromCollectionDetail, resolveCollectionImage } from '@/lib/product-detail';
import { categories } from '@/data/categories';
import relatedStyles from '@/components/sections/RelatedStones/RelatedStones.module.css';

// ── Static Params ──────────────────────────────────────────────
// Unknown category/slug pairs 404 at the routing layer instead of rendering
// the Carrara White placeholder that used to be prebuilt and submitted.
export const dynamicParams = false;

export async function generateStaticParams() {
  return productsData.map((p) => ({
    category: p.type,
    slug: p.slug,
  }));
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ category: string; slug: string }> }
): Promise<Metadata> {
  const { category, slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  if (!product || product.type !== category) return {};
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: `/collections/${product.type}/${product.slug}` },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      images: [{ url: product.heroImage, width: 1800, height: 1200, alt: product.name }],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────
export default async function ProductDetailPage(
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  // Pin the product to its own category: previously any category segment
  // resolved, so one product was reachable at several URLs.
  if (!product || product.type !== category) notFound();
  const cat = categories.find((c) => c.id === category);

  // Related products (same type, different slug)
  const related = productsData
    .filter((p) => p.type === product.type && p.slug !== product.slug)
    .slice(0, 4);

  const specBadges = [
    ...(product.specifications.density ? [{ value: product.specifications.density, label: 'Density' }] : []),
    ...(product.specifications.hardness ? [{ value: product.specifications.hardness, label: 'Hardness' }] : []),
    ...(product.specifications.compressiveStrength ? [{ value: product.specifications.compressiveStrength, label: 'Compressive Str.' }] : []),
    { value: product.finish, label: 'Default Finish' },
  ];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.heroImage,
    brand: { '@type': 'Organization', name: 'Granite Gallery' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Granite Gallery', address: 'Kishangarh, Rajasthan, India' },
    },
  };

  const whatsappUrl = `https://wa.me/919116622422?text=${encodeURIComponent(
    product.whatsappMsg ?? `Hello, I'm interested in ${product.name}. Please share details and pricing.`
  )}`;

  const standImage = resolveCollectionImage(product.type, product.slug, 'stand', product.heroImage);
  const heroImg = resolveCollectionImage(product.type, product.slug, 'hero', product.heroImage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* Hero */}
        <PageHero
          eyebrow={cat?.title ?? product.type}
          title={product.name}
          subtitle={product.description}
          heroImage={heroImg}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Collections', href: '/collections' },
            { label: cat?.title ?? category, href: `/collections/${category}` },
            { label: product.name },
          ]}
          badges={specBadges}
        />

        {/* Product Detail */}
        <ProductCatalog
          {...fromCollectionDetail(product, {
            backHref: '/collections',
            backLabel: '← Back to Collections',
            image: standImage,
            whatsappUrl,
          })}
        />

        {/* ── Related Products (StoneCard grid) ── */}
        {related.length > 0 && (
          <section className={relatedStyles.section}>
            <div className={relatedStyles.inner}>
              <div className={relatedStyles.group}>
                <Reveal animation="fade-up">
                  <div className={relatedStyles.groupHeader}>
                    <div>
                      <span className={relatedStyles.eyebrow}>Same Category</span>
                      <h2 className={relatedStyles.heading}>
                        More <em>{cat?.title ?? product.type.charAt(0).toUpperCase() + product.type.slice(1)}</em>
                      </h2>
                    </div>
                    <Link
                      href={`/collections/${category}`}
                      className={relatedStyles.viewAll}
                    >
                      Browse all →
                    </Link>
                  </div>
                </Reveal>
                <div className={relatedStyles.grid}>
                  {related.map((p, i) => (
                    <Reveal key={p.slug} animation="fade-up" delay={i * 0.08}>
                      <StoneCard
                        product={fromCollectionProduct(p, cat?.title ?? product.type)}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {product.faqs && product.faqs.length > 0 && (
          <FAQAccordion
            items={product.faqs}
            title={product.name}
            titleEm="FAQs"
            eyebrow="FAQ"
          />
        )}

        <BannerContactForm />
      </main>
    </>
  );
}
