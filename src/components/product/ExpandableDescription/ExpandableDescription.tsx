'use client';

import React, { useState } from 'react';
import styles from './ExpandableDescription.module.scss';

interface ExpandableDescriptionProps {
  description: string;
}

export default function ExpandableDescription({ description }: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <div className={`${styles.text} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        {description}
        {!isExpanded && <div className={styles.fade} />}
      </div>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
}
