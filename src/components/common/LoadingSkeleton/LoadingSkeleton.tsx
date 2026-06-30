import React from 'react';
import styles from './LoadingSkeleton.module.scss';

export default function LoadingSkeleton() {
  // Render 8 placeholder cards for loading skeleton
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className={styles.grid} aria-hidden="true">
      {skeletonCards.map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.imagePlaceholder} />
          <div className={styles.categoryPlaceholder} />
          <div className={styles.titlePlaceholder} />
          <div className={styles.pricePlaceholder} />
        </div>
      ))}
    </div>
  );
}
