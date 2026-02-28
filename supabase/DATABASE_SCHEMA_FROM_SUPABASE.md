# Database schema (Supabase)

This document reflects the **target schema** after cleanup: 2 currencies (USD, KHR) and 2 languages (en, km). Unused columns have been removed.

---

## 1. Tables (5)

| Table                 | RLS enabled | Rows (approx) |
|-----------------------|-------------|---------------|
| menu_clients          | yes         | 0             |
| menu_categories       | yes         | 0             |
| menu_items            | yes         | 0             |
| menu_featured_items   | yes         | 0             |
| menu_client_members   | yes         | 1             |

---

## 2. Enums (public schema)

| Enum name             | Values                                                                 |
|-----------------------|------------------------------------------------------------------------|
| menu_currency         | USD, KHR                                                               |
| menu_item_badge_type  | vegan, vegetarian, spicy, gluten_free, new, best_seller, chef_special, seasonal |
| menu_locale           | en, km                                                                 |

**Migration gap:** `20251126201608_create_digital_menu_tables.sql` only creates `menu_item_badge_type`. **Missing from migrations:** `menu_currency`, `menu_locale` (added manually).

---

## 3. Columns per table (vs migrations)

### menu_clients

| Column             | Type         | Default / notes |
|--------------------|--------------|------------------|
| id                 | uuid         | uuid_generate_v4() |
| name               | varchar      | |
| slug               | varchar      | UNIQUE |
| description        | text         | nullable |
| logo_url           | text         | nullable |
| cover_image_url    | text         | nullable |
| primary_color      | varchar      | '#000000' |
| accent_color       | varchar      | '#ffffff' |
| is_active          | boolean      | true |
| settings           | jsonb        | '{}' |
| created_at         | timestamptz  | now() |
| updated_at         | timestamptz  | now() |
| phone              | varchar      | nullable |
| email              | varchar      | nullable |
| address            | text         | nullable |
| city               | varchar      | nullable |
| opening_hours      | jsonb        | '{}' |
| social_links       | jsonb        | '{}' |
| default_locale     | menu_locale  | 'en' (2 languages: en, km) |
| currency           | menu_currency| 'USD' (2 currencies: USD, KHR) |
| exchange_rate      | numeric      | nullable (custom rate; NULL = app default) |
| owner_id           | uuid         | nullable FK → auth.users.id |

**Dropped:** supported_locales, supported_currencies, currency_symbol, client_type (unused; app uses fixed en/km and USD/KHR).

---

### menu_categories

| Column        | Type        | Default / notes |
|---------------|-------------|------------------|
| id            | uuid        | uuid_generate_v4() |
| client_id     | uuid        | FK → menu_clients.id |
| name          | varchar     | |
| slug          | varchar     | |
| description   | text        | nullable |
| image_url     | text        | nullable |
| sort_order    | int4        | 0 |
| is_active     | boolean     | true |
| created_at    | timestamptz | now() |
| updated_at    | timestamptz | now() |
| name_km       | varchar     | nullable (Khmer; 2 languages: en, km) |
| description_km| text        | nullable (Khmer) |

**Dropped:** translations (use name_km / description_km only).

---

### menu_items

| Column           | Type                    | Default / notes |
|------------------|-------------------------|------------------|
| id               | uuid                    | uuid_generate_v4() |
| client_id        | uuid                    | FK → menu_clients.id |
| category_id      | uuid                    | nullable FK → menu_categories.id |
| name             | varchar                 | |
| slug             | varchar                 | |
| description      | text                    | nullable |
| price            | numeric                 | |
| image_url        | text                    | nullable |
| badges           | menu_item_badge_type[]  | '{}' |
| prep_time_minutes| int4                    | nullable |
| is_featured      | boolean                 | false |
| is_available     | boolean                 | true |
| sort_order       | int4                    | 0 |
| metadata         | jsonb                   | '{}' |
| created_at       | timestamptz             | now() |
| updated_at       | timestamptz             | now() |
| name_km          | varchar                 | nullable (Khmer; 2 languages: en, km) |
| description_km   | text                    | nullable (Khmer) |
| images           | text[]                  | '{}' (array of URLs; first = primary) |

**Dropped:** translations, custom_fields, item_type (unused in UI).

---

### menu_featured_items

| Column        | Type        | Default / notes |
|---------------|-------------|------------------|
| id            | uuid        | uuid_generate_v4() |
| client_id     | uuid        | FK → menu_clients.id |
| item_id       | uuid        | nullable FK → menu_items.id |
| title         | varchar     | |
| subtitle      | text        | nullable |
| badge_text    | varchar     | nullable |
| image_url     | text        | NOT NULL |
| sort_order    | int4        | 0 |
| is_active     | boolean     | true |
| created_at    | timestamptz | now() |
| updated_at    | timestamptz | now() |
| title_km      | varchar     | nullable (Khmer; 2 languages: en, km) |
| subtitle_km   | text        | nullable (Khmer) |

**Dropped:** translations (use title_km / subtitle_km only).

---

### menu_client_members (restaurant/shop owners and staff)

