'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from '@/components/ui/Reveal';
import { teamMembers as defaultMembers, ExtendedTeamMember } from '@/data/team';
import styles from './PortraitTeamGrid.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortraitTeamGridProps {
  members?: ExtendedTeamMember[];
}

export default function PortraitTeamGrid({ members = defaultMembers }: PortraitTeamGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleScroll = () => {
    if (!gridRef.current || !isMobile) return;
    const grid = gridRef.current;
    const cards = grid.querySelectorAll(`.${styles.card}`);
    const N = members.length;
    if (cards.length !== 3 * N) return;

    // 1. Calculate active index in real-time for immediate active state highlight
    const gridCenter = grid.scrollLeft + grid.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      const cardCenter = cardElement.offsetLeft + cardElement.clientWidth / 2;
      const distance = Math.abs(gridCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveCardIndex(closestIndex % N);

    // 2. Debounce boundary snap adjustment until scroll completely settles
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      const currentGrid = gridRef.current;
      if (!currentGrid) return;

      const restGridCenter = currentGrid.scrollLeft + currentGrid.clientWidth / 2;
      let restClosestIndex = closestIndex;
      let restMinDistance = Infinity;

      const currentCards = currentGrid.querySelectorAll(`.${styles.card}`);
      // Grid may have re-rendered (e.g. resized to desktop) — bail if the looped copies are gone
      if (currentCards.length !== 3 * N) return;
      currentCards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardCenter = cardElement.offsetLeft + cardElement.clientWidth / 2;
        const distance = Math.abs(restGridCenter - cardCenter);
        if (distance < restMinDistance) {
          restMinDistance = distance;
          restClosestIndex = index;
        }
      });

      const firstCardOffset = (currentCards[0] as HTMLElement).offsetLeft;
      const firstMiddleCardOffset = (currentCards[N] as HTMLElement).offsetLeft;
      const copyWidth = firstMiddleCardOffset - firstCardOffset;

      if (restClosestIndex < N) {
        currentGrid.style.scrollBehavior = 'auto';
        currentGrid.scrollLeft += copyWidth;
        currentGrid.style.scrollBehavior = 'smooth';
      } else if (restClosestIndex >= 2 * N) {
        currentGrid.style.scrollBehavior = 'auto';
        currentGrid.scrollLeft -= copyWidth;
        currentGrid.style.scrollBehavior = 'smooth';
      }
    }, 120);
  };

  // Trigger initial scroll to the middle copy when mobile is active
  useEffect(() => {
    if (isMobile && gridRef.current) {
      const timer = setTimeout(() => {
        const grid = gridRef.current;
        if (!grid) return;
        const cards = grid.querySelectorAll(`.${styles.card}`);
        const N = members.length;
        if (cards.length === 3 * N) {
          const cardElement = cards[N] as HTMLElement;
          grid.style.scrollBehavior = 'auto';
          grid.scrollLeft = cardElement.offsetLeft - (grid.clientWidth - cardElement.clientWidth) / 2;
          grid.style.scrollBehavior = 'smooth';
          setActiveCardIndex(0);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isMobile, members.length]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const portraits = sectionRef.current.querySelectorAll(`.${styles.portraitWrap}`);
    const info = sectionRef.current.querySelectorAll(`.${styles.info}`);
    const actions = sectionRef.current.querySelectorAll(`.${styles.actions}`);

    // Fade-in and scale pop for circular portraits
    gsap.fromTo(portraits,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Text slides up
    gsap.fromTo([...Array.from(info), ...Array.from(actions)],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [members, isMobile] });

  const displayedMembers = isMobile ? [...members, ...members, ...members] : members;

  return (
    <section className={styles.section} id="team" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Reveal animation="fade-up">
            <span className="section-eyebrow">The Minds Behind Excellence</span>
            <h2 className="section-title">Meet Our <em>Leadership</em></h2>
            <p className="section-desc centered">A collective of industry veterans dedicated to sourcing the world&apos;s finest natural stones.</p>
          </Reveal>
        </div>

        <div 
          ref={gridRef}
          className={styles.grid}
          onScroll={handleScroll}
        >
          {displayedMembers.map((m, index) => (
            <div 
              key={`${m.name}-${index}`} 
              className={`${styles.card} ${isMobile && activeCardIndex === (index % members.length) ? styles.active : ''}`}
            >
              <Link href={`/team/${m.slug}`} className={styles.cardLink} aria-label={`View ${m.name}'s profile`}>
                <div className={styles.portraitWrap}>
                  <Image src={m.image} alt={m.name} fill className={styles.portrait} sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className={styles.portraitOverlay} />
                </div>
                <div className={styles.info}>
                  <span className={styles.expertise}>{m.expertise}</span>
                  <h3 className={styles.name}>{m.name}</h3>
                  <p className={styles.role}>{m.role}</p>
                </div>
              </Link>
              <div className={styles.actions}>
                <a data-wa-source="team_grid" href={`https://wa.me/${m.phone.replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className={styles.waLink}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                {m.email && (
                  <a href={`mailto:${m.email}`} className={styles.emailLink}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
