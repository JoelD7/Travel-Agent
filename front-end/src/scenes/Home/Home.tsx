import {
  faBars,
  faCar,
  faConciergeBell,
  faDice,
  faHotel,
  faPlaneDeparture,
  faSignInAlt,
  faUtensils,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import {
  AppBar,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createMuiTheme,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { CreateCSSProperties, ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";

import { carlos, logoTypeWhiteFore } from "../../assets";
import {
  CustomButton,
  HomeCarReservation,
  HomeFlightReservation,
  HomeHotelReservation,
  PageSubtitle,
  SliderArrow,
} from "../../components";
import { ButtonIcon } from "../../components/atoms/ButtonIcon";
import { CDrawer, Navbar } from "../../components/molecules";
import { Colors } from "../../styles";
import { homeStyles, home_explore_button } from "../../styles/Home/home-styles";
import SwipeableViews from "react-swipeable-views";
import "./home.css";
import * as styles from "../../styles/Home/home-styles";
import "swiper/swiper-bundle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DrawerOptions } from "../../utils/types/DrawerOptionsType";

interface ServiceIconType {
  hotel: boolean;
  flight: boolean;
  carRental: boolean;
  [key: string]: ServiceIconType[keyof ServiceIconType];
}

export function Home() {
  const style = homeStyles();

  const theme = createMuiTheme({
    overrides: {
      // MuiListItem: {
      //   button: {
      //     "&:hover": {
      //       backgroundColor: "rgba(0,0,0,0)",
      //     },
      //   },
      // },
    },
  });

  const buttonStyle: CreateCSSProperties<{}> = {
    margin: "0 5px 0 5px",
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

  const [index, setIndex] = useState(0);

  const popularDestinations = [
    {
      image: "/destinations/paris.jpg",
      country: "France",
      city: "Paris",
    },
    {
      image: "/destinations/tokio.jpg",
      country: "Japan",
      city: "Tokio",
    },
    {
      image: "/destinations/agra.jpg",
      country: "India",
      city: "Agra",
    },
    {
      image: "/destinations/singapore.jpg",
      country: "Singapore",
      city: "Singapore",
    },
    {
      image: "/destinations/rio.jpg",
      country: "Brazil",
      city: "Rio de Janeiro",
    },
    {
      image: "/destinations/new-york.jpg",
      country: "United States",
      city: "New York",
    },
    {
      image: "/destinations/rome.jpg",
      country: "Italy",
      city: "Rome",
    },
  ];

  const [openDrawer, setOpenDrawer] = useState(false);

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
    return selectedService[service]
      ? style.serviceIconPurple
      : style.serviceIcon;
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

  const navbarServices = [
    {
      label: "Hotels",
      route: "",
    },
    {
      label: "Flights",
      route: "",
    },
    {
      label: "Restaurants",
      route: "",
    },
    {
      label: "Things to do",
      route: "",
    },
    {
      label: "Car rental",
      route: "",
    },
  ];

  return (
    <div className="mainContainer">
      <Navbar>
        <div className={style.defaultHomeNav}>
          <CustomButton
            style={buttonStyle}
            label="Login"
            backgroundColor={Colors.BLUE}
          />
          <CustomButton
            style={buttonStyle}
            label="Sign up"
            backgroundColor={Colors.BLUE}
          />
          <CustomButton
            style={buttonStyle}
            label="Make a trip"
            backgroundColor={Colors.PURPLE}
          />

          <IconButton style={{ marginLeft: "10px" }}>
            <Avatar src={carlos} />
          </IconButton>
        </div>

        <IconButton
          className={style.drawerOpenButton}
          onClick={() => setOpenDrawer(true)}
        >
          <FontAwesomeIcon color={Colors.BLUE} icon={faBars} />
        </IconButton>
      </Navbar>

      <Toolbar className={style.servicesToolbar}>
        {navbarServices.map((service, i) => (
          <MenuItem
            key={i}
            onClick={() => {}}
            classes={{ root: style.menuItemRoot }}
          >
            {service.label}
          </MenuItem>
        ))}
      </Toolbar>

      <Grid id="section-1" container style={{ marginBottom: "40px" }}>
        <Grid item className={style.reservationGrid}>
          <h3 style={{ textAlign: "center", color: Colors.BLUE }}>
            What are you looking for?
          </h3>

          <div className={style.servicesContainer}>
            {services.map((service) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
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
                <p className={style.serviceName}>{service.name}</p>
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
        </Grid>

        <Grid item className={style.mainPhotoGrid}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={style.homeImageDiv}
          >
            <div>
              <h1 className={style.homeImageText}>
                Hey, where you're off to next?
              </h1>
              <div className={style.exploreButtonContainer}>
                <CustomButton
                  style={home_explore_button}
                  backgroundColor={Colors.WHITE_TRANSPARENT}
                  label="Explore places"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <PageSubtitle label="Plan your trip" />
      <Grid id="section-2" container className={style.section}>
        <Grid item className={style.planTripGrid}>
          <div className={style.redirectTripContainer}>
            <h2 style={{ fontWeight: "normal" }}>Make a trip</h2>

            <p>Plan your trips however you want! </p>

            <p>
              The first step in planning your trip is making an itinerary. An
              itinerary will help you organize your time so you can get the most
              out of your journey.
            </p>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CustomButton
                label="Create trip"
                backgroundColor={Colors.GREEN}
                textColor={Colors.BLUE}
                style={styles.style_createTripButton}
              />
            </div>
          </div>
        </Grid>

        <Grid item className={style.planTripPhotoContainer}>
          <div className={style.redirectTripContainerHidden}>
            <h2 style={{ fontWeight: "normal" }}>Make a trip</h2>

            <p>Plan your trips however you want! </p>

            <p>
              The first step in planning your trip is making an itinerary. An
              itinerary will help you organize your time so you can get the most
              out of your journey.
            </p>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CustomButton
                label="Create trip"
                backgroundColor={Colors.GREEN}
                textColor={Colors.BLUE}
                style={styles.style_createTripButton}
              />
            </div>
          </div>
        </Grid>
      </Grid>

      <PageSubtitle label="Popular destinations" />
      <Grid id="section-3" container className={style.section}>
        <Slider {...sliderSettings} slidesToScroll={1} slidesToShow={3}>
          {popularDestinations.map((destination) => (
            <div>
              <Card className={style.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={destination.image}
                  />
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

      <CDrawer
        open={openDrawer}
        userLoggedIn
        onClose={() => setOpenDrawer(false)}
      />
    </div>
  );
}
