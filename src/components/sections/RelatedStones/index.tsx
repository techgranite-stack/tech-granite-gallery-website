import Link from 'next/link';
import StoneCard from '@/components/ui/StoneCard';
import Reveal from '@/components/ui/Reveal';
import type { StoneProduct } from '@/types/stone';
import { categoryPath } from '@/types/stone';
import { fromStoneProduct } from '@/lib/listing-item';
import styles from './RelatedStones.module.css';

interface RelatedStonesProps {
  product: StoneProduct;
  byColor: StoneProduct[];
  byCategory: StoneProduct[];
}

export default function RelatedStones({ product, byColor, byCategory }: RelatedStonesProps) {
  const catPath = categoryPath(product.category);
  const colorLabel = product.colorFamily[0].charAt(0).toUpperCase() + product.colorFamily[0].slice(1);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* More in this color */}
        {byColor.length > 0 && (
          <div className={styles.group}>
            <Reveal animation="fade-up">
              <div className={styles.groupHeader}>
                <div>
                  <span className={styles.eyebrow}>More Like This</span>
                  <h2 className={styles.heading}>Other <em>{colorLabel}</em> Stones</h2>
                </div>
                <Link href={`/${catPath}?color=${product.colorFamily[0]}`} className={styles.viewAll}>
                  View all {colorLabel} →
                </Link>
              </div>
            </Reveal>
            <div className={styles.grid}>
              {byColor.map((p, i) => (
                <Reveal key={p.slug} animation="fade-up" delay={i * 0.08}>
                  <StoneCard product={fromStoneProduct(p)} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Similar in category */}
        {byCategory.length > 0 && (
          <div className={styles.group}>
            <Reveal animation="fade-up">
              <div className={styles.groupHeader}>
                <div>
                  <span className={styles.eyebrow}>Same Category</span>
                  <h2 className={styles.heading}>
                    More <em>
                      {product.category === 'imported-marble' ? 'Imported Marble'
                        : product.category === 'marble' ? 'Indian Marble'
                        : 'Granite'}
                    </em>
                  </h2>
                </div>
                <Link href={`/${catPath}`} className={styles.viewAll}>
                  Browse all →
                </Link>
              </div>
            </Reveal>
            <div className={styles.grid}>
              {byCategory.map((p, i) => (
                <Reveal key={p.slug} animation="fade-up" delay={i * 0.08}>
                  <StoneCard product={fromStoneProduct(p)} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
