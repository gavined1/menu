-- Menu item variants: one item, multiple prices (e.g. Latte: Hot 6000, Ice 8000, Frappe 9000)
-- menu_items.price becomes nullable so an item can have only variant prices

-- 1) Allow menu_items.price to be NULL when item uses variant pricing
ALTER TABLE menu_items
  ALTER COLUMN price DROP NOT NULL;

-- 2) Variants table
CREATE TABLE menu_item_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  name_km VARCHAR(100),
  price NUMERIC(10, 2) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_item_variants_item_id ON menu_item_variants(item_id);
CREATE INDEX idx_menu_item_variants_sort ON menu_item_variants(item_id, sort_order);
CREATE UNIQUE INDEX idx_menu_item_variants_item_name ON menu_item_variants(item_id, name);

COMMENT ON TABLE menu_item_variants IS 'Price variants per menu item (e.g. Hot/Ice/Frappe for drinks)';

-- RLS: public can read variants for items of active clients; owners can manage
ALTER TABLE menu_item_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view variants of available items"
  ON menu_item_variants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM menu_items mi
      JOIN menu_clients mc ON mc.id = mi.client_id
      WHERE mi.id = menu_item_variants.item_id
        AND mi.is_available = true
        AND mc.is_active = true
    )
  );

CREATE POLICY "Owners can manage their menu item variants"
  ON menu_item_variants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM menu_items mi
      JOIN menu_clients mc ON mc.id = mi.client_id
      WHERE mi.id = menu_item_variants.item_id
        AND mc.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM menu_items mi
      JOIN menu_clients mc ON mc.id = mi.client_id
      WHERE mi.id = menu_item_variants.item_id
        AND mc.owner_id = auth.uid()
    )
  );

-- Trigger updated_at
CREATE TRIGGER update_menu_item_variants_updated_at
  BEFORE UPDATE ON menu_item_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED: Example drink with variant pricing (Latte: Hot / Ice / Frappe)
-- ============================================
INSERT INTO menu_items (id, client_id, category_id, name, slug, description, price, image_url, badges, is_featured, is_available, sort_order)
VALUES (
  'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'b6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Latte',
  'latte',
  'Espresso with steamed milk. Choose Hot, Ice, or Frappe.',
  NULL,
  'https://images.unsplash.com/photo-1561882468-9110e03e0f78?q=80&w=500&auto=format&fit=crop',
  '{}',
  false,
  true,
  10
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  updated_at = now();

INSERT INTO menu_item_variants (item_id, name, name_km, price, sort_order)
VALUES
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Hot', NULL, 6.00, 0),
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ice', NULL, 8.00, 1),
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Frappe', NULL, 9.00, 2)
ON CONFLICT (item_id, name) DO UPDATE SET price = EXCLUDED.price, sort_order = EXCLUDED.sort_order, updated_at = now();
