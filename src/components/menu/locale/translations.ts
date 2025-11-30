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
  search: 'Search',
  searchPlaceholder: 'Search dishes...',
  filter: 'Filter',
  all: 'All',
  allDishes: 'All Dishes',

  // Categories
  categories: 'Categories',

  // Item Details
  aboutThisDish: 'About this dish',
  dietaryInformation: 'Dietary Information',
  prepTime: 'min',
  rating: 'Rating',

  // Badges
  vegan: 'Vegan',
  vegetarian: 'Vegetarian',
  spicy: 'Spicy',
  glutenFree: 'Gluten Free',
  new: 'New',
  bestSeller: 'Popular',
  chefSpecial: "Chef's Pick",
  seasonal: 'Seasonal',

  // Restaurant Info
  restaurantInfo: 'Restaurant Info',
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

  // Currency & Language
  currency: 'Currency',
  language: 'Language',

  // Empty states
  noResults: 'No dishes found',
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
    search: 'ស្វែងរក',
    searchPlaceholder: 'ស្វែងរកមុខម្ហូប...',
    filter: 'តម្រង',
    all: 'ទាំងអស់',
    allDishes: 'មុខម្ហូបទាំងអស់',

    // Categories
    categories: 'ប្រភេទ',

    // Item Details
    aboutThisDish: 'អំពីមុខម្ហូបនេះ',
    dietaryInformation: 'ព័ត៌មានអាហារូបត្ថម្ភ',
    prepTime: 'នាទី',
    rating: 'ការវាយតម្លៃ',

    // Badges
    vegan: 'វីហ្គេន',
    vegetarian: 'បន្លែ',
    spicy: 'ហឹរ',
    glutenFree: 'គ្មានស្រួយ',
    new: 'ថ្មី',
    bestSeller: 'ពេញនិយម',
    chefSpecial: 'ជម្រើសចុងភៅ',
    seasonal: 'រដូវកាល',

    // Restaurant Info
    restaurantInfo: 'ព័ត៌មានភោជនីយដ្ឋាន',
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

    // Currency & Language
    currency: 'រូបិយប័ណ្ណ',
    language: 'ភាសា',

    // Empty states
    noResults: 'រកមិនឃើញមុខម្ហូប',
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
