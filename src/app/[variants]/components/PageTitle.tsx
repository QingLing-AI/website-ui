interface PageTitleProps {
  title: string;
  description: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
  return (
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          {description}
        </p>
      </div>
  );
};

export default PageTitle;
