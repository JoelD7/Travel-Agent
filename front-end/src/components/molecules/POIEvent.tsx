import { faCar, faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Grid, useMediaQuery } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { useHistory } from "react-router";
import { Colors } from "../../styles";
import { Routes } from "../../utils";
import { CustomButton, IconText, IconTP, Text } from "../atoms";
import { dayItineraryStyles } from "../organisms/DayItinerary/dayItinerary-styles";

interface POIEventProps {
  eventDate: Date;
  poi: RsvPOI;
}

export function POIEvent({ poi, eventDate }: POIEventProps) {
  const style = dayItineraryStyles();
  const is430pxOrLess = useMediaQuery("(max-width:430px)");
  const history = useHistory();

  function seePOI() {
    history.push(`${Routes.THINGS_TODO}/${poi.id}`);
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
              {`Visit to ${poi.name}`}
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
              {poi.formattedAddress}
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
                    onClick={() => seePOI()}
                    backgroundColor={Colors.GREEN}
                    style={{ fontSize: "16px", marginLeft: "auto", color: "white" }}
                  >
                    Check out place
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
