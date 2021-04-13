import { Routes } from "..";
import { carSearchDefault } from "../constants";
import { CarSearch } from "../types";

export function convertCarReducerToURLParams(carSearch: CarSearch): string {
  let params: string[] = [];

  params.push(carSearch.pickup_date);
  params.push(carSearch.pickup_location);
  params.push(carSearch.dropoff_date);
  params.push(carSearch.country_code);

  return `?${params.join("&")}`;
}

export function convertURLToCarReducer(urlParams: string): CarSearch {
  let keyValuePairs: string[] = urlParams.substring(1).split("&");
  let parameters: any;
  let carSearch: CarSearch;

  keyValuePairs.forEach((kvp) => {
    let key = kvp.split("=")[0];
    let value = kvp.split("=")[1];

    parameters = { ...parameters, [key]: value };
  });

  carSearch = {
    pickup_date: parameters.pickup_date,
    pickup_location: parameters.pickup_location,
    dropoff_date: parameters.dropoff_date,
    country_code: parameters.country_code,
  };

  return carSearch;
}

export function getCarRentalDefaultURL(): string {
  return `${Routes.CAR_RENTAL}${convertCarReducerToURLParams(carSearchDefault)}`;
}
