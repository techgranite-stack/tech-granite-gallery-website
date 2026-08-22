'use client';
import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface RevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale';
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: string;
  className?: string;
}

export default function Reveal({
  children,
  animation = 'fade-up',
  duration = 1,
  delay = 0,
  stagger = 0,
  threshold = 'top 85%',
  className = '',
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.children;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: threshold,
        toggleActions: 'play none none reverse',
      },
    });

    const getVars = () => {
      switch (animation) {
        case 'fade-up': return { y: 30, opacity: 0 };
        case 'fade-down': return { y: -30, opacity: 0 };
        case 'fade-left': return { x: 30, opacity: 0 };
        case 'fade-right': return { x: -30, opacity: 0 };
        case 'scale': return { scale: 0.9, opacity: 0 };
        default: return { y: 30, opacity: 0 };
      }
    };

    tl.fromTo(
      items,
      getVars(),
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className} style={{ width: '100%' }}>
      {children}
    </div>
  );
}
