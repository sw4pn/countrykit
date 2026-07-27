import type { CountryCode } from "../../types";
import { createCountryCodeIndex } from "./create";

let countriesByPhoneCode: ReadonlyMap<string, readonly CountryCode[]> | undefined;

function getCountriesByPhoneCodeIndex(): ReadonlyMap<
  string,
  readonly CountryCode[]
> {
  if (countriesByPhoneCode === undefined) {
    countriesByPhoneCode = createCountryCodeIndex((country) => [country.phoneCode]);
  }

  return countriesByPhoneCode;
}

/**
 * Returns country codes that use a calling code.
 *
 * @param phoneCode - A calling code such as `+91`.
 * @returns Frozen country codes, or `undefined` when no country uses the calling code.
 */
export function getCountriesByPhoneCode(
  phoneCode: string,
): readonly CountryCode[] | undefined {
  return getCountriesByPhoneCodeIndex().get(phoneCode);
}
