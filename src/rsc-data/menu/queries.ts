/**
 * Menu Data Fetching (RSC)
 *
 * This module contains all Server Component data fetching functions for the menu feature.
 * All functions use React's cache() for request deduplication and the public Supabase client.
 *
 * @module rsc-data/menu/queries
 */

import type { Tables } from '@/lib/database.types';
import { createSupabaseClient } from '@/supabase-clients/server';
import { getCachedLoggedInUserId } from '@/rsc-data/supabase';
import { createPublicSupabaseClient } from '@/supabase-clients/public';
import { cacheLife, cacheTag } from 'next/cache';
import { cache } from 'react';

// ============================================
// Type Exports
// ============================================

export type MenuClient = Tables<'menu_clients'>;
export type MenuCategory = Tables<'menu_categories'>;
export type MenuItem = Tables<'menu_items'>;
export type MenuItemVariant = Tables<'menu_item_variants'>;
export type MenuFeaturedItem = Tables<'menu_featured_items'>;
export type MenuClientMember = Tables<'menu_client_members'>;

export interface MenuItemWithCategory extends MenuItem {
  category: Pick<MenuCategory, 'id' | 'name' | 'name_km' | 'slug'> | null;
  variants?: MenuItemVariant[] | null;
}

export interface FullMenuData {
  client: MenuClient;
  categories: MenuCategory[];
  items: MenuItemWithCategory[];
  featuredItems: MenuFeaturedItem[];
}

export type MenuClientRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface MenuClientWithRole extends MenuClient {
  member_role: MenuClientRole;
}

// ============================================
// Supabase Client
// ============================================

// Create a singleton instance for public data
const getPublicSupabase = () => createPublicSupabaseClient();

const MENU_CLIENT_SELECT =
  'id, name, slug, description, logo_url, cover_image_url, primary_color, accent_color, settings, is_active, created_at, updated_at, phone, address, city, currency, exchange_rate, default_locale, email, opening_hours, owner_id, social_links';

const MENU_CATEGORY_SELECT =
  'id, client_id, name, name_km, slug, description, description_km, image_url, sort_order, is_active, created_at, updated_at';

const MENU_ITEM_BASE_SELECT = `
  id,
  client_id,
  category_id,
  name,
  name_km,
  slug,
  description,
  description_km,
  price,
  image_url,
  images,
  badges,
  prep_time_minutes,
  is_featured,
  is_available,
  sort_order,
  metadata,
  created_at,
  updated_at
`;

const MENU_ITEM_SELECT = `${MENU_ITEM_BASE_SELECT},
  category:menu_categories(id, name, name_km, slug),
  variants:menu_item_variants(id, name, name_km, price, sort_order)
`;

const MENU_ITEM_SELECT_WITH_REQUIRED_CATEGORY = `${MENU_ITEM_BASE_SELECT},
  category:menu_categories!inner(id, name, name_km, slug),
  variants:menu_item_variants(id, name, name_km, price, sort_order)
`;

const MENU_FEATURED_ITEM_SELECT =
  'id, client_id, item_id, title, title_km, subtitle, subtitle_km, badge_text, image_url, sort_order, is_active, created_at, updated_at';

// ============================================
// Query Functions
// ============================================

/**
 * Get a client by their slug
 */
export const getMenuClientBySlug = cache(async (slug: string) => {
  'use cache';
  cacheTag('menu-clients', `menu-client-${slug}`);
  cacheLife({ expire: 300 }); // Cache for 5 minutes (menu data doesn't change often)

  const supabase = getPublicSupabase();

  const { data, error } = await supabase
    .from('menu_clients')
    .select(MENU_CLIENT_SELECT)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching menu client:', error);
    return null;
  }

  return data;
});

/**
 * Get all categories for a client
 */
export const getMenuCategories = cache(async (clientId: string) => {
  'use cache';
  cacheTag('menu-categories', `menu-categories-${clientId}`);
  cacheLife({ expire: 300 }); // Cache for 5 minutes

  const supabase = getPublicSupabase();

  const { data, error } = await supabase
    .from('menu_categories')
    .select(MENU_CATEGORY_SELECT)
    .eq('client_id', clientId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching menu categories:', error);
    return [];
  }

  return data;
});

