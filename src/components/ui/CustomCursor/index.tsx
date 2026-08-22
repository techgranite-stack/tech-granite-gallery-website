'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsTouch(false);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use a small delay to ensure we don't hide the cursor too early
    document.body.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const animate = () => {
      const { x, y } = posRef.current;
      const { x: rx, y: ry } = ringPosRef.current;
      const nx = rx + (x - rx) * 0.11;
      const ny = ry + (y - ry) * 0.11;
      ringPosRef.current = { x: nx, y: ny };
      ring.style.transform = `translate(${nx - 20}px, ${ny - 20}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement | null;
      if (el?.dataset.cursor === 'zoom') {
        document.body.classList.add('cursor-magnify');
      } else {
        ring.classList.add(styles.expanded);
      }
    };
    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement | null;
      if (el?.dataset.cursor === 'zoom') {
        document.body.classList.remove('cursor-magnify');
      } else {
        ring.classList.remove(styles.expanded);
      }
    };

    const attachListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    window.addEventListener('mousemove', onMove);
    attachListeners();
    rafRef.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.style.cursor = '';
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
