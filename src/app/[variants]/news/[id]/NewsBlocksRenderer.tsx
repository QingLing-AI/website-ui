'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import type { ArticleBlock, MediaFile, SliderBlock } from '@/types/strapi';

interface ArticleBlocksRendererProps {
  blocks: ArticleBlock[];
}

// Helper function to get the proper image URL
const getImageUrl = (file: MediaFile): string => {
  if (!file.url) return '';
  return file.url.startsWith('http') ? file.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${file.url}`;
};

// Helper function to get optimized image dimensions
const getImageDimensions = (file: MediaFile, size: 'small' | 'medium' | 'large' | 'original' = 'original') => {
  if (size !== 'original' && file.formats && file.formats[size]) {
    return {
      width: file.formats[size]?.width,
      height: file.formats[size]?.height,
    };
  }
  return { width: file.width, height: file.height };
};

const ArticleBlocksRenderer: React.FC<ArticleBlocksRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) {
    return <div>No content available</div>;
  }

  // Slider component for shared.slider blocks
  const Slider = ({ sliderBlock }: { sliderBlock: SliderBlock }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!sliderBlock.files || sliderBlock.files.length === 0) {
      return null;
    }

    const goToSlide = (index: number) => {
      setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
      const isFirstSlide = currentSlide === 0;
      const newIndex = isFirstSlide ? sliderBlock.files.length - 1 : currentSlide - 1;
      setCurrentSlide(newIndex);
    };

    const goToNextSlide = () => {
      const isLastSlide = currentSlide === sliderBlock.files.length - 1;
      const newIndex = isLastSlide ? 0 : currentSlide + 1;
      setCurrentSlide(newIndex);
    };

    return (
      <div className="my-8">
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            {sliderBlock.files.map((file, index) => {
              const imageUrl = getImageUrl(file);
              const { width, height } = getImageDimensions(file, 'large');

              if (index !== currentSlide) return null;

              return (
                <div key={file.id} className="relative aspect-video">
                  <Image
                    src={imageUrl}
                    alt={file.alternativeText || file.name}
                    // fill
                    // className="object-cover"
                    width={width}
                    height={height}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              );
            })}
          </div>

          {/* Slider Controls */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {sliderBlock.files.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="article-content">
      {blocks.map((block, index) => {
        switch (block.__component) {
          case 'shared.rich-text':
            return (
              <div key={index} className="mb-6 prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <ReactMarkdown
                  components={{
                    // Custom rendering for images in markdown to use Next.js Image
                    img: ({ node, ...props }) => {
                      const src = props.src || '';
                      if (typeof src !== 'string') {
                        // If src is not a string, render as a regular image
                        return <img {...props} className="my-4 rounded-lg" />;
                      }
                      return (
                        <Image
                          src={src}
                          alt={props.alt || 'Article image'}
                          width={600}
                          height={400}
                          style={{
                            width: '100%',    // 响应式宽度
                            height: 'auto',   // 高度自动按比例
                          }}
                          className="my-4 rounded-lg"
                        />
                      );
                    },
                    // Custom rendering for links to open in new tab
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                >
                  {block.body}
                </ReactMarkdown>
              </div>
            );

          case 'shared.quote':
            return (
              <div
                key={index}
                className="my-8 p-6 bg-gray-50 border-l-4 border-primary italic"
              >
                {block.title && (
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{block.title}</h4>
                )}
                <p className="text-gray-700 text-lg">{block.body}</p>
              </div>
            );

          case 'shared.slider':
            return <Slider key={index} sliderBlock={block} />;

          case 'shared.media':
            if (!block.file) {
              return null;
            }

            const imageUrl = getImageUrl(block.file);
            const { width, height } = getImageDimensions(block.file, 'large');

            // Check if the file is a video by checking the extension
            const isVideo = block.file.mime?.startsWith('video/');

            if (isVideo) {
              return (
                <div key={index} className="my-8">
                  <video
                    src={imageUrl}
                    controls
                    className="w-full max-w-2xl mx-auto rounded-lg"
                  />
                </div>
              );
            } else {
              return (
                <div key={index} className="my-8">
                  <div className="flex justify-center max-w-2xl mx-auto rounded-lg overflow-hidden">
                    {/* <div > */}
                    <Image
                      src={imageUrl}
                      alt={block.file.alternativeText || block.file.name}
                      width={width}
                      height={height}
                    />
                    {/* {block.file.caption && (
                      <div className="text-sm text-gray-500 text-center mt-2 p-2">
                        {block.file.caption}
                      </div>
                    )}
                    </div> */}
                  </div>
                </div>
              );
            }

          default:
            console.warn(`Unknown block component: ${(block as ArticleBlock).__component}`);
            return null;
        }
      })}
    </div>
  );
};

export default ArticleBlocksRenderer;
