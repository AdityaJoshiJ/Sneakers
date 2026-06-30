'use client';

import React from 'react';
import { SORT_OPTIONS } from '../../../constants/sorting';
import { SortValue } from '../../../types/common';
import { SortIcon } from '../../icons';
import Dropdown from '../../common/Dropdown';

interface SortSelectProps {
  sort: SortValue;
  onSortChange: (sort: SortValue) => void;
}

export default function SortSelect({ sort, onSortChange }: SortSelectProps) {
  const activeOption = SORT_OPTIONS.find((opt) => opt.value === sort) || SORT_OPTIONS[0];

  const handleDropdownChange = (val: string) => {
    onSortChange(val as SortValue);
  };

  const sortIcon = <SortIcon size={20} />;

  return (
    <Dropdown
      options={SORT_OPTIONS}
      value={sort}
      onChange={handleDropdownChange}
      label="Sort products"
      triggerIcon={sortIcon}
      desktopTriggerLabel={`Sort: ${activeOption.label}`}
    />
  );
}
