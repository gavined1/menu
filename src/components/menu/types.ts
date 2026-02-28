import type { Database, Json } from '@/lib/database.types';
import type { MenuFeaturedItem } from '@/rsc-data/menu/queries';

// Re-export data types from rsc-data (all are Supabase Tables<>)
export type {
  FullMenuData,
  MenuCategory,
  MenuClient,
  MenuFeaturedItem,
  MenuItem,
  MenuItemVariant,
  MenuItemWithCategory,
} from '@/rsc-data/menu/queries';

/** Featured item row + optional translations JSON if column exists in schema */
export type MenuFeaturedItemWithTranslations = MenuFeaturedItem & {
  translations?: Json | null;
};

// UI-specific types from Supabase Enums
export type MenuItemBadgeType =
  Database['public']['Enums']['menu_item_badge_type'];

// Locale types from Supabase Enums
export type MenuLocale = Database['public']['Enums']['menu_locale'];
export type MenuCurrency = Database['public']['Enums']['menu_currency'];

// Alias for component props (same as FullMenuData but named for clarity)
export type { FullMenuData as MenuData } from '@/rsc-data/menu/queries';
