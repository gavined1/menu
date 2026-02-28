-- Digital Menu System Tables
-- This migration creates tables for a multi-tenant digital menu system

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUM TYPES
-- ============================================

-- Menu item badge types (vegan, spicy, etc.)
CREATE TYPE menu_item_badge_type AS ENUM (
  'vegan',
  'vegetarian',
  'spicy',
  'gluten_free',
  'new',
  'best_seller',
  'chef_special',
  'seasonal'
);

-- ============================================
-- TABLES
-- ============================================

-- Clients/Restaurants table
CREATE TABLE menu_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#000000',
  accent_color VARCHAR(7) DEFAULT '#ffffff',
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu categories table
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES menu_clients(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, slug)
);

-- Menu items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES menu_clients(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  badges menu_item_badge_type[] DEFAULT '{}',
  rating NUMERIC(2, 1) DEFAULT NULL,
  rating_count INTEGER DEFAULT 0,
  prep_time_minutes INTEGER,
  calories INTEGER,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, slug)
);

-- Featured/Hero items for carousel
CREATE TABLE menu_featured_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES menu_clients(id) ON DELETE CASCADE,
  item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  badge_text VARCHAR(50),
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Clients
CREATE INDEX idx_menu_clients_slug ON menu_clients(slug);
CREATE INDEX idx_menu_clients_is_active ON menu_clients(is_active);

-- Categories
CREATE INDEX idx_menu_categories_client_id ON menu_categories(client_id);
CREATE INDEX idx_menu_categories_slug ON menu_categories(client_id, slug);
CREATE INDEX idx_menu_categories_sort_order ON menu_categories(client_id, sort_order);

-- Items
CREATE INDEX idx_menu_items_client_id ON menu_items(client_id);
CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX idx_menu_items_slug ON menu_items(client_id, slug);
CREATE INDEX idx_menu_items_is_featured ON menu_items(client_id, is_featured);
CREATE INDEX idx_menu_items_is_available ON menu_items(client_id, is_available);
CREATE INDEX idx_menu_items_sort_order ON menu_items(client_id, sort_order);

-- Featured items
CREATE INDEX idx_menu_featured_items_client_id ON menu_featured_items(client_id);
CREATE INDEX idx_menu_featured_items_sort_order ON menu_featured_items(client_id, sort_order);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE menu_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_featured_items ENABLE ROW LEVEL SECURITY;

-- Public read access for active clients and their menu data
CREATE POLICY "Public can view active clients"
  ON menu_clients FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view categories of active clients"
  ON menu_categories FOR SELECT
  USING (
    is_active = true 
    AND EXISTS (
      SELECT 1 FROM menu_clients 
      WHERE menu_clients.id = menu_categories.client_id 
      AND menu_clients.is_active = true
    )
  );

CREATE POLICY "Public can view available items of active clients"
  ON menu_items FOR SELECT
  USING (
    is_available = true 
    AND EXISTS (
      SELECT 1 FROM menu_clients 
      WHERE menu_clients.id = menu_items.client_id 
      AND menu_clients.is_active = true
    )
  );

CREATE POLICY "Public can view featured items of active clients"
  ON menu_featured_items FOR SELECT
  USING (
    is_active = true 
    AND EXISTS (
      SELECT 1 FROM menu_clients 
      WHERE menu_clients.id = menu_featured_items.client_id 
      AND menu_clients.is_active = true
    )
  );

-- Authenticated users can manage all data (for admin purposes)
-- In production, you'd want more granular permissions
CREATE POLICY "Authenticated users can manage clients"
  ON menu_clients FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage categories"
  ON menu_categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage items"
  ON menu_items FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage featured items"
  ON menu_featured_items FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_menu_clients_updated_at
  BEFORE UPDATE ON menu_clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_categories_updated_at
  BEFORE UPDATE ON menu_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_featured_items_updated_at
  BEFORE UPDATE ON menu_featured_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Demo Restaurant)
-- ============================================

-- Insert demo client
INSERT INTO menu_clients (id, name, slug, description, logo_url, cover_image_url)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'OMNI Restaurant',
  'omni',
  'Modern dining experience with curated seasonal dishes',
  NULL,
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop'
);

-- Insert categories
INSERT INTO menu_categories (id, client_id, name, slug, sort_order) VALUES
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'All', 'all', 0),
  ('b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Salads', 'salads', 1),
  ('b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Burgers', 'burgers', 2),
  ('b4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Bowls', 'bowls', 3),
  ('b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dessert', 'dessert', 4),
  ('b6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Drinks', 'drinks', 5);

-- Insert menu items
INSERT INTO menu_items (client_id, category_id, name, slug, description, price, image_url, badges, rating, rating_count, is_featured) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Classic Wagyu Burger', 'classic-wagyu-burger', 'Aged cheddar, caramelized onions, brioche.', 18.50, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop', '{"best_seller"}', 4.8, 120, true),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Green Goddess Bowl', 'green-goddess-bowl', 'Kale, edamame, cucumber, green tahini.', 14.00, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop', '{"vegan"}', NULL, 0, false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Spicy Vodka Rigatoni', 'spicy-vodka-rigatoni', 'Calabrian chili, parmesan, fresh basil.', 16.50, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=500&auto=format&fit=crop', '{"spicy"}', NULL, 0, false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Iced Matcha Latte', 'iced-matcha-latte', 'Ceremonial grade matcha, oat milk.', 6.50, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop', '{}', 4.9, 85, false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Berry Cheesecake', 'berry-cheesecake', 'Seasonal berries, graham crust.', 9.00, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=500&auto=format&fit=crop', '{}', NULL, 0, false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Filet Mignon', 'filet-mignon', 'Garlic butter, rosemary potatoes.', 32.00, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=500&auto=format&fit=crop', '{}', NULL, 0, false);

-- Insert featured/hero items
INSERT INTO menu_featured_items (client_id, item_id, title, subtitle, badge_text, image_url, sort_order) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Fresh Harvest Super Bowl', 'Quinoa, avocado, roasted sweet potato, and tahini dressing.', 'New Arrival', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop', 0),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Artisan Truffle Flatbread', 'Wild mushrooms, truffle oil, mozzarella, and thyme.', 'Best Seller', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Avocado & Poached Egg Toast', 'Sourdough, chili flakes, microgreens, and olive oil.', 'Breakfast', 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000&auto=format&fit=crop', 2);

-- ============================================
-- ROLLBACK SCRIPT (Down Migration)
-- ============================================
-- To rollback, run:
-- DROP TABLE IF EXISTS menu_featured_items CASCADE;
-- DROP TABLE IF EXISTS menu_items CASCADE;
-- DROP TABLE IF EXISTS menu_categories CASCADE;
-- DROP TABLE IF EXISTS menu_clients CASCADE;
-- DROP TYPE IF EXISTS menu_item_badge_type;
-- DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

