import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar,
  faCar,
  faDice,
  faHeart,
  faHotel,
  faPlane,
  faPlaneDeparture,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  createMuiTheme,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { carlos, Font, logoTypeWhiteFore } from "../../../assets";
import { Family } from "../../../assets/fonts";
import { Colors } from "../../../styles";
import {
  getCarRentalDefaultURL,
  getHotelSearchURL,
  getLinkStyle,
  getRestaurantsDefaultRoute,
  HotelBookingParams,
  Routes,
  selectHotelReservationParams,
} from "../../../utils";
import { DrawerOptions } from "../../../utils/types/drawerOption-types";
import { CustomButton } from "../../atoms";
import { drawerButtonStyle, drawerStyles } from "./navDrawer-styles";

interface CDrawerProps {
  open: boolean;
  userLoggedIn?: boolean;
  onClose: () => void;
}

export function NavDrawer({ open, onClose, userLoggedIn }: CDrawerProps) {
  const style = drawerStyles();

  const location = useLocation();
  const history = useHistory();

  let page = location.pathname;

  const hotelReservationParams: HotelBookingParams = useSelector(
    selectHotelReservationParams
  );

  const theme = createMuiTheme({
    overrides: {
      MuiTypography: {
        body1: {
          fontFamily: Font.Family,
        },
      },
    },
  });

  const [drawerOptions, setDrawerOptions] = useState<DrawerOptions[]>([
    {
      label: "Itinerary",
      icon: faCalendarAlt,
      route: Routes.ITINERARY,
      selected: page === Routes.ITINERARY,
      user: true,
    },
    {
      label: "Reservations",
      icon: faCalendar,
      route: Routes.RESERVATIONS,
      selected: page === Routes.RESERVATIONS,
      user: true,
    },
    {
      label: "Trips",
      icon: faPlane,
      route: Routes.TRIPS,
      selected: page === Routes.TRIPS,
      user: true,
    },
    {
      label: "Favorite places",
      icon: faHeart,
      route: Routes.FAVORITE_PLACES,
      selected: page === Routes.FAVORITE_PLACES,
      user: true,
    },
    {
      label: "Hotels",
      icon: faHotel,
      route: getHotelSearchURL(hotelReservationParams),
      selected: page === Routes.HOTELS,
      user: false,
    },
    {
      label: "Flights",
      icon: faPlaneDeparture,
      route: Routes.FLIGHTS,
      selected: page === Routes.FLIGHTS,
      user: false,
    },
    {
      label: "Restaurants",
      icon: faUtensils,
      route: getRestaurantsDefaultRoute(),
      selected: page === Routes.RESTAURANTS,
      user: false,
    },
    {
      label: "Things to do",
      icon: faDice,
      route: Routes.THINGS_TODO,
      selected: page === Routes.THINGS_TODO,
      user: false,
    },
    {
      label: "Car rental",
      icon: faCar,
      route: getCarRentalDefaultURL(),
      selected: page === Routes.CAR_RENTAL,
      user: false,
    },
  ]);

  function onOptionClick(option: DrawerOptions) {
    let newDrawer = drawerOptions.map((op) => {
      if (op.label === option.label) {
        return { ...op, selected: true };
      } else {
        return { ...op, selected: false };
      }
    });

    setDrawerOptions(newDrawer);
  }

  function DrawerButtons() {
    return (
      <div style={{ padding: "0px 10px" }}>
        {userLoggedIn ? (
          <div>
            <CustomButton
              avatar={<Avatar src={carlos} />}
              backgroundColor={Colors.PURPLE}
              rounded
              style={drawerButtonStyle}
              onClick={() => {}}
            >
              Account
            </CustomButton>

            <CustomButton
              backgroundColor={Colors.PURPLE}
              rounded
              style={drawerButtonStyle}
              onClick={() => {}}
            >
              Make trip
            </CustomButton>
          </div>
        ) : (
          <div style={{ fontFamily: Family }}>
            <CustomButton
              backgroundColor={Colors.PURPLE}
              rounded
              style={{ ...drawerButtonStyle, marginBottom: "0px" }}
              onClick={() => history.push(Routes.LOGIN)}
            >
              Login
            </CustomButton>

            <p style={{ color: "white", fontSize: "14px" }}>
              Or{" "}
              <a style={{ color: "white" }} href="">
                register
              </a>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{ paper: style.drawer }}
    >
      <img
        src={logoTypeWhiteFore}
        style={{ height: "40px", margin: "20px auto 0px auto" }}
      />
      <List style={{ marginTop: "40px" }}>
        <DrawerButtons />

        <Divider style={{ backgroundColor: "#cecece" }} />

        <ThemeProvider theme={theme}>
          {drawerOptions
            .filter((o) => o.user)
            .map((option, i) => (
              <Link key={i} style={getLinkStyle("white")} to={option.route}>
                <ListItem
                  selected={option.selected}
                  button
                  classes={{
                    root: style.listItemRoot,
                    button: style.listItem,
                  }}
                  onClick={() => onOptionClick(option)}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon={option.icon} color="white" />
                  </ListItemIcon>

                  <ListItemText style={{ color: "white" }}>{option.label}</ListItemText>
                </ListItem>
              </Link>
            ))}
        </ThemeProvider>

        <Divider style={{ backgroundColor: "#cecece" }} />

        <ThemeProvider theme={theme}>
          {drawerOptions
            .filter((o) => !o.user)
            .map((option, i) => (
              <Link key={option.route} style={getLinkStyle("white")} to={option.route}>
                <ListItem
                  selected={option.selected}
                  button
                  key={i}
                  classes={{
                    root: style.listItemRoot,
                    button: style.listItem,
                  }}
                  onClick={() => onOptionClick(option)}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon={option.icon} color="white" />
                  </ListItemIcon>

                  <ListItemText style={{ color: "white" }} className={style.listItemText}>
                    {option.label}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
        </ThemeProvider>
      </List>
    </Drawer>
  );
}
