"use client";

import React from 'react';
import { getProducts, getCategories } from '../lib/api';
import PageContainer from '../components/layout/PageContainer';
import ProductCatalog from '../components/product/ProductCatalog';
import ErrorState from '../components/common/ErrorState';
import BottomNav from '../components/layout/BottomNav';

export default async function Home() {
  // Fetch products and categories concurrently in a resilient manner
  const [productsResult, categoriesResult] = await Promise.allSettled([
    getProducts(),
    getCategories(),
  ]);

  if (productsResult.status === 'rejected') {
    return (
      <PageContainer>
        <ErrorState message="Could not fetch products catalog from server." />
      </PageContainer>
    );
  }

  const products = productsResult.value;
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];

  return (
    <PageContainer>
      <ProductCatalog products={products} categories={categories} />
      <BottomNav />
    </PageContainer>
  );
}
