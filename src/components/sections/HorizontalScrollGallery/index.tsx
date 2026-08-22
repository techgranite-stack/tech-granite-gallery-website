'use client';
import React, { useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ProjectItem } from '@/types';
import { projects as defaultProjects } from '@/data/projects';
import styles from './HorizontalScrollGallery.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Sphere constants ─────────────────────────────────────────────────────────
// Radius of the invisible sphere the cards sit on.
// Larger = gentler arc; smaller = tighter wrap.
const SPHERE_RADIUS = 2200;

interface HorizontalScrollGalleryProps {
  projects?: ProjectItem[];
  eyebrow?: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  btnLabel?: string;
}

export default function HorizontalScrollGallery({
  projects = defaultProjects,
  eyebrow = 'Our Portfolio',
  title,
  desc = (
    <>
      <strong>A Legacy of Stone.</strong> For over three decades, Granite Gallery has been the cornerstone of India’s architectural landscape. We bring timeless vision to life by supplying and precision-fitting premium natural stone for prestigious landmarks—from luxury five-star resorts to defining national monuments.
    </>
  ),
  btnLabel = 'View Project',
}: HorizontalScrollGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  /* ─────────────────────────────────────────────────────────────────────────
     Shared transform function — works at any viewport width.
     Reads card size + gap from the DOM so CSS fully controls dimensions.
  ───────────────────────────────────────────────────────────────────────── */
  const updateTransforms = useCallback((currentX: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const vpCx = window.innerWidth / 2;   // viewport centre x
    const R = SPHERE_RADIUS;

    // Read actual rendered dimensions so CSS media queries drive the layout
    const firstCard = cardRefs.current.find(c => c !== null);
    if (!firstCard) return;
    const cardW = firstCard.offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const paddingL = parseFloat(getComputedStyle(track).paddingLeft) || 80;
    const step = cardW + gap;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      // Card centre position in viewport space (accounting for GSAP x offset)
      const cardCx = paddingL + i * step + cardW / 2 + currentX;
      const dist = cardCx - vpCx;

      // ── Spherical arc ───────────────────────────────────────────────────
      // Convert linear pixel offset to arc angle on the sphere
      const angleRad = dist / R;
      const angleDeg = angleRad * (180 / Math.PI);

      // Convex (outward) bend: right card tilts its left edge toward viewer
      const rotateY = Math.max(-55, Math.min(55, angleDeg));
      // Depth: card recedes onto sphere surface (works with per-card perspective)
      const translateZ = R * (Math.cos(angleRad) - 1);

      // Visual hierarchy — distance in card-steps from centre
      const abs = Math.abs(dist) / step;
      const scale = Math.max(0.68, 1 - abs * 0.16);
      const opacity = Math.max(0.2, 1 - abs * 0.38);
      // Min 0.4 so text is always readable; centre card reaches 1.0
      const overlayOpacity = Math.max(0.4, Math.min(1, 1 - abs * 0.7));

      gsap.set(card, {
        rotateY,
        translateZ,
        scale,
        opacity,
        transformPerspective: 1400,
        transformOrigin: 'center center',
        zIndex: Math.round(Math.max(0, 10 - abs * 3)),
      });

      const overlay = card.querySelector(`.${styles.overlay}`) as HTMLElement | null;
      if (overlay) gsap.set(overlay, { opacity: overlayOpacity });
    });
  }, []);

  /* ─────────────────────────────────────────────────────────────────────────
     GSAP — horizontal scroll + 3-D sphere transforms (all viewports)
  ───────────────────────────────────────────────────────────────────────── */
  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;

    // How far the track needs to travel to reveal all cards
    const getScrollAmount = () => {
      const paddingL = parseFloat(getComputedStyle(track).paddingLeft) || 80;
      return -(track.scrollWidth - window.innerWidth + paddingL * 2);
    };

    gsap.to(track, {
      x: () => getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: () => {
          const x = Number(gsap.getProperty(track, 'x')) || 0;
          updateTransforms(x);
        },
        onRefresh: () => {
          const x = Number(gsap.getProperty(track, 'x')) || 0;
          updateTransforms(x);
        },
      },
    });

    // Entrance: cards rise up as the section scrolls into view
    const cards = Array.from(track.querySelectorAll(`.${styles.card}`)) as HTMLElement[];
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1.1, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        onComplete: () => {
          const x = Number(gsap.getProperty(track, 'x')) || 0;
          updateTransforms(x);
        },
      }
    );
  }, { scope: sectionRef, dependencies: [projects] });

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 className="section-title">
          {title ?? <>Projects &amp; <em>Inspiration</em></>}
        </h2>
        <p className="section-desc centered">{desc}</p>
      </div>

      <div className={styles.pinWrap}>
        <div ref={trackRef} className={styles.track}>
          {projects.map((p, i) => (
            <Link
              href={p.href ?? '#contact'}
              key={p.title}
              ref={el => { cardRefs.current[i] = el; }}
              className={styles.card}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 600px, 600px"
                  className={styles.img}
                />
                <div className={styles.overlay}>
                  <span className={styles.projType}>{p.category}</span>
                  <h3 className={styles.projTitle}>{p.title}</h3>
                  <span className={styles.viewBtn}>{btnLabel} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.scrollHint}>
          <span>Scroll to explore</span>
          <svg width="48" height="12" viewBox="0 0 48 12" fill="none">
            <path d="M0 6h44M38 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
