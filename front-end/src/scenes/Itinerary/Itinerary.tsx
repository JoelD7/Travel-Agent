import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { Grid } from "@material-ui/core";
import { addDays, eachDayOfInterval, format, getDate } from "date-fns";
import { endOfMonth, subDays } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { DashDrawer, IconText, Navbar, Text } from "../../components";
import { Colors } from "../../styles";
import { tripPlaceholder } from "../../utils";
import { itineraryStyles } from "./itinerary-styles";

interface CalendarItem {
  day: number;
  active: boolean;
  grid: number;
  date: Date;
  tripDay: boolean;
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

  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);
  const [month, setMonth] = useState<number>(new Date(Date.now()).getMonth());

  const tripDateInterval: Date[] = eachDayOfInterval({
    start: trip.startDate,
    end: trip.endDate,
  });

  useEffect(() => {
    initializeCalendarItems();
  }, []);

  function initializeCalendarItems() {
    let firstDay = getFirstDayOfMonth(new Date(Date.now()));
    let firstDayDate = new Date(
      trip.startDate.getFullYear(),
      trip.startDate.getMonth(),
      1
    );
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

    for (let i = lastWeekDay, j = lastDay + 1; i < 6 - lastWeekDay; i++, j++) {
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
        <Grid container className={style.calendarGrid}>
          {calendarItems.map((item, i) => (
            <Grid
              item
              key={i}
              className={`${style.calendarItem} ${getCalendarItemBorder(item)}`}
              style={{ backgroundColor: item.tripDay ? "#002E431A" : "white" }}
            >
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
          ))}
        </Grid>
      </div>
    </div>
  );
}
