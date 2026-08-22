'use client';

import { useState } from 'react';
import CinematicFocalSlider, { CinematicItem } from '@/components/sections/CinematicFocalSlider';
import { Project } from '@/lib/project-data';
import styles from './projects.module.css';

interface ProjectsFilterListProps {
  projects: Project[];
}

const CATEGORIES = [
  { value: 'all',            label: 'All Projects' },
  { value: 'government',     label: 'Government & Monuments' },
  { value: 'hospitality',    label: 'Luxury Hospitality' },
  { value: 'infrastructure', label: 'Infrastructure & Aviation' },
  { value: 'heritage',       label: 'Heritage & Royal Circuits' },
];

// Map Project (lib) → CinematicItem (generic component)
function toItem(p: Project): CinematicItem {
  return {
    id:       p.slug,
    title:    p.title,
    subtitle: p.scope,
    location: p.location,
    category: p.category.charAt(0).toUpperCase() + p.category.slice(1),
    badge:    p.size,
    image:    p.heroImage,
    tags:     p.materialsUsed,
    href:     `/projects/${p.slug}`,
  };
}

export default function ProjectsFilterList({ projects }: ProjectsFilterListProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const items = filtered.map(toItem);

  return (
    <>
      {/* Filter tabs */}
      <div className={styles.filterWrap}>
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className={`${styles.filterBtn} ${activeCategory === cat.value ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cinematic slider — items change when filter changes */}
      <CinematicFocalSlider
        items={items}
        autoInterval={3000}
        ctaLabel="View Case Study →"
      />
    </>
  );
}
