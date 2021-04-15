export interface CarSearch {
  pickup_date: string; //ISO format
  /**
   * IATA code.
   */
  pickup_location: string;
  age?: number;
  dropoff_date: string;
  /**
   * ISO formatted code for the
   * origin country
   */
  country_code: string;
}

export interface Car {
  category: CarCategory;
  features: CarFeatures;
  capacity: CarCapacity;
  rate_totals: CarRateTotals;
}

export interface CarCategory {
  name: string;
  make: string;
  model: string;
  vehicle_class_name: string;
  vehicle_transmission: string;
  mpg: string;
  image_url: string;
}

export interface CarFeatures {
  bluetooth_equipped: boolean;
  smoke_free: boolean;
  air_conditioned: boolean;
  [index: string]: boolean;
}

export interface CarCapacity {
  doors: string;
  seats: string;
}

interface CarRateTotals {
  rate: { currency: string };
  pay_later: { reservation_total: number };
}

export interface CarCheckbox {
  name: string;
  checked: boolean;
}