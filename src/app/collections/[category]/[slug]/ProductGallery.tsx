'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './product.module.css';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove('lightbox-open');
    };
  }, [openIndex, close, showPrev, showNext]);

  const mainSrc = images[0];
  const thumbs = images.slice(1, 3);

  return (
    <div className={styles.right}>
      <button
        type="button"
        className={styles.mainImg}
        onClick={() => setOpenIndex(0)}
        data-cursor="zoom"
        aria-label={`View ${name} full image`}
      >
        <Image
          src={mainSrc}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.mainImgInner}
        />
      </button>

      {thumbs.length > 0 && (
        <div className={styles.thumbRow}>
          {thumbs.map((img, i) => (
            <button
              type="button"
              key={i}
              className={styles.thumb}
              onClick={() => setOpenIndex(i + 1)}
              data-cursor="zoom"
              aria-label={`View ${name} image ${i + 2}`}
            >
              <Image
                src={img}
                alt={`${name} ${i + 2}`}
                fill
                sizes="25vw"
                className={styles.thumbImg}
              />
            </button>
          ))}
        </div>
      )}

      {mounted && openIndex !== null &&
        createPortal(
          <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={close}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={close}
              aria-label="Close"
            >
              &times;
            </button>

            {images.length > 1 && (
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
              >
                &#8249;
              </button>
            )}

            <div className={styles.lightboxStage} onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[openIndex]}
                alt={`${name} ${openIndex + 1}`}
                fill
                sizes="100vw"
                className={styles.lightboxImg}
              />
            </div>

            {images.length > 1 && (
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
              >
                &#8250;
              </button>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
