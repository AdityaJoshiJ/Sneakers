'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '../../../lib/api';
import { Product } from '../../../types/product';
import { isApiError } from '../../../lib/errors';
import ProductImage from '../../../components/product/ProductImage';
import ProductInfo from '../../../components/product/ProductInfo';
import ErrorState from '../../../components/common/ErrorState';
import CartButton from '../../../components/cart/CartButton';
import DetailHeader from '../../../components/product/DetailHeader';
import ExpandableDescription from '../../../components/product/ExpandableDescription';
import { BackIcon } from '../../../components/icons';
import styles from './DetailLayout.module.scss';

type LoadState = 'loading' | 'error' | 'ready';

interface ProductDetailViewProps {
  id: number;
}

/**
 * Client-side loader + view for a single product.
 *
 * Like the catalog, the fetch runs in the browser so it originates from a
 * residential IP. The upstream API (fakestoreapi.com) is behind Cloudflare bot
 * protection that returns a 403 challenge to Vercel's datacenter IPs, so a
 * Server Component fetch fails in production while a browser fetch succeeds.
 */
export default function ProductDetailView({ id }: ProductDetailViewProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<LoadState>('loading');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const result = await getProductById(id);
      setProduct(result);
      setState('ready');
    } catch (error) {
      // A 404 from the API means the product genuinely does not exist.
      if (isApiError(error) && error.status === 404) {
        notFound();
        return;
      }
      setState('error');
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  // Reflect the product name in the tab title once loaded. Per-product metadata
  // can't be generated server-side because the API blocks Vercel's IPs.
  useEffect(() => {
    if (product) {
      document.title = `${product.title} | Store`;
    }
  }, [product]);

  if (state === 'loading') {
    return (
      <p className={styles.loading} role="status" aria-live="polite">
        Loading product…
      </p>
    );
  }

  if (state === 'error') {
    return (
      <ErrorState
        message="Could not fetch product details from the API server."
        retryAction={load}
      />
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.detailContainer}>
      <Link href="/" className={styles.backLink} aria-label="Back to product list">
        <BackIcon size={16} className={styles.backIcon} />
        <span>Back to Products</span>
      </Link>

      <section className={styles.grid}>
        <section className={styles.imageSection}>
          <DetailHeader product={product} />
          <div className={styles.heroCircle} />
          <ProductImage
            src={product.image}
            alt={product.title}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </section>

        <section className={styles.infoSection}>
          <ProductInfo
            title={product.title}
            category={product.category}
            rating={product.rating}
            price={product.price}
          />

          <h2 className={styles.descriptionTitle}>Description</h2>
          <ExpandableDescription description={product.description} />

          <CartButton product={product} />
        </section>
      </section>
    </div>
  );
}
