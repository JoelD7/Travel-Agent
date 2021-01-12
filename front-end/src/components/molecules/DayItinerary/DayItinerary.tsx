import {
  faClock,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardActionArea, Dialog, Grid, IconButton } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { Colors } from "../../../styles";
import { eventToIcon, EventType } from "../../../utils";
import { TripEvent } from "../../../utils/types/Trip";
import { CustomButton, IconText, Text } from "../../atoms";
import { dayItineraryStyles } from "./dayItinerary-styles";

interface DayItinerary {
  open: boolean;
  date: Date;
  events: TripEvent[];
  onClose: () => void;
}

interface DayItineraryCard {
  event: TripEvent;
}

export function DayItinerary({ open, events, date, onClose }: DayItinerary) {
  const style = dayItineraryStyles();

  function DayItineraryCard({ event }: DayItineraryCard) {
    function getDetailButtonText(): string {
      switch (event.type) {
        case EventType.Flight:
          return "Flight details";
        case EventType.Hotel:
          return "Reservation details";
        default:
          return "Check out place";
      }
    }

    return (
      <Grid container className={style.cardGrid}>
        {/* Event Icon */}
        <Grid item xs={2}>
          <Grid
            container
            style={{ height: "100%" }}
            justify="center"
            alignContent="center"
          >
            <IconText
              iconStyle={{ padding: "12px" }}
              shadow
              size={25}
              icon={eventToIcon(event.type)}
            />
          </Grid>
        </Grid>

        {/* Content */}
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Text component="h4" bold color={"white"}>
                {event.name}
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
                {event.location}
              </IconText>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <IconText
                  style={{ fontSize: "14px" }}
                  icon={faClock}
                  iconColor="white"
                  textColor="white"
                  backgroundColor={Colors.BLUE}
                >
                  {event.time
                    ? format(event.start, "PP 'at' p")
                    : format(event.start, "PP")}
                </IconText>
                <CustomButton
                  backgroundColor={Colors.PURPLE}
                  style={{ fontSize: "16px", marginLeft: "auto", color: "white" }}
                >
                  {getDetailButtonText()}
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Dialog
      open={open}
      className={style.mainContainer}
      classes={{ paper: style.paper }}
      onClose={onClose}
    >
      <Grid container>
        {/* Title */}
        <Grid item xs={12}>
          <Grid container>
            <Text
              color={Colors.BLUE}
              style={{ padding: "20px" }}
              bold
              component="h1"
            >{`Events on ${format(date, "MMM. dd, yyyy")}`}</Text>

            <IconButton
              style={{ width: "45px", height: "45px" }}
              className={style.iconButton}
              onClick={() => onClose()}
            >
              <FontAwesomeIcon size="sm" icon={faTimes} color={Colors.BLUE} />
            </IconButton>
          </Grid>
        </Grid>

        {events.length > 0 ? (
          // Cards
          <Grid item xs={12} className={style.cardsContainer}>
            {events.map((event, i) => (
              <DayItineraryCard key={i} event={event} />
            ))}
          </Grid>
        ) : (
          <Text component="h2" bold color={Colors.BLUE}>
            You have no events schedule for this day.
          </Text>
        )}
      </Grid>
    </Dialog>
  );
}
