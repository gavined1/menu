-- RLS: menu_clients (one file per table)
ALTER TABLE public.menu_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active clients"
  ON public.menu_clients FOR SELECT
  USING (is_active = true);

CREATE POLICY "Owners can view own clients"
  ON public.menu_clients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.menu_client_members m
      WHERE m.client_id = menu_clients.id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin', 'editor', 'viewer')
    )
  );

CREATE POLICY "Owners can manage own clients"
  ON public.menu_clients FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.menu_client_members m
      WHERE m.client_id = menu_clients.id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.menu_client_members m
      WHERE m.client_id = menu_clients.id
        AND m.user_id = auth.uid()
        AND m.role IN ('owner', 'admin')
    )
  );
