-- Table: menu_client_members (restaurant/shop owner and staff)
-- Links auth.users to a menu_client (restaurant/shop). Owners and staff can only manage that client's menu.
-- Roles: owner = full control; admin = full control; editor = manage categories/items; viewer = read-only.
CREATE TABLE public.menu_client_members (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  client_id uuid NOT NULL REFERENCES public.menu_clients (id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  created_at timestamptz DEFAULT now(),
  UNIQUE (client_id, user_id)
);

COMMENT ON TABLE public.menu_client_members IS 'Restaurant/shop owners and staff. Each row lets one user manage (or view) one client''s menu. RLS on menu_clients, menu_categories, menu_items, menu_featured_items ensures they can only access their own client.';

CREATE INDEX idx_menu_client_members_client_id ON public.menu_client_members (client_id);
CREATE INDEX idx_menu_client_members_user_id ON public.menu_client_members (user_id);
