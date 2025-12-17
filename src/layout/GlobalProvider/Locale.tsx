'use client';

import { PropsWithChildren, memo, useEffect, useState } from 'react';
// import { isRtlLang } from 'rtl-detect';

import { createI18nNext } from '@/locales/create';
import { isOnServerSide } from '@/utils/env';


interface LocaleLayoutProps extends PropsWithChildren {
  defaultLang?: string;
}

const Locale = memo<LocaleLayoutProps>(({ children, defaultLang }) => {
  const [i18n] = useState(createI18nNext(defaultLang));
  const [lang, setLang] = useState(defaultLang);

  // if run on server side, init i18n instance everytime
  if (isOnServerSide) {
    // use sync mode to init instantly
    i18n.init({ initAsync: false });

  } else {
    // if on browser side, init i18n instance only once
    if (!i18n.instance.isInitialized)
      // console.debug('locale', lang);
      i18n.init().then(async () => {
        if (!lang) return;
        // do something
      });
  }

  // handle i18n instance language change
  useEffect(() => {
    const handleLang = async (lng: string) => {
      setLang(lng);
    };

    i18n.instance.on('languageChanged', handleLang);
    return () => {
      i18n.instance.off('languageChanged', handleLang);
    };
  }, [i18n, lang]);

  // detect document direction
//   const documentDir = isRtlLang(lang!) ? 'rtl' : 'ltr';

  return (
    <>{children}</>
  );
});

Locale.displayName = 'Locale';

export default Locale;
