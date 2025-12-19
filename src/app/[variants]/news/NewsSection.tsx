import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';

import type { Article, ArticleBlock, RichTextBlock } from '@/types/strapi';

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

interface NewsSectionProps {
  articles: Article[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
  const { t } = useTranslation();

  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('nav.news')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t('news.no_articles')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const articleUrl = `/news/${article.id}`;
              const coverUrl = article.cover ? (article.cover.url || (article.cover.data?.attributes?.url)) : null;
              const authorName = article.author?.name || 'User';

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
                        src={coverUrl.startsWith('http') ? coverUrl : `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${coverUrl}`}
                        alt={article.cover?.alternativeText || article.title}
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
                      <span>{authorName}</span>
                      <span>{dayjs(article.publishedAt || article.createdAt).format('YYYY-MM-DD')}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
