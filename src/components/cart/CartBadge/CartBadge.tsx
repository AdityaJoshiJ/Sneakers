'use client';

import React from 'react';
import { useCart } from '../../../context/CartContext';
import styles from './CartBadge.module.scss';

export default function CartBadge() {
  const { cartCount } = useCart();

  return (
    <div className={styles.badge} aria-label={`Shopping cart containing ${cartCount} items`}>
      <span className={styles.emoji} aria-hidden="true">
        🛒
      </span>
      <span className={styles.label}>Cart</span>
      <span className={styles.count}>({cartCount})</span>
    </div>
  );
}
