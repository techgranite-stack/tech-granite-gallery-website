'use client';
import { useEffect, useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css'; // Direct JS import to guarantee compile and bundling

interface SmoothScrollProps {
  children: ReactNode;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Bypass Lenis on mobile/touch screens to allow native hardware momentum scroll
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 0,
    });

    lenisRef.current = lenis;

    // Drive Lenis RAF loop via GSAP ticker exactly like the original
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    tickerRef.current = update;
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ScrollTrigger.update);

    // Make lenis accessible globally for anchor links
    window.__lenis = lenis;

    // Trigger initial refresh once layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
      }
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Reset scroll position to top immediately on route/pathname change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
