'use client';

import { useCallback, useMemo, useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { ItemDetailModal } from './ItemDetailModal';
import { MenuLocaleProvider, useMenuLocale } from './locale';
import { MenuGrid } from './MenuGrid';
import { MenuNavbar } from './MenuNavbar';
import { RestaurantInfoDrawer } from './RestaurantInfoDrawer';
import { SearchAndFilter } from './SearchAndFilter';
import type { MenuData, MenuItemWithCategory } from './types';

interface DigitalMenuProps {
  data: MenuData;
}

export function DigitalMenu({ data }: DigitalMenuProps) {
  const { client, categories, items, featuredItems } = data;

  // Custom exchange rate from restaurant settings (if any)
  const customExchangeRate = client.exchange_rate ?? undefined;

  return (
    <MenuLocaleProvider customExchangeRate={customExchangeRate}>
      <DigitalMenuContent
        client={client}
        categories={categories}
        items={items}
        featuredItems={featuredItems}
      />
    </MenuLocaleProvider>
  );
}

// Separate component to use locale hooks
function DigitalMenuContent({
  client,
  categories,
  items,
  featuredItems,
}: MenuData) {
  const { locale } = useMenuLocale();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItemWithCategory | null>(
    null
  );
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);

  const filteredItems = useMemo(() => {
    let filtered = items as MenuItemWithCategory[];

    // Filter by category
    if (activeCategory && activeCategory !== 'all') {
      filtered = filtered.filter(
        (item) => item.category?.slug === activeCategory
      );
    }

    // Filter by search query (searches in both languages)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.name_km?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.description_km?.toLowerCase().includes(query) ||
          item.category?.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [items, activeCategory, searchQuery]);

  const handleCategoryChange = useCallback((categorySlug: string) => {
    setActiveCategory(categorySlug);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleItemClick = useCallback((item: MenuItemWithCategory) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  }, []);

  const handleCloseItemModal = useCallback(() => {
    setIsItemModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  const handleOpenInfoDrawer = useCallback(() => {
    setIsInfoDrawerOpen(true);
  }, []);

  const handleCloseInfoDrawer = useCallback(() => {
    setIsInfoDrawerOpen(false);
  }, []);

  // Get title based on active category (will be localized in MenuGrid)
  const gridTitle = useMemo(() => {
    if (searchQuery.trim()) {
      return `"${searchQuery}"`;
    }
    if (activeCategory === 'all') {
      return null; // Will use t('allDishes') in MenuGrid
    }
    return activeCategory; // Pass category slug, will be localized in MenuGrid
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Main Content */}
      <div className={`min-h-screen bg-white ${locale === 'km' ? 'font-khmer' : 'font-menu'}`}>
        {/* Fixed Navbar */}
        <MenuNavbar client={client} onInfoClick={handleOpenInfoDrawer} />

        {/* Hero Carousel */}
        <HeroCarousel featuredItems={featuredItems} />

        {/* Search & Filter */}
        <SearchAndFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
        />

        {/* Menu Grid */}
        <MenuGrid
          items={filteredItems}
          title={gridTitle}
          categories={categories}
          activeCategory={activeCategory}
          showSeeAll={false}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Modals/Drawers - Outside main content to avoid aria-hidden conflicts */}
      <div className={locale === 'km' ? 'font-khmer' : 'font-menu'}>
        <ItemDetailModal
          item={selectedItem}
          isOpen={isItemModalOpen}
          onClose={handleCloseItemModal}
        />

        <RestaurantInfoDrawer
          client={client}
          isOpen={isInfoDrawerOpen}
          onClose={handleCloseInfoDrawer}
        />
      </div>
    </>
  );
}
