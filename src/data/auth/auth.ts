'use server';

import { actionClient } from '@/lib/safe-action';
import { createSupabaseClient } from '@/supabase-clients/server';
import { getSafeNextPath } from '@/utils/auth/safe-next';
import { toSiteURL } from '@/utils/helpers';
import {
  signInSchema,
  signInWithMagicLinkSchema,
  signInWithProviderSchema,
} from '@/utils/zod-schemas';

/**
 * Signs in a user with email and password.
 * @param {Object} params - The parameters for sign in.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @throws {Error} If there's an error during sign in.
 */
export const signInWithPasswordAction = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createSupabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error('Invalid login credentials');
    }

    // No need to return anything if the operation is successful
  });

/**
 * Sends a magic link to the user's email for passwordless sign in.
 * @param {Object} params - The parameters for magic link sign in.
 * @param {string} params.email - The user's email address.
 * @param {string} [params.next] - The URL to redirect to after successful sign in.
 * @throws {Error} If there's an error sending the magic link.
 */
export const signInWithMagicLinkAction = actionClient
  .schema(signInWithMagicLinkSchema)
  .action(async ({ parsedInput: { email, next } }) => {
    const supabase = await createSupabaseClient();
    const redirectUrl = new URL(toSiteURL('/auth/callback'));
    const safeNextPath = getSafeNextPath(next);
    if (safeNextPath) {
      redirectUrl.searchParams.set('next', safeNextPath);
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl.toString(),
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // No need to return anything if the operation is successful
  });

/**
 * Initiates OAuth sign in with a specified provider.
 * @param {Object} params - The parameters for OAuth sign in.
 * @param {('google'|'github'|'gitlab'|'bitbucket')} params.provider - The OAuth provider.
 * @param {string} [params.next] - The URL to redirect to after successful sign in.
 * @returns {Promise<{url: string}>} The URL to redirect the user to for OAuth sign in.
 * @throws {Error} If there's an error initiating OAuth sign in.
 */
export const signInWithProviderAction = actionClient
  .schema(signInWithProviderSchema)
  .action(async ({ parsedInput: { provider, next } }) => {
    const supabase = await createSupabaseClient();
    const redirectToURL = new URL(toSiteURL('/auth/callback'));
    const safeNextPath = getSafeNextPath(next);
    if (safeNextPath) {
      redirectToURL.searchParams.set('next', safeNextPath);
    }
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectToURL.toString(),
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return { url: data.url };
  });
