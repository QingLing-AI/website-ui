import { resolveAcceptLanguage } from 'resolve-accept-language';

import { DEFAULT_LANG, LOCALE_COOKIE } from '@/const/locale';
import { Locales, locales, normalizeLocale } from '@/locales/resources';

import { RouteVariants } from './server/routeVariants';

// Check if we're in a server environment
const isServer = typeof window === 'undefined';

/**
 * Parse the browser language and return the fallback language
 */
export const parseBrowserLanguage = (headers: Headers, defaultLang: string = DEFAULT_LANG) => {
  // if the default language is not 'en-US', just return the default language as fallback lang
  if (defaultLang !== 'en-US') return defaultLang;

  /**
   * The arguments are as follows:
   *
   * 1) The HTTP accept-language header.
   * 2) The available locales (they must contain the default locale).
   * 3) The default locale.
   */
  let browserLang: string = resolveAcceptLanguage<typeof locales, false>(
    headers.get('accept-language') || '',
    //  Invalid locale identifier 'ar'. A valid locale should follow the BCP 47 'language-country' format.
    // locales.map((locale) => (locale.toString() === 'ar' ? 'ar-EG' : locale)),
    locales,
    defaultLang,
  );

  // if match the ar-EG then fallback to ar
  // if (browserLang === 'ar-EG') browserLang = 'ar';

  return browserLang;
};

/**
 * Parse the page locale from the URL and search
 * used in cloud
 */
export const parsePageLocale = async (props: {
  params: Promise<{ variants: string }>;
  searchParams: Promise<any>;
}) => {
  const searchParams = await props.searchParams;

  const browserLocale = await RouteVariants.getLocale(props);
  return normalizeLocale(searchParams?.hl || browserLocale) as Locales;
};

export const getLocaleFromCookie = async () => {
  if (isServer) {
    // Server-side implementation
    const { cookies, headers } = await import('next/headers');
    return (await cookies()).get(LOCALE_COOKIE)?.value ??
          (await headers()).get('accept-language')?.split(',')[0] ??
          DEFAULT_LANG;
  } else {
    // Client-side implementation - try to get locale from localStorage or URL
    if (typeof window !== 'undefined') {
      // Try to get from localStorage
      const storedLocale = localStorage.getItem(LOCALE_COOKIE);
      if (storedLocale) {
        return storedLocale;
      }

      // Try to get from URL query params
      const urlParams = new URLSearchParams(window.location.search);
      const urlLocale = urlParams.get('hl');
      if (urlLocale) {
        return urlLocale;
      }
    }

    // Fallback to browser language
    return navigator.language || DEFAULT_LANG;
  }
}
