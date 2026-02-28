import { createSupabaseClient } from '@/supabase-clients/server';
import {
  DEFAULT_AUTH_REDIRECT_PATH,
  getSafeNextPath,
} from '@/utils/auth/safe-next';
import { toSiteURL } from '@/utils/helpers';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const siteUrl = new URL(toSiteURL('/'));
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next');

  if (!code) {
    const safeNextPath = getSafeNextPath(next, DEFAULT_AUTH_REDIRECT_PATH);
    return NextResponse.redirect(new URL(safeNextPath, siteUrl));
  }

  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL('/auth/auth-code-error', requestUrl));
  }

  revalidatePath('/', 'layout');

  const safeNextPath = getSafeNextPath(next, DEFAULT_AUTH_REDIRECT_PATH);
  return NextResponse.redirect(new URL(safeNextPath, siteUrl));
}
