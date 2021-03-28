import React from "react";
import { createMuiTheme, MenuItem, ThemeProvider, Toolbar } from "@material-ui/core";
import { Colors } from "../../../styles";
import { servicesToolbarStyles } from "../servicesToolbar-styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  convertReservationParamsToURLParams,
  convertURLToReservationParams,
  getHotelSearchURL,
  getLinkStyle,
  selectCurrentCity,
  Routes,
  selectHotelReservationParams,
  getRestaurantsDefaultRoute,
} from "../../../utils";
import { CreateCSSProperties, CSSProperties } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { IATALocation } from "../../../utils/types/location-types";

interface NavbarService {
  label: string;
  route: string;
  selected: boolean;
}

interface ServicesToolbar {
  home?: boolean;
  style?: CSSProperties;
}

export function ServicesToolbar({ home, style }: ServicesToolbar) {
  let segmentedURL = window.location.pathname.split("/").filter((e) => e.length > 0);
  let page = "/" + segmentedURL[segmentedURL.length - 1];

  const reservationParams = useSelector(selectHotelReservationParams);
  const city: IATALocation = useSelector(selectCurrentCity);

  const navbarServices: NavbarService[] = [
    {
      label: "Hotels",
      route: Routes.HOTELS,
      selected: page === Routes.HOTELS,
    },
    {
      label: "Flights",
      route: Routes.FLIGHTS,
      selected: page === Routes.FLIGHTS,
    },
    {
      label: "Restaurants",
      route: Routes.RESTAURANTS,
      selected: page === Routes.RESTAURANTS,
    },
    {
      label: "Things to do",
      route: Routes.THINGS_TODO,
      selected: page === Routes.THINGS_TODO,
    },
    {
      label: "Car rental",
      route: Routes.CAR_RENTAL,
      selected: false,
    },
  ];

  const theme = createMuiTheme({
    overrides: {
      MuiListItem: {
        button: {
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0)",
            borderBottom: `2px solid ${Colors.BLUE}`,
          },
        },
      },
    },
  });

  const styles = servicesToolbarStyles();

  function getServiceRoute(route: string) {
    switch (route) {
      case Routes.HOTELS:
        return getHotelSearchURL(reservationParams);

      case Routes.FLIGHTS:
        return Routes.FLIGHTS;

      case Routes.RESTAURANTS:
        return getRestaurantsDefaultRoute();

      case Routes.THINGS_TODO:
        return Routes.THINGS_TODO;

      case Routes.CAR_RENTAL:
        return Routes.CAR_RENTAL;

      default:
        return Routes.HOME;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Toolbar
        className={home ? styles.servicesToolbarHome : styles.servicesToolbar}
        style={{ ...style }}
      >
        {navbarServices.map((service, i) => (
          <Link
            key={service.route}
            to={getServiceRoute(service.route)}
            style={getLinkStyle(Colors.BLUE)}
          >
            <MenuItem
              key={i}
              selected={service.selected}
              classes={{ root: home ? styles.menuItemRootHome : styles.menuItemRoot }}
            >
              {service.label}
            </MenuItem>
          </Link>
        ))}
      </Toolbar>
    </ThemeProvider>
  );
}
