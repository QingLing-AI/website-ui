import dayjs from 'dayjs';
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, Tag, User } from 'lucide-react';

import * as strapi from '@/services/strapi';

import { PostCover } from '../components/MainSection/Utils';
import NewsBlocksRenderer from './NewsBlocksRenderer';

interface NewsPageProps {
  params: Promise<{ id: string }>;
}

const NewsPage: React.FC<NewsPageProps> = async ({ params }) => {
  const post = await strapi.findOneArticle((await params).id);
  if (!post) {
    return <div>Not found</div>;
  }

  return (
    <article>
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full uppercase tracking-wide">
            {post.category?.name}
          </span>
          {/* <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-500 text-sm flex items-center">
            <Clock size={14} className="mr-1" /> {post.readTime}
          </span> */}
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{post.author?.name}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <Calendar size={12} className="mr-1" />
                <time dateTime={post.publishedAt || post.createdAt}>
                  {dayjs(post.publishedAt || post.createdAt).format('YYYY-MM-DD')}
                </time>
              </p>
            </div>
          </div>

          {/* <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors">
            <Share2 size={20} />
          </button> */}
        </div>
      </header>

      {/* Featured Image */}
      {/* <div className="mb-10 rounded-xl overflow-hidden shadow-sm aspect-video"> */}
      <div className="relative overflow-hidden rounded-xl shadow-sm aspect-video w-full">
        <PostCover url={post.cover?.url} alt={post.cover?.alternativeText || post.title} />
      </div>

      {/* AI Summary Block */}
      {/* <div className="bg-linear-to-r from-brand-50 to-white border border-brand-100 rounded-xl p-6 mb-10">
        <div className="flex items-center gap-2 text-brand-700 font-bold mb-2">
          <Sparkles size={18} />
          <h3>AI Key Takeaways</h3>
        </div>
        <div className="text-brand-900 text-sm leading-relaxed min-h-[40px]">
          {loading ? (
            <div className="flex space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
              <div className="w-2 h-2 bg-brand-400 rounded-full animation-delay-200"></div>
              <div className="w-2 h-2 bg-brand-400 rounded-full animation-delay-400"></div>
            </div>
          ) : (
            aiSummary || 'Generating summary...'
          )}
        </div>
      </div> */}

      {/* Article Content */}
      <div className="text-xl prose prose-lg prose-blue max-w-none text-gray-700 font-serif leading-loose">
        <p className="text-2xl text-gray-500 font-sans font-light leading-relaxed mb-8 mt-10">
          {post.description}
        </p>

        {/* Article Content - Render blocks */}
        {post.blocks && post.blocks.length > 0 ? (
          <NewsBlocksRenderer blocks={post.blocks} />
        ) : (
          <div className="text-gray-700 leading-relaxed">{'No content available.'}</div>
        )}
      </div>

      {/* Footer Tags */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 items-center">
          <Tag size={16} className="text-gray-400" />
          {post.tags?.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default NewsPage;
