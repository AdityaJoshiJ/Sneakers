export type SortValue = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface SortOption {
  value: SortValue;
  label: string;
}

export type Category = string;
