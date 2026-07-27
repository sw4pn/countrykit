# CountryKit Architecture

## 1. Project Overview

CountryKit is a dependency-free TypeScript library for resolving and presenting country, currency, language, translation, and flag data. It offers a small functional API and exports immutable datasets for direct iteration.

| Principle | Implementation | Why |
| --- | --- | --- |
| Zero runtime dependencies | All data, normalization, indexes, and URL generation are local. | Reduces installation, supply-chain, and runtime complexity. |
| Immutable datasets | Containers, records, and nested country arrays are frozen. | Returned values are safe to share and cache. |
| Functional API | Features are standalone exported functions. | There is no configuration, instance, or lifecycle for ordinary use. |
| Framework agnostic | Neutral ESM build without UI or platform integration. | Works with modern bundlers, Node.js ESM, Bun, and Deno npm compatibility. |
| ESM-first | The package is ESM-only. | Enables static analysis by modern tooling. |
| Tree-shakeable | Static exports and `sideEffects: false`. | Bundlers can remove unused public exports. |
| TypeScript-first | TypeScript source and emitted declarations. | Readonly and sparse-data contracts are visible before runtime. |

The library prefers deterministic behavior: resolver-backed APIs accept a documented set of identifiers; validation APIs accept codes only. Unknown input returns `undefined` or a frozen empty array, never an exception.

## 2. Current Project Status

| Area | Status |
| --- | --- |
| Current version | `1.0.0` |
| Release status | v1.0 production release |
| Implementation | Complete; canonical architecture for v1.x |
| Tests | Vitest suites cover public APIs, datasets, and private layers |
| Coverage | V8 coverage is configured with text and HTML reporters; no percentage is committed as a release claim |
| Benchmarks | Tinybench hot-path suite available through `pnpm bench` |
| Documentation | README is the usage guide; this is the engineering reference |
| Package | ESM with declarations and source maps; Node.js `>=18`; publishes `dist/` only |
| Readiness | Production-ready for its documented API and current dataset scope |

“Production-ready” describes API quality and stability, not a claim that the currently bundled small dataset is a complete global registry.

## 3. Architecture Overview

```text
Public API (country, currency, language, flag, validation)
        |
        +--> Resolvers (human-friendly identifiers -> canonical codes)
        |           |
        +--> Lookup layer (canonical codes -> immutable records)
        |           |
        +--> Lazy indexes (country properties -> country-code lists)
                    |
                 Datasets (data/)
```

The flag path resolves a country code and then calls a provider for an emoji or deterministic URL. Validation bypasses resolvers, normalizing code casing only before lookup.

Dependencies only point downward. Public policy depends on data access, but datasets and lookups never depend on public APIs. This prevents circular behavior, makes private layers testable, and keeps canonical-code access inexpensive.

## 4. Folder Structure

| Path | Responsibility |
| --- | --- |
| `src/` | Public entry point, public APIs, datasets, types, and private implementation |
| `src/index.ts` | Root package entry; re-exports supported functions, datasets, and types |
| `src/country.ts` | Country resolution, cached country list, deterministic search |
| `src/currency.ts` | Currency resolution and countries-by-currency caching |
| `src/language.ts` | Language resolution and countries-by-language caching |
| `src/flag.ts` | Public country-identifier-to-flag facade |
| `src/validation.ts` | Strict code-only validation |
| `src/data/` | Local country, currency, language, and translation data plus runtime freezing |
| `src/internal/` | Normalization, resolvers, lookups, indexes, and providers |
| `src/internal/resolver/` | Lazy identifier maps to canonical codes |
| `src/internal/lookup/` | Direct canonical-code reads |
| `src/internal/indexes/` | Lazy reverse indexes over country properties |
| `src/internal/providers/` | Derived representations, currently flags |
| `src/types/` | Public domain and shared TypeScript declarations |
| `tests/` | Vitest public, immutability, and internal tests |
| `bench/` | Tinybench warmed hot-path benchmark |
| `docs/` | Long-lived technical documentation |
| `tsup.config.ts` | ESM bundle and declaration generation |
| `vitest.config.ts` | Node test environment and V8 coverage configuration |

## 5. Public API

Resolver-backed functions are case-insensitive and trim/collapse whitespace. They do not throw for an unknown identifier.

