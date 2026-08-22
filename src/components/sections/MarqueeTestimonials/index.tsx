'use client';
import { useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import { TestimonialItem } from '@/types';
import styles from './MarqueeTestimonials.module.css';

interface ExtendedTestimonialItem extends TestimonialItem {
  initial: string;
}

interface MarqueeTestimonialsProps {
  testimonials: ExtendedTestimonialItem[];
}

function TestimonialCard({ t }: { t: ExtendedTestimonialItem }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.avatar}>{t.initial}</div>
        <svg
          className={styles.quoteIcon}
          viewBox="0 0 40 30"
          fill="currentColor"
          width="36"
          height="27"
          aria-hidden="true"
        >
          <path d="M0 30V18.75C0 8.125 6.458 2.083 19.375 0l2.083 3.542C15.139 4.931 11.736 7.778 10.417 12.5H17.5V30H0zm22.5 0V18.75C22.5 8.125 28.958 2.083 41.875 0l2.083 3.542C37.639 4.931 34.236 7.778 32.917 12.5H40V30H22.5z" />
        </svg>
      </div>

      <p className={styles.quoteText}>&ldquo;{t.text}&rdquo;</p>

      <div className={styles.author}>
        <div className={styles.authorDivider} />
        <strong className={styles.name}>{t.author}</strong>
        <span className={styles.role}>{t.role}</span>
      </div>
    </div>
  );
}

/** Touch-friendly marquee row — tap/touch pauses the animation */
function MarqueeRow({
  items,
  direction,
  speed = 40,
}: {
  items: ExtendedTestimonialItem[];
  direction: 'left' | 'right';
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  return (
    <div
      className={styles.marqueeWrap}
      /* Desktop: hover pauses */
      onMouseEnter={pause}
      onMouseLeave={resume}
      /* Mobile: tap/touch pauses; lifting resumes */
      onTouchStart={pause}
      onTouchEnd={resume}
      onTouchCancel={resume}
    >
      <div
        ref={trackRef}
        className={`${styles.marqueeTrack} ${direction === 'left' ? styles.trackLeft : styles.trackRight}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((t, i) => (
          <div key={i} className={styles.cardWrap}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeTestimonials({ testimonials }: MarqueeTestimonialsProps) {
  const row1 = testimonials;
  const row2 = [...testimonials].reverse();

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.header}>
        <Reveal animation="fade-up">
          <span className="section-eyebrow">Client Voices</span>
          <h2 className="section-title">What Our Clients <em>Say</em></h2>
          <p className="section-desc centered">
            Stories of spaces transformed through stone.
          </p>
        </Reveal>
      </div>

      {/* Row 1 — scrolls left */}
      <MarqueeRow items={row1} direction="left" speed={38} />

      <div className={styles.rowGap} />

      {/* Row 2 — scrolls right */}
      <MarqueeRow items={row2} direction="right" speed={44} />
    </section>
  );
}
