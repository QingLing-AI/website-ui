import Image from 'next/image';
import React from 'react';

import { Article, Category, MediaFile, Pagination, RichTextBlock, Tag } from '@/types/strapi';

// Function to extract text from the first rich-text block and truncate it
export const getFirstRichTextBlockContent = (post: Article, maxLength: number = 150): string => {
  const blocks = post.blocks;
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  // Find the first rich-text block
  const firstRichTextBlock = blocks.find(
    (block) => block.__component === 'shared.rich-text',
  ) as RichTextBlock;

  if (!firstRichTextBlock || !firstRichTextBlock.body) {
    return '';
  }

  // Remove HTML tags and markdown formatting to get plain text
  let plainText = firstRichTextBlock.body
    // Remove markdown-style links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown-style images ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove markdown headers
    .replace(/^#+\s*/gm, '')
    // Remove other markdown elements but keep the text
    .replace(/(\*{1,2}|_{1,2}|`{1,3})(.*?)\1/g, '$2')
    // Replace markdown line breaks
    .replace(/\n{2,}/g, ' ')
    // Replace markdown horizontal rules
    .replace(/^\s*[-*_]{3,}\s*$/gm, ' ')
    // Remove extra whitespaces
    .replace(/\s+/g, ' ')
    .trim();

  // If the plain text is longer than maxLength, truncate it and add ellipsis
  if (plainText.length > maxLength) {
    plainText = plainText.substring(0, maxLength) + '...';
  }

  return plainText;
};

export const getPostExcerpt = (post: Article) => {
  if (post.description) {
    return post.description;
  }

  if (post.blocks && post.blocks.length > 0) {
    return getFirstRichTextBlockContent(post, 300);
  }

  return '(No content)';
};

export const PostCover: React.FC<{ url?: string | null; alt?: string }> = ({ url, alt }) => {
  return url ? (
    <Image
      src={url}
      alt={alt || ''}
      fill
      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
    />
  ) : (
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
      <span className="text-gray-500">No Image</span>
    </div>
  );
};
