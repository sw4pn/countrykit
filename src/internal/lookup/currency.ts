import { currencies } from "../../data/currencies";
import type { CurrencyCode, CurrencyRecord } from "../../types";

/**
 * Returns the currency record for a canonical ISO currency code.
 *
 * @param code - A canonical ISO 4217 code.
 * @returns The currency record, or `undefined` when the code is unknown.
 */
export function lookupCurrency(code: CurrencyCode): CurrencyRecord | undefined {
  return currencies[code];
}
