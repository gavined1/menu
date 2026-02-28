/**
 * Cloudflare R2 storage (S3-compatible API).
 * Use for menu images, client logos, etc. Store returned URLs in Supabase.
 */

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET;
const publicBaseUrl = process.env.R2_PUBLIC_URL;

function getR2Client(): S3Client {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing R2 env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY'
    );
  }
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export type UploadR2Options = {
  /** File key (path) in the bucket, e.g. "menu/clients/abc/logo.png" */
  key: string;
  /** File body (Buffer or Uint8Array) */
  body: Buffer | Uint8Array;
  /** MIME type, e.g. "image/png" */
  contentType: string;
  /** Optional metadata */
  metadata?: Record<string, string>;
};

/**
 * Upload a file to R2. Returns the public URL to store in your DB.
 * Requires R2_PUBLIC_URL to be set (e.g. custom domain or R2 public bucket URL).
 */
export async function uploadToR2(
  options: UploadR2Options
): Promise<{ url: string; key: string }> {
  const { key, body, contentType, metadata } = options;
  if (!bucket) {
    throw new Error('Missing R2_BUCKET env');
  }
  if (!publicBaseUrl) {
    throw new Error(
      'Missing R2_PUBLIC_URL env (e.g. https://pub-xxx.r2.dev or your custom domain)'
    );
  }

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      Metadata: metadata,
    })
  );

  const base = publicBaseUrl.replace(/\/$/, '');
  const path = key.startsWith('/') ? key : `/${key}`;
  const url = `${base}${path}`;
  return { url, key };
}

/** Check if R2 is configured (for conditional features). */
export function isR2Configured(): boolean {
  return Boolean(
    accountId && accessKeyId && secretAccessKey && bucket && publicBaseUrl
  );
}
