'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StoneBackground.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoneBackgroundProps {
  texture?: 'marble' | 'granite' | 'onyx';
  opacity?: number;
  parallaxSpeed?: number;
  enableWatermark?: boolean;
}

export default function StoneBackground({
  texture = 'marble',
  opacity = 0.08,
  parallaxSpeed = 0.15,
  enableWatermark = false,
}: StoneBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const textureMap = {
    marble: '/images/stones/statuario/statuario_stand.webp',
    granite: '/images/stones/black-galaxy/black-galaxy_stand.webp',
    onyx: '/images/stones/honey-onyx/honey-onyx_stand.webp',
  };

  useGSAP(() => {
    if (!imgRef.current) return;

    gsap.to(imgRef.current, {
      yPercent: 15 * parallaxSpeed * 10,
      ease: 'none',
      scrollTrigger: {
        trigger: bgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: bgRef });

  return (
    <div ref={bgRef} className={styles.stoneBg}>
      <div
        ref={imgRef}
        className={styles.imageWrap}
        style={{ opacity }}
      >
        <Image
          src={textureMap[texture]}
          alt="Stone Texture"
          fill
          className={styles.image}
          sizes="100vw"
        />
      </div>

      {enableWatermark && (
        <div className={styles.watermark}>
          <span>GG</span>
        </div>
      )}

      {/* Vignette/Gradients to blend with section content */}
      <div className={styles.overlay} />
    </div>
  );
}
