import { languages } from "../../data/languages";
import type { LanguageCode } from "../../types";
import { normalizeIdentifier } from "../normalize";

let languageCodesByIdentifier: ReadonlyMap<string, LanguageCode> | undefined;

function getLanguageCodesByIdentifier(): ReadonlyMap<string, LanguageCode> {
  if (languageCodesByIdentifier !== undefined) {
    return languageCodesByIdentifier;
  }

  const index = new Map<string, LanguageCode>();

  for (const language of Object.values(languages)) {
    if (!language) {
      continue;
    }
    index.set(normalizeIdentifier(language.code), language.code);
    index.set(normalizeIdentifier(language.name), language.code);
    index.set(normalizeIdentifier(language.nativeName), language.code);
  }

  languageCodesByIdentifier = index;
  return index;
}

/**
 * Resolves an ISO language code from a code, English name, or native name.
 *
 * @param identifier - An ISO language code, English name, or native name.
 * @returns The canonical language code, or `undefined` when no language matches.
 */
export function resolveLanguageCode(
  identifier: string,
): LanguageCode | undefined {
  return getLanguageCodesByIdentifier().get(normalizeIdentifier(identifier));
}
