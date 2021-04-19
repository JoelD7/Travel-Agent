import {
  faCar,
  faConciergeBell,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Slider from "react-slick";
import SwipeableViews from "react-swipeable-views";
import { AnyAction } from "redux";
import { batchActions } from "redux-batched-actions";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "swiper/swiper-bundle.css";
import { Font } from "../../assets";
import {
  CustomButton,
  Footer,
  HomeCarReservation,
  HomeFlightReservation,
  HomeHotelReservation,
  PageSubtitle,
  SliderArrow,
  Text,
} from "../../components";
import { ButtonIcon } from "../../components/atoms/ButtonIcon";
import { Navbar, ServicesToolbar } from "../../components/molecules";
import { Colors } from "../../styles";
import * as styles from "../../styles/Home/home-styles";
import { homeStyles } from "../../styles/Home/home-styles";
import {
  CarSearch,
  FlightSearch,
  getFlightSearchURL,
  getIataLocation,
  getRandomInt,
  IATALocation,
  mostVisitedCities,
  selectCarSearch,
  selectOpenRequiredFieldSnack,
  setCarSearch,
  setDestinationCity,
  setFlightTo,
  setFlightToAutocomplete,
  setOpenRequiredFieldSnack,
  store,
  updateHotelCoordinates,
} from "../../utils";
import "./home.css";

interface ServiceIconType {
  hotel: boolean;
  flight: boolean;
  carRental: boolean;
  [key: string]: ServiceIconType[keyof ServiceIconType];
}

interface PopularDestination {
  image: string;
  country: string;
  city: string;
  iataCode: string;
}

export function Home() {
  const style = homeStyles();

  const services = [
    {
      name: "Hotel",
      prop: "hotel",
      route: "",
      icon: faConciergeBell,
    },
    {
      name: "Flight",
      prop: "flight",
      route: "",
      icon: faPlaneDeparture,
    },
    {
      name: "Car rental",
      prop: "carRental",
      route: "",
      icon: faCar,
    },
  ];

  const [selectedService, setSelectedService] = useState<ServiceIconType>({
    hotel: true,
    flight: false,
    carRental: false,
  });

  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const carSearch: CarSearch = useSelector(selectCarSearch);

  const openRequiredFieldSnack = useSelector(selectOpenRequiredFieldSnack);
  const history = useHistory();
  let batchedActions: AnyAction[] = [];

  const popularDestinations: PopularDestination[] = [
    {
      image: "/Travel-Agent/destinations/paris.jpg",
      country: "France",
      city: "Paris",
      iataCode: "PAR",
    },
    {
      image: "/Travel-Agent/destinations/tokio.jpg",
      country: "Japan",
      city: "Tokio",
      iataCode: "HND",
    },
    {
      image: "/Travel-Agent/destinations/agra.jpg",
      country: "India",
      city: "Agra",
      iataCode: "AGR",
    },
    {
      image: "/Travel-Agent/destinations/singapore.jpg",
      country: "Singapore",
      city: "Singapore",
      iataCode: "SIN",
    },
    {
      image: "/Travel-Agent/destinations/rio.jpg",
      country: "Brazil",
      city: "Rio de Janeiro",
      iataCode: "GIG",
    },
    {
      image: "/Travel-Agent/destinations/new-york.jpg",
      country: "United States",
      city: "New York",
      iataCode: "JFK",
    },
    {
      image: "/Travel-Agent/destinations/rome.jpg",
      country: "Italy",
      city: "Rome",
      iataCode: "FCO",
    },
  ];

  function onServicePressed(service: string) {
    setSelectedService({
      hotel: false,
      flight: false,
      carRental: false,
      [service]: true,
    });

    switch (service) {
      case "hotel":
        setIndex(0);
        break;
      case "flight":
        setIndex(1);
        break;
      case "carRental":
        setIndex(2);
        break;
      default:
        break;
    }
  }

  function getIconClassname(service: string) {
    return selectedService[service] ? style.serviceIconPurple : style.serviceIcon;
  }

  const sliderSettings = {
    className: style.slider,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  function onRandomDestinationClick() {
    batchedActions = [];

    let randomDestination: IATALocation =
      mostVisitedCities[getRandomInt(0, mostVisitedCities.length)];

    batchedActions.push(
      setCarSearch({
        ...carSearch,
        pickup_location: randomDestination.code,
      })
    );
    batchedActions.push(setFlightTo(randomDestination.code));
    batchedActions.push(setFlightToAutocomplete(randomDestination));
    batchedActions.push(
      updateHotelCoordinates({
        latitude: Number(randomDestination.lat),
        longitude: Number(randomDestination.lon),
      })
    );
    batchedActions.push(setDestinationCity(randomDestination));

    dispatch(batchActions(batchedActions));

    let flightSearch: FlightSearch = store.getState().flightSlice;
    history.push(getFlightSearchURL(flightSearch));
  }

  function onPopularDestinationClick(pDes: PopularDestination) {
    let destination: IATALocation | undefined = getIataLocation(pDes.iataCode);

    if (destination) {
      batchedActions = [];

      batchedActions.push(
        setCarSearch({
          ...carSearch,
          pickup_location: destination.code,
        })
      );
      batchedActions.push(setFlightTo(destination.code));
      batchedActions.push(setFlightToAutocomplete(destination));
      batchedActions.push(
        updateHotelCoordinates({
          latitude: Number(destination.lat),
          longitude: Number(destination.lon),
        })
      );
      batchedActions.push(setDestinationCity(destination));

      dispatch(batchActions(batchedActions));

      let flightSearch: FlightSearch = store.getState().flightSlice;
      history.push(getFlightSearchURL(flightSearch));
    }
  }

  return (
    <>
      <div className={style.mainContainer}>
        <Helmet>
          <title>Tripper</title>
        </Helmet>

        <Grid id="section-1" container className={style.topContainer}>
          <Grid item xs={12}>
            <Navbar transparent />
            <ServicesToolbar transparent />
          </Grid>

          {/* Reservation */}
          <Grid item className={style.reservationGrid}>
            <div className={style.reservationContainer}>
              <Text
                component="h3"
                bold
                color={Colors.BLUE}
                className={style.servicesTitle}
              >
                What are you looking for?
              </Text>

              {/* Services */}
              <div className={style.servicesContainer}>
                {services.map((service) => (
                  <div key={service.name}>
                    <div
                      key={service.name}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <ButtonIcon
                        primary={Colors.PURPLE}
                        secondary={"white"}
                        selectable={true}
                        selected={selectedService[service.prop]}
                        onClick={() => onServicePressed(service.prop)}
                        size="medium"
                        className={getIconClassname(service.prop)}
                        icon={service.icon}
                      />
                    </div>
                    <Text color={Colors.BLUE} className={style.serviceName} bold>
                      {service.name}
                    </Text>
                  </div>
                ))}
              </div>

              <div id="reservationMode">
                <SwipeableViews index={index} onChangeIndex={(i) => setIndex(i)}>
                  <HomeHotelReservation />
                  <HomeFlightReservation />
                  <HomeCarReservation />
                </SwipeableViews>
              </div>
            </div>
          </Grid>

          {/* Random location */}
          <Grid item className={style.mainPhotoGrid}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={style.homeImageDiv}
            >
              <div>
                <h1 className={style.homeImageText}>Hey, where you're off to next?</h1>
                <div className={style.exploreButtonContainer}>
                  <CustomButton size={18} onClick={() => onRandomDestinationClick()}>
                    Random destination
                  </CustomButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <PageSubtitle label="Plan your trip" />
        <Grid id="section-2" container className={style.section}>
          <Grid item className={style.planTripGrid}>
            <div className={style.redirectTripContainer}>
              <Text color="white" bold component="h2">
                Make a trip
              </Text>

              <p>Plan your trips however you want! </p>

              <p>
                The first step in planning your trip is making an itinerary. An itinerary
                will help you organize your time so you can get the most out of your
                journey.
              </p>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <CustomButton
                  backgroundColor={Colors.GREEN}
                  style={styles.style_createTripButton}
                >
                  Create trip
                </CustomButton>
              </div>
            </div>
          </Grid>

          <Grid item className={style.planTripPhotoContainer}>
            <div className={style.redirectTripContainerHidden}>
              <h2 style={{ fontWeight: "normal" }}>Make a trip</h2>

              <p>Plan your trips however you want! </p>

              <p>
                The first step in planning your trip is making an itinerary. An itinerary
                will help you organize your time so you can get the most out of your
                journey.
              </p>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <CustomButton
                  backgroundColor={Colors.GREEN}
                  textColor={Colors.BLUE}
                  style={styles.style_createTripButton}
                >
                  Create trip
                </CustomButton>
              </div>
            </div>
          </Grid>
        </Grid>

        <PageSubtitle label="Popular destinations" />
        <Grid id="section-3" container className={style.section}>
          <Slider
            {...sliderSettings}
            slidesToScroll={1}
            lazyLoad="progressive"
            slidesToShow={3}
          >
            {popularDestinations.map((destination, i) => (
              <div key={i}>
                <Card className={style.card}>
                  <CardActionArea onClick={() => onPopularDestinationClick(destination)}>
                    <CardMedia component="img" height="250" image={destination.image} />
                  </CardActionArea>

                  <CardContent>
                    <div style={{ fontWeight: "bold" }}>
                      <Text
                        bold
                        color={Colors.BLUE}
                      >{`${destination.city}, ${destination.country}`}</Text>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </Grid>
      </div>

      <Snackbar
        open={openRequiredFieldSnack}
        autoHideDuration={6000}
        onClose={() => dispatch(setOpenRequiredFieldSnack(false))}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => dispatch(setOpenRequiredFieldSnack(false))}
          severity="error"
        >
          The required fields must be filled.
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
}