| Function | Purpose and accepted input | Return | Complexity |
| --- | --- | --- | --- |
| `getCountry(identifier)` | Alpha-2, alpha-3, English, or official country name | `Country \| undefined` | Expected O(1) after resolver initialization |
| `getCountries()` | All countries in dataset order | Cached `readonly Country[]` | O(n) once; O(1) thereafter |
| `searchCountries(query)` | Case-insensitive substring search of English and official names | Frozen `readonly Country[]` | O(n) per query |
| `getCurrency(identifier)` | ISO 4217 code or English currency name | `Currency \| undefined` | Expected O(1) after initialization |
| `getCountriesByCurrency(identifier)` | Currency code/name to countries | Frozen `readonly Country[]` | Index O(n) once; O(k) once per code; O(1) cached |
| `getLanguage(identifier)` | ISO 639-1 code, English, or native name | `Language \| undefined` | Expected O(1) after initialization |
| `getCountriesByLanguage(identifier)` | Language code/name to countries | Frozen `readonly Country[]` | Index O(n) once; O(k) once per code; O(1) cached |
| `getFlag(countryIdentifier, options?)` | Country identifier; `emoji`, `svg`, or `png` | `string \| undefined` | Expected O(1) after resolution |
| `getFlagByCurrency(currencyIdentifier, options?)` | Currency code/name; `emoji`, `svg`, or `png` | `string \| undefined` | Expected O(1) after resolution |
| `isCountryCode(value)` | Alpha-2 dataset code, case-insensitive | `boolean` | O(1) |
| `isCurrencyCode(value)` | ISO 4217 dataset code, case-insensitive | `boolean` | O(1) |
| `isLanguageCode(value)` | ISO 639-1 dataset code, case-insensitive | `boolean` | O(1) |

`n` is the number of countries and `k` is the number of matches. Expected O(1) is object-property and `Map` access.

```ts
import {
  getCountriesByLanguage,
  getCountry,
  getFlag,
  isCountryCode,
  searchCountries,
} from "countrykit";

getCountry(" Republic   of India "); // immutable India record
searchCountries("america"); // readonly list containing United States
getCountriesByLanguage("English"); // readonly list of matching countries
getFlag("IND", { type: "png" }); // https://flagcdn.com/w320/in.png
getFlagByCurrency("INR"); // 🇮🇳
isCountryCode("IN"); // true; names and alpha-3 codes are false
```

`searchCountries()` is not a resolver: there is no fuzzy matching, ranking, tokenization, or arbitrary-query cache. An empty query matches every country; an unmatched query returns the shared frozen empty array.

## 6. Dataset Design

| Dataset | Key | Value |
| --- | --- | --- |
| `countries` | ISO 3166-1 alpha-2 | `CountryRecord` |
| `currencies` | ISO 4217 | `CurrencyRecord`, including its primary associated ISO alpha-3 country code |
| `languages` | ISO 639-1 | `LanguageRecord` |
| `translations` | Country code, then language code | Localized country name |

Datasets are normalized. Countries reference currencies and languages by code instead of embedding repeated objects. This leaves one authoritative record for each currency/language, avoids repeated text, and makes reverse indexes simple to derive. Translations remain separate optional metadata.

At runtime, top-level maps are frozen. Country records and their `currencies`, `languages`, and `tlds` arrays are frozen; currency/language records and translation maps are frozen. Public APIs share these records rather than clone them.

Record maps are typed as `Readonly<Record<Code, RecordType | undefined>>`. This intentional sparse typing reflects that a syntactically valid string code may not exist in the bundled data. Unknown keys return `undefined`, not a placeholder or exception.

## 7. Internal Architecture

| Layer | Responsibility | Boundary |
| --- | --- | --- |
| `normalize` | Canonicalizes human-readable input | Does not know domain records |
| `resolver` | Maps supported aliases to canonical codes | Accepts user input and reads datasets |
| `lookup` | Reads a record by canonical code | Never normalizes or searches |
| `indexes` | Derives country-code groups from country fields | Uses canonical keys; lazy |
| `providers` | Produces a representation from a canonical code | Does not resolve input |

This separation avoids accidental fuzzy behavior. For example, the internal country lookup returns `undefined` for `"in"`; the public API first resolves it to `"IN"`. Validation stays strict by normalizing code casing only rather than accepting aliases.

## 8. Resolver System

`normalizeIdentifier()` trims leading/trailing whitespace, lowercases text, and collapses any whitespace run to one space. Each resolver lazily scans its dataset once, stores normalized aliases in a `Map`, and returns a canonical code thereafter.

