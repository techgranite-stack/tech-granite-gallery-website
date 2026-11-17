import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { addressOneLine, googleBusinessProfile } from '@/data/local-seo';

export default function Footer() {
  const year = new Date().getFullYear();

  const collections = [
    { name: 'Italian Marble', path: '/marble' },
    { name: 'Indian Marble', path: '/marble' },
    { name: 'Granite', path: '/granite' },
    { name: 'Quartzite', path: '/collections/quartzite' },
    { name: 'Sandstone & Slate', path: '/collections' },
    { name: 'All Collections →', path: '/collections' },
  ];

  const finishes = [
    { name: 'Mirror Polished', path: '/finishes/polished' },
    { name: 'Leathered & Flamed', path: '/finishes/leathered' },
    { name: 'Bush Hammered & Shot Blast', path: '/finishes/bush-hammered' },
    { name: 'All Finishes →', path: '/finishes' },
  ];

  const applications = [
    { name: 'Flooring', path: '/applications/flooring' },
    { name: 'Wall Cladding', path: '/applications/wall-cladding' },
    { name: 'Kitchen Countertops', path: '/applications/kitchen-countertops' },
    { name: 'Bathroom', path: '/applications/bathroom' },
    { name: 'Staircase', path: '/applications/staircase' },
    { name: 'Exterior Cladding', path: '/applications/exterior-cladding' },
    { name: 'Tabletops & Furniture', path: '/applications/tabletops' },
  ];

  const stoneColors = [
    { name: 'Black Granite', path: '/black-granite' },
    { name: 'White Marble', path: '/white-marble' },
    { name: 'Beige Marble', path: '/beige-marble' },
    { name: 'Grey Granite', path: '/grey-granite' },
    { name: 'Brown Granite', path: '/brown-granite' },
    { name: 'Blue Granite', path: '/blue-granite' },
    { name: 'Green Granite', path: '/green-granite' },
    { name: 'Red Granite', path: '/red-granite' },
    { name: 'Pink Granite', path: '/pink-granite' },
    { name: 'Yellow Granite', path: '/yellow-granite' },
  ];

  const locationsServed = [
    { name: 'Kishangarh, Rajasthan', role: 'Headquarters & Processing Plant' },
    { name: 'Delhi NCR', role: 'North India Experience Center' },
    { name: 'Bangalore, Karnataka', role: 'South India Distribution Hub' },
  ];

  // Both derived, so the footer, the /contact map and the LocalBusiness schema
  // can never point at three slightly different addresses.
  const mapsUrl = siteConfig.links.maps;
  const embedUrl =
    'https://maps.google.com/maps?q=' +
    encodeURIComponent(addressOneLine) +
    '&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.inner}>

          {/* Column 1: Brand & Contact Info */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Image src="/Logo-black.png" alt="Granite Gallery" width={180} height={50} className={styles.logoImage} />
            </div>
            <p className={styles.tagline}>
              Rajasthan’s premier natural stone hub — crafting &amp; exporting India&apos;s finest Granite, Sandstone, Quartzite &amp; Exotic Wood Finish Stones for luxury spaces worldwide.
            </p>

            <div className={styles.contactDetails}>
              {/* Phone & WhatsApp */}
              <a href={`tel:${siteConfig.links.phoneRaw}`} className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" className={styles.contactIcon}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{siteConfig.links.phone}</span>
              </a>

              {/* Email */}
              <a href={`mailto:${siteConfig.links.email}`} className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" className={styles.contactIcon}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{siteConfig.links.email}</span>
              </a>

              {/* Address */}
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" className={styles.contactIcon}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{addressOneLine}</span>
              </a>
            </div>

            {/* Google Reviews Badge */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.googleReviewBadge}
              aria-label={`Granite Gallery Google Reviews ${googleBusinessProfile.ratingValue} rating from ${googleBusinessProfile.reviewCount} reviews`}
            >
              <div className={styles.googleIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div className={styles.googleReviewText}>
                <div className={styles.googleStarsWrap}>
                  <span className={styles.googleRatingNum}>{googleBusinessProfile.ratingValue.toFixed(1)}</span>
                  <div className={styles.googleStars}>★★★★★</div>
                </div>
                <span className={styles.googleReviewCount}>{googleBusinessProfile.reviewCount} Google Reviews</span>
              </div>
            </a>

            {/* Social Icons */}
            <div className={styles.socials}>
              {/* WhatsApp */}
              <a data-wa-source="footer" href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.social}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.social}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="17" height="17">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a href={siteConfig.links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.social}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Email Icon */}
              <a href={`mailto:${siteConfig.links.email}`} aria-label="Email" className={styles.social}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="17" height="17">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Collections & Finishes */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Collections</h4>
            <ul className={styles.links}>
              {collections.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>

            <h4 className={styles.subColTitle}>Finishes</h4>
            <ul className={styles.links}>
              {finishes.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Applications */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Applications</h4>
            <ul className={styles.links}>
              {applications.map((app) => (
                <li key={app.name}>
                  <Link href={app.path}>{app.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Google Map Location Embed + Locations Served */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Factory Location</h4>
            <div className={styles.mapCard}>
              <iframe
                title="Granite Gallery Kishangarh Factory Map Location"
                src={embedUrl}
                className={styles.mapFrame}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLinkBtn}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <span>Get Directions on Google Maps</span>
              </a>
            </div>

            {/* Locations Served (Placed Directly Under Map) */}
            <div className={styles.locations}>
              <h4 className={styles.colTitle}>Locations Served</h4>
              {locationsServed.map((loc) => (
                <div key={loc.name} className={styles.locItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span>{loc.name}</span>
                    <span className={styles.locTag}>{loc.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Natural Stone Collections by Color */}
        <div className={styles.colorsStrip}>
          <div className={styles.colorsInner}>
            <span className={styles.colorsLabel}>Stones by Color:</span>
            <div className={styles.colorPills}>
              {stoneColors.map((sc) => (
                <Link key={sc.path} href={sc.path} className={styles.colorPill}>
                  {sc.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Location Footer */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copy}>
            © {year} Granite Gallery India · Premium Natural Stone Solutions
          </p>

          <nav className={styles.bottomLinks} aria-label="Footer">
            <Link href="/marble-exporters-in-kishangarh" className={styles.bottomLink}>
              Marble Exporters in Kishangarh
            </Link>
            <Link href="/projects" className={styles.bottomLink}>
              Projects
            </Link>
            <Link href="/blogs" className={styles.bottomLink}>
              Blogs
            </Link>
            <Link href="/team" className={styles.bottomLink}>
              Team
            </Link>
            <Link href="/contact" className={styles.bottomLink}>
              Contact
            </Link>
            <Link href="/about" className={styles.bottomLink}>
              About
            </Link>
            <Link href="/sitemap" className={styles.bottomLink}>
              Sitemap
            </Link>
          </nav>

          <p className={styles.copy}>Made with ❤️ in Kishangarh</p>
        </div>
      </div>
    </footer>
  );
}
