import { Database } from '@/lib/database.types';
import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client for public/anonymous data access.
 * This client doesn't use cookies and can be used in cached functions.
 */
let publicSupabaseClient: ReturnType<typeof createClient<Database>> | null =
  null;

export const createPublicSupabaseClient = () => {
  if (publicSupabaseClient) {
    return publicSupabaseClient;
  }

  publicSupabaseClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  return publicSupabaseClient;
};
