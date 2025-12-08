import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface I18nContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  getI18nDisplayName: (lang?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const getI18nDisplayName = (lang?: string): string => {
    const language = lang || i18n.language;
    switch (language) {
      case 'zh':
        return '中文简体';
      case 'zhTW':
        return '中文繁體';
      case 'en':
        return 'English';
      default:
        return '中文简体';
    }
  };

  const value: I18nContextType = {
    currentLanguage: i18n.language,
    changeLanguage,
    getI18nDisplayName,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a I18nProvider');
  }
  return context;
};