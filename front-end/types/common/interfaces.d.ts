interface HotelReservationTemp {
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
