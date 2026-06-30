'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../../types/product';
import { formatCategoryLabel } from '../../../utils/format';
import { useWishlist } from '../../../context/WishlistContext';
import { HeartIcon } from '../../icons';
import ProductPrice from '../ProductPrice';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedCategory = formatCategoryLabel(product.category);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <button
          className={styles.wishlistButton}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
        >
          <HeartIcon
            className={`${styles.heartIcon} ${wishlisted ? styles.wishlisted : ''}`}
            fill={wishlisted ? 'currentColor' : 'none'}
            size={16}
          />
        </button>
        <Link href={`/products/${product.id}`} className={styles.imageLink}>
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={product.id <= 4}
              className={styles.image}
            />
          </div>
        </Link>
      </div>
      <Link href={`/products/${product.id}`} className={styles.detailsLink}>
        <span className={styles.category}>{formattedCategory}</span>
        <h3 className={styles.title}>{product.title}</h3>
        <ProductPrice price={product.price} className={styles.price} />
      </Link>
    </article>
  );
}
