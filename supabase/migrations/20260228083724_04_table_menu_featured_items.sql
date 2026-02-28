-- Table: menu_featured_items (one file per table)
CREATE TABLE public.menu_featured_items (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  client_id uuid NOT NULL REFERENCES public.menu_clients (id) ON DELETE CASCADE,
  item_id uuid REFERENCES public.menu_items (id) ON DELETE SET NULL,
  title varchar(255) NOT NULL,
  subtitle text,
  badge_text varchar(50),
  image_url text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title_km varchar(255),
  subtitle_km text
);

COMMENT ON COLUMN public.menu_featured_items.title_km IS 'Featured item title in Khmer (2 languages: en, km)';
COMMENT ON COLUMN public.menu_featured_items.subtitle_km IS 'Featured item subtitle in Khmer';

CREATE INDEX idx_menu_featured_items_sort_order ON public.menu_featured_items (client_id, sort_order);

CREATE TRIGGER update_menu_featured_items_updated_at
  BEFORE UPDATE ON public.menu_featured_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
