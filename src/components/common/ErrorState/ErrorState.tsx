'use client';

import React from 'react';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  message?: string;
  retryAction?: () => void;
}

export default function ErrorState({
  message = 'Failed to load products. Please check your network connection.',
  retryAction,
}: ErrorStateProps) {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.iconContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.icon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>{message}</p>
      {retryAction ? (
        <button onClick={retryAction} className={styles.button}>
          Try Again
        </button>
      ) : (
        <button onClick={() => window.location.reload()} className={styles.button}>
          Reload Page
        </button>
      )}
    </div>
  );
}
