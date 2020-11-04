import React from "react";
import {
  createMuiTheme,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import { Colors } from "../../../styles";
import { servicesToolbarStyles } from "../servicesToolbar-styles";

export function ServicesToolbar() {
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

  const theme = createMuiTheme({
    overrides: {
      MuiListItem: {
        button: {
          "&:hover": {
            borderBottom: `2px solid ${Colors.BLUE}`,
          },
        },
      },
    },
  });

  const style = servicesToolbarStyles();

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
