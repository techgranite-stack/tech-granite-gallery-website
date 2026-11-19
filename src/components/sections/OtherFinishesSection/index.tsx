import Link from 'next/link';
import Image from 'next/image';
import { finishesData } from '@/lib/finish-data';
import styles from './OtherFinishesSection.module.css';

interface OtherFinishesSectionProps {
  currentSlug: string;
}

export default function OtherFinishesSection({ currentSlug }: OtherFinishesSectionProps) {
  // Normalize current slug (e.g., if 'leathered', exclude it)
  const normalizedCurrent = currentSlug.toLowerCase();
  const related = finishesData
    .filter((f) => f.slug !== normalizedCurrent)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className={styles.relatedSection} id="other-finishes">
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.relatedHeader}>
          <span className={`section-eyebrow ${styles.eyebrow}`}>OTHER FINISHES</span>
          <h2 className={styles.sectionTitle}>
            Explore More <em>Finishes</em>
          </h2>
        </div>

        <div className={styles.relatedGrid}>
          {related.map((f) => (
            <Link key={f.slug} href={`/finishes/${f.slug}`} className={styles.relatedCard}>
              <div className={styles.relatedImgWrap}>
                <Image
                  src={f.image}
                  alt={f.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className={styles.relatedImg}
                />
              </div>
              <div className={styles.relatedOverlay} />
              <div className={styles.relatedContent}>
                <p className={styles.relatedName}>{f.name}</p>
                <p className={styles.relatedSub}>{f.texture} surface</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
