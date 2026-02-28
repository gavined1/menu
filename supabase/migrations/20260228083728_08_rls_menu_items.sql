-- RLS: menu_items (one file per table)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available items of active clients"
  ON public.menu_items FOR SELECT
  USING (
    is_available = true
    AND EXISTS (
      SELECT 1 FROM public.menu_clients c
      WHERE c.id = menu_items.client_id
        AND c.is_active = true
    )
  );

CREATE POLICY "Owners can view items of own clients"
  ON public.menu_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.menu_clients c
      JOIN public.menu_client_members m ON m.client_id = c.id
      WHERE c.id = menu_items.client_id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin', 'editor', 'viewer')
    )
  );

CREATE POLICY "Owners can manage items of own clients"
  ON public.menu_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.menu_clients c
      JOIN public.menu_client_members m ON m.client_id = c.id
      WHERE c.id = menu_items.client_id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin', 'editor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.menu_clients c
      JOIN public.menu_client_members m ON m.client_id = c.id
      WHERE c.id = menu_items.client_id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin', 'editor')
    )
  );
