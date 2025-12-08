import React from 'react';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 bg-primary-pale">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-primary rounded-lg mb-6 flex items-center justify-center group-hover:bg-primary-dark transition-colors">
                <i className={`fas ${service.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{t(service.title)}</h3>
              <p className="text-gray-600 mb-6 min-h-[48px]">
                {t(service.description)}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span className="text-sm text-gray-600">{t(feature)}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-block font-medium text-primary hover:underline hover:text-primary-dark transition-colors">
                {t('hero.btnService')} <i className="fas fa-arrow-right ml-1 text-sm"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;