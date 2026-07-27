import { getCountry } from "./country";
import { getCountriesByCurrency as getCountryCodesByCurrency } from "./internal/indexes/currency";
import { lookupCurrency } from "./internal/lookup/currency";
import { resolveCurrencyCode } from "./internal/resolver/currency";
import type { Country, Currency, CurrencyCode } from "./types";

let countryResultsByCurrency: Map<CurrencyCode, readonly Country[]> | undefined;
const EMPTY_COUNTRIES: readonly Country[] = Object.freeze([]);

/**
 * Returns a currency by ISO code or English name.
 *
 * @param identifier - An ISO 4217 code or English currency name.
 * @returns An immutable currency record, or `undefined` when no currency matches.
 */
export function getCurrency(identifier: string): Currency | undefined {
  const code = resolveCurrencyCode(identifier);

  return code === undefined ? undefined : lookupCurrency(code);
}

/**
 * Returns countries that use a currency identified by code or English name.
 *
 * @param identifier - An ISO 4217 code or English currency name.
 * @returns Frozen immutable country records, or an empty frozen array when unmatched.
 */
export function getCountriesByCurrency(identifier: string): readonly Country[] {
  const code = resolveCurrencyCode(identifier);

  if (code === undefined) {
    return EMPTY_COUNTRIES;
  }

  const cachedCountries = countryResultsByCurrency?.get(code);

  if (cachedCountries !== undefined) {
    return cachedCountries;
  }

  const countryCodes = getCountryCodesByCurrency(code);

  if (countryCodes === undefined) {
    const results = countryResultsByCurrency ?? new Map();

    countryResultsByCurrency = results;
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
  const results = countryResultsByCurrency ?? new Map();

  countryResultsByCurrency = results;
  results.set(code, countries);
  return countries;
}
