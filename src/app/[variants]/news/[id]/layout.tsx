import BackButton from '../components/BackButton';

interface NewsDetailLayoutProps {
  children: React.ReactNode;
}
const NewsDetailLayout: React.FC<NewsDetailLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1  animate-fade-in">
      {/* Main Content */}
      {/* <div className="lg:col-span-8"> */}
      <BackButton />
      {children}
      {/* </div> */}
    </div>
  );
};

export default NewsDetailLayout;
