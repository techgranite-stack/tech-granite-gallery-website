import React from 'react';
import Image from 'next/image';
import type { StoneProduct } from '@/types/stone';
import { getProductPrice } from '@/data/product-prices';
import { resolveHeroImage, resolveStandImage } from '@/lib/product-detail';
import styles from './StoneAboutSection.module.css';

/* ── 4 Luxury Stone Highlight Icons ─────────────────────── */
const highlightIcons = [
  // 1. Natural quarry / mineral structure (sun)
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="sun">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  // 2. High compressive density & durability (gem)
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="gem">
      <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
      <path d="M2 9h20M12 21 8 9l4-6 4 6-4 12" />
    </svg>
  ),
  // 3. Lustrous surface texturing & vein clarity (sparkle)
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="sparkle">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l3 3M15.4 15.4l3 3M18.4 5.6l-3 3M8.6 15.4l-3 3" />
    </svg>
  ),
  // 4. Direct factory rate & wholesale value (coins)
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" key="coins">
      <ellipse cx="9" cy="7" rx="6" ry="3" />
      <path d="M3 7v5c0 1.66 2.69 3 6 3s6-1.34 6-3V7" />
      <path d="M3 12v5c0 1.66 2.69 3 6 3 1.5 0 2.87-.28 3.9-.74" />
      <ellipse cx="17" cy="14" rx="4" ry="2" />
      <path d="M13 14v3c0 1.1 1.79 2 4 2s4-.9 4-2v-3" />
    </svg>
  ),
];

interface StoneAboutSectionProps {
  product: StoneProduct;
  materialName?: string;
  locationName?: string;
  bg?: string;
}

export default function StoneAboutSection({
  product,
  materialName,
  locationName,
  bg,
}: StoneAboutSectionProps) {
  const categoryLabel =
    materialName
      ? materialName.charAt(0).toUpperCase() + materialName.slice(1)
      : product.category === 'imported-marble'
      ? 'Imported Marble'
      : product.category === 'marble'
      ? 'Indian Marble'
      : product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const price = product.priceRange ?? getProductPrice(product.slug, product.category);
  const priceFormatted = `₹${price.low} – ₹${price.high} / ${price.unit || 'sq ft'}`;

  // Resolve best authentic product image (hero, stand, or thumbnail)
  const resolvedImage =
    resolveStandImage(product.slug, '') ||
    resolveHeroImage(product.slug, '') ||
    product.thumbnail ||
    product.heroImages?.[0] ||
    '/images/hero/granite-gallery-marble-granite-sandstone.webp';

  const paragraphs = (product.description || '').split('\n\n').filter(Boolean);
  const highlights = product.highlights || [];

  return (
    <section
      className={styles.section}
      id="about-stone"
      style={bg ? { background: bg } : undefined}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Left Column: Authentic Product Information & Highlights */}
          <div className={styles.textCol}>
            <span className={`section-eyebrow ${styles.eyebrow}`}>About This Stone</span>
            <h2 className={styles.title}>{product.name}</h2>
            <div className={styles.titleMeta}>
              <span className={styles.subtitle}>
                {categoryLabel} · {product.origin}
              </span>
              {priceFormatted && (
                <span className={styles.pricePill}>
                  {priceFormatted} <span className={styles.pricePillSub}>ex-factory</span>
                </span>
              )}
            </div>
            <div className={styles.copperLine} />

            {paragraphs.map((para, i) => (
              <p key={i} className={styles.para}>
                {para}
              </p>
            ))}

            {highlights.length > 0 && (
              <ul className={styles.highlights}>
                {highlights.map((h, i) => (
                  <li key={i} className={styles.highlight}>
                    <span className={styles.highlightIcon}>
                      {highlightIcons[i % highlightIcons.length]}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Column: High-Resolution Stone Slab Photo */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrap}>
              <Image
                src={resolvedImage}
                alt={`${product.name} ${categoryLabel} Slab`}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 45vw"
                className={styles.image}
              />
              <div className={styles.imageBadge}>
                Authentic Quarry Lot · Calibrated Slabs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
