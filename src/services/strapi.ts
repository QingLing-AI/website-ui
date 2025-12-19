import { StrapiClient } from '@/libs/strapi';

import { getLocaleFromCookie } from '@/utils/locale';

export async function getContactData() {
  const locale = await getLocaleFromCookie();

  const client = new StrapiClient();
  const {data} = await client.findSingle('contact', {locale})
  return data
}
export async function getLogo() {
  const client = new StrapiClient();
  try {
    const { data } = await client.findSingle('logo', {populate:{light:true, dark:true}})
    return {light: client.baseURL + data.light.url, dark: client.baseURL + data.dark.url}
  } catch (error) {
    return {}
  }
}

export async function findManyNews(page: number = 1, pageSize: number = 10) {
  const client = new StrapiClient();
  try {
    const offset = (page - 1) * pageSize;
    const { data, meta } = await client.findCollection('articles', {
      populate: {
        author: {
          populate: {
            avatar: true
          }
        },
        cover: true,
        blocks: true
      },
      pagination: {
        page: page,
        pageSize: pageSize
      },
      sort: ['publishedAt:desc'] // Sort by published date, newest first
    });

    const paginationData = meta?.pagination || {
      page: 1,
      pageSize: pageSize,
      pageCount: 1,
      total: data.length
    };

    return {
      articles: data,
      pagination: {
        page: paginationData.page,
        pageSize: paginationData.pageSize,
        pageCount: paginationData.pageCount,
        total: paginationData.total
      }
    };
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return {
      articles: [],
      pagination: {
        page: 1,
        pageSize: pageSize,
        pageCount: 1,
        total: 0
      }
    };
  }
}

export async function findOneNews(id: string) {
  const client = new StrapiClient();

  // Try multiple approaches to find the article
  let article = null;
  const populate = {
    author: {
      populate: {
        avatar: true
      }
    },
    cover: true,
    blocks: {populate: "*"},
  }
  // First, try findOne with the ID
  try {
    const response = await client.findOne('articles', id, {
      populate: populate,
    });
    article = response.data ?? null
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
            id: numericId
          },
          populate: populate,
        });
        article = response.data && response.data[0] ? response.data[0] : null;
      }
    } catch (error) {
      console.error('Error fetching article with find by id:', error);
    }
  }

  return article;
}
