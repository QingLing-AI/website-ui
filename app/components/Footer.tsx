'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <img
              src="https://www.yanqueai.com/vilook/imgtoimg/63/a2/fdf64c78cf6dfdf59d79f615cfd6693ddefc.png"
              alt="Qingling Logo"
              className="h-12 mb-4"
            />
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4 mt-6">
              {['weixin', 'linkedin', 'github', 'zhihu'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className={`fab fa-${social} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.links')}</h4>
              <ul className="space-y-2">
                {['home', 'about', 'services', 'team', 'contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link}`} className="text-gray-400 hover:text-primary transition-colors">
                      {t(`nav.${link}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">{t('services.s1.title')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">{t('services.s2.title')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">{t('services.s3.title')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">AI Training</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Tech Support</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mr-2 text-primary mt-1"></i>
                  <span className="text-gray-400">{t('contact.info.addr')}</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone mr-2 text-primary"></i>
                  <span className="text-gray-400">+86 13717028300</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2 text-primary"></i>
                  <span className="text-gray-400">kf@qingling-ai.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-500 text-xs">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;