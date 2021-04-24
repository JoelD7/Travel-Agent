import {
  faHotel,
  faLocationArrow,
  faPlaneDeparture,
  faUtensils,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { CSSProperties } from "@material-ui/styles";
import { addDays, compareAsc, format } from "date-fns";
import { DEFAULT_CURRENCY, isoCountryCodes } from "../constants";
import { iataCodes } from "../constants/iataCodes";
import { airportCityPlaceholder } from "../placeholders";
import { CarReducer, store } from "../store";
import { CityImage, EventType, ExchangeRate } from "../types";
import { IATALocation } from "../types/location-types";
export * from "./flight-functions";
export * from "./hotel-functions";

export function muiDateFormatter(
  date: MaterialUiPickersDate,
  invalidLabel: string,
  type: "date" | "datetime"
) {
  if (type === "date") {
    return date
      ? format(
          new Date(date?.getFullYear(), date?.getMonth(), date?.getDate()),
          "EEE. d/MMM, yyyy"
        )
      : "dd MMM., yyyy";
  }

  return date
    ? format(
        new Date(
          date?.getFullYear(),
          date?.getMonth(),
          date?.getDate(),
          date.getHours(),
          date.getMinutes()
        ),
        "EEE. d/MMM, yyyy 'at' h:mm"
      )
    : "dd MMM., yyyy";
}

export function getLinkStyle(color: string = "initial"): CSSProperties {
  return {
    color: color,
    textDecoration: "none",
  };
}

/**
 * Converts between currencies.
 *
 * @param value
 * @param fromCurrency If this parameter is specifically indicated as a string and not as variable,
 * this means that the API in question always returns prices in the same currency.
 * @param toCurrency
 * @param exchangeRate
 * @returns
 */
export function convertCurrency(
  value: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: ExchangeRate
) {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: toCurrency,
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  }).format;

  // From USD to anything
  if (fromCurrency === DEFAULT_CURRENCY) {
    let convertedValue = value * exchangeRate.rates[toCurrency];
    return formatter(convertedValue);

    // From anything to USD
  } else if (toCurrency === DEFAULT_CURRENCY) {
    let convertedValue = value * (1 / exchangeRate.rates[fromCurrency]);
    return formatter(convertedValue);

    // From anything to anything
  } else {
    //fromCurrency to USD
    let valueAsDollar = value * (1 / exchangeRate.rates[fromCurrency]);
    //From USD to toCurrency
    let convertedValue = valueAsDollar * exchangeRate.rates[toCurrency];
    return formatter(convertedValue);
  }
}

export function formatAsCurrency(value: number): string {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: store.getState().rootSlice.endCurrency,
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  }).format;

  return formatter(value);
}

export const formatAsDecimal = Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 2,
}).format;

/**
 * Returns an icon related to an event type.
 * @param type type of the event.
 */
export function eventToIcon(type: EventType.EventType): IconDefinition {
  switch (type) {
    case EventType.Flight:
      return faPlaneDeparture;

    case EventType.Hotel:
      return faHotel;

    case EventType.Restaurant:
      return faUtensils;

    case EventType.POI:
      return faLocationArrow;
  }
}

/**
 * Checks if two dates are equal ignoring the time values
 * @param dateOne first date
 * @param dateTwo second date
 */
export function areDatesEqual(dateOne: Date, dateTwo: Date) {
  return (
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth() &&
    dateOne.getDate() === dateTwo.getDate()
  );
}

/**
 * Returns the parent category(from the available categories)
 * to which a category belongs.
 * @param categoryId
 */
