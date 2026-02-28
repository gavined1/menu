const UNSAFE_NEXT_PATH_PATTERN = /[\\\r\n]/;

export const DEFAULT_AUTH_REDIRECT_PATH = '/dashboard';

export function getSafeNextPath(
  next: string | null | undefined,
  fallback: string = DEFAULT_AUTH_REDIRECT_PATH
): string {
  if (!next) {
    return fallback;
  }

  if (!next.startsWith('/') || next.startsWith('//')) {
    return fallback;
  }

  if (UNSAFE_NEXT_PATH_PATTERN.test(next)) {
    return fallback;
  }

  return next;
}
