'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider, useTranslation } from 'react-i18next';

// Import locale files
import zhTranslation from './locales/zh.json';
import zhTWTranslation from './locales/zhTW.json';
import enTranslation from './locales/en.json';

// Define the available languages and their display names
const LANGUAGES = {
  zh: '中文简体',
  zhTW: '中文繁體',
  en: 'English',
} as const;

type LanguageKey = keyof typeof LANGUAGES;

const resources = {
  zh: {
    translation: zhTranslation
  },
  zhTW: {
    translation: zhTWTranslation
  },
  en: {
    translation: enTranslation
  }
} as const;

// Initialize on the server and client with consistent default
// Server will use this for initial render, client will use it until hydration completes
if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'zh',
      lng: 'zh', // Consistent default for both server and client
      debug: false, // Turn off debug during SSR to reduce logs
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
      },
    });
}

interface I18nContextType {
  currentLanguage: LanguageKey;
  changeLanguage: (lang: LanguageKey) => void;
  getI18nDisplayName: (lang?: LanguageKey) => string;
  isInitialized: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export default function I18nProvider({ children }: Props) {
  const [isInitialized, setIsInitialized] = useState(i18next.isInitialized);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const addLanguageDetector = async () => {
      try {
        // Add LanguageDetector after initial hydration to enable language detection
        const { default: LanguageDetector } = await import('i18next-browser-languagedetector');
        i18next.use(LanguageDetector);

        // Update state to signal that initialization is complete (for client-side)
        if (isMounted) {
          setIsInitialized(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to add language detector'));
          setIsInitialized(true);
        }
      }
    };

    // If i18next is already initialized (from module-level init), just add the detector
    if (i18next.isInitialized && !isInitialized) {
      addLanguageDetector();
    } else if (!i18next.isInitialized) {
      // If not initialized, initialize now (shouldn't happen with our setup, but just in case)
      setIsInitialized(true);
    }

    return () => {
      isMounted = false;
    };
  }, [isInitialized]);

  // Show error state if initialization failed
  if (error) {
    console.error('i18n initialization error:', error);
    return (
      <I18nextProvider i18n={i18next}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Language Loading Error</h2>
            <p className="text-gray-600 mb-4">Failed to load language resources. Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </I18nextProvider>
    );
  }

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <I18nextProvider i18n={i18next}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-600">Loading language resources...</p>
          </div>
        </div>
      </I18nextProvider>
    );
  }

  // Wrap the inner content in a component that uses the translation hook
  const I18nProviderContent = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: LanguageKey) => {
      i18n.changeLanguage(lang);
    };

    const getI18nDisplayName = (lang?: LanguageKey): string => {
      const language = lang || (i18n.language as LanguageKey);
      return LANGUAGES[language] || LANGUAGES.zh;
    };

    const value: I18nContextType = {
      currentLanguage: (i18n.language in LANGUAGES ? i18n.language as LanguageKey : 'zh'),
      changeLanguage,
      getI18nDisplayName,
      isInitialized,
    };

    return (
      <I18nContext.Provider value={value}>
        {children}
      </I18nContext.Provider>
    );
  };

  return (
    <I18nextProvider i18n={i18next}>
      <I18nProviderContent />
    </I18nextProvider>
  );
}

export const useLanguage = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a I18nProvider');
  }
  return context;
};