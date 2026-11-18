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
  bg,
  cardBg,
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
    <section className={styles.section} id="why-us" ref={sectionRef} style={bg ? { background: bg } : undefined}>
      <div className={styles.inner}>
        <Reveal animation="fade-up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>{eyebrow}</span>
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
