import Image from 'next/image';
import { getGoogleReviews, type GetGoogleReviewsOptions } from '@/lib/google-reviews';
import Stars, { GoogleGlyph } from './Stars';
import ReviewCard from './ReviewCard';
import ReviewsCarousel from './ReviewsCarousel';
import styles from './GoogleReviews.module.css';

export interface GoogleReviewsProps extends GetGoogleReviewsOptions {
  eyebrow?: string;
  title?: string;
  /** Italicised word(s) inside the title, rendered in copper. */
  titleAccent?: string;
  description?: string;
  /** Secondary CTA next to "Read more Google reviews". Pass null to hide. */
  secondaryCta?: { label: string; href: string } | null;
  /** Section background. */
  tone?: 'ivory' | 'white';
  id?: string;
}

/**
 * <GoogleReviews />  — self-contained, drop-in social-proof section.
 * Features an architectural trust ribbon and full-width verified review carousel.
 */
export default function GoogleReviews({
  eyebrow = 'Google Reviews',
  title = 'Trusted by Customers',
  titleAccent = 'Across India',
  description = 'Real feedback from architects, builders and homeowners who visited our Kishangarh facility, walked through full slabs, and chose stone for their projects.',
  secondaryCta = null,
  tone = 'ivory',
  id = 'google-reviews',
  ...fetchOptions
}: GoogleReviewsProps) {
  const data = getGoogleReviews(fetchOptions);
  const hasCards = data.reviews.length > 0;

  return (
    <section
      id={id}
      className={`${styles.section} ${tone === 'white' ? styles.toneWhite : ''}`}
      aria-labelledby={`${id}-title`}
    >
      {/* Background Khatamband lattice & stone watermark */}
      <div className={styles.textureOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 id={`${id}-title`} className="section-title">
            {title} <em>{titleAccent}</em>
          </h2>
          <p className="section-desc centered">{description}</p>

          {/* ── Architectural Trust Ribbon ── */}
          <div className={styles.trustRibbon}>
            <Image
              src="/Logo-black.png"
              alt={data.placeName}
              width={128}
              height={36}
              className={styles.ribbonLogo}
            />
            <span className={styles.ribbonDivider} aria-hidden="true" />
            <div className={styles.ribbonRating}>
              <GoogleGlyph size={18} />
              <span className={styles.ribbonScore}>{data.rating.toFixed(1)}</span>
              <Stars rating={data.rating} size={15} />
              <span className={styles.ribbonCount}>
                ({data.totalReviews.toLocaleString('en-IN')} Google Reviews)
              </span>
            </div>
            <span className={styles.ribbonDivider} aria-hidden="true" />
            <a
              href={data.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ribbonWriteBtn}
            >
              Write a Review <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        {/* ── Review Cards Carousel (Full Width) ── */}
        {hasCards && (
          <div className={styles.carouselContainer}>
            <ReviewsCarousel>
              {data.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </ReviewsCarousel>
          </div>
        )}

        <div className={styles.ctas}>
          <a
            href={data.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaOutline}
          >
            <GoogleGlyph size={16} />
            Read More Google Reviews <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
