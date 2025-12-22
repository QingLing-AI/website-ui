import { defineConfig } from '@lobehub/i18n-cli';

export default defineConfig({
  entry: 'locales/zh-CN',
  entryLocale: 'zh-CN',
  output: 'locales',
  outputLocales: ['zh-HK', 'en-US'],
  temperature: 0,
  saveImmediately: true,
  // @ts-ignore
  modelName: process.env.i18nModelName || 'chatgpt-4o-latest',
  experimental: {
    jsonMode: true,
  },
});
