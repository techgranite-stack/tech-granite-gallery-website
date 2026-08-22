'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './CinematicFocalSlider.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

// ── Public types ──────────────────────────────────────────────────────────────
export interface CinematicItem {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  category?: string;
  badge?: string;
  image: string;
  tags?: string[];
  href: string;
}

interface CinematicFocalSliderProps {
  items: CinematicItem[];
  autoInterval?: number;
  eyebrow?: string;
  heading?: React.ReactNode;
  ctaLabel?: string;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function CinematicFocalSlider({
  items,
  autoInterval = 3000,
  eyebrow,
  heading,
  ctaLabel = 'View Details →',
}: CinematicFocalSliderProps) {
  const [idx, setIdx]         = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null); // set only while transitioning

  const sectionRef   = useRef<HTMLElement>(null);
  const leftFrontRef = useRef<HTMLDivElement>(null);
  const rightFrontRef= useRef<HTMLDivElement>(null);
  const leftBackRef  = useRef<HTMLDivElement>(null);
  const rightBackRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef       = useRef(idx);
  idxRef.current = idx;

  const total = items.length;

  // ── Advance: capture the outgoing index, then move to the new one ─────────────
  const advance = useCallback((n: number) => {
    const cur  = idxRef.current;
    const norm = ((n % total) + total) % total;
    if (norm === cur) return;
    setPrevIdx(cur);
    setIdx(norm);
  }, [total]);

