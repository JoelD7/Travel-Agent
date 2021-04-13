import { CarSearch } from "../types";

export function convertCarSearchToURLParams(carSearch: CarSearch): string {
  let params: string[] = [];

  params.push(carSearch.pickup_date);
}
