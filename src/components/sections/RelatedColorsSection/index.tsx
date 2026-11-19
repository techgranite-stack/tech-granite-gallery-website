import Link from 'next/link';
import { colorPages } from '@/data/stone-index';
import type { ColorFamily } from '@/types/stone';
import styles from './RelatedColorsSection.module.css';

const SWATCH_HEX: Record<ColorFamily, string> = {
  white: '#f5f5f0',
  black: '#1f1f1f',
  grey: '#9e9e9e',
  pink: '#e8a598',
  red: '#a93226',
  green: '#27ae60',
  brown: '#795548',
  blue: '#2980b9',
  yellow: '#f1c40f',
  beige: '#d7ccc8',
  multi: '#b0bec5',
};

interface RelatedColorsSectionProps {
  currentColor?: string;
  currentSlug?: string;
}

export default function RelatedColorsSection({
  currentColor,
  currentSlug,
}: RelatedColorsSectionProps) {
  const normColor = currentColor?.toLowerCase();
  const normSlug = currentSlug?.toLowerCase();

  const filteredPages = colorPages.filter(
    (cp) => cp.color !== normColor && cp.slug !== normSlug
  );

  return (
    <section className={styles.relatedColorsSection} id="stone-colors">
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.relatedColorsInner}>
        <span className={`section-eyebrow ${styles.eyebrow}`}>PALETTE VARIETY</span>
        <h2 className={styles.relatedColorsTitle}>Explore Other Stone Colors</h2>
        <div className={styles.colorsGrid}>
          {filteredPages.map((cp) => (
            <Link key={cp.slug} href={`/${cp.slug}`} className={styles.colorCard}>
              <span
                className={styles.colorSwatch}
                style={{ backgroundColor: SWATCH_HEX[cp.color] || '#ccc' }}
              />
              <span>{cp.title.replace(/ Collection$/, '')}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
