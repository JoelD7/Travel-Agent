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
import { CustomButton, DashDrawer, IconText, Navbar, Text } from "../../components";
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

  const [index, setIndex] = useState<number>(0);

  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);
  const [month, setMonth] = useState<number>(trip.startDate.getMonth());

  const [baseDate, setBaseDate] = useState<Date>(trip.startDate);

  const [direction, setDirection] = useState<"left" | "right">("left");

  const [slideIn, setSlideIn] = useState<boolean>(true);

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
              // setSlideIn(false);
              setBaseDate(subMonths(baseDate, 1));
              // setTimeout(() => {
              //   setDirection("right");
              //   setSlideIn(true);
              // }, 100);
            }}
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} color={Colors.PURPLE} />
          </IconButton>

          <IconButton
            onClick={() => {
              // setSlideIn(false);
              setBaseDate(addMonths(baseDate, 1));
              // setTimeout(() => {
              //   setDirection("left");
              //   setSlideIn(true);
              // }, 100);
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
        <Slide direction={direction} in={slideIn} mountOnEnter unmountOnExit>
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
                  <Grid
                    item
                    xs={12}
                    style={{ alignSelf: "flex-end", marginLeft: "auto" }}
                  >
                    <Grid container>
                      <IconText icon={faPlaneDeparture} />
                      <IconText icon={faPlaneDeparture} />
                    </Grid>
                  </Grid>
                </Grid>
              </CardActionArea>
            ))}
          </Grid>
        </Slide>
      </div>
    </div>
  );
}
