import type { CountryCode, CurrencyCode } from "../../types";
import { createCountryCodeIndex } from "./create";

let countriesByCurrency: ReadonlyMap<CurrencyCode, readonly CountryCode[]> | undefined;

function getCountriesByCurrencyIndex(): ReadonlyMap<
  CurrencyCode,
  readonly CountryCode[]
> {
  if (countriesByCurrency === undefined) {
    countriesByCurrency = createCountryCodeIndex((country) => country.currencies);
  }

  return countriesByCurrency;
}

/**
 * Returns country codes that use a canonical currency code.
 *
 * @param code - A canonical ISO 4217 currency code.
 * @returns Frozen country codes, or `undefined` when no country uses the currency.
 */
export function getCountriesByCurrency(
  code: CurrencyCode,
): readonly CountryCode[] | undefined {
  return getCountriesByCurrencyIndex().get(code);
}
