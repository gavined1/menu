import { createSupabaseClient } from '@/supabase-clients/server';
import {
  DEFAULT_AUTH_REDIRECT_PATH,
  getSafeNextPath,
} from '@/utils/auth/safe-next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokenHash = searchParams.get('token_hash');
  const safeNextPath = getSafeNextPath(
    searchParams.get('next'),
    DEFAULT_AUTH_REDIRECT_PATH
  );

  if (!tokenHash) {
    return NextResponse.redirect(new URL('/auth/auth-code-error', req.url));
  }

  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.verifyOtp({
    type: 'magiclink',
    token_hash: tokenHash,
  });

  if (error) {
    return NextResponse.redirect(new URL('/auth/auth-code-error', req.url));
  }

  return NextResponse.redirect(new URL(safeNextPath, req.url));
}
