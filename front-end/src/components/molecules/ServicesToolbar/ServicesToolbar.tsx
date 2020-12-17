import React from "react";
import { createMuiTheme, MenuItem, ThemeProvider, Toolbar } from "@material-ui/core";
import { Colors } from "../../../styles";
import { servicesToolbarStyles } from "../servicesToolbar-styles";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../utils";

interface NavbarService {
  label: string;
  route: string;
}

export function ServicesToolbar() {
  const navbarServices: NavbarService[] = [
    {
      label: "Hotels",
      route: Routes.HOTELS,
    },
    {
      label: "Flights",
      route: Routes.FLIGHTS,
    },
    {
      label: "Restaurants",
      route: Routes.RESTAURANTS,
    },
    {
      label: "Places to go",
      route: Routes.PLACES_TOGO,
    },
    {
      label: "Car rental",
      route: Routes.CAR_RENTAL,
    },
  ];

  const theme = createMuiTheme({
    overrides: {
      MuiListItem: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(0,0,0,0)",
            borderBottom: `2px solid ${Colors.BLUE}`,
          },
        },

        button: {
          "&:hover": {
            borderBottom: `2px solid ${Colors.BLUE}`,
          },
        },
      },
    },
  });

  const style = servicesToolbarStyles();

  const history = useHistory();

  function isServiceSelected(service: NavbarService) {
    if (service.label === "Flights") {
      return (
        history.location.pathname === service.route ||
        history.location.pathname === Routes.FLIGHT_LIST
      );
    } else {
      return history.location.pathname === service.route;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Toolbar className={style.servicesToolbar}>
        {navbarServices.map((service, i) => (
          <MenuItem
            key={i}
            selected={isServiceSelected(service)}
            onClick={() => history.push(service.route)}
            classes={{ root: style.menuItemRoot }}
          >
            {service.label}
          </MenuItem>
        ))}
      </Toolbar>
    </ThemeProvider>
  );
}
