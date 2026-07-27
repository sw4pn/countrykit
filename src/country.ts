import { countries } from "./data/countries";
import { lookupCountry } from "./internal/lookup/country";
import { resolveCountryCode } from "./internal/resolver/country";
import type { Country } from "./types";

let countryList: readonly Country[] | undefined;
let searchableCountries:
  | readonly { country: Country; name: string; officialName: string }[]
  | undefined;
const EMPTY_COUNTRIES: readonly Country[] = Object.freeze([]);

/**
 * Returns a country by alpha-2 code, alpha-3 code, English name, or official name.
 *
 * @param identifier - A supported country identifier.
 * @returns An immutable country record, or `undefined` when no country matches.
 */
export function getCountry(identifier: string): Country | undefined {
  const code = resolveCountryCode(identifier);

  return code === undefined ? undefined : lookupCountry(code);
}

/**
 * Returns all countries as immutable records in dataset order.
 *
 * @returns A cached, frozen array of immutable country records.
 */
export function getCountries(): readonly Country[] {
  if (!countryList) {
    countryList = Object.freeze(
      Object.values(countries).filter(
        (country): country is Country => country !== undefined,
      ),
    );
  }

  return countryList;
}

function getSearchableCountries(): readonly {
  country: Country;
  name: string;
  officialName: string;
}[] {
  searchableCountries ??= getCountries().map((country) => ({
    country,
    name: country.name.toLowerCase(),
    officialName: country.officialName.toLowerCase(),
  }));

  return searchableCountries;
}

/**
 * Searches countries by a case-insensitive substring of their English or official name.
 *
 * @param query - The substring to search for.
 * @returns Frozen immutable country records in dataset order.
 */
export function searchCountries(query: string): readonly Country[] {
  const normalizedQuery = query.toLowerCase();
  const matches: Country[] = [];

  for (const searchableCountry of getSearchableCountries()) {
    if (
      searchableCountry.name.includes(normalizedQuery) ||
      searchableCountry.officialName.includes(normalizedQuery)
    ) {
      matches.push(searchableCountry.country);
    }
  }

  return matches.length === 0 ? EMPTY_COUNTRIES : Object.freeze(matches);
}
