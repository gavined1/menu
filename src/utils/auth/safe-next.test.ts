import { describe, expect, it } from 'vitest';
import { DEFAULT_AUTH_REDIRECT_PATH, getSafeNextPath } from './safe-next';

describe('getSafeNextPath', () => {
  it('keeps safe internal paths', () => {
    expect(getSafeNextPath('/dashboard?tab=security')).toBe(
      '/dashboard?tab=security'
    );
  });

  it('falls back for external urls', () => {
    expect(getSafeNextPath('https://evil.example')).toBe(
      DEFAULT_AUTH_REDIRECT_PATH
    );
  });

  it('falls back for protocol-relative redirects', () => {
    expect(getSafeNextPath('//evil.example/path')).toBe(
      DEFAULT_AUTH_REDIRECT_PATH
    );
  });

  it('falls back for slash-escaped values', () => {
    expect(getSafeNextPath('/\\evil')).toBe(DEFAULT_AUTH_REDIRECT_PATH);
  });
});
