import type { LanguageCode } from "./shared";

export interface Language {
  /**
   * ISO 639-1 code.
   */
  readonly code: LanguageCode;

  /**
   * English name.
   */
  readonly name: string;

  /**
   * Native name.
   */
  readonly nativeName: string;
}

export type LanguageRecord = Language;
