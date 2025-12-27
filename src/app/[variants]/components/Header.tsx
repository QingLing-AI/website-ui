'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Locales, localeOptions } from '@/locales/resources';

import { NavView, scrollToSection } from './Header.view';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language as Locales;

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileDropdownOpen(false); // Close language dropdown when menu toggles
  };

  const getI18nDisplayName = (lang: Locales) => {
    return localeOptions.find((option) => option.value === lang)?.label;
  };

  const changeLanguage = (lang: Locales) => {
    // i18n.changeLanguage(lang)
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);

    const url = new URL(location.href);
    url.searchParams.set('hl', lang);
    location.replace(url.toString());
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-brand-50 text-white rounded-lg">
            <Image
              src="/logo.png"
              alt="Qingling Tech Logo"
              width={106}
              height={48}
              className="h-12 w-auto"
            />
          </div>
          {/* <span className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
            Qingling <span className="text-brand-600">AI</span>
          </span> */}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          <NavView
            itemCls="text-gray-600 hover:text-primary transition duration-300"
            onNavItemClick={() => {
              setIsOpen(false);
            }}
          />

          <div className="relative">
            <button
              onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
              className="px-3 py-1 rounded border border-gray-300 hover:border-primary text-gray-600 hover:text-primary transition-colors text-sm font-medium flex items-center"
              aria-haspopup="true"
              aria-expanded={isDesktopDropdownOpen}
            >
              {getI18nDisplayName(currentLanguage)}
              <i
                className={`ml-1 fas fa-chevron-down text-xs transition-transform ${isDesktopDropdownOpen ? 'transform rotate-180' : ''}`}
              ></i>
            </button>
            {isDesktopDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                {localeOptions.map((option) => {
                  const activeCls =
                    option.value === currentLanguage ? 'text-primary font-medium' : 'text-gray-700';
                  return (
                    <button
                      key={option.value}
                      className={
                        'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ' +
                        activeCls
                      }
                      onClick={() => changeLanguage(option.value)}
                    >
                      {option.label}
                    </button>
                  );
                })}
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
              {/* {getI18nDisplayName()} */}
              <i
                className={`ml-1 fas fa-chevron-down text-xs transition-transform ${isMobileDropdownOpen ? 'transform rotate-180' : ''}`}
              ></i>
            </button>
            {isMobileDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                {localeOptions.map((option) => {
                  const activeCls =
                    option.value === currentLanguage ? 'text-primary font-medium' : 'text-gray-700';
                  return (
                    <button
                      key={option.value}
                      className={
                        'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ' +
                        activeCls
                      }
                      onClick={() => changeLanguage(option.value)}
                    >
                      {option.label}
                    </button>
                  );
                })}
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
      <div
        className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-130 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <NavView
            itemCls="text-gray-600 hover:text-primary py-2 transition duration-300 border-b border-gray-100 last:border-0"
            onNavItemClick={() => {
              setIsOpen(false);
            }}
          />

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

export default Header;
