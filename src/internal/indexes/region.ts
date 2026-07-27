import type { CountryCode, Region } from "../../types";
import { createCountryCodeIndex } from "./create";

let countriesByRegion: ReadonlyMap<Region, readonly CountryCode[]> | undefined;

function getCountriesByRegionIndex(): ReadonlyMap<
  Region,
  readonly CountryCode[]
> {
  if (countriesByRegion === undefined) {
    countriesByRegion = createCountryCodeIndex((country) => [country.region]);
  }

  return countriesByRegion;
}

/**
 * Returns country codes in a UN region.
 *
 * @param region - A canonical UN region.
 * @returns Frozen country codes, or `undefined` when the region has no countries.
 */
export function getCountriesByRegion(
  region: Region,
): readonly CountryCode[] | undefined {
  return getCountriesByRegionIndex().get(region);
}
