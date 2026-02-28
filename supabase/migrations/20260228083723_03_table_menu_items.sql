-- Table: menu_items (one file per table)
CREATE TABLE public.menu_items (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  client_id uuid NOT NULL REFERENCES public.menu_clients (id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.menu_categories (id) ON DELETE SET NULL,
  name varchar(255) NOT NULL,
  slug varchar(255) NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  image_url text,
  badges public.menu_item_badge_type[] DEFAULT '{}',
  prep_time_minutes integer,
  is_featured boolean DEFAULT false,
  is_available boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  name_km varchar(255),
  description_km text,
  images text[] DEFAULT '{}',
  UNIQUE (client_id, slug)
);

COMMENT ON COLUMN public.menu_items.name_km IS 'Item name in Khmer (2 languages: en, km)';
COMMENT ON COLUMN public.menu_items.description_km IS 'Item description in Khmer';
COMMENT ON COLUMN public.menu_items.images IS 'Array of image URLs for this menu item. First image is primary.';

CREATE INDEX idx_menu_items_client_id ON public.menu_items (client_id);
CREATE INDEX idx_menu_items_category_id ON public.menu_items (category_id);
CREATE INDEX idx_menu_items_slug ON public.menu_items (client_id, slug);
CREATE INDEX idx_menu_items_sort_order ON public.menu_items (client_id, sort_order);

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
