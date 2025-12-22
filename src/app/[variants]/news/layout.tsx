import Sidebar from './components/Sidebar';

interface NewsLayoutProps {
  children: React.ReactNode;
}

const NewsLayout: React.FC<NewsLayoutProps> = ({ children }) => {
  return (
    <main className="grow container mx-auto px-4 md:px-6 py-10 md:py-16">
      {/* Page Title Section */}
      {/* <TitleSection /> */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8">{children}</div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4 pl-0 lg:pl-8 border-l border-gray-200/0 lg:border-gray-200">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsLayout;
