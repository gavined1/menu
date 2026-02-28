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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const searchInputId = 'menu-search-input';
  const categoriesLabelId = 'menu-categories-label';

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

  // Focus input when expanded
  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !searchQuery
      ) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchExpanded, searchQuery]);

  // Scroll active category into view when it changes (skip initial mount to avoid scroll jump)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
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

  const closeSearch = useCallback(() => {
    setSearchQuery('');
    onSearch('');
    setIsSearchExpanded(false);
  }, [onSearch]);

  const handleSearchIconClick = useCallback(() => {
    setIsSearchExpanded(true);
  }, []);

  return (
    <>
      {/* Sentinel for intersection observer */}
      <div ref={containerRef} className="h-0" />

      <div
        className={`sticky top-0 z-50 transition-all duration-500 ${isSticky
          ? 'bg-white/90 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-white/20'
          : 'bg-white/95 backdrop-blur-xl'
          }`}
        style={{
          WebkitBackdropFilter: isSticky
            ? 'blur(40px) saturate(1.5)'
            : 'blur(20px)',
        }}
      >
        {/* Content */}
        <div className="px-5 pt-4 pb-4">
          <div ref={searchContainerRef} className="relative">
            {/* Expanded Search Bar - Centered overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${isSearchExpanded
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}
            >
              <div
                className={`relative w-full max-w-md transition-all duration-300 ease-out ${isSearchExpanded ? 'scale-100' : 'scale-95'
                  }`}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                <input
                  id={searchInputId}
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:border-gray-300 transition-all"
                  placeholder={t('searchPlaceholder')}
                  aria-label={t('searchPlaceholder')}
                  tabIndex={isSearchExpanded ? 0 : -1}
                />
                <button
                  onClick={searchQuery ? clearSearch : closeSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all z-10"
                  aria-label={searchQuery ? t('clear') : t('close')}
                  tabIndex={isSearchExpanded ? 0 : -1}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Default view: Search icon + Categories */}
            <div
              className={`flex items-center gap-3 transition-all duration-300 ${isSearchExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
              {/* Search Icon Button */}
              <button
                onClick={handleSearchIconClick}
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 transition-all duration-200 active:scale-95"
                aria-label={t('searchPlaceholder')}
                aria-expanded={isSearchExpanded}
                aria-controls={searchInputId}
                tabIndex={isSearchExpanded ? -1 : 0}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Category Pills */}
              <span id={categoriesLabelId} className="sr-only">
                {t('categories')}
              </span>
              <div
                className="flex gap-2 flex-1 overflow-x-auto"
                role="tablist"
                aria-labelledby={categoriesLabelId}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  padding: '4px 0',
                  margin: '-4px 0',
                }}
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
                      tabIndex={isSearchExpanded ? -1 : 0}
                      role="tab"
                      aria-selected={isActive}
                      className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
                        }`}
                    >
                      {category.slug === 'all'
                        ? t('all')
                        : getLocalizedText(category)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
