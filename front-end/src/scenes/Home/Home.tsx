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
import Slider from "react-slick";
import SwipeableViews from "react-swipeable-views";
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
import { selectOpenRequiredFieldSnack, setOpenRequiredFieldSnack } from "../../utils";
import "./home.css";

interface ServiceIconType {
  hotel: boolean;
  flight: boolean;
  carRental: boolean;
  [key: string]: ServiceIconType[keyof ServiceIconType];
}

interface CalendarItem {
  a: string;
}

interface CalendarItemHolder {
  holder: {
    [dateIndex: number]: { calendarItems: CalendarItem[] };
  };
}

export function Home() {
  const style = homeStyles();

  let state: CalendarItemHolder = {
    holder: {
      12: { calendarItems: [] },
    },
  };

  let stateTwo = {
    ...state,
    holder: { ...state.holder, [45]: { calendarItems: [{ a: "klk" }] } },
  };

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

  const openRequiredFieldSnack = useSelector(selectOpenRequiredFieldSnack);

  const popularDestinations = [
    {
      image: "/Travel-Agent/destinations/paris.jpg",
      country: "France",
      city: "Paris",
    },
    {
      image: "/Travel-Agent/destinations/tokio.jpg",
      country: "Japan",
      city: "Tokio",
    },
    {
      image: "/Travel-Agent/destinations/agra.jpg",
      country: "India",
      city: "Agra",
    },
    {
      image: "/Travel-Agent/destinations/singapore.jpg",
      country: "Singapore",
      city: "Singapore",
    },
    {
      image: "/Travel-Agent/destinations/rio.jpg",
      country: "Brazil",
      city: "Rio de Janeiro",
    },
    {
      image: "/Travel-Agent/destinations/new-york.jpg",
      country: "United States",
      city: "New York",
    },
    {
      image: "/Travel-Agent/destinations/rome.jpg",
      country: "Italy",
      city: "Rome",
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

  return (
    <>
      <div className="mainContainer">
        <Helmet>
          <title>Tripper</title>
        </Helmet>

        <Grid id="section-1" container className={style.topContainer}>
          <Grid item xs={12}>
            <Navbar transparent />
            <ServicesToolbar transparent />
          </Grid>

          <Grid item className={style.reservationGrid}>
            <div className={style.reservationContainer}>
              <h3 style={{ textAlign: "center", color: Colors.BLUE }}>
                What are you looking for?
              </h3>

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
                  <CustomButton size={18}>Explore places</CustomButton>
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
          <Slider {...sliderSettings} slidesToScroll={1} slidesToShow={3}>
            {popularDestinations.map((destination, i) => (
              <div key={i}>
                <Card className={style.card}>
                  <CardActionArea>
                    <CardMedia component="img" height="250" image={destination.image} />
                  </CardActionArea>

                  <CardContent>
                    <div
                      style={{ fontWeight: "bold" }}
                    >{`${destination.city}, ${destination.country}`}</div>
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
