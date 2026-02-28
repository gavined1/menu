-- Seed data from current database snapshot
-- Run after migrations. Order: menu_clients → menu_categories → menu_items → menu_featured_items → menu_client_members
-- Portable: owner_id is NULL so no auth.users row is required. After signup, link a user via menu_client_members and set menu_clients.owner_id.

-- ============================================
-- menu_clients
-- ============================================
INSERT INTO public.menu_clients (
  id, name, slug, description, logo_url, cover_image_url,
  primary_color, accent_color, is_active, settings,
  phone, email, address, city, opening_hours, social_links,
  default_locale, currency, exchange_rate, owner_id
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'OMNI Restaurant',
  'omni',
  'Modern dining experience with curated seasonal dishes',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
  '#000000',
  '#ffffff',
  true,
  '{}',
  '+1 (555) 123-4567',
  'hello@omnirestaurant.com',
  '123 Culinary Avenue, Suite 100',
  'San Francisco, CA',
  '{"friday":"11:00 AM - 11:00 PM","monday":"11:00 AM - 10:00 PM","sunday":"10:00 AM - 9:00 PM","tuesday":"11:00 AM - 10:00 PM","saturday":"10:00 AM - 11:00 PM","thursday":"11:00 AM - 11:00 PM","wednesday":"11:00 AM - 10:00 PM"}'::jsonb,
  '{"facebook":"https://facebook.com/omnirestaurant","instagram":"https://instagram.com/omnirestaurant"}'::jsonb,
  'en',
  'USD',
  4000,
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  logo_url = EXCLUDED.logo_url,
  cover_image_url = EXCLUDED.cover_image_url,
  primary_color = EXCLUDED.primary_color,
  accent_color = EXCLUDED.accent_color,
  is_active = EXCLUDED.is_active,
  settings = EXCLUDED.settings,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  opening_hours = EXCLUDED.opening_hours,
  social_links = EXCLUDED.social_links,
  default_locale = EXCLUDED.default_locale,
  currency = EXCLUDED.currency,
  exchange_rate = EXCLUDED.exchange_rate,
  owner_id = EXCLUDED.owner_id,
  updated_at = now();

-- ============================================
-- menu_categories
-- ============================================
INSERT INTO public.menu_categories (id, client_id, name, slug, sort_order, is_active, name_km, description_km)
VALUES
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'All', 'all', 0, true, NULL, NULL),
  ('b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Salads', 'salads', 1, true, NULL, NULL),
  ('b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Burgers', 'burgers', 2, true, NULL, NULL),
  ('b4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Bowls', 'bowls', 3, true, NULL, NULL),
  ('b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dessert', 'dessert', 4, true, NULL, NULL),
  ('b6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Drinks', 'drinks', 5, true, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  client_id = EXCLUDED.client_id,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- ============================================
-- menu_items
-- ============================================
INSERT INTO public.menu_items (
  id, client_id, category_id, name, slug, description, price, image_url, badges,
  is_featured, is_available, sort_order, metadata, name_km, description_km, images
) VALUES
  (
    'c3568a4c-3fe8-4eda-9d15-22b225fac3de',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Spicy Vodka Rigatoni',
    'spicy-vodka-rigatoni',
    'Calabrian chili, parmesan, fresh basil.',
    16.50,
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
    ARRAY['spicy']::public.menu_item_badge_type[],
    false, true, 0, '{}', NULL, NULL,
    ARRAY['https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=500&auto=format&fit=crop']
  ),
  (
    '7fdff760-252e-4b88-88aa-cf499eb6e8b5',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Classic Wagyu Burger',
    'classic-wagyu-burger',
    'Aged cheddar, caramelized onions, brioche.',
    18.50,
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    ARRAY['best_seller']::public.menu_item_badge_type[],
    true, true, 0, '{}', NULL, NULL,
    ARRAY['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800']
  ),
  (
    '1aee32cc-b6c7-4186-8fc7-69a4bdae6be3',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Green Goddess Bowl',
    'green-goddess-bowl',
    'Kale, edamame, cucumber, green tahini.',
    14.00,
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    ARRAY['vegan']::public.menu_item_badge_type[],
    false, true, 0, '{}', NULL, NULL,
    ARRAY['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop']
  ),
  (
    '77b202e9-470b-4abf-b7b1-1792e9406b28',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Filet Mignon',
    'filet-mignon',
    'Garlic butter, rosemary potatoes.',
    32.00,
    'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    ARRAY[]::public.menu_item_badge_type[],
    false, true, 0, '{}', NULL, NULL,
    ARRAY['https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=500&auto=format&fit=crop']
  ),
  (
    '799b8d2f-58aa-4cd9-a73e-2518a8c9f13c',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Iced Matcha Latte',
    'iced-matcha-latte',
    'Ceremonial grade matcha, oat milk.',
    6.50,
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87',
    ARRAY[]::public.menu_item_badge_type[],
    false, true, 0, '{}', NULL, NULL,
    ARRAY['https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop']
  ),
  (
    '815db343-2304-48d5-8e39-0a3c5ffe89c4',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Berry Cheesecake',
    'berry-cheesecake',
    'Seasonal berries, graham crust.',
    9.00,
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    ARRAY[]::public.menu_item_badge_type[],
    false, true, 0, '{}', NULL, NULL,
    ARRAY['https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800']
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
  metadata = EXCLUDED.metadata,
  name_km = EXCLUDED.name_km,
  description_km = EXCLUDED.description_km,
  images = EXCLUDED.images,
  updated_at = now();

-- ============================================
-- menu_featured_items
-- ============================================
INSERT INTO public.menu_featured_items (id, client_id, item_id, title, subtitle, badge_text, image_url, sort_order, is_active, title_km, subtitle_km)
VALUES
  (
    'b0de2bf0-8a89-46c6-b5eb-5f66c902472b',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Fresh Harvest Super Bowl',
    'Quinoa, avocado, roasted sweet potato, and tahini dressing.',
    'New Arrival',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
    0, true, NULL, NULL
  ),
  (
    'b55b505a-0b0c-45e6-8d25-0adcaf80d5e7',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Artisan Truffle Flatbread',
    'Wild mushrooms, truffle oil, mozzarella, and thyme.',
    'Best Seller',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop',
    1, true, NULL, NULL
  ),
  (
    'e4adcd26-5754-408c-92b2-10da7c7706ac',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Avocado & Poached Egg Toast',
    'Sourdough, chili flakes, microgreens, and olive oil.',
    'Breakfast',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000&auto=format&fit=crop',
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
  updated_at = now();

-- ============================================
-- menu_client_members (optional – run after you have a user in auth.users)
-- ============================================
-- Uncomment and replace <YOUR_USER_UUID> with a real auth.users.id (e.g. after signup), then run this block.
-- Also set owner_id on the client: UPDATE public.menu_clients SET owner_id = '<YOUR_USER_UUID>' WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
/*
INSERT INTO public.menu_client_members (id, client_id, user_id, role)
VALUES (
  '3ce20e60-8cb9-4f13-8d9b-72310b553866',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  '<YOUR_USER_UUID>'::uuid,
  'owner'
)
ON CONFLICT (id) DO UPDATE SET
  client_id = EXCLUDED.client_id,
  user_id = EXCLUDED.user_id,
  role = EXCLUDED.role;
*/
