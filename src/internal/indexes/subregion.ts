import type { CountryCode, Subregion } from "../../types";
import { createCountryCodeIndex } from "./create";

let countriesBySubregion: ReadonlyMap<Subregion, readonly CountryCode[]> | undefined;

function getCountriesBySubregionIndex(): ReadonlyMap<
  Subregion,
  readonly CountryCode[]
> {
  if (countriesBySubregion === undefined) {
    countriesBySubregion = createCountryCodeIndex((country) => [country.subregion]);
  }

  return countriesBySubregion;
}

/**
 * Returns country codes in a UN subregion.
 *
 * @param subregion - A canonical UN subregion.
 * @returns Frozen country codes, or `undefined` when the subregion has no countries.
 */
export function getCountriesBySubregion(
  subregion: Subregion,
): readonly CountryCode[] | undefined {
  return getCountriesBySubregionIndex().get(subregion);
}
