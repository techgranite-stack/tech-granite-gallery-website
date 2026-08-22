'use client';
import { useRef, useState, ReactNode } from 'react';
import styles from './LuxuryShell.module.css';

interface LuxuryShellProps {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'glass';
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  className?: string;
  glowColor?: string;
}

export default function LuxuryShell({
  children,
  variant = 'light',
  enableSpotlight = true,
  enableBorderGlow = true,
  className = '',
  glowColor = '192, 133, 82', // Default Copper
}: LuxuryShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!shellRef.current) return;
    const rect = shellRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={shellRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`${styles.shell} ${styles[variant]} ${className}`}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
        '--glow-rgb': glowColor,
        '--spotlight-opacity': opacity,
      } as React.CSSProperties}
    >
      {/* Glossy Border Layer */}
      {enableBorderGlow && <div className={styles.borderGlow} />}
      
      {/* Reactive Spotlight Layer */}
      {enableSpotlight && <div className={styles.spotlight} />}
      
      {/* Subtle Grain/Texture Layer */}
      <div className={styles.grain} />

      {/* Content Layer */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
