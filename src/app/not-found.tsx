import React from 'react';
import Link from 'next/link';
import PageContainer from '../components/layout/PageContainer';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <PageContainer>
      <div className={styles.container}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Product not found</h1>
        <p className={styles.message}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className={styles.button}>
          Back to Products
        </Link>
      </div>
    </PageContainer>
  );
}
