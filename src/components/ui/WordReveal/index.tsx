'use client';
import styles from './WordReveal.module.css';

interface WordRevealProps {
  text: string;
  className?: string;
}

export default function WordReveal({ text, className = '' }: WordRevealProps) {
  const words = text.split(' ');
  
  return (
    <span className={`${styles.wordReveal} ${className}`}>
      {words.map((word, i) => (
        <span key={i} className={styles.wordClip}>
          <span className={styles.wordInner}>{word}</span>
          {/* Add a space after each word except the last one */}
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </span>
  );
}
