import Link from 'next/link';
import { buildSlug } from '@/lib/landing/slug';
import type { LocationId, MaterialId } from '@/lib/landing/types';
import styles from './LocalDeliveryCorridor.module.css';

export interface CorridorCityData {
  id: LocationId;
  name: string;
  transit: string;
  isOrigin?: boolean;
}

export const CORRIDOR_CITIES: CorridorCityData[] = [
  { id: 'delhi', name: 'Delhi NCR', transit: '24–48h' },
  { id: 'mumbai', name: 'Mumbai', transit: '2–3 days' },
  { id: 'bangalore', name: 'Bengaluru', transit: '4–6 days' },
  { id: 'ludhiana', name: 'Ludhiana', transit: '24–36h' },
  { id: 'ahmedabad', name: 'Ahmedabad', transit: '24–36h' },
  { id: 'surat', name: 'Surat', transit: '24–48h' },
  { id: 'indore', name: 'Indore', transit: '20–30h' },
  { id: 'gurugram', name: 'Gurugram', transit: '18–24h' },
  { id: 'pune', name: 'Pune', transit: '3–4 days' },
  { id: 'nagpur', name: 'Nagpur', transit: '36–48h' },
  { id: 'mysuru', name: 'Mysuru', transit: '4–6 days' },
  { id: 'karnataka', name: 'Karnataka', transit: 'Statewide' },
  { id: 'hyderabad', name: 'Hyderabad', transit: '3–5 days' },
  { id: 'jaipur', name: 'Jaipur', transit: '4–6h express' },
  { id: 'rajasthan', name: 'Rajasthan', transit: 'Same-day' },
  { id: 'kishangarh', name: 'Kishangarh', transit: 'Yard Origin', isOrigin: true },
];

interface LocalDeliveryCorridorProps {
  eyebrow?: string;
  title?: string;
  titleEm?: string;
  subtitle?: string;
  className?: string;
  stoneSlug?: string;
  material?: string;
  currentLocation?: string;
}

function resolveCityHref(locId: LocationId, stoneSlug?: string, material?: string): string {
  if (stoneSlug) {
    const mat = (material === 'imported-marble' ? 'marble' : (material || 'granite')) as MaterialId;
    return '/' + buildSlug({ pattern: 'P-Stone', stoneSlug, material: mat, location: locId });
  }
  if (material === 'marble') return `/marble-suppliers-in-${locId}`;
  if (material === 'sandstone') return `/sandstone-suppliers-in-${locId}`;
  if (material === 'quartzite') return `/quartzite-suppliers-in-${locId}`;
  return `/granite-suppliers-in-${locId}`;
}

/**
 * Local Delivery Corridors with Dark Copper Luxury Aesthetic.
 * Styled in synergy with the "From Brief to Installation" journey.
 * Features interactive glassmorphic corridor capsules, active site highlighting,
 * and high-converting transit guarantees.
 */
export default function LocalDeliveryCorridor({
  eyebrow = 'Direct Factory Dispatch & Delivery Corridors',
  title = 'Direct Mandi Dispatch to',
  titleEm = 'Major Indian Hubs',
  subtitle = 'Order direct block lots or custom cut-to-size slabs with factory crane loading, verified transit times, and door delivery across India.',
  className = '',
  stoneSlug,
  material,
  currentLocation,
}: LocalDeliveryCorridorProps) {
  const row1 = CORRIDOR_CITIES.slice(0, 8);
  const row2 = CORRIDOR_CITIES.slice(8, 16);

  const renderCard = (city: CorridorCityData, prefix = 'grid') => {
    const isCurrent = currentLocation && currentLocation.toLowerCase() === city.id;
    const href = resolveCityHref(city.id, stoneSlug, material);
    const key = `${prefix}-${city.id}`;

    if (isCurrent) {
      return (
        <div
          key={key}
          className={`${styles.corridorCard} ${styles.activeCard}`}
          title={`Current active supply zone: ${city.name}`}
        >
          <span className={styles.livePulse} aria-hidden="true" />
          <span className={styles.cityName}>{city.name}</span>
          <span className={styles.activeTag}>Current Site</span>
          <span className={styles.transitTag}>{city.transit}</span>
        </div>
      );
    }

    return (
      <Link
        key={key}
        href={href}
        className={styles.corridorCard}
        title={`Explore direct factory slab delivery & rates for ${city.name} (${city.transit})`}
      >
        <span className={styles.geoDot} aria-hidden="true" />
        <span className={styles.cityName}>{city.name}</span>
        {city.isOrigin ? (
          <span className={styles.originTag}>{city.transit}</span>
        ) : (
          <span className={styles.transitTag}>{city.transit}</span>
        )}
      </Link>
    );
  };

  return (
    <section className={`${styles.section} ${className}`} aria-label="Local delivery corridors">
      {/* Ambient Copper Spotlight Glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header with Luxury Copper Flanking Lines */}
        <div className={styles.header}>
          {eyebrow && (
            <div className={styles.eyebrowWrapper}>
              <span className={styles.eyebrow}>{eyebrow}</span>
            </div>
          )}

          <h3 className={styles.title}>
            {title} <em>{titleEm}</em>
          </h3>

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* Desktop Interactive Strategic Corridor Capsule Grid */}
        <div className={styles.corridorGrid}>
          {CORRIDOR_CITIES.map((city) => renderCard(city, 'desktop'))}
        </div>

        {/* Mobile Dual-Track Seamless Marquee */}
        <div className={styles.mobileMarqueeWrapper} aria-label="Delivery corridors marquee">
          <div className={styles.marqueeTrackWrapper}>
            {/* Row 1 — Forward Scroll */}
            <div className={styles.marqueeTrack}>
              <div className={styles.marqueeGroup}>
                {row1.map((city) => renderCard(city, 'm1a'))}
              </div>
              <div className={styles.marqueeGroup} aria-hidden="true">
                {row1.map((city) => renderCard(city, 'm1b'))}
              </div>
            </div>

            {/* Row 2 — Reverse Scroll */}
            <div className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}>
              <div className={styles.marqueeGroup}>
                {row2.map((city) => renderCard(city, 'm2a'))}
              </div>
              <div className={styles.marqueeGroup} aria-hidden="true">
                {row2.map((city) => renderCard(city, 'm2b'))}
              </div>
            </div>
          </div>
        </div>

        {/* UI Strategic Reassurance / Dispatch Guarantees */}
        <div className={styles.reassuranceBar}>
          <div className={styles.reassuranceItem}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.reassuranceIcon}>
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span>Direct Kishangarh Mandi Fleet Dispatch</span>
          </div>

          <span className={styles.reassuranceDivider} aria-hidden="true">•</span>

          <div className={styles.reassuranceItem}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.reassuranceIcon}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Heavy A-Frame Crate & Breakage Guarantee</span>
          </div>

          <span className={styles.reassuranceDivider} aria-hidden="true">•</span>

          <div className={styles.reassuranceItem}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.reassuranceIcon}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Zero Middleman Yard Offloading Rates</span>
          </div>
        </div>
      </div>
    </section>
  );
}

