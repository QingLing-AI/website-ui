'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';

import type { API } from '@strapi/client'

type NewsDocument = API.Document

interface MediaFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  body: string;
}

interface QuoteBlock {
  __component: 'shared.quote';
  id: number;
  title?: string;
  body: string;
}

interface SliderBlock {
  __component: 'shared.slider';
  id: number;
  files: MediaFile[];
}

interface MediaBlock {
  __component: 'shared.media';
  id: number;
  file: MediaFile;
}

type ArticleBlock = RichTextBlock | QuoteBlock | SliderBlock | MediaBlock;

type NewsDocumentWithBlocks = NewsDocument & {
  blocks?: ArticleBlock[];
};

interface NewsViewProps {
  articles: NewsDocumentWithBlocks[];
  currentPage: number;
  totalPages: number;
}

// Function to extract text from the first rich-text block and truncate it
const getFirstRichTextBlockContent = (blocks?: ArticleBlock[], maxLength: number = 150): string => {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  // Find the first rich-text block
  const firstRichTextBlock = blocks.find(block => block.__component === 'shared.rich-text') as RichTextBlock;

  if (!firstRichTextBlock || !firstRichTextBlock.body) {
    return '';
  }

  // Remove HTML tags and markdown formatting to get plain text
  let plainText = firstRichTextBlock.body
    // Remove markdown-style links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown-style images ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove markdown headers
    .replace(/^#+\s*/gm, '')
    // Remove other markdown elements but keep the text
    .replace(/(\*{1,2}|_{1,2}|`{1,3})(.*?)\1/g, '$2')
    // Replace markdown line breaks
    .replace(/\n{2,}/g, ' ')
    // Replace markdown horizontal rules
    .replace(/^\s*[-*_]{3,}\s*$/gm, ' ')
    // Remove extra whitespaces
    .replace(/\s+/g, ' ')
    .trim();

  // If the plain text is longer than maxLength, truncate it and add ellipsis
  if (plainText.length > maxLength) {
    plainText = plainText.substring(0, maxLength) + '...';
  }

  return plainText;
};

const NewsView: React.FC<NewsViewProps> = ({ articles, currentPage, totalPages }) => {
  const { t } = useTranslation();

  // Get the first article as featured
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('nav.news')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div> */}

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <div className="mb-12">
                <Link
                  href={`/news/${featuredArticle.documentId}`}
                  className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-96 w-full">
                    {featuredArticle.cover?.url ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${featuredArticle.cover.url}`}
                        alt={featuredArticle.cover?.alternativeText || featuredArticle.title || ''}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      {featuredArticle.blocks && featuredArticle.blocks.length > 0
                        ? getFirstRichTextBlockContent(featuredArticle.blocks, 300)
                        : featuredArticle.description || 'No content available.'}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{featuredArticle.author?.name || 'User'}</span>
                      <span>{dayjs(featuredArticle.publishedAt || featuredArticle.createdAt).format('YYYY-MM-DD')}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Other Articles Grid */}
            {otherArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {otherArticles.map((article) => {
                  const articleUrl = `/news/${article.documentId}`;
                  const coverUrl = article.cover?.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${article.cover.url}`
                    : null;

                  // Get content from the first rich-text block or fall back to description
                  const articleContent = article.blocks && article.blocks.length > 0
                    ? getFirstRichTextBlockContent(article.blocks, 150)
                    : article.description || '';

                  return (
                    <Link
                      href={articleUrl}
                      key={article.id}
                      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative h-48 w-full">
                        {coverUrl ? (
                          <Image
                            src={coverUrl}
                            alt={article.cover?.alternativeText || article.title || ''}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {articleContent || article.description || 'No content available.'}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>{article.author?.name || 'User'}</span>
                          <span>{dayjs(article.publishedAt || article.createdAt).format('YYYY-MM-DD')}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <a
                  href={currentPage <= 1 ? undefined : `?page=${currentPage - 1}`}
                  onClick={currentPage <= 1 ? (e) => e.preventDefault() : undefined}
                  className={`px-4 py-2 rounded-md ${currentPage <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
                >
                  Previous
                </a>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`?page=${page}`}
                    className={`px-4 py-2 rounded-md ${page === currentPage ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {page}
                  </a>
                ))}

                <a
                  href={currentPage >= totalPages ? undefined : `?page=${currentPage + 1}`}
                  onClick={currentPage >= totalPages ? (e) => e.preventDefault() : undefined}
                  className={`px-4 py-2 rounded-md ${currentPage >= totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
                >
                  Next
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NewsView;
