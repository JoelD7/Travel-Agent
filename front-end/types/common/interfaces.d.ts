interface ExchangeRate {
  lastUpdated: number;
  base: string;
  rates: {
    [key: string]: number;
  };
  [key: string]: ExchangeRate[keyof ExchangeRate];
}

interface HotelReservation {
  id: string;
  name: string;
  picture: string;
  stars: number;
  adults: number;
  children: number;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  cost: number;
}

/**
 * Type of event of the select element.
 */
interface SelectEvent {
  name?: string | undefined;
  value: unknown;
}
