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
  /** Override the section background. Defaults to var(--ivory). */
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

  useGSAP(() => {
    if (!sectionRef.current) return;

    const numbers = sectionRef.current.querySelectorAll(`.${styles.number}`);
    const titles = sectionRef.current.querySelectorAll(`.${styles.title}`);
    const descs = sectionRef.current.querySelectorAll(`.${styles.desc}`);
    const cards = gsap.utils.toArray(sectionRef.current.querySelectorAll(`.${styles.card}`));

    // Ghost number: scale 2.5→1
    gsap.fromTo(numbers,
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
    gsap.fromTo([...Array.from(titles), ...Array.from(descs)],
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

  }, { scope: sectionRef, dependencies: [reasons] });

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
      {/* Outer section architectural pattern & ambient lighting */}
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
        {/* Subtle architectural stone medallion in mid portion */}
        <g opacity="0.32" transform="translate(720, 210)">
          <circle r="150" stroke="rgba(192, 133, 82, 0.28)" strokeWidth="1" strokeDasharray="4 6" fill="none" />
          <circle r="100" stroke="rgba(192, 133, 82, 0.20)" strokeWidth="0.8" fill="none" />
          <circle r="45" stroke="rgba(192, 133, 82, 0.24)" strokeWidth="0.8" fill="none" />
          <line x1="-180" y1="0" x2="180" y2="0" stroke="rgba(192, 133, 82, 0.24)" strokeWidth="0.8" strokeDasharray="4 8" />
          <line x1="0" y1="-180" x2="0" y2="180" stroke="rgba(192, 133, 82, 0.24)" strokeWidth="0.8" strokeDasharray="4 8" />
        </g>

        {/* Architectural stone side medallions matching site-wide style */}
        <g opacity="0.25" transform="translate(80, 280)">
          <path d="M50,150 C10,130 5,80 25,45 C35,28 45,15 50,0 C55,15 65,28 75,45 C95,80 90,130 50,150 Z" fill="none" stroke="rgba(192, 133, 82, 0.65)" strokeWidth="1.5" />
          <path d="M50,135 C20,118 15,78 30,50 C38,36 46,24 50,12 C54,24 62,36 70,50 C85,78 80,118 50,135 Z" fill="none" stroke="rgba(192, 133, 82, 0.45)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="50" cy="80" r="8" fill="none" stroke="rgba(192, 133, 82, 0.55)" strokeWidth="1" />
        </g>
        <g opacity="0.25" transform="translate(1310, 280)">
          <path d="M50,150 C10,130 5,80 25,45 C35,28 45,15 50,0 C55,15 65,28 75,45 C95,80 90,130 50,150 Z" fill="none" stroke="rgba(192, 133, 82, 0.65)" strokeWidth="1.5" />
          <path d="M50,135 C20,118 15,78 30,50 C38,36 46,24 50,12 C54,24 62,36 70,50 C85,78 80,118 50,135 Z" fill="none" stroke="rgba(192, 133, 82, 0.45)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="50" cy="80" r="8" fill="none" stroke="rgba(192, 133, 82, 0.55)" strokeWidth="1" />
        </g>

        {/* Natural stone strata fissures */}
        <path
          d="M-40 180 C 260 240, 520 120, 800 280 C 1080 440, 1320 320, 1480 420"
          stroke="rgba(192, 133, 82, 0.20)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <path
          d="M-20 620 C 320 540, 680 720, 1020 580 C 1240 490, 1380 620, 1480 680"
          stroke="rgba(192, 133, 82, 0.16)"
          strokeWidth="1.2"
        />
      </svg>

      <div className={styles.inner}>
        <Reveal animation="fade-up">
          <div className={styles.header}>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className={styles.sectionTitle}>{title || <>The Granite Gallery <em>Legacy</em></>}</h2>
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
                    behavior: 'smooth'
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
