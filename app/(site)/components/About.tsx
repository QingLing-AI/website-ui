'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { key: 'team', icon: 'fa-brain' },
    { key: 'perf', icon: 'fa-rocket' },
    { key: 'coop', icon: 'fa-handshake' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Our Team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto transform hover:scale-[1.01] transition duration-500"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-primary">{t('about.subtitle')}</h3>
            <p className="text-gray-600 mb-6">
              {t('about.subDesc')}
            </p>

            <div className="space-y-6">
              {features.map((f) => (
                <div key={f.key} className="flex items-start group">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-primary-dark transition-colors">
                      <i className={`fas ${f.icon}`}></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{t(`about.features.${f.key}.title`)}</h4>
                    <p className="text-gray-600">{t(`about.features.${f.key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;