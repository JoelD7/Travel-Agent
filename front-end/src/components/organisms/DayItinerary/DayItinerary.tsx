import { faClock, faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Grid, IconButton, useMediaQuery } from "@material-ui/core";
import { compareAsc, format, parseISO } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FlightDetails } from "../../../scenes";
import { Colors } from "../../../styles";
import {
  eventToIcon,
  EventTypes,
  flightPlaceholder,
  getIataLocation,
  getLastSegment,
  HotelReservation,
  hotelRsvPlaceholder,
  IATALocation,
  mapFlightToDomainType,
  mapHotelDTOToDomainType,
  Routes,
  selectFlightDetail,
  setCarRsv,
  setFlightDetail,
  setHotelRsv,
} from "../../../utils";
import { TripEvent } from "../../../utils/types/trip-types";
import { CustomButton, IconText, IconTP, Text } from "../../atoms";
import {
  CarRentalEvent,
  FlightEvent,
  HotelEvent,
  NotAvailableCard,
  POIEvent,
} from "../../molecules";
import { HotelRsvDetail } from "../../organisms";
import { CarRsvDetails } from "../CarRsvDetails";
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

  const is430pxOrLess = useMediaQuery("(max-width:430px)");

  function DayItineraryCard({ event }: DayItineraryCard) {
    if (event.type === EventTypes.FLIGHT && event.flight) {
      return <FlightEvent flight={event.flight} eventDate={date} />;
    }

    if (event.type === EventTypes.HOTEL && event.hotelReservation !== null) {
      return (
        <HotelEvent
          hotelRsv={mapHotelDTOToDomainType(event.hotelReservation)}
          eventDate={date}
        />
      );
    }

    if (event.type === EventTypes.CAR_RENTAL && event.carRental) {
      return <CarRentalEvent carRsv={event.carRental} eventDate={date} />;
    }

    if (event.type === EventTypes.POI && event.poi) {
      return <POIEvent poi={event.poi} eventDate={date} />;
    }

    return <div></div>;
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
    </>
  );
}
