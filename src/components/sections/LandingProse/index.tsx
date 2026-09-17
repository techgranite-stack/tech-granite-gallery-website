import type { ProseBlock } from '@/lib/landing-pages-data';
import styles from './LandingProse.module.css';

/**
 * Renders one prose block from a landing page's content model: an H2, body
 * paragraphs, and an optional definition list.
 *
 * Deliberately a server component with no animation library. These blocks carry
 * the indexable copy that the landing pages previously had none of, so the text
 * must be present in the server-rendered HTML rather than arriving after
 * hydration.
 */
export default function LandingProse({ block }: { block: ProseBlock }) {
  return (
    <section
      id={block.id}
      className={`${styles.section} ${block.dark ? styles.dark : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.header}>
            {block.eyebrow && (
              <span className={`section-eyebrow ${styles.eyebrow}`}>
                {block.eyebrow}
              </span>
            )}
            <h2 className={styles.title}>
              {block.heading}
              {block.headingEm && (
                <>
                  {' '}
                  <em>{block.headingEm}</em>
                </>
              )}
            </h2>
          </div>

          <div>
            <div className={styles.body}>
              {block.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {block.bullets && block.bullets.length > 0 && (
              <dl className={styles.bullets}>
                {block.bullets.map((b) => (
                  <div key={b.title} className={styles.bullet}>
                    <dt className={styles.bulletTitle}>{b.title}</dt>
                    <dd className={styles.bulletText}>{b.text}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
