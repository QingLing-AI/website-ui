import 'server-only';

import type { StrapiClient as _StrapiClient } from '@strapi/client';
import { strapi } from '@strapi/client';

function createClient(): _StrapiClient {
  const {STRAPI_BASE_URL, STRAPI_AUTH_TOKEN} = process.env;

  if (!STRAPI_BASE_URL) {
    throw new Error('STRAPI_BASE_URL not found. Please set STRAPI_BASE_URL in .env');
  }

  if (!STRAPI_AUTH_TOKEN) {
    throw new Error('STRAPI_AUTH_TOKEN not found. Please set STRAPI_AUTH_TOKEN in .env');
  }

  return strapi({ baseURL: STRAPI_BASE_URL, auth: STRAPI_AUTH_TOKEN });
}


export class StrapiClient {

  private client: _StrapiClient;
  constructor() {
    this.client = createClient();
  }

  private fixLocale(locale: string) {
    switch (locale) {
      case 'en':
        return 'en-US'
      case 'zh':
        return 'zh-CN'
      case 'zh-TW':
        return 'zh-Hant-TW'
      default:
        return locale
    }
  }
  async findSingle(resource: string, locale?: string) {
    const data = await this.client.single(resource).find({
      locale: this.fixLocale(locale),
    });
    return data;
  }
}