export function getPOICategoryParent(categoryId: string) {
  let categoryGroup: { [index: string]: string[] } = {
    "Arts & Entertainment": [
      "4d4b7104d754a06370d81259",
      "56aa371be4b08b9a8d5734db",
      "4fceea171983d5d06c3e9823",
      "4bf58dd8d48988d1e1931735",
      "4bf58dd8d48988d1e2931735",
      "4bf58dd8d48988d1e4931735",
      "4bf58dd8d48988d17c941735",
      "52e81612bcbc57f1066b79e7",
      "4bf58dd8d48988d18e941735",
      "5032792091d4c4b30a586d5c",
      "52e81612bcbc57f1066b79ef",
      "52e81612bcbc57f1066b79e8",
      "5f2c2834b6d05514c704451e",
      "56aa371be4b08b9a8d573532",
      "4bf58dd8d48988d1f1931735",
      "52e81612bcbc57f1066b79ea",
      "5744ccdfe4b0c0459246b4bb",
      "52e81612bcbc57f1066b79e6",
      "5642206c498e4bfca532186c",
      "52e81612bcbc57f1066b79eb",
      "5744ccdfe4b0c0459246b4b8",
      "4bf58dd8d48988d1f2931735",
      "4bf58dd8d48988d134941735",
      "4bf58dd8d48988d135941735",
      "4bf58dd8d48988d136941735",
      "4bf58dd8d48988d137941735",
      "4bf58dd8d48988d1e3931735",
      "507c8c4091d498d9fc8c67a9",
      "52e81612bcbc57f1066b79ed",
      "52e81612bcbc57f1066b79ee",
      "56aa371be4b08b9a8d573514",
      "4bf58dd8d48988d1f4931735",
      "52e81612bcbc57f1066b79e9",
      "52e81612bcbc57f1066b79ec",
      "56aa371be4b08b9a8d5734f9",
      "56aa371be4b08b9a8d573520",
      "5f2c14a5b6d05514c7042eb7",
      "4bf58dd8d48988d193941735",
    ],
    "Nightlife Spot": [
      "50327c8591d4c4b30a586d5d",
      "4d4b7105d754a06376d81259",
      "4bf58dd8d48988d121941735",
      "53e510b7498ebcb1801b55d4",
      "4bf58dd8d48988d11a941735",
      "4bf58dd8d48988d1d6941735",
    ],
    "Outdoors & Recreation": [
      "4d4b7105d754a06377d81259",
      "4f4528bc4b90abdf24c9de85",
      "52e81612bcbc57f1066b7a2b",
      "4bf58dd8d48988d1e8941735",
      "4bf58dd8d48988d1e1941735",
      "52e81612bcbc57f1066b7a2f",
      "56aa371be4b08b9a8d57351a",
      "4bf58dd8d48988d1e6941735",
      "58daa1558bbb0b01f18ec1b0",
      "4bf58dd8d48988d175941735",
      "4f452cd44b9081a197eba860",
      "56aa371be4b08b9a8d57352c",
      "5032829591d4c4b30a586d5e",
      "52e81612bcbc57f1066b7a2c",
      "4bf58dd8d48988d167941735",
      "4bf58dd8d48988d168941735",
      "4cce455aebf7b749d5e191f5",
      "52e81612bcbc57f1066b7a2e",
      "52e81612bcbc57f1066b7a2d",
      "4e39a956bd410d7aed40cbc3",
      "4eb1bf013b7b6f98df247e07",
      "52e81612bcbc57f1066b7a28",
      "56aa371be4b08b9a8d573544",
      "56aa371be4b08b9a8d57355e",
      "5fabfc8099ce226e27fe6b0d",
      "52e81612bcbc57f1066b7a22",
      "4bf58dd8d48988d1df941735",
      "4bf58dd8d48988d1e4941735",
      "56aa371be4b08b9a8d57353b",
      "56aa371be4b08b9a8d573562",
      "50aaa49e4b90af0d42d5de11",
      "56aa371be4b08b9a8d573511",
      "4bf58dd8d48988d15c941735",
      "5fac018b99ce226e27fe7573",
      "52e81612bcbc57f1066b7a12",
      "4bf58dd8d48988d1e5941735",
      "4bf58dd8d48988d15b941735",
      "4bf58dd8d48988d15f941735",
      "52e81612bcbc57f1066b7a0f",
      "52e81612bcbc57f1066b7a23",
      "56aa371be4b08b9a8d573547",
      "4bf58dd8d48988d15a941735",
      "52e81612bcbc57f1066b7a11",
      "4bf58dd8d48988d1e0941735",
      "5bae9231bedf3950379f89cd",
      "4bf58dd8d48988d160941735",
      "5744ccdfe4b0c0459246b4b5",
      "50aaa4314b90af0d42d5de10",
      "4bf58dd8d48988d161941735",
      "4bf58dd8d48988d15d941735",
      "55a5a1ebe4b013909087cb77",
      "4eb1d4d54b900d56c88a45fc",
      "52e81612bcbc57f1066b7a13",
      "4bf58dd8d48988d162941735",
      "52e81612bcbc57f1066b7a14",
      "4bf58dd8d48988d163941735",
      "52e81612bcbc57f1066b7a25",
      "5fabfe3599ce226e27fe709a",
      "5fac010d99ce226e27fe7467",
      "4bf58dd8d48988d1e7941735",
      "4bf58dd8d48988d164941735",
      "4bf58dd8d48988d15e941735",
      "52e81612bcbc57f1066b7a29",
      "52e81612bcbc57f1066b7a26",
      "56aa371be4b08b9a8d573541",
      "4eb1d4dd4b900d56c88a45fd",
      "50328a4b91d4c4b30a586d6b",
      "4bf58dd8d48988d133951735",
      "4bf58dd8d48988d165941735",
      "4bf58dd8d48988d166941735",
      "58daa1558bbb0b01f18ec1b9",
      "4eb1baf03b7b2c5b1d4306ca",
      "5bae9231bedf3950379f89d0",
      "530e33ccbcbc57f1066bbfe4",
      "50aa9e094b90af0d42d5de0d",
      "5345731ebcbc57f1066c39b2",
      "530e33ccbcbc57f1066bbff7",
      "4f2a25ac4b909258e854f55f",
      "530e33ccbcbc57f1066bbff8",
      "530e33ccbcbc57f1066bbff3",
      "530e33ccbcbc57f1066bbff9",
      "52e81612bcbc57f1066b7a10",
      "4bf58dd8d48988d159941735",
      "52e81612bcbc57f1066b7a24",
      "4bf58dd8d48988d1de941735",
      "5032848691d4c4b30a586d61",
      "56aa371be4b08b9a8d573560",
      "56aa371be4b08b9a8d5734c3",
      "4fbc1be21983fc883593e321",
      "5bae9231bedf3950379f89c7",
    ],
    "Shop & Service": [
      "4d4b7105d754a06378d81259",
      "52f2ab2ebcbc57f1066b8b56",
      "5267e446e4b0ec79466e48c4",
      "4bf58dd8d48988d116951735",
      "4bf58dd8d48988d127951735",
      "52f2ab2ebcbc57f1066b8b43",
      "4eb1c1623b7b52c0e1adc2ec",
      "5e8f50bd03c7a9000c1e2fbc",
      "5e8f501a03c7a9000c1e2e88",
      "52f2ab2ebcbc57f1066b8b44",
      "56aa371be4b08b9a8d5734d3",
      "4bf58dd8d48988d124951735",
      "52f2ab2ebcbc57f1066b8b32",
      "4bf58dd8d48988d10a951735",
      "52e81612bcbc57f1066b7a27",
      "56aa371be4b08b9a8d5734cb",
      "52f2ab2ebcbc57f1066b8b40",
      "52f2ab2ebcbc57f1066b8b42",
      "4bf58dd8d48988d115951735",
      "4bf58dd8d48988d1f1941735",
      "4bf58dd8d48988d114951735",
      "4bf58dd8d48988d11a951735",
      "5453de49498eade8af355881",
      "4eb1bdf03b7b55596b4a7491",
      "4bf58dd8d48988d117951735",
      "4f04ae1f2fb6e1c99f3db0ba",
      "52f2ab2ebcbc57f1066b8b2a",
      "52f2ab2ebcbc57f1066b8b2d",
      "5744ccdfe4b0c0459246b4c7",
      "4f4532974b9074f6e4fb0104",
      "52f2ab2ebcbc57f1066b8b31",
      "52f2ab2ebcbc57f1066b8b18",
      "5454144b498ec1f095bff2f2",
      "4d954b0ea243a5684a65b473",
      "4bf58dd8d48988d10c951735",
      "52f2ab2ebcbc57f1066b8b17",
      "5032850891d4c4b30a586d62",
      "5744ccdfe4b0c0459246b4be",
      "4bf58dd8d48988d1f6941735",
      "4bf58dd8d48988d1f4941735",
      "52dea92d3cf9994f4e043dbb",
      "52f2ab2ebcbc57f1066b8b1a",
      "5745c2e4498e11e7bccabdbd",
      "52f2ab2ebcbc57f1066b8b1d",
      "5032872391d4c4b30a586d64",
      "4bf58dd8d48988d122951735",
      "56aa371be4b08b9a8d573554",
      "5454152e498ef71e2b9132c6",
      "52f2ab2ebcbc57f1066b8b26",
      "56aa371be4b08b9a8d573523",
      "503287a291d4c4b30a586d65",
      "52f2ab2ebcbc57f1066b8b3a",
      "52f2ab2ebcbc57f1066b8b16",
      "4bf58dd8d48988d1f7941735",
      "56aa371be4b08b9a8d573505",
      "4bf58dd8d48988d11b951735",
      "4bf58dd8d48988d1f9941735",
      "5370f356bcbc57f1066c94c2",
      "4bf58dd8d48988d11d951735",
      "4bf58dd8d48988d11e951735",
      "5e18993feee47d000759b256",
      "58daa1558bbb0b01f18ec1ca",
      "4bf58dd8d48988d1fa941735",
      "4bf58dd8d48988d10e951735",
      "56aa371be4b08b9a8d573550",
      "4bf58dd8d48988d1f5941735",
      "4bf58dd8d48988d118951735",
      "50aa9e744b90af0d42d5de0e",
      "5f2c41945b4c177b9a6dc7d6",
      "58daa1558bbb0b01f18ec1e8",
      "4bf58dd8d48988d186941735",
      "52f2ab2ebcbc57f1066b8b45",
      "56aa371be4b08b9a8d573564",
      "53e0feef498e5aac066fd8a9",
      "52f2ab2ebcbc57f1066b8b46",
      "58daa1558bbb0b01f18ec1e5",
      "4bf58dd8d48988d119951735",
      "52f2ab2ebcbc57f1066b8b24",
      "52f2ab2ebcbc57f1066b8b1c",
      "4bf58dd8d48988d1f8941735",
      "55888a5a498e782e3303b43a",
      "4bf58dd8d48988d18d941735",
      "4eb1c0253b7b52c0e1adc2e9",
      "4bf58dd8d48988d113951735",
      "4bf58dd8d48988d128951735",
      "52f2ab2ebcbc57f1066b8b19",
      "4bf58dd8d48988d112951735",
      "54541900498ea6ccd0202697",
      "52f2ab2ebcbc57f1066b8b2c",
      "4bf58dd8d48988d1fb941735",
      "545419b1498ea6ccd0202f58",
      "50aaa5234b90af0d42d5de12",
      "52f2ab2ebcbc57f1066b8b36",
      "58daa1558bbb0b01f18ec1f1",
      "4bf58dd8d48988d1f0941735",
      "4bf58dd8d48988d111951735",
      "58daa1558bbb0b01f18ec1b4",
      "52f2ab2ebcbc57f1066b8b25",
      "52f2ab2ebcbc57f1066b8b33",
      "4bf58dd8d48988d1fc941735",
      "52f2ab2ebcbc57f1066b8b3f",
      "52f2ab2ebcbc57f1066b8b2b",
      "52f2ab2ebcbc57f1066b8b1e",
      "52f2ab2ebcbc57f1066b8b38",
      "52f2ab2ebcbc57f1066b8b29",
      "52c71aaf3cf9994f4e043d17",
      "50be8ee891d4fa8dcc7199a7",
      "52f2ab2ebcbc57f1066b8b3c",
      "52f2ab2ebcbc57f1066b8b27",
      "58daa1558bbb0b01f18ec206",
      "4bf58dd8d48988d1ff941735",
      "4f04afc02fb6e1c99f3db0bc",
      "56aa371be4b08b9a8d57354a",
      "5032833091d4c4b30a586d60",
      "59d79d6b2e268052fa2a3332",
      "4bf58dd8d48988d1fe941735",
      "4f04aa0c2fb6e1c99f3db0b8",
      "5f2c5a295b4c177b9a6ddd0e",
      "4f04ad622fb6e1c99f3db0b9",
      "5ae95d208a6f17002ce792b2",
      "4d954afda243a5684865b473",
      "52f2ab2ebcbc57f1066b8b2f",
      "52f2ab2ebcbc57f1066b8b22",
      "5744ccdfe4b0c0459246b4df",
      "52f2ab2ebcbc57f1066b8b35",
      "4bf58dd8d48988d121951735",
      "52f2ab2ebcbc57f1066b8b34",
      "52f2ab2ebcbc57f1066b8b23",
      "5032897c91d4c4b30a586d69",
      "4bf58dd8d48988d100951735",
      "4bf58dd8d48988d10f951735",
      "4eb1bdde3b7b55596b4a7490",
      "554a5e17498efabeda6cc559",
      "52f2ab2ebcbc57f1066b8b20",
      "52f2ab2ebcbc57f1066b8b3d",
      "52f2ab2ebcbc57f1066b8b28",
      "5744ccdfe4b0c0459246b4c4",
      "5032885091d4c4b30a586d66",
      "4bf58dd8d48988d10d951735",
      "52f2ab2ebcbc57f1066b8b37",
      "4f4531084b9074f6e4fb0101",
      "56aa371be4b08b9a8d573552",
      "4bf58dd8d48988d110951735",
      "58daa1558bbb0b01f18ec1ae",
      "52f2ab2ebcbc57f1066b8b1f",
      "52f2ab2ebcbc57f1066b8b39",
      "5744ccdfe4b0c0459246b4dc",
      "5bae9231bedf3950379f89d2",
      "56aa371be4b08b9a8d573566",
      "4bf58dd8d48988d123951735",
      "52f2ab2ebcbc57f1066b8b41",
      "52f2ab2ebcbc57f1066b8b1b",
      "4bf58dd8d48988d1ed941735",
      "4bf58dd8d48988d1f2941735",
      "52f2ab2ebcbc57f1066b8b21",
      "4f04b1572fb6e1c99f3db0bf",
      "5744ccdfe4b0c0459246b4cd",
      "5032781d91d4c4b30a586d5b",
      "4d1cf8421a97d635ce361c31",
      "4bf58dd8d48988d1de931735",
      "4bf58dd8d48988d101951735",
      "4bf58dd8d48988d1f3941735",
      "4f04b08c2fb6e1c99f3db0bd",
      "52f2ab2ebcbc57f1066b8b30",
      "56aa371be4b08b9a8d57355c",
      "5f2c1e0db6d05514c70436d4",
      "4bf58dd8d48988d10b951735",
      "4bf58dd8d48988d126951735",
      "52e816a6bcbc57f1066b7a54",
      "52f2ab2ebcbc57f1066b8b2e",
    ],
    "Historic Site": ["4deefb944765f83613cdba6e"],
    "Movie Theater": [
      "4bf58dd8d48988d17f941735",
      "56aa371be4b08b9a8d5734de",
      "4bf58dd8d48988d17e941735",
      "4bf58dd8d48988d180941735",
    ],
    Museum: [
      "4bf58dd8d48988d181941735",
      "4bf58dd8d48988d18f941735",
      "559acbe0498e472f1a53fa23",
      "4bf58dd8d48988d190941735",
      "4bf58dd8d48988d192941735",
      "4bf58dd8d48988d191941735",
    ],
    "Music Venue": [
      "4bf58dd8d48988d1e5931735",
      "4bf58dd8d48988d1e7931735",
      "4bf58dd8d48988d1e8931735",
      "4bf58dd8d48988d1e9931735",
    ],
    Theater: [],
    Stadium: [
      "4bf58dd8d48988d184941735",
      "4bf58dd8d48988d18c941735",
      "4bf58dd8d48988d18b941735",
      "4bf58dd8d48988d18a941735",
      "4bf58dd8d48988d189941735",
      "4bf58dd8d48988d185941735",
      "56aa371be4b08b9a8d573556",
      "4bf58dd8d48988d188941735",
      "4e39a891bd410d7aed40cbc2",
      "4bf58dd8d48988d187941735",
    ],
    "Theme Park": ["4bf58dd8d48988d182941735", "5109983191d435c0d71c2bb1"],
    Zoo: ["4bf58dd8d48988d17b941735", "58daa1558bbb0b01f18ec1fd"],
    Bar: [
      "4bf58dd8d48988d116941735",
      "52e81612bcbc57f1066b7a0d",
      "56aa371ce4b08b9a8d57356c",
      "4bf58dd8d48988d117941735",
      "52e81612bcbc57f1066b7a0e",
      "4bf58dd8d48988d11e941735",
      "4bf58dd8d48988d118941735",
      "4bf58dd8d48988d1d8941735",
      "4bf58dd8d48988d119941735",
      "4bf58dd8d48988d1d5941735",
      "5f2c40f15b4c177b9a6dc684",
      "4bf58dd8d48988d120941735",
      "4bf58dd8d48988d11b941735",
      "5f2c224bb6d05514c70440a3",
      "4bf58dd8d48988d11c941735",
      "4bf58dd8d48988d1d4941735",
      "4bf58dd8d48988d11d941735",
      "56aa371be4b08b9a8d57354d",
      "4bf58dd8d48988d122941735",
      "4bf58dd8d48988d123941735",
    ],
    Nightclub: ["4bf58dd8d48988d11f941735"],
    "Gym / Fitness Center": [],
    Beach: [
      "4bf58dd8d48988d1e2941735",
      "52e81612bcbc57f1066b7a30",
      "4bf58dd8d48988d1e3941735",
    ],
    "National Park": ["52e81612bcbc57f1066b7a21"],
    "Ski Area": [
      "4bf58dd8d48988d1e9941735",
      "4bf58dd8d48988d1ea941735",
      "4eb1c0ed3b7b52c0e1adc2ea",
      "4bf58dd8d48988d1ec941735",
      "4bf58dd8d48988d1eb941735",
      "4eb1c0f63b7b52c0e1adc2eb",
    ],
    "Clothing Store": [
      "4bf58dd8d48988d103951735",
      "4bf58dd8d48988d102951735",
      "4bf58dd8d48988d104951735",
      "4bf58dd8d48988d105951735",
      "4bf58dd8d48988d109951735",
      "4bf58dd8d48988d106951735",
      "4bf58dd8d48988d107951735",
      "4bf58dd8d48988d108951735",
    ],
    "Shopping Mall": ["4bf58dd8d48988d1fd941735"],
  };

  let parent = "";

  for (const parentProp in categoryGroup) {
    if (Object.prototype.hasOwnProperty.call(categoryGroup, parentProp)) {
      const parentIds = categoryGroup[parentProp];
      if (parentIds.includes(categoryId)) {
        parent = parentProp;
        break;
      }
    }
  }
  return parent;
}

