# Cloudflare Workers / Pages deploy

The app uses [OpenNext for Cloudflare](https://opennext.js.org/cloudflare). The file `.open-next/worker.js` is **not** produced by `next build`; it is produced by the OpenNext build.

## CI / dashboard settings

Use these in your Cloudflare Workers or Pages project:

| Setting | Value |
|--------|--------|
| **Build command** | `pnpm opennextjs-cloudflare build` |
| **Deploy command** | `npx wrangler deploy` |

If you use a single deploy step that runs both, use:

- **Deploy command** (all-in-one): `pnpm run deploy`

(`pnpm run deploy` runs `opennextjs-cloudflare build` then `opennextjs-cloudflare deploy`.)

## Local

- Preview: `pnpm run preview`
- Deploy: `pnpm run deploy`

Ensure `wrangler.jsonc` and `.dev.vars` (and env vars for Supabase, etc.) are set; see OpenNext [Get Started](https://opennext.js.org/cloudflare/get-started).
