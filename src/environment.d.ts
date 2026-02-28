declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
      NODE_ENV: 'development' | 'production';
      SUPABASE_PROJECT_REF: string;
      /** Cloudflare R2 (S3-compatible) – optional */
      R2_ACCOUNT_ID?: string;
      R2_ACCESS_KEY_ID?: string;
      R2_SECRET_ACCESS_KEY?: string;
      R2_BUCKET?: string;
      R2_PUBLIC_URL?: string;
    }
  }
}

export {};