| Column     | Type        | Default / notes |
|------------|-------------|------------------|
| id         | uuid        | uuid_generate_v4() |
| client_id  | uuid        | FK → menu_clients.id |
| user_id    | uuid        | FK → auth.users.id |
| role       | text        | CHECK: role IN ('owner','admin','editor','viewer') |
| created_at | timestamptz | now() |

This is the table that defines **who can manage which restaurant/shop menu**. One row = one user has access to one client with the given role. RLS on `menu_clients`, `menu_categories`, `menu_items`, and `menu_featured_items` ensures owners and staff can only read/write their own client’s data (no access to other clients’ menus). Only the service role can INSERT/UPDATE/DELETE members; the app backend assigns owners when creating a new client.

---

## 4. Indexes (public, these tables only)

- **menu_clients:** menu_clients_pkey (id), menu_clients_slug_key (slug), idx_menu_clients_slug (slug)
- **menu_categories:** menu_categories_pkey (id), menu_categories_client_id_slug_key (client_id, slug), idx_menu_categories_sort_order (client_id, sort_order)
- **menu_items:** menu_items_pkey (id), menu_items_client_id_slug_key (client_id, slug), idx_menu_items_client_id, idx_menu_items_category_id, idx_menu_items_slug (client_id, slug), idx_menu_items_sort_order (client_id, sort_order)
- **menu_featured_items:** menu_featured_items_pkey (id), idx_menu_featured_items_sort_order (client_id, sort_order)
- **menu_client_members:** menu_client_members_pkey (id), menu_client_members_client_id_user_id_key (client_id, user_id) UNIQUE, idx_menu_client_members_client_id, idx_menu_client_members_user_id

**Migration gap:** The big migration had idx_menu_clients_is_active, idx_menu_items_is_featured, idx_menu_items_is_available, idx_menu_featured_items_client_id; **DB does not have these**. So either they were dropped manually or never created.

---

## 5. Triggers

| Table               | Trigger name                        | Function                   |
|---------------------|-------------------------------------|----------------------------|
| menu_clients        | update_menu_clients_updated_at      | update_updated_at_column   |
| menu_categories     | update_menu_categories_updated_at  | update_updated_at_column   |
| menu_items          | update_menu_items_updated_at       | update_updated_at_column   |
| menu_featured_items | update_menu_featured_items_updated_at | update_updated_at_column |

**Function (public):** `update_updated_at_column()` sets `NEW.updated_at = NOW()`.

**Note:** menu_client_members has no updated_at column, so no trigger (correct).

---

## 6. RLS policies (all in public schema)

### menu_clients (3 policies)

| Policy name                 | Command | Using / With check |
|----------------------------|--------|--------------------|
| Public can view active clients | SELECT | is_active = true |
| Owners can view own clients    | SELECT | EXISTS (menu_client_members where client_id = id and user_id = auth.uid() and role in owner,admin,editor,viewer) |
| Owners can manage own clients  | ALL    | Same join, role in owner,admin; WITH CHECK same |

### menu_categories (3 policies)

| Policy name                              | Command | Using / With check |
|------------------------------------------|--------|--------------------|
| Public can view categories of active clients | SELECT | is_active and client is_active |
| Owners can view categories of own clients    | SELECT | member of client with role owner/admin/editor/viewer |
| Owners can manage categories of own clients  | ALL    | member with role owner/admin/editor; WITH CHECK same |

### menu_items (3 policies)

| Policy name                            | Command | Using / With check |
|----------------------------------------|--------|--------------------|
| Public can view available items of active clients | SELECT | is_available and client is_active |
| Owners can view items of own clients    | SELECT | member of client (owner/admin/editor/viewer) |
| Owners can manage items of own clients  | ALL    | member of client (owner/admin/editor); WITH CHECK same |

### menu_featured_items (3 policies)

| Policy name                                 | Command | Using / With check |
|---------------------------------------------|--------|--------------------|
| Public can view featured items of active clients | SELECT | is_active and client is_active |
| Owners can view featured items of own clients   | SELECT | member of client (owner/admin/editor/viewer) |
| Owners can manage featured items of own clients | ALL    | member of client (owner/admin/editor); WITH CHECK same |

### menu_client_members (1 policy)

| Policy name                | Command | Using |
|----------------------------|--------|--------|
| Users can view own memberships | SELECT | user_id = auth.uid() |

**No INSERT/UPDATE/DELETE policies on menu_client_members** — only service role (or backend with service key) can modify members. Intentional if members are managed server-side only.

---

## 7. Cleanup summary (2 currencies, 2 languages)

- **Kept:** default_locale, currency (menu_currency: USD, KHR), exchange_rate; name_km, description_km, title_km, subtitle_km for Khmer; images on menu_items.
- **Removed:** supported_locales, supported_currencies, currency_symbol, client_type (menu_clients); translations (menu_categories, menu_items, menu_featured_items); custom_fields, item_type (menu_items).
- Run migration `20260228084510_cleanup_unused_columns.sql` on an existing DB, or use the updated Option A table migrations for new projects. Then run `pnpm gen:types` to refresh TypeScript types.

 can view/manage…” policies; migrations have the old “Authenticated users can manage” style. To match DB, migrations need the policy set above (and the single SELECT policy for menu_client_members).
