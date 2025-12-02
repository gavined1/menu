'use client';

import { useMenuLocale } from './locale';
import { MenuItemCard } from './MenuItemCard';
import type { MenuCategory, MenuItemWithCategory } from './types';

interface MenuGridProps {
  items: MenuItemWithCategory[];
  title?: string | null;
  categories?: MenuCategory[];
  activeCategory?: string;
  showSeeAll?: boolean;
  onItemClick: (item: MenuItemWithCategory) => void;
}

export function MenuGrid({
  items,
  title,
  categories,
  activeCategory,
  onItemClick,
}: MenuGridProps) {
  const { t, getLocalizedText } = useMenuLocale();

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
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Grid - 2 columns on mobile, responsive on larger screens */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onItemClick={onItemClick} />
        ))}
      </div>
    </main>
  );
}
