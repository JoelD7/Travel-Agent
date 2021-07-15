import { faCalendar, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Direction, Grid, Grow, IconButton, Slide, useTheme } from "@material-ui/core";
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import {
  CustomButton,
  DashDrawer,
  Navbar,
  PicturesAndKeyDetails,
  ProgressCircle,
  ReservedCars,
  RsvHotels,
  Text,
  TripFlights,
  TripPOIs,
  TripRestaurants,
  TripTabBar,
} from "../../components";
import { Colors } from "../../styles";
import {
  backend,
  CarRsv,
  EventTypes,
  HotelReservation,
  mapFlightToDomainType,
  mapHotelDTOToDomainType,
  responseTripToDomainTrip,
  Routes,
  selectIsAuthenticated,
  selectTripDetail,
  selectUserCurrency,
  setCarReservations,
  setTripDetail,
  Trip,
} from "../../utils";
import { tripStyles } from "./trip-styles";

interface TabPanel {
  children: ReactNode;
  key: number;
  index: number;
  value: number;
  dir: Direction;
}

export function TripDetails() {
  const style = tripStyles();
  const trip: Trip | undefined = useSelector(selectTripDetail);

  const [tabIndex, setTabIndex] = useState(0);
  const [prevTabIndex, setPrevTabIndex] = useState(0);
  const [loading, setLoading] = useState(trip === undefined);
  const MUtheme = useTheme();
  //@ts-ignore
  const { uuid } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  const VirtualizeSwipeableViews = virtualize(SwipeableViews);
  const userCurrency: string = useSelector(selectUserCurrency);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const mainRef = React.createRef<HTMLDivElement>();

  const tripCoverBackground: CSSProperties = {
    backgroundImage: trip
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${trip.coverPhoto})`
      : "",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
  };

  useEffect(() => {
    if (isAuthenticated) {
      backend
        .get(`/trip/${uuid}`)
        .then((res) => {
          dispatch(setTripDetail(responseTripToDomainTrip(res.data)));
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (trip) {
      setTripCarRentals();
    }
  }, [trip]);

  function TabPanel({ children, index, value, dir, key }: TabPanel) {
    return (
      <div key={key} dir={dir} hidden={value !== index}>
        <Slide direction={getSlideDirection(index)} in={true} mountOnEnter unmountOnExit>
          <div>{value === index && children}</div>
        </Slide>
      </div>
    );
  }

  function getTripFlights(): Flight[] {
    let flights: Flight[] = [];

    if (trip && trip.itinerary) {
      trip.itinerary
        .filter((event) => event.type === EventTypes.FLIGHT)
        .forEach((event) => {
          if (event.flight !== null && event.flight) {
            flights.push(event.flight);
          }
        });
    }

    return flights;
  }

  function getTripHotelRsv(): HotelReservation[] {
    let hotels: HotelReservation[] = [];

    if (trip && trip.itinerary) {
      trip.itinerary
        .filter((event) => event.type === EventTypes.HOTEL)
        .forEach((event) => {
          if (event.hotelReservation !== null && event.hotelReservation) {
            hotels.push(mapHotelDTOToDomainType(event.hotelReservation));
          }
        });
    }

    return hotels;
  }

  function getTripRestaurants(): RsvRestaurant[] {
    let restaurants: RsvRestaurant[] = [];

    if (trip && trip.itinerary) {
      trip.itinerary
        .filter((event) => event.type === EventTypes.RESTAURANT)
        .forEach((event) => {
          if (event.restaurant !== null && event.restaurant) {
            restaurants.push(event.restaurant);
          }
        });
    }

    return restaurants;
  }

  function getTripPOIs(): RsvPOI[] {
    let pois: RsvPOI[] = [];

    if (trip && trip.itinerary) {
      trip.itinerary
        .filter((event) => event.type === EventTypes.POI)
        .forEach((event) => {
          if (event.poi !== null && event.poi) {
            pois.push(event.poi);
          }
        });
    }

    return pois;
  }

  function setTripCarRentals() {
    let cars: CarRsv[] = [];

    if (trip && trip.itinerary) {
      trip.itinerary
        .filter((event) => event.type === EventTypes.CAR_RENTAL)
        .forEach((event) => {
          if (event.carRental !== null && event.carRental) {
            cars.push(event.carRental);
          }
        });
    }

    dispatch(setCarReservations(cars));
  }

  function TabViews(index: number, key: number) {
    switch (index) {
      case 0:
        return <div key={key}></div>;
      case 1:
        return (
          <div key={key}>
            {trip && tabIndex === index && (
              <TabPanel key={1} value={tabIndex} index={1} dir={MUtheme.direction}>
                <PicturesAndKeyDetails trip={trip} />
              </TabPanel>
            )}
          </div>
        );
      case 2:
        return (
          <div key={key}>
            {trip && tabIndex === index && (
              <TabPanel key={2} value={tabIndex} index={2} dir={MUtheme.direction}>
                <Text
                  bold
                  color={Colors.BLUE}
                  component="h2"
                  style={{ margin: "20px 0px" }}
                >
                  Flights
                </Text>
                <TripFlights flights={getTripFlights()} />
              </TabPanel>
            )}
          </div>
        );
      case 3:
        return (
          <div key={key}>
            {trip && tabIndex === index && (
              <TabPanel key={3} value={tabIndex} index={3} dir={MUtheme.direction}>
                <Text
                  bold
                  color={Colors.BLUE}
                  component="h2"
                  style={{ margin: "20px 0px" }}
                >
                  Hotels
                </Text>
                <RsvHotels userCurrency={userCurrency} hotels={getTripHotelRsv()} />
              </TabPanel>
            )}
          </div>
        );
      case 4:
        return (
          <div key={key}>
            {trip && tabIndex === index && (
              <TabPanel key={4} value={tabIndex} index={4} dir={MUtheme.direction}>
                <Text
                  bold
                  color={Colors.BLUE}
                  component="h2"
                  style={{ margin: "20px 0px" }}
                >
                  Restaurants
                </Text>
                <TripRestaurants restaurants={getTripRestaurants()} />
              </TabPanel>
            )}
          </div>
        );
      case 5:
        return (
          <div key={key}>
            {trip && tabIndex === index && (
              <TabPanel key={5} value={tabIndex} index={5} dir={MUtheme.direction}>
                <Text
                  bold
                  color={Colors.BLUE}
                  component="h2"
                  style={{ margin: "20px 0px" }}
                >
                  Things to do
                </Text>
                <TripPOIs pois={getTripPOIs()} />
              </TabPanel>
            )}
          </div>
        );
      case 6:
        return (
          <div key={key}>
            {trip && tabIndex === index && (
              <TabPanel key={6} value={tabIndex} index={6} dir={MUtheme.direction}>
                <Text
                  bold
                  color={Colors.BLUE}
                  component="h2"
                  style={{ margin: "20px 0px" }}
                >
                  Car rental
                </Text>
                <ReservedCars />
              </TabPanel>
            )}
          </div>
        );
      default:
        return <div key={key}></div>;
    }
  }

  function getSlideDirection(index: number) {
    return index > prevTabIndex ? "left" : "right";
  }

  function onTabIndexChange(index: number) {
    setPrevTabIndex(tabIndex);
    setTabIndex(index);
  }

  function getTripPictureQty(trip: Trip) {
    if (trip.albums.length > 0) {
      return trip.albums.map((album) => album.pictures.length).reduce((a, b) => a + b);
    }
    return 0;
  }

  function getTripPlacesQty(trip: Trip) {
    let total: number = 0;
    let placesToCount = [EventTypes.HOTEL, EventTypes.POI, EventTypes.RESTAURANT];

    if (trip.itinerary) {
      trip.itinerary.forEach((event) => {
        if (placesToCount.includes(event.type)) {
          total++;
        }
      });
    }

    return total;
  }

  return (
    <div className={style.mainContainer} ref={mainRef}>
      <Helmet>{trip && <title>{trip.name}</title>}</Helmet>

      <Navbar className={style.navbar} variant="dashboard" position="sticky" />

      <DashDrawer />

      <Grid container className={style.pageContentGrid}>
        {loading && (
          <Grid container style={{ height: "85vh" }}>
            <ProgressCircle />
          </Grid>
        )}

        {trip && (
          <div style={{ width: "100%" }}>
            <Grid item xs={12} style={{ marginBottom: "10px" }}>
              <CustomButton icon={faChevronLeft} rounded>
                All trips
              </CustomButton>
            </Grid>

            {/* Photo title */}
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Grid
                key="photoTitle"
                item
                xs={12}
                className={style.photoTitleContainer}
                style={tripCoverBackground}
              >
                <Grid container style={{ height: "100%" }}>
                  <Grid item xs={12}>
                    <Grid container alignItems="baseline" style={{ marginTop: "20px" }}>
                      <Grid item xs={9}>
                        <Text
                          color="white"
                          component="h1"
                          style={{ margin: "0px 10px 0px 0px" }}
                        >
                          {trip && trip.name}
                        </Text>
                      </Grid>

                      <Grid item xs={3}>
                        <Grid container>
                          <CustomButton
                            className={style.itineraryButton}
                            onClick={() =>
                              history.push(`${Routes.ITINERARY}?trip=${trip.uuid}`)
                            }
                            icon={faCalendar}
                          >
                            Itinerary
                          </CustomButton>

                          <IconButton className={style.itineraryIconButton}>
                            <FontAwesomeIcon icon={faCalendar} color="white" />
                          </IconButton>
                        </Grid>
                      </Grid>

                      <Grid item className={style.countryListGrid}>
                        <Text
                          color="white"
                          component="h4"
                          style={{ fontWeight: "normal" }}
                        >
                          {trip && trip.countries.join(", ")}
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Trip quick info */}
                  <Grid item xs={12} style={{ alignSelf: "flex-end" }}>
                    <Grid container>
                      <div className={style.photosPlacesDaysContainer}>
                        <Text
                          color="white"
                          component="h3"
                          style={{ textAlign: "center", marginBottom: "5px" }}
                        >
                          Photos
                        </Text>
                        <Text
                          color="white"
                          component="h4"
                          style={{ textAlign: "center" }}
                        >
                          {trip && getTripPictureQty(trip)}
                        </Text>
                      </div>

                      <div className={style.photosPlacesDaysContainer}>
                        <Text
                          color="white"
                          component="h3"
                          style={{ textAlign: "center", marginBottom: "5px" }}
                        >
                          Places
                        </Text>
                        <Text
                          color="white"
                          component="h4"
                          style={{ textAlign: "center" }}
                        >
                          {trip && getTripPlacesQty(trip)}
                        </Text>
                      </div>

                      <div className={style.photosPlacesDaysContainer}>
                        <Text
                          color="white"
                          component="h3"
                          style={{ textAlign: "center", marginBottom: "5px" }}
                        >
                          Days
                        </Text>
                        <Text
                          color="white"
                          component="h4"
                          style={{ textAlign: "center" }}
                        >
                          {trip && trip.days}
                        </Text>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grow>

            {/* Tab bar */}
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Grid item xs={12}>
                <TripTabBar tabIndex={tabIndex} onTabIndexChange={onTabIndexChange} />
              </Grid>
            </Grow>

            {/* Tabs */}
            <Grid item xs={12}>
              <VirtualizeSwipeableViews
                slideRenderer={({ index, key }) => TabViews(index, key)}
                axis={MUtheme.direction === "rtl" ? "x-reverse" : "x"}
                index={tabIndex}
                slideClassName={style.tabSlide}
                onChangeIndex={onTabIndexChange}
              />

              {tabIndex === 0 && (
                <>
                  {/* Photos, details grid */}
                  <PicturesAndKeyDetails showAll={false} trip={trip} />

                  {/* Flights */}
                  <Grid item xs={12} style={{ marginTop: 30 }}>
                    <Grid container>
                      <Text bold color={Colors.BLUE} component="h2">
                        Flights
                      </Text>
                      <CustomButton
                        iconColor="#7e7e7e"
                        backgroundColor="rgba(0,0,0,0)"
                        textColor="#7e7e7e"
                        onClick={() => setTabIndex(2)}
                      >
                        See all
                      </CustomButton>
                    </Grid>

                    <TripFlights flights={getTripFlights()} showAll={false} />
                  </Grid>

                  {/* Hotels */}
                  <Grid item xs={12} style={{ marginTop: 30 }}>
                    <Grid container>
                      <Text bold color={Colors.BLUE} component="h2">
                        Hotels
                      </Text>
                      <CustomButton
                        iconColor="#7e7e7e"
                        backgroundColor="rgba(0,0,0,0)"
                        textColor="#7e7e7e"
                        onClick={() => setTabIndex(3)}
                      >
                        See all
                      </CustomButton>
                    </Grid>

                    <RsvHotels
                      userCurrency={userCurrency}
                      hotels={getTripHotelRsv()}
                      showAll={false}
                    />
                  </Grid>

                  {/* Restaurants */}
                  <Grid item xs={12} style={{ marginTop: 30 }}>
                    <Grid container>
                      <Text bold color={Colors.BLUE} component="h2">
                        Restaurants
                      </Text>
                      <CustomButton
                        iconColor="#7e7e7e"
                        backgroundColor="rgba(0,0,0,0)"
                        textColor="#7e7e7e"
                        onClick={() => setTabIndex(4)}
                      >
                        See all
                      </CustomButton>
                    </Grid>

                    <TripRestaurants restaurants={getTripRestaurants()} showAll={false} />
                  </Grid>

                  {/* Things to do */}
                  <Grid item xs={12} style={{ marginTop: 30 }}>
                    <Grid container>
                      <Text bold color={Colors.BLUE} component="h2">
                        Things to do
                      </Text>
                      <CustomButton
                        iconColor="#7e7e7e"
                        backgroundColor="rgba(0,0,0,0)"
                        textColor="#7e7e7e"
                        onClick={() => setTabIndex(4)}
                      >
                        See all
                      </CustomButton>
                    </Grid>

                    <TripPOIs pois={getTripPOIs()} showAll={false} />
                  </Grid>

                  {/* Car rental */}
                  <Grid item xs={12} style={{ marginTop: 30 }}>
                    <Grid container>
                      <Text bold color={Colors.BLUE} component="h2">
                        Car rental
                      </Text>
                      <CustomButton
                        iconColor="#7e7e7e"
                        backgroundColor="rgba(0,0,0,0)"
                        textColor="#7e7e7e"
                        onClick={() => setTabIndex(5)}
                      >
                        See all
                      </CustomButton>
                    </Grid>

                    <ReservedCars showAll={false} />
                  </Grid>
                </>
              )}
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
}
