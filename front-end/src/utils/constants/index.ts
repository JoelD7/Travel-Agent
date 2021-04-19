import * as LocalStorageKeys from "./localStorageKeys";
import * as FlightClass from "./flight-classes";
import * as LocationType from "./geolocation";
import { CarCheckbox, CarSearch, IATALocation } from "../types";
import { addDays, format } from "date-fns";
import { getDefaultCity, getISOCodeFromCountry } from "../functions";
import { CarReducer } from "../store";
export * from "./airports";
export * from "./iataCodes";
export * from "./iso3166-countryCodes";
export { LocalStorageKeys, FlightClass, LocationType };

export const DEFAULT_CURRENCY = "USD";

export const currenciesCode: string[] = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTC",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLF",
  "CLP",
  "CNH",
  "CNY",
  "COP",
  "CRC",
  "CUC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRO",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STD",
  "STN",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XAG",
  "XAU",
  "XCD",
  "XDR",
  "XOF",
  "XPD",
  "XPF",
  "XPT",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

export const currenciesName: { [index: string]: string } = {
  AED: "United Arab Emirates Dirham",
  AFN: "Afghan Afghani",
  ALL: "Albanian Lek",
  AMD: "Armenian Dram",
  ANG: "Netherlands Antillean Guilder",
  AOA: "Angolan Kwanza",
  ARS: "Argentine Peso",
  AUD: "Australian Dollar",
  AWG: "Aruban Florin",
  AZN: "Azerbaijani Manat",
  BAM: "Bosnia-Herzegovina Convertible Mark",
  BBD: "Barbadian Dollar",
  BDT: "Bangladeshi Taka",
  BGN: "Bulgarian Lev",
  BHD: "Bahraini Dinar",
  BIF: "Burundian Franc",
  BMD: "Bermudan Dollar",
  BND: "Brunei Dollar",
  BOB: "Bolivian Boliviano",
  BRL: "Brazilian Real",
  BSD: "Bahamian Dollar",
  BTC: "Bitcoin",
  BTN: "Bhutanese Ngultrum",
  BWP: "Botswanan Pula",
  BYN: "Belarusian Ruble",
  BZD: "Belize Dollar",
  CAD: "Canadian Dollar",
  CDF: "Congolese Franc",
  CHF: "Swiss Franc",
  CLF: "Chilean Unit of Account (UF)",
  CLP: "Chilean Peso",
  CNH: "Chinese Yuan (Offshore)",
  CNY: "Chinese Yuan",
  COP: "Colombian Peso",
  CRC: "Costa Rican Colón",
  CUC: "Cuban Convertible Peso",
  CUP: "Cuban Peso",
  CVE: "Cape Verdean Escudo",
  CZK: "Czech Republic Koruna",
  DJF: "Djiboutian Franc",
  DKK: "Danish Krone",
  DOP: "Dominican Peso",
  DZD: "Algerian Dinar",
  EGP: "Egyptian Pound",
  ERN: "Eritrean Nakfa",
  ETB: "Ethiopian Birr",
  EUR: "Euro",
  FJD: "Fijian Dollar",
  FKP: "Falkland Islands Pound",
  GBP: "British Pound Sterling",
  GEL: "Georgian Lari",
  GGP: "Guernsey Pound",
  GHS: "Ghanaian Cedi",
  GIP: "Gibraltar Pound",
  GMD: "Gambian Dalasi",
  GNF: "Guinean Franc",
  GTQ: "Guatemalan Quetzal",
  GYD: "Guyanaese Dollar",
  HKD: "Hong Kong Dollar",
  HNL: "Honduran Lempira",
  HRK: "Croatian Kuna",
  HTG: "Haitian Gourde",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  IMP: "Manx pound",
  INR: "Indian Rupee",
  IQD: "Iraqi Dinar",
  IRR: "Iranian Rial",
  ISK: "Icelandic Króna",
  JEP: "Jersey Pound",
  JMD: "Jamaican Dollar",
  JOD: "Jordanian Dinar",
  JPY: "Japanese Yen",
  KES: "Kenyan Shilling",
  KGS: "Kyrgystani Som",
  KHR: "Cambodian Riel",
  KMF: "Comorian Franc",
  KPW: "North Korean Won",
  KRW: "South Korean Won",
  KWD: "Kuwaiti Dinar",
  KYD: "Cayman Islands Dollar",
  KZT: "Kazakhstani Tenge",
  LAK: "Laotian Kip",
  LBP: "Lebanese Pound",
  LKR: "Sri Lankan Rupee",
  LRD: "Liberian Dollar",
  LSL: "Lesotho Loti",
  LYD: "Libyan Dinar",
  MAD: "Moroccan Dirham",
  MDL: "Moldovan Leu",
  MGA: "Malagasy Ariary",
  MKD: "Macedonian Denar",
  MMK: "Myanma Kyat",
  MNT: "Mongolian Tugrik",
  MOP: "Macanese Pataca",
  MRO: "Mauritanian Ouguiya (pre-2018)",
  MRU: "Mauritanian Ouguiya",
  MUR: "Mauritian Rupee",
  MVR: "Maldivian Rufiyaa",
  MWK: "Malawian Kwacha",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  MZN: "Mozambican Metical",
  NAD: "Namibian Dollar",
  NGN: "Nigerian Naira",
  NIO: "Nicaraguan Córdoba",
  NOK: "Norwegian Krone",
  NPR: "Nepalese Rupee",
  NZD: "New Zealand Dollar",
  OMR: "Omani Rial",
  PAB: "Panamanian Balboa",
  PEN: "Peruvian Nuevo Sol",
  PGK: "Papua New Guinean Kina",
  PHP: "Philippine Peso",
  PKR: "Pakistani Rupee",
  PLN: "Polish Zloty",
  PYG: "Paraguayan Guarani",
  QAR: "Qatari Rial",
  RON: "Romanian Leu",
  RSD: "Serbian Dinar",
  RUB: "Russian Ruble",
  RWF: "Rwandan Franc",
  SAR: "Saudi Riyal",
  SBD: "Solomon Islands Dollar",
  SCR: "Seychellois Rupee",
  SDG: "Sudanese Pound",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  SHP: "Saint Helena Pound",
  SLL: "Sierra Leonean Leone",
  SOS: "Somali Shilling",
  SRD: "Surinamese Dollar",
  SSP: "South Sudanese Pound",
  STD: "São Tomé and Príncipe Dobra (pre-2018)",
  STN: "São Tomé and Príncipe Dobra",
  SVC: "Salvadoran Colón",
  SYP: "Syrian Pound",
  SZL: "Swazi Lilangeni",
  THB: "Thai Baht",
  TJS: "Tajikistani Somoni",
  TMT: "Turkmenistani Manat",
  TND: "Tunisian Dinar",
  TOP: "Tongan Pa'anga",
  TRY: "Turkish Lira",
  TTD: "Trinidad and Tobago Dollar",
  TWD: "New Taiwan Dollar",
  TZS: "Tanzanian Shilling",
  UAH: "Ukrainian Hryvnia",
  UGX: "Ugandan Shilling",
  USD: "United States Dollar",
  UYU: "Uruguayan Peso",
  UZS: "Uzbekistan Som",
  VEF: "Venezuelan Bolívar Fuerte",
  VND: "Vietnamese Dong",
  VUV: "Vanuatu Vatu",
  WST: "Samoan Tala",
  XAF: "CFA Franc BEAC",
  XAG: "Silver Ounce",
  XAU: "Gold Ounce",
  XCD: "East Caribbean Dollar",
  XDR: "Special Drawing Rights",
  XOF: "CFA Franc BCEAO",
  XPD: "Palladium Ounce",
  XPF: "CFP Franc",
  XPT: "Platinum Ounce",
  YER: "Yemeni Rial",
  ZAR: "South African Rand",
  ZMW: "Zambian Kwacha",
  ZWL: "Zimbabwean Dollar",
};

