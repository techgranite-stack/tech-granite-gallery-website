'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DiagonalRevealGroupProps {
  children: React.ReactNode;
  /** The CSS selector for the elements inside children to animate (e.g., '.reveal-target') */
  itemSelector: string;
  stagger?: number;
  duration?: number;
  start?: string;
  className?: string;
}

export default function DiagonalRevealGroup({
  children,
  itemSelector,
  stagger = 0.15,
  duration = 1.2,
  start = 'top 75%',
  className = '',
}: DiagonalRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll(itemSelector);
    if (!targets.length) return;

    gsap.fromTo(targets,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration,
        stagger,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
