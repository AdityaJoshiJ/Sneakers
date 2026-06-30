'use client';

import React from 'react';
import Link from 'next/link';
import ErrorState from '../components/common/ErrorState';
import PageContainer from '../components/layout/PageContainer';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  return (
    <PageContainer>
      <ErrorState
        message={
          error.digest
            ? 'An unexpected error occurred. Please try again.'
            : error.message || 'Something went wrong. Please try again.'
        }
        retryAction={reset}
      />
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link
          href="/"
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textDecoration: 'underline',
          }}
        >
          Back to Products
        </Link>
      </div>
    </PageContainer>
  );
}
