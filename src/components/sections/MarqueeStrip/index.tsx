import styles from './MarqueeStrip.module.css';

interface MarqueeStripProps {
  items: string[];
  className?: string;
}

export default function MarqueeStrip({ items, className = '' }: MarqueeStripProps) {
  if (!items || items.length === 0) return null;

  // Duplicate items to ensure smooth continuous scrolling loop
  const displayItems = items.length < 12 ? [...items, ...items, ...items, ...items] : [...items, ...items];

  return (
    <div className={`${styles.marqueeWrap} ${className}`} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {displayItems.map((item, i) => (
          <span key={i} className={styles.marqueeItem}>
            <span className={styles.marqueeGem}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
