'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './GoogleReviews.module.css';

/**
 * Scroll-snap track with prev/next arrows. Children (the review cards) are
 * rendered on the server and passed in, so this client island stays tiny.
 */
export default function ReviewsCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

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
    const step = (card?.clientWidth ?? 300) + 20;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        aria-label="Previous reviews"
      >
        ‹
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
        ›
      </button>
    </div>
  );
}
