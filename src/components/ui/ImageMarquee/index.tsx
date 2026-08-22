'use client';
import Image from 'next/image';
import styles from './ImageMarquee.module.css';

interface ImageMarqueeProps {
  images: { src: string; alt: string; width?: number; height?: number }[];
  speed?: number; // In seconds, e.g. 30
  direction?: 'left' | 'right';
  className?: string;
}

export default function ImageMarquee({ 
  images, 
  speed = 40, 
  direction = 'left',
  className = ''
}: ImageMarqueeProps) {
  // Triple the array to ensure smooth infinite looping without gaps
  const repeatedImages = [...images, ...images, ...images];

  return (
    <div className={`${styles.strip} ${className}`}>
      <div 
        className={styles.track} 
        style={{ 
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal'
        }}
      >
        {repeatedImages.map((img, i) => (
          <div key={i} className={styles.item}>
            <Image 
              src={img.src} 
              alt={img.alt} 
              width={img.width || 300} 
              height={img.height || 200} 
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
