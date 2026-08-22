'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './project.module.css';

interface ProjectGalleryProps {
  images: string[];
  title: string;
  /** Auto-advance interval in ms */
  interval?: number;
}

export default function ProjectGallery({ images, title, interval = 3000 }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, paused, interval]);

  if (images.length === 0) return null;

  return (
    <div
      className={styles.slideshow}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === index ? styles.slideActive : ''}`}
          aria-hidden={i !== index}
        >
          <Image
            src={img}
            alt={`${title} — view ${i + 1}`}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={styles.slideImg}
          />
        </div>
      ))}

      {images.length > 1 && (
        <div className={styles.slideDots}>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.slideDot} ${i === index ? styles.slideDotActive : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
