import type { GoogleReview } from '@/lib/google-reviews';
import Stars, { GoogleGlyph } from './Stars';
import styles from './GoogleReviews.module.css';

// Warm, on-brand avatar tints for reviewers without a Google profile photo.
const AVATAR_TINTS = ['#B5452A', '#C08552', '#8C5A3C', '#6B7F5A', '#4B6C8C', '#7A5C8C'];

function tintFor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash + ch.charCodeAt(0)) % AVATAR_TINTS.length;
  return AVATAR_TINTS[hash];
}

export default function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.authorName.trim().charAt(0).toUpperCase() || 'G';

  const avatar = review.authorPhoto ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={review.authorPhoto}
      alt=""
      width={42}
      height={42}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={styles.avatarImg}
    />
  ) : (
    <span className={styles.avatar} style={{ background: tintFor(review.authorName) }}>
      {initial}
    </span>
  );

  const name = review.authorUrl ? (
    <a
      href={review.authorUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={styles.authorName}
    >
      {review.authorName}
    </a>
  ) : (
    <span className={styles.authorName}>{review.authorName}</span>
  );

  return (
    <article className={styles.card}>
      <header className={styles.cardHead}>
        {avatar}
        <div className={styles.cardWho}>
          {name}
          {review.relativeTime && <span className={styles.cardTime}>{review.relativeTime}</span>}
        </div>
        <span className={styles.cardGoogle} title="Posted on Google">
          <GoogleGlyph size={18} />
        </span>
      </header>

      {/* Numerical rating + 5 Stars + Verified Google badge */}
      <div className={styles.ratingRow}>
        <span className={styles.ratingScore}>{review.rating.toFixed(1)}</span>
        <Stars rating={review.rating} size={15} />
        <span className={styles.verifiedBadge} title="Verified Google Review">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="#1a73e8" aria-hidden="true">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        </span>
      </div>

      <p className={styles.cardText}>{review.text}</p>
    </article>
  );
}
