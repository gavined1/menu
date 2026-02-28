import { describe, expect, it } from 'vitest';
import { getSafeExternalUrl } from './safe-url';

describe('getSafeExternalUrl', () => {
  it('allows https urls', () => {
    expect(getSafeExternalUrl('https://example.com/path')).toBe(
      'https://example.com/path'
    );
  });

  it('allows http urls', () => {
    expect(getSafeExternalUrl('http://example.com')).toBe('http://example.com/');
  });

  it('rejects javascript protocol', () => {
    expect(getSafeExternalUrl('javascript:alert(1)')).toBeNull();
  });

  it('rejects data protocol', () => {
    expect(getSafeExternalUrl('data:text/html;base64,abcd')).toBeNull();
  });

  it('rejects invalid urls', () => {
    expect(getSafeExternalUrl('not a url')).toBeNull();
  });
});
