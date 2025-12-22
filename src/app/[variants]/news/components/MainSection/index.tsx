import { Article, Pagination } from '@/types/strapi';

import FeaturePost from './FeaturePost';
import RecentPosts from './RecentPosts';

const MainSection: React.FC<{ posts: Article[]; pagination: Pagination }> = async ({
  posts,
  pagination,
}) => {
  if (!posts || posts.length === 0) {
    return <div> No posts found.</div>;
  }

  const featuredPost = posts[0];
  const standardPosts = posts.slice(1);

  return (
    <>
      {/* Requirement 1: First post with Cover Image + Text */}
      <FeaturePost post={featuredPost} />

      {/* Requirement 2: Other posts with Left Thumb + Right Text */}
      <RecentPosts posts={standardPosts} pagination={pagination} />
    </>
  );
};

export default MainSection;
