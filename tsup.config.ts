import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  // entry: ["src/**/*.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  // The package publishes only dist/index.*; bundle its private module graph so
  // consumers never resolve unpublished source or internal implementation files.
  bundle: true,
  splitting: false,
  target: "es2022",
  platform: "neutral",
});
