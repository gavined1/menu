-- Seed StyleHub Boutique Retail Store
-- Run this in Supabase SQL Editor

-- Insert products for Women's Fashion
INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'Floral Summer Dress',
  'រ៉ូបរដូវក្តៅផ្កា',
  'floral-summer-dress',
  'Light and breezy floral print dress perfect for summer days',
  'រ៉ូបស្រាលមានរូបផ្កាល្អសម្រាប់រដូវក្តៅ',
  45,
  'product',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=400&fit=crop',
  4.8, 156, true, true, 1,
  '{"sizes": ["XS", "S", "M", "L", "XL"], "colors": ["Pink", "Blue", "White"], "material": "Cotton", "stock": 25}'::jsonb,
  ARRAY['best_seller', 'new']::menu_item_badge_type[]
FROM menu_categories WHERE slug = 'womens-fashion' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'Elegant Evening Gown',
  'រ៉ូបល្ងាចស្អាត',
  'elegant-evening-gown',
  'Stunning silk evening gown for special occasions',
  'រ៉ូបសូត្ររស្អាតសម្រាប់ព្រឹត្តិការណ៍ពិសេស',
  120,
  'product',
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=400&fit=crop',
  4.9, 89, true, false, 2,
  '{"sizes": ["S", "M", "L"], "colors": ["Black", "Red", "Navy"], "material": "Silk", "stock": 12}'::jsonb,
  ARRAY['chef_special']::menu_item_badge_type[]
FROM menu_categories WHERE slug = 'womens-fashion' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

-- Men's Fashion products
INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'Classic White Shirt',
  'អាវសបុរស',
  'classic-white-shirt',
  'Premium cotton shirt, perfect for office or casual wear',
  'អាវសូត្របុរសគុណភាពខ្ពស់ ល្អសម្រាប់ការិយាល័យ ឬកម្សាន្ត',
  35,
  'product',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop',
  4.7, 203, true, true, 1,
  '{"sizes": ["S", "M", "L", "XL", "XXL"], "colors": ["White", "Light Blue", "Gray"], "material": "Cotton", "stock": 45}'::jsonb,
  ARRAY['best_seller']::menu_item_badge_type[]
FROM menu_categories WHERE slug = 'mens-fashion' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'Slim Fit Jeans',
  'ខោជើងវែងស្ទើរ',
  'slim-fit-jeans',
  'Comfortable denim jeans with modern fit',
  'ខោដេនីមផាសុកភាពជាមួយការស្លៀកសមរម្យ',
  55,
  'product',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop',
  4.6, 178, true, false, 2,
  '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["Blue", "Black", "Gray"], "material": "Denim", "stock": 38}'::jsonb,
  NULL
FROM menu_categories WHERE slug = 'mens-fashion' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

-- Accessories
INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'Leather Handbag',
  'កាបូបស្បែក',
  'leather-handbag',
  'Elegant leather handbag with gold hardware',
  'កាបូបស្បែកស្អាតជាមួយផ្នែកមាស',
  85,
  'product',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
  4.8, 142, true, true, 1,
  '{"colors": ["Brown", "Black", "Tan"], "material": "Genuine Leather", "stock": 18}'::jsonb,
  ARRAY['best_seller', 'new']::menu_item_badge_type[]
FROM menu_categories WHERE slug = 'accessories' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'Silver Watch',
  'នាឡិកាប្រាក់',
  'silver-watch',
  'Classic silver watch with leather strap',
  'នាឡិកាប្រាក់បុរាណជាមួយខ្សែស្បែក',
  120,
  'product',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
  4.9, 95, true, false, 2,
  '{"colors": ["Silver", "Gold"], "material": "Stainless Steel", "stock": 22}'::jsonb,
  ARRAY['chef_special']::menu_item_badge_type[]
FROM menu_categories WHERE slug = 'accessories' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

-- Footwear
INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'Running Sneakers',
  'ស្បែកជើងកីឡា',
  'running-sneakers',
  'Comfortable athletic shoes for daily wear',
  'ស្បែកជើងកីឡាផាសុកភាពសម្រាប់ការស្លៀកប្រចាំថ្ងៃ',
  75,
  'product',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
  4.7, 267, true, true, 1,
  '{"sizes": ["6", "7", "8", "9", "10", "11"], "colors": ["White", "Black", "Gray"], "material": "Mesh & Rubber", "stock": 52}'::jsonb,
  ARRAY['best_seller']::menu_item_badge_type[]
FROM menu_categories WHERE slug = 'footwear' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'High Heels',
  'ស្បែកជើងកែង',
  'high-heels',
  'Elegant high heels for formal occasions',
  'ស្បែកជើងកែងស្អាតសម្រាប់ព្រឹត្តិការណ៍ផ្លូវការ',
  65,
  'product',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
  4.6, 134, true, false, 2,
  '{"sizes": ["5", "6", "7", "8", "9"], "colors": ["Black", "Nude", "Red"], "material": "Leather", "stock": 28}'::jsonb,
  NULL
FROM menu_categories WHERE slug = 'footwear' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

-- New Arrivals
INSERT INTO menu_items (client_id, category_id, name, name_km, slug, description, description_km, price, item_type, image_url, rating, rating_count, is_available, is_featured, sort_order, custom_fields, badges)
SELECT 
  '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40',
  id,
  'Designer Sunglasses',
  'វ៉ែនតាកំពូល',
  'designer-sunglasses',
  'Latest designer sunglasses collection',
  'ការប្រមូលផ្តុំវ៉ែនតាកំពូលថ្មី',
  95,
  'product',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=400&fit=crop',
  4.8, 78, true, true, 1,
  '{"colors": ["Black", "Brown", "Tortoise"], "material": "Acetate", "stock": 35}'::jsonb,
  ARRAY['new', 'best_seller']::menu_item_badge_type[]
FROM menu_categories WHERE slug = 'new-arrivals' AND client_id = '055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40';

-- Featured items for carousel
INSERT INTO menu_featured_items (client_id, title, title_km, subtitle, subtitle_km, badge_text, image_url, sort_order, is_active)
VALUES 
('055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40', 
 'Summer Collection 2024', 
 'ការប្រមូលផ្តុំរដូវក្តៅ ២០២៤',
 'Fresh styles for the season',
 'សម្លៀកបំពាក់ស្រស់សម្រាប់រដូវ',
 'New',
 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop',
 1, true),

('055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40', 
 'Premium Accessories', 
 'គ្រឿងអលង្ការប្រណីត',
 'Luxury bags & watches',
 'កាបូប និងនាឡិកាប្រណីត',
 'Popular',
 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
 2, true),

('055aafd2-7ff3-4a42-84ee-1c8d2b4d5f40', 
 'Men''s Essentials', 
 'វត្ថុចាំបាច់បុរស',
 'Classic shirts & jeans',
 'អាវ និងខោបុរាណ',
 'Best Seller',
 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1200&h=600&fit=crop',
 3, true);

