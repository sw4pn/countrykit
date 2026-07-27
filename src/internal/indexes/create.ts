import { countries } from "../../data/countries";
import type { CountryCode, CountryRecord } from "../../types";

/**
 * Builds an immutable reverse index from a country property to country codes.
 *
 * @param getKeys - Selects the key or keys to index for each country.
 * @returns A reverse index with frozen country-code arrays.
 */
export function createCountryCodeIndex<Key extends string>(
  getKeys: (country: CountryRecord) => readonly Key[],
): ReadonlyMap<Key, readonly CountryCode[]> {
  const groups = new Map<Key, CountryCode[]>();

  for (const country of Object.values(countries)) {
    if (country == null) continue;
    for (const key of getKeys(country)) {
      const countryCodes = groups.get(key);

      if (countryCodes === undefined) {
        groups.set(key, [country.code]);
      } else {
        countryCodes.push(country.code);
      }
    }
  }

  return new Map(
    [...groups].map(([key, countryCodes]) => [
      key,
      Object.freeze(countryCodes),
    ]),
  );
}
