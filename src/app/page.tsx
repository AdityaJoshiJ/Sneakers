import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import ProductCatalogLoader from '../components/product/ProductCatalogLoader';

export default function Home() {
  return (
    <PageContainer>
      <ProductCatalogLoader />
    </PageContainer>
  );
}
