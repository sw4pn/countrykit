import type {
  CapitalName,
  CountryCode,
  CountryCode3,
  CurrencyCode,
  FlagEmoji,
  LanguageCode,
  NumericCode,
  Region,
  Subregion,
} from "./shared";

export interface Country {
  /**
   * ISO 3166-1 alpha-2.
   */
  readonly code: CountryCode;

  /**
   * ISO 3166-1 alpha-3.
   */
  readonly code3: CountryCode3;

  /**
   * ISO 3166 - 1 numeric(or numeric - 3) code
   */
  readonly numeric: NumericCode;

  /**
   * English short name.
   */
  readonly name: string;

  /**
   * Official country name.
   */
  readonly officialName: string;

  /**
   * Emoji flag.
   */
  readonly flag: FlagEmoji;

  /**
   * Official capital names.
   */
  readonly capital: CapitalName[];

  /**
   * ISO 4217 currency codes.
   */
  readonly currencies: readonly CurrencyCode[];

  /**
   * ISO 639-1 language codes.
   */
  readonly languages: readonly LanguageCode[];

  /**
   * Calling code.
   *
   * Example:
   * +91
   */
  readonly phoneCode: string;

  /**
   * Top level domains.
   */
  readonly tlds: readonly string[];

  /**
   * UN region.
   */
  readonly region: Region;

  /**
   * UN subregion.
   */
  readonly subregion: Subregion;

  /**
   * Independent country.
   */
  readonly independent?: boolean;
}

export type CountryRecord = Country;
