import React from 'react';
import { Rating } from '../../../types/product';
import { formatCategoryLabel } from '../../../utils/format';
import styles from './ProductInfo.module.scss';

interface ProductInfoProps {
  title: string;
  category: string;
  rating: Rating;
  price?: number;
}

export default function ProductInfo({ title, category, rating, price }: ProductInfoProps) {
  const formattedCategory = formatCategoryLabel(category);
  const starsCount = Math.round(rating.rate);

  return (
    <div className={styles.info}>
      <div className={styles.categoryPriceRow}>
        <span className={styles.category}>{formattedCategory}</span>
        {price !== undefined && <span className={styles.price}>${price.toFixed(2)}</span>}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.ratingRow}>
        <div className={styles.stars} aria-label={`Rating: ${rating.rate} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={index < starsCount ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={2}
              className={index < starsCount ? styles.starFilled : styles.starEmpty}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499c.195-.39.69-.39.885 0l2.34 4.78 5.23.76c.427.062.597.585.288.89l-3.78 3.68c-.14.136-.204.342-.172.535l.9 5.21c.076.438-.38.77-.764.566L12 17.65l-4.71 2.48c-.38.204-.84-.128-.764-.566l.9-5.21c.032-.193-.032-.399-.172-.535l-3.78-3.68c-.309-.305-.139-.828.288-.89l5.23-.76 2.34-4.78Z"
              />
            </svg>
          ))}
        </div>
        <span className={styles.rate}>{rating.rate.toFixed(1)}</span>
        <span className={styles.count}>({rating.count} reviews)</span>
      </div>
    </div>
  );
}
