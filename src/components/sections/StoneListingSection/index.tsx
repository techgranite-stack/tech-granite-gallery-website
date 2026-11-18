'use client';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import StoneCard from '@/components/ui/StoneCard';
import type { ListingItem } from '@/lib/listing-item';
import styles from './StoneListingSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Modular filter config ─────────────────────────────────────────────────
   A listing can declare any number of filter groups. Each group matches against
   `item.facets[group.key]`. Pass none for a filter-less grid. Colour, type,
   finish, application … are all just groups — nothing here is colour-specific. */
export interface FilterOptionDef {
  value: string;
  label: string;
  /** CSS background for a swatch dot (only when display === 'swatch') */
  swatch?: string;
}
export interface FilterGroup {
  key: string;                       // matches a key in ListingItem.facets
  label: string;                     // sidebar heading
  display?: 'swatch' | 'check';      // how options render (default 'check')
  options: FilterOptionDef[];
}

/** @deprecated kept for back-compat with older imports — use FilterGroup. */
export type FilterOption = FilterOptionDef;

interface StoneListingSectionProps {
  products: ListingItem[];
  filters?: FilterGroup[];
  heading?: string;
  eyebrow?: string;
  initialLimit?: number;
}

/* Fallback swatch palette for the colour group when an option omits `swatch` */
const SWATCH: Record<string, string> = {
  white: '#e8e0d8', black: '#1a1a1a', grey: '#888',
  pink: '#e8a0a0', red: '#b03030', green: '#3a7a3a',
  brown: '#7a4a2a', blue: '#3a60a0', yellow: '#d4a820',
  beige: '#d4b896',
  multi: 'linear-gradient(135deg,#b03030 33%,#3a7a3a 33% 66%,#3a60a0 66%)',
};

