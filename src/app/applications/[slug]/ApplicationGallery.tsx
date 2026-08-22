'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './ApplicationGallery.module.css';

interface ApplicationGalleryProps {
  images: string[];
  title: string;
  /** Auto-advance interval in ms */
  interval?: number;
}

export default function ApplicationGallery({ images, title, interval = 4000 }: ApplicationGalleryProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const prevSlide = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(nextSlide, interval);
    return () => clearInterval(id);
  }, [images.length, paused, interval, nextSlide]);

  // Sync thumbnail scroll position
  useEffect(() => {
    if (!thumbStripRef.current) return;
    const activeThumb = thumbStripRef.current.children[index] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [index]);

  if (images.length === 0) return null;

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const diffX = mouseStartX.current - e.clientX;
    mouseStartX.current = null;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-eyebrow">Gallery</span>
          <h2 className={styles.title}>
            {title} <em>In Real Spaces</em>
          </h2>
          <p className={styles.sub}>
            A closer look at how {title.toLowerCase()} comes together in finished projects.
          </p>
        </div>

        {/* Main Slideshow */}
        <div
          className={styles.slideshow}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`${styles.slide} ${i === index ? styles.slideActive : ''}`}
              aria-hidden={i !== index}
            >
              <Image
                src={img}
                alt={`${title} — sample ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 1100px"
                className={styles.slideImg}
              />
            </div>
          ))}

          {/* Left Arrow Button */}
          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.arrowBtn} ${styles.arrowPrev}`}
              onClick={prevSlide}
              aria-label="Previous image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Right Arrow Button */}
          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.arrowBtn} ${styles.arrowNext}`}
              onClick={nextSlide}
              aria-label="Next image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Bottom Dots Indicator */}
          {images.length > 1 && (
            <div className={styles.dots}>
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Show sample ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Physical Thumbnail Scroll Strip */}
        {images.length > 1 && (
          <div className={styles.thumbWrap}>
            <button
              type="button"
              className={styles.thumbArrow}
              onClick={prevSlide}
              aria-label="Scroll thumbnails left"
            >
              ‹
            </button>
            <div className={styles.thumbStrip} ref={thumbStripRef}>
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.thumbBtn} ${i === index ? styles.thumbActive : ''}`}
                  onClick={() => setIndex(i)}
                >
                  <Image
                    src={img}
                    alt={`${title} thumb ${i + 1}`}
                    fill
                    sizes="120px"
                    className={styles.thumbImg}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.thumbArrow}
              onClick={nextSlide}
              aria-label="Scroll thumbnails right"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
