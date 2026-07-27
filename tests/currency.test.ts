import { describe, expect, it } from "vitest";
import { getCountriesByCurrency, getCurrency } from "../src";

describe("currency API", () => {
  it("looks up currencies by ISO code case-insensitively", () => {
    expect(getCurrency("INR")?.name).toBe("Indian rupee");
    expect(getCurrency("INR")?.primaryCountry).toBe("IND");
    expect(getCurrency("usd")?.symbol).toBe("$");
    expect(getCurrency("usd")?.primaryCountry).toBe("USA");
    expect(Object.isFrozen(getCurrency("usd"))).toBe(true);
  });

  it("looks up currencies by English name", () => {
    expect(getCurrency("united states dollar")?.code).toBe("USD");
  });

  it("normalizes whitespace in currency identifiers", () => {
    expect(getCurrency("  Indian   rupee ")?.code).toBe("INR");
  });

  it("returns undefined for invalid currency identifiers", () => {
    expect(getCurrency("")).toBeUndefined();
    expect(getCurrency("   ")).toBeUndefined();
    expect(getCurrency("Bitcoin")).toBeUndefined();
  });

  it("uses the currency index to return matching countries", () => {
    const countriesUsingInr = getCountriesByCurrency("INR");

    expect(countriesUsingInr.map((country) => country.code)).toContain("IN");
    expect(countriesUsingInr).toBe(getCountriesByCurrency("INR"));
    expect(
      getCountriesByCurrency("United States Dollar").map(
        (country) => country.code,
      ),
    ).toContain("US");
  });

  it("returns an empty frozen array for unknown currencies", () => {
    expect(getCountriesByCurrency("unknown")).toEqual([]);
    expect(Object.isFrozen(getCountriesByCurrency("unknown"))).toBe(true);
  });

  it("returns the same frozen empty result for repeated unresolved identifiers", () => {
    expect(getCountriesByCurrency("unknown")).toBe(
      getCountriesByCurrency("unknown"),
    );
  });
});
