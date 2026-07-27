import type { CountryCode3, CurrencyCode } from "./shared";

export interface Currency {
  /**
   * ISO 4217 code.
   */
  readonly code: CurrencyCode;

  /**
   * ISO 3166-1 alpha-3 code of the currency's primary associated country.
   */
  readonly primaryCountry: CountryCode3;

  /**
   * English currency name.
   */
  readonly name: string;

  /**
   * Symbol.
   *
   * Example:
   * $
   * ₹
   * €
   */
  readonly symbol: string;
}

export type CurrencyRecord = Currency;
