import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import type { LandingLocalInfo } from '@/lib/landing-pages-data';
import { siteConfig } from '@/config/site';
import { addressOneLine } from '@/data/local-seo';
import styles from './LocalInfoBlock.module.css';

/**
 * The on-page half of local SEO: a machine-readable NAP block, real travel
 * directions, the areas actually served, and an embedded map.
 *
 * Schema alone does not rank a business locally — Google cross-checks the
 * structured data against visible page content and against the Google Business
 * Profile. Before this component the address existed on the site only as footer
 * text and inside a maps URL, so no page could corroborate its own schema.
 *
 * The address is marked up with the hCard-style `h-adr` / `p-*` microformat
 * classes alongside the JSON-LD. They cost nothing, and several local-citation
 * crawlers still read them.
 */
export default function LocalInfoBlock({ info }: { info: LandingLocalInfo }) {
  return (
    <section id="find-us" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-eyebrow">{info.eyebrow}</span>
          <h2 className={styles.title}>
            {info.heading}
            {info.headingEm && (
              <>
                {' '}
                <em>{info.headingEm}</em>
              </>
            )}
          </h2>
          <p className={styles.intro}>{info.intro}</p>
        </div>

        <div className={styles.grid}>
          {/* ── NAP + directions ── */}
          <div>
            <div className={`${styles.card} h-card`}>
              <div className={styles.napLabel}>Visit / Contact</div>
              <div className={`${styles.napName} p-name`}>{siteConfig.name}</div>

              <a
                href={siteConfig.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.napRow} p-adr h-adr`}
              >
                <MapPin size={16} className={styles.napIcon} aria-hidden="true" />
                <span className="p-street-address">{addressOneLine}</span>
              </a>

              <a href={`tel:${siteConfig.links.phoneRaw}`} className={`${styles.napRow} p-tel`}>
                <Phone size={16} className={styles.napIcon} aria-hidden="true" />
                <span>{siteConfig.links.phone}</span>
              </a>

              <a href={`mailto:${siteConfig.links.email}`} className={`${styles.napRow} u-email`}>
                <Mail size={16} className={styles.napIcon} aria-hidden="true" />
                <span>{siteConfig.links.email}</span>
              </a>
            </div>

            <div className={styles.directions}>
              {info.directions.map((d) => (
                <div key={d.label} className={styles.direction}>
                  <div className={styles.directionLabel}>{d.label}</div>
                  <p className={styles.directionText}>{d.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Map ── */}
          <div>
            <div className={styles.mapWrap}>
              <iframe
                src={info.mapEmbedUrl}
                title={`Map showing ${siteConfig.name} at ${addressOneLine}`}
                className={styles.map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={siteConfig.links.maps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Open in Google Maps
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
