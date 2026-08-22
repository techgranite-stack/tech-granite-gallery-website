'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from '@/components/ui/Reveal';
import { ProductItem } from '@/types';
import { products as defaultProducts } from '@/data/products';
import styles from './CoverflowCarousel.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Extend ProductItem to match local styling requirements
interface ExtendedProductItem extends ProductItem {
  finish: string;
  origin: string;
  tag?: string;
}

interface CoverflowCarouselSectionProps {
  products?: ExtendedProductItem[];
}

export default function CoverflowCarouselSection({ products = defaultProducts }: CoverflowCarouselSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const continuousIdx = useRef(0);
  const prevOffsets = useRef<number[]>([]);
  const dragRef = useRef({ isDown: false, hasDragged: false, startX: 0, startY: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── Circular Coverflow Transforms ── */
  const applyTransforms = useCallback((normalizedTarget: number, animate = true) => {
    const total = products.length;
    if (total === 0) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const spacing = isMobile ? 175 : 328;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      // Calculate shortest distance in a circular array
      let offset = i - normalizedTarget;
      if (offset > total / 2) offset -= total;
      else if (offset < -total / 2) offset += total;

      const absOffset = Math.abs(offset);
      const rotationAngle = isMobile ? -35 : -42;

      const props = {
        x: offset * spacing,
        rotateY: offset * rotationAngle,
        scale: absOffset === 0 ? 1 : absOffset === 1 ? (isMobile ? 0.8 : 0.78) : 0.62,
        opacity: absOffset === 0 ? 1 : absOffset === 1 ? 0.55 : 0,
        zIndex: 20 - absOffset,
        pointerEvents: absOffset === 0 ? 'auto' : 'none',
        transformPerspective: isMobile ? 1200 : 1400,
        transformOrigin: 'center center',
      };

      const prevOffset = prevOffsets.current[i];
      // Prevent visible sweeping across screen when card loops from one end to the other
      const isJumping = prevOffset !== undefined && Math.abs(offset - prevOffset) > 1.5;

      if (animate && !isJumping) {
        gsap.to(card, { ...props, duration: 0.72, ease: 'power3.out', overwrite: 'auto' });
      } else {
        gsap.set(card, props);
      }
      prevOffsets.current[i] = offset;
    });
  }, [products.length]);

  const goTo = useCallback((nextContinuousIdx: number) => {
    continuousIdx.current = nextContinuousIdx;
    const normalized = ((nextContinuousIdx % products.length) + products.length) % products.length;
    setActiveIdx(normalized);
    applyTransforms(normalized, true);
  }, [applyTransforms, products.length]);

  /* ── Reset & start 3-second autoplay timer ── */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo(continuousIdx.current + 1);
    }, 3000);
  }, [goTo]);

  /* Wrapped goTo that also resets timer on manual interaction */
  const manualGoTo = useCallback((idx: number) => {
    goTo(idx);
    resetTimer();
  }, [goTo, resetTimer]);

  // Click dot -> navigate via shortest circular path
  const onDotClick = (i: number) => {
    const total = products.length;
    const currentNormalized = ((continuousIdx.current % total) + total) % total;
    let diff = i - currentNormalized;
    if (diff > total / 2) diff -= total;
    else if (diff < -total / 2) diff += total;
    manualGoTo(continuousIdx.current + diff);
  };

  /* Initialize transforms + start autoplay — runs ONCE on mount only */
  useEffect(() => {
    applyTransforms(0, false);
    resetTimer(); // kick off 3-second autoplay
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Resize handler — reads continuousIdx ref so it's always current */
  useEffect(() => {
    const handleResize = () => {
      const total = products.length;
      const normalized = ((continuousIdx.current % total) + total) % total;
      applyTransforms(normalized, false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyTransforms, products.length]);

  /* Keyboard navigation — resets timer */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') manualGoTo(continuousIdx.current - 1);
      if (e.key === 'ArrowRight') manualGoTo(continuousIdx.current + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [manualGoTo]);

  /* ── Touch / Drag Handlers ── */
  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY || 0;
    dragRef.current.isDown = true;
    dragRef.current.hasDragged = false;
    dragRef.current.startX = clientX;
    dragRef.current.startY = clientY;
  };

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragRef.current.isDown) return;
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY || 0;

    const deltaX = clientX - dragRef.current.startX;
    const deltaY = clientY - dragRef.current.startY;

    // Ignore swipe if the user is scrolling vertically
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      dragRef.current.isDown = false;
      return;
    }

    if (Math.abs(deltaX) > 10) {
      dragRef.current.hasDragged = true;
    }

    if (deltaX > 40) {
      manualGoTo(continuousIdx.current - 1);
      dragRef.current.isDown = false;
    } else if (deltaX < -40) {
      manualGoTo(continuousIdx.current + 1);
      dragRef.current.isDown = false;
    }
  };

  const onPointerUp = () => {
    dragRef.current.isDown = false;
  };

  // Click card -> navigate if not dragging
  const onCardClick = (i: number) => {
    if (dragRef.current.hasDragged) return;

    const total = products.length;
    let diff = i - activeIdx;
    if (diff > total / 2) diff -= total;
    else if (diff < -total / 2) diff += total;

    if (diff !== 0) {
      goTo(continuousIdx.current + diff);
    }
  };

  /* Section entrance */
  useGSAP(() => {
    if (!sectionRef.current) return;
    const heading = sectionRef.current.querySelector(`.${styles.header}`);
    const nav = sectionRef.current.querySelector(`.${styles.nav}`);
    const stage = sectionRef.current.querySelector(`.${styles.stage}`);

    gsap.fromTo(heading,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo(stage,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1, duration: 1.2, delay: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo(nav,
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' }
      }
    );
  }, { scope: sectionRef, dependencies: [products] });

  return (
    <section className={styles.section} id="products" ref={sectionRef}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <span className="section-eyebrow">Curated for Excellence</span>
          <h2 className="section-title">Featured <em>Masterpieces</em></h2>
        </div>

        {/* Coverflow stage */}
        <div
          className={styles.stage}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          <div className={styles.track}>
            {products.map((prod, i) => (
              <div
                key={prod.id}
                ref={el => { cardRefs.current[i] = el; }}
                className={`${styles.card} ${i === activeIdx ? styles.cardActive : ''}`}
                onClick={() => onCardClick(i)}
                onPointerUpCapture={(e) => { if (dragRef.current.hasDragged) e.preventDefault(); }}
              >
                <div className={styles.imgWrap}>
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    sizes="(max-width: 768px) 300px, 420px"
                    className={styles.img}
                    priority={i === 0}
                    draggable={false}
                  />
                  <div className={styles.imgOverlay} />
                </div>

                {prod.tag && <span className={styles.tag}>{prod.tag}</span>}

                <div className={styles.cardContent}>
                  <div className={styles.cardLine} />
                  <h3 className={styles.cardName}>{prod.title}</h3>
                  <div className={styles.cardSpecs}>
                    <span>{prod.finish}</span>
                    <span className={styles.dot} />
                    <span>{prod.origin}</span>
                  </div>
                  <a
                    data-wa-source="coverflow_carousel"
                    href={prod.whatsappMsg ? `https://wa.me/919116622422?text=${encodeURIComponent(prod.whatsappMsg)}` : `https://wa.me/919116622422?text=I%27m%20interested%20in%20${encodeURIComponent(prod.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.enquireBtn}
                    onClick={e => e.stopPropagation()}
                  >
                    Request Quote →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          <button
            className={styles.navBtn}
            onClick={() => manualGoTo(continuousIdx.current - 1)}
            aria-label="Previous"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={styles.dots}>
            {products.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot2} ${i === activeIdx ? styles.dotActive : ''}`}
                onClick={() => onDotClick(i)}
                aria-label={`Go to ${products[i].title}`}
              />
            ))}
          </div>

          <button
            className={styles.navBtn}
            onClick={() => manualGoTo(continuousIdx.current + 1)}
            aria-label="Next"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 4l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* View all CTA */}
        <Reveal animation="fade-up" delay={200}>
          <div className={styles.viewAll}>
            <a href="#collections" className="btn btn-outline-copper">View Entire Collection</a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
