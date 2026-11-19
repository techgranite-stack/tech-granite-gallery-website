'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { HeroSlide } from '@/types';
import { heroSlides } from '@/data/landing';
import styles from './HeroSlider.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSliderProps {
  slides?: HeroSlide[];
}

/* Derive a short, punchy eyebrow from a slide's sub — first clause, capped to a
   few words, with any trailing filler word trimmed. Keeps the golden eyebrow
   tight across every page without hand-writing one per slide. */
const EYEBROW_FILLER = new Set(['and', 'that', 'the', 'to', 'for', 'of', 'with', 'a', 'in', 'on', '&']);
function shortEyebrow(sub: string): string {
  const clause = sub.split(/[—–,.]/)[0].trim();
  const words = clause.split(/\s+/).slice(0, 5);
  while (words.length > 2 && EYEBROW_FILLER.has(words[words.length - 1].toLowerCase())) {
    words.pop();
  }
  return words.join(' ');
}

/* Word-split helper — each word clips upward from an overflow:hidden container */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className={styles.wordClip}>
          <span className={styles.wordInner}>{word}</span>
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </span>
  );
}

export default function HeroSlider({ slides = heroSlides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const isFirstMount = useRef(true);

  /* ── Slide entrance: Instant BG on first mount + smooth transition on slide change ── */
  useGSAP(() => {
    if (!containerRef.current) return;

    const bgs = containerRef.current.querySelectorAll(`.${styles.bg}`);
    const activeBg = bgs[current];
    const words = containerRef.current.querySelectorAll(`.${styles.wordInner}`);
    const eyebrow = containerRef.current.querySelector(`.${styles.eyebrow}`);
    const sub = containerRef.current.querySelector(`.${styles.sub}`);
    const ctaRow = containerRef.current.querySelector(`.${styles.ctaRow}`);

    const tl = gsap.timeline();

    if (isFirstMount.current) {
      isFirstMount.current = false;
      // On initial page load, display active background immediately at 100 opacity
      gsap.set(activeBg, { opacity: 1, scale: 1 });
      gsap.set(Array.from(bgs).filter((el) => el !== activeBg), { opacity: 0 });
    } else {
      // Fade out non-active backgrounds
      gsap.to(
        Array.from(bgs).filter((el) => el !== activeBg),
        { opacity: 0, duration: 1.2, ease: 'power2.inOut' }
      );

      // Active bg: scale-in entrance transition
      tl.fromTo(
        activeBg,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' }
      );
    }

    // Eyebrow line draw
    tl.fromTo(
      eyebrow,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
      isFirstMount.current ? undefined : '-=1.0'
    );

    // Word-by-word curtain reveal
    tl.fromTo(
      words,
      { y: '110%' },
      { y: '0%', duration: 0.8, stagger: 0.05, ease: 'power4.out' },
      '-=0.4'
    );

    // Sub + CTA
    tl.fromTo(
      [sub, ctaRow],
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
      '-=0.5'
    );
  }, { scope: containerRef, dependencies: [current] });

  /* ── Parallax: bg image moves up as user scrolls ── */
  useGSAP(() => {
    if (!containerRef.current) return;
    const bgs = containerRef.current.querySelectorAll(`.${styles.bg}`);

    gsap.to(bgs, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className={styles.hero} ref={containerRef} id="home">
      {/* Backgrounds */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`${styles.bg} ${i === current ? styles.bgActive : ''}`}
          style={{ zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.alt ?? s.title}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            className={styles.bgImage}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      ))}

      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide.eyebrow ?? shortEyebrow(slide.sub)}</span>

        <h1 className={styles.headline}>
          <WordReveal text={slide.title} />
        </h1>

        <p className={styles.sub}>{slide.sub}</p>

        <div className={styles.ctaRow}>
          <a href="#collections" className={styles.btnPrimary}>
            <span>Explore Collection</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            data-wa-source="hero_slider"
            href="https://wa.me/919116622422?text=Hello%2C%20I%20would%20like%20to%20Book%20a%20Video%20Call%20to%20see%20your%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            Book Video Call
          </a>
          <a href="#contact" className={styles.btnOutline}>Get Quote</a>
        </div>
      </div>

      {/* Dots */}
      <div className={styles.controls}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
