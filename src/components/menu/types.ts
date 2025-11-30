import type { Database } from '@/lib/database.types';

// Re-export data types from rsc-data for consistency
export type {
  FullMenuData,
  MenuCategory,
  MenuClient,
  MenuFeaturedItem,
  MenuItem,
  MenuItemWithCategory,
} from '@/rsc-data/menu/queries';

// UI-specific types
export type MenuItemBadgeType =
  Database['public']['Enums']['menu_item_badge_type'];

// Locale types
export type MenuLocale = Database['public']['Enums']['menu_locale'];
export type MenuCurrency = Database['public']['Enums']['menu_currency'];

// Alias for component props (same as FullMenuData but named for clarity)
export type { FullMenuData as MenuData } from '@/rsc-data/menu/queries';
