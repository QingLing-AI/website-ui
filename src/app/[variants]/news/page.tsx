import * as strapi from '@/services/strapi';
import NewsView from './News.view';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface NewsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const NewsPage: React.FC<NewsPageProps> = async ({ searchParams = {} }) => {
  const currentPage = parseInt((await searchParams)?.page as string || '1', 10);
  const pageSize = 10;

  const { articles, pagination } = await strapi.findManyNews(currentPage, pageSize);

  return (
    <div className="font-sans antialiased text-gray-800">
      <Navbar />
      <main>
        <NewsView
          articles={articles}
          currentPage={pagination.page}
          totalPages={pagination.pageCount}
        />
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
