'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CategoryItem } from '@/types';
import { categories as defaultCategories } from '@/data/categories';
import styles from './HoverListReveal.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const getHref = (cat?: CategoryItem) => {
  if (!cat) return '/collections';
  return cat.href ?? `/collections/${cat.id}`;
};

// ── Desktop image crossfade panel — GSAP clip-path wipe ──────────────────────
function ImageCrossfade({ images, tag, title, count, href, autoInterval = 4000 }: {
  images: string[];
  tag?: string;
  title: string;
  count?: number;
  href?: string;
  autoInterval?: number;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);

  // Plain crossfade — same dissolve as the projects-page CinematicFocalSlider:
  // the entering image fades in from a soft zoom while the leaving image fades out.
  // No horizontal motion.
  const wipeTo = useCallback((nextIdx: number) => {
    if (nextIdx === activeRef.current || images.length <= 1) return;
    const prevIdx = activeRef.current;
    const entering = slotRefs.current[nextIdx];
    const leaving = slotRefs.current[prevIdx];

    // Kill any running tweens
    slotRefs.current.forEach(el => el && gsap.killTweensOf(el));

    if (entering && leaving) {
      // Park all other layers behind, hidden
      slotRefs.current.forEach((el, i) => {
        if (el && i !== nextIdx && i !== prevIdx) gsap.set(el, { zIndex: 0, opacity: 0 });
      });
      gsap.set(leaving,  { zIndex: 1, opacity: 1, xPercent: 0, scale: 1, clipPath: 'inset(0% 0 0 0)' });
      gsap.set(entering, { zIndex: 2, opacity: 0, xPercent: 0, scale: 1.06, clipPath: 'inset(0% 0 0 0)' });

      // Entering: dissolve in from a soft zoom
      gsap.to(entering, {
        opacity: 1, scale: 1,
        duration: 1.2, ease: 'power1.inOut',
        onComplete: () => {
          gsap.set(entering, { zIndex: 1 });
          gsap.set(leaving, { zIndex: 0, opacity: 0 });
        },
      });
      // Leaving: dissolve out
      gsap.to(leaving, {
        opacity: 0, scale: 1.03,
        duration: 1.2, ease: 'power1.inOut',
      });
    }

    activeRef.current = nextIdx;
    setActiveIdx(nextIdx);
  }, [images.length]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      wipeTo(((activeRef.current + 1) % images.length));
    }, autoInterval);
    return () => clearInterval(id);
  }, [images.length, autoInterval, wipeTo]);

  // Bottom-to-top curtain wipe when images array changes (drum / category change) —
  // same direction as before, just a longer, gentler reveal so it feels smoother.
  useEffect(() => {
    // Kill any running tweens
    slotRefs.current.forEach(el => el && gsap.killTweensOf(el));
    activeRef.current = 0;
    setActiveIdx(0);

    const first = slotRefs.current[0];
    if (!first) return;

    // Push all slots behind, bring first slot on top hidden below the curtain line
    slotRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, {
        zIndex: i === 0 ? 2 : 0,
        opacity: 1,
        xPercent: 0,
        scale: 1,
        clipPath: i === 0 ? 'inset(100% 0 0 0)' : 'inset(0% 0 0 0)',
      });
    });

    // Reveal first image of new category upward from the bottom
    gsap.to(first, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(first, { zIndex: 1 });
      },
    });
  }, [images]);

  return (
    <div className={styles.imageSlot}>
      {images.map((src, i) => (
        <div
          key={i}
          ref={el => { slotRefs.current[i] = el; }}
          className={styles.imgLayer}
          style={{ zIndex: i === 0 ? 1 : 0 }}
        >
          <Image src={src} alt={`${title} ${i + 1}`} fill sizes="55vw" quality={88} className={styles.img} priority={i === 0} />
        </div>
      ))}

      <div className={styles.imgOverlay} />
      {tag && <span className={styles.imgTag}>{tag}</span>}
      <div className={styles.imageLabel}>
        <span className={styles.imageLabelName}>{title}</span>
        {count && <span className={styles.imageLabelCount}>{count}+ varieties</span>}
      </div>

      {/* Dots only — no arrows */}
      {images.length > 1 && (
        <div className={styles.imgDots}>
          {images.map((_, di) => (
            <button key={di}
              className={`${styles.imgDot} ${di === activeIdx ? styles.imgDotActive : ''}`}
              onClick={() => wipeTo(di)}
              aria-label={`Image ${di + 1}`} />
          ))}
        </div>
      )}

      {href && (
        <Link href={href} className={styles.imgExplore}>
          Explore {title} →
        </Link>
      )}
    </div>
  );
}

