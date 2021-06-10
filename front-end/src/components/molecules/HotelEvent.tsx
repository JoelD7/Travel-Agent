import { faClock, faHotel, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Grid, useMediaQuery } from "@material-ui/core";
import { compareAsc, format } from "date-fns";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Colors } from "../../styles";
import { HotelReservation, setHotelRsv } from "../../utils";
import { CustomButton, IconText, IconTP, Text } from "../atoms";
import { HotelRsvDetail } from "../organisms";
import { dayItineraryStyles } from "../organisms/DayItinerary/dayItinerary-styles";

interface HotelEvent {
  hotelRsv: HotelReservation;
  eventDate: Date;
}

export function HotelEvent({ hotelRsv, eventDate }: HotelEvent) {
  const style = dayItineraryStyles();
  const is430pxOrLess = useMediaQuery("(max-width:430px)");
  const dispatch = useDispatch();
  const [openHotelDialog, setOpenHotelDialog] = useState(false);

  function getHotelEventName() {
    return isCheckInOnDate()
      ? `Check in to hotel ${hotelRsv.name}`
      : `Check out of hotel ${hotelRsv.name}`;
  }

  function isCheckInOnDate(): boolean {
    return compareAsc(hotelRsv.checkIn, eventDate) === 0;
  }

  function seeReservationDetails() {
    setOpenHotelDialog(true);
    dispatch(setHotelRsv(hotelRsv));
  }

  return (
    <Grid container className={style.cardGrid}>
      {/* Event Icon */}
      <Grid item xs={2}>
        <Grid container style={{ height: "100%" }} justify="center" alignContent="center">
          <IconTP style={{ padding: 10 }} size={is430pxOrLess ? 20 : 25} icon={faHotel} />
        </Grid>
      </Grid>

      {/* Content */}
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12}>
            <Text component="h4" bold color={"white"}>
              {getHotelEventName()}
            </Text>
          </Grid>

          <Grid item xs={12}>
            <IconText
              style={{ fontSize: "14px" }}
              icon={faMapMarkerAlt}
              iconColor="white"
              textColor="white"
              backgroundColor={Colors.BLUE}
            >
              {hotelRsv.address}
            </IconText>
          </Grid>

          {/* Datetime and detail button */}
          <Grid item xs={12}>
            <Grid container>
              {/* Datetime grid */}
              <Grid item className={style.datetimeGrid}>
                <IconText
                  style={{ fontSize: "14px" }}
                  icon={faClock}
                  iconColor="white"
                  textColor="white"
                  backgroundColor={Colors.BLUE}
                >
                  {format(eventDate, "PP")}
                </IconText>
              </Grid>

              {/* Button grid */}
              <Grid item className={style.detailButtonGrid}>
                <Grid container>
                  <CustomButton
                    onClick={() => seeReservationDetails()}
                    backgroundColor={Colors.GREEN}
                    style={{ fontSize: "16px", marginLeft: "auto", color: "white" }}
                  >
                    Reservation details
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <HotelRsvDetail open={openHotelDialog} onClose={() => setOpenHotelDialog(false)} />
    </Grid>
  );
}
