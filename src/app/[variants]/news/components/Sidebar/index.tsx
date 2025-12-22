import React from 'react';

import { findCategories, findTags } from '@/services/strapi';

import { CategoryWidget, TagWidget } from './SidebarWidget';

const Sidebar: React.FC = async () => {
  const categories = await findCategories();
  const tags = await findTags();
  return (
    <aside className="w-full">
      {/* Search Widget */}
      {/* <SidebarWidget title="Search">
        <div className="relative">
          <input
            type="text"
            placeholder="Search news..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-sm"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
      </SidebarWidget> */}

      {/* Categories Widget */}
      <CategoryWidget categories={categories} />

      {/* Recent Posts Mini Widget */}
      {/* <SidebarWidget title="Trending Now">
        <ul className="space-y-4">
          {BLOG_POSTS.slice(1, 4).map((post) => (
            <li key={post.id} className="group">
              <a href={`#post-${post.id}`} className="flex gap-3">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 leading-snug mb-1 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {post.title}
                  </h5>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </SidebarWidget> */}

      {/* Tags Widget */}
      <TagWidget tags={tags} />

      {/* Newsletter / Promo */}
      {/* <div className="bg-brand-900 rounded-xl p-6 text-white text-center">
        <h4 className="font-serif text-xl font-bold mb-2">Subscribe to Qingling</h4>
        <p className="text-brand-100 text-sm mb-4">Get the latest AI breakthroughs delivered to your inbox.</p>
        <button className="w-full py-2 bg-white text-brand-900 font-bold rounded shadow hover:bg-brand-50 transition-colors text-sm">
          Subscribe
        </button>
      </div> */}
    </aside>
  );
};

export default Sidebar;
