import { Routes } from "..";
import { CarReducer } from "../store";
import { CarCheckbox, CarSearch } from "../types";
import { getDefaultCarReducer } from "./functions";

export function convertCarReducerToURLParams(carReducer: CarReducer): string {
  let params: string[] = [];

  params.push(`pickup_date=${carReducer.carSearch.pickup_date}`);
  params.push(`pickup_location=${carReducer.carSearch.pickup_location}`);
  params.push(`dropoff_date=${carReducer.carSearch.dropoff_date}`);
  params.push(`country_code=${carReducer.carSearch.country_code}`);

  let selectedBrands: string[] = carReducer.brands
    .filter((b) => b.checked)
    .map((b) => b.name);
  if (selectedBrands.length > 0) {
    params.push(`brands=${selectedBrands.sort((a, b) => a.localeCompare(b)).join(",")}`);
  }

  let selectedFeatures: string[] = carReducer.features
    .filter((f) => f.checked)
    .map((f) => f.name);
  if (selectedFeatures.length > 0) {
    params.push(
      `features=${selectedFeatures.sort((a, b) => a.localeCompare(b)).join(",")}`
    );
  }

  if (carReducer.transmission !== "") {
    params.push(`transmission=${carReducer.transmission}`);
  }

  return `?${params.join("&")}`;
}

export function convertURLToCarReducer(query: URLSearchParams): CarReducer {
  let parameters: { [index: string]: string } = {};
  let carReducer: CarReducer;

  for (const pair of Array.from(query.entries())) {
    let key = pair[0];
    let value = pair[1];

    parameters = { ...parameters, [key]: value };
  }

  let brands: CarCheckbox[] = [];
  if (parameters.brands) {
    brands = parameters.brands.split(",").map((brand: string) => {
      return {
        name: brand,
        checked: true,
      };
    });
  }

  let features: CarCheckbox[] = [];
  if (parameters.features) {
    features = parameters.features.split(",").map((feature: string) => {
      return {
        name: feature,
        checked: true,
      };
    });
  }

  carReducer = {
    carSearch: {
      pickup_date: parameters.pickup_date,
      pickup_location: parameters.pickup_location,
      dropoff_date: parameters.dropoff_date,
      country_code: parameters.country_code,
    },
    brands,
    features,
    transmission: parameters.transmission ? parameters.transmission : "",
  };

  return carReducer;
}

export function getCarRentalDefaultURL(): string {
  return `${Routes.CAR_RENTAL}${convertCarReducerToURLParams(getDefaultCarReducer())}`;
}

/**
 * Returns the feature label correspondent to the feature
 * variable.
 * @param variable
 */
export function featureVarToLabel(variable: string): string {
  switch (variable) {
    case "bluetooth_equipped":
      return "Bluetooth";
    case "smoke_free":
      return "Smoke free";
    case "air_conditioned":
      return "Air conditioned";
    default:
      return "";
  }
}