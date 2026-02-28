# Option A: New project migrations

Use these migrations when you **create a new Supabase project** and want the schema applied from scratch (no old migrations).

## Migration set (run in order by filename)

| Order | File | Purpose |
|-------|------|---------|
| 1 | `20260228083720_00_extensions_enums_function.sql` | Extensions (uuid-ossp, pgcrypto), enums (menu_currency, menu_locale, menu_item_badge_type), `update_updated_at_column()` |
| 2 | `20260228083721_01_table_menu_clients.sql` | Table `menu_clients` + indexes + trigger |
| 3 | `20260228083726_06_rls_menu_clients.sql` | RLS for `menu_clients` |
| 4 | `20260228083722_02_table_menu_categories.sql` | Table `menu_categories` + indexes + trigger |
| 5 | `20260228083727_07_rls_menu_categories.sql` | RLS for `menu_categories` |
| 6 | `20260228083723_03_table_menu_items.sql` | Table `menu_items` + indexes + trigger |
| 7 | `20260228083728_08_rls_menu_items.sql` | RLS for `menu_items` |
| 8 | `20260228083724_04_table_menu_featured_items.sql` | Table `menu_featured_items` + indexes + trigger |
| 9 | `20260228083729_09_rls_menu_featured_items.sql` | RLS for `menu_featured_items` |
| 10 | `20260228083725_05_table_menu_client_members.sql` | Table `menu_client_members` + indexes |
| 11 | `20260228083730_10_rls_menu_client_members.sql` | RLS for `menu_client_members` |

**Note:** The table migrations above already use the cleaned schema (2 currencies: USD/KHR, 2 languages: en/km; no `translations` jsonb, no `supported_*`, `currency_symbol`, `client_type`, `custom_fields`, `item_type`). If you are migrating an **existing** project that still has those columns, run `20260228084510_cleanup_unused_columns.sql` after the table/RLS migrations.

## Restaurant / shop owners (only manage their menu)

- **Table:** `menu_client_members` links each user (`auth.users`) to a restaurant/shop (`menu_clients`) with a role: `owner`, `admin`, `editor`, or `viewer`.
- **One row per user per client:** a user can be owner of one shop and editor of another. Each row means “this user can access this client’s menu with this role.”
- **Who can manage what:**  
  - **owner / admin:** manage the client (restaurant/shop) and all its categories, items, and featured items.  
  - **editor:** manage categories, items, and featured items for that client (not client settings).  
  - **viewer:** read-only for that client’s menu.
- **RLS** on `menu_clients`, `menu_categories`, `menu_items`, and `menu_featured_items` restricts all write access to users who have a matching row in `menu_client_members` for that client with the right role. So **owners can only manage their own menu** (their client’s data).
- **Adding owners:** there is no INSERT policy on `menu_client_members` for authenticated users, so only the **service role** (your backend) can create/update/delete members. When a new restaurant/shop is created, your app should insert the owner into `menu_client_members` with `role = 'owner'`.

## How to use on a new project

1. **Create a new Supabase project** in the dashboard (or CLI).
2. **Use only these migrations** on that project:
   - Either clone/copy this repo and **delete all other files** in `supabase/migrations/` except the `202602280837*` ones and this README,  
   - Or create a new repo/folder with only these 11 SQL files (and this README) in `supabase/migrations/`.
3. **Link and push:**
   ```bash
   supabase link --project-ref <NEW_PROJECT_REF>
   supabase db push
   ```
4. **Regenerate types** (from the new project):
   ```bash
   pnpm gen:types
   ```
   (Update `package.json` script to use the new project ID if needed.)

## Migrating data from the old database

- Export from the old project (Dashboard → Database → Backups, or `pg_dump`).
- Restore or run `INSERT ... SELECT` into the new project after the migrations and schema are in place.

## Old migrations in this repo

The other migration files in `supabase/migrations/` (e.g. `20230208104717_init.sql`, `20251126201608_create_digital_menu_tables.sql`, etc.) belong to the **previous** project. Do not run them on the new project; use only the `202602280837*` set above.
