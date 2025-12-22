'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Pagination as PaginationType } from '@/types/strapi';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  const { t } = useTranslation();
  const { page, pageCount } = pagination;

  if (pageCount <= 1) {
    return null;
  }

  // Smart Pagination: Returns array like [1, '...', 4, 5, 6, '...', 10]
  const getPageNumbers = () => {
    const delta = 1; // Number of pages to show around current page
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  return (
    <div className="flex justify-center space-x-2">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-white hover:text-brand-600 disabled:opacity-50"
      >
        {t('pagination.prev')}
      </button>
      {getPageNumbers().map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <span key={`dots-${index}`} className="px-2 py-2 text-gray-400">
              ...
            </span>
          );
        }
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber as number)}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              pageNumber === page
                ? 'bg-brand-600 text-white shadow-md transform scale-105'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-brand-600 hover:border-brand-200'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={page == pageCount}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-white hover:text-brand-600"
      >
        {t('pagination.next')}
      </button>
    </div>
  );
};
export default Pagination;
