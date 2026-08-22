import styles from './ScrollingTagline.module.css';

interface ScrollingTaglineProps {
  items: string[];
}

export default function ScrollingTagline({ items }: ScrollingTaglineProps) {
  // Duplicate for seamless loop if items count is small
  const repeated = [...items, ...items, ...items];

  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        {repeated.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.gem}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
