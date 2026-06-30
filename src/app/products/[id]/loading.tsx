import React from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import styles from './DetailSkeleton.module.scss';

export default function Loading() {
  return (
    <PageContainer>
      <div className={styles.skeletonContainer} aria-hidden="true">
        <div className={`${styles.backPlaceholder} ${styles.pulse}`} />

        <div className={styles.grid}>
          <div className={`${styles.imagePlaceholder} ${styles.pulse}`} />

          <div className={styles.infoPlaceholder}>
            <div className={`${styles.line} ${styles.categoryLine} ${styles.pulse}`} />
            <div className={`${styles.line} ${styles.titleLine1} ${styles.pulse}`} />
            <div className={`${styles.line} ${styles.titleLine2} ${styles.pulse}`} />
            <div className={`${styles.line} ${styles.ratingLine} ${styles.pulse}`} />
            <div className={`${styles.line} ${styles.priceLine} ${styles.pulse}`} />

            <div className={`${styles.line} ${styles.descriptionTitleLine} ${styles.pulse}`} />
            <div className={`${styles.line} ${styles.descriptionLine1} ${styles.pulse}`} />
            <div className={`${styles.line} ${styles.descriptionLine2} ${styles.pulse}`} />
            <div className={`${styles.line} ${styles.descriptionLine3} ${styles.pulse}`} />

            <div className={`${styles.buttonPlaceholder} ${styles.pulse}`} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
