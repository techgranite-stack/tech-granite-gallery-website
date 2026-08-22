'use client';
import { ReactNode } from 'react';
import StoneGrid from '../StoneGrid';
import styles from './SectionPersonality.module.css';

interface SectionPersonalityProps {
  children: ReactNode;
  personality?: 'marble' | 'granite' | 'onyx' | 'clean';
  grid?: 'square' | 'asymmetric' | 'luxury' | 'none';
  variant?: 'ivory' | 'mahogany' | 'bronze' | 'transparent';
  padding?: 'none' | 'small' | 'medium' | 'large';
  id?: string;
  fullWidth?: boolean;
}

export default function SectionPersonality({
  children,
  personality = 'clean',
  grid = 'none',
  variant = 'ivory',
  padding = 'medium',
  id,
  fullWidth = false,
}: SectionPersonalityProps) {
  const sectionClasses = [
    styles.section,
    styles[personality],
    styles[variant],
    styles[`p-${padding}`],
  ].join(' ');

  const innerClasses = [
    styles.inner,
    fullWidth ? styles.fullWidthInner : '',
  ].join(' ');

  return (
    <section className={sectionClasses} id={id}>
      {/* StoneGrid checks/grid lines disabled to match original clean code design */}
      {/* {grid !== 'none' && <StoneGrid pattern={grid} />} */}
      <div className={innerClasses}>
        {children}
      </div>
    </section>
  );
}
