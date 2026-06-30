import React from 'react';
import styles from './PageContainer.module.scss';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return <div className={`${styles.container} ${className || ''}`}>{children}</div>;
}
