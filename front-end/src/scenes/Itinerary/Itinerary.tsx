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
import { useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import {
  // Calendar,
  CustomButton,
  DashDrawer,
  DayItinerary,
  IconText,
  Navbar,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import { areDatesEqual, eventToIcon, tripPlaceholder } from "../../utils";
import { calendarItemHolderSelect } from "../../utils/store/calendar-slice";
import { CalendarItem, Trip, TripEvent } from "../../utils/types/Trip";
import { itineraryStyles } from "./itinerary-styles";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";

interface Calendar {
  baseDate: Date;
}

interface DayItinerary {
  events: TripEvent[];
  date: Date;
}

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

  const [openDialog, setOpenDialog] = useState(false);

  const [dateItinerary, setDayItinerary] = useState<DayItinerary>({
    events: [],
    date: new Date(Date.now()),
  });

  function Calendar({ baseDate }: Calendar) {
    const trip: Trip = tripPlaceholder;

    const calendarItemsRx = useSelector(calendarItemHolderSelect);

    const [calendarItems, setCalendarItems] = useState<CalendarItem[]>(
      calendarItemsRx ? calendarItemsRx[dateToMS(baseDate)].calendarItems : []
    );

    const tripDateInterval: Date[] = eachDayOfInterval({
      start: trip.startDate,
      end: trip.endDate,
    });

    useEffect(() => {
      initializeCalendarItems();
    }, [baseDate]);

    function initializeCalendarItems() {
      let firstDay = getFirstDayOfMonth(baseDate);
      let firstDayDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
      let tempCalendarItems: CalendarItem[] = [];
      let gridCount = 0;

      for (let i = 0; i < firstDay; i++) {
        let date: Date = subDays(firstDayDate, firstDay - i);
        tempCalendarItems.push({
          day: date.getDate(),
          active: false,
          date: date,
          grid: gridCount++,
          tripDay: tripIncludesDate(date),
        });
      }

      tempCalendarItems.push({
        day: firstDayDate.getDate(),
        active: true,
        date: firstDayDate,
        grid: gridCount++,
        tripDay: tripIncludesDate(firstDayDate),
      });

      let curDate = addDays(firstDayDate, 1);
      let lastWeekDay = endOfMonth(curDate).getDay();
      let lastDay = endOfMonth(curDate).getDate();

      for (let i = 1; i < lastDay; i++) {
        tempCalendarItems.push({
          day: curDate.getDate(),
          active: true,
          date: curDate,
          grid: gridCount++,
          tripDay: tripIncludesDate(curDate),
        });
        curDate = addDays(curDate, 1);
      }

      for (let i = 0; i < 6 - lastWeekDay; i++) {
        tempCalendarItems.push({
          day: curDate.getDate(),
          active: false,
          date: curDate,
          grid: gridCount++,
          tripDay: tripIncludesDate(curDate),
        });
        curDate = addDays(curDate, 1);
      }
      setCalendarItems(tempCalendarItems);
    }

    function getFirstDayOfMonth(date: Date) {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    function tripIncludesDate(date: Date) {
      let includes: boolean = false;
      tripDateInterval.forEach((d) => {
        let temp =
          date.getFullYear() === d.getFullYear() &&
          date.getMonth() === d.getMonth() &&
          date.getDate() === d.getDate();

        if (temp) {
          includes = true;
        }
      });

      return includes;
    }

    function dayHasEvents(day: Date) {
      let hasEvents = false;
      if (trip.itinerary) {
        trip.itinerary.forEach((event) => {
          if (areDatesEqual(day, event.start) || areDatesEqual(day, event.end)) {
            hasEvents = true;
            return;
          }
        });
      }
      return hasEvents;
    }

    function dateToMS(date: Date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    }

    /**
     * Returns the events that occur on date
     * @param events
     * @param date
     */
    function getEventsOnDay(events: TripEvent[], date: Date): TripEvent[] {
      return events.filter(
        (event) => areDatesEqual(event.start, date) || areDatesEqual(event.end, date)
      );
    }

    function getCalendarTextColor(item: CalendarItem) {
      if (item.tripDay) {
        return areDatesEqual(item.date, new Date(Date.now())) ? "white" : Colors.BLUE;
      }
      return areDatesEqual(item.date, new Date(Date.now()))
        ? "white"
        : item.active
        ? "black"
        : "#8d8d8d";
    }

    function getCalendarItemBackground(item: CalendarItem) {
      return areDatesEqual(item.date, new Date(Date.now()))
        ? Colors.BLUE
        : item.tripDay
        ? "#002E431A"
        : "white";
    }

    function seeDayItinerary(date: Date) {
      if (!trip.itinerary) {
        return;
      }
      let events: TripEvent[] = trip.itinerary.filter(
        (event) => areDatesEqual(event.start, date) || areDatesEqual(event.end, date)
      );

      setDayItinerary({
        events: events,
        date: date,
      });

      setOpenDialog(true);
    }

    return (
      <Grid container className={style.calendarGrid}>
        {calendarItems.map((item, i) => (
          <CardActionArea
            disabled={!item.active}
            style={{ backgroundColor: getCalendarItemBackground(item) }}
            className={`${style.calendarItem}`}
            onClick={() => seeDayItinerary(item.date)}
          >
            <Grid container style={{ height: "100%" }}>
              <Grid item xs={12}>
                {item.tripDay ? (
                  <Text bold color={getCalendarTextColor(item)} component="h4">
                    {item.day}
                  </Text>
                ) : (
                  <Text color={getCalendarTextColor(item)} component="h4">
                    {item.day}
                  </Text>
                )}
              </Grid>

              {/* Icon grid */}
              {trip.itinerary && dayHasEvents(item.date) ? (
                <Grid item xs={12} style={{ alignSelf: "flex-end", marginLeft: "auto" }}>
                  <Grid container>
                    {getEventsOnDay(trip.itinerary, item.date).map((event, i) => (
                      <IconText icon={eventToIcon(event.type)} />
                    ))}
                  </Grid>
                </Grid>
              ) : (
                <div></div>
              )}
            </Grid>
          </CardActionArea>
        ))}
      </Grid>
    );
  }

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

        <div className={style.contentBackgroundContainer}>
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

      {trip.itinerary && (
        <DayItinerary
          open={openDialog}
          events={dateItinerary.events}
          onClose={() => setOpenDialog(false)}
          date={dateItinerary.date}
        />
      )}
    </div>
  );
}
