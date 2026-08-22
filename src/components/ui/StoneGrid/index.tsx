'use client';
import styles from './StoneGrid.module.css';

interface StoneGridProps {
  pattern?: 'square' | 'asymmetric' | 'luxury';
  opacity?: number;
  className?: string;
}

export default function StoneGrid({
  pattern = 'square',
  opacity = 0.12,
  className = '',
}: StoneGridProps) {
  return (
    <div 
      className={`${styles.gridContainer} ${styles[pattern]} ${className}`}
      style={{ opacity } as React.CSSProperties}
    >
      <div className={styles.lines}>
        {/* We generate the grid lines via CSS background-image for maximum performance */}
      </div>
    </div>
  );
}
