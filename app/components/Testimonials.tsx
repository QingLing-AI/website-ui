'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-primary-pale">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-primary mb-4">
                <i className="fas fa-quote-left text-3xl opacity-80"></i>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{t(item.content)}"
              </p>
              <div className="flex items-center">
                <img 
                  src={item.avatar} 
                  alt={t(item.author)} 
                  className="w-12 h-12 rounded-full mr-4 object-cover shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{t(item.author)}</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">{t(item.role)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20">
         <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 md:p-12 text-center text-white shadow-xl mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{t('cta.subtitle')}</p>
            <a href="#contact" className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors transform hover:scale-105">
              {t('cta.btn')}
            </a>
         </div>
      </div>
    </section>
  );
};

export default Testimonials;