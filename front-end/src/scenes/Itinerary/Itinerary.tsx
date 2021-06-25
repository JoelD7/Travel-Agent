import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, useMediaQuery } from "@material-ui/core";
import { addMonths, format, subMonths } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import {
  Calendar,
  CustomButton,
  DashDrawer,
  IconText,
  Navbar,
  ProgressCircle,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  selectLastTrip,
  selectIsAuthenticated,
  backend,
  responseTripToDomainTrip,
  selectTripDetail,
  setTripDetail,
  Routes,
} from "../../utils";
import { Trip } from "../../utils/types/trip-types";
import { itineraryStyles } from "./itinerary-styles";

interface Calendar {
  baseDate: Date;
}

export function Itinerary() {
  const style = itineraryStyles();

  const trip: Trip | undefined = useSelector(selectTripDetail);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const lastTrip: Trip | undefined = useSelector(selectLastTrip);

  const dispatch = useDispatch();
  const routeLocation = useLocation();
  const history = useHistory();

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
  const [prevBaseDate, setPrevBaseDate] = useState<Date>(subMonths(baseDate, 1));
  const [loading, setLoading] = useState<boolean>(true);
  const [noItinerary, setNoItinerary] = useState<boolean>(false);

  const is1170OrLess = useMediaQuery("(max-width:1170px)");
  const is405OrLess = useMediaQuery("(max-width:405px)");

  const mainRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (trip) {
      setLoading(false);
    } else {
      if (routeLocation.search !== "" || lastTrip) {
        let tripUuid = lastTrip
          ? lastTrip.uuid
          : routeLocation.search.substring(1).split("=")[1];

        if (lastTrip) {
          history.push(`${Routes.ITINERARY}?trip=${lastTrip.uuid}`);
        }

        backend
          .get(`/trip/${tripUuid}`)
          .then((res) => {
            dispatch(setTripDetail(responseTripToDomainTrip(res.data)));
            setNoItinerary(false);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        setNoItinerary(true);
        setLoading(false);
      }
    }
  }, [lastTrip]);

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

  return (
    <div className={style.mainContainer} ref={mainRef}>
      <Navbar className={style.navbar} variant="dashboard" position="sticky" />
      <DashDrawer />

      {loading && (
        <Grid container style={{ height: "85vh" }}>
          <ProgressCircle />
        </Grid>
      )}

      {trip && (
        <div className={style.pageContentContainer}>
          {noItinerary ? (
            <>
              <Grid container style={{ height: "85vh", alignContent: "center" }}>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Text color={Colors.GRAY_TEXT}>
                      Here you'll be able to see the schedule for all the activities and
                      reservations related to your trip.
                    </Text>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container justify="center">
                    {isAuthenticated ? (
                      <CustomButton
                        backgroundColor={Colors.GREEN}
                        onClick={() => history.push(Routes.CREATE_TRIP)}
                      >
                        Create trip
                      </CustomButton>
                    ) : (
                      <CustomButton
                        backgroundColor={Colors.GREEN}
                        onClick={() => Routes.LOGIN}
                      >
                        Login to create a trip
                      </CustomButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
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
                      setPrevBaseDate(baseDate);
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronCircleLeft} color={Colors.PURPLE} />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setBaseDate(addMonths(baseDate, 1));
                      setPrevBaseDate(baseDate);
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

                <Calendar trip={trip} baseDate={baseDate} prevBaseDate={prevBaseDate} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
