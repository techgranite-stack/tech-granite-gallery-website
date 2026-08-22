'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { NavbarProps } from '@/types/navigation';

export default function Navbar({
  links = [],
  logoSrc = '/Logo-black.png',
  logoAlt = 'Logo',
  navBackgroundRgb = '255, 248, 240',
  ctaText = 'Get Quote',
  ctaHref = '#contact',
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDD, setActiveDD] = useState<string | null>(null);
  const [mobileDD, setMobileDD] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let frameId: number;

    const updateScroll = (scrollY: number) => {
      const progress = Math.min(scrollY / 300, 1);
      if (headerRef.current) {
        headerRef.current.style.setProperty('--scroll-ratio', progress.toString());
      }
      setScrolled(scrollY > 20);
    };

    const onScroll = () => {
      frameId = requestAnimationFrame(() => {
        updateScroll(window.scrollY);
      });
    };

    // Native scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Lenis scroll listener
    let lenisInst: any = null;
    const checkLenis = setInterval(() => {
      if (window.__lenis) {
        lenisInst = window.__lenis;
        lenisInst.on('scroll', (e: any) => {
          updateScroll(e.scroll);
        });
        clearInterval(checkLenis);
      }
    }, 100);

    // Initial check
    updateScroll(window.scrollY);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameId);
      clearInterval(checkLenis);
      if (lenisInst) {
        lenisInst.off('scroll');
      }
    };
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const openDD = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDD(label);
  };

  const closeDD = () => {
    closeTimer.current = setTimeout(() => setActiveDD(null), 120);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        style={{ '--nav-bg-rgb': navBackgroundRgb } as React.CSSProperties}
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={180}
              height={50}
              priority
              className={styles.logoImage}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {links.map((link) => (
              <div
                key={link.label}
                className={styles.navItem}
                onMouseEnter={() => (link.mega || link.items) && openDD(link.label)}
                onMouseLeave={closeDD}
              >
                {link.href ? (
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                ) : (
                  <button className={styles.navLink}>
                    {link.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                )}

                {/* Mega Menu */}
                {link.mega && activeDD === link.label && (
                  <div
                    className={styles.megaMenu}
                    onMouseEnter={() => openDD(link.label)}
                    onMouseLeave={closeDD}
                  >
                    {link.groups?.map((g) => (
                      <div key={g.heading} className={styles.megaGroup}>
                        {g.href ? (
                          <Link href={g.href} className={styles.megaHeading}>{g.heading}</Link>
                        ) : (
                          <p className={styles.megaHeading}>{g.heading}</p>
                        )}
                        <ul>
                          {g.items.map((item) => (
                            <li key={item.label}>
                              <Link href={item.href} className={styles.megaItem}>{item.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {/* Promo panel */}
                    <div className={styles.megaPromo}>
                      <p className={styles.megaPromoLabel}>Featured Stone</p>
                      <p className={styles.megaPromoTitle}>Black Galaxy<br /><em>Premium Granite</em></p>
                      <Link href="/granite/black-galaxy" className={styles.megaPromoLink}>View Stone →</Link>
                      <div className={styles.megaViewAllWrap}>
                        <Link href="/marble"      className={styles.megaViewAll}>All Marble →</Link>
                        <Link href="/granite"     className={styles.megaViewAll}>All Granite →</Link>
                        <Link href="/collections" className={styles.megaViewAll}>All Collections →</Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Simple Dropdown */}
                {!link.mega && link.items && activeDD === link.label && (
                  <div
                    className={styles.dropdown}
                    onMouseEnter={() => openDD(link.label)}
                    onMouseLeave={closeDD}
                  >
                    {link.href && (
                      <Link href={link.href} className={`${styles.dropdownItem} ${styles.dropdownViewAll}`}>
                        All {link.label}
                      </Link>
                    )}
                    {link.items.map((item) => (
                      <Link key={item.label} href={item.href} className={styles.dropdownItem}>{item.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className={styles.ctas}>
            {ctaText && (
              <button
                className={styles.quoteBtn}
                onClick={() => {
                  if (typeof window !== 'undefined')
                    window.dispatchEvent(new CustomEvent('gg:open-dialog', { detail: { context: 'general' } }));
                }}
              >
                {ctaText}
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>

        {/* Drawer header — logo + close */}
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.drawerLogo} onClick={() => setMenuOpen(false)}>
            <Image src={logoSrc} alt={logoAlt} width={160} height={45} className={styles.drawerLogoImg} />
          </Link>
          <button
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className={styles.drawerInner}>
          {links.map((link) => {
            const hasChildren = !!(link.mega || link.items?.length);
            const isOpen = mobileDD === link.label;

            return (
              <div key={link.label} className={styles.mobileNavItem}>
                {/* Header row — expands if sub-items exist, otherwise navigates */}
                {hasChildren ? (
                  <button
                    className={`${styles.mobileNavLink} ${isOpen ? styles.mobileNavLinkOpen : ''}`}
                    onClick={() => setMobileDD(isOpen ? null : link.label)}
                  >
                    {link.label}
                    <svg
                      width="14" height="8" viewBox="0 0 14 8"
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    >
                      <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )}

                {/* Expanded sub-menu */}
                {hasChildren && isOpen && (
                  <div className={styles.mobileSubMenu}>
                    {/* "View All" link at top if the parent has an href */}
                    {link.href && (
                      <Link
                        href={link.href}
                        className={`${styles.mobileSubLink} ${styles.mobileSubViewAll}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        View All {link.label} →
                      </Link>
                    )}

                    {/* Mega menu: grouped sub-items */}
                    {link.mega && link.groups?.map(g => (
                      <div key={g.heading} className={styles.mobileSubGroup}>
                        {g.href
                          ? <Link href={g.href} className={styles.mobileSubGroupHeading} onClick={() => setMenuOpen(false)}>{g.heading}</Link>
                          : <span className={styles.mobileSubGroupHeading}>{g.heading}</span>
                        }
                        {g.items
                          .filter(item => !item.label.includes('View All')) /* skip redundant view-all items */
                          .map(item => (
                            <Link key={item.label} href={item.href} className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>
                              {item.label}
                            </Link>
                          ))}
                      </div>
                    ))}

                    {/* Simple dropdown: flat list */}
                    {!link.mega && link.items?.map(item => (
                      <Link key={item.label} href={item.href} className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className={styles.mobileCtaWrap}>
            <a
              data-wa-source="navbar"
              href="https://wa.me/919116622422"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.waBtn} ${styles.waBtnFull}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            {ctaText && (
              <button
                type="button"
                className={`btn btn-copper ${styles.quoteBtnFull}`}
                onClick={() => {
                  setMenuOpen(false);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('gg:open-dialog', { detail: { context: 'general' } }));
                  }
                }}
              >
                <span>{ctaText}</span>
              </button>
            )}
          </div>
        </div>
      </div>

    </>
  );
}