  // ── Auto-advance ──────────────────────────────────────────────────────────────
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(idxRef.current + 1), autoInterval);
  }, [advance, autoInterval]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  // ── Crossfade: new content (front) fades + settles in while old (back) fades ──
  useEffect(() => {
    if (prevIdx === null) return;

    const lf = leftFrontRef.current,  rf = rightFrontRef.current;
    const lb = leftBackRef.current,   rb = rightBackRef.current;

    const reduce = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({ onComplete: () => setPrevIdx(null) });

    if (reduce) {
      // Plain crossfade — no zoom/motion
      if (lf) tl.fromTo(lf, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 0);
      if (rf) tl.fromTo(rf, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 0);
      if (lb) tl.to(lb, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 0);
      if (rb) tl.to(rb, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 0);
      return () => { tl.kill(); };
    }

    // Both panels identical: incoming dissolves up from a soft zoom, outgoing dissolves out.
    // Longer duration + linear opacity = an even, clearly-visible crossfade.
    if (lf) tl.fromTo(lf, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.25, ease: 'none' }, 0);
    if (rf) tl.fromTo(rf, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.25, ease: 'none' }, 0);
    if (lb) tl.to(lb, { opacity: 0, scale: 1.03, duration: 1.25, ease: 'none' }, 0);
    if (rb) tl.to(rb, { opacity: 0, scale: 1.03, duration: 1.25, ease: 'none' }, 0);

    return () => { tl.kill(); };
  }, [idx, prevIdx]);

  // ── Reset when items change (filter) ─────────────────────────────────────────
  useEffect(() => {
    setPrevIdx(null);
    setIdx(0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, [items]);

  // ── Section entrance ──────────────────────────────────────────────────────────
  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelector(`.${styles.layout}`),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
    );
  }, { scope: sectionRef });

  if (total === 0) return null;

  const left  = items[idx];
  const right = items[(idx + 1) % total];
  const transitioning = prevIdx !== null;
  const prevLeft  = transitioning ? items[prevIdx]                       : null;
  const prevRight = transitioning ? items[(prevIdx + 1) % total]         : null;

  // ── Card renderers (shared by front + back buffer layers) ─────────────────────
  const renderLeftCard = (item: CinematicItem, interactive: boolean) => (
    <Link
      href={item.href}
      className={`${styles.card} ${styles.cardLeft}`}
      tabIndex={interactive ? undefined : -1}
      aria-hidden={!interactive}
    >
      <div className={styles.imgWrap}>
        <Image src={item.image} alt={item.title} fill
          sizes="(max-width: 860px) 100vw, 50vw" className={styles.img} priority={interactive} />
      </div>
      <div className={styles.overlay} />

      {item.category && <span className={styles.catBadge}>{item.category}</span>}
      {item.badge    && <span className={styles.sizeBadge}>{item.badge}</span>}

      {interactive && (
        <div className={styles.progressBar}>
          <div className={styles.progressFill}
            style={{ animationDuration: `${autoInterval}ms` }}
            key={`${idx}-p`} />
        </div>
      )}

      <div className={styles.cardContent}>
        {item.location && <span className={styles.location}>{item.location}</span>}
        <h3 className={styles.leftTitle}>{item.title}</h3>
        {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tags}>
            {item.tags.slice(0, 3).map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
            {item.tags.length > 3 && (
              <span className={styles.tagMore}>+{item.tags.length - 3}</span>
            )}
          </div>
        )}
        <span className={styles.cta}>{ctaLabel}</span>
      </div>
    </Link>
  );

  const renderRightCard = (item: CinematicItem, interactive: boolean) => (
    <button
      type="button"
      className={`${styles.card} ${styles.cardRight}`}
      onClick={interactive ? () => { resetTimer(); advance(idxRef.current + 1); } : undefined}
      tabIndex={interactive ? undefined : -1}
      aria-hidden={!interactive}
      aria-label={`Feature ${item.title}`}
    >
      <div className={styles.imgWrap}>
        <Image src={item.image} alt={item.title} fill
          sizes="(max-width: 860px) 100vw, 50vw" className={styles.img} />
      </div>
      <div className={styles.overlayRight} />

      {item.category && <span className={styles.catBadge}>{item.category}</span>}

      <div className={styles.cardContent}>
        {item.location && <span className={styles.location}>{item.location}</span>}
        <h3 className={styles.rightTitle}>{item.title}</h3>
        <span className={styles.nextHint}>Click to view →</span>
      </div>
    </button>
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {(eyebrow || heading) && (
          <div className={styles.header}>
            {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
            {heading && <h2 className={styles.heading}>{heading}</h2>}
          </div>
        )}

        {/* ── Two equal panels, each a two-layer crossfade buffer ── */}
        <div className={styles.layout}>

          {/* LEFT — active / featured */}
          <div className={styles.panelWrap}>
            {prevLeft && (
              <div ref={leftBackRef} className={`${styles.layer} ${styles.layerBack}`}>
                {renderLeftCard(prevLeft, false)}
              </div>
            )}
            <div ref={leftFrontRef} className={styles.layer}
              style={transitioning ? { opacity: 0 } : undefined}>
              {renderLeftCard(left, true)}
            </div>
          </div>

          {/* RIGHT — preview / next */}
          <div className={styles.panelWrap}>
            {prevRight && (
              <div ref={rightBackRef} className={`${styles.layer} ${styles.layerBack}`}>
                {renderRightCard(prevRight, false)}
              </div>
            )}
            <div ref={rightFrontRef} className={styles.layer}
              style={transitioning ? { opacity: 0 } : undefined}>
              {renderRightCard(right, true)}
            </div>
          </div>

        </div>

        {/* ── Navigation ── */}
        <div className={styles.nav}>
          <div className={styles.counter}>
            <span className={styles.counterCurrent}>{String(idx + 1).padStart(2, '0')}</span>
            <span className={styles.counterSep}>/</span>
            <span className={styles.counterTotal}>{String(total).padStart(2, '0')}</span>
          </div>

          <div className={styles.dots}>
            {items.map((_, i) => (
              <button key={i}
                className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
                onClick={() => { resetTimer(); advance(i); }}
                aria-label={`Go to ${i + 1}`}
              />
            ))}
          </div>

          <div className={styles.arrows}>
            <button className={styles.arrow} onClick={() => { resetTimer(); advance(idxRef.current - 1); }} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className={styles.arrow} onClick={() => { resetTimer(); advance(idxRef.current + 1); }} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
