'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { StatItem } from '@/types';
import styles from './StatsBand.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatsBandProps {
  stats: StatItem[];
}

export default function StatsBand({ stats }: StatsBandProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const statEls = sectionRef.current.querySelectorAll(`.${styles.stat}`);
    const valueEls = sectionRef.current.querySelectorAll(`.${styles.value}`);
    const lines = sectionRef.current.querySelectorAll(`.${styles.line}`);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // Create a master ScrollTriggered timeline for perfectly synchronized sequential entrances
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? 'top 90%' : 'top 78%',
        toggleActions: 'play none none reverse',
      }
    });

    // 1. Draw outer boundary lines first (Desktop only)
    if (!isMobile) {
      tl.fromTo(lines,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.1,
          ease: 'power3.inOut',
          transformOrigin: 'center top'
        },
        0
      );
    }

    // 2. Cards rise up in a smooth staggered sequence
    tl.fromTo(statEls,
      { 
        y: isMobile ? 18 : 35, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out'
      },
      isMobile ? 0 : 0.2 // delay slightly on desktop to wait for side line draw
    );

    // 3. Staggered numeric counters trigger in sync with each card's rise!
    stats.forEach((s, i) => {
      const el = valueEls[i];
      if (!el) return;
      
      const numVal = parseInt(s.number.replace(/\D/g, '')) || 0;
      const suffix = s.number.replace(/\d/g, '');
      const obj = { val: 0 };

      // Append counter animations directly to the timeline staggered by 0.08s
      tl.to(obj, {
        val: numVal,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`;
        }
      }, (isMobile ? 0 : 0.2) + (i * 0.08));
    });
  }, { scope: sectionRef, dependencies: [stats] });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.line} />
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.stat}>
              <div className={styles.value}>0</div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className={styles.line} />
      </div>
    </section>
  );
}
