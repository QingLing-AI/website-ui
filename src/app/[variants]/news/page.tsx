import * as strapi from '@/services/strapi';

import MainSection from './components/MainSection';

// import TitleSection from './components/TitleSection';

interface NewsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const NewsPage: React.FC<NewsPageProps> = async ({ searchParams = {} }) => {
  const params = (await searchParams) || {};
  const currentPage = parseInt((params.page as string) || '1', 10);
  const pageSize = 3;

  const { articles, pagination } = await strapi.findManyArticles({
    pagination: { page: currentPage, pageSize },
    filters: {
      cate: params.cate?.toString(),
      tag: params.tag?.toString(),
    },
  });

  return <MainSection posts={articles} pagination={pagination} />;
};

export default NewsPage;
