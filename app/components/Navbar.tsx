'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n-provider';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage: changeLang, getI18nDisplayName } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileDropdownOpen(false); // Close language dropdown when menu toggles
  };

  const changeLanguage = (lang: 'zh' | 'zhTW' | 'en') => {
    changeLang(lang);
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsOpen(false);
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="logo-link cursor-pointer">
          <img
            src="https://www.yanqueai.com/vilook/imgtoimg/63/a2/fdf64c78cf6dfdf59d79f615cfd6693ddefc.png"
            alt="Qingling Tech Logo"
            className="h-12"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-gray-600 hover:text-primary font-medium transition duration-300"
            >
              {t(item.label)}
            </a>
          ))}
          
          <div className="relative">
            <button
              onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
              className="px-3 py-1 rounded border border-gray-300 hover:border-primary text-gray-600 hover:text-primary transition-colors text-sm font-medium flex items-center"
              aria-haspopup="true"
              aria-expanded={isDesktopDropdownOpen}
            >
              {getI18nDisplayName()}
              <i className={`ml-1 fas fa-chevron-down text-xs transition-transform ${isDesktopDropdownOpen ? 'transform rotate-180' : ''}`}></i>
            </button>
            {isDesktopDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                <button
                  onClick={() => changeLanguage('zh')}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLanguage === 'zh' ? 'text-primary font-medium' : 'text-gray-700'}`}
                >
                  中文简体
                </button>
                <button
                  onClick={() => changeLanguage('zhTW')}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLanguage === 'zhTW' ? 'text-primary font-medium' : 'text-gray-700'}`}
                >
                  中文繁體
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLanguage === 'en' ? 'text-primary font-medium' : 'text-gray-700'}`}
                >
                  English
                </button>
              </div>
            )}
          </div>

          <a 
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium shadow-lg transition-all transform hover:scale-105"
          >
            {t('nav.consult')}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="px-2 py-1 rounded border border-gray-300 text-gray-600 text-xs font-medium flex items-center"
              aria-haspopup="true"
              aria-expanded={isMobileDropdownOpen}
            >
              {getI18nDisplayName()}
              <i className={`ml-1 fas fa-chevron-down text-xs transition-transform ${isMobileDropdownOpen ? 'transform rotate-180' : ''}`}></i>
            </button>
            {isMobileDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                <button
                  onClick={() => changeLanguage('zh')}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLanguage === 'zh' ? 'text-primary font-medium' : 'text-gray-700'}`}
                >
                  中文简体
                </button>
                <button
                  onClick={() => changeLanguage('zhTW')}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLanguage === 'zhTW' ? 'text-primary font-medium' : 'text-gray-700'}`}
                >
                  中文繁體
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLanguage === 'en' ? 'text-primary font-medium' : 'text-gray-700'}`}
                >
                  English
                </button>
              </div>
            )}
          </div>
          <button 
            onClick={toggleMenu} 
            className="text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-gray-600 hover:text-primary font-medium py-2 transition duration-300 border-b border-gray-100 last:border-0"
            >
              {t(item.label)}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-lg text-center mt-2"
          >
            {t('nav.consult')}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;