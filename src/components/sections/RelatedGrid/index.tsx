import Link from 'next/link';
import Image from 'next/image';
import styles from './RelatedGrid.module.css';

export interface RelatedGridItem {
  href: string;
  image: string;
  category: string;
  name: string;
  sub: string;
}

interface RelatedGridProps {
  eyebrow: string;
  title: string;
  titleEm?: string;
  items: RelatedGridItem[];
}

/**
 * "Explore more" card grid — the same visual pattern as the project detail
 * page's "Our Legacy — Explore More Landmark Portfolio" section. Reused for
 * cross-linking (e.g. Other Applications).
 */
export default function RelatedGrid({ eyebrow, title, titleEm, items }: RelatedGridProps) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className={styles.title}>
            {title} {titleEm && <em>{titleEm}</em>}
          </h2>
        </div>

        <div className={styles.grid}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className={styles.card}>
              <div className={styles.imgWrap}>
                <Image
                  src={it.image}
                  alt={it.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.overlay} />
              <div className={styles.content}>
                <span className={styles.category}>{it.category}</span>
                <p className={styles.name}>{it.name}</p>
                <p className={styles.sub}>{it.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
