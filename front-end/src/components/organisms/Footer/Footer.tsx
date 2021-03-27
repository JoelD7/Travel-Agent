import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoIcon } from "../../../assets";
import { Colors } from "../../../styles";
import {
  getHotelSearchURL,
  getRestaurantsDefaultRoute,
  Routes,
  getLinkStyle,
  selectHotelReservationParams,
} from "../../../utils";
import { IconText, Text } from "../../atoms";
import { footerStyles } from "./footer-styles";

export function Footer() {
  const style = footerStyles();

  const reservationParams = useSelector(selectHotelReservationParams);

  const bookLinks = [
    {
      label: "Hotels",
      route: getHotelSearchURL(reservationParams),
    },
    {
      label: "Flights",
      route: Routes.FLIGHTS,
    },
  ];

  const seeLinks = [
    {
      label: "Restaurants",
      route: getRestaurantsDefaultRoute(),
    },
    {
      label: "Things to do",
      route: Routes.THINGS_TODO,
    },
    {
      label: "My trips",
      route: Routes.TRIPS,
    },
    {
      label: "Reservations",
      route: Routes.RESERVATIONS,
    },
    {
      label: "Trip itinerary",
      route: Routes.ITINERARY,
    },

    {
      label: "My favorite places",
      route: Routes.FAVORITE_PLACES,
    },
  ];

  return (
    <div className={style.mainContainer}>
      <Grid container className={style.contentContainer}>
        {/* Logo */}
        <Grid item className={style.logoGrid}>
          <Grid container>
            <img src={logoIcon} className={style.logo} alt="" />
            <Text style={{ marginLeft: "5px" }} color="white" bold component="h1">
              Tripper
            </Text>
          </Grid>
        </Grid>

        {/* Content grids */}
        <Grid item className={style.contentGrid}>
          <Grid container>
            {/* Book links */}
            <Grid item className={style.linkGrid}>
              <Text color="white" bold component="h4" style={{ marginBottom: "12px" }}>
                Book
              </Text>

              {bookLinks.map((link) => (
                <Link key={link.route} className={style.link} to={link.route}>
                  <Text color="white" component="h5" style={{ marginTop: "6px" }}>
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Grid>

            {/* See links */}
            <Grid item className={style.linkGrid}>
              <Text color="white" bold component="h4" style={{ marginBottom: "12px" }}>
                See
              </Text>

              {seeLinks.map((link) => (
                <Link key={link.route} className={style.link} to={link.route}>
                  <Text color="white" component="h5" style={{ marginTop: "6px" }}>
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Grid>

            {/* Divider */}
            <Grid item className={style.dividerGrid}>
              <Grid container justify="center">
                <Divider orientation="vertical" style={{ backgroundColor: "white" }} />
              </Grid>
            </Grid>

            {/* Contact */}
            <Grid item className={style.linkGrid}>
              <Text color="white" bold component="h4" style={{ marginBottom: "12px" }}>
                Contact info
              </Text>

              {/* eMail */}
              <Grid container alignItems="center">
                <IconText
                  fontSize={16}
                  textColor="white"
                  icon={faEnvelope}
                  style={{ marginTop: "6px" }}
                  backgroundColor={"inherit"}
                >
                  joeld200013@gmail.com
                </IconText>
              </Grid>
              {/* Phone */}
              <Grid container alignItems="center">
                <IconText
                  fontSize={16}
                  textColor="white"
                  icon={faPhone}
                  style={{ marginTop: "6px" }}
                  backgroundColor={"inherit"}
                >
                  (829) 977 0013
                </IconText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
