import { API } from '@strapi/client';

export type Pagination = API.Pagination;

// Define TypeScript interfaces for the blocks
export interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  body: string;
}

export interface QuoteBlock {
  __component: 'shared.quote';
  id: number;
  title?: string;
  body: string;
}

export interface MediaFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  mime?: string | null;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SliderBlock {
  __component: 'shared.slider';
  id: number;
  files: MediaFile[];
}

export interface MediaBlock {
  __component: 'shared.media';
  id: number;
  file: MediaFile;
}

// 文章类型
export type ArticleBlock = RichTextBlock | QuoteBlock | SliderBlock | MediaBlock;

export interface Category extends API.Document {
  name: string;
  slug?: string;
  description?: string;
}

export interface Tag extends API.Document {
  id: number;
  documentId: string;
  name: string;
  slug?: string;
  description?: string;
}

export interface Article extends API.Document {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author?: {
    id: number;
    documentId: string;
    name: string;
    email: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar?: any;
  };
  category?: Category;
  tags?: Tag[];
  cover?: MediaFile;
  blocks?: ArticleBlock[];
}
