-- Cleanup: drop columns not used by app. Keep 2 currencies (USD, KHR) and 2 languages (en, km) only.
-- menu_clients: keep default_locale, currency, exchange_rate. Drop redundant/flexible columns.
-- menu_categories / menu_items / menu_featured_items: use only _km columns for Khmer; drop translations jsonb.
-- menu_items: drop custom_fields, item_type (not used in UI).

ALTER TABLE public.menu_clients
  DROP COLUMN IF EXISTS supported_locales,
  DROP COLUMN IF EXISTS supported_currencies,
  DROP COLUMN IF EXISTS currency_symbol,
  DROP COLUMN IF EXISTS client_type;

ALTER TABLE public.menu_categories
  DROP COLUMN IF EXISTS translations;

ALTER TABLE public.menu_items
  DROP COLUMN IF EXISTS translations,
  DROP COLUMN IF EXISTS custom_fields,
  DROP COLUMN IF EXISTS item_type;

ALTER TABLE public.menu_featured_items
  DROP COLUMN IF EXISTS translations;
