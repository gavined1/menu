-- RLS: menu_client_members (one file per table)
-- SELECT: users can see their own memberships (which restaurants/shops they belong to).
-- INSERT/UPDATE/DELETE: no policy for authenticated users → only service_role or backend can add/remove owners and staff. This ensures only your app can assign "restaurant owner" when a new shop is created or invite editors/viewers.
ALTER TABLE public.menu_client_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memberships"
  ON public.menu_client_members FOR SELECT
  USING (user_id = auth.uid());
