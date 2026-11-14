import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// Section components
import HeroSlider from '@/components/sections/HeroSlider';
import StatsBand from '@/components/sections/StatsBand';
import NumberedCardGrid from '@/components/sections/NumberedCardGrid';
import ScrollingTagline from '@/components/sections/ScrollingTagline';
import MarqueeTestimonials from '@/components/sections/MarqueeTestimonials';
import BannerContactForm from '@/components/sections/BannerContactForm';

// Data
import { marqueeItems } from '@/data/landing';
import { categories } from '@/data/categories';
import { productsData } from '@/lib/product-data';
import { colorPages } from '@/data/stone-index';
import { testimonials } from '@/data/testimonials';
import { whyUsReasons, whyUsMarquee } from '@/data/whyus';
import { pageSeo } from '@/data/page-seo';
import type { HeroSlide, StatItem } from '@/types';

// ── Collections-specific stats (override homepage defaults) ───────────────────
const collectionStats: StatItem[] = [
  { number: String(categories.length), label: 'Stone Categories' },
  { number: '100+', label: 'Varieties in Stock' },
  { number: '5+', label: 'Stone Categories' },
  { number: '50+', label: 'Imported Stones' },
  { number: '15+', label: 'Exclusive Stones' },
  { number: '10+', label: 'Countries Shipped' },
];

import styles from './collections.module.css';

import { buildMetadata } from '@/lib/seo';

// ── SEO ───────────────────────────────────────────────────────────────────────
const seo = pageSeo['/collections'];

export const metadata: Metadata = buildMetadata({
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  canonical: '/collections',
  image: seo.ogImage,
});

// ── Collection-specific hero slides ──────────────────────────────────────────
const collectionSlides: HeroSlide[] = [
  {
    image: '/images/collections/showroom/marble-showroom-display-wall-kishangarh.webp',
    title: 'Exquisite Indian & Imported Marble',
    sub: 'Explore 500+ natural stone varieties — Makrana White, Statuario, Botticino & exotic marbles.',
  },
  {
    image: '/images/collections/showroom/granite-showroom-display-wall-kishangarh.webp',
    title: 'Ultra-Durable Natural Granite Slabs',
    sub: 'Black Galaxy, Tan Brown, Blue Pearl & Steel Grey — mirror polished & flamed finishes.',
  },
  {
    image: '/images/collections/showroom/quartzite-showroom-display-wall-kishangarh.webp',
    title: 'Rare & Luminous Quartzite Collections',
    sub: 'Kandla Lining, Roma Grey & Sea Shell — harder than marble, naturally magnificent.',
  },
  {
    image: '/images/collections/showroom/limestone-showroom-display-wall-kishangarh.webp',
    title: 'Heritage Limestone & Paving Stones',
    sub: 'Jaisalmer Yellow, Ita Gold & Kadappa Black — timeless architectural surfaces.',
  },
  {
    image: '/images/collections/showroom/sandstone-showroom-display-wall-kishangarh.webp',
    title: 'Authentic Rajasthan Sandstone',
    sub: 'Gwalior Mint, Raj Green, Ebony Green & Lehariya — export quality paving and wall cladding.',
  },
  {
    image: '/images/collections/showroom/slate-showroom-display-wall-kishangarh.webp',
    title: 'Natural Slate & Architectural Sheets',
    sub: 'Himachal Slate, Monsoon, Silver Grey & Marine Soapstone — non-slip, fireproof elegance.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────

// Live per-category variety count. Grows automatically as products are added to
// `productsData`; falls back to the curated `count` (used by marble/granite, which
// are sourced from the separate StoneProduct system) so it never under-reports.
const liveCount = (id: string) => productsData.filter((p) => p.type === id).length;
const varietyCount = (c: { id: string; count?: number }) =>
  Math.max(liveCount(c.id), c.count ?? 0);

export default function CollectionsPage() {
  const totalVarieties = categories.reduce((sum, c) => sum + varietyCount(c), 0);

  return (
    <>

      {/* 1. Hero Slider */}
      <HeroSlider slides={collectionSlides} />

      {/* 2. Stats Band */}
      <StatsBand stats={collectionStats} />

      {/* 3. Scrolling tagline strip */}
      <ScrollingTagline items={marqueeItems} />

      {/* 4. All Collections Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className="section-eyebrow">Browse by Stone Type</span>
            <h2 className="section-title">All <em>Collections</em></h2>
            <p className="section-desc centered">
              {totalVarieties}+ varieties across {categories.length} stone types.
              Select a category to explore slabs, tiles, and custom formats.
            </p>
          </div>

          <div className={styles.grid}>
            {categories.map((cat) => {
              const href = cat.href ?? `/collections/${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={styles.card}
                >
                  <div className={styles.imgWrap}>
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.overlay} />
                  {cat.tag && <span className={styles.tag}>{cat.tag}</span>}
                  {varietyCount(cat) > 0 && <span className={styles.count}>{varietyCount(cat)}+ varieties</span>}
                  <div className={styles.content}>
                    <div className={styles.contentLine} />
                    <h3 className={styles.cardTitle}>{cat.title}</h3>
                    <p className={styles.cardDesc}>{cat.desc}</p>
                    <span className={styles.cta}>Explore →</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Browse Stone by Color */}
          <div className={styles.colorBrowseWrap}>
            <div className={styles.colorBrowseHeader}>
              <h3 className={styles.colorBrowseTitle}>Browse Natural Stones by Color</h3>
              <p className={styles.colorBrowseSub}>Curated palettes for architectural interiors & facades</p>
            </div>
            <div className={styles.colorPillsList}>
              {colorPages.map((cp) => (
                <Link key={cp.slug} href={`/${cp.slug}`} className={styles.colorPillItem}>
                  <span className={styles.swatchDot} />
                  <span>{cp.title.replace(/ Collection$/, '')}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us — after collections, before testimonials */}
      <NumberedCardGrid
        reasons={whyUsReasons}
        marqueeItems={whyUsMarquee}
        title="Why Architects & Builders Choose Us"
        bg="#C8B89A"
        cardBg="#FFFFFF"
      />

      {/* 6. Testimonials */}
      <MarqueeTestimonials testimonials={testimonials} />
      {/* 7. CTA Banner + Contact Form */}
      <BannerContactForm />

    </>
  );
}
