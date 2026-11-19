'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Don't activate on touch/coarse pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide native cursor on desktop
    document.body.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        ringPosRef.current = { x: e.clientX, y: e.clientY };
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const animate = () => {
      const { x, y } = posRef.current;
      const { x: rx, y: ry } = ringPosRef.current;
      const nx = rx + (x - rx) * 0.15;
      const ny = ry + (y - ry) * 0.15;
      ringPosRef.current = { x: nx, y: ny };

      const offset = isHoveredRef.current ? 28 : 19;
      ring.style.transform = `translate(${nx - offset}px, ${ny - offset}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    // Event delegation for interactive elements (handles static & dynamic DOM elements)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
      if (interactive) {
        if ((interactive as HTMLElement).dataset.cursor === 'zoom') {
          document.body.classList.add('cursor-magnify');
        } else {
          isHoveredRef.current = true;
          ring.classList.add(styles.expanded);
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
      if (interactive) {
        document.body.classList.remove('cursor-magnify');
        isHoveredRef.current = false;
        ring.classList.remove(styles.expanded);
      }
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isVisibleRef.current = false;
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isVisibleRef.current = true;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('custom-cursor-active');
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
