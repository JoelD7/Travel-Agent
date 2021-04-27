import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Divider, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Colors } from "../../../styles";
import {
  capitalizeString,
  convertReservationParamsToURLParams,
  ExchangeRate,
  convertToUserCurrency,
  getHotelImages,
  getHotelStars,
  getMinRate,
  HotelBooking,
  HotelBookingParams,
  Routes,
  selectEndCurrency,
  selectExchangeRate,
  selectHotelReservationParams,
  setHotelDetail,
} from "../../../utils";
import { CustomButton, IconText, Rating, Text } from "../../atoms";
import { hotelCardStyles } from "./hotelCardStyles";

interface HotelCard {
  hotel: HotelBooking;
}

export function HotelCard({ hotel }: HotelCard) {
  const history = useHistory();

  const style = hotelCardStyles();

  const dispatch = useDispatch();

  const baseCurrency: string = useSelector(selectEndCurrency);
  const exchangeRate: ExchangeRate = useSelector(selectExchangeRate);

  let reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  function getFormattedAddress(hotel: HotelBooking) {
    return hotel.address.content;
  }

  function onHotelCardClick(hotel: HotelBooking) {
    dispatch(setHotelDetail(hotel));
    history.push(
      `${Routes.HOTELS}/${hotel.code}${convertReservationParamsToURLParams(
        reservationParams,
        "hotelDetails"
      )}`
    );
  }

  return (
    <Grid
      container
      id="card"
      className={style.hotelCard}
      /**
       * Hide card if hotel has no images. It doesn't make sense to show
       * hotel info if the user cannot see the hotel.
       */
      style={!hotel.images ? { display: "none" } : {}}
    >
      {/* Image */}
      {hotel.images && (
        <Grid item className={style.hotelImageGrid} id="photo">
          {hotel.images.length > 1 && (
            <img src={`${getHotelImages(hotel)[0]}`} className={style.hotelImage} />
          )}
        </Grid>
      )}

      {/* Content */}
      <Grid item className={style.hotelContentGrid} id="content">
        <Grid container>
          {/* Title and rating */}
          <Grid item xs={12} id="title">
            <Grid
              container
              alignItems="center"
              style={{ margin: "10px 0px", paddingLeft: "10px" }}
            >
              <Grid item xs={12}>
                <Text component="h3" className={style.hotelName} bold color={Colors.BLUE}>
                  {capitalizeString(hotel.name.content, "each word")}
                </Text>
              </Grid>

              <Grid item xs={12}>
                <Rating readonly type="star" score={getHotelStars(hotel)} />
              </Grid>
            </Grid>
          </Grid>

          {/* Card content */}
          <Grid container className={style.defaultContentContainer}>
            {/* Price and details button */}
            <Grid item className={style.priceAndDetailsGrid}>
              <div>
                <h4 style={{ textAlign: "center" }}>{`From ${convertToUserCurrency(
                  getMinRate(hotel.rooms),
                  "USD"
                )}`}</h4>
                <CustomButton
                  backgroundColor={Colors.PURPLE}
                  onClick={() => onHotelCardClick(hotel)}
                >
                  View details
                </CustomButton>
              </div>
            </Grid>

            <Grid item style={{ height: "90%" }}>
              <Divider orientation="vertical" />
            </Grid>

            {/* Contact and address */}
            <Grid item className={style.addressContactGrid}>
              <div>
                <p className={style.cardText}>
                  <b>Hotel info</b>
                </p>

                <IconText
                  text={hotel.phones[0].phoneNumber}
                  icon={faPhone}
                  style={{ marginBottom: "5px" }}
                />

                <IconText
                  text={capitalizeString(getFormattedAddress(hotel), "full sentence")}
                  icon={faMapMarkerAlt}
                />
              </div>
            </Grid>
          </Grid>

          {/* Card content for SM size */}
          <Grid container className={style.smContentContainer}>
            {/* Price and details button */}
            <Grid item xs={12}>
              <div style={{ paddingLeft: "10px" }}>
                <IconText
                  text={hotel.phones[0].phoneNumber}
                  icon={faPhone}
                  style={{ marginBottom: "5px" }}
                />

                <IconText
                  text={capitalizeString(getFormattedAddress(hotel), "full sentence")}
                  icon={faMapMarkerAlt}
                />
              </div>
            </Grid>

            <Grid item xs={12} style={{ padding: "10px" }}>
              <Grid container>
                <Text component="h3" bold>{`From ${convertToUserCurrency(
                  getMinRate(hotel.rooms),
                  "USD"
                )}`}</Text>
                <CustomButton
                  style={{
                    margin: "auto 0px auto auto",
                    fontSize: "16px",
                  }}
                  backgroundColor={Colors.PURPLE}
                  onClick={() => history.push(`${Routes.HOTELS}/${hotel.code}`)}
                >
                  View details
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
