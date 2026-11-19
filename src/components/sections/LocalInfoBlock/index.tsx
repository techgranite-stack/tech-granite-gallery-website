'use client';

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Navigation,
  Plane,
  Train,
  Car,
  Copy,
  Check,
} from 'lucide-react';
import type { LandingLocalInfo } from '@/lib/landing-pages-data';
import { siteConfig } from '@/config/site';
import { addressOneLine } from '@/data/local-seo';
import styles from './LocalInfoBlock.module.css';

function getDirectionIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('air') || l.includes('flight') || l.includes('plane')) {
    return <Plane size={15} className={styles.directionIcon} aria-hidden="true" />;
  }
  if (l.includes('rail') || l.includes('train') || l.includes('station')) {
    return <Train size={15} className={styles.directionIcon} aria-hidden="true" />;
  }
  return <Car size={15} className={styles.directionIcon} aria-hidden="true" />;
}

export default function LocalInfoBlock({ info }: { info: LandingLocalInfo }) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(addressOneLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

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
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Kishangarh Yard Open Today · Mon–Sat 9AM–7PM</span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* ── Left Column: NAP card + Travel Directions ── */}
          <div>
            <div className={`${styles.card} h-card`}>
              <div className={styles.cardTopRow}>
                <div className={styles.napLabel}>Visit / Contact</div>
                <div className={styles.yardChip}>
                  <span className={styles.statusDot} style={{ width: 6, height: 6 }} aria-hidden="true" />
                  <span>Live Yard Access</span>
                </div>
              </div>

              <div className={`${styles.napName} p-name`}>{siteConfig.name}</div>

              <div className={styles.rowsList}>
                <a
                  href={siteConfig.links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.napRow} p-adr h-adr`}
                >
                  <div className={styles.iconCircle}>
                    <MapPin size={17} aria-hidden="true" />
                  </div>
                  <div className={styles.rowText}>
                    <span className={styles.rowLabel}>Mandi Processing Yard</span>
                    <span className="p-street-address">{addressOneLine}</span>
                  </div>
                </a>

                <a href={`tel:${siteConfig.links.phoneRaw}`} className={`${styles.napRow} p-tel`}>
                  <div className={styles.iconCircle}>
                    <Phone size={17} aria-hidden="true" />
                  </div>
                  <div className={styles.rowText}>
                    <span className={styles.rowLabel}>Direct Yard Inquiries</span>
                    <span>{siteConfig.links.phone}</span>
                  </div>
                </a>

                <a href={`mailto:${siteConfig.links.email}`} className={`${styles.napRow} u-email`}>
                  <div className={styles.iconCircle}>
                    <Mail size={17} aria-hidden="true" />
                  </div>
                  <div className={styles.rowText}>
                    <span className={styles.rowLabel}>Architectural Desk</span>
                    <span>{siteConfig.links.email}</span>
                  </div>
                </a>
              </div>

              {/* Action Buttons */}
              <div className={styles.cardActions}>
                <a
                  href={siteConfig.links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                >
                  <Navigation size={14} aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className={styles.secondaryBtn}
                  aria-label="Copy yard address"
                >
                  {copied ? (
                    <>
                      <Check size={14} style={{ color: '#10B981' }} aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} aria-hidden="true" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── Transit Route Cards ── */}
            <div className={styles.directions}>
              {info.directions.map((d) => (
                <div key={d.label} className={styles.directionCard}>
                  <div className={styles.directionHeader}>
                    {getDirectionIcon(d.label)}
                    <span>{d.label}</span>
                  </div>
                  <p className={styles.directionText}>{d.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Interactive Map & Logistics Features ── */}
          <div className={styles.mapContainer}>
            <div className={styles.mapTopBar}>
              <span className={styles.mapLiveTag}>
                <MapPin size={13} aria-hidden="true" />
                <span>GPS: Kishangarh Marble Market Corridor</span>
              </span>
              <a
                href={siteConfig.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

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

            {/* Facility Advantages Strip */}
            <div className={styles.mapPills}>
              <div className={styles.mapPill}>
                <span className={styles.mapPillDot}>✦</span>
                <span>Free Cut-to-Size Slab Samples</span>
              </div>
              <div className={styles.mapPill}>
                <span className={styles.mapPillDot}>✦</span>
                <span>100+ Live Inspected Quarry Lots</span>
              </div>
              <div className={styles.mapPill}>
                <span className={styles.mapPillDot}>✦</span>
                <span>Heavy Crane Trailer Loading On-Site</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
