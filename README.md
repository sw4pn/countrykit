# countrykit-core

CountryKit-Core is a tiny, dependency-free TypeScript toolkit for country, currency,
language, and flag information. It provides immutable datasets, flexible
identifier resolution, and ESM-first APIs designed for modern applications.

## Features

- Zero runtime dependencies
- ESM-first, tree-shakeable package
- TypeScript declarations included
- Immutable public records and result arrays
- Case-insensitive country, currency, and language resolution
- Country lookups by ISO alpha-2, alpha-3, English name, or official name
- Currency and language reverse lookups to countries
- Emoji, SVG, and PNG flag representations
- Small, lazily built internal indexes for fast repeated lookups

## Installation

```sh
npm install countrykit-core
```

```sh
pnpm add countrykit-core
```

```sh
yarn add countrykit-core
```

```sh
bun add countrykit-core
```

## Quick Start

```ts
import { getCountry, getFlag, isCurrencyCode } from "countrykit-core";

const india = getCountry("IND");
// { code: "IN", name: "India", ... }

const flag = getFlag("India", { type: "svg" });
// "https://flagcdn.com/in.svg"

isCurrencyCode("usd");
// true
```

All lookup functions return `undefined` when an identifier cannot be resolved;
they do not throw for unknown string values.

## Country API

### `getCountry(identifier)`

Returns a country from an ISO 3166-1 alpha-2 code, alpha-3 code, English name,
or official name.

```ts
import { getCountry } from "countrykit-core";

getCountry("IN");
getCountry("IND");
getCountry("India");
getCountry("Republic of India");

getCountry("Atlantis");
// undefined
```

Matching is case-insensitive and normalizes surrounding and duplicate
whitespace.

### `getCountries()`

Returns every country in dataset order. The result is lazily cached and frozen.

```ts
import { getCountries } from "countrykit-core";

const countries = getCountries();
for (const country of countries) {
  console.log(country.code, country.name);
}
```

### `searchCountries(query)`

Performs a deterministic, case-insensitive substring search against English and
official country names. It does not perform fuzzy matching or ranking.

```ts
import { searchCountries } from "countrykit-core";

searchCountries("republic");
// [{ code: "IN", name: "India", ... }]

searchCountries("america");
// [{ code: "US", name: "United States", ... }]
```

## Currency API

### `getCurrency(identifier)`

Returns a currency from its ISO 4217 code or English name.

```ts
import { getCurrency } from "countrykit-core";

getCurrency("USD");
getCurrency("united states dollar");
// { code: "USD", name: "United States Dollar", symbol: "$" }

getCurrency("Bitcoin");
// undefined
```

### `getCountriesByCurrency(identifier)`

Returns countries using a currency identified by ISO code or English name.
Results are backed by a lazy reverse index and cached by canonical currency
code.

```ts
import { getCountriesByCurrency } from "countrykit-core";

getCountriesByCurrency("INR");
// [{ code: "IN", name: "India", ... }]

getCountriesByCurrency("United States Dollar");
// [{ code: "US", name: "United States", ... }]
```

## Language API

### `getLanguage(identifier)`

Returns a language from its ISO 639-1 code, English name, or native name.

```ts
import { getLanguage } from "countrykit-core";

getLanguage("en");
getLanguage("French");
getLanguage("日本語");
// { code: "ja", name: "Japanese", nativeName: "日本語" }
```

### `getCountriesByLanguage(identifier)`

Returns countries using a language identified by code, English name, or native
name.

```ts
import { getCountriesByLanguage } from "countrykit-core";

getCountriesByLanguage("Hindi");
// [{ code: "IN", name: "India", ... }]

getCountriesByLanguage("en");
// [{ code: "IN", ... }, { code: "US", ... }]
```

## Flag API

### `getFlag(countryIdentifier, options?)`

Returns an emoji flag by default. Set `type` to `"svg"` or `"png"` to receive
a FlagCDN URL.

```ts
import { getFlag } from "countrykit-core";

getFlag("India");
// "🇮🇳"

getFlag("IN", { type: "svg" });
// "https://flagcdn.com/in.svg"

getFlag("IND", { type: "png" });
// "https://flagcdn.com/w320/in.png"
```

SVG and PNG URLs are generated on demand; no external request is made by
countrykit-core itself.

### `getFlagByCurrency(currencyIdentifier, options?)`