export const carRentalFeatures: CarCheckbox[] = [
  {
    name: "Air conditioned",
    checked: true,
  },
  {
    name: "Bluetooth",
    checked: true,
  },
  {
    name: "Smoke free",
    checked: true,
  },
];

//20 cities
export const mostVisitedCities: IATALocation[] = [
  {
    code: "FRA",
    lat: "50.0483",
    lon: "8.57041",
    name: "Frankfurt International Airport",
    city: "Frankfurt",
    state: "Hesse",
    country: "Germany",
    woeid: "22981759",
    tz: "Europe/Berlin",
    phone: "+49 69 690 0",
    type: "Airports",
    email: "",
    url: "http://www.airportcity-frankfurt.de",
    runway_length: "13123",
    elev: "364",
    icao: "EDDF",
    direct_flights: "337",
    carriers: "131",
  },
  {
    code: "CDG",
    lat: "49.0175",
    lon: "2.5564",
    name: "Charles de Gaulle International Airport",
    city: "Le Mesnil-Amelot",
    state: "Ile-de-France",
    country: "France",
    woeid: "22140453",
    tz: "Europe/Paris",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "11811",
    elev: "387",
    icao: "LFPG",
    direct_flights: "310",
    carriers: "131",
  },
  {
    code: "AMS",
    lat: "52.3122",
    lon: "4.77511",
    name: "Schiphol Airport",
    city: "Schiphol Zuid",
    state: "North Holland",
    country: "Netherlands",
    woeid: "22386730",
    tz: "Europe/Amsterdam",
    phone: "+31-207940800",
    type: "Airports",
    email: "",
    url: "http://www.schiphol.com/",
    runway_length: "12467",
    elev: "-11",
    icao: "EHAM",
    direct_flights: "284",
    carriers: "118",
  },
  {
    code: "ATL",
    lat: "33.6558",
    lon: "-84.4333",
    name: "Hartsfield-Jackson Atlanta International Airport",
    city: "Atlanta",
    state: "Georgia",
    country: "United States",
    woeid: "12522118",
    tz: "America/New_York",
    phone: "(654) 57 8833",
    type: "Airports",
    email: "",
    url: "http://www.atlanta-airport.com/",
    runway_length: "11889",
    elev: "1026",
    icao: "KATL",
    direct_flights: "253",
    carriers: "60",
  },
  {
    code: "JFK",
    lat: "40.6437",
    lon: "-73.79",
    name: "John F Kennedy International Airport",
    city: "New York City",
    state: "New York",
    country: "United States",
    woeid: "12520380",
    tz: "America/New_York",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "14572",
    elev: "13",
    icao: "KJFK",
    direct_flights: "233",
    carriers: "100",
  },
  {
    code: "LGW",
    lat: "51.1568",
    lon: "-0.16988",
    name: "London Gatwick Airport",
    city: "Horley",
    state: "England",
    country: "United Kingdom",
    woeid: "23387567",
    tz: "Europe/London",
    phone: "0870 000 2468",
    type: "Airports",
    email: "",
    url: "http://www.gatwickairport.com/",
    runway_length: "10364",
    elev: "202",
    icao: "",
    direct_flights: "227",
    carriers: "71",
  },
  {
    code: "LHR",
    lat: "51.4703",
    lon: "-0.45342",
    name: "London Heathrow Airport",
    city: "Hounslow",
    state: "England",
    country: "United Kingdom",
    woeid: "23382429",
    tz: "Europe/London",
    phone: "+44 (0)8700 000698",
    type: "Airports",
    email: "",
    url: "http://www.heathrowairport.com",
    runway_length: "12802",
    elev: "80",
    icao: "EGLL",
    direct_flights: "227",
    carriers: "105",
  },
  {
    code: "ORD",
    lat: "41.9796",
    lon: "-87.8825",
    name: "Chicago O'Hare International Airport",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    woeid: "12521200",
    tz: "America/Chicago",
    phone: "",
    type: "Airports",
    email: "",
    url: "http://www.flychicago.com/ohare/home.asp",
    runway_length: "13000",
    elev: "668",
    icao: "KORD",
    direct_flights: "222",
    carriers: "85",
  },
  {
    code: "EWR",
    lat: "40.6924",
    lon: "-74.1843",
    name: "Newark International Airport",
    city: "Newark",
    state: "New Jersey",
    country: "United States",
    woeid: "12521127",
    tz: "America/New_York",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "11000",
    elev: "18",
    icao: "KEWR",
    direct_flights: "220",
    carriers: "64",
  },
  {
    code: "MUC",
    lat: "48.354",
    lon: "11.7816",
    name: "Franz-Josef-Strauss Airport",
    city: "Oberding",
    state: "Bavaria",
    country: "Germany",
    woeid: "22923040",
    tz: "Europe/Berlin",
    phone: "",
    type: "Airports",
    email: "",
    url: "http://www.munich-airport.de/",
    runway_length: "13100",
    elev: "1737",
    icao: "EDDM",
    direct_flights: "213",
    carriers: "95",
  },
  {
    code: "IAH",
    lat: "29.9784",
    lon: "-95.3424",
    name: "George Bush Intercontinental Airport",
    city: "Houston",
    state: "Texas",
    country: "United States",
    woeid: "12520245",
    tz: "America/Chicago",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "12001",
    elev: "98",
    icao: "KIAH",
    direct_flights: "210",
    carriers: "54",
  },
  {
    code: "LAX",
    lat: "33.9456",
    lon: "-118.391",
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    woeid: "12520706",
    tz: "America/Los_Angeles",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "12091",
    elev: "126",
    icao: "KLAX",
    direct_flights: "200",
    carriers: "99",
  },
  {
    code: "BRU",
    lat: "50.899",
    lon: "4.4859",
    name: "Brussels Airport",
    city: "Bruxelles",
    state: "Vlaams Brabant",
    country: "Belgium",
    woeid: "22103751",
    tz: "Europe/Brussels",
    phone: "+32 (0) 900 7 0000",
    type: "Airports",
    email: "",
    url: "http://www.brusselsairport.be",
    runway_length: "9790",
    elev: "184",
    icao: "EBBR",
    direct_flights: "186",
    carriers: "97",
  },
  {
    code: "MAD",
    lat: "40.4684",
    lon: "-3.56769",
    name: "Barajas Airport",
    city: "Madrid",
    state: "Madrid",
    country: "Spain",
    woeid: "12517539",
    tz: "Europe/Madrid",
    phone: "00 34 902 404 704",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "13451",
    elev: "1998",
    icao: "LEMD",
    direct_flights: "186",
    carriers: "93",
  },
  {
    code: "VIE",
    lat: "48.1036",
    lon: "16.5804",
    name: "Vienna Schwechat International Airport",
    city: "Klein-Neusiedl",
    state: "Lower Austria",
    country: "Austria",
    woeid: "22022012",
    tz: "Europe/Vienna",
    phone: "",
    type: "Airports",
    email: "",
    url: "http://www.viennaairport.com",
    runway_length: "11811",
    elev: "600",
    icao: "LOWW",
    direct_flights: "183",
    carriers: "96",
  },
  {
    code: "FCO",
    lat: "41.8026",
    lon: "12.2551",
    name: "Leonardo da Vinci International Airport",
    city: "Rome",
    state: "Lazio",
    country: "Italy",
    woeid: "22318195",
    tz: "Europe/Rome",
    phone: "+39 06 65951",
    type: "Airports",
    email: "",
    url: "http://www.adr.it/",
    runway_length: "12795",
    elev: "14",
    icao: "LIRF",
    direct_flights: "181",
    carriers: "124",
  },
  {
    code: "DFW",
    lat: "32.9222",
    lon: "-97.0409",
    name: "Fort Worth International Airport",
    city: "Dallas",
    state: "Texas",
    country: "United States",
    woeid: "12519786",
    tz: "America/Chicago",
    phone: "",
    type: "Airports",
    email: "",
    url: "",
    runway_length: "11388",
    elev: "603",
    icao: "KDFW",
    direct_flights: "179",
    carriers: "62",
  },
  {
    code: "YYZ",
    lat: "43.685",
    lon: "-79.6142",
    name: "Toronto Lester B Pearson International Airport",
    city: "Mississauga",
    state: "Ontario",
    country: "Canada",
    woeid: "12511883",
    tz: "America/Toronto",
    phone: "",
    type: "Airports",
    email: "",
    url: "http://www.gtaa.com/",
    runway_length: "11120",
    elev: "569",
    icao: "CYYZ",
    direct_flights: "176",
    carriers: "66",
  },
  {
    code: "MSP",
    lat: "44.8793",
    lon: "-93.1987",
    name: "Minneapolis St Paul International Airport",
    city: "St. Paul",
    state: "Minnesota",
    country: "United States",
    woeid: "12520966",
    tz: "America/Chicago",
    phone: "",
    type: "Airports",
    email: "",
    url: "http://mspairport.com",
    runway_length: "11006",
    elev: "841",
    icao: "KMSP",
    direct_flights: "171",
    carriers: "41",
  },
  {
    code: "DXB",
    lat: "25.2509",
    lon: "55.3629",
    name: "Dubai International Airport",
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    woeid: "23388362",
    tz: "Asia/Dubai",
    phone: "+971 4 216 2525",
    type: "Airports",
    email: "",
    url: "http://www.dubaiairport.com",
    runway_length: "13123",
    elev: "34",
    icao: "OMDB",
    direct_flights: "170",
    carriers: "126",
  },
];
