import type { CountryCode, FlagEmoji } from "../../types";
import { lookupCountry } from "../lookup/country";

const FLAG_CDN_URL = "https://flagcdn.com";
const FLAG_PNG_WIDTH = 320;

/**
 * Returns the flag emoji stored for a canonical country code.
 *
 * @param countryCode - A canonical ISO 3166-1 alpha-2 code.
 * @returns The flag emoji, or `undefined` when the country code is unknown.
 */
export function getFlagEmoji(countryCode: CountryCode): FlagEmoji | undefined {
  return lookupCountry(countryCode)?.flag;
}

/**
 * Creates the FlagCDN SVG URL for a canonical country code.
 *
 * @param countryCode - A canonical ISO 3166-1 alpha-2 code.
 * @returns The corresponding SVG flag URL.
 */
export function getFlagSvgUrl(countryCode: CountryCode): string {
  return `${FLAG_CDN_URL}/${countryCode.toLowerCase()}.svg`;
}

/**
 * Creates the 320-pixel FlagCDN PNG URL for a canonical country code.
 *
 * @param countryCode - A canonical ISO 3166-1 alpha-2 code.
 * @returns The corresponding PNG flag URL.
 */
export function getFlagPngUrl(countryCode: CountryCode): string {
  return `${FLAG_CDN_URL}/w${FLAG_PNG_WIDTH}/${countryCode.toLowerCase()}.png`;
}
