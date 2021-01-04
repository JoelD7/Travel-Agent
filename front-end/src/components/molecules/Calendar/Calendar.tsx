import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { Grid, CardActionArea } from "@material-ui/core";
import { addDays, eachDayOfInterval, endOfMonth, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../styles";
import { areDatesEqual, eventToIcon, tripPlaceholder } from "../../../utils";
import { Trip } from "../../../utils/types/Trip";
import { IconText, Text } from "../../atoms";
import { calendarStyles } from "./calendar-styles";

interface CalendarItem {
  day: number;
  active: boolean;
  grid: number;
  date: Date;
  tripDay: boolean;
}

interface Calendar {
  baseDate: Date;
}

export function Calendar({ baseDate }: Calendar) {
  const trip: Trip = tripPlaceholder;

  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);

  const style = calendarStyles();

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

  function getCalendarItemBorder(item: CalendarItem) {
    switch (item.grid) {
      case 0:
        return style.calendarItemBorderTopLeft;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return style.calendarItemBorderTop;
      case 7:
      case 14:
      case 21:
      case 28:
      case 35:
        return style.calendarItemBorderRegLeft;
      default:
        return style.calendarItemBorderReg;
    }
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

  return (
    <Grid container className={style.calendarGrid}>
      {calendarItems.map((item, i) => (
        <CardActionArea
          disabled={!item.active}
          style={{ backgroundColor: item.tripDay ? "#002E431A" : "white" }}
          className={`${style.calendarItem} ${getCalendarItemBorder(item)}`}
        >
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={12}>
              {item.tripDay ? (
                <Text bold color={Colors.BLUE} component="h4">
                  {item.day}
                </Text>
              ) : (
                <Text color={item.active ? "black" : "#8d8d8d"} component="h4">
                  {item.day}
                </Text>
              )}
            </Grid>

            {/* Icon grid */}
            {trip.itinerary && dayHasEvents(item.date) ? (
              <Grid item xs={12} style={{ alignSelf: "flex-end", marginLeft: "auto" }}>
                <Grid container>
                  {trip.itinerary.map((event, i) => (
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
