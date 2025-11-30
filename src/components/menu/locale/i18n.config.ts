/**
 * i18n Configuration - Single source of truth
 *
 * TO ADD A NEW LANGUAGE:
 * 1. Add locale config to `locales` object
 * 2. Add translations to `uiTranslations` object
 *
 * TO ADD A NEW CURRENCY:
 * 1. Add currency config to `currencies` object
 */

// =============================================================================
// LOCALE CONFIGURATION
// =============================================================================

export interface LocaleConfig {
  code: string;
  name: string; // Name in that language
  nameEnglish: string; // Name in English
  flag: string; // Emoji flag
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  numberFormat: string; // Intl locale string
}

export const locales = {
  en: {
    code: 'en',
    name: 'English',
    nameEnglish: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US',
  },
  km: {
    code: 'km',
    name: 'ខ្មែរ',
    nameEnglish: 'Khmer',
    flag: '🇰🇭',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'km-KH',
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ADD NEW LANGUAGES HERE:
  // ─────────────────────────────────────────────────────────────────────────────
  // th: {
  //   code: 'th',
  //   name: 'ไทย',
  //   nameEnglish: 'Thai',
  //   flag: '🇹🇭',
  //   direction: 'ltr',
  //   dateFormat: 'DD/MM/YYYY',
  //   numberFormat: 'th-TH',
  // },
  // zh: {
  //   code: 'zh',
  //   name: '中文',
  //   nameEnglish: 'Chinese',
  //   flag: '🇨🇳',
  //   direction: 'ltr',
  //   dateFormat: 'YYYY/MM/DD',
  //   numberFormat: 'zh-CN',
  // },
  // vi: {
  //   code: 'vi',
  //   name: 'Tiếng Việt',
  //   nameEnglish: 'Vietnamese',
  //   flag: '🇻🇳',
  //   direction: 'ltr',
  //   dateFormat: 'DD/MM/YYYY',
  //   numberFormat: 'vi-VN',
  // },
  // ja: {
  //   code: 'ja',
  //   name: '日本語',
  //   nameEnglish: 'Japanese',
  //   flag: '🇯🇵',
  //   direction: 'ltr',
  //   dateFormat: 'YYYY/MM/DD',
  //   numberFormat: 'ja-JP',
  // },
  // ko: {
  //   code: 'ko',
  //   name: '한국어',
  //   nameEnglish: 'Korean',
  //   flag: '🇰🇷',
  //   direction: 'ltr',
  //   dateFormat: 'YYYY/MM/DD',
  //   numberFormat: 'ko-KR',
  // },
  // ar: {
  //   code: 'ar',
  //   name: 'العربية',
  //   nameEnglish: 'Arabic',
  //   flag: '🇸🇦',
  //   direction: 'rtl',
  //   dateFormat: 'DD/MM/YYYY',
  //   numberFormat: 'ar-SA',
  // },
} as const satisfies Record<string, LocaleConfig>;

export type SupportedLocale = keyof typeof locales;
export const supportedLocales = Object.keys(locales) as SupportedLocale[];
export const defaultLocale: SupportedLocale = 'en';

// =============================================================================
// CURRENCY CONFIGURATION
// =============================================================================

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  nameLocal: string; // Name in local language
  decimals: number;
  position: 'before' | 'after';
  thousandSeparator: string;
  decimalSeparator: string;
}

export const currencies = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nameLocal: 'US Dollar',
    decimals: 2,
    position: 'before',
    thousandSeparator: ',',
    decimalSeparator: '.',
  },
  KHR: {
    code: 'KHR',
    symbol: '៛',
    name: 'Cambodian Riel',
    nameLocal: 'រៀល',
    decimals: 0,
    position: 'after',
    thousandSeparator: ',',
    decimalSeparator: '.',
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ADD NEW CURRENCIES HERE:
  // ─────────────────────────────────────────────────────────────────────────────
  // THB: {
  //   code: 'THB',
  //   symbol: '฿',
  //   name: 'Thai Baht',
  //   nameLocal: 'บาท',
  //   decimals: 2,
  //   position: 'before',
  //   thousandSeparator: ',',
  //   decimalSeparator: '.',
  // },
  // CNY: {
  //   code: 'CNY',
  //   symbol: '¥',
  //   name: 'Chinese Yuan',
  //   nameLocal: '人民币',
  //   decimals: 2,
  //   position: 'before',
  //   thousandSeparator: ',',
  //   decimalSeparator: '.',
  // },
  // VND: {
  //   code: 'VND',
  //   symbol: '₫',
  //   name: 'Vietnamese Dong',
  //   nameLocal: 'đồng',
  //   decimals: 0,
  //   position: 'after',
  //   thousandSeparator: '.',
  //   decimalSeparator: ',',
  // },
  // JPY: {
  //   code: 'JPY',
  //   symbol: '¥',
  //   name: 'Japanese Yen',
  //   nameLocal: '円',
  //   decimals: 0,
  //   position: 'before',
  //   thousandSeparator: ',',
  //   decimalSeparator: '.',
  // },
  // EUR: {
  //   code: 'EUR',
  //   symbol: '€',
  //   name: 'Euro',
  //   nameLocal: 'Euro',
  //   decimals: 2,
  //   position: 'before',
  //   thousandSeparator: ' ',
  //   decimalSeparator: ',',
  // },
} as const satisfies Record<string, CurrencyConfig>;

export type SupportedCurrency = keyof typeof currencies;
export const supportedCurrencies = Object.keys(
  currencies
) as SupportedCurrency[];
export const defaultCurrency: SupportedCurrency = 'USD';

// =============================================================================
// EXCHANGE RATES (Base: USD)
// In production, these should come from an API or database
// =============================================================================

export const exchangeRates: Record<SupportedCurrency, number> = {
  USD: 1,
  KHR: 4100,
  // THB: 35,
  // CNY: 7.2,
  // VND: 24500,
  // JPY: 150,
  // EUR: 0.92,
};
