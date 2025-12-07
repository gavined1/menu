'use client';

import { useEffect, useRef } from 'react';
import { useMenuLocale } from './locale';
import { MenuItemCard } from './MenuItemCard';
import type { MenuCategory, MenuItemWithCategory } from './types';

// Skeleton card component matching MenuItemCard layout
function MenuItemCardSkeleton() {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      {/* Image Container Skeleton */}
      <div className="relative aspect-[4/3] bg-gray-200 flex-shrink-0" />

      {/* Content Area Skeleton */}
      <div className="flex flex-col flex-1 p-3">
        {/* Price + Badge Row Skeleton */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-12 bg-gray-200 rounded" />
        </div>

        {/* Name Skeleton */}
        <div className="space-y-1 mb-1">
          <div className="h-3.5 w-full bg-gray-200 rounded" />
          <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
        </div>

        {/* Description Skeleton */}
        <div className="h-2.5 w-full bg-gray-200 rounded mt-0.5" />

        {/* Category Row Skeleton */}
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <div className="h-2.5 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

interface MenuGridProps {
  items: MenuItemWithCategory[];
  title?: string | null;
  categories?: MenuCategory[];
  activeCategory?: string;
  showSeeAll?: boolean;
  onItemClick: (item: MenuItemWithCategory) => void;
  hasMoreItems?: boolean;
  onLoadMore?: () => void;
  totalItems?: number;
  isLoadingMore?: boolean;
}

export function MenuGrid({
  items,
  title,
  categories,
  activeCategory,
  onItemClick,
  hasMoreItems = false,
  onLoadMore,
  totalItems,
  isLoadingMore = false,
}: MenuGridProps) {
  const { t, getLocalizedText } = useMenuLocale();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMoreItems || !onLoadMore || !loadMoreRef.current || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore) {
          onLoadMore();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before reaching the trigger
        threshold: 1,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMoreItems, onLoadMore, isLoadingMore]);

  // Determine the display title
  const displayTitle = (() => {
    // If title is a search query (starts with quotes), use as-is
    if (title?.startsWith('"')) {
      return title;
    }
    // If no title or 'all', show translated "All Items"
    if (!title || activeCategory === 'all') {
      return t('allItems');
    }
    // If activeCategory is provided, find and localize category name
    if (activeCategory && categories) {
      const category = categories.find((c) => c.slug === activeCategory);
      if (category) {
        return getLocalizedText(category);
      }
    }
    // Fallback to title
    return title;
  })();

  if (items.length === 0) {
    return (
      <div className="px-5 py-24 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
        <p className="text-gray-900 text-lg font-medium">{t('noResults')}</p>
        <p className="text-gray-400 mt-2">{t('noResultsDescription')}</p>
      </div>
    );
  }

  return (
    <main className="px-5 py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">{displayTitle}</h2>
        <span className="text-sm text-gray-400 font-medium">
          {totalItems ?? items.length} {(totalItems ?? items.length) === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Grid - 2 columns on mobile, responsive on larger screens */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
        {items.map((item, index) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onItemClick={onItemClick}
            priority={index < 4}
          />
        ))}

        {/* Skeleton Loading Cards */}
        {isLoadingMore && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <MenuItemCardSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMoreItems && !isLoadingMore && (
        <div
          ref={loadMoreRef}
          className="flex items-center justify-center py-4"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-400">
              {items.length} of {totalItems ?? items.length} items
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
