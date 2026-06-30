import React from 'react';
import Image from 'next/image';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className,
}: ProductImageProps) {
  return (
    <div className={`${styles.imageWrapper} ${className || ''}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={styles.image} />
    </div>
  );
}
