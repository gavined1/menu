# Cloudflare R2 setup (S3-compatible)

Use R2 for menu images, client logos, and other uploads. URLs are stored in Supabase; files live in R2.

## 1. Create R2 bucket

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2** → **Create bucket**.
2. Choose a name (e.g. `menu-uploads`).
3. For public access (images on the menu site): either **Allow public access** and note the public URL, or attach a **custom domain** (e.g. `cdn.yourdomain.com`).

## 2. Create API token

1. R2 → **Manage R2 API Tokens** → **Create API token**.
2. Permissions: **Object Read & Write** (or restrict to the bucket).
3. Copy **Access Key ID** and **Secret Access Key** (secret is shown once).

## 3. Env vars

Add to `.env.local` (see `.env.local.example`):

| Variable | Description |
|----------|-------------|
| `R2_ACCOUNT_ID` | Cloudflare account ID (from dashboard URL or Overview). |
| `R2_ACCESS_KEY_ID` | From step 2. |
| `R2_SECRET_ACCESS_KEY` | From step 2. |
| `R2_BUCKET` | Bucket name (e.g. `menu-uploads`). |
| `R2_PUBLIC_URL` | Public URL for the bucket (e.g. `https://pub-xxx.r2.dev` or `https://cdn.yourdomain.com`). |

## 4. Usage

**Server action (forms):**

```ts
import { uploadFileToR2 } from '@/actions/upload-r2';

// In a form action or onSubmit:
const formData = new FormData();
formData.set('file', file); // <input type="file" name="file" />
const result = await uploadFileToR2(formData, 'menu/clients/' + clientId);
if (result.success) {
  // Save result.url to menu_clients.logo_url or menu_items.image_url
}
```

**Direct upload (server-only):**

```ts
import { uploadToR2 } from '@/lib/r2';

const { url } = await uploadToR2({
  key: 'menu/items/abc/image.png',
  body: buffer,
  contentType: 'image/png',
});
// Store url in DB
```

## 5. Public access (R2)

- If the bucket is **public**: use the bucket’s public URL as `R2_PUBLIC_URL` (e.g. from R2 → bucket → Settings).
- For a **custom domain**: set up a custom domain in R2 and use that as `R2_PUBLIC_URL`.
