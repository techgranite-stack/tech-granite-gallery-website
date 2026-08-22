'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { StoneProduct } from '@/types/stone';
import { categoryPath } from '@/types/stone';
import styles from './ProductHero.module.css';

interface ProductHeroProps {
  product: StoneProduct;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const phoneRaw = '9116622422';
  const waMsg = encodeURIComponent(`Hi, I'm interested in ${product.name}. Please share details and pricing.`);
  const catPath = categoryPath(product.category);

  useEffect(() => {
    if (product.heroImages.length <= 1) return;
    const t = setInterval(() => setCurrentImg((p) => (p + 1) % product.heroImages.length), 5000);
    return () => clearInterval(t);
  }, [product.heroImages.length]);

  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelector(`.${styles.content}`),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );
    gsap.fromTo(
      heroRef.current.querySelectorAll(`.${styles.badge}`),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.8, ease: 'power3.out', delay: 0.5 }
    );
  }, { scope: heroRef });

  const specBadges = [
    product.specs.hardness && { label: 'Hardness', value: product.specs.hardness },
    product.specs.density && { label: 'Density', value: product.specs.density },
    product.specs.waterAbsorption && { label: 'Water Absorption', value: product.specs.waterAbsorption },
    { label: 'Finishes', value: `${product.finishes.length} options` },
    { label: 'Origin', value: product.origin.split(',')[0] },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Rotating background images */}
      {product.heroImages.map((img, i) => (
        <div
          key={i}
          className={styles.imgWrap}
          style={{ opacity: i === currentImg ? 1 : 0, transition: 'opacity 1.8s ease-in-out' }}
        >
          <Image src={img} alt={product.name} fill priority={i === 0} sizes="100vw" quality={90} className={styles.img} />
        </div>
      ))}

      <div className={styles.overlay} />
      <div className={styles.gradientBottom} />

      <div className={styles.content}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.crumb}>Home</Link>
          <span className={styles.crumbSep}>›</span>
          <Link href={`/${catPath}`} className={styles.crumb} style={{ textTransform: 'capitalize' }}>{catPath}</Link>
          <span className={styles.crumbSep}>›</span>
          <span className={styles.crumbCurrent}>{product.name}</span>
        </nav>

        {/* Category + tag */}
        <div className={styles.topRow}>
          <span className={styles.categoryTag}>
            {product.category === 'imported-marble' ? 'Imported Marble'
              : product.category === 'marble' ? 'Indian Marble'
                : 'Granite'}
          </span>
          {product.tag && <span className={styles.tagBadge}>{product.tag}</span>}
        </div>

        {/* Name */}
        <h1 className={styles.name}>
          {product.name}
          {product.altNames && product.altNames.length > 0 && (
            <span className={styles.altName}> / {product.altNames[0]}</span>
          )}
        </h1>

        <div className={styles.copperLine} />

        <p className={styles.tagline}>{product.tagline}</p>

        {/* Spec badges */}
        <div className={styles.badges}>
          {specBadges.map((b) => (
            <div key={b.label} className={styles.badge}>
              <span className={styles.badgeValue}>{b.value}</span>
              <span className={styles.badgeLabel}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className={styles.ctas}>
          <a
            data-wa-source="product_hero_enquire"
            href={`https://wa.me/${phoneRaw}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cta} ${styles.ctaPrimary}`}
          >
            Request Sample
          </a>
          <a href="#contact" className={`${styles.cta} ${styles.ctaOutline}`}>
            Get Quote
          </a>
          <a
            data-wa-source="product_hero_spec_sheet"
            href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent(`Hi, please send the spec sheet for ${product.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cta} ${styles.ctaGhost}`}
          >
            Spec Sheet
          </a>
        </div>
      </div>

      {/* Image dots */}
      {product.heroImages.length > 1 && (
        <div className={styles.dots}>
          {product.heroImages.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentImg ? styles.dotActive : ''}`}
              onClick={() => setCurrentImg(i)}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
