'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './HorizontalScrollGallery.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GalleryItem {
  id: string | number;
  image: string;
  tag?: string;
  title: string;
  actionText?: string;
  onAction?: () => void;
  href?: string;
}

interface HorizontalScrollGalleryProps {
  items: GalleryItem[];
}

export default function HorizontalScrollGallery({ items }: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;
    const track = trackRef.current;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

    gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    const cards = track.querySelectorAll(`.${styles.card}`);
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  if (!items || items.length === 0) return null;

  return (
    <div className={styles.pinWrap} ref={containerRef}>
      <div ref={trackRef} className={styles.track}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imgWrap}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 300px, 420px"
                className={styles.img}
              />
              <div className={styles.overlay}>
                {item.tag && <span className={styles.tag}>{item.tag}</span>}
                <h3 className={styles.title}>{item.title}</h3>
                {item.href ? (
                  <a href={item.href} className={styles.actionBtn}>
                    {item.actionText || 'View Details'} →
                  </a>
                ) : item.onAction ? (
                  <button onClick={item.onAction} className={styles.actionBtn}>
                    {item.actionText || 'View Details'} →
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll to explore</span>
        <svg width="48" height="12" viewBox="0 0 48 12" fill="none">
          <path d="M0 6h44M38 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
