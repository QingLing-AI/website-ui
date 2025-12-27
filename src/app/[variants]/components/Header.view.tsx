import { usePathname } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHash } from '@/hooks/navigator';


export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'nav.home', href: '/#home' },
  { label: 'nav.about', href: '/#about' },
  { label: 'nav.news', href: '/news' },
  { label: 'nav.services', href: '/#services' },
  { label: 'nav.team', href: '/#team' },
  { label: 'nav.contact', href: '/#contact' },
];

interface NavViewProps {
  itemCls?: string;
  onNavItemClick?: () => void;
}

export  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      return true
    }
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      window.location.href = href;
    }
    else {
      window.location.href = '/' + href;
    }
  };
export const NavView: React.FC<NavViewProps> = ({onNavItemClick, itemCls}) => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const hash = useHash()

  const isActive = (href: string) => {
    if (pathname === '/') {
      return href.startsWith("#") && hash === href
    }
    return pathname.startsWith(href)
  }

  return NAV_ITEMS.map((item) => (
      <a
        key={item.label}
        href={item.href}
        onClick={(e) => {
          onNavItemClick?.();
          scrollToSection(e, item.href)
        }}
        className={`${itemCls} ${isActive(item.href) ? ' text-primary-dark font-medium' : ''}`}
      >
        {/* @ts-ignore */}
        {t(item.label)}
      </a>
    ))
};

