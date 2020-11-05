import { Amenity } from "../HotelAmenities";

export interface Hotel {
  name: string;
  stars: number;
  amenities: Amenity[];
  phoneNumber: string;
  address: string;
  pricePerNight: number;
  image: string;
}
