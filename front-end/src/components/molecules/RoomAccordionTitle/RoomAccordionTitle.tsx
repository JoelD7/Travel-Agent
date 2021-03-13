import { faCalendar, faBed, faUser, faChild } from "@fortawesome/free-solid-svg-icons";
import { CardActionArea, Grid, makeStyles } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Colors, Shadow } from "../../../styles";
import {
  HotelBooking,
  capitalizeString,
  HotelRooms,
  selectHotelDetail,
  HotelImage,
  HotelBedAPI,
  formatAsCurrency,
  getMinRate,
  selectHotelReservationParams,
  HotelBookingParams,
  getRoomTotalPrice,
  HotelRoomRate,
} from "../../../utils";
import { Text, IconText } from "../../atoms";

interface RoomAccordionTitle {
  room: HotelRooms;
}

export function RoomAccordionTitle({ room }: RoomAccordionTitle) {
  const hotel: HotelBooking = useSelector(selectHotelDetail);
  const reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  let image: string = getRoomImage();

  const accordionTitleStyles = makeStyles(() => ({
    cardArea: {
      width: "auto",
      height: "100%",
    },
    contentContainer: {
      width: "50%",
    },
    image: {
      objectFit: "cover",
      height: "260px",
      borderRadius: "5px",
    },
    imageContainer: {
      width: "49%",
      height: "100%",
    },
    reservationInfoContainer: {
      marginLeft: "auto",
      borderRadius: "10px",
      backgroundColor: Colors.BLUE,
      boxShadow: Shadow.MEDIUM,
      padding: "10px",
    },
  }));

  const style = accordionTitleStyles();

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

  function getOccupancyText(param: "room" | "adult") {
    let roomQty = reservationParams.occupancies[0].rooms > 1 ? "rooms" : "room";
    let adultQty = reservationParams.occupancies[0].adults > 1 ? "adults" : "adult";

    return param === "room"
      ? `${reservationParams.occupancies[0].rooms} ${roomQty}`
      : `${reservationParams.occupancies[0].adults} ${adultQty}`;
  }

  function getMinRateForRoom(): number {
    let rates: HotelRoomRate[] = room.rates;

    let minRate = rates.reduce((prev: HotelRoomRate, cur: HotelRoomRate) => {
      let totalPrev = getRoomTotalPrice(prev);
      let totalCur = getRoomTotalPrice(cur);

      return totalPrev < totalCur ? prev : cur;
    }, rates[0]);

    return getRoomTotalPrice(minRate);
  }

  return (
    <Grid container>
      {/* Image */}
      {image !== "" && (
        <Grid item className={style.imageContainer}>
          <img src={`${image}`} className={style.image} alt={`${room.name}`} />
        </Grid>
      )}

      {/* Reservation info */}
      <Grid item className={style.contentContainer}>
        <Text component="h3" color={Colors.BLUE} bold>
          {capitalizeString(room.name, "full sentence")}
        </Text>

        <Grid item style={{ width: "80%", padding: "5px" }}>
          <Grid container className={style.reservationInfoContainer}>
            <Grid item xs={12}>
              <Text color="white" component="h5">
                Rates starting at
              </Text>
            </Grid>

            <Grid item xs={12}>
              <Text color="white" component="h3" bold>
                {formatAsCurrency(getMinRateForRoom())}
              </Text>
            </Grid>

            {/* Dates */}
            {hotel.checkIn && hotel.checkOut && (
              <>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <IconText textColor="white" icon={faCalendar} fontSize={16}>
                    <p style={{ margin: "0" }}>
                      <b>Check in: </b>
                      {format(parseISO(hotel.checkIn), "dd MMM., yyyy")}
                    </p>
                  </IconText>
                </Grid>

                <Grid item xs={12}>
                  <IconText textColor="white" icon={faCalendar} fontSize={16}>
                    <p style={{ margin: "0" }}>
                      <b>Check out: </b>
                      {format(parseISO(hotel.checkOut), "dd MMM., yyyy")}
                    </p>
                  </IconText>
                </Grid>
              </>
            )}

            {/* Occupancy params */}
            <Grid item xs={12}>
              <IconText textColor="white" icon={faBed} fontSize={16}>
                {getOccupancyText("room")}
              </IconText>
            </Grid>
            <Grid item xs={12}>
              <IconText textColor="white" icon={faUser} fontSize={16}>
                {getOccupancyText("adult")}
              </IconText>
            </Grid>

            {reservationParams.occupancies[0].children > 0 && (
              <Grid item xs={12}>
                <IconText
                  textColor="white"
                  icon={faChild}
                  fontSize={16}
                >{`${reservationParams.occupancies[0].children} children`}</IconText>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
