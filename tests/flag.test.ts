import { describe, expect, it } from "vitest";
import { getFlag, getFlagByCurrency } from "../src";

describe("flag API", () => {
  it("returns emoji flags by default", () => {
    expect(getFlag("IN")).toBe("🇮🇳");
    expect(getFlag("India")).toBe("🇮🇳");
    expect(getFlag("IN", undefined)).toBe("🇮🇳");
  });

  it("supports alpha-3 codes and case-insensitive identifiers", () => {
    expect(getFlag("ind")).toBe("🇮🇳");
    expect(getFlag("united states of america")).toBe("🇺🇸");
  });

  it("returns deterministic SVG and PNG FlagCDN URLs", () => {
    expect(getFlag("IN", { type: "svg" })).toBe("https://flagcdn.com/in.svg");
    expect(getFlag("IND", { type: "png" })).toBe(
      "https://flagcdn.com/w320/in.png",
    );
  });

  it("returns undefined for empty, whitespace-only, and unknown identifiers", () => {
    expect(getFlag("")).toBeUndefined();
    expect(getFlag("  ")).toBeUndefined();
    expect(getFlag("Atlantis", { type: "svg" })).toBeUndefined();
  });

  it("returns a primary country's flag for currency codes and names", () => {
    expect(getFlagByCurrency("INR")).toBe("🇮🇳");
    expect(getFlagByCurrency("united states dollar", { type: "svg" })).toBe(
      "https://flagcdn.com/us.svg",
    );
    expect(getFlagByCurrency("unknown")).toBeUndefined();
  });
});
