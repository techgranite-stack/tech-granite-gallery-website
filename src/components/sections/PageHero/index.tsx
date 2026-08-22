'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PageHero.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroBadge {
  label: string;
  value: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleEm?: string; // the italic copper word inside title
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  heroImage?: string;
  heroImages?: string[];
  badges?: PageHeroBadge[];
  align?: 'left' | 'center';
  fullHeight?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  titleEm,
  subtitle,
  breadcrumb,
  heroImage,
  heroImages,
  badges,
  align = 'left',
  fullHeight = false,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const [currentBg, setCurrentBg] = useState(0);

  const imagesList = heroImages && heroImages.length > 0 ? heroImages : heroImage ? [heroImage] : [];

  useEffect(() => {
    if (imagesList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % imagesList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [imagesList.length]);

  /* ── Background Slideshow GSAP scale-in + cross-fade (matching Homepage HeroSlider) ── */
  useGSAP(() => {
    if (!ref.current || imagesList.length <= 1) return;

    const bgs = ref.current.querySelectorAll(`.${styles.imgWrap}`);
    const activeBg = bgs[currentBg];

    if (!activeBg) return;

    // Fade out all non-active backgrounds
    gsap.to(
      Array.from(bgs).filter((el) => el !== activeBg),
      { opacity: 0, duration: 1.2, ease: 'power2.inOut', zIndex: -1 }
    );

    // Active bg: scale-in entrance (1.08 -> 1) matching Homepage Hero
    gsap.fromTo(
      activeBg,
      { opacity: 0, scale: 1.08, zIndex: 0 },
      { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }
    );
  }, { scope: ref, dependencies: [currentBg, imagesList.length] });

  useGSAP(() => {
    if (!ref.current) return;
    const tl = gsap.timeline();
    tl.fromTo(ref.current.querySelector(`.${styles.content}`),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
    );
    tl.fromTo(ref.current.querySelectorAll(`.${styles.badge}`),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    );
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className={`${styles.hero} ${align === 'center' ? styles.centered : ''} ${fullHeight ? styles.fullHeight : ''}`}
    >
      {/* Background slideshow images */}
      {imagesList.map((img, i) => (
        <div
          key={i}
          className={styles.imgWrap}
          style={{
            opacity: i === 0 && currentBg === 0 ? 1 : 0,
            zIndex: i === currentBg ? 0 : -1,
          }}
        >
          <Image
            src={img}
            alt={title}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            className={styles.img}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className={styles.overlay} />
      <div className={styles.gradientBottom} />

      {/* Kashmiri-inspired top border accent */}
      <div className={styles.topAccent} />

      <div className={styles.content}>

        {/* Eyebrow */}
        {eyebrow && (
          <span className={`section-eyebrow ${styles.eyebrow}`}>{eyebrow}</span>
        )}

        {/* Title */}
        <h1 className={styles.title}>
          {title}
          {titleEm && <> <em>{titleEm}</em></>}
        </h1>

        {/* Copper divider line */}
        <div className={styles.copperLine} />

        {/* Subtitle */}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {/* Spec Badges */}
        {badges && badges.length > 0 && (
          <div className={styles.badges}>
            {badges.map((b, i) => (
              <div key={i} className={styles.badge}>
                <span className={styles.badgeValue}>{b.value}</span>
                <span className={styles.badgeLabel}>{b.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide controls (dots) for background slideshow */}
      {imagesList.length > 1 && (
        <div className={styles.controls}>
          {imagesList.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentBg ? styles.dotActive : ''}`}
              onClick={() => setCurrentBg(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
