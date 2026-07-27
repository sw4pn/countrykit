import type { CountryCode, LanguageCode, LocalizedName } from "./shared";

export type Translation = Readonly<
  Partial<
    Record<
      CountryCode,
      Readonly<Record<LanguageCode, LocalizedName | undefined>>
    >
  >
>;