export function getLocalStorageConsumption(unit: "MB" | "kB") {
  let length = JSON.stringify(localStorage).length;

  if (unit === "MB") {
    return console.log(`Local storage: ${formatAsDecimal(length / 1048576)} MB`);
  } else {
    return console.log(`Local storage: ${formatAsDecimal(length / 1024)} kB`);
  }
}

export function capitalizeString(value: string, type: "each word" | "full sentence") {
  value = value.toLowerCase();

  if (type === "each word") {
    let words = value.split(" ");
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  } else {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

export function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

export function getIataLocation(code: string): IATALocation | undefined {
  return iataCodes.find((iata) => iata.code === code);
}

/**
 * Checks if arr1 contains any of the elements in arr2
 * @param arr1
 * @param arr2
 */
export function hasAny(arr1: any[], arr2: any[]) {
  let has = false;
  arr2.forEach((e) => {
    if (arr1.includes(e)) {
      has = true;
      return;
    }
  });

  return has;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getMinDate(date1: Date, date2: Date) {
  return compareAsc(date1, date2) === 1 ? date2 : date1;
}

export function getMaxDate(date1: Date, date2: Date) {
  return compareAsc(date1, date2) === 1 ? date1 : date2;
}

export function isDateBetweenRange(date: Date, range: Date[] | undefined) {
  if (!range) {
    return false;
  }
  return compareAsc(date, range[0]) >= 0 && compareAsc(date, range[1]) <= 0;
}

/**
 * Returns true if the first date is after or equal the second one.
 */
export function isDateAfterOrEqual(date: Date, date2: Date): boolean {
  return compareAsc(date, date2) >= 0;
}

export function persistGeolocationInLocalStorage(
  geolocation: IATALocation,
  type: "originCity" | "destinationCity"
) {
  localStorage.setItem(`${type}`, JSON.stringify(geolocation));
}

export function getDefaultCity(type: "originCity" | "destinationCity"): IATALocation {
  let defaultGeolocation: IATALocation;
  let savedItem = localStorage.getItem(`${type}`);

  if (savedItem === null) {
    return airportCityPlaceholder;
  } else {
    defaultGeolocation = JSON.parse(savedItem);
    return defaultGeolocation;
  }
}

/**
 * Indicates if the value is in range(inclusive).
 */
export function isValueInRange(value: number, range: number[]): boolean {
  return value >= range[0] && value <= range[1];
}

export function getDefaultCityImage(): CityImage {
  let savedItem = localStorage.getItem(`cityImage`);

  if (savedItem === null) {
    return {
      city: "",
      image: "",
    };
  }

  return JSON.parse(savedItem);
}

export function isCityImageUpdated(
  destinationCity: IATALocation,
  cityImage: CityImage
): boolean {
  return destinationCity.city === cityImage.city;
}

export function getISOCodeFromCountry(country: string): string {
  return isoCountryCodes.filter((codes) => codes.name === country)[0]["alpha-2"];
}

export function getDefaultCarReducer(): CarReducer {
  const defaultDestinationCity: IATALocation = getDefaultCity("destinationCity");

  const carReducerDefault: CarReducer = {
    carSearch: {
      pickup_date: format(addDays(new Date(), 2), `yyyy-MM-dd'T'HH:mm:ss`),
      pickup_location: defaultDestinationCity.code,
      dropoff_date: format(addDays(new Date(), 4), `yyyy-MM-dd'T'HH:mm:ss`),
      country_code: getISOCodeFromCountry(defaultDestinationCity.country),
    },
    features: [
      {
        name: "Air conditioned",
        checked: false,
      },
      {
        name: "Bluetooth",
        checked: false,
      },
      {
        name: "Smoke free",
        checked: false,
      },
    ],
    brands: [],
    transmission: "",
  };

  return carReducerDefault;
}
