import { cache } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../constants';
import { Category } from '../types/common';
import { Product } from '../types/product';
import { fetchJson } from './fetcher';

/**
 * Fetch products from the store catalog, optionally filtered by category and limited in quantity.
 *
 * @param category Optional category name to filter by
 * @param limit Optional maximum number of products to return
 * @returns Array of products matching the criteria
 */
export async function getProducts(category?: Category, limit?: number): Promise<Product[]> {
  let url = `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`;

  if (category) {
    url += `/category/${encodeURIComponent(category)}`;
  }

  const queryParams = new URLSearchParams();
  if (limit !== undefined && limit > 0) {
    queryParams.append('limit', limit.toString());
  }

  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  return fetchJson<Product[]>(url);
}

/**
 * Fetch a single product detail by its numeric ID.
 * Wrapped in React.cache() to deduplicate calls within the same server request
 * (e.g. between generateMetadata and the page component).
 *
 * @param id The product's ID
 * @returns The requested Product details
 */
export const getProductById = cache(async (id: number): Promise<Product> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}/${id}`;
  return fetchJson<Product>(url);
});

/**
 * Fetch the list of all available product categories from the catalog.
 *
 * @returns Array of category names
 */
export async function getCategories(): Promise<Category[]> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`;
  return fetchJson<Category[]>(url);
}
