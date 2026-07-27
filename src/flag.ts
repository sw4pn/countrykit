import {
  getFlagEmoji,
  getFlagPngUrl,
  getFlagSvgUrl,
} from "./internal/providers/flag";
import { lookupCurrency } from "./internal/lookup/currency";
import { resolveCountryCode } from "./internal/resolver/country";
import { resolveCurrencyCode } from "./internal/resolver/currency";
import type { FlagOptions } from "./types";

/**
 * Returns a country's emoji flag or FlagCDN URL from a supported country identifier.
 *
 * @param countryIdentifier - An alpha-2 code, alpha-3 code, English name, or official name.
 * @param options - Selects the emoji, SVG, or PNG flag representation.
 * @returns The requested flag representation, or `undefined` when no country matches.
 */
export function getFlag(
  countryIdentifier: string,
  options?: FlagOptions,
): string | undefined {
  const countryCode = resolveCountryCode(countryIdentifier);

  if (countryCode === undefined) {
    return undefined;
  }

  switch (options?.type) {
    case "svg":
      return getFlagSvgUrl(countryCode);
    case "png":
      return getFlagPngUrl(countryCode);
    case "emoji":
    default:
      return getFlagEmoji(countryCode);
  }
}

/**
 * Returns a primary country's flag for a currency identifier.
 *
 * @param currencyIdentifier - An ISO 4217 code or English currency name.
 * @param options - Selects the emoji, SVG, or PNG flag representation.
 * @returns The requested flag representation, or `undefined` when no currency matches.
 */
export function getFlagByCurrency(
  currencyIdentifier: string,
  options?: FlagOptions,
): string | undefined {
  const currencyCode = resolveCurrencyCode(currencyIdentifier);

  if (currencyCode === undefined) {
    return undefined;
  }

  const primaryCountry = lookupCurrency(currencyCode)?.primaryCountry;

  return primaryCountry === undefined ? undefined : getFlag(primaryCountry, options);
}
