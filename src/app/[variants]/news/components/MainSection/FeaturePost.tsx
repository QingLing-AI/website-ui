'use client';

import dayjs from 'dayjs';
import { ArrowRight, Clock, Pen, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Article } from '@/types/strapi';

import { PostCover, getPostExcerpt } from './Utils';

const AuthorAvatar = ({ url, alt }: { url?: string | null; alt?: string }) => {
  return url ? (
    <Image
      src={url}
      alt={alt || 'Author'}
      width={40}
      height={40}
      style={{ height: 40 }}
      className="rounded-full object-cover"
    />
  ) : (
    <User size={20} />
  );
};

const PostRich: React.FC<{ post: Article }> = ({ post }) => {
  const { t } = useTranslation();
  const coverUrl = post.cover?.url;
  const author = post.author;
  const authorAvatarUrl = author?.avatar?.url;

  return (
    <article className="group relative grid grid-cols-1 gap-6 mb-12 border-b border-gray-200 pb-12">
      <div className="relative overflow-hidden rounded-xl shadow-sm aspect-video w-full">
        <PostCover url={coverUrl} alt={post.cover?.alternativeText || post.title} />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        {/* <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          Featured
        </span> */}
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center text-brand-600 font-medium">
            {post.category?.name}
          </span>

          <span className="flex items-center">
            <span className="w-1 h-1 bg-gray-300 rounded-full mr-3"></span>
            <time dateTime={post.publishedAt || post.createdAt}>
              {dayjs(post.publishedAt || post.createdAt).format('YYYY-MM-DD')}
            </time>
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 group-hover:text-brand-700 transition-colors leading-tight">
          <a href={`#post-${post.documentId}`}>{post.title}</a>
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
          {getPostExcerpt(post)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <AuthorAvatar url={authorAvatarUrl} alt={post.author?.name} />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900 mb-1">{post.author?.name}</p>
              {/* <div className="flex items-center text-gray-500">
                <Pen size={14} className="mr-1" />
                <time dateTime={post.publishedAt || post.createdAt}>
                  {dayjs(post.publishedAt || post.createdAt).format('YYYY-MM-DD')}
                </time>
              </div> */}
            </div>
          </div>

          <a
            href={`/news/${post.documentId}`}
            className="flex items-center text-brand-600 font-semibold hover:text-brand-800 transition-colors group-hover:translate-x-1 duration-300"
          >
            {t('news.readMore')} <ArrowRight size={18} className="ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

const FeaturePost: React.FC<{ post: Article }> = ({ post }) => {
  return (
    <section aria-label="Featured Post">
      <PostRich post={post} />
    </section>
  );
};

export default FeaturePost;
