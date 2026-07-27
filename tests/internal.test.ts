import { describe, expect, it, vi } from "vitest";
import { lookupCountry } from "../src/internal/lookup/country";
import { lookupCurrency } from "../src/internal/lookup/currency";
import { lookupLanguage } from "../src/internal/lookup/language";
import { normalizeIdentifier } from "../src/internal/normalize";
import {
  getFlagEmoji,
  getFlagPngUrl,
  getFlagSvgUrl,
} from "../src/internal/providers/flag";
import { resolveCountryCode } from "../src/internal/resolver/country";
import { resolveCurrencyCode } from "../src/internal/resolver/currency";
import { resolveLanguageCode } from "../src/internal/resolver/language";

describe("identifier normalization", () => {
  it("trims, lowercases, and collapses duplicate whitespace", () => {
    expect(normalizeIdentifier("  Republic   OF\tIndia  ")).toBe(
      "republic of india",
    );
  });
});

describe("internal resolvers", () => {
  it("resolves country codes from every supported identifier case-insensitively", () => {
    expect(resolveCountryCode("in")).toBe("IN");
    expect(resolveCountryCode(" IND ")).toBe("IN");
    expect(resolveCountryCode("  republic   of INDIA ")).toBe("IN");
  });

  it("resolves currency codes from codes and names with normalized whitespace", () => {
    expect(resolveCurrencyCode("usd")).toBe("USD");
    expect(resolveCurrencyCode("  United   States Dollar ")).toBe("USD");
  });

  it("resolves language codes from codes, English names, and native names", () => {
    expect(resolveLanguageCode("EN")).toBe("en");
    expect(resolveLanguageCode("  french ")).toBe("fr");
    expect(resolveLanguageCode("Terres australes et antarctiques françaises")).toBe(
      "fr",
    );
  });

  it("returns undefined for empty, whitespace-only, and unknown identifiers", () => {
    for (const identifier of ["", "   ", "unknown"]) {
      expect(resolveCountryCode(identifier)).toBeUndefined();
      expect(resolveCurrencyCode(identifier)).toBeUndefined();
      expect(resolveLanguageCode(identifier)).toBeUndefined();
    }
  });
});

describe("internal lookups", () => {
  it("returns records only for canonical dataset codes", () => {
    expect(lookupCountry("IN")?.name).toBe("India");
    expect(lookupCurrency("USD")?.name).toBe("United States dollar");
    expect(lookupLanguage("en")?.name).toBe("English");
    expect(lookupCountry("in")).toBeUndefined();
    expect(lookupCurrency("unknown")).toBeUndefined();
    expect(lookupLanguage("unknown")).toBeUndefined();
  });
});

describe("internal indexes", () => {
  it("initializes the currency index lazily and reuses frozen result arrays", async () => {
    vi.resetModules();
    const { getCountriesByCurrency } = await import(
      "../src/internal/indexes/currency"
    );

    const firstResult = getCountriesByCurrency("USD");
    const secondResult = getCountriesByCurrency("USD");

    expect(firstResult).toContain("US");
    expect(secondResult).toBe(firstResult);
    expect(Object.isFrozen(firstResult)).toBe(true);
  });

  it("initializes the language index lazily and reuses frozen result arrays", async () => {
    vi.resetModules();
    const { getCountriesByLanguage } = await import(
      "../src/internal/indexes/language"
    );

    const firstResult = getCountriesByLanguage("en");
    const secondResult = getCountriesByLanguage("en");

    expect(firstResult).toContain("IN");
    expect(firstResult).toContain("US");
    expect(secondResult).toBe(firstResult);
    expect(Object.isFrozen(firstResult)).toBe(true);
  });

  it("indexes countries by phone code, region, and subregion", async () => {
    vi.resetModules();
    const [{ getCountriesByPhoneCode }, { getCountriesByRegion }, { getCountriesBySubregion }] =
      await Promise.all([
        import("../src/internal/indexes/phone"),
        import("../src/internal/indexes/region"),
        import("../src/internal/indexes/subregion"),
      ]);

    expect(getCountriesByPhoneCode("+91")).toEqual(["IN"]);
    expect(getCountriesByRegion("Americas")).toContain("US");
    expect(getCountriesBySubregion("Southern Asia")).toContain("IN");
    expect(getCountriesByPhoneCode("+999")).toBeUndefined();
  });
});

describe("internal flag provider", () => {
  it("returns emoji flags only for known canonical country codes", () => {
    expect(getFlagEmoji("IN")).toBe("🇮🇳");
    expect(getFlagEmoji("unknown")).toBeUndefined();
  });

  it("generates SVG and PNG FlagCDN URLs from canonical country codes", () => {
    expect(getFlagSvgUrl("US")).toBe("https://flagcdn.com/us.svg");
    expect(getFlagPngUrl("IN")).toBe("https://flagcdn.com/w320/in.png");
  });
});
