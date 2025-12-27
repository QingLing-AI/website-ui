import { headers } from 'next/headers';

import { DEFAULT_LANG } from '@/const/locale';
import { StrapiClient } from '@/libs/strapi';
import type { Locales } from '@/locales/resources';
import type { Article, Category, Tag } from '@/types/strapi';

const getLocale = async (): Promise<Locales> => {
  const locale = (await headers()).get('x-locale') as Locales;
  return locale || DEFAULT_LANG;
};

export async function getContactData() {
  const locale = await getLocale();

  const client = new StrapiClient();
  const { data } = await client.findSingle('contact', { locale });
  return data;
}
export async function getLogo() {
  const client = new StrapiClient();
  try {
    const { data } = await client.findSingle('logo', { populate: { light: true, dark: true } });
    return { light: client.baseURL + data.light.url, dark: client.baseURL + data.dark.url };
  } catch (error) {
    return {};
  }
}

/**
 * categories collection
 */
export async function findCategories(): Promise<Category[]> {
  const client = new StrapiClient();
  const locale = await getLocale();

  try {
    const { data } = await client.findCollection('categories', { locale });
    return data as Category[];
  } catch (error) {
    console.error('error to call findCategories', error);
    return [];
  }
}

/**
 * tags collection
 */
export async function findTags(): Promise<Tag[]> {
  const client = new StrapiClient();
  const locale = await getLocale();

  try {
    const { data } = await client.findCollection('tags', { locale });
    return data as Tag[];
  } catch (error) {
    console.error('error to call findTags', error);
    return [];
  }
}

/**
 * 文章操作
 */

const fixupArticleUrl = (article: Article | null) => {
  const baseUrl = process.env.STRAPI_BASE_URL || '/';

  if (article?.cover?.url.startsWith('/')) {
    article.cover.url = baseUrl + article.cover.url;
  }
  const author = article?.author;
  if (author?.avatar?.url.startsWith('/')) {
    author.avatar.url = baseUrl + author.avatar.url;
  }
  return article;
};

export async function findManyArticles({
  pagination = { page: 1, pageSize: 10 },
  filters = {},
}: {
  pagination?: { page: number; pageSize: number };
  filters?: {
    cate?: string;
    tag?: string;
  };
}) {
  const client = new StrapiClient();
  const locale = await getLocale();
  const { page, pageSize } = pagination;

  let strapiFilters: any = {};
  if (filters.cate) {
    strapiFilters.category = {
      documentId: { $eq: filters.cate },
    };
  }
  if (filters.tag) {
    strapiFilters.tags = {
      documentId: { $contains: filters.tag },
    };
  }
  try {
    // const offset = (page - 1) * pageSize;
    const { data, meta } = await client.findCollection('articles', {
      populate: {
        author: {
          populate: {
            avatar: true,
          },
        },
        cover: true,
        blocks: true,
        category: true,
        tags: true,
      },
      locale,
      filters: strapiFilters,
      pagination: {
        page: page,
        pageSize: pageSize,
      },
      sort: ['publishedAt:desc'], // Sort by published date, newest first
    });

    const paginationData = meta?.pagination || {
      page: 1,
      pageSize: pageSize,
      pageCount: 1,
      total: data.length,
    };

    return {
      articles: (data as Article[]).map(fixupArticleUrl).filter((a) => !!a),
      pagination: {
        page: paginationData.page,
        pageSize: paginationData.pageSize,
        pageCount: paginationData.pageCount,
        total: paginationData.total,
      },
    };
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return {
      articles: [],
      pagination: {
        page: 1,
        pageSize: pageSize,
        pageCount: 1,
        total: 0,
      },
    };
  }
}

export async function findOneArticle(id: string) {
  const client = new StrapiClient();
  const locale = await getLocale();
  // Try multiple approaches to find the article
  let article = null;
  const populate = {
    author: {
      populate: {
        avatar: true,
      },
    },
    category: true,
    tags: true,
    cover: true,
    blocks: { populate: '*' },
  };
  // First, try findOne with the ID
  try {
    const response = await client.findOne('articles', id, {
      populate: populate,
      locale,
    });
    article = response.data ?? null;
  } catch (error) {
    console.error('Error fetching article with findOne:', error);
  }

  // If that fails, try find with filters
  if (!article) {
    try {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        const response = await client.findCollection('articles', {
          filters: {
            id: numericId,
          },
          populate: populate,
        });
        article = response.data && response.data[0] ? response.data[0] : null;
      }
    } catch (error) {
      console.error('Error fetching article with find by id:', error);
    }
  }

  return fixupArticleUrl(article as Article);
}
