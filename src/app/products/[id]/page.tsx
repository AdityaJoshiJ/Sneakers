import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContainer from '../../../components/layout/PageContainer';
import ProductDetailView from './ProductDetailView';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

// The per-product title is set client-side after the product loads (see
// ProductDetailView) because the API blocks server-side fetches from Vercel.
export const metadata: Metadata = {
  title: 'Product Details | Store',
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  return (
    <PageContainer>
      <ProductDetailView id={id} />
    </PageContainer>
  );
}
