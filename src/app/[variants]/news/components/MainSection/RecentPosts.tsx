'use client';
import dayjs from 'dayjs';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

import Pagination from '@/components/Pagination';
import { Article, Pagination as PaginationType } from '@/types/strapi';

import { PostCover, getPostExcerpt } from './Utils';

const PostItem = ({ post }: { post: Article }) => {
  // const [summary, setSummary] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  const coverUrl = post.cover?.url;
  // const author = post.author;
  // const authorAvatarUrl = author?.avatar?.url;

  return (
    <article className="flex flex-col md:flex-row gap-6 mb-10 group border-b border-gray-100 pb-10 last:border-0">
      {/* Left Thumbnail - Fixed width on desktop */}
      <div className="w-full md:w-64 md:shrink-0 h-48 md:h-40 overflow-hidden rounded-lg relative">
        <PostCover url={coverUrl} alt={post.cover?.alternativeText || post.title} />
        <div className="absolute top-2 left-2 md:hidden">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
            {post.category?.name}
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center text-xs text-brand-600 font-semibold uppercase tracking-wide mb-2">
          {post.category?.name}
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-500 font-normal normal-case">
            <time dateTime={post.publishedAt || post.createdAt}>
              {dayjs(post.publishedAt || post.createdAt).format('YYYY-MM-DD')}
            </time>
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors leading-snug">
          <a href={`#post-${post.id}`}>{post.title}</a>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 md:line-clamp-2 leading-relaxed text-sm md:text-base">
          {getPostExcerpt(post)}
        </p>

        {/* AI Summary Section - Unique Feature */}
        {/* {summary && (
          <div className="mb-4 p-3 bg-brand-50 border border-brand-100 rounded-lg text-sm text-brand-900 animate-fade-in">
            <div className="flex items-center gap-2 font-semibold mb-1 text-brand-700">
              <Sparkles size={14} /> AI Summary
            </div>
            {summary}
          </div>
        )} */}

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium text-gray-900 mr-2">{post.author?.name}</span>
            {/* <span className="w-1 h-1 bg-gray-300 rounded-full mr-2"></span>
            <Clock size={14} className="mr-1" />
            <time dateTime={post.publishedAt || post.createdAt}>
              {dayjs(post.publishedAt || post.createdAt).format('YYYY-MM-DD')}
            </time> */}
          </div>

          {/* <div className="flex gap-3">
            <button
              //  onClick={handleAISummary}
              disabled={loading}
              className={`text-xs flex items-center px-3 py-1.5 rounded-full transition-colors border ${
                summary
                  ? 'bg-gray-100 text-gray-400 border-gray-200'
                  : 'bg-white text-brand-600 border-brand-200 hover:bg-brand-50'
              }`}
            >
              {loading ? (
                <span className="animate-pulse">Thinking...</span>
              ) : (
                <>
                  <Sparkles size={12} className="mr-1" />
                  {summary ? 'Summarized' : 'AI Summary'}
                </>
              )}
            </button>
          </div> */}
        </div>
      </div>
    </article>
  );
};

const RecentPosts: React.FC<{ posts: Article[]; pagination: PaginationType }> = ({
  posts,
  pagination,
}) => {
  const onPageChange = (page: number) => {
    const url = new URL(location.href);
    url.searchParams.set('page', page.toString());
    location.replace(url.toString());
  };

  return (
    <section aria-label="Recent Posts">
      {/* <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 font-serif">{t('news.last_articles')}</h2>
        <div className="grow h-px bg-gray-200 ml-4"></div>
      </div> */}

      <div className="flex flex-col">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination UI */}
      <div className="mt-12">
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </div>
    </section>
  );
};

export default RecentPosts;