// ── Mobile image scroll strip — auto-advances every 2s, copper dots ──────────
function MobileImageScroll({ images, href, title }: {
  images: string[];
  href?: string;
  title: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeRef  = useRef(0);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // Sync scroll position → dot index
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    activeRef.current = idx;
    setActiveIdx(idx);
  };

  // Auto-advance every 2s
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const next = (activeRef.current + 1) % images.length;
      el.scrollTo({ left: next * el.offsetWidth, behavior: 'smooth' });
    }, 2000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className={styles.mobileImgBlock}>
      {/* Horizontal scroll strip */}
      <div ref={scrollRef} className={styles.mobileImgStrip} onScroll={onScroll}>
        {images.map((src, i) => (
          <div key={i} className={styles.mobileImgFrame}>
            <Image src={src} alt={`${title} ${i + 1}`} fill sizes="90vw" className={styles.img} />
          </div>
        ))}
      </div>

      {/* Dots — only when multiple images */}
      {images.length > 1 && (
        <div className={styles.mobileDots}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${styles.mobileDot} ${i === activeIdx ? styles.mobileDotActive : ''}`}
            />
          ))}
        </div>
      )}

      {/* Explore link */}
      {href && (
        <Link href={href} className={styles.mobileExplore}>
          Explore {title} →
        </Link>
      )}
    </div>
  );
}

const DEGREES_PER_ITEM = 25;   // tighter angle = more items visible, taller effective drum
const DRUM_RADIUS = 320;  // larger radius = more physical separation between items

interface HoverListRevealProps {
  categories?: CategoryItem[];
}

export default function HoverListReveal({ categories = defaultCategories }: HoverListRevealProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);
  const drumWrapRef = useRef<HTMLDivElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetObj = useRef({ value: 0 });

  // Wheel gesture lock — one physical scroll advances the drum by exactly one item.
  const wheelLocked = useRef(false);
  const wheelIdle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = categories.length;

  // ── Apply 3D cylinder transforms — circular (modulo) ─────────────────────────
  const applyTransforms = useCallback((offset: number) => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      let diff = i - offset;
      diff = diff - total * Math.round(diff / total);

      const rel = diff * DEGREES_PER_ITEM;
      const rad = (rel * Math.PI) / 180;
      const y = DRUM_RADIUS * Math.sin(rad);
      const z = DRUM_RADIUS * (Math.cos(rad) - 1);
      const op = Math.max(0.06, Math.cos(rad) * 0.88 + 0.08);
      const sc = Math.max(0.68, 0.32 + 0.68 * Math.cos(rad));
      gsap.set(el, { yPercent: -50, y, z, rotationX: -rel, opacity: op, scale: sc, transformOrigin: 'center center' });
      el.dataset.active = Math.round(((offset % total) + total) % total) === i ? '1' : '0';
    });
  }, [total]);

  // ── Rotate drum or navigate ──────────────────────────────────────────────────
  const rotateTo = useCallback((idx: number) => {
    const normIdx = ((idx % total) + total) % total;
    if (normIdx === activeIdx) return;

    const curWrapped = ((Math.round(offsetObj.current.value) % total) + total) % total;

    let diff = normIdx - curWrapped;
    if (diff >  total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const newCumulative = offsetObj.current.value + diff;

    setActiveIdx(normIdx);
    gsap.to(offsetObj.current, {
      value: newCumulative, duration: 0.72, ease: 'power3.out',
      onUpdate: () => applyTransforms(offsetObj.current.value),
    });
  }, [activeIdx, total, applyTransforms]);

  const handleItemClick = (i: number, cat: CategoryItem) => {
    if (i === activeIdx) {
      router.push(getHref(cat));
    } else {
      rotateTo(i);
    }
  };

  const onWheelScroll = useCallback((e: WheelEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 860) return;
    e.preventDefault();

    if (wheelIdle.current) clearTimeout(wheelIdle.current);
    wheelIdle.current = setTimeout(() => { wheelLocked.current = false; }, 140);

    if (wheelLocked.current) return;
    wheelLocked.current = true;

    const dir = e.deltaY > 0 ? 1 : -1;
    const newCumulative = offsetObj.current.value + dir;
    const normIdx = ((Math.round(newCumulative) % total) + total) % total;

    setActiveIdx(normIdx);
    gsap.to(offsetObj.current, {
      value: newCumulative, duration: 0.45, ease: 'power2.out',
      onUpdate: () => applyTransforms(offsetObj.current.value),
    });
  }, [total, applyTransforms]);

  useEffect(() => {
    const el = drumWrapRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheelScroll, { passive: false });
    return () => el.removeEventListener('wheel', onWheelScroll);
  }, [onWheelScroll]);

  useEffect(() => () => { if (wheelIdle.current) clearTimeout(wheelIdle.current); }, []);
  useEffect(() => { applyTransforms(0); }, [applyTransforms]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelector(`.${styles.topHeader}`),
      { y: 32, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      }
    );
    gsap.fromTo(sectionRef.current.querySelector(`.${styles.drumWrap}`),
      { x: -48, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true }
      }
    );
    gsap.fromTo(sectionRef.current.querySelector(`.${styles.imagePanel}`),
      { x: 48, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true }
      }
    );
  }, { scope: sectionRef });

  const getImages = (idx: number) => {
    const cat = categories[idx];
    if (!cat) return [];
    return cat.images && cat.images.length > 0 ? cat.images : [cat.image];
  };

  const activeCategory = categories[activeIdx];

  return (
    <section className={styles.section} id="collections" ref={sectionRef}>
      <div className={styles.inner}>

        {/* ── TOP: centred heading ── */}
        <div className={styles.topHeader}>
          <div className={styles.eyebrowWrap}>
            <span className="section-eyebrow">Our Collections</span>
          </div>
          <h2 className={`${styles.title} ${styles.titleCentered}`}>Masterpieces of <em>Nature</em></h2>
          <p className={`${styles.subtitle} ${styles.subtitleCentered}`}>
            Explore our curated selection of fine stones, sourced from the deepest quarries
            and refined for the world&apos;s most prestigious projects.
          </p>
        </div>

        {/* ── BOTTOM: cylinder (left) + image (right), same height ── */}
        <div className={styles.bottomRow}>

          {/* Cylinder drum */}
          <div ref={drumWrapRef} className={styles.drumWrap} data-lenis-prevent-wheel style={{ perspective: '900px' }}>
            <div ref={drumRef} className={styles.drum}>
              {categories.map((cat, i) => {
                const itemHref = getHref(cat);
                return (
                  <div
                    key={cat.id}
                    ref={el => { itemRefs.current[i] = el; }}
                    className={styles.drumItem}
                    data-active={i === activeIdx ? '1' : '0'}
                    onClick={() => handleItemClick(i, cat)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleItemClick(i, cat);
                    }}
                    aria-pressed={i === activeIdx}
                  >
                    <div className={styles.itemLine} />
                    <div className={styles.itemRow}>
                      <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                      <div className={styles.itemText}>
                        <div className={styles.itemNameRow}>
                          <span className={styles.itemName}>{cat.title}</span>
                          {cat.tag && <span className={styles.tag}>{cat.tag}</span>}
                        </div>
                        {cat.desc && <span className={styles.itemSub}>{cat.desc}</span>}
                      </div>
                      <Link
                        href={itemHref}
                        className={styles.itemArrowLink}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Explore ${cat.title}`}
                      >
                        <svg className={styles.itemArrow} width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                    {/* Mobile inline multi-image scroll */}
                    <div className={styles.mobileInlineImg}>
                      <MobileImageScroll
                        images={getImages(i)}
                        href={itemHref}
                        title={cat.title}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className={styles.hint}>↕ scroll to explore</p>
          </div>

          {/* Image panel */}
          <div className={styles.imagePanel}>
            <ImageCrossfade
              images={getImages(activeIdx)}
              tag={activeCategory?.tag}
              title={activeCategory?.title ?? ''}
              count={activeCategory?.count}
              href={getHref(activeCategory)}
              autoInterval={4000}
            />

            {/* Counter */}
            <div className={styles.counterRow}>
              <span className={styles.counterCurrent}>{String(activeIdx + 1).padStart(2, '0')}</span>
              <span className={styles.counterSlash}>/</span>
              <span className={styles.counterTotal}>{String(total).padStart(2, '0')}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
