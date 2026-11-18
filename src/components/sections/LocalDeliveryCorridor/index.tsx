import Link from 'next/link';
import { buildSlug } from '@/lib/landing/slug';
import type { LocationId, MaterialId } from '@/lib/landing/types';
import styles from './LocalDeliveryCorridor.module.css';

export interface CorridorCityData {
  id: LocationId;
  name: string;
  transit: string;
}

export const CORRIDOR_CITIES: CorridorCityData[] = [
  { id: 'delhi', name: 'Delhi NCR', transit: '24–48h transit' },
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
  { id: 'karnataka', name: 'Karnataka', transit: 'Statewide network' },
  { id: 'hyderabad', name: 'Hyderabad', transit: '3–5 days' },
  { id: 'jaipur', name: 'Jaipur', transit: '4–6h express' },
  { id: 'kishangarh', name: 'Kishangarh', transit: 'Immediate yard pickup' },
];

interface LocalDeliveryCorridorProps {
  eyebrow?: string;
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
 * Local Delivery Corridors bar for programmatic, flagship, and category landing pages.
 * Displays target delivery hubs in a clean horizontal strip with vertical pipe dividers.
 * Powers Local SEO authority, internal PageRank mesh linking, and direct dispatch capabilities.
 */
export default function LocalDeliveryCorridor({
  eyebrow = 'DIRECT FACTORY DISPATCH & SITE DELIVERY CORRIDORS',
  className = '',
  stoneSlug,
  material,
  currentLocation,
}: LocalDeliveryCorridorProps) {
  return (
    <section className={`${styles.section} ${className}`} aria-label="Local delivery corridors">
      <div className={styles.container}>
        {eyebrow && (
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDash}>—</span>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <span className={styles.eyebrowDash}>—</span>
          </div>
        )}

        <div className={styles.corridorBar}>
          <div className={styles.citiesTrack}>
            {CORRIDOR_CITIES.map((city, idx) => {
              const isCurrent = currentLocation && currentLocation.toLowerCase() === city.id;
              const href = resolveCityHref(city.id, stoneSlug, material);

              return (
                <span key={city.name} className={styles.cityItem}>
                  {isCurrent ? (
                    <span className={styles.cityName} style={{ color: '#C08552', fontWeight: 600 }}>
                      {city.name} (Current Site)
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className={styles.cityLink}
                      title={`Natural stone supply & delivery to ${city.name} (${city.transit})`}
                    >
                      {city.name}
                    </Link>
                  )}
                  {idx < CORRIDOR_CITIES.length - 1 && (
                    <span className={styles.divider} aria-hidden="true">
                      |
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
