'use client';
import { useRef, useState, useEffect, ReactNode } from 'react';
import styles from './MagicBento.module.css';

interface MagicBentoProps {
  children: ReactNode;
  className?: string;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  glowColor?: string; // RGB string like '192, 133, 82'
  enableBorderGlow?: boolean;
  enableStars?: boolean;
  particleCount?: number;
}

export default function MagicBento({
  children,
  className = '',
  enableSpotlight = true,
  spotlightRadius = 400,
  glowColor = '192, 133, 82', // Default to Copper RGB
  enableBorderGlow = true,
  enableStars = false,
  particleCount = 12,
}: MagicBentoProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    if (enableStars) {
      const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1.5,
        delay: Math.random() * 3,
      }));
      setParticles(newParticles);
    }
  }, [enableStars, particleCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.magicBento} ${className}`}
      style={{
        '--glow-color': glowColor,
        '--spotlight-radius': `${spotlightRadius}px`,
      } as React.CSSProperties}
    >
      {/* Border Glow Overlay */}
      {enableBorderGlow && (
        <div
          className={styles.borderGlow}
          style={{
            opacity,
            background: `radial-gradient(var(--spotlight-radius) circle at ${position.x}px ${position.y}px, rgba(var(--glow-color), 0.8), transparent 40%)`,
          }}
        />
      )}

      {/* Spotlight Inner Glow */}
      {enableSpotlight && (
        <div
          className={styles.spotlight}
          style={{
            opacity,
            background: `radial-gradient(var(--spotlight-radius) circle at ${position.x}px ${position.y}px, rgba(var(--glow-color), 0.25), transparent 40%)`,
          }}
        />
      )}

      {/* Stars/Particles */}
      {enableStars && (
        <div className={styles.stars}>
          {particles.map((p) => (
            <span
              key={p.id}
              className={styles.star}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
