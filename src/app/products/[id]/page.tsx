"use client"

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById, getProducts } from '../../../lib/api';
import PageContainer from '../../../components/layout/PageContainer';
import ProductImage from '../../../components/product/ProductImage';
import ProductInfo from '../../../components/product/ProductInfo';
import ErrorState from '../../../components/common/ErrorState';
import CartButton from '../../../components/cart/CartButton';
import DetailHeader from '../../../components/product/DetailHeader';
import ExpandableDescription from '../../../components/product/ExpandableDescription';
import { isApiError } from '../../../lib/errors';
import { BackIcon } from '../../../components/icons';
import styles from './DetailLayout.module.scss';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts().catch(() => []);
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) {
    return { title: 'Product Details' };
  }

  const product = await getProductById(id).catch(() => null);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} | Store`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  let product = null;
  let isConnectionError = false;

  try {
    product = await getProductById(id);
  } catch (error) {
    // If it is a 404 status from fetch, trigger notFound()
    if (isApiError(error) && error.status === 404) {
      notFound();
    }
    isConnectionError = true;
  }

  if (isConnectionError) {
    return (
      <PageContainer>
        <ErrorState message="Could not fetch product details from the API server." />
      </PageContainer>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <PageContainer>
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
    </PageContainer>
  );
}
