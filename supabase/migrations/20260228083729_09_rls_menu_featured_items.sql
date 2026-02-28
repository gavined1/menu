-- RLS: menu_featured_items (one file per table)
ALTER TABLE public.menu_featured_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view featured items of active clients"
  ON public.menu_featured_items FOR SELECT
  USING (
    is_active = true
    AND EXISTS (
      SELECT 1 FROM public.menu_clients c
      WHERE c.id = menu_featured_items.client_id
        AND c.is_active = true
    )
  );

CREATE POLICY "Owners can view featured items of own clients"
  ON public.menu_featured_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.menu_clients c
      JOIN public.menu_client_members m ON m.client_id = c.id
      WHERE c.id = menu_featured_items.client_id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin', 'editor', 'viewer')
    )
  );

CREATE POLICY "Owners can manage featured items of own clients"
  ON public.menu_featured_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.menu_clients c
      JOIN public.menu_client_members m ON m.client_id = c.id
      WHERE c.id = menu_featured_items.client_id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin', 'editor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.menu_clients c
      JOIN public.menu_client_members m ON m.client_id = c.id
      WHERE c.id = menu_featured_items.client_id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin', 'editor')
    )
  );
