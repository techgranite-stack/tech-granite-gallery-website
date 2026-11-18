import type { ProseBlock } from '@/lib/landing-pages-data';
import styles from './LandingProse.module.css';

/**
 * Parses bullet text to detect leading price tags (e.g., "₹40 – ₹60 / sq ft. Minor natural...")
 * or short engineering metrics, separating them for high-impact visual display.
 */
function parseBulletContent(text: string) {
  const priceRegex = /^(₹[\d,]+(?:\s*(?:–|-|to)\s*₹?[\d,]+)?(?:\s*\/\s*sq\s*ft)?)\.?\s*(.*)$/i;
  const match = text.match(priceRegex);
  if (match && match[1]) {
    return {
      price: match[1].trim(),
      desc: match[2]?.trim() || null,
    };
  }
  return { price: null, desc: text };
}

interface LandingProseProps {
  block: ProseBlock;
  index?: number;
}

/**
 * Premium editorial section for landing pages.
 * Displays key architectural copywriting, quality grades, pricing tiers,
 * and physical specifications in a luxury card grid with responsive hierarchy.
 */
export default function LandingProse({ block, index = 0 }: LandingProseProps) {
  const isAlt = index % 2 === 1 && !block.dark;
  const isPricingBlock = block.id.includes('pricing') || block.id.includes('intro') || block.eyebrow?.toLowerCase().includes('pricing');

  return (
    <section
      id={block.id}
      className={`${styles.section} ${block.dark ? styles.dark : ''} ${isAlt ? styles.altSection : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Sticky Editorial Heading & Trust Marker */}
          <div className={styles.header}>
            {block.eyebrow && (
              <div className={styles.eyebrowRow}>
                <span className={styles.eyebrowDash}>—</span>
                <span className={`section-eyebrow ${styles.eyebrow}`}>
                  {block.eyebrow}
                </span>
                <span className={styles.eyebrowDash}>—</span>
              </div>
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

            {isPricingBlock && !block.dark && (
              <div className={styles.trustBadge}>
                <span className={styles.trustDot} />
                <span>
                  {index === 0
                    ? 'Kishangarh Mandi Verified • Ex-Factory Direct'
                    : '100% Calibrated Slabs • Uniform Lot Guarantee'}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Lead Body & Architectural Cards Grid */}
          <div className={styles.contentCol}>
            {block.body && block.body.length > 0 && (
              <div className={styles.body}>
                {block.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {block.bullets && block.bullets.length > 0 && (
              <dl
                className={`${styles.bullets} ${
                  block.bullets.length === 4 ? styles.grid2x2 : ''
                } ${block.bullets.length === 3 ? styles.grid3Col : ''}`}
              >
                {block.bullets.map((b, idx) => {
                  const { price, desc } = parseBulletContent(b.text);
                  const isShortMetric =
                    !price && b.text.length < 25 && /[\d%–<]/.test(b.text);
                  const isPremiumGrade =
                    b.title.toLowerCase().includes('premium') ||
                    b.title.toLowerCase().includes('export');

                  return (
                    <div
                      key={b.title}
                      className={`${styles.bulletCard} ${
                        isPremiumGrade ? styles.cardFeatured : ''
                      } ${isShortMetric ? styles.cardMetric : ''}`}
                    >
                      <dt className={styles.cardHeader}>
                        <span className={styles.cardIndex}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.cardTitle}>{b.title}</span>
                        {isPremiumGrade && (
                          <span className={styles.exportBadge}>EXPORT GRADE</span>
                        )}
                      </dt>

                      <dd className={styles.cardBody}>
                        {price && (
                          <div className={styles.priceHighlight}>
                            <span className={styles.priceValue}>{price}</span>
                          </div>
                        )}

                        {isShortMetric ? (
                          <div className={styles.metricCallout}>
                            <span className={styles.metricValue}>{b.text}</span>
                          </div>
                        ) : (
                          desc && <p className={styles.cardDesc}>{desc}</p>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
