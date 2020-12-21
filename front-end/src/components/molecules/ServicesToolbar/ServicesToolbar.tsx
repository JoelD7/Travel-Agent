import React from "react";
import { createMuiTheme, MenuItem, ThemeProvider, Toolbar } from "@material-ui/core";
import { Colors } from "../../../styles";
import { servicesToolbarStyles } from "../servicesToolbar-styles";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../utils";

interface NavbarService {
  label: string;
  route: string;
  selected: boolean;
}

interface ServicesToolbar {
  home?: boolean;
}

export function ServicesToolbar({ home }: ServicesToolbar) {
  let segmentedURL = window.location.pathname.split("/").filter((e) => e.length > 0);
  let page = "/" + segmentedURL[segmentedURL.length - 1];

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

  const style = servicesToolbarStyles();

  const history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <Toolbar className={home ? style.servicesToolbarHome : style.servicesToolbar}>
        {navbarServices.map((service, i) => (
          <MenuItem
            key={i}
            selected={service.selected}
            onClick={() => history.push(service.route)}
            classes={{ root: home ? style.menuItemRootHome : style.menuItemRoot }}
          >
            {service.label}
          </MenuItem>
        ))}
      </Toolbar>
    </ThemeProvider>
  );
}
