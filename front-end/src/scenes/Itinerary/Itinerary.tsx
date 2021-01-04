import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardActionArea, Grid, IconButton, Slide } from "@material-ui/core";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  format,
  getDate,
  subMonths,
} from "date-fns";
import { endOfMonth, subDays } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  Calendar,
  CustomButton,
  DashDrawer,
  IconText,
  Navbar,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import { tripPlaceholder } from "../../utils";
import { Trip } from "../../utils/types/Trip";
import { itineraryStyles } from "./itinerary-styles";

export function Itinerary() {
  const style = itineraryStyles();

  const trip: Trip = tripPlaceholder;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [baseDate, setBaseDate] = useState<Date>(trip.startDate);

  return (
    <div className={style.mainContainer}>
      <Navbar />
      <DashDrawer />

      <div className={style.pageContentContainer}>
        <IconText
          style={{ marginBottom: "20px", marginTop: "10px" }}
          iconStyle={{ padding: "12px" }}
          shadow
          size={35}
          icon={faCalendarAlt}
        >
          <Text bold component="h1">
            {`Itinerary | ${trip.name}`}
          </Text>
        </IconText>

        {/* Date selector */}
        <Grid container>
          <CustomButton
            textColor="black"
            style={{ fontSize: "22px", fontWeight: "bold" }}
            backgroundColor="rgba(0,0,0,0)"
          >
            {format(baseDate, "MMMM yyyy")}
          </CustomButton>

          <IconButton
            onClick={() => {
              setBaseDate(subMonths(baseDate, 1));
            }}
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} color={Colors.PURPLE} />
          </IconButton>

          <IconButton
            onClick={() => {
              setBaseDate(addMonths(baseDate, 1));
            }}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} color={Colors.PURPLE} />
          </IconButton>

          <CustomButton
            rounded
            style={{ fontSize: "16px", marginLeft: "auto" }}
            backgroundColor={Colors.GREEN}
          >
            Legend
          </CustomButton>
        </Grid>

        {/* Days container */}
        <Grid container className={style.daysContainer}>
          {days.map((day, i) => (
            <Grid key={i} item className={style.dayItem}>
              <Text color={"#8d8d8d"} component="h4">
                {day}
              </Text>
            </Grid>
          ))}
        </Grid>

        {/* Calendar grid */}
        <Calendar baseDate={baseDate} />
      </div>
    </div>
  );
}
