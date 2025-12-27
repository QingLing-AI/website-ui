import '@fortawesome/fontawesome-free/css/all.css';
import type { Metadata } from 'next';
// import { ResolvingViewport } from 'next';
import { ReactNode } from 'react';

// import { isRtlLang } from 'rtl-detect';

// import { DEFAULT_LANG } from '@/const/locale';
import GlobalProvider from '@/layout/GlobalProvider';
import { DynamicLayoutProps } from '@/types/next';
import { RouteVariants } from '@/utils/server/routeVariants';

import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'IoDEG香港數字經濟治理研究院',
  description: '立足香港、辐射亚太、链接全球的数字经济治理顶尖智库与技术服务中心。',
};

interface RootLayoutProps extends DynamicLayoutProps {
  children: ReactNode;
}
const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const { variants } = await params;

  const { locale, isMobile } = RouteVariants.deserializeVariants(variants);

  // const direction = isRtlLang(locale) ? 'rtl' : 'ltr';
  const direction = 'ltr';
  return (
    <html dir={direction} lang={locale}>
      <body>
        <GlobalProvider isMobile={isMobile} locale={locale} variants={variants}>
          <div className="font-sans antialiased text-gray-800">
            <Header />
            {children}
            <Footer />
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
};

export default RootLayout;
