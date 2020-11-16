import React from "react";
import {
  createMuiTheme,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import { Colors } from "../../../styles";
import { servicesToolbarStyles } from "../servicesToolbar-styles";
import { useHistory } from "react-router-dom";
import { Route } from "../../../utils";

export function ServicesToolbar() {
  const navbarServices = [
    {
      label: "Hotels",
      route: Route.HOTELS,
    },
    {
      label: "Flights",
      route: Route.FLIGHTS,
    },
    {
      label: "Restaurants",
      route: Route.RESTAURANTS,
    },
    {
      label: "Things to do",
      route: Route.THINGS_TODO,
    },
    {
      label: "Car rental",
      route: Route.CAR_RENTAL,
    },
  ];

  const theme = createMuiTheme({
    overrides: {
      MuiListItem: {
        root: {
          "&.Mui-selected": {
            backgroundColor: 'rgba(0,0,0,0)',
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

  return (
    <ThemeProvider theme={theme}>
      <Toolbar className={style.servicesToolbar}>
        {navbarServices.map((service, i) => (
          <MenuItem
            key={i}
            selected={history.location.pathname === service.route}
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
