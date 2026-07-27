import { lookupCountry } from "./internal/lookup/country";
import { lookupCurrency } from "./internal/lookup/currency";
import { lookupLanguage } from "./internal/lookup/language";

/**
 * Determines whether a value is a country code present in the dataset.
 *
 * @param value - A possible ISO 3166-1 alpha-2 country code.
 * @returns `true` when the value is a valid country code, case-insensitively.
 */
export function isCountryCode(value: string): boolean {
  return lookupCountry(value.toUpperCase()) !== undefined;
}

/**
 * Determines whether a value is a currency code present in the dataset.
 *
 * @param value - A possible ISO 4217 currency code.
 * @returns `true` when the value is a valid currency code, case-insensitively.
 */
export function isCurrencyCode(value: string): boolean {
  return lookupCurrency(value.toUpperCase()) !== undefined;
}

/**
 * Determines whether a value is a language code present in the dataset.
 *
 * @param value - A possible ISO 639-1 language code.
 * @returns `true` when the value is a valid language code, case-insensitively.
 */
export function isLanguageCode(value: string): boolean {
  return lookupLanguage(value.toLowerCase()) !== undefined;
}
