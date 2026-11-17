'use client';

import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './GoogleReviews.module.css';

/**
 * Scroll-snap track with prev/next arrows and interactive pagination dots.
 * Children (review cards) are rendered on the server and passed in.
 */
export default function ReviewsCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const cardCount = React.Children.count(children);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 6);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);

    const card = el.querySelector('article');
    if (card) {
      const step = card.clientWidth + 24;
      const visibleCount = Math.max(1, Math.round(el.clientWidth / step));
      const pages = Math.max(1, cardCount - visibleCount + 1);
      setPageCount(pages);
      const current = Math.min(pages - 1, Math.max(0, Math.round(el.scrollLeft / step)));
      setActiveIndex(current);
    }
  }, [cardCount]);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = (card?.clientWidth ?? 320) + 24;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const scrollToPage = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = (card?.clientWidth ?? 320) + 24;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous reviews"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          ref={trackRef}
          className={styles.track}
          onScroll={update}
          role="region"
          aria-label="Google reviews"
          tabIndex={0}
        >
          {children}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next reviews"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {pageCount > 1 && (
        <div className={styles.dots} aria-hidden="true">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => scrollToPage(i)}
              aria-label={`Go to review slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
