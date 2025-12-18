import type { StrapiClient as _StrapiClient, API } from '@strapi/client';
import { strapi } from '@strapi/client';

const { STRAPI_BASE_URL, STRAPI_AUTH_TOKEN } = process.env;


export class StrapiClient {

  baseURL: string;
  private client: _StrapiClient;
  constructor() {

    if (!STRAPI_BASE_URL) {
      throw new Error('STRAPI_BASE_URL not found. Please set STRAPI_BASE_URL in .env');
    }

    if (!STRAPI_AUTH_TOKEN) {
      throw new Error('STRAPI_AUTH_TOKEN not found. Please set STRAPI_AUTH_TOKEN in .env');
    }

    this.baseURL = STRAPI_BASE_URL!.replace(/\/$/, '');

    const apiBase = this.baseURL + '/api';
    this.client = strapi({ baseURL: apiBase, auth: STRAPI_AUTH_TOKEN });
  }

  private fixupLocale(locale: string) {
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

  async findSingle(resource: string, options?: API.BaseQueryParams) {
    if (options?.locale) {
      options.locale = this.fixupLocale(options.locale)
    }
    return await this.client.single(resource).find(options);
  }
}
