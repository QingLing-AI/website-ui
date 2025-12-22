'use client';

import * as lucide from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Category, Tag } from '@/types/strapi';

const SidebarWidget: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-10">
    <h4 className="text-lg font-bold text-gray-900 border-l-4 border-brand-500 pl-3 mb-5 font-serif uppercase tracking-wide">
      {title}
    </h4>
    {children}
  </div>
);

export const CategoryWidget: React.FC<{ categories: Category[] }> = ({ categories = [] }) => {
  const { t } = useTranslation();
  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, cate: string) => {
    e.preventDefault();
    const url = new URL(window.location.origin);
    url.pathname = '/news';
    url.searchParams.set('cate', cate);
    location.replace(url.toString());
  };
  return (
    <SidebarWidget title={t('categories.title')}>
      <ul className="space-y-2">
        {categories.slice(1).map((cate) => (
          <li key={cate.documentId}>
            <a
              onClick={(e) => onLinkClick(e, cate.documentId)}
              className="flex items-center justify-between text-gray-600 hover:text-brand-600 transition-colors py-1 group cursor-pointer"
            >
              <span className="text-sm font-medium">{cate.name}</span>
              <span className="text-gray-300 group-hover:text-brand-300">
                <lucide.ChevronRight size={16} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </SidebarWidget>
  );
};

export const TagWidget: React.FC<{ tags: Tag[] }> = ({ tags = [] }) => {
  const { t } = useTranslation();
  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, cate: string) => {
    e.preventDefault();
    const url = new URL(window.location.origin);
    url.pathname = '/news';
    url.searchParams.set('tag', cate);
    location.replace(url.toString());
  };

  return (
    <SidebarWidget title={t('tags.title')}>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <a
            key={tag.documentId}
            // href={`#tag-${tag.documentId}`}
            onClick={(e) => onLinkClick(e, tag.documentId)}
            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md hover:bg-brand-50 hover:text-brand-600 transition-colors border border-transparent hover:border-brand-200 cursor-pointer"
          >
            #{tag.name}
          </a>
        ))}
      </div>
    </SidebarWidget>
  );
};
export default SidebarWidget;
