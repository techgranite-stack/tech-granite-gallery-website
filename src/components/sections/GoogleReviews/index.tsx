import Link from 'next/link';
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
  /** Business thumbnail shown in the summary panel. */
  thumbnail?: string;
  /** Secondary CTA next to "Read more Google reviews". Pass null to hide. */
  secondaryCta?: { label: string; href: string } | null;
  /** Section background. */
  tone?: 'ivory' | 'white';
  id?: string;
}

/**
 * <GoogleReviews />  — self-contained, drop-in social-proof section.
 *
 *   <GoogleReviews />                                   // homepage defaults
 *   <GoogleReviews tone="white" limit={3} secondaryCta={null} />
 *
 * Server component. Reviews are curated by hand in src/data/google-reviews.ts;
 * rating/count come from src/data/local-seo.ts. No API, no runtime fetch.
 */
export default function GoogleReviews({
  eyebrow = 'Google Reviews',
  title = 'Trusted by Customers',
  titleAccent = 'Across India',
  description = 'Real feedback from architects, builders and homeowners who visited our Kishangarh facility, walked through full slabs, and chose stone for their projects.',
  thumbnail = '/images/hero/granite-gallery-marble-granite-sandstone.webp',
  secondaryCta = { label: 'Get a Quote', href: '/contact' },
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
        </header>

        <div className={`${styles.layout} ${hasCards ? '' : styles.layoutSolo}`}>
          {/* ── Summary panel ── */}
          <aside className={styles.summary}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt=""
              width={64}
              height={48}
              loading="lazy"
              className={styles.summaryThumb}
            />
            <div className={styles.summaryBody}>
              <strong className={styles.summaryName}>{data.placeName}</strong>
              <div className={styles.summaryRating}>
                <span className={styles.summaryScore}>{data.rating.toFixed(1)}</span>
                <Stars rating={data.rating} size={18} />
              </div>
              <span className={styles.summaryCount}>
                {data.totalReviews.toLocaleString('en-IN')} Google reviews
              </span>
              <a
                href={data.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.writeBtn}
              >
                Write a review
              </a>
            </div>
          </aside>

          {/* ── Review cards ── */}
          {hasCards && (
            <ReviewsCarousel>
              {data.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </ReviewsCarousel>
          )}
        </div>

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
          {secondaryCta && (
            <Link href={secondaryCta.href} className={styles.ctaSolid}>
              {secondaryCta.label} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* Elegant transition gradient melting into the following dark mahogany section */}
      <div className={styles.bottomTransition} aria-hidden="true" />
    </section>
  );
}
