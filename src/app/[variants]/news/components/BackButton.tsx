'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BackButton: React.FC = () => {
  const { t } = useTranslation();
  const onBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={onBack}
      className="group flex items-center text-sm font-medium text-gray-500 hover:text-brand-600 mb-6 transition-colors"
    >
      <ArrowLeft
        size={16}
        className="mr-2 transform group-hover:-translate-x-1 transition-transform"
      />
      {t('news.backToNews')}
    </button>
  );
};

export default BackButton;
