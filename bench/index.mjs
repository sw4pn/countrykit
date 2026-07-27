/* global console */

import { Bench } from "tinybench";
import {
  getCountry,
  getCurrency,
  getFlag,
  getLanguage,
  searchCountries,
} from "../dist/index.js";

const COUNTRY_LOOKUPS = 100_000;
const CURRENCY_LOOKUPS = 100_000;
const LANGUAGE_LOOKUPS = 100_000;
const FLAG_LOOKUPS = 100_000;
const SEARCHES = 1_000;

// Warm lazy resolver, index, and public-record caches before timing hot paths.
getCountry("IN");
getCurrency("USD");
getLanguage("en");
getFlag("IN");
searchCountries("india");

const bench = new Bench({ time: 1_000, warmupTime: 250 });

bench
  .add(`${COUNTRY_LOOKUPS.toLocaleString()} country lookups`, () => {
    for (let index = 0; index < COUNTRY_LOOKUPS; index += 1) {
      getCountry("IN");
    }
  })
  .add(`${CURRENCY_LOOKUPS.toLocaleString()} currency lookups`, () => {
    for (let index = 0; index < CURRENCY_LOOKUPS; index += 1) {
      getCurrency("USD");
    }
  })
  .add(`${LANGUAGE_LOOKUPS.toLocaleString()} language lookups`, () => {
    for (let index = 0; index < LANGUAGE_LOOKUPS; index += 1) {
      getLanguage("en");
    }
  })
  .add(`${FLAG_LOOKUPS.toLocaleString()} flag lookups`, () => {
    for (let index = 0; index < FLAG_LOOKUPS; index += 1) {
      getFlag("IN");
    }
  })
  .add(`${SEARCHES.toLocaleString()} country searches`, () => {
    for (let index = 0; index < SEARCHES; index += 1) {
      searchCountries("india");
    }
  });

await bench.run();
console.table(bench.table());
