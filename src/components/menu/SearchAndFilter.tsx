'use client';

import { Search, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMenuLocale } from './locale';
import type { MenuCategory } from './types';

interface SearchAndFilterProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  onSearch: (query: string) => void;
}

export function SearchAndFilter({
  categories,
  activeCategory,
  onCategoryChange,
  onSearch,
}: SearchAndFilterProps) {
  const { t, getLocalizedText } = useMenuLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Handle sticky state
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 1, rootMargin: '-1px 0px 0px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll active category into view
  useEffect(() => {
    const activeButton = categoryRefs.current.get(activeCategory);
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    onSearch('');
    inputRef.current?.focus();
  }, [onSearch]);

  return (
    <>
      {/* Sentinel for intersection observer */}
      <div ref={containerRef} className="h-0" />

      <div
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isSticky
            ? 'bg-white/90 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-white/20'
            : 'bg-white/95 backdrop-blur-xl'
        }`}
        style={{
          WebkitBackdropFilter: isSticky
            ? 'blur(40px) saturate(1.5)'
            : 'blur(20px)',
        }}
      >
        {/* Search Bar */}
        <div className="px-5 pt-5 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 z-10" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-2xl text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:border-gray-300 focus:bg-white transition-all shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              placeholder={t('searchPlaceholder')}
              style={{
                WebkitBackdropFilter: 'blur(12px)',
              }}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 rounded-full transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div
          className="flex overflow-x-auto gap-3 px-5 pb-5 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <button
                key={category.id}
                ref={(el) => {
                  if (el) categoryRefs.current.set(category.slug, el);
                }}
                onClick={() => onCategoryChange(category.slug)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/25'
                    : 'bg-white/90 backdrop-blur-md text-gray-700 hover:bg-white hover:text-gray-900 border border-gray-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                }`}
                style={
                  !isActive
                    ? {
                        WebkitBackdropFilter: 'blur(12px)',
                      }
                    : undefined
                }
              >
                {category.slug === 'all' ? t('all') : getLocalizedText(category)}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
