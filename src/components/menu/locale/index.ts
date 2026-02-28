// Provider & Hook
export { MenuLocaleProvider, useMenuLocale } from './MenuLocaleProvider';

// Store (Zustand)
export {
  selectCurrency,
  selectLocale,
  selectSetCurrency,
  selectSetLocale,
  useMenuLocaleHydrated,
  useMenuLocaleStore,
} from './store';

export type { LocalizableDescriptionItem, LocalizableNameItem } from './store';

// Config
export {
  currencies,
  defaultCurrency,
  defaultLocale,
  exchangeRates,
  locales,
  supportedCurrencies,
  supportedLocales,
} from './i18n.config';

// Types
export type {
  CurrencyConfig,
  LocaleConfig,
  SupportedCurrency,
  SupportedLocale,
} from './i18n.config';

export type { TranslationKey } from './translations';
