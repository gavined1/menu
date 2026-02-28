-- Table: menu_clients (one file per table)
CREATE TABLE public.menu_clients (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  name varchar(255) NOT NULL,
  slug varchar(100) NOT NULL,
  description text,
  logo_url text,
  cover_image_url text,
  primary_color varchar(7) DEFAULT '#000000',
  accent_color varchar(7) DEFAULT '#ffffff',
  is_active boolean DEFAULT true,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  phone varchar,
  email varchar,
  address text,
  city varchar,
  opening_hours jsonb DEFAULT '{}',
  social_links jsonb DEFAULT '{}',
  default_locale public.menu_locale DEFAULT 'en',
  currency public.menu_currency DEFAULT 'USD',
  exchange_rate numeric,
  owner_id uuid REFERENCES auth.users (id) ON DELETE SET NULL
);

COMMENT ON COLUMN public.menu_clients.phone IS 'Restaurant phone number';
COMMENT ON COLUMN public.menu_clients.email IS 'Restaurant email address';
COMMENT ON COLUMN public.menu_clients.address IS 'Full street address';
COMMENT ON COLUMN public.menu_clients.city IS 'City name';
COMMENT ON COLUMN public.menu_clients.opening_hours IS 'JSON object with day names as keys and hours as values';
COMMENT ON COLUMN public.menu_clients.social_links IS 'JSON object with platform names as keys and URLs as values';
COMMENT ON COLUMN public.menu_clients.default_locale IS 'Default language for the menu (en=English, km=Khmer)';
COMMENT ON COLUMN public.menu_clients.currency IS 'Primary currency for prices (USD, KHR)';
COMMENT ON COLUMN public.menu_clients.exchange_rate IS 'Custom exchange rate for this restaurant. NULL = use default rates from app config.';

CREATE UNIQUE INDEX menu_clients_slug_key ON public.menu_clients (slug);
CREATE INDEX idx_menu_clients_slug ON public.menu_clients (slug);

CREATE TRIGGER update_menu_clients_updated_at
  BEFORE UPDATE ON public.menu_clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
