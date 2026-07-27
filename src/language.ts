import { getCountry } from "./country";
import { getCountriesByLanguage as getCountryCodesByLanguage } from "./internal/indexes/language";
import { lookupLanguage } from "./internal/lookup/language";
import { resolveLanguageCode } from "./internal/resolver/language";
import type { Country, Language, LanguageCode } from "./types";

let countryResultsByLanguage: Map<LanguageCode, readonly Country[]> | undefined;
const EMPTY_COUNTRIES: readonly Country[] = Object.freeze([]);

/**
 * Returns a language by ISO code, English name, or native name.
 *
 * @param identifier - An ISO 639-1 code, English name, or native name.
 * @returns An immutable language record, or `undefined` when no language matches.
 */
export function getLanguage(identifier: string): Language | undefined {
  const code = resolveLanguageCode(identifier);

  return code === undefined ? undefined : lookupLanguage(code);
}

/**
 * Returns countries that use a language identified by code, English name, or native name.
 *
 * @param identifier - An ISO 639-1 code, English name, or native name.
 * @returns Frozen immutable country records, or an empty frozen array when unmatched.
 */
export function getCountriesByLanguage(identifier: string): readonly Country[] {
  const code = resolveLanguageCode(identifier);

  if (code === undefined) {
    return EMPTY_COUNTRIES;
  }

  const cachedCountries = countryResultsByLanguage?.get(code);

  if (cachedCountries !== undefined) {
    return cachedCountries;
  }

  const countryCodes = getCountryCodesByLanguage(code);

  if (countryCodes === undefined) {
    const results = countryResultsByLanguage ?? new Map();

    countryResultsByLanguage = results;
    results.set(code, EMPTY_COUNTRIES);
    return EMPTY_COUNTRIES;
  }

  const matchingCountries: Country[] = [];

  for (const countryCode of countryCodes) {
    const country = getCountry(countryCode);

    if (country !== undefined) {
      matchingCountries.push(country);
    }
  }

  const countries = Object.freeze(matchingCountries);
  const results = countryResultsByLanguage ?? new Map();

  countryResultsByLanguage = results;
  results.set(code, countries);
  return countries;
}
