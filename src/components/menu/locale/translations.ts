/**
 * UI String Translations
 *
 * TO ADD TRANSLATIONS FOR A NEW LANGUAGE:
 * 1. Add a new key to the `uiTranslations` object matching the locale code
 * 2. Copy all keys from 'en' and translate them
 *
 * The type system will ensure all translations are complete.
 */

import type { SupportedLocale } from './i18n.config';

// Define all translation keys based on English (source of truth)
const englishTranslations = {
  // Navigation
  menu: 'Menu',
  catalog: 'Catalog',
  search: 'Search',
  searchPlaceholder: 'Search items...',
  filter: 'Filter',
  all: 'All',
  allItems: 'All Items',
  allDishes: 'All Items', // Legacy - kept for backward compatibility

  // Categories
  categories: 'Categories',

  // Item Details
  aboutThisItem: 'About this item',
  aboutThisDish: 'About this item', // Legacy - kept for backward compatibility
  information: 'Information',
  dietaryInformation: 'Tags', // Legacy - kept for backward compatibility
  prepTime: 'min',
  duration: 'Duration',

  // Badges
  vegan: 'Vegan',
  vegetarian: 'Vegetarian',
  spicy: 'Spicy',
  glutenFree: 'Gluten Free',
  new: 'New',
  bestSeller: 'Popular',
  chefSpecial: 'Featured',
  seasonal: 'Seasonal',

  // Business Info
  businessInfo: 'Business Info',
  restaurantInfo: 'Business Info', // Legacy - kept for backward compatibility
  openingHours: 'Opening Hours',
  location: 'Location',
  contact: 'Contact',
  today: 'Today',
  closed: 'Closed',

  // Days of week
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',

  // Actions
  close: 'Close',
  seeAll: 'See All',
  share: 'Share',
  shareItem: 'Share this item',
  copyLink: 'Copy Link',
  linkCopied: 'Link copied!',
  shareVia: 'Share via',
  askAboutItem: 'Ask about this item',

  // Currency & Language
  currency: 'Currency',
  language: 'Language',

  // Empty states
  noResults: 'No items found',
  noResultsDescription: 'Try adjusting your search or filter',
} as const;

// Type for translation keys
export type TranslationKey = keyof typeof englishTranslations;

// Type that ensures all locales have all keys
type Translations = {
  [K in SupportedLocale]: {
    [T in TranslationKey]: string;
  };
};

// =============================================================================
// UI TRANSLATIONS
// Add new language translations here
// =============================================================================

export const uiTranslations: Translations = {
  en: englishTranslations,

  km: {
    // Navigation
    menu: 'មុខម្ហូប',
    catalog: 'កាតាឡុក',
    search: 'ស្វែងរក',
    searchPlaceholder: 'ស្វែងរកម៉ឺនុយ...',
    filter: 'តម្រង',
    all: 'ទាំងអស់',
    allItems: 'ម៉ឺនុយទាំងអស់',
    allDishes: 'ម៉ឺនុយទាំងអស់', // Legacy

    // Categories
    categories: 'ប្រភេទ',

    // Item Details
    aboutThisItem: 'អំពីម៉ឺនុយនេះ',
    aboutThisDish: 'អំពីម៉ឺនុយនេះ', // Legacy
    information: 'ព័ត៌មាន',
    dietaryInformation: 'ស្លាក', // Legacy
    prepTime: 'នាទី',
    duration: 'រយៈពេល',

    // Badges
    vegan: 'វីហ្គេន',
    vegetarian: 'បន្លែ',
    spicy: 'ហឹរ',
    glutenFree: 'គ្មានស្រួយ',
    new: 'ថ្មី',
    bestSeller: 'ពេញនិយម',
    chefSpecial: 'ពិសេស',
    seasonal: 'រដូវកាល',

    // Business Info
    businessInfo: 'ព័ត៌មានអាជីវកម្ម',
    restaurantInfo: 'ព័ត៌មានអាជីវកម្ម', // Legacy
    openingHours: 'ម៉ោងបើក',
    location: 'ទីតាំង',
    contact: 'ទំនាក់ទំនង',
    today: 'ថ្ងៃនេះ',
    closed: 'បិទ',

    // Days of week
    monday: 'ច័ន្ទ',
    tuesday: 'អង្គារ',
    wednesday: 'ពុធ',
    thursday: 'ព្រហស្បតិ៍',
    friday: 'សុក្រ',
    saturday: 'សៅរ៍',
    sunday: 'អាទិត្យ',

    // Actions
    close: 'បិទ',
    seeAll: 'មើលទាំងអស់',
    share: 'ចែករំលែក',
    shareItem: 'ចែករំលែកម៉ឺនុយនេះ',
    copyLink: 'ចម្លងតំណ',
    linkCopied: 'បានចម្លងតំណ!',
    shareVia: 'ចែករំលែកតាម',
    askAboutItem: 'សួរអំពីម៉ឺនុយនេះ',

    // Currency & Language
    currency: 'រូបិយប័ណ្ណ',
    language: 'ភាសា',

    // Empty states
    noResults: 'រកមិនឃើញវត្ថុ',
    noResultsDescription: 'សូមព្យាយាមកែសម្រួលការស្វែងរក',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ADD NEW LANGUAGE TRANSLATIONS HERE:
  // ─────────────────────────────────────────────────────────────────────────────
  // th: {
  //   menu: 'เมนู',
  //   search: 'ค้นหา',
  //   searchPlaceholder: 'ค้นหาเมนู...',
  //   // ... add all other keys
  // },
};

// Helper to get translation with fallback to English
export function getTranslation(
  locale: SupportedLocale,
  key: TranslationKey
): string {
  return uiTranslations[locale]?.[key] ?? uiTranslations.en[key] ?? key;
}
