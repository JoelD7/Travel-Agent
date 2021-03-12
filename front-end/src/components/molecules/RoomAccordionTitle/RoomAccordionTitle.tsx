import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  HotelBooking,
  capitalizeString,
  HotelRooms,
  selectHotelDetail,
  HotelImage,
  HotelBedAPI,
} from "../../../utils";
import { Text } from "../../atoms";

interface RoomAccordionTitle {
  room: HotelRooms;
}

export function RoomAccordionTitle({ room }: RoomAccordionTitle) {
  const hotel: HotelBooking = useSelector(selectHotelDetail);
  let image: string = getRoomImage();

  useEffect(() => {
    image = getRoomImage();
  }, [room]);

  /**
   * Returns the highest rated image of a hotel room.
   */
  function getRoomImage(): string {
    let roomCode: string = room.code.split("-")[0];

    let roomImages: HotelImage[] = hotel.images
      .filter((image) => image.roomCode === roomCode)
      .sort((a, b) => a.visualOrder - b.visualOrder);

    return roomImages.length > 0
      ? HotelBedAPI.imageURL.standard + roomImages[0].path
      : "";
  }

  return (
    <>
      <Text component="h3" color="white" bold>
        {capitalizeString(room.name, "full sentence")}
      </Text>

      {image !== "" && (
        <img
          src={`${image}`}
          style={{
            objectFit: "cover",
            height: "150px",
          }}
          alt={`${room.name}`}
        />
      )}
    </>
  );
}