/**
 * Get a single menu item by slug (lightweight for metadata)
 */
export const getMenuItemBySlug = cache(
  async (clientId: string, itemSlug: string) => {
    'use cache';
    cacheTag('menu-items', `menu-item-${clientId}-${itemSlug}`);
    cacheLife({ expire: 300 });

    const supabase = getPublicSupabase();

    const { data, error } = await supabase
      .from('menu_items')
      .select(MENU_ITEM_SELECT)
      .eq('client_id', clientId)
      .eq('slug', itemSlug)
      .eq('is_available', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching menu item:', error);
      return null;
    }

    return data as MenuItemWithCategory | null;
  }
);

/**
 * Get all menu items for a client
 */
export const getMenuItems = cache(
  async (clientId: string, categorySlug?: string) => {
    'use cache';
    const tagKey =
      categorySlug && categorySlug !== 'all'
        ? `menu-items-${clientId}-${categorySlug}`
        : `menu-items-${clientId}`;
    cacheTag('menu-items', tagKey);
    cacheLife({ expire: 300 }); // Cache for 5 minutes

    const supabase = getPublicSupabase();

    const isFilteredCategory = Boolean(categorySlug && categorySlug !== 'all');

    let query = supabase
      .from('menu_items')
      .select(
        isFilteredCategory
          ? MENU_ITEM_SELECT_WITH_REQUIRED_CATEGORY
          : MENU_ITEM_SELECT
      )
      .eq('client_id', clientId)
      .eq('is_available', true)
      .order('sort_order', { ascending: true });

    if (isFilteredCategory) {
      query = query.eq('category.slug', categorySlug as string);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }

    return data as MenuItemWithCategory[];
  }
);

/** Cache TTL in seconds: 0 in dev so carousel/seed changes show after refresh */
const MENU_DATA_CACHE_SEC = process.env.NODE_ENV === 'development' ? 0 : 300;

/**
 * Get featured/hero items for carousel
 */
export const getMenuFeaturedItems = cache(async (clientId: string) => {
  'use cache';
  cacheTag('menu-featured-items', `menu-featured-${clientId}`);
  cacheLife({ expire: MENU_DATA_CACHE_SEC });

  const supabase = getPublicSupabase();

  const { data, error } = await supabase
    .from('menu_featured_items')
    .select(MENU_FEATURED_ITEM_SELECT)
    .eq('client_id', clientId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching featured items:', error);
    return [];
  }

  return data;
});

/**
 * Get all menu data for a client in a single call
 * This is the primary function used by the menu page
 */
export const getFullMenuData = cache(
  async (clientSlug: string): Promise<FullMenuData | null> => {
    'use cache';
    cacheTag('menu-data', `menu-data-${clientSlug}`);
    cacheLife({ expire: MENU_DATA_CACHE_SEC });

    const client = await getMenuClientBySlug(clientSlug);

    if (!client) {
      return null;
    }

    const [categories, items, featuredItems] = await Promise.all([
      getMenuCategories(client.id),
      getMenuItems(client.id),
      getMenuFeaturedItems(client.id),
    ]);

    return {
      client,
      categories,
      items,
      featuredItems,
    };
  }
);

/**
 * Get all menus the logged-in user is a member of, with their role.
 * Used by the dashboard for multi-tenant management.
 *
 * NOTE: This function is intentionally NOT wrapped in React.cache because it
 * depends on dynamic cookies() via createSupabaseClient, which is not allowed
 * inside a cache scope with Next.js Cache Components.
 */
export const getUserMenuClients = async (): Promise<MenuClientWithRole[]> => {
  const userId = await getCachedLoggedInUserId();
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from('menu_client_members')
    .select('role, menu_clients (*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user menu clients:', error);
    return [];
  }

  type RowWithClient = {
    role: Tables<'menu_client_members'>['role'];
    menu_clients: MenuClient | null;
  };
  return (data ?? []).map((row: RowWithClient) => ({
    ...(row.menu_clients as MenuClient),
    member_role: row.role as MenuClientRole,
  }));
};
