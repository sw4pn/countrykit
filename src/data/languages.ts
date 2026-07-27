import type { LanguageCode, LanguageRecord } from "../types";

function freezeLanguage(language: LanguageRecord): LanguageRecord {
  return Object.freeze({ ...language });
}

const languageData = {
  afr: {
    code: "afr",
    name: "Afrikaans",
    nativeName: "Namibië",
  },
  amh: {
    code: "amh",
    name: "Amharic",
    nativeName: "ኢትዮጵያ",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "الإمارات",
  },
  arc: {
    code: "arc",
    name: "Aramaic",
    nativeName: "ܩܘܼܛܢܵܐ",
  },
  aym: {
    code: "aym",
    name: "Aymara",
    nativeName: "Wuliwya",
  },
  aze: {
    code: "aze",
    name: "Azerbaijani",
    nativeName: "Azərbaycan",
  },
  bar: {
    code: "bar",
    name: "Austro-Bavarian German",
    nativeName: "Österreich",
  },
  bel: {
    code: "bel",
    name: "Belarusian",
    nativeName: "Белару́сь",
  },
  ben: {
    code: "ben",
    name: "Bengali",
    nativeName: "বাংলাদেশ",
  },
  ber: {
    code: "ber",
    name: "Berber",
    nativeName: "Western Sahara",
  },
  bis: {
    code: "bis",
    name: "Bislama",
    nativeName: "Vanuatu",
  },
  bjz: {
    code: "bjz",
    name: "Belizean Creole",
    nativeName: "Belize",
  },
  bos: {
    code: "bos",
    name: "Bosnian",
    nativeName: "Bosna i Hercegovina",
  },
  bul: {
    code: "bul",
    name: "Bulgarian",
    nativeName: "България",
  },
  bwg: {
    code: "bwg",
    name: "Chibarwe",
    nativeName: "Zimbabwe",
  },
  cal: {
    code: "cal",
    name: "Carolinian",
    nativeName: "Northern Mariana Islands",
  },
  cat: {
    code: "cat",
    name: "Catalan",
    nativeName: "Andorra",
  },
  cha: {
    code: "cha",
    name: "Chamorro",
    nativeName: "Guåhån",
  },
  ckb: {
    code: "ckb",
    name: "Sorani",
    nativeName: "کۆماری",
  },
  cnr: {
    code: "cnr",
    name: "Montenegrin",
    nativeName: "Црна Гора",
  },
  crs: {
    code: "crs",
    name: "Seychellois Creole",
    nativeName: "Sesel",
  },
  cs: {
    code: "cs",
    name: "Czech",
    nativeName: "Česko",
  },
  dan: {
    code: "dan",
    name: "Danish",
    nativeName: "Danmark",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Belgien",
  },
  div: {
    code: "div",
    name: "Maldivian",
    nativeName: "ދިވެހިރާއްޖޭގެ",
  },
  dzo: {
    code: "dzo",
    name: "Dzongkha",
    nativeName: "འབྲུག་ཡུལ་",
  },
  ell: {
    code: "ell",
    name: "Greek",
    nativeName: "Κύπρος",
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "Anguilla",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Argentina",
  },
  et: {
    code: "et",
    name: "Estonian",
    nativeName: "Eesti",
  },
  fao: {
    code: "fao",
    name: "Faroese",
    nativeName: "Føroyar",
  },
  fas: {
    code: "fas",
    name: "Persian (Farsi)",
    nativeName: "ایران",
  },
  fi: {
    code: "fi",
    name: "Finnish",
    nativeName: "Suomi",
  },
  fij: {
    code: "fij",
    name: "Fijian",
    nativeName: "Viti",
  },
  fil: {
    code: "fil",
    name: "Filipino",
    nativeName: "Pilipinas",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Terres australes et antarctiques françaises",
  },
  gil: {
    code: "gil",
    name: "Gilbertese",
    nativeName: "Kiribati",
  },
  gle: {
    code: "gle",
    name: "Irish",
    nativeName: "Éire",
  },
  glv: {
    code: "glv",
    name: "Manx",
    nativeName: "Mannin",
  },
  grn: {
    code: "grn",
    name: "Guaraní",
    nativeName: "Argentina",
  },
  gsw: {
    code: "gsw",
    name: "Swiss German",
    nativeName: "Schweiz",
  },
  hat: {
    code: "hat",
    name: "Haitian Creole",
    nativeName: "Ayiti",
  },
  heb: {
    code: "heb",
    name: "Hebrew",
    nativeName: "ישראל",
  },
  her: {
    code: "her",
    name: "Herero",
    nativeName: "Namibia",
  },
  hgm: {
    code: "hgm",
    name: "Khoekhoe",
    nativeName: "Namibia",
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "भारत",
  },
  hif: {
    code: "hif",
    name: "Fiji Hindi",
    nativeName: "फिजी",
  },
  hmo: {
    code: "hmo",
    name: "Hiri Motu",
    nativeName: "Papua Niu Gini",
  },
  hr: {
    code: "hr",
    name: "Croatian",
    nativeName: "Bosna i Hercegovina",
  },
  hu: {
    code: "hu",
    name: "Hungarian",
    nativeName: "Magyarország",
  },
  hye: {
    code: "hye",
    name: "Armenian",
    nativeName: "Հայաստան",
  },
  ind: {
    code: "ind",
    name: "Indonesian",
    nativeName: "Indonesia",
  },
  isl: {
    code: "isl",
    name: "Icelandic",
    nativeName: "Ísland",
  },
  it: {
    code: "it",
    name: "Italian",
    nativeName: "Svizzera",
  },
  ja: {
    code: "ja",
    name: "Japanese",
    nativeName: "日本",
  },
  jam: {
    code: "jam",
    name: "Jamaican Patois",
    nativeName: "Jamaica",
  },
  kal: {
    code: "kal",
    name: "Greenlandic",
    nativeName: "Kalaallit Nunaat",
  },
  kat: {
    code: "kat",
    name: "Georgian",
    nativeName: "საქართველო",
  },
  kaz: {
    code: "kaz",
    name: "Kazakh",
    nativeName: "Қазақстан",
  },
  kck: {
    code: "kck",
    name: "Kalanga",
    nativeName: "Zimbabwe",
  },
  khi: {
    code: "khi",
    name: "Khoisan",
    nativeName: "Zimbabwe",
  },
  khm: {
    code: "khm",
    name: "Khmer",
    nativeName: "Kâmpŭchéa",
  },
  kin: {
    code: "kin",
    name: "Kinyarwanda",
    nativeName: "Rwanda",
  },
  kir: {
    code: "kir",
    name: "Kyrgyz",
    nativeName: "Кыргызстан",
  },
  ko: {
    code: "ko",
    name: "Korean",
    nativeName: "한국",
  },
  kon: {
    code: "kon",
    name: "Kikongo",
    nativeName: "Repubilika ya Kongo Demokratiki",
  },
  kwn: {
    code: "kwn",
    name: "Kwangali",
    nativeName: "Namibia",
  },
  lao: {
    code: "lao",
    name: "Lao",
    nativeName: "ສປປລາວ",
  },
  lat: {
    code: "lat",
    name: "Latin",
    nativeName: "Vaticanæ",
  },
  lav: {
    code: "lav",
    name: "Latvian",
    nativeName: "Latvija",
  },
  lin: {
    code: "lin",
    name: "Lingala",
    nativeName: "Republiki ya Kongó Demokratiki",
  },
  lit: {
    code: "lit",
    name: "Lithuanian",
    nativeName: "Lietuva",
  },
  loz: {
    code: "loz",
    name: "Lozi",
    nativeName: "Namibia",
  },
  ltz: {
    code: "ltz",
    name: "Luxembourgish",
    nativeName: "Lëtzebuerg",
  },
  lua: {
    code: "lua",
    name: "Tshiluba",
    nativeName: "Ditunga dia Kongu wa Mungalaata",
  },
  mah: {
    code: "mah",
    name: "Marshallese",
    nativeName: "M̧ajeļ",
  },
  mey: {
    code: "mey",
    name: "Hassaniya",
    nativeName: "الصحراء الغربية",
  },
  mfe: {
    code: "mfe",
    name: "Mauritian Creole",
    nativeName: "Moris",
  },
  mkd: {
    code: "mkd",
    name: "Macedonian",
    nativeName: "Македонија",
  },
  mlg: {
    code: "mlg",
    name: "Malagasy",
    nativeName: "Madagasikara",
  },
  mlt: {
    code: "mlt",
    name: "Maltese",
    nativeName: "Malta",
  },
  mon: {
    code: "mon",
    name: "Mongolian",
    nativeName: "Монгол улс",
  },
  mri: {
    code: "mri",
    name: "Māori",
    nativeName: "Aotearoa",
  },
  msa: {
    code: "msa",
    name: "Malay",
    nativeName: "Negara Brunei Darussalam",
  },
  mya: {
    code: "mya",
    name: "Burmese",
    nativeName: "မြန်မာ",
  },
  nau: {
    code: "nau",
    name: "Nauru",
    nativeName: "Nauru",
  },
  nbl: {
    code: "nbl",
    name: "Southern Ndebele",
    nativeName: "Sewula Afrika",
  },
  ndc: {
    code: "ndc",
    name: "Ndau",
    nativeName: "Zimbabwe",
  },
  nde: {
    code: "nde",
    name: "Northern Ndebele",
    nativeName: "Zimbabwe",
  },
  ndo: {
    code: "ndo",
    name: "Ndonga",
    nativeName: "Namibia",
  },
  nep: {
    code: "nep",
    name: "Nepali",
    nativeName: "नेपाल",
  },
  nfr: {
    code: "nfr",
    name: "Guernésiais",
    nativeName: "Dgèrnésiais",
  },
  niu: {
    code: "niu",
    name: "Niuean",
    nativeName: "Niuē",
  },
  nl: {
    code: "nl",
    name: "Dutch",
    nativeName: "Aruba",
  },
  nno: {
    code: "nno",
    name: "Norwegian Nynorsk",
    nativeName: "Noreg",
  },
  nob: {
    code: "nob",
    name: "Norwegian Bokmål",
    nativeName: "Norge",
  },
  nor: {
    code: "nor",
    name: "Norwegian",
    nativeName: "Bouvetøya",
  },
  nrf: {
    code: "nrf",
    name: "Jèrriais",
    nativeName: "Jèrri",
  },
  nso: {
    code: "nso",
    name: "Northern Sotho",
    nativeName: "Afrika-Borwa",
  },
  nya: {
    code: "nya",
    name: "Chewa",
    nativeName: "Malaŵi",
  },
  nzs: {
    code: "nzs",
    name: "New Zealand Sign Language",
    nativeName: "New Zealand",
  },
  pap: {
    code: "pap",
    name: "Papiamento",
    nativeName: "Aruba",
  },
  pau: {
    code: "pau",
    name: "Palauan",
    nativeName: "Belau",
  },
  pih: {
    code: "pih",
    name: "Norfuk",
    nativeName: "Norf'k Ailen",
  },
  pl: {
    code: "pl",
    name: "Polish",
    nativeName: "Polska",
  },
  pov: {
    code: "pov",
    name: "Upper Guinea Creole",
    nativeName: "Guiné-Bissau",
  },
  prs: {
    code: "prs",
    name: "Dari",
    nativeName: "افغانستان",
  },
  pt: {
    code: "pt",
    name: "Portuguese",
    nativeName: "Angola",
  },
  pus: {
    code: "pus",
    name: "Pashto",
    nativeName: "افغانستان",
  },
  que: {
    code: "que",
    name: "Quechua",
    nativeName: "Buliwya",
  },
  rar: {
    code: "rar",
    name: "Cook Islands Māori",
    nativeName: "Kūki 'Āirani",
  },
  roh: {
    code: "roh",
    name: "Romansh",
    nativeName: "Svizra",
  },
  ron: {
    code: "ron",
    name: "Moldavian",
    nativeName: "Moldova",
  },
  ru: {
    code: "ru",
    name: "Russian",
    nativeName: "Азербайджан",
  },
  run: {
    code: "run",
    name: "Kirundi",
    nativeName: "Uburundi",
  },
  sag: {
    code: "sag",
    name: "Sango",
    nativeName: "Bêafrîka",
  },
  sin: {
    code: "sin",
    name: "Sinhala",
    nativeName: "ශ්‍රී ලංකාව",
  },
  sk: {
    code: "sk",
    name: "Slovak",
    nativeName: "Česko",
  },
  slv: {
    code: "slv",
    name: "Slovene",
    nativeName: "Slovenija",
  },
  smi: {
    code: "smi",
    name: "Sami",
    nativeName: "Norgga",
  },
  smo: {
    code: "smo",
    name: "Samoan",
    nativeName: "Sāmoa Amelika",
  },
  sna: {
    code: "sna",
    name: "Shona",
    nativeName: "Zimbabwe",
  },
  som: {
    code: "som",
    name: "Somali",
    nativeName: "Soomaaliya",
  },
  sot: {
    code: "sot",
    name: "Sotho",
    nativeName: "Lesotho",
  },
  sqi: {
    code: "sqi",
    name: "Albanian",
    nativeName: "Shqipëria",
  },
  sr: {
    code: "sr",
    name: "Serbian",
    nativeName: "Боснa и Херцеговина",
  },
  ssw: {
    code: "ssw",
    name: "Swazi",
    nativeName: "eSwatini",
  },
  sv: {
    code: "sv",
    name: "Swedish",
    nativeName: "Åland",
  },
  swa: {
    code: "swa",
    name: "Swahili",
    nativeName: "Jamhuri ya Kidemokrasia ya Kongo",
  },
  ta: {
    code: "ta",
    name: "Tamil",
    nativeName: "இந்தியா",
  },
  tet: {
    code: "tet",
    name: "Tetum",
    nativeName: "Timór-Leste",
  },
  tgk: {
    code: "tgk",
    name: "Tajik",
    nativeName: "Тоҷикистон",
  },
  tha: {
    code: "tha",
    name: "Thai",
    nativeName: "ประเทศไทย",
  },
  tir: {
    code: "tir",
    name: "Tigrinya",
    nativeName: "ኤርትራ",
  },
  tkl: {
    code: "tkl",
    name: "Tokelauan",
    nativeName: "Tokelau",
  },
  toi: {
    code: "toi",
    name: "Tonga",
    nativeName: "Zimbabwe",
  },
  ton: {
    code: "ton",
    name: "Tongan",
    nativeName: "Tonga",
  },
  tpi: {
    code: "tpi",
    name: "Tok Pisin",
    nativeName: "Papua Niugini",
  },
  tr: {
    code: "tr",
    name: "Turkish",
    nativeName: "Kıbrıs",
  },
  tsn: {
    code: "tsn",
    name: "Tswana",
    nativeName: "Botswana",
  },
  tso: {
    code: "tso",
    name: "Tsonga",
    nativeName: "Afrika Dzonga",
  },
  tuk: {
    code: "tuk",
    name: "Turkmen",
    nativeName: "Owganystan",
  },
  tvl: {
    code: "tvl",
    name: "Tuvaluan",
    nativeName: "Tuvalu",
  },
  ukr: {
    code: "ukr",
    name: "Ukrainian",
    nativeName: "Україна",
  },
  ur: {
    code: "ur",
    name: "Urdu",
    nativeName: "پاكستان",
  },
  uzb: {
    code: "uzb",
    name: "Uzbek",
    nativeName: "O‘zbekiston",
  },
  ven: {
    code: "ven",
    name: "Venda",
    nativeName: "Afurika Tshipembe",
  },
  vie: {
    code: "vie",
    name: "Vietnamese",
    nativeName: "Việt Nam",
  },
  xho: {
    code: "xho",
    name: "Xhosa",
    nativeName: "Mzantsi Afrika",
  },
  zdj: {
    code: "zdj",
    name: "Comorian",
    nativeName: "Komori",
  },
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "中国",
  },
  zib: {
    code: "zib",
    name: "Zimbabwean Sign Language",
    nativeName: "Zimbabwe",
  },
  zul: {
    code: "zul",
    name: "Zulu",
    nativeName: "Ningizimu Afrika",
  },
} satisfies Record<LanguageCode, LanguageRecord>;

export const languages: Readonly<
  Record<LanguageCode, LanguageRecord | undefined>
> =
  /* @__PURE__ */
  Object.freeze({
    en: freezeLanguage(languageData.en),
    hi: freezeLanguage(languageData.hi),
    fr: freezeLanguage(languageData.fr),
    de: freezeLanguage(languageData.de),
    ja: freezeLanguage(languageData.ja),
  });
