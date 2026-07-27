import { describe, expect, it } from "vitest";
import {
  countries,
  currencies,
  isCountryCode,
  isCurrencyCode,
  isLanguageCode,
  languages,
  translations,
} from "../src";

describe("validation API", () => {
  it("validates country codes case-insensitively without accepting country names", () => {
    expect(isCountryCode("IN")).toBe(true);
    expect(isCountryCode("in")).toBe(true);
    expect(isCountryCode("IND")).toBe(false);
    expect(isCountryCode("India")).toBe(false);
  });

  it("validates currency codes case-insensitively without accepting names", () => {
    expect(isCurrencyCode("USD")).toBe(true);
    expect(isCurrencyCode("usd")).toBe(true);
    expect(isCurrencyCode("United States Dollar")).toBe(false);
  });

  it("validates language codes case-insensitively without accepting names", () => {
    expect(isLanguageCode("EN")).toBe(true);
    expect(isLanguageCode("en")).toBe(true);
    expect(isLanguageCode("English")).toBe(false);
  });

  it("rejects empty, whitespace-only, and unknown code values", () => {
    for (const value of ["", "   ", "XX"]) {
      expect(isCountryCode(value)).toBe(false);
      expect(isCurrencyCode(value)).toBe(false);
      expect(isLanguageCode(value)).toBe(false);
    }
  });
});

describe("datasets", () => {
  it("exposes frozen dataset containers", () => {
    expect(Object.isFrozen(countries)).toBe(true);
    expect(Object.isFrozen(currencies)).toBe(true);
    expect(Object.isFrozen(languages)).toBe(true);
    expect(Object.isFrozen(translations)).toBe(true);
  });

  it("deeply freezes exported records and nested arrays", () => {
    expect(Object.isFrozen(countries.IN!)).toBe(true);
    expect(Object.isFrozen(countries.IN!.currencies)).toBe(true);
    expect(Object.isFrozen(countries.IN!.languages)).toBe(true);
    expect(Object.isFrozen(countries.IN!.tlds)).toBe(true);
    expect(Object.isFrozen(currencies.USD!)).toBe(true);
    expect(Object.isFrozen(languages.en!)).toBe(true);
    expect(Object.isFrozen(translations.IN!)).toBe(true);
  });

  it("does not allow dataset records to be replaced", () => {
    expect(() => {
      (countries as Record<string, unknown>).IN = {};
    }).toThrow(TypeError);
    expect(() => {
      (currencies as Record<string, unknown>).USD = {};
    }).toThrow(TypeError);
    expect(() => {
      (languages as Record<string, unknown>).en = {};
    }).toThrow(TypeError);
  });
});
