import {
  faCar,
  faConciergeBell,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

import { Avatar, Grid, IconButton } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { useState } from "react";

import { carlos } from "../../assets";
import {
  CustomButton,
  HomeCarReservation,
  HomeFlightReservation,
  HomeHotelReservation,
  PageSubtitle,
} from "../../components";
import { ButtonIcon } from "../../components/atoms/ButtonIcon";
import { Navbar } from "../../components/molecules";
import { Colors } from "../../styles";
import { homeStyles, home_explore_button } from "../../styles/Home/home-styles";
import SwipeableViews from "react-swipeable-views";
import "./home.css";
import * as styles from "../../styles/Home/home-styles";
import  { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

interface ServiceIconType {
  hotel: boolean;
  flight: boolean;
  carRental: boolean;
  [key: string]: ServiceIconType[keyof ServiceIconType];
}

export function Home() {
  const style = homeStyles();

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
      image: require("../../assets/images/paris.jpg"),
      country: 'France',
      city:"Paris",
    },
    {
      image: require("../../assets/images/tokio.jpg"),
      country: 'Japan',
      city:"Tokio",
    },
    {
      image: require("../../assets/images/agra.jpg"),
      country: 'India',
      city:"Agra",
    },
    {
      image: require("../../assets/images/singapore.jpg"),
      country: 'Singapore',
      city:"Singapore",
    },
    {
      image: require("../../assets/images/rio.jpg"),
      country: 'Brazil',
      city:"Rio de Janeiro",
    },
    {
      image: require("../../assets/images/new-york.jpg"),
      country: 'United States',
      city:"New York",
    },
    {
      image: require("../../assets/images/rome.jpg"),
      country: 'Italy',
      city:"Rome",
    },
  ]

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

  return (
    <div className="mainContainer">
      <Navbar>
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
      </Navbar>

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

      <Grid id="section-2" container className={style.section2}>
        <Grid item xs={6}>
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

        <Grid item xs={6} className={style.planTripPhotoContainer}></Grid>
      </Grid>

      <PageSubtitle label="Popular destinations" />

      <Grid id="section-3" container>
        <Swiper navigation pagination>
          {/* <SwiperSlide></SwiperSlide> */}
        </Swiper>
      </Grid>


    </div>
  );
}
