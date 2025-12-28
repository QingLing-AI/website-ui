import { supportLocales } from '@/locales/resources';

export const DEFAULT_LANG = 'zh-HK';
export const LOCALE_COOKIE = 'QL_LOCALE';

/**
 * Check if the language is supported
 * @param locale
 */
export const isLocaleNotSupport = (locale: string) => !supportLocales.includes(locale);
