import Link from 'next/link';
import Image from 'next/image';
import { Finish } from '@/lib/finish-data';
import styles from './FinishAboutSection.module.css';

interface FinishAboutSectionProps {
  finish: Finish;
  isLapatro?: boolean;
  materialName?: string;
  locationName?: string;
}

export default function FinishAboutSection({
  finish,
  isLapatro = false,
  materialName = 'Granite',
  locationName,
}: FinishAboutSectionProps) {
  const displayTitle = isLapatro
    ? 'Lapatro (Leathered) Surface Finish'
    : (finish.pageTitle ?? `${finish.name} Surface Finish`);

  const displayLabel = isLapatro ? 'Lapatro Finish' : finish.name;

  const matTitle = materialName.charAt(0).toUpperCase() + materialName.slice(1);
  const locTitle = locationName ? locationName.charAt(0).toUpperCase() + locationName.slice(1) : undefined;

  const whatsappMessage = `Hello Granite Gallery, I would like to inquire about ${displayLabel} ${matTitle}${
    locTitle ? ` for ${locTitle}` : ''
  }.`;

  const whatsappUrl = `https://wa.me/919116622422?text=${encodeURIComponent(whatsappMessage)}`;

  // Dedicated description paragraphs (with specific Lapatro / Leather clarity if applicable)
  const lapatroIntroText =
    'Lapatro finish (widely recognized across the Kishangarh and Indian natural stone markets as leathered finish) is crafted by running high-speed diamond-embedded abrasive brushes across calibrated slabs. This specialized mechanical treatment removes softer mineral crystals while contouring natural veins, producing a warm, undulating tactile surface that is 100% non-reflective and slip-resistant.';

  const paragraphs = isLapatro
    ? [lapatroIntroText, finish.longDescription]
    : finish.longDescription.split('\n\n');

  return (
    <section className={styles.section} id="about-finish">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Comprehensive Technical & Aesthetic Overview */}
          <div className={styles.left}>
            <div className={styles.textBlock}>
              <span className="section-eyebrow">About This Finish</span>
              <h2 className={styles.sectionTitle}>{displayTitle}</h2>
              {paragraphs.map((para, i) => (
                <p key={i} className={styles.para}>
                  {para}
                </p>
              ))}
            </div>

            {/* Best For Stone Types */}
            {finish.bestFor && finish.bestFor.length > 0 && (
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>Best Stone Types</h3>
                <div className={styles.pills}>
                  {finish.bestFor.map((s) => (
                    <Link key={s} href={`/collections/${s}`} className={styles.pill}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ideal Applications */}
            {finish.applications && finish.applications.length > 0 && (
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>Ideal Applications</h3>
                <div className={styles.pills}>
                  {finish.applications.map((a) => (
                    <span key={a} className={`${styles.pill} ${styles.pillNeutral}`}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pros / Cons Comparison Grid */}
            <div className={styles.prosConsGrid}>
              <div className={styles.prosCons}>
                <h3 className={`${styles.groupTitle} ${styles.prosTitle}`}>✓ Advantages</h3>
                <ul className={styles.prosList}>
                  {finish.pros.map((p, i) => (
                    <li key={i} className={styles.prosItem}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.prosCons}>
                <h3 className={`${styles.groupTitle} ${styles.consTitle}`}>✗ Considerations</h3>
                <ul className={styles.consList}>
                  {finish.cons.map((c, i) => (
                    <li key={i} className={styles.consItem}>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Care & Maintenance Protocol */}
            {finish.careInstructions && (
              <div className={styles.careBlock}>
                <h3 className={styles.groupTitle}>Care & Maintenance</h3>
                <p className={styles.careText}>{finish.careInstructions}</p>
              </div>
            )}

            {/* Direct Consultation CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              <span>Discuss Your Finish Requirements</span>
            </a>
          </div>

          {/* Right Column: Texture Photo & Verified Stone Specs */}
          <div className={styles.right}>
            <div className={styles.mainImg}>
              <Image
                src={finish.image}
                alt={`${displayLabel} texture`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.mainImgInner}
              />
              <div className={styles.imgOverlay}>
                <span className={styles.finishLabel}>{displayLabel}</span>
              </div>
            </div>

            {/* Texture Info Summary Box */}
            <div className={styles.infoBox}>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Texture Type</span>
                <span className={styles.infoVal}>
                  {finish.texture.charAt(0).toUpperCase() + finish.texture.slice(1)}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Maintenance</span>
                <span className={styles.infoVal}>
                  {finish.maintenanceLevel.charAt(0).toUpperCase() + finish.maintenanceLevel.slice(1)}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Best Stones</span>
                <span className={styles.infoVal}>{finish.bestFor.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
