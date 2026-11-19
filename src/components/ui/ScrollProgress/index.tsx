'use client';

import { useEffect, useRef } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const updateProgress = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) {
        bar.style.height = '0%';
        ticking = false;
        return;
      }
      const pct = Math.min(Math.max((window.scrollY / docH) * 100, 0), 100);
      bar.style.height = `${pct}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={styles.progressTrack} aria-hidden="true">
      <div ref={barRef} className={styles.progressBar} />
    </div>
  );
}
