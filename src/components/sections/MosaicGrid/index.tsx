'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ApplicationItem } from '@/types';
import { applications as defaultApplications } from '@/data/applications';
import styles from './MosaicGrid.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MosaicGridProps {
  apps?: ApplicationItem[];
  title?: string;
  titleEm?: string;
  eyebrow?: string;
  description?: string;
}

export default function MosaicGrid({
  apps = defaultApplications,
  title = "Stone for Every",
  titleEm = "Space",
  eyebrow = "Versatile Applications",
  description = "From grand hotel lobbies to intimate kitchen countertops — our stone transforms every environment.",
}: MosaicGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Entrance animations for desktop grid
  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = gsap.utils.toArray(sectionRef.current.querySelectorAll(`.${styles.card}`));
    if (!cards.length) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [apps] });

  // Custom rich GSAP transition when mobile activeTab switches
  useGSAP(() => {
    if (!activeCardRef.current) return;
    const img = activeCardRef.current.querySelector(`.${styles.img}`);
    const content = activeCardRef.current.querySelector(`.${styles.content}`);
    const index = activeCardRef.current.querySelector(`.${styles.index}`);

    const tl = gsap.timeline();
    tl.fromTo(img,
      { scale: 1.06, filter: 'brightness(0.3)' },
      { scale: 1, filter: 'brightness(0.95)', duration: 0.75, ease: 'power3.out' }
    );
    tl.fromTo([index, content],
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' },
      '-=0.45'
    );
  }, { scope: activeCardRef, dependencies: [activeTab] });

  return (
    <section className={styles.section} id="applications" ref={sectionRef}>
      {/* Editorial split header */}
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className={styles.title}>{title} <em>{titleEm}</em></h2>
        </div>
        <p className={styles.headerDesc}>{description}</p>
      </div>

      {/* Desktop: Full-width asymmetric mosaic grid */}
      <div className={styles.grid}>
        {apps.map((app, i) => (
          <Link
            key={app.title}
            href={app.href || '#contact'}
            className={`${styles.card} ${app.wide ? styles.cardWide : ''}`}
          >
            <div className={styles.imgWrap}>
              <Image
                src={app.image}
                alt={app.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.img}
              />
            </div>
            <div className={styles.overlay} />
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <div className={styles.content}>
              <div className={styles.contentLine} />
              <p className={styles.sub}>{app.sub}</p>
              <h3 className={styles.name}>{app.title}</h3>
              <div className={styles.cta}>
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className={styles.borderAccent} />
          </Link>
        ))}
      </div>

      {/* Mobile-only Interactive Split-Slider Gallery */}
      <div className={styles.mobileSliderWrap}>
        {/* Horizontally scrollable category pills */}
        <div className={styles.mobileTabs}>
          {apps.map((app, i) => (
            <button
              key={app.title}
              className={`${styles.tabBtn} ${i === activeTab ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {app.title}
            </button>
          ))}
        </div>

        {/* Featured active card display */}
        <div className={styles.mobileCardContainer} ref={activeCardRef}>
          <Link href={apps[activeTab].href || '#contact'} className={styles.mobileCard}>
            <div className={styles.imgWrap}>
              <Image
                src={apps[activeTab].image}
                alt={apps[activeTab].title}
                fill
                sizes="100vw"
                className={styles.img}
              />
            </div>
            <div className={styles.overlay} />
            <span className={styles.index}>{String(activeTab + 1).padStart(2, '0')}</span>
            <div className={styles.content}>
              <div className={styles.contentLine} />
              <p className={styles.sub}>{apps[activeTab].sub}</p>
              <h3 className={styles.name}>{apps[activeTab].title}</h3>
              <div className={styles.cta}>
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className={styles.borderAccent} />
          </Link>
        </div>
      </div>
    </section>
  );
}
