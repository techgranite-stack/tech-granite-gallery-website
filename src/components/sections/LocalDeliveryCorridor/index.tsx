import Link from 'next/link';
import styles from './LocalDeliveryCorridor.module.css';

export interface CorridorCity {
  name: string;
  href?: string;
  transit?: string;
}

export const CORRIDOR_CITIES: CorridorCity[] = [
  { name: 'Delhi NCR', href: '/granite-suppliers-in-delhi', transit: '24–48h transit' },
  { name: 'Bengaluru', href: '/granite-suppliers-in-bangalore', transit: '4–6 days' },
  { name: 'Mumbai', href: '/granite-suppliers-in-mumbai', transit: '2–3 days' },
  { name: 'Ludhiana', href: '/granite-suppliers-in-kishangarh', transit: '24–36h' },
  { name: 'Ahmedabad', href: '/granite-suppliers-in-ahmedabad', transit: '24–36h' },
  { name: 'Surat', href: '/granite-suppliers-in-ahmedabad', transit: '24–48h' },
  { name: 'Indore', href: '/granite-suppliers-in-rajasthan', transit: '20–30h' },
  { name: 'Gurugram', href: '/granite-suppliers-in-delhi', transit: '18–24h' },
  { name: 'Pune', href: '/granite-suppliers-in-pune', transit: '3–4 days' },
  { name: 'Nagpur', href: '/granite-suppliers-in-mumbai', transit: '36–48h' },
  { name: 'Mysuru', href: '/granite-suppliers-in-bangalore', transit: '4–6 days' },
  { name: 'Karnataka', href: '/granite-suppliers-in-bangalore', transit: 'Statewide network' },
];

interface LocalDeliveryCorridorProps {
  eyebrow?: string;
  className?: string;
}

/**
 * Local Delivery Corridors bar for programmatic, flagship, and category landing pages.
 * Displays target delivery hubs in a clean horizontal strip with vertical pipe dividers.
 * Powers Local SEO authority and demonstrates direct dispatch capabilities across India.
 */
export default function LocalDeliveryCorridor({
  eyebrow = 'DIRECT FACTORY DISPATCH & SITE DELIVERY CORRIDORS',
  className = '',
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
            {CORRIDOR_CITIES.map((city, idx) => (
              <span key={city.name} className={styles.cityItem}>
                {city.href ? (
                  <Link href={city.href} className={styles.cityLink} title={`Natural stone supply & delivery to ${city.name} (${city.transit})`}>
                    {city.name}
                  </Link>
                ) : (
                  <span className={styles.cityName}>{city.name}</span>
                )}
                {idx < CORRIDOR_CITIES.length - 1 && (
                  <span className={styles.divider} aria-hidden="true">
                    |
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
