import * as strapi from '@/services/strapi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import NewsBlocksRenderer from './NewsBlocksRenderer';
import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';

import type { API } from '@strapi/client'

type NewsDocument = API.Document

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const article: NewsDocument | null = await strapi.findOneNews(id);

  if (!article) {
    return (
      <div className="font-sans antialiased text-gray-800">
        <Navbar />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
              <p className="text-gray-600">The requested article could not be found.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Extract data from the Strapi response
  const coverUrl = article.cover?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${article.cover.url}`
    : null;
  const author = article.author;
  const authorAvatarUrl = author?.avatar?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${author.avatar.url}`
    : null;

  return (
    <div className="font-sans antialiased text-gray-800">
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Article Cover Image */}
            {coverUrl && (
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={coverUrl}
                  alt={article.cover?.alternativeText || article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {article.title}
                </h1>

                {/* Article Meta */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-600 border-b pb-6 mb-6">
                  <div className="flex items-center mb-2 md:mb-0">
                    {authorAvatarUrl && (
                      <div className="mr-3">
                        <Image
                          src={authorAvatarUrl}
                          alt={author?.name || 'Author'}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{author?.name || 'Admin'}</p>
                    </div>
                  </div>
                  <div>
                    <time dateTime={article.publishedAt || article.createdAt}>
                      {dayjs(article.publishedAt || article.createdAt).format('YYYY-MM-DD')}
                    </time>
                  </div>
                </div>
              </header>

              {/* Article Content - Render blocks */}
              <div className="prose prose-lg max-w-none">
                {article.blocks && article.blocks.length > 0 ? (
                  <NewsBlocksRenderer blocks={article.blocks} />
                ) : (
                  <div className="text-gray-700 leading-relaxed">
                    {article.content || article.description || 'No content available.'}
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Back to News Link */}
          {/* <div className="mt-8 text-center">
            <Link
              href="/news"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all transform hover:scale-105"
            >
              ← Back to News
            </Link>
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
