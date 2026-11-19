'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from '@/components/ui/Reveal';
import { WhyUsReason } from '@/types';
import { whyUsReasons, whyUsMarquee } from '@/data/whyus';
import styles from './NumberedCardGrid.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NumberedCardGridProps {
  reasons?: WhyUsReason[];
  marqueeItems?: string[];
  showMarquee?: boolean;
  title?: string;
  /** Small label above the title. */
  eyebrow?: string;
  /** Supporting line under the title. */
  subtitle?: string;
  /** Override the section background. Defaults to var(--stone-200). */
  bg?: string;
  /** Override individual card background. Defaults to var(--ivory). */
  cardBg?: string;
}

export default function NumberedCardGrid({
  reasons = whyUsReasons,
  marqueeItems = whyUsMarquee,
  showMarquee = true,
  title,
  eyebrow = 'Unrivaled Expertise',
  subtitle = 'Two decades of setting the gold standard in the global stone industry.',
  bg = 'var(--stone-200, #E5D8C8)',
  cardBg = 'var(--stone-100, #F2EBE0)',
}: NumberedCardGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const numbers = sectionRef.current.querySelectorAll(`.${styles.number}`);
      const titles = sectionRef.current.querySelectorAll(`.${styles.title}`);
      const descs = sectionRef.current.querySelectorAll(`.${styles.desc}`);

      // Ghost number: scale 2.5→1
      gsap.fromTo(
        numbers,
        { scale: 2.5, opacity: 0 },
        {
          scale: 1,
          opacity: 0.14,
          duration: 1.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(`.${styles.grid}`),
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text: title + desc slide up
      gsap.fromTo(
        [...Array.from(titles), ...Array.from(descs)],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(`.${styles.grid}`),
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [reasons] }
  );

  const handleScroll = () => {
    if (!gridRef.current) return;
    const scrollLeft = gridRef.current.scrollLeft;
    // 280px card width + 16px margin = 296px
    const cardWidth = 296;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <section
      className={styles.section}
      id="why-us"
      ref={sectionRef}
      style={{
        background: bg,
        ...(cardBg ? ({ ['--card-bg' as string]: cardBg } as React.CSSProperties) : {}),
      }}
    >
      {/* ── Luminous Quartzite Flowing Mineral Strata Veins (Refined Background) ── */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.outerPattern} aria-hidden="true" />

      <svg
        className={styles.veinTexture}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="luminousVeinGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C08552" stopOpacity="0.35" />
            <stop offset="35%" stopColor="#DDA15E" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#C08552" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C08552" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="luminousVeinGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C08552" stopOpacity="0" />
            <stop offset="30%" stopColor="#DDA15E" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#E5B88F" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C08552" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="centralQuartzDome" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(221, 161, 94, 0.22)" />
            <stop offset="45%" stopColor="rgba(192, 133, 82, 0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="crystalShimmerNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF8F0" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#DDA15E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Central ambient light dome behind title and grid */}
        <ellipse cx="720" cy="380" rx="620" ry="320" fill="url(#centralQuartzDome)" />

        {/* Diagonal flowing primary Calacatta / Quartzite mineral vein */}
        <path
          d="M -80 170 C 190 130, 370 255, 600 205 C 830 155, 980 275, 1200 225 C 1340 195, 1440 115, 1540 85"
          stroke="url(#luminousVeinGrad1)"
          strokeWidth="1.8"
        />
        {/* Soft secondary companion strand */}
        <path
          d="M -50 200 C 220 160, 400 275, 630 228 C 860 182, 1010 300, 1230 250 C 1370 218, 1470 145, 1540 115"
          stroke="url(#luminousVeinGrad1)"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.65"
        />

        {/* Deep lower strata vein flowing across lower tier */}
        <path
          d="M -60 620 C 170 560, 350 690, 600 640 C 850 590, 1040 710, 1270 660 C 1390 630, 1470 575, 1530 535"
          stroke="url(#luminousVeinGrad2)"
          strokeWidth="1.6"
        />
        <path
          d="M -30 650 C 200 590, 380 715, 630 665 C 880 615, 1070 735, 1300 685 C 1420 655, 1490 605, 1540 565"
          stroke="url(#luminousVeinGrad2)"
          strokeWidth="0.9"
          strokeDasharray="6 10"
          opacity="0.55"
        />

        {/* Transverse subtle cross-strata mineral filament */}
        <path
          d="M 280 80 C 440 240, 510 460, 680 620 C 790 720, 880 840, 960 920"
          stroke="url(#luminousVeinGrad1)"
          strokeWidth="0.8"
          opacity="0.28"
        />

        {/* Shimmering Quartz Crystal Nodes */}
        <circle cx="600" cy="205" r="3.2" fill="url(#crystalShimmerNode)" />
        <circle cx="1200" cy="225" r="2.8" fill="url(#crystalShimmerNode)" />
        <circle cx="600" cy="640" r="3.2" fill="url(#crystalShimmerNode)" />
        <circle cx="1270" cy="660" r="2.8" fill="url(#crystalShimmerNode)" />
      </svg>

      <div className={styles.inner}>
        <Reveal animation="fade-up">
          <div className={styles.header}>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className={styles.sectionTitle}>
              {title || (
                <>
                  The Granite Gallery <em>Legacy</em>
                </>
              )}
            </h2>
            <p className={styles.sectionDesc}>{subtitle}</p>
          </div>
        </Reveal>

        {/* Marquee strip — qualities */}
        {showMarquee && marqueeItems.length > 0 && (
          <div className={styles.marqueeWrap}>
            <div className={styles.marqueeTrack}>
              {marqueeItems.map((item, i) => (
                <span key={i} className={styles.marqueeItem}>
                  <span className={styles.marqueeGem}>✦</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Middle Section: Exact Original Monolithic Card Grid ── */}
        <div ref={gridRef} onScroll={handleScroll} className={styles.grid}>
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`${styles.card} ${activeIndex === i ? styles.activeCard : ''}`}
              style={cardBg ? { background: cardBg } : undefined}
            >
              <div className={styles.cardBorder} />
              <div className={styles.number}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.desc}>{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Dot indicator pagination */}
        <div className={styles.dots}>
          {reasons.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${activeIndex === idx ? styles.activeDot : ''}`}
              onClick={() => {
                if (gridRef.current) {
                  gridRef.current.scrollTo({
                    left: idx * 296,
                    behavior: 'smooth',
                  });
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
