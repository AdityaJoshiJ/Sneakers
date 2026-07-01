'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getProducts, getCategories } from '../../../lib/api';
import { Product } from '../../../types/product';
import { Category } from '../../../types/common';
import ProductCatalog from '../ProductCatalog';
import BottomNav from '../../layout/BottomNav';
import ErrorState from '../../common/ErrorState';
import LoadingSkeleton from '../../common/LoadingSkeleton';

type LoadState = 'loading' | 'error' | 'ready';

/**
 * Client-side loader for the product catalog.
 *
 * The catalog is fetched from the browser (rather than a Server Component) on
 * purpose: the upstream API (fakestoreapi.com) sits behind Cloudflare bot
 * protection that rejects requests from datacenter IPs — i.e. Vercel's servers —
 * with a 403 challenge. Fetching from the user's browser (a residential IP with
 * a real browser fingerprint) is not challenged, so the data loads reliably.
 */
export default function ProductCatalogLoader() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [state, setState] = useState<LoadState>('loading');

  const load = useCallback(async () => {
    setState('loading');

    // Fetch products and categories concurrently in a resilient manner
    const [productsResult, categoriesResult] = await Promise.allSettled([
      getProducts(),
      getCategories(),
    ]);

    if (productsResult.status === 'rejected') {
      setState('error');
      return;
    }

    setProducts(productsResult.value);
    setCategories(categoriesResult.status === 'fulfilled' ? categoriesResult.value : []);
    setState('ready');
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (state === 'loading') {
    return <LoadingSkeleton />;
  }

  if (state === 'error') {
    return <ErrorState message="Could not fetch products catalog from server." retryAction={load} />;
  }

  return (
    <>
      <ProductCatalog products={products} categories={categories} />
      <BottomNav />
    </>
  );
}
