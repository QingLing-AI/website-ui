import './globals.css';
import '@fortawesome/fontawesome-free/css/all.css';

import type { Metadata } from 'next';
// import { ResolvingViewport } from 'next';
import { ReactNode } from 'react';
// import { isRtlLang } from 'rtl-detect';

// import { DEFAULT_LANG } from '@/const/locale';
import GlobalProvider from '@/layout/GlobalProvider';
import { DynamicLayoutProps } from '@/types/next';
import { RouteVariants } from '@/utils/server/routeVariants';

export const metadata: Metadata = {
  title: '轻羚科技 - QINGLING AI',
  description: '轻羚科技致力于企业级大模型推理性能优化和AI智能体开发，提供全方位AI解决方案。',
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
        <GlobalProvider
            isMobile={isMobile}
            locale={locale}
            variants={variants}
          >
            {children}
          </GlobalProvider>
      </body>
    </html>
  );
}

export default RootLayout;