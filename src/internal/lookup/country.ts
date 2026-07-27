import { countries } from "../../data/countries";
import type { CountryCode, CountryRecord } from "../../types";

/**
 * Returns the country record for a canonical alpha-2 code.
 *
 * @param code - A canonical ISO 3166-1 alpha-2 code.
 * @returns The country record, or `undefined` when the code is unknown.
 */
export function lookupCountry(code: CountryCode): CountryRecord | undefined {
  return countries[code];
}
