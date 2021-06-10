import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardActionArea, Grid, Grow } from "@material-ui/core";
import { addDays, eachDayOfInterval, parseISO } from "date-fns";
import { endOfMonth, subDays } from "date-fns/esm";
import { default as React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text } from "../../components";
import { itineraryStyles } from "../../scenes/Itinerary/itinerary-styles";
import { Colors } from "../../styles";
import { areDatesEqual } from "../../utils";
import { calendarItemHolderSelect } from "../../utils/store/calendar-slice";
import { CalendarItem, Trip, TripEvent } from "../../utils/types/trip-types";
import { DayItinerary } from "./DayItinerary/DayItinerary";

interface Calendar {
  baseDate: Date;
  prevBaseDate: Date;
  trip: Trip | undefined;
}

interface DayItinerary {
  events: TripEvent[];
  date: Date;
}

export const Calendar = React.memo(function Calendar({
  baseDate,
  trip,
  prevBaseDate,
}: Calendar) {
  const style = itineraryStyles();

  const calendarItemsRx = useSelector(calendarItemHolderSelect);

  const [openDialog, setOpenDialog] = useState(false);
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>(
    calendarItemsRx ? calendarItemsRx[dateToMS(baseDate)].calendarItems : []
  );
  const [dateItinerary, setDayItinerary] = useState<DayItinerary>({
    events: [],
    date: new Date(Date.now()),
  });

  const tripDateInterval: Date[] = eachDayOfInterval({
    start: trip ? trip.startDate : new Date(),
    end: trip ? trip.endDate : new Date(),
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

  /**
   * Indicates whether this day has any events.
   * @param day
   * @returns
   */
  function dayHasEvents(day: Date) {
    let hasEvents = false;
    if (trip && trip.itinerary) {
      trip.itinerary.forEach((event) => {
        if (
          areDatesEqual(day, parseISO(event.start)) ||
          areDatesEqual(day, parseISO(event.end))
        ) {
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
    if (trip === undefined || !trip.itinerary) {
      return;
    }
    let events: TripEvent[] = trip.itinerary.filter(
      (event) =>
        areDatesEqual(parseISO(event.start), date) ||
        areDatesEqual(parseISO(event.end), date)
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
        <Grow
          key={item.date.valueOf()}
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          timeout={1000}
        >
          <div className={style.calendarItemContainer}>
            <CardActionArea
              disabled={!item.active}
              style={{ backgroundColor: getCalendarItemBackground(item) }}
              className={style.calendarItem}
              onClick={() => seeDayItinerary(item.date)}
            >
              <Grid container style={{ height: "100%" }}>
                {/* Day number grid */}
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
                {trip && trip.itinerary && dayHasEvents(item.date) ? (
                  <Grid item xs={12} className={style.iconGrid}>
                    <Grid container>
                      <FontAwesomeIcon size="xs" color={Colors.PURPLE} icon={faCircle} />
                    </Grid>
                  </Grid>
                ) : (
                  <div></div>
                )}
              </Grid>
            </CardActionArea>
          </div>
        </Grow>
      ))}

      {trip && trip.itinerary && (
        <DayItinerary
          open={openDialog}
          events={dateItinerary.events}
          onClose={() => setOpenDialog(false)}
          date={dateItinerary.date}
        />
      )}
    </Grid>
  );
});
