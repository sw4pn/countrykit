import { describe, expect, it } from "vitest";
import { getCountries, getCountry, searchCountries } from "../src";

describe("country API", () => {
  it("looks up countries by alpha-2 and alpha-3 codes", () => {
    expect(getCountry("IN")?.name).toBe("India");
    expect(getCountry("usa")?.code).toBe("US");
  });

  it("looks up countries by English and official names", () => {
    expect(getCountry("India")?.code).toBe("IN");
    expect(getCountry("United States of America")?.code).toBe("US");
  });

  it("normalizes case and surrounding whitespace in identifiers", () => {
    expect(getCountry("  republic   OF india ")?.code).toBe("IN");
  });

  it("returns undefined for empty, whitespace-only, and unknown identifiers", () => {
    expect(getCountry("")).toBeUndefined();
    expect(getCountry("   ")).toBeUndefined();
    expect(getCountry("Atlantis")).toBeUndefined();
  });

  it("returns a cached frozen country list", () => {
    const firstResult = getCountries();

    expect(firstResult).toBe(getCountries());
    expect(firstResult.map((country) => country.code)).toContain("IN");
    expect(firstResult.map((country) => country.code)).toContain("US");
    expect(Object.isFrozen(firstResult)).toBe(true);
    expect(Object.isFrozen(firstResult[0])).toBe(true);
    expect(Object.isFrozen(firstResult[0]?.currencies)).toBe(true);
    expect(Object.isFrozen(firstResult[0]?.languages)).toBe(true);
    expect(Object.isFrozen(firstResult[0]?.tlds)).toBe(true);
  });

  it("returns immutable country records", () => {
    const country = getCountry("IN");

    expect(Object.isFrozen(country)).toBe(true);
    expect(() => {
      (country as { name: string }).name = "Changed";
    }).toThrow(TypeError);
  });

  it("searches English and official names using case-insensitive substrings", () => {
    expect(searchCountries("IND").map((country) => country.code)).toContain("IN");
    expect(searchCountries("america").map((country) => country.code)).toContain(
      "US",
    );
    expect(searchCountries("republic").map((country) => country.code)).toContain(
      "IN",
    );
  });

  it("returns deterministic frozen search results for edge cases", () => {
    expect(searchCountries("unknown")).toEqual([]);
    expect(searchCountries("unknown")).toBe(searchCountries("unknown"));
    expect(searchCountries("")).toHaveLength(getCountries().length);
    expect(Object.isFrozen(searchCountries("india"))).toBe(true);
  });
});
