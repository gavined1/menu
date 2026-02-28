'use server';

import { uploadToR2, isR2Configured } from '@/lib/r2';

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const;

export type UploadR2Result =
  | { success: true; url: string; key: string }
  | { success: false; error: string };

/**
 * Upload a file from FormData to R2. Use in forms or client components.
 * Returns the public URL to save in menu_clients, menu_items, etc.
 *
 * Example: keyPrefix "menu/clients/abc-123" → files stored as menu/clients/abc-123/logo.png
 */
export async function uploadFileToR2(
  formData: FormData,
  keyPrefix: string,
  fieldName: string = 'file'
): Promise<UploadR2Result> {
  if (!isR2Configured()) {
    return { success: false, error: 'R2 storage is not configured' };
  }

  const file = formData.get(fieldName);
  if (!file || !(file instanceof File)) {
    return { success: false, error: 'No file provided' };
  }

  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    return {
      success: false,
      error: `Invalid type. Allowed: ${ALLOWED_TYPES.join(', ')}`,
    };
  }

  const maxBytes = MAX_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    return { success: false, error: `File too large (max ${MAX_SIZE_MB}MB)` };
  }

  const ext = file.name.split('.').pop() || 'bin';
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const key = `${keyPrefix.replace(/\/$/, '')}/${safeName}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const { url } = await uploadToR2({
      key,
      body: buffer,
      contentType: file.type,
      metadata: { originalName: file.name },
    });
    return { success: true, url, key };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Upload failed';
    return { success: false, error: message };
  }
}
