import { languages } from "../../data/languages";
import type { LanguageCode, LanguageRecord } from "../../types";

/**
 * Returns the language record for a canonical ISO language code.
 *
 * @param code - A canonical ISO 639-1 code.
 * @returns The language record, or `undefined` when the code is unknown.
 */
export function lookupLanguage(code: LanguageCode): LanguageRecord | undefined {
  return languages[code];
}
