import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import RelatedStones from '@/components/sections/RelatedStones';
import BannerContactForm from '@/components/sections/BannerContactForm';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import FAQAccordion from '@/components/sections/FAQAccordion';
import ProductCatalog from '@/components/sections/ProductCatalog';
import ProductLocalBlock from '@/components/sections/ProductLocalBlock';
import {
  getAllGraniteSlugs,
  getProductBySlug,
  getRelatedByColor,
  getRelatedByCategory,
} from '@/data/stone-index';
import {
  fromStoneDetail,
  resolveStandImage,
  resolveHeroImage,
  resolveCatalogImage,
} from '@/lib/product-detail';
import { productJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import { getProductPrice } from '@/data/product-prices';

import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllGraniteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  const heroImage = resolveHeroImage(product.slug, product.heroImages[0] ?? product.thumbnail);
  return buildMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    canonical: `/granite/${product.slug}`,
    image: {
      url: heroImage,
      width: 1800,
      height: 1200,
      alt: `${product.name} Granite Slab — Kishangarh, Rajasthan`,
    },
  });
}

export default function GraniteProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product || product.category !== 'granite') notFound();

  const categoryLabel = 'Granite';

  const byColor = getRelatedByColor(product, 4);
  const byCategory = getRelatedByCategory(product, 4);

  const pricing = product.priceRange ?? getProductPrice(product.slug, 'granite');

  const specBadges = [
    { value: `₹${pricing.low} – ₹${pricing.high} / sq ft`, label: 'Indicative Price' },
    ...(product.specs.hardness ? [{ value: product.specs.hardness, label: 'Hardness' }] : []),
    ...(product.specs.density ? [{ value: product.specs.density, label: 'Density' }] : []),
    ...(product.specs.compressiveStrength ? [{ value: product.specs.compressiveStrength, label: 'Compressive Str.' }] : []),
    { value: `${product.finishes.length}`, label: 'Finishes' },
  ];

  const whatsappUrl = `https://wa.me/919116622422?text=${encodeURIComponent(
    `Hello, I'm interested in ${product.name}. Please share slab details and pricing.`
  )}`;

  const standImage = resolveStandImage(product.slug, product.heroImages[0] ?? product.thumbnail);
  const heroImage = resolveHeroImage(product.slug, product.heroImages[0] ?? product.thumbnail);
  const catalogImage = resolveCatalogImage(product.slug, product.thumbnail);

  // Describes the photograph rather than repeating the stone's name. PageHero
  // previously fell back to `alt={title}`, so the highest-value image on every
  // stone page carried alt="Statuario" — no material, no finish, no origin.
  const heroAlt = [
    `${product.name} ${categoryLabel.toLowerCase()} slab`,
    product.finishes[0] ? `${product.finishes[0].label.toLowerCase()} finish` : null,
    product.origin,
  ]
    .filter(Boolean)
    .join(' — ');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product, [heroImage, standImage, catalogImage])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(product)) }}
      />

      {/* ── Hero ── */}
      <PageHero
        eyebrow={categoryLabel}
        title={product.name}
        heroImages={[heroImage]}
        imageAlt={heroAlt}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Granite', href: '/granite' },
          { label: product.name },
        ]}
        badges={specBadges}
      />

      {/* ── Product Detail ── */}
      <ProductCatalog
        {...fromStoneDetail(product, {
          subtitle: categoryLabel,
          backHref: '/granite',
          backLabel: '← Back to Granite Collection',
          image: standImage,
          whatsappUrl,
        })}
      />

      <ScrollingTagline items={[
        product.name,
        product.origin,
        ...product.finishes.map(f => f.label),
        'Direct from Quarry',
        'Ships Worldwide',
      ]} />

      {/* ── Related Stones (interlinking) ── */}
      <RelatedStones product={product} byColor={byColor} byCategory={byCategory} />

      {/* ── Local supply & dispatch (Kishangarh) ── */}
      <ProductLocalBlock product={product} />

      {/* ── FAQs ── */}
      {product.faqs && product.faqs.length > 0 && (
        <FAQAccordion items={product.faqs} title={product.name} titleEm="FAQs" eyebrow="FAQ" />
      )}

      <BannerContactForm hideBanner />
    </>
  );
}