/* ─── Mobile carousel card ──────────────────────────────────────────────────── */
function MobileCard({ product }: { product: ListingItem }) {
  const href = product.href;
  const waMsg = encodeURIComponent(`Hi, I'm interested in ${product.name}. Can you share more details?`);
  return (
    <article className={styles.mCard}>
      <Link href={href} className={styles.mImgWrap} aria-label={product.name}>
        <Image
          src={product.thumbnail}
          alt={`${product.name} — ${product.tagline}`}
          fill
          sizes="(max-width: 860px) 100vw, 33vw"
          className={styles.mImg}
          priority
        />
        <div className={styles.mOverlay} />
        {product.tag && <span className={styles.mTag}>{product.tag}</span>}
        <span className={styles.mViewBtn}>View Stone →</span>
      </Link>

      <div className={styles.mBody}>
        <div className={styles.mMeta}>
          <span className={styles.mCategory}>{product.categoryLabel}</span>
          <span className={styles.mOrigin}>{product.origin.split(',')[0]}</span>
        </div>

        <h3 className={styles.mName}>
          <Link href={href}>{product.name}</Link>
          {product.altNames && product.altNames.length > 0 && (
            <span className={styles.mAlt}> / {product.altNames[0]}</span>
          )}
        </h3>
        <p className={styles.mTagline}>{product.tagline}</p>

        <div className={styles.mActions}>
          <Link href={href} className={styles.mDetailsBtn}>
            <span>View Details</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            data-wa-source="stone_listing"
            href={`https://wa.me/919116622422?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mWaBtn}
            aria-label={`WhatsApp enquiry for ${product.name}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─── Main component ────────────────────────────────────────────────────────── */
export default function StoneListingSection({
  products,
  filters = [],
  heading,
  eyebrow,
  initialLimit,
}: StoneListingSectionProps) {
  // active selection per filter-group key; absent / 'all' = no filter
  const [active, setActive] = useState<Record<string, string>>({});
  const [mobileIdx, setMobileIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState<number>(initialLimit ?? 9999);

  // When filters or initialLimit change, reset visible count to initialLimit
  useEffect(() => {
    if (initialLimit) {
      setVisibleCount(initialLimit);
    }
  }, [active, initialLimit]);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);
  const mCardRef = useRef<HTMLDivElement>(null);
  const skipNextEffect = useRef(true);

  const filtered = useMemo(() =>
    products.filter(p =>
      filters.every(g => {
        const sel = active[g.key];
        if (!sel || sel === 'all') return true;
        return (p.facets[g.key] ?? []).includes(sel);
      })
    ),
    [products, filters, active]);

  const countFor = useCallback(
    (key: string, value: string) =>
      products.filter(p => (p.facets[key] ?? []).includes(value)).length,
    [products]
  );

  const activeGroups = filters.filter(g => active[g.key] && active[g.key] !== 'all');
  const activeCount = activeGroups.length;

  useEffect(() => { setMobileIdx(0); }, [filtered]);

  // ── Mobile carousel navigation ──────────────────────────────────────────
  const mobileGoTo = useCallback((nextIdx: number) => {
    const card = mCardRef.current;
    if (!card) { setMobileIdx(nextIdx); return; }
    const dir = nextIdx > mobileIdx ? 1 : -1;
    gsap.to(card, {
      x: dir * -60, opacity: 0, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setMobileIdx(nextIdx);
        gsap.fromTo(card, { x: dir * 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' });
      },
    });
  }, [mobileIdx]);

  const mobilePrev = useCallback(() => {
    mobileGoTo(mobileIdx > 0 ? mobileIdx - 1 : filtered.length - 1);
  }, [mobileIdx, filtered.length, mobileGoTo]);

  const mobileNext = useCallback(() => {
    mobileGoTo(mobileIdx < filtered.length - 1 ? mobileIdx + 1 : 0);
  }, [mobileIdx, filtered.length, mobileGoTo]);

  // ── Touch swipe ──────────────────────────────────────────────────────────
  const touchStart = useRef(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? mobileNext() : mobilePrev();
  }, [mobileNext, mobilePrev]);

  // ── Filter change: animate desktop cards out → state → animate in ────────
  const changeFilter = useCallback((key: string, value: string) => {
    const cards = gridRef.current
      ? Array.from(gridRef.current.querySelectorAll<HTMLElement>(`.${styles.cardWrap}`))
      : [];
    const applyState = () => setActive(prev => ({ ...prev, [key]: value }));
    if (cards.length > 0) {
      gsap.to(cards, {
        opacity: 0, y: -14, scale: 0.95,
        stagger: { each: 0.025, from: 'start' },
        duration: 0.22, ease: 'power2.in',
        onComplete: applyState,
      });
    } else {
      applyState();
    }
  }, []);

  const clearAll = useCallback(() => {
    const cards = gridRef.current
      ? Array.from(gridRef.current.querySelectorAll<HTMLElement>(`.${styles.cardWrap}`))
      : [];
    if (cards.length > 0) {
      gsap.to(cards, {
        opacity: 0, y: -14, scale: 0.95,
        stagger: { each: 0.025, from: 'start' }, duration: 0.22, ease: 'power2.in',
        onComplete: () => setActive({}),
      });
    } else {
      setActive({});
    }
  }, []);

  // ── Animate desktop cards in after filter state settles ──────────────────
  useEffect(() => {
    if (skipNextEffect.current) { skipNextEffect.current = false; return; }
    const cards = gridRef.current
      ? Array.from(gridRef.current.querySelectorAll<HTMLElement>(`.${styles.cardWrap}`))
      : [];
    if (cards.length === 0) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: { each: 0.055, from: 'start' }, duration: 0.52, ease: 'power3.out' }
    );
    if (countRef.current) {
      gsap.fromTo(countRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(2.5)', delay: 0.05 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, visibleCount]);

  // ── Section entrance (ScrollTrigger) ─────────────────────────────────────
  useGSAP(() => {
    if (!sectionRef.current) return;
    if (topBarRef.current) {
      gsap.fromTo(topBarRef.current, { y: -22, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
    }
    const sidebarGroups = sidebarRef.current
      ? Array.from(sidebarRef.current.querySelectorAll<HTMLElement>(`.${styles.filterGroup}, .${styles.clearBtn}`))
      : [];
    if (sidebarGroups.length > 0) {
      gsap.fromTo(sidebarGroups, { x: -28, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
    }
    const cards = gridRef.current
      ? Array.from(gridRef.current.querySelectorAll<HTMLElement>(`.${styles.cardWrap}`))
      : [];
    if (cards.length > 0) {
      gsap.fromTo(cards, { opacity: 0, y: 60, scale: 0.94 }, {
        opacity: 1, y: 0, scale: 1,
        stagger: { each: 0.065, from: 'start' }, duration: 0.78, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
    }
    if (mCardRef.current) {
      gsap.fromTo(mCardRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
    }
  }, { scope: sectionRef, dependencies: [] });

  const currentProduct = filtered[mobileIdx] ?? null;

  const optionLabel = (g: FilterGroup, value: string) =>
    g.options.find(o => o.value === value)?.label ?? value;

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.layout}>

          {/* ── Desktop sidebar — one block per filter group ───────── */}
          {filters.length > 0 && (
            <aside className={styles.sidebar} ref={sidebarRef}>
              {filters.map(g => (
                <div className={styles.filterGroup} key={g.key}>
                  <span className={styles.groupLabel}>{g.label}</span>
                  <div className={styles.filterList}>
                    <button
                      className={`${styles.filterItem} ${!active[g.key] || active[g.key] === 'all' ? styles.filterItemActive : ''}`}
                      onClick={() => changeFilter(g.key, 'all')}
                    >
                      <span className={styles.filterCheck}>{!active[g.key] || active[g.key] === 'all' ? '✓' : ''}</span>
                      All
                      <span className={styles.filterBadge}>{products.length}</span>
                    </button>
                    {g.options.map(opt => {
                      const count = countFor(g.key, opt.value);
                      if (count === 0) return null;
                      const isActive = active[g.key] === opt.value;
                      return (
                        <button key={opt.value}
                          className={`${styles.filterItem} ${isActive ? styles.filterItemActive : ''}`}
                          onClick={() => changeFilter(g.key, opt.value)}
                        >
                          {g.display === 'swatch'
                            ? <span className={styles.swatch} style={{ background: opt.swatch ?? SWATCH[opt.value] ?? '#ccc' }} />
                            : <span className={styles.filterCheck}>{isActive ? '✓' : ''}</span>}
                          {opt.label}
                          <span className={styles.filterBadge}>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {activeCount > 0 && (
                <button className={styles.clearBtn} onClick={clearAll}>Clear filters</button>
              )}
            </aside>
          )}

          {/* ── Right: topbar + desktop grid / mobile carousel ────── */}
          <div className={styles.main}>

            <div className={styles.topBar} ref={topBarRef}>
              <div>
                {eyebrow && (
                  <span className="section-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
                    {eyebrow}
                  </span>
                )}
                {heading && <h2 className={styles.heading}>{heading}</h2>}
                <p className={styles.count} ref={countRef}>
                  {filtered.length} {filtered.length === 1 ? 'stone' : 'stones'}
                  {activeGroups.map(g => ` · ${optionLabel(g, active[g.key])}`).join('')}
                </p>
              </div>
              {activeCount > 0 && (
                <button className={`${styles.clearBtn} ${styles.clearBtnInline}`} onClick={clearAll}>
                  Clear
                </button>
              )}
            </div>

            {/* ── Mobile chip filters — flattened groups ───────────── */}
            {filters.length > 0 && (
              <div className={styles.mobileFilters}>
                {filters.map((g, gi) => (
                  <span key={g.key} style={{ display: 'contents' }}>
                    <button
                      className={`${styles.chip} ${!active[g.key] || active[g.key] === 'all' ? styles.chipActive : ''}`}
                      onClick={() => changeFilter(g.key, 'all')}
                    >
                      All {g.label}
                    </button>
                    {g.options.map(opt => {
                      const count = countFor(g.key, opt.value);
                      if (count === 0) return null;
                      const isActive = active[g.key] === opt.value;
                      return (
                        <button key={opt.value}
                          className={`${styles.chip} ${isActive ? styles.chipActive : ''}`}
                          onClick={() => changeFilter(g.key, opt.value)}
                        >
                          {g.display === 'swatch' && (
                            <span className={styles.chipSwatch} style={{ background: opt.swatch ?? SWATCH[opt.value] ?? '#ccc' }} />
                          )}
                          {opt.label}
                        </button>
                      );
                    })}
                    {gi < filters.length - 1 && <span className={styles.chipDivider} />}
                  </span>
                ))}
              </div>
            )}

            {/* ── Desktop grid ─────────────────────────────────────── */}
            {filtered.length > 0 ? (
              <>
                <div className={styles.grid} ref={gridRef}>
                  {(initialLimit ? filtered.slice(0, visibleCount) : filtered).map(product => (
                    <div key={product.slug} className={styles.cardWrap}>
                      <StoneCard product={product} />
                    </div>
                  ))}
                </div>

                {initialLimit && filtered.length > visibleCount && (
                  <div className={styles.showMoreWrap}>
                    <button
                      type="button"
                      className={styles.showMoreBtn}
                      onClick={() => setVisibleCount(prev => prev + initialLimit)}
                    >
                      <span>Show More Stones ({filtered.length - visibleCount} remaining)</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.empty}>
                <p>No stones match this filter.</p>
                <button className={styles.clearBtn} onClick={clearAll}>Clear filters</button>
              </div>
            )}

            {/* ── Mobile carousel ──────────────────────────────────── */}
            {filtered.length > 0 && currentProduct && (
              <div className={styles.carousel}>
                <div className={styles.carouselStage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ref={mCardRef}>
                  <MobileCard product={currentProduct} />
                </div>

                <div className={styles.carouselControls}>
                  <button className={styles.carouselArrow} onClick={mobilePrev} aria-label="Previous stone">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M12 3L6 9l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className={styles.carouselDots}>
                    {filtered.slice(0, Math.min(filtered.length, 8)).map((_, i) => (
                      <button key={i}
                        className={`${styles.carouselDot} ${i === mobileIdx ? styles.carouselDotActive : ''}`}
                        onClick={() => mobileGoTo(i)}
                        aria-label={`Go to stone ${i + 1}`}
                      />
                    ))}
                    {filtered.length > 8 && <span className={styles.carouselMore}>…</span>}
                  </div>

                  <button className={styles.carouselArrow} onClick={mobileNext} aria-label="Next stone">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M6 3l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className={styles.carouselCounter}>
                  <span className={styles.carouselCurrent}>{String(mobileIdx + 1).padStart(2, '0')}</span>
                  <span className={styles.carouselSep} />
                  <span className={styles.carouselTotal}>{String(filtered.length).padStart(2, '0')}</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
