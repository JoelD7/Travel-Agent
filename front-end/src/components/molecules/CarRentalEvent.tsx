import { faCar, faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Grid, useMediaQuery } from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Colors } from "../../styles";
import { CarRsv, setCarRsv } from "../../utils";
import { CustomButton, IconText, IconTP, Text } from "../atoms";
import { CarRsvDetails } from "../organisms";
import { dayItineraryStyles } from "../organisms/DayItinerary/dayItinerary-styles";

interface CarRentalEventProps {
  carRsv: CarRsv;
  eventDate: Date;
}

export function CarRentalEvent({ carRsv, eventDate }: CarRentalEventProps) {
  const style = dayItineraryStyles();
  const is430pxOrLess = useMediaQuery("(max-width:430px)");
  const dispatch = useDispatch();
  const [openCarDialog, setOpenCarDialog] = useState(false);

  function seeReservationDetails() {
    setOpenCarDialog(true);
    dispatch(setCarRsv(carRsv));
  }

  return (
    <Grid container className={style.cardGrid}>
      {/* Event Icon */}
      <Grid item xs={2}>
        <Grid container style={{ height: "100%" }} justify="center" alignContent="center">
          <IconTP style={{ padding: 10 }} size={is430pxOrLess ? 20 : 25} icon={faCar} />
        </Grid>
      </Grid>

      {/* Content */}
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12}>
            <Text component="h4" bold color={"white"}>
              {`Car rental | ${carRsv.name}`}
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
              {carRsv.location}
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

      <CarRsvDetails open={openCarDialog} onClose={() => setOpenCarDialog(false)} />
    </Grid>
  );
}
