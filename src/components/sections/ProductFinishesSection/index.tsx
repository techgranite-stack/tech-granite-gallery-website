import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { StoneProduct } from '@/types/stone';
import { finishesData, type Finish } from '@/lib/finish-data';
import { CANONICAL_FINISH_MAP } from '@/lib/product-detail';
import styles from './ProductFinishesSection.module.css';

interface ProductFinishesSectionProps {
  product: StoneProduct;
  materialName?: string;
}

export default function ProductFinishesSection({
  product,
  materialName,
}: ProductFinishesSectionProps) {
  const matLabel =
    materialName
      ? materialName.charAt(0).toUpperCase() + materialName.slice(1)
      : product.category === 'imported-marble'
      ? 'Marble'
      : product.category.charAt(0).toUpperCase() + product.category.slice(1);

  // Map product.finishes to full Finish objects from finishesData
  const resolvedFinishes: {
    slug: string;
    name: string;
    textureLabel: string;
    image: string;
  }[] = [];

  const seenSlugs = new Set<string>();

  for (const f of product.finishes || []) {
    const canonicalSlug = CANONICAL_FINISH_MAP[f.id] || f.id;
    if (seenSlugs.has(canonicalSlug)) continue;
    seenSlugs.add(canonicalSlug);

    const finObj = finishesData.find((fd) => fd.slug === canonicalSlug);
    if (finObj) {
      const textureUpper = finObj.texture ? `${finObj.texture.toUpperCase()} SURFACE` : 'ARCHITECTURAL SURFACE';
      resolvedFinishes.push({
        slug: finObj.slug,
        name: f.label || finObj.name,
        textureLabel: textureUpper,
        image: finObj.image,
      });
    }
  }

  // Fallback: If stone has fewer than 4 finishes, fill with standard architectural finishes
  if (resolvedFinishes.length < 4) {
    for (const finObj of finishesData) {
      if (resolvedFinishes.length >= 4) break;
      if (!seenSlugs.has(finObj.slug)) {
        seenSlugs.add(finObj.slug);
        const textureUpper = finObj.texture ? `${finObj.texture.toUpperCase()} SURFACE` : 'ARCHITECTURAL SURFACE';
        resolvedFinishes.push({
          slug: finObj.slug,
          name: finObj.name,
          textureLabel: textureUpper,
          image: finObj.image,
        });
      }
    }
  }

  // Display top 4 finishes (or all if up to 6)
  const displayFinishes = resolvedFinishes.slice(0, 4);

  return (
    <section className={styles.finishesSection} id="product-finishes">
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`section-eyebrow ${styles.eyebrow}`}>AVAILABLE FINISHES</span>
          <h2 className={styles.title}>
            Available Finishes for <em>{product.name} {matLabel}</em>
          </h2>
        </div>

        <div className={styles.grid}>
          {displayFinishes.map((f) => (
            <Link
              key={f.slug}
              href={`/finishes/${f.slug}`}
              className={styles.card}
              title={`View ${f.name} details`}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={f.image}
                  alt={`${product.name} in ${f.name} finish`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.overlay} />
              <div className={styles.content}>
                <p className={styles.name}>{f.name}</p>
                <p className={styles.sub}>{f.textureLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
