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
    return <Plane size={14} className={styles.directionIcon} aria-hidden="true" />;
  }
  if (l.includes('rail') || l.includes('train') || l.includes('station')) {
    return <Train size={14} className={styles.directionIcon} aria-hidden="true" />;
  }
  return <Car size={14} className={styles.directionIcon} aria-hidden="true" />;
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

  const whatsappUrl = `https://wa.me/919116622422?text=${encodeURIComponent(
    'Hello Granite Gallery, I would like to schedule a visit to your Kishangarh facility.'
  )}`;

  return (
    <section id="find-us" className={styles.section}>
      <div className={styles.container}>
        {/* Centered Editorial Header */}
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

        {/* ── Main Two-Column Grid: Left NAP Card + Right Interactive Map (Symmetrical & Aligned) ── */}
        <div className={styles.grid}>
          {/* Left Column: NAP Card */}
          <div className={`${styles.card} h-card`}>
            <div>
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

          {/* Right Column: Symmetrical Interactive Map Card */}
          <div className={`${styles.card} ${styles.mapCard}`}>
            <div className={styles.mapCardContent}>
              <div className={styles.cardTopRow}>
                <div className={styles.napLabel}>Facility Location</div>
                <div className={styles.yardChip}>
                  <MapPin size={11} aria-hidden="true" />
                  <span>Marble Market Corridor</span>
                </div>
              </div>

              <div className={styles.napName}>Interactive Yard Map</div>

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
            </div>

            {/* Action Buttons Aligned with Left Card */}
            <div className={styles.cardActions}>
              <a
                href={siteConfig.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <ExternalLink size={14} aria-hidden="true" />
                <span>Open in Google Maps</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                <Navigation size={14} aria-hidden="true" />
                <span>Share Location</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Visit Scheduling Terminal Box (Styled matching ProcessSteps CTA) ── */}
        <div className={styles.terminalSection}>
          <div className={styles.terminalNode} aria-hidden="true">
            <span className={styles.terminalIcon}>✦</span>
            <span className={styles.terminalLabel}>SCHEDULE YOUR VISIT</span>
          </div>

          <div className={styles.cta}>
            <div className={styles.ctaGlow} aria-hidden="true" />

            {/* Architectural Icon */}
            <span className={styles.ctaIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                <path d="M2 9h20" />
                <path d="M10 3l-2 6 4 12 4-12-2-6" />
              </svg>
            </span>

            <div className={styles.ctaCopy}>
              <h3 className={styles.ctaTitle}>Planning a Visit?</h3>
              <p className={styles.ctaDesc}>
                Let our team know 24–48 hours in advance so we can prepare for your arrival and ensure a dedicated specialist is available to assist you.
              </p>
            </div>

            <div className={styles.ctaBtns}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSolid}
              >
                Schedule a Visit
              </a>
              <a href={`tel:${siteConfig.links.phoneRaw}`} className={styles.btnOutline}>
                Call Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
