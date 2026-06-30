'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '../../../context/WishlistContext';
import { Product } from '../../../types/product';
import { BackIcon, HeartIcon } from '../../icons';
import styles from './DetailHeader.module.scss';

interface DetailHeaderProps {
  product: Product;
}

export default function DetailHeader({ product }: DetailHeaderProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className={styles.mobileHeader}>
      <Link href="/" className={styles.backButton} aria-label="Back to products">
        <BackIcon size={20} className={styles.icon} />
      </Link>
      <button
        type="button"
        className={styles.wishlistButton}
        onClick={() => toggleWishlist(product.id)}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <HeartIcon
          size={20}
          fill={wishlisted ? 'currentColor' : 'none'}
          className={`${styles.icon} ${wishlisted ? styles.wishlisted : ''}`}
        />
      </button>
    </div>
  );
}
