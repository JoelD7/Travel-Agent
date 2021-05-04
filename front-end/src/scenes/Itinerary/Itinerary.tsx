import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardActionArea, Grid, IconButton, useMediaQuery } from "@material-ui/core";
import { addDays, addMonths, eachDayOfInterval, format, subMonths } from "date-fns";
import { endOfMonth, subDays } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CustomButton,
  DashDrawer,
  DayItinerary,
  Footer,
  IconText,
  Navbar,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import { areDatesEqual, tripPlaceholder } from "../../utils";
import { calendarItemHolderSelect } from "../../utils/store/calendar-slice";
import { CalendarItem, Trip, TripEvent } from "../../utils/types/trip-types";
import { itineraryStyles } from "./itinerary-styles";

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

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [baseDate, setBaseDate] = useState<Date>(new Date());

  const [openDialog, setOpenDialog] = useState(false);

  const [dateItinerary, setDayItinerary] = useState<DayItinerary>({
    events: [],
    date: new Date(Date.now()),
  });

  const is1170OrLess = useMediaQuery("(max-width:1170px)");
  const is405OrLess = useMediaQuery("(max-width:405px)");

  function getWeekDayLabel(weekDay: string): string {
    if (is1170OrLess) {
      switch (weekDay) {
        case "Sunday":
          return is405OrLess ? "S" : "Sun.";
        case "Monday":
          return is405OrLess ? "M" : "Mon.";
        case "Tuesday":
          return is405OrLess ? "T" : "Tue.";
        case "Wednesday":
          return is405OrLess ? "W" : "Wed.";
        case "Thursday":
          return is405OrLess ? "T" : "Thu.";
        case "Friday":
          return is405OrLess ? "F" : "Fri.";
        case "Saturday":
          return is405OrLess ? "S" : "Sat.";
        default:
          return "";
      }
    }

    return weekDay;
  }

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

    /**
     * Indicates whether this day has any events.
     * @param day
     * @returns
     */
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
          <div key={item.date.valueOf()} className={style.calendarItemContainer}>
            <CardActionArea
              disabled={!item.active}
              style={{ backgroundColor: getCalendarItemBackground(item) }}
              className={`${style.calendarItem}`}
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
                {trip.itinerary && dayHasEvents(item.date) ? (
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
        ))}
      </Grid>
    );
  }

  return (
    <div className={style.mainContainer}>
      <Navbar className={style.navbar} dashboard position="sticky" />
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

          {/* Week Days container */}
          <Grid container className={style.daysContainer}>
            {weekDays.map((weekDay, i) => (
              <div key={i} className={style.dayItemContainer}>
                <Grid key={i} item>
                  <Text color={"#8d8d8d"} style={{ fontSize: 18 }}>
                    {getWeekDayLabel(weekDay)}
                  </Text>
                </Grid>
              </div>
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

      <div className={style.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