| Resolver | Accepted identifiers | Canonical output |
| --- | --- | --- |
| Country | Alpha-2, alpha-3, English short name, official name | Uppercase alpha-2 |
| Currency | ISO 4217 code, English name | Uppercase ISO 4217 |
| Language | ISO 639-1 code, English name, native name | Lowercase ISO 639-1 |

Initial map construction is O(m), for records and aliases; later resolution is expected O(1). Canonical output lets downstream layers use one representation. If future data contains duplicate normalized aliases, normal `Map#set` last-write behavior applies, so dataset curation must avoid ambiguity.

## 9. Lookup Layer

Lookup modules are direct reads: `countries[code]`, `currencies[code]`, and `languages[code]`. They assume canonical input and never normalize, iterate, or search. This preserves expected O(1) access, supports strict validation, and returns precise `undefined` for absent records.

## 10. Lazy Indexes

`createCountryCodeIndex()` visits countries in dataset order, groups selected property keys into country-code arrays, freezes each array, and returns a `Map`. Each specific index is built on first use and retained at module scope.

| Index | Source property | Visibility | Result |
| --- | --- | --- | --- |
| Currency | `country.currencies` | Public via currency API | Currency code -> country codes |
| Language | `country.languages` | Public via language API | Language code -> country codes |
| Phone | `country.phoneCode` | Internal | Calling code -> country codes |
| Region | `country.region` | Internal | UN region -> country codes |
| Subregion | `country.subregion` | Internal | UN subregion -> country codes |

Lazy creation avoids allocating every relationship for direct-lookup consumers. The tradeoff is one O(n + r) construction and retained map memory after first use, where `r` is the number of indexed relationships. Later reads are expected O(1). Public reverse APIs turn codes into shared records and cache frozen arrays per canonical currency/language. Unknown identifiers and known-but-unused codes return a shared frozen empty array.

Phone, region, and subregion indexes are implemented and tested internally, but are not v1 public entry-point APIs.

## 11. Flag Provider

`getFlag()` resolves a country then returns:

| Type | Result |
| --- | --- |
| `emoji` (default) | Emoji stored on the country record |
| `svg` | `https://flagcdn.com/{lowercase-alpha2}.svg` |
| `png` | `https://flagcdn.com/w320/{lowercase-alpha2}.png` |

URL strings are generated from the canonical code rather than stored per country. This avoids redundant data, is deterministic, and makes no network request. The consuming application decides whether to fetch a returned FlagCDN URL.

`getFlagByCurrency()` resolves a currency code or English currency name, reads
that immutable currency record's `primaryCountry` alpha-3 code, and delegates
to `getFlag()`. It therefore has identical output options and failure behavior:
an unrecognized currency returns `undefined`.

## 12. Type System

The public model includes `Country`, `Currency`, `Language`, `Translation`, shared code aliases, `FlagEmoji`, `LocalizedName`, `Region`, `Subregion`, and `FlagOptions`. `CountryRecord`, `CurrencyRecord`, and `LanguageRecord` are aliases of their interfaces.

Fields are readonly, as are country relationship arrays. Runtime freezing reinforces the compile-time promise, including nested arrays and translation maps. `Translation` is a nested readonly `Partial<Record<...>>`: either a country or a translated language can be absent. Sparse public maps use the same honest absence model, keeping runtime and type behavior aligned.

## 13. Performance Decisions

| Decision | Benefit | Tradeoff |
| --- | --- | --- |
| Shared frozen records | No clones; stable identities | Consumers cannot mutate results |
| Lazy resolver maps | No alias-map allocation until needed | First resolver call pays setup |
| Lazy reverse indexes | Direct users avoid relationship-map allocation | First reverse query pays setup and retains memory |
| Cached country list | Repeated list calls are O(1) | Full list retained after first call |
| Cached reverse results | Repeated relationships avoid record-array rebuilding | One result per queried code retained |
| Precomputed searchable names | Avoids lowercasing names on every search | Small metadata retained after first search |
| No search result cache | Prevents user-query-driven unbounded memory | Repeated searches still scan |
| Canonical lookup layer | Fast direct reads | Private callers must supply canonical codes |
| Generated flag URLs | No stored URL strings | URL pattern is tied to FlagCDN |

| Operation | First relevant call | Later calls |
| --- | --- | --- |
| Resolver-backed single lookup | O(m) map build, then O(1) | O(1) |
| `getCountries()` | O(n) | O(1) |
| Currency/language reverse lookup | O(n + r) index, then O(k) result materialization | O(1) for a cached code |
| Country search | O(n) metadata setup plus O(n) scan | O(n) scan |
| Flag output after resolution | Resolver cost plus O(1) | O(1) |

