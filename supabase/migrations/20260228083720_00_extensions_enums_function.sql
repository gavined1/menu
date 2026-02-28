-- Extensions, enums, and shared trigger function for Option A (new project from scratch)
-- Run this first on a fresh database.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

-- Enums (public schema)
CREATE TYPE public.menu_currency AS ENUM ('USD', 'KHR');
CREATE TYPE public.menu_locale AS ENUM ('en', 'km');
CREATE TYPE public.menu_item_badge_type AS ENUM (
  'vegan',
  'vegetarian',
  'spicy',
  'gluten_free',
  'new',
  'best_seller',
  'chef_special',
  'seasonal'
);

-- Shared trigger: set updated_at on row update
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path TO ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
