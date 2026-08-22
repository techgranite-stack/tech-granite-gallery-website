# Blueprint: Luxury Section

Use this blueprint when creating a new primary section (e.g., Hero, Why Us, Services).

## Component Structure
```tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './LuxurySection.module.css';

export default function LuxurySection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Ghost Number Animation
    // 2. Text Reveal Animation
    // 3. Image Parallax (Optional)
  }, { scope: containerRef });

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.inner}>
        {/* Ghost Backdrop */}
        <div className={styles.ghost}>01</div>
        
        {/* Content */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Subtitle</span>
          <h2 className={styles.title}>Main <em>Emphasis</em></h2>
        </div>
        
        {/* Grid/Body */}
        <div className={styles.grid}>...</div>
      </div>
    </section>
  );
}
```

## CSS Pattern
- Section padding: `clamp(4rem, 8vw, 10rem) 0`.
- Use `display: grid` for card layouts.
- Background: Variable `--bg-ivory`.
- Text: Variable `--text-dark`.
