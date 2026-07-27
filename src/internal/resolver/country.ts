import type { CountryCode } from "../../types";
import { countries } from "../../data/countries";
import { normalizeIdentifier } from "../normalize";

let countryCodesByIdentifier: ReadonlyMap<string, CountryCode> | undefined;

function getCountryCodesByIdentifier(): ReadonlyMap<string, CountryCode> {
  if (countryCodesByIdentifier !== undefined) {
    return countryCodesByIdentifier;
  }

  const index = new Map<string, CountryCode>();

  for (const country of Object.values(countries)) {
    if (!country) {
      continue;
    }

    index.set(normalizeIdentifier(country.code), country.code);
    if (country.code3 !== undefined) {
      index.set(normalizeIdentifier(country.code3), country.code);
    }
    index.set(normalizeIdentifier(country.name), country.code);
    if (country.officialName !== undefined) {
      index.set(normalizeIdentifier(country.officialName), country.code);
    }
  }

  countryCodesByIdentifier = index;
  return index;
}

/**
 * Resolves an ISO alpha-2 country code from a code or English country name.
 *
 * @param identifier - An alpha-2 code, alpha-3 code, short name, or official name.
 * @returns The canonical alpha-2 code, or `undefined` when no country matches.
 */
export function resolveCountryCode(
  identifier: string,
): CountryCode | undefined {
  return getCountryCodesByIdentifier().get(normalizeIdentifier(identifier));
}
