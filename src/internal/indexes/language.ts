import type { CountryCode, LanguageCode } from "../../types";
import { createCountryCodeIndex } from "./create";

let countriesByLanguage: ReadonlyMap<LanguageCode, readonly CountryCode[]> | undefined;

function getCountriesByLanguageIndex(): ReadonlyMap<
  LanguageCode,
  readonly CountryCode[]
> {
  if (countriesByLanguage === undefined) {
    countriesByLanguage = createCountryCodeIndex((country) => country.languages);
  }

  return countriesByLanguage;
}

/**
 * Returns country codes that use a canonical language code.
 *
 * @param code - A canonical ISO 639-1 language code.
 * @returns Frozen country codes, or `undefined` when no country uses the language.
 */
export function getCountriesByLanguage(
  code: LanguageCode,
): readonly CountryCode[] | undefined {
  return getCountriesByLanguageIndex().get(code);
}
