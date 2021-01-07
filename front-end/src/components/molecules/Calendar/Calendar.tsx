import { Grid, CardActionArea } from "@material-ui/core";
import { addDays, eachDayOfInterval, endOfMonth, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../styles";
import { areDatesEqual, eventToIcon, tripPlaceholder } from "../../../utils";
import {
  addCalendarItems,
  calendarItemHolderSelect,
} from "../../../utils/slices/calendar-slice";
import { Trip, TripEvent, CalendarItem } from "../../../utils/types/Trip";
import { IconText, Text } from "../../atoms";
import { calendarStyles } from "./calendar-styles";

interface Calendar {
  baseDate: Date;
}

export function Calendar({ baseDate }: Calendar) {
  const trip: Trip = tripPlaceholder;

  let calendarItemsRx = useSelector(calendarItemHolderSelect);
  const dispatch = useDispatch();

  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>(
    calendarItemsRx ? calendarItemsRx[dateToMS(baseDate)].calendarItems : []
  );

  const style = calendarStyles();

  const tripDateInterval: Date[] = eachDayOfInterval({
    start: trip.startDate,
    end: trip.endDate,
  });

  useEffect(() => {
    if (!areItemsCached(dateToMS(baseDate))) {
      initializeCalendarItems();
    } else {
      console.log("cached :p");
      setCalendarItems(calendarItemsRx[dateToMS(baseDate)].calendarItems);
    }
  }, [baseDate]);

  function areItemsCached(date: number) {
    let indexes = [];
    for (const key in calendarItemsRx) {
      if (Object.prototype.hasOwnProperty.call(calendarItemsRx, key)) {
        indexes.push(key);
      }
    }
    console.log("State indexes: ", indexes);

    return indexes.includes(date.toString());
  }

  function initializeCalendarItems() {
    console.log("get for first time");
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
    dispatch(
      addCalendarItems({
        dateIndex: dateToMS(baseDate),
        calendarItems: tempCalendarItems,
      })
    );
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

  return (
    <Grid container className={style.calendarGrid}>
      {calendarItems.map((item, i) => (
        <CardActionArea
          disabled={!item.active}
          style={{ backgroundColor: getCalendarItemBackground(item) }}
          className={`${style.calendarItem}`}
        >
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={12}>
              {item.tripDay ? (
                <Text bold color={Colors.BLUE} component="h4">
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
