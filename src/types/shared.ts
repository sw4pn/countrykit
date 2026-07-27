/**
 * ISO 3166-1 alpha-2 country code.
 *
 * Example: "IN", "US", "JP"
 */
export type CountryCode = string;

/**
 * ISO 3166-1 alpha-3 country code.
 *
 * Example: "IND", "USA", "JPN"
 */
export type CountryCode3 = string;

/**
 * ISO 3166-1 alpha-3 country code.
 *
 * Example: "IND", "USA", "JPN"
 */
export type NumericCode = string;

/**
 * ISO 4217 currency code.
 *
 * Example: "INR", "USD", "EUR"
 */
export type CurrencyCode = string;

/**
 * ISO 639-1 language code.
 *
 * Example: "en", "hi", "fr"
 */
export type LanguageCode = string;

/**
 * Country capital name
 *
 * Example: "New Delhi"
 */
export type CapitalName = string;

/**
 * Localized country name.
 */
export type LocalizedName = string;

/**
 * Emoji flag.
 */
export type FlagEmoji = string;

export interface FlagOptions {
  type?: "emoji" | "svg" | "png";
}

export type Region =
  "Africa" | "Americas" | "Antarctic" | "Asia" | "Europe" | "Oceania";

export type Subregion =
  | ""
  | "Northern Africa"
  | "Sub-Saharan Africa"
  | "Eastern Africa"
  | "Middle Africa"
  | "Western Africa"
  | "Southern Africa"
  | "North America"
  | "Caribbean"
  | "Central America"
  | "South America"
  | "Central Asia"
  | "Eastern Asia"
  | "South-Eastern Asia"
  | "Southern Asia"
  | "Western Asia"
  | "Eastern Europe"
  | "Northern Europe"
  | "Southern Europe"
  | "Western Europe"
  | "Central Europe"
  | "Southeast Europe"
  | "Australia and New Zealand"
  | "Melanesia"
  | "Micronesia"
  | "Polynesia";
