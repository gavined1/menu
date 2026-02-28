-- Login Cafe seed: 1 client, 2 categories, 3 menu items (2 with variants), hero carousel featured items.
-- Run after migrations (Supabase SQL Editor or: psql $DATABASE_URL -f supabase/seed_logincafe.sql).
-- owner_id set from auth.users where email = cafelogincashier@gmail.com (if user exists).

-- ============================================
-- menu_clients
-- ============================================
INSERT INTO public.menu_clients (
  id, name, slug, description, logo_url, cover_image_url,
  primary_color, accent_color, is_active, settings,
  phone, email, address, city, opening_hours, social_links,
  default_locale, currency, exchange_rate, owner_id
) VALUES (
  'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Login Cafe',
  'login-cafe',
  'Cozy cafe for coffee and bites. Order hot, ice, or frappe.',
  NULL,
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop',
  '#1a1a1a',
  '#f5f5f5',
  true,
  '{}',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'en',
  'USD',
  4100,
  (SELECT id FROM auth.users WHERE email = 'cafelogincashier@gmail.com' LIMIT 1)
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  cover_image_url = EXCLUDED.cover_image_url,
  is_active = EXCLUDED.is_active,
  default_locale = EXCLUDED.default_locale,
  currency = EXCLUDED.currency,
  exchange_rate = EXCLUDED.exchange_rate,
  owner_id = EXCLUDED.owner_id,
  updated_at = now();

-- ============================================
-- menu_categories
-- ============================================
INSERT INTO public.menu_categories (id, client_id, name, slug, sort_order, is_active)
VALUES
  ('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'All', 'all', 0, true),
  ('f2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Drinks', 'drinks', 1, true)
ON CONFLICT (id) DO UPDATE SET
  client_id = EXCLUDED.client_id,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- ============================================
-- menu_items (3 items: 2 with variants, 1 single price)
-- ============================================
INSERT INTO public.menu_items (
  id, client_id, category_id, name, slug, description, price, image_url, badges,
  is_featured, is_available, sort_order, metadata, name_km, description_km, images
) VALUES
  -- 1) Latte – variant pricing (Hot / Ice / Frappe)
  (
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'f2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Latte',
    'latte',
    'Espresso with steamed milk. Choose Hot, Ice, or Frappe.',
    NULL,
    'https://images.unsplash.com/photo-1561882468-9110e03e0f78?q=80&w=500&auto=format&fit=crop',
    ARRAY[]::public.menu_item_badge_type[],
    true,
    true,
    0,
    '{}',
    NULL,
    NULL,
    ARRAY['https://images.unsplash.com/photo-1561882468-9110e03e0f78?q=80&w=500&auto=format&fit=crop']
  ),
  -- 2) Americano – variant pricing (Hot / Ice)
  (
    'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'f2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Americano',
    'americano',
    'Double shot espresso with hot or iced water.',
    NULL,
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=500&auto=format&fit=crop',
    ARRAY[]::public.menu_item_badge_type[],
    false,
    true,
    1,
    '{}',
    NULL,
    NULL,
    NULL
  ),
  -- 3) Croissant – single price (no variants)
  (
    'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'f2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Butter Croissant',
    'butter-croissant',
    'Fresh-baked butter croissant.',
    3.50,
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=500&auto=format&fit=crop',
    ARRAY[]::public.menu_item_badge_type[],
    false,
    true,
    2,
    '{}',
    NULL,
    NULL,
    NULL
  )
ON CONFLICT (id) DO UPDATE SET
  client_id = EXCLUDED.client_id,
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  badges = EXCLUDED.badges,
  is_featured = EXCLUDED.is_featured,
  is_available = EXCLUDED.is_available,
  sort_order = EXCLUDED.sort_order,
  name_km = EXCLUDED.name_km,
  description_km = EXCLUDED.description_km,
  images = EXCLUDED.images,
  updated_at = now();

-- ============================================
-- menu_item_variants (for Latte and Americano)
-- ============================================
-- Remove existing variants for these items so re-running the seed is idempotent
DELETE FROM public.menu_item_variants
WHERE item_id IN (
  'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
);

INSERT INTO public.menu_item_variants (item_id, name, name_km, price, sort_order)
VALUES
  ('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Hot', NULL, 6.00, 0),
  ('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ice', NULL, 8.00, 1),
  ('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Frappe', NULL, 9.00, 2),
  ('b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Hot', NULL, 4.50, 0),
  ('b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ice', NULL, 5.50, 1);

-- ============================================
-- menu_featured_items (hero carousel for Login Cafe)
-- ============================================
-- Carousel only shows when this client has rows here (same as OMNI)
INSERT INTO public.menu_featured_items (id, client_id, item_id, title, subtitle, badge_text, image_url, sort_order, is_active, title_km, subtitle_km)
VALUES
  (
    'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'House Latte',
    'Hot, Ice, or Frappe — your way.',
    'Popular',
    'https://images.unsplash.com/photo-1561882468-9110e03e0f78?q=80&w=1000&auto=format&fit=crop',
    0, true, NULL, NULL
  ),
  (
    'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Americano',
    'Double shot, hot or iced.',
    'Classic',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    1, true, NULL, NULL
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Butter Croissant',
    'Fresh-baked, flaky, and simple.',
    'Bakery',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
    2, true, NULL, NULL
  )
ON CONFLICT (id) DO UPDATE SET
  client_id = EXCLUDED.client_id,
  item_id = EXCLUDED.item_id,
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  badge_text = EXCLUDED.badge_text,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  title_km = EXCLUDED.title_km,
  subtitle_km = EXCLUDED.subtitle_km;
