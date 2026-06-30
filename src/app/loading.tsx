import React from 'react';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import PageContainer from '../components/layout/PageContainer';

export default function Loading() {
  return (
    <PageContainer>
      <LoadingSkeleton />
    </PageContainer>
  );
}
