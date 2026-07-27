import { describe, expect, it } from "vitest";
import { getCountriesByLanguage, getLanguage } from "../src";

describe("language API", () => {
  it("looks up languages by ISO code case-insensitively", () => {
    expect(getLanguage("EN")?.name).toBe("English");
    expect(getLanguage("hi")?.nativeName).toBe("भारत");
    expect(Object.isFrozen(getLanguage("hi"))).toBe(true);
  });

  it("looks up languages by English and native names", () => {
    expect(getLanguage("French")?.code).toBe("fr");
    expect(getLanguage("日本")?.code).toBe("ja");
  });

  it("normalizes whitespace and case in language identifiers", () => {
    expect(getLanguage("  HINDI  ")?.code).toBe("hi");
  });

  it("returns undefined for invalid language identifiers", () => {
    expect(getLanguage("")).toBeUndefined();
    expect(getLanguage("   ")).toBeUndefined();
    expect(getLanguage("Klingon")).toBeUndefined();
  });

  it("uses the language index to return matching countries", () => {
    const countriesUsingEnglish = getCountriesByLanguage("EN");

    expect(getCountriesByLanguage("Hindi").map((country) => country.code)).toContain(
      "IN",
    );
    expect(countriesUsingEnglish.map((country) => country.code)).toContain("IN");
    expect(countriesUsingEnglish.map((country) => country.code)).toContain("US");
    expect(countriesUsingEnglish).toBe(getCountriesByLanguage("English"));
  });

  it("returns matching countries for languages used by a country", () => {
    expect(getCountriesByLanguage("Japanese").map((country) => country.code)).toContain(
      "JP",
    );
    expect(Object.isFrozen(getCountriesByLanguage("unknown"))).toBe(true);
  });

  it("returns the same frozen empty result for repeated unresolved identifiers", () => {
    expect(getCountriesByLanguage("unknown")).toBe(
      getCountriesByLanguage("unknown"),
    );
  });
});
