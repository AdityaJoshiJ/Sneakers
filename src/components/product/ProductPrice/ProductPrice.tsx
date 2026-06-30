import React from 'react';
import styles from './ProductPrice.module.scss';

interface ProductPriceProps {
  price: number;
  className?: string;
}

export default function ProductPrice({ price, className }: ProductPriceProps) {
  return <span className={`${styles.price} ${className || ''}`}>${price.toFixed(2)}</span>;
}
