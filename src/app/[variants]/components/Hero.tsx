'use client';

import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative bg-linear-to-r from-blue-50 to-blue-100 py-20 md:py-32">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 mt-10 md:mt-0 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {/* <span className="block">{t('hero.title1')}</span> */}
            <span className="bg-linear-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {t('hero.title2')}
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 ">{t('hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#services"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium shadow-lg text-center transition-transform hover:scale-105"
            >
              {t('hero.btnService')}
            </a>
            <a
              href="#contact"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium text-center transition-all hover:scale-105"
            >
              {t('hero.btnContact')}
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center z-10">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
            alt="AI Technology"
            width={600}
            height={400}
            className="w-full max-w-lg rounded-lg shadow-xl transform transition hover:scale-[1.02] duration-500 h-auto"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-1/4 left-10 w-12 h-12 rounded-full bg-blue-200 opacity-60 animate-pulse"></div>
      <div className="hidden md:block absolute bottom-1/4 right-10 w-20 h-20 rounded-full bg-blue-300 opacity-40"></div>
      <div className="hidden md:block absolute top-3/4 left-1/4 w-8 h-8 rounded-full bg-blue-400 opacity-30"></div>
    </section>
  );
};

export default Hero;
