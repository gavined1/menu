-- Harden multi-tenant ownership and RLS policies for digital menu tables.

ALTER TABLE public.menu_clients
  ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_menu_clients_owner_id
  ON public.menu_clients(owner_id);

CREATE OR REPLACE FUNCTION public.set_menu_client_owner_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.owner_id IS NULL AND auth.uid() IS NOT NULL THEN
    NEW.owner_id := auth.uid();
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_menu_client_owner_id_trigger ON public.menu_clients;
CREATE TRIGGER set_menu_client_owner_id_trigger
  BEFORE INSERT ON public.menu_clients
  FOR EACH ROW EXECUTE FUNCTION public.set_menu_client_owner_id();

-- Remove broad authenticated management policies.
DROP POLICY IF EXISTS "Authenticated users can manage clients" ON public.menu_clients;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON public.menu_categories;
DROP POLICY IF EXISTS "Authenticated users can manage items" ON public.menu_items;
DROP POLICY IF EXISTS "Authenticated users can manage featured items" ON public.menu_featured_items;

-- Owner-scoped policies for menu clients.
DROP POLICY IF EXISTS "Owners can manage their menu clients" ON public.menu_clients;
CREATE POLICY "Owners can manage their menu clients"
  ON public.menu_clients
  FOR ALL
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Owner-scoped policies for categories.
DROP POLICY IF EXISTS "Owners can manage their menu categories" ON public.menu_categories;
CREATE POLICY "Owners can manage their menu categories"
  ON public.menu_categories
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.menu_clients
      WHERE menu_clients.id = menu_categories.client_id
        AND menu_clients.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.menu_clients
      WHERE menu_clients.id = menu_categories.client_id
        AND menu_clients.owner_id = auth.uid()
    )
  );

-- Owner-scoped policies for items.
DROP POLICY IF EXISTS "Owners can manage their menu items" ON public.menu_items;
CREATE POLICY "Owners can manage their menu items"
  ON public.menu_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.menu_clients
      WHERE menu_clients.id = menu_items.client_id
        AND menu_clients.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.menu_clients
      WHERE menu_clients.id = menu_items.client_id
        AND menu_clients.owner_id = auth.uid()
    )
  );

-- Owner-scoped policies for featured items.
DROP POLICY IF EXISTS "Owners can manage their menu featured items" ON public.menu_featured_items;
CREATE POLICY "Owners can manage their menu featured items"
  ON public.menu_featured_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.menu_clients
      WHERE menu_clients.id = menu_featured_items.client_id
        AND menu_clients.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.menu_clients
      WHERE menu_clients.id = menu_featured_items.client_id
        AND menu_clients.owner_id = auth.uid()
    )
  );
