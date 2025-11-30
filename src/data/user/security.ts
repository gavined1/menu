'use server';

import { authActionClient } from '@/lib/safe-action';
import { createSupabaseClient } from '@/supabase-clients/server';
import { z } from 'zod';

// Simple schema for password update (only password field needed from user)
const updatePasswordInputSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const updatePasswordAction = authActionClient
  .schema(updatePasswordInputSchema)
  .action(async ({ parsedInput: { password } }) => {
    const supabaseClient = await createSupabaseClient();
    const { error } = await supabaseClient.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  });
