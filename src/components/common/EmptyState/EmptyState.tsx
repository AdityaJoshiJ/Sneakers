import React from 'react';
import { SearchIcon } from '../../icons';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = 'No products found',
  message = 'We could not find any products in our catalog matching your search criteria.',
}: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <SearchIcon size={28} className={styles.icon} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
