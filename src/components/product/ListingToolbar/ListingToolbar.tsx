import React from 'react';
import SearchBar from '../../filters/SearchBar';
import CategoryFilter from '../../filters/CategoryFilter';
import SortSelect from '../../filters/SortSelect';
import { SortValue } from '../../../types/common';
import styles from './ListingToolbar.module.scss';

interface ListingToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category?: string;
  onCategoryChange?: (category: string) => void;
  sort?: SortValue;
  onSortChange?: (sort: SortValue) => void;
  categories?: string[];
}

export default function ListingToolbar({
  search,
  onSearchChange,
  category = 'all',
  onCategoryChange = () => {},
  sort = 'default',
  onSortChange = () => {},
  categories = [],
}: ListingToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <SearchBar value={search} onChange={onSearchChange} />
      <div className={styles.controlsWrapper}>
        <SortSelect sort={sort} onSortChange={onSortChange} />
        <CategoryFilter
          category={category}
          onCategoryChange={onCategoryChange}
          categories={categories}
        />
      </div>
    </div>
  );
}
