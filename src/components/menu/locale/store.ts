import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  currencies,
  defaultCurrency,
  defaultLocale,
  exchangeRates,
  locales,
  type SupportedCurrency,
  type SupportedLocale,
} from './i18n.config';
import { getTranslation, type TranslationKey } from './translations';

// =============================================================================
// TYPES
// =============================================================================

interface MenuLocaleState {
  locale: SupportedLocale;
  currency: SupportedCurrency;
  customExchangeRate: number | null;
}

interface MenuLocaleStore extends MenuLocaleState {
  setLocale: (locale: SupportedLocale) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  setCustomExchangeRate: (rate: number | null) => void;
}

// =============================================================================
// STORE (minimal - just state and setters)
// =============================================================================

export const useMenuLocaleStore = create<MenuLocaleStore>()(
  persist(
    (set) => ({
      locale: defaultLocale,
      currency: defaultCurrency,
      customExchangeRate: null,
      setLocale: (locale) => set({ locale }),
      setCurrency: (currency) => set({ currency }),
      setCustomExchangeRate: (rate) => set({ customExchangeRate: rate }),
    }),
    {
      name: 'menu-locale-storage',
      // Only persist locale and currency, NOT customExchangeRate (comes from DB)
      partialize: (state) => ({
        locale: state.locale,
        currency: state.currency,
      }),
    }
  )
);

// =============================================================================
// DERIVED HELPERS (computed outside the store)
// =============================================================================

export function getExchangeRate(
  currency: SupportedCurrency,
  customRate: number | null
): number {
  return customRate ?? exchangeRates[currency];
}

export function formatPrice(
  priceUSD: number,
  currency: SupportedCurrency,
  locale: SupportedLocale,
  customRate: number | null
): string {
  const config = currencies[currency];
  const rate = customRate ?? exchangeRates[currency];

  let amount = currency === 'USD' ? priceUSD : priceUSD * rate;
  if (config.decimals === 0) amount = Math.round(amount);

  const formatted = amount.toLocaleString(locales[locale].numberFormat, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  });

  return config.position === 'before'
    ? `${config.symbol}${formatted}`
    : `${formatted}${config.symbol}`;
}

/** Localized name (2 languages: en, km) */
export function getLocalizedText(
  item: { name: string; name_km?: string | null },
  locale: SupportedLocale
): string {
  if (locale === 'km' && item.name_km) return item.name_km;
  return item.name;
}

/** Localized description (2 languages: en, km) */
export function getLocalizedDescription(
  item: {
    description?: string | null;
    description_km?: string | null;
  },
  locale: SupportedLocale
): string | null {
  if (locale === 'km' && item.description_km) return item.description_km;
  return item.description ?? null;
}

// =============================================================================
// HYDRATION HOOK FOR NEXT.JS
// =============================================================================

export function useMenuLocaleHydrated<T>(
  selector: (state: MenuLocaleStore) => T
): T | undefined {
  const storeValue = useMenuLocaleStore(selector);
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    setValue(storeValue);
  }, [storeValue]);

  return value;
}

// =============================================================================
// SELECTORS
// =============================================================================

export const selectLocale = (state: MenuLocaleStore) => state.locale;
export const selectCurrency = (state: MenuLocaleStore) => state.currency;
export const selectSetLocale = (state: MenuLocaleStore) => state.setLocale;
export const selectSetCurrency = (state: MenuLocaleStore) => state.setCurrency;

// =============================================================================
// TRANSLATION HELPER
// =============================================================================

export function t(key: TranslationKey, locale: SupportedLocale): string {
  return getTranslation(locale, key);
}
