'use client';

import React, { useMemo, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { Product } from '../../../types/product';
import { SortValue } from '../../../types/common';
import { PRODUCTS_PER_PAGE, SEARCH_DEBOUNCE_MS } from '../../../constants/pagination';
import EmptyState from '../../common/EmptyState';
import Pagination from '../../common/Pagination';
import ListingToolbar from '../ListingToolbar';
import ProductGrid from '../ProductGrid';
import SearchBar from '../../filters/SearchBar';
import SortSelect from '../../filters/SortSelect';
import CategoryFilter from '../../filters/CategoryFilter';
import styles from './ProductCatalog.module.scss';

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
}

export default function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState<SortValue>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);

  // Custom handlers to reset page to 1 on filter changes immediately
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortValue) => {
    setSelectedSort(sort);
    setCurrentPage(1);
  };

  // --- Filtering & Sorting Pipeline ---

  // 1. Search Filter Pipeline Stage
  const searchedProducts = useMemo(() => {
    const trimmed = debouncedSearch.trim();
    if (!trimmed) {
      return products;
    }

    const query = trimmed.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [products, debouncedSearch]);

  // 2. Category Filter Pipeline Stage
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return searchedProducts;
    }
    return searchedProducts.filter((product) => product.category === selectedCategory);
  }, [searchedProducts, selectedCategory]);

  // 3. Sorting Pipeline Stage
  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];

    switch (selectedSort) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return items.sort((a, b) => b.title.localeCompare(a.title));
      case 'default':
      default:
        return items;
    }
  }, [filteredProducts, selectedSort]);

  // --- Pagination Pipeline ---

  // Calculate total pages based on filtered/sorted collection size
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE));
  }, [sortedProducts]);

  // Derive safe page: clamp to valid range without an effect
  const safePage = Math.min(currentPage, totalPages);

  // 4. Pagination Pipeline Stage
  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, safePage]);

  // --------------------------

  // Contextual empty state message based on search and category filters
  const emptyStateMessage = useMemo(() => {
    const hasSearch = debouncedSearch.trim().length > 0;
    const hasCategory = selectedCategory !== 'all';

    if (hasSearch) {
      return 'No products match your search and selected category.';
    }
    if (hasCategory) {
      return 'No products found in this category.';
    }
    return 'No products found in the catalog.';
  }, [debouncedSearch, selectedCategory]);

  return (
    <div className={styles.catalog}>
      {/* Desktop Header and Toolbar */}
      <div className={styles.desktopControls}>
        <ListingToolbar
          search={search}
          onSearchChange={handleSearchChange}
          category={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sort={selectedSort}
          onSortChange={handleSortChange}
          categories={categories}
        />
      </div>

      {/* Mobile Header and Toolbar matching Figma */}
      <div className={styles.mobileControls}>
        <div className={styles.searchRow}>
          <span className={styles.hamburger} aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={styles.hamburgerIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
          <SearchBar value={search} onChange={handleSearchChange} />
        </div>
        <div className={styles.titleRowMobile}>
          <h1 className={styles.mobileTitle}>Sneakers</h1>
          <div className={styles.mobileActions}>
            <SortSelect sort={selectedSort} onSortChange={handleSortChange} />
            <CategoryFilter
              category={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categories={categories}
            />
          </div>
        </div>
        <p className={styles.mobileCount} aria-live="polite">
          {sortedProducts.length} products found
        </p>
      </div>

      <div aria-live="polite">
        {paginatedProducts.length === 0 ? (
          <EmptyState title="No products found" message={emptyStateMessage} />
        ) : (
          <>
            <ProductGrid products={paginatedProducts} />
            {totalPages > 1 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
