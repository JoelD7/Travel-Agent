import { faClock, faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Grid, IconButton, useMediaQuery } from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../styles";
import {
  eventToIcon,
  EventTypes,
  HotelReservation,
  hotelRsvPlaceholder,
  setHotelRsv,
  selectFlightDetail,
  setFlightDetail,
  flightPlaceholder,
} from "../../../utils";
import { TripEvent } from "../../../utils/types/trip-types";
import { CustomButton, IconText, IconTP, Text } from "../../atoms";
import { HotelRsvDetail } from "../../organisms";
import { dayItineraryStyles } from "./dayItinerary-styles";
import { FlightDetails } from "../../../scenes";
import { NotAvailableCard } from "../../molecules";

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

  const dispatch = useDispatch();
  const [openHotelDialog, setOpenHotelDialog] = useState(false);
  const [openFlightDialog, setOpenFlightDialog] = useState(false);

  const hotelRsv: HotelReservation = hotelRsvPlaceholder;

  const flightDetail: Flight | undefined = useSelector(selectFlightDetail);

  const is430pxOrLess = useMediaQuery("(max-width:430px)");

  function DayItineraryCard({ event }: DayItineraryCard) {
    function getDetailButtonText(): string {
      switch (event.type) {
        case EventTypes.FLIGHT:
          return "Flight details";
        case EventTypes.HOTEL:
          return "Reservation details";
        default:
          return "Check out place";
      }
    }

    function onDetailButtonClick() {
      switch (event.type) {
        case EventTypes.FLIGHT:
          setOpenFlightDialog(true);
          dispatch(setFlightDetail(flightPlaceholder));
          break;
        case EventTypes.HOTEL:
          setOpenHotelDialog(true);
          dispatch(setHotelRsv(hotelRsv));
          break;
        default:
          break;
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
            <IconTP
              style={{ padding: 10 }}
              size={is430pxOrLess ? 20 : 25}
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
                    {event.includesTime
                      ? format(event.start, "PP 'at' p")
                      : format(event.start, "PP")}
                  </IconText>
                </Grid>

                {/* Button grid */}
                <Grid item className={style.detailButtonGrid}>
                  <Grid container>
                    <CustomButton
                      onClick={() => onDetailButtonClick()}
                      backgroundColor={Colors.GREEN}
                      style={{ fontSize: "16px", marginLeft: "auto", color: "white" }}
                    >
                      {getDetailButtonText()}
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

  return (
    <>
      <Dialog
        open={open}
        className={style.mainContainer}
        classes={{ paper: style.paper }}
        onClose={onClose}
        fullScreen={is430pxOrLess}
        BackdropProps={{
          timeout: 500,
          classes: { root: style.backdrop },
        }}
      >
        <Grid container>
          {/* Title */}
          <Grid item xs={12}>
            <Grid container>
              <Text
                color={Colors.BLUE}
                className={style.dialogTitle}
                bold
                component="h1"
              >{`Events on ${format(date, "MMM. dd, yyyy")}`}</Text>

              <IconButton className={style.iconButton} onClick={() => onClose()}>
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
            <NotAvailableCard title="Hey!" imageHeight={185}>
              Looks like you have no events scheduled for this day.
            </NotAvailableCard>
          )}
        </Grid>
      </Dialog>

      {flightDetail && (
        <FlightDetails
          open={openFlightDialog}
          onClose={() => setOpenFlightDialog(false)}
        />
      )}

      <HotelRsvDetail open={openHotelDialog} onClose={() => setOpenHotelDialog(false)} />
    </>
  );
}
