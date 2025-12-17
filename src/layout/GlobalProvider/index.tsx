import { ReactNode } from 'react';

import Locale from './Locale';

interface GlobalLayoutProps {
  children: ReactNode;
  isMobile: boolean;
  locale: string;
  variants?: string;
}

const GlobalLayout = async ({
  children,
  locale: userLocale,
//   isMobile,
//   variants,
}: GlobalLayoutProps) => {

  return (
    <Locale defaultLang={userLocale}>
    {children}
    </Locale>
  );
};

export default GlobalLayout;
