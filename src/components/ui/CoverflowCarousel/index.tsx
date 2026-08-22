'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './CoverflowCarousel.module.css';

export interface CoverflowItem {
  id: string | number;
  image: string;
  tag?: string;
  title: string;
  subtitle?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  href?: string;
}

interface CoverflowCarouselProps {
  items: CoverflowItem[];
  height?: number;
}

export default function CoverflowCarousel({ items, height = 560 }: CoverflowCarouselProps) {
  const [active, setActive] = useState(0);
  const length = items.length;

  const getNormalizedDiff = useCallback((index: number) => {
    if (length === 0) return 0;
    const diff = index - active;
    let normalizedDiff = diff;
    const half = Math.floor(length / 2);
    if (diff > half) normalizedDiff -= length;
    if (diff < -half) normalizedDiff += length;
    return normalizedDiff;
  }, [active, length]);

  const getTransform = useCallback((normalizedDiff: number) => {
    const x = normalizedDiff * 320;
    const z = Math.abs(normalizedDiff) * -400;
    const rotateY = normalizedDiff * -45; // Reverted back to -45deg
    return `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg)`;
  }, []);

  if (length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.stage} style={{ height }}>
        <div className={styles.track}>
          {items.map((item, i) => {
            const normalizedDiff = getNormalizedDiff(i);
            const isActive = normalizedDiff === 0;
            const isVisible = Math.abs(normalizedDiff) <= 1;
            
            return (
            <div 
              key={item.id} 
              className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
              style={{ 
                transform: getTransform(normalizedDiff),
                zIndex: 10 - Math.abs(normalizedDiff),
                opacity: isActive ? 1 : (isVisible ? 0.6 : 0),
                pointerEvents: isVisible ? 'auto' : 'none'
              }}
              onClick={() => setActive(i)}
            >
              <div className={styles.imgWrap}>
                <Image src={item.image} alt={item.title} fill className={styles.img} />
                <div className={styles.imgOverlay} />
              </div>
              {item.tag && <span className={styles.tag}>{item.tag}</span>}
              
              <div className={styles.cardContent}>
                <div className={styles.cardLine} />
                <h3 className={styles.cardName}>{item.title}</h3>
                {item.subtitle && (
                  <div className={styles.cardSpecs}>
                    {item.subtitle}
                  </div>
                )}
                
                {item.href ? (
                  <a href={item.href} className={styles.actionBtn}>
                    {item.actionText || 'View Details'}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ) : item.onAction ? (
                  <button onClick={item.onAction} className={styles.actionBtn}>
                    {item.actionText || 'View Details'}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : null}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div className={styles.nav}>
        <button 
          className={styles.navBtn} 
          onClick={() => setActive((prev) => (prev - 1 + length) % length)}
        >
          ←
        </button>
        <div className={styles.dots}>
          {items.map((_, i) => (
            <button 
              key={i} 
              className={`${styles.dot2} ${active === i ? styles.dotActive : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button 
          className={styles.navBtn} 
          onClick={() => setActive((prev) => (prev + 1) % length)}
        >
          →
        </button>
      </div>
    </div>
  );
}
