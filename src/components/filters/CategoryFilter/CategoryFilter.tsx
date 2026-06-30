'use client';

import React, { useMemo } from 'react';
import { formatCategoryLabel } from '../../../utils/format';
import { FilterIcon } from '../../icons';
import Dropdown from '../../common/Dropdown';

interface CategoryFilterProps {
  category: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export default function CategoryFilter({
  category,
  onCategoryChange,
  categories,
}: CategoryFilterProps) {
  const dropdownOptions = useMemo(() => {
    const list = [{ value: 'all', label: 'All Categories' }];
    categories.forEach((cat) => {
      list.push({ value: cat, label: formatCategoryLabel(cat) });
    });
    return list;
  }, [categories]);

  const activeOption = dropdownOptions.find((opt) => opt.value === category) || dropdownOptions[0];

  const filterIcon = <FilterIcon size={20} />;

  return (
    <Dropdown
      options={dropdownOptions}
      value={category}
      onChange={onCategoryChange}
      label="Filter by category"
      triggerIcon={filterIcon}
      desktopTriggerLabel={`Category: ${activeOption.label}`}
    />
  );
}
