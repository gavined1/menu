import { NextResponse, type NextRequest } from 'next/server';
import { match } from 'path-to-regexp';
import { updateSession } from './supabase-clients/middleware';

const apiRoutes = ['/api{/*path}'];

/**
 * Edge Middleware for auth/session (used for Cloudflare/OpenNext).
 * Next.js 16 proxy.ts defaults to Node.js runtime which OpenNext Cloudflare
 * does not support; this file uses the legacy middleware convention and
 * runs on the Edge runtime.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (apiRoutes.some((route) => match(route)(pathname))) {
    return NextResponse.next();
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
