'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../../types/product';
import { useCart } from '../../../context/CartContext';
import styles from './CartButton.module.scss';

interface CartButtonProps {
  product: Product;
}

export default function CartButton({ product }: CartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isAvailable = product.rating.count > 0;

  const handleAdd = () => {
    if (!isAvailable) return;

    addToCart(product);
    setIsAdded(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  let buttonText = 'Add to Cart';
  let ariaLabel = `Add ${product.title} to cart`;

  if (!isAvailable) {
    buttonText = 'Out of Stock';
    ariaLabel = `${product.title} is out of stock`;
  } else if (isAdded) {
    buttonText = 'Added ✓';
    ariaLabel = `${product.title} successfully added to cart`;
  }

  return (
    <div className={styles.buttonWrapper}>
      <button
        type="button"
        onClick={handleAdd}
        disabled={!isAvailable}
        className={`${styles.button} ${isAdded ? styles.added : ''}`}
        aria-label={ariaLabel}
      >
        {buttonText}
      </button>
    </div>
  );
}
