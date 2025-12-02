'use client';

import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { MenuClient } from './types';

interface MenuNavbarProps {
  client: MenuClient;
  onInfoClick?: () => void;
}

export function MenuNavbar({ client, onInfoClick }: MenuNavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = 300;

      if (currentScrollY <= heroHeight) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > heroHeight) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 transition-all duration-300 ${isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
    >
      {/* Language Switcher - Left */}
      <LanguageSwitcher />

      {/* Business Name - Center */}
      <button
        onClick={(e) => {
          // Blur to prevent aria-hidden conflict when drawer opens
          e.currentTarget.blur();
          onInfoClick?.();
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all active:scale-95 bg-black/20 backdrop-blur-md hover:bg-black/30"
      >
        <span className="text-sm font-semibold text-white/95">{client.name}</span>
        <Info className="w-3.5 h-3.5 text-white/70" />
      </button>

      {/* Spacer for balance */}
      <div className="w-[72px]" />
    </nav>
  );
}