## 14. Testing Strategy

Vitest runs in Node and tests both public contracts and architectural invariants.

| Area | Verified behavior |
| --- | --- |
| Country API | Identifier forms, normalization, missing values, list cache, search semantics, immutability |
| Currency API | Code/name resolution, whitespace, reverse results, cache, known-unused code |
| Language API | Code/English/native resolution, reverse results, empty result |
| Flag API | Default emoji, alpha-3/name inputs, SVG/PNG URLs, missing values |
| Validation | Case-insensitive codes only; names and country alpha-3 are rejected |
| Datasets | Frozen containers, records, nested arrays/maps, failed replacements |
| Internals | Normalization, aliases, canonical-only lookups, lazy reuse, all private index types, provider output |

V8 coverage reporting has text and HTML reporters. The philosophy is to test behavior and invariants that are easy to regress, rather than substitute a percentage target for meaningful coverage.

## 15. Package Design

`package.json` sets `type: "module"`, Node.js `>=18`, `sideEffects: false`, and no runtime dependencies. TypeScript, tsup, Vitest, ESLint, Prettier, Tinybench, and coverage are development dependencies.

The build starts at `src/index.ts`, bundles private modules into one neutral ES2022 ESM file, emits declarations/source maps, enables tree shaking, and does not split chunks. The export map exposes only `.`; internal source modules are not a supported consumer surface. Only `dist/` is published, and `prepack` builds before packaging.

The README is the installation and usage guide. This document records the architecture and constraints for future maintainers.

## 16. Design Decisions

| Decision | Rationale |
| --- | --- |
| Functional API | No configuration, instance state, or lifecycle exists |
| Immutable datasets | Safe sharing, stable cache results, predictable records |
| Normalized data | Avoids duplicated currency/language metadata; supports derived relationships |
| No runtime dependencies | Small package and supply-chain surface |
| ESM static exports | Modern tooling and tree-shaking analysis |
| Lazy indexes | Defers memory/startup work until used |
| Generated URLs | Avoids redundant URL strings |
| Sparse dataset types | Makes data availability explicit |
| Readonly types and freezing | Aligns TypeScript intent with JavaScript runtime behavior |
| Lookup layer | Fast canonical access without implicit search |
| Resolver layer | Centralizes human-input normalization and aliases |
| Strict validation | Keeps validation distinct from flexible resolution |
| Substring search | Predictable behavior without ranking or heuristic policy |

## 17. Known Tradeoffs

- Dataset coverage is intentionally sparse; direct reads require optional access.
- Alias matching is exact after case/whitespace normalization: no fuzzy matching, transliteration, locale collation, or unlisted spellings.
- Search is linear and unranked; it intentionally does not cache arbitrary queries.
- Raw datasets are immutable but do not provide resolver behavior or guarantee registry completeness.
- SVG/PNG results are external URL strings. CountryKit does not fetch them, but rendering depends on consumers and FlagCDN.
- The root export is a single bundled entry. Future subpath exports could provide clearer module boundaries.
- Benchmarks are warmed synthetic measurements: 100,000 country, currency, language, and flag lookups plus 1,000 searches. They are not real-world latency or bundle-size measurements.
- Phone, region, and subregion indexes are private and not stable public contracts.

## 18. Future Roadmap

These are potential directions, not commitments. Any work must honor v1 compatibility and the dependency-free philosophy.

### Potential v1.1

- Expand and generate datasets with provenance and validation.
- Add translations while retaining sparse semantics.
- Add supported public helpers for time zones, calling codes, continents, regions, or subregions once their contracts are settled.
- Add deterministic search options without changing existing `searchCountries()` behavior.
- Add subpath exports where they improve consumer bundle boundaries.

### Potential v2

- Revisit data coverage and package-size strategy.
- Offer React integration as a separate package, not a core dependency.
- Offer a CLI package for inspection or data workflows.
- Make breaking API/data-shape changes only with a major-version plan and migration documentation.

## 19. Release Summary

CountryKit v1.0.0 has a mature layered architecture for its defined scope: immutable local datasets; resolver, lookup, and index boundaries; deterministic public behavior; and a compact ESM surface. Tests exercise public contracts and internal invariants, while benchmarks cover warmed lookup and search paths.

The public API is stable and the package is release-ready for its documented v1 dataset scope. This architecture is **locked for v1.x**. Future implementation must preserve backward compatibility unless a major version is explicitly planned and released.
