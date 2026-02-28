-- Table: menu_categories (one file per table)
CREATE TABLE public.menu_categories (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  client_id uuid NOT NULL REFERENCES public.menu_clients (id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  slug varchar(100) NOT NULL,
  description text,
  image_url text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  name_km varchar(255),
  description_km text,
  UNIQUE (client_id, slug)
);

COMMENT ON COLUMN public.menu_categories.name_km IS 'Category name in Khmer (2 languages: en, km)';
COMMENT ON COLUMN public.menu_categories.description_km IS 'Category description in Khmer';

CREATE INDEX idx_menu_categories_sort_order ON public.menu_categories (client_id, sort_order);

CREATE TRIGGER update_menu_categories_updated_at
  BEFORE UPDATE ON public.menu_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
