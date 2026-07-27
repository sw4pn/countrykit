import { currencies } from "../../data/currencies";
import type { CurrencyCode } from "../../types";
import { normalizeIdentifier } from "../normalize";

let currencyCodesByIdentifier: ReadonlyMap<string, CurrencyCode> | undefined;

function getCurrencyCodesByIdentifier(): ReadonlyMap<string, CurrencyCode> {
  if (currencyCodesByIdentifier !== undefined) {
    return currencyCodesByIdentifier;
  }

  const index = new Map<string, CurrencyCode>();

  for (const currency of Object.values(currencies)) {
    if (!currency) {
      continue;
    }
    index.set(normalizeIdentifier(currency.code), currency.code);
    index.set(normalizeIdentifier(currency.name), currency.code);
  }

  currencyCodesByIdentifier = index;
  return index;
}

/**
 * Resolves an ISO currency code from a code or English currency name.
 *
 * @param identifier - An ISO currency code or English currency name.
 * @returns The canonical currency code, or `undefined` when no currency matches.
 */
export function resolveCurrencyCode(
  identifier: string,
): CurrencyCode | undefined {
  return getCurrencyCodesByIdentifier().get(normalizeIdentifier(identifier));
}
