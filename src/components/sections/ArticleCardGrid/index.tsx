'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { blogPosts as defaultPosts, ExtendedBlogPostItem } from '@/data/blog';
import styles from './ArticleCardGrid.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true }); // no mobile address-bar resets
}

interface ArticleCardGridProps {
  posts?: ExtendedBlogPostItem[];
  showAll?: boolean;
}

// ── Tuning knobs (home pinned deck) ──────────────────────────────────────────
const RISE_DUR = 0.8;  // how long a card takes to rise in
const STAGGER = 0.80;  // spacing between cards — the gap above RISE_DUR is the "stay time"
const TILT = 20;       // deg the covered cards tilt back (the 3D depth)
const STAIR = 30;      // px staircase offset per stacked card
const PER_CARD = 0.42; // viewport-heights of scroll per card (less = quicker to advance)

function BlogCard({ p }: { p: ExtendedBlogPostItem }) {
  return (
    <>
      <div className={styles.imgWrap}>
        <Image src={p.image} alt={p.title} fill sizes="(max-width: 860px) 100vw, 55vw" className={styles.img} />
      </div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>{p.category}</span>
        <h3 className={styles.title}>{p.title}</h3>
        <p className={styles.excerpt}>{p.excerpt}</p>
        <div className={styles.footer}>
          <div className={styles.meta}>
            <span>{p.date}</span>
            <span className={styles.sep}>·</span>
            <span>{p.readTime}</span>
          </div>
          <Link href={`/blogs/${p.slug}`} className={styles.readMore}>
            Read Article
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

const BlogHeader = () => (
  <div className={styles.header}>
    <span className="section-eyebrow">Knowledge Hub</span>
    <h2 className="section-title">Insights &amp; <em>Guides</em></h2>
    <p className={`section-desc centered ${styles.headerDesc}`}>
      Expert guidance on stone selection, care, and the latest design trends — curated by our specialists.
    </p>
  </div>
);

export default function ArticleCardGrid({ posts = defaultPosts, showAll = false }: ArticleCardGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const displayPosts = showAll ? posts : posts.slice(0, 4);

  useGSAP(() => {
    if (showAll) return; // /blogs is a plain list — no pin
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const wrappers = gsap.utils.toArray<HTMLElement>(`.${styles.cardWrapper}`, section);
      const n = wrappers.length;
      if (n < 2) return;

      // scale of a covered card based on how deep it sits (deepest = 0.8 … front = 1)
      const scaleFor = gsap.utils.mapRange(1, n - 1, 0.8, 1);

      // Resting positions: a small staircase, tilt pivots at the top edge.
      gsap.set(wrappers, {
        y: (i) => STAIR * i,
        transformOrigin: 'center top',
      });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',                                 // pin whole section, header frozen
          end: () => `+=${n * PER_CARD * window.innerHeight}`,
          scrub: 0.5, // smoothing: cards ease toward the scroll position (snappier, still smooth)
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each card rises up from off-screen below, one by one, onto the stack.
      tl.from(wrappers.slice(1), {
        y: () => window.innerHeight,
        duration: RISE_DUR,
        stagger: STAGGER,
      });

      // As each new card arrives, the ones beneath tilt back + shrink (recede in 3D).
      tl.to(wrappers.slice(0, -1), {
        rotationX: -TILT,
        scale: (i) => scaleFor(i),
        duration: RISE_DUR,
        stagger: { each: STAGGER },
      }, '<');
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [displayPosts, showAll] });

  // ── /blogs: plain, non-pinned vertical list of all posts ──
  if (showAll) {
    return (
      <section className={`${styles.section} ${styles.listSection}`} id="blog" ref={sectionRef}>
        <BlogHeader />
        <div className={styles.list}>
          {displayPosts.map((p) => (
            <article key={p.slug ?? p.title} className={`${styles.card} ${styles.listCard}`}>
              <BlogCard p={p} />
            </article>
          ))}
        </div>
      </section>
    );
  }

  // ── Home: pinned stacking deck (rise + 3D recede) ──
  return (
    <>
      <section className={styles.section} id="blog" ref={sectionRef}>
        <BlogHeader />
        <div className={styles.stage}>
          <div className={styles.deck}>
            {displayPosts.map((p) => (
              <div key={p.slug ?? p.title} className={styles.cardWrapper}>
                <article className={styles.card}>
                  <BlogCard p={p} />
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.viewAllWrap}>
        <Link href="/blogs" className="btn btn-outline-copper">View All Articles</Link>
      </div>
    </>
  );
}