Returns the flag for a currency's designated primary country. Currency input
accepts an ISO 4217 code or English currency name; flag options are the same as
`getFlag()`.

```ts
import { getFlagByCurrency } from "countrykit-core";

getFlagByCurrency("INR");
// "🇮🇳"

getFlagByCurrency("United States Dollar", { type: "svg" });
// "https://flagcdn.com/us.svg"
```

It returns `undefined` when the currency identifier cannot be resolved.

## Validation API

The validation functions accept only canonical dataset codes, case-insensitively.
They do not accept names or alpha-3 country codes.

```ts
import { isCountryCode, isCurrencyCode, isLanguageCode } from "countrykit-core";

isCountryCode("in"); // true
isCountryCode("India"); // false

isCurrencyCode("USD"); // true
isCurrencyCode("United States Dollar"); // false

isLanguageCode("EN"); // true
isLanguageCode("English"); // false
```

## Raw Datasets

The raw datasets are exported for direct iteration or custom presentation.
Their top-level containers are frozen. Prefer the lookup APIs when resolving
user input.

```ts
import {
  countries,
  currencies,
  languages,
  translations,
} from "countrykit-core";

console.log(countries.IN?.name);
console.log(currencies.USD?.symbol);
console.log(languages.en?.nativeName);
console.log(translations.IN?.fr);
```

## TypeScript Support

CountryKit includes declaration files and exports all public types.

```ts
import type {
  Country,
  CountryCode,
  Currency,
  CurrencyCode,
  FlagOptions,
  Language,
  LanguageCode,
} from "countrykit-core";

const preferredCountry: CountryCode = "IN";
const options: FlagOptions = { type: "svg" };
```

Useful exported types also include `CountryRecord`, `CurrencyRecord`,
`LanguageRecord`, `CountryCode3`, `FlagEmoji`, `LocalizedName`, `Region`,
`Subregion`, and `Translation`.

## Tree Shaking

CountryKit is ESM-only and declares `sideEffects: false`. Import individual
functions to allow modern bundlers to remove unused exports.

```ts
import { getFlag } from "countrykit-core";
```

Avoid namespace imports when minimizing application bundles is important.

## Runtime Usage

### Browser

Use CountryKit through a modern bundler such as Vite, Rollup, Webpack, or
esbuild.

```ts
import { getCountry } from "countrykit-core";

document.querySelector("#country")!.textContent = getCountry("US")?.name ?? "";
```

### Node.js

CountryKit supports Node.js 18 and later in ESM projects.

```ts
import { getCountries } from "countrykit-core";

console.log(getCountries().length);
```

### Bun

```ts
import { getFlag } from "countrykit-core";

console.log(getFlag("India"));
```

### Deno

Use Deno's npm compatibility layer.

```ts
import { getLanguage } from "npm:countrykit-core";

console.log(getLanguage("Deutsch"));
```

## Performance

Resolvers and reverse indexes are initialized lazily, then reused. Country,
currency, language, and reverse-lookup results are cached immutable records.
Search precomputes normalized dataset names once and does not cache arbitrary
query results, preventing unbounded memory growth.

Run the local benchmark suite with:

```sh
pnpm bench
```

It warms lazy caches before measuring 100,000 country, currency, language, and
flag lookups plus 1,000 country searches.

## Bundle Size

The published package is a single self-contained ESM module. The current
unminified JavaScript bundle is approximately 12 KB before consumer bundling
and compression. Final application size depends on the bundler, selected
exports, and compression settings.

## FAQ

### Does CountryKit make network requests?

No. All country, currency, and language data is local. SVG and PNG flag results
are URL strings that point to FlagCDN; CountryKit does not fetch them.

### Are lookups case-sensitive?

No. Resolver-backed APIs are case-insensitive. Country resolvers also normalize
leading, trailing, and repeated whitespace.

### What happens when a lookup fails?

Single-record lookups return `undefined`. Reverse lookups and searches return
an empty readonly array.

### Can I mutate returned data?

Public lookup records and result arrays are frozen. Treat raw exported datasets
as readonly application data.

## Contributing

Contributions are welcome. Before opening a pull request, install dependencies
and run the complete verification suite:

```sh
pnpm install
pnpm check
pnpm bench
```

Keep changes dependency-free at runtime, preserve the public API, and include
focused tests for behavior changes.

## License

[MIT](LICENSE)
