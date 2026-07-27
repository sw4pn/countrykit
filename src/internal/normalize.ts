/**
 * Normalizes a human-readable identifier for case-insensitive matching.
 *
 * @param identifier - The identifier to normalize.
 * @returns The trimmed, lowercase identifier with internal whitespace collapsed.
 */
export function normalizeIdentifier(identifier: string): string {
  return identifier.trim().toLowerCase().replace(/\s+/g, " ");
}
