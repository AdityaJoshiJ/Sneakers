import React from 'react';
import Link from 'next/link';
import PageContainer from '../PageContainer';
import CartBadge from '../../cart/CartBadge';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <PageContainer className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.brand} aria-label="Go to Sneakers store homepage">
            SNEAKERS
          </Link>
        </div>
        <CartBadge />
      </PageContainer>
    </header>
  );
}
