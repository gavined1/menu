import type { Json, Tables } from '@/lib/database.types';
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

/** Item with name fields (menu_items / menu_categories). Optional translations for JSON column if present. */
export type LocalizableNameItem = Pick<Tables<'menu_items'>, 'name' | 'name_km'> & {
  translations?: Json | null;
};

/** Item with description fields (menu_items). Optional translations for JSON column if present. */
export type LocalizableDescriptionItem = Pick<
  Tables<'menu_items'>,
  'description' | 'description_km'
> & { translations?: Json | null };

// =============================================================================
// TYPES
// =============================================================================

/** Client's base currency (how item prices are stored in DB). null = treat as USD. */
export type ClientBaseCurrency = SupportedCurrency | null;

interface MenuLocaleState {
  locale: SupportedLocale;
  currency: SupportedCurrency;
  customExchangeRate: number | null;
  /** Base currency for stored prices (from menu_clients.currency). KHR = prices in DB are in KHR. */
  clientCurrency: ClientBaseCurrency;
}

interface MenuLocaleStore extends MenuLocaleState {
  setLocale: (locale: SupportedLocale) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  setCustomExchangeRate: (rate: number | null) => void;
  setClientCurrency: (currency: ClientBaseCurrency) => void;
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
      clientCurrency: null,
      setLocale: (locale) => set({ locale }),
      setCurrency: (currency) => set({ currency }),
      setCustomExchangeRate: (rate) => set({ customExchangeRate: rate }),
      setClientCurrency: (currency) => set({ clientCurrency: currency }),
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

function hasValue(s: string | null | undefined): s is string {
  return s != null && String(s).trim() !== '';
}

export function getLocalizedText(
  item: LocalizableNameItem,
  locale: SupportedLocale
): string {
  const translations = item.translations as Record<string, { name?: string }> | null;
  if (locale === 'km') {
    const kmName =
      translations?.['km']?.name ?? item.name_km ?? null;
    if (hasValue(kmName)) return kmName;
    return translations?.['en']?.name ?? item.name;
  }
  if (translations?.[locale]?.name) return translations[locale].name;
  return item.name;
}

/**
 * Returns the item description for the current locale.
 * Uses Khmer (translations.km / description_km) when locale is km and value is not null/empty; otherwise falls back to English.
 */
export function getLocalizedDescription(
  item: LocalizableDescriptionItem,
  locale: SupportedLocale
): string | null {
  const translations = item.translations as Record<
    string,
    { description?: string }
  > | null;
  if (locale === 'km') {
    const kmDesc =
      translations?.['km']?.description ?? item.description_km ?? null;
    if (hasValue(kmDesc)) return kmDesc;
    return translations?.['en']?.description ?? item.description ?? null;
  }
  if (translations?.[locale]?.description)
    return translations[locale].description;
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
