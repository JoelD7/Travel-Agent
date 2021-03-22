import {
  convertReservationParamsToURLParams,
  getLinkStyle,
  HotelBookingParams,
  Routes,
  getRestaurantsDefaultRoute,
  selectHotelReservationParams,
  getHotelDefaultRoute,
} from "../../../utils";
import { DrawerOptions } from "../../../utils/types/drawerOption-types";
import React, { useState } from "react";
import {
  faCalendar,
  faHeart,
  faPlane,
  faHotel,
  faPlaneDeparture,
  faUtensils,
  faDice,
} from "@fortawesome/free-solid-svg-icons";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { dashDrawerStyles } from "./dashDrawer-styles";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

export function DashDrawer() {
  const style = dashDrawerStyles();

  let segmentedURL = window.location.pathname.split("/").filter((e) => e.length > 0);
  let page = "/" + segmentedURL[segmentedURL.length - 1];

  const [topDrawerOptions, setTopDrawerOptions] = useState<DrawerOptions[]>([
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
  ]);

  const reservationParams: HotelBookingParams = useSelector(selectHotelReservationParams);

  const bottomDrawerOptions: DrawerOptions[] = [
    {
      label: "Hotels",
      icon: faHotel,
      route: getHotelDefaultRoute(reservationParams),
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
  ];

  const history = useHistory();

  /**
   * Sets a drawer list item as selected when clicked
   * @param option the clicked option
   */
  function onOptionClick(option: DrawerOptions) {
    let newDrawer = topDrawerOptions.map((op) => {
      if (op.label === option.label) {
        return { ...op, selected: true };
      } else {
        return { ...op, selected: false };
      }
    });

    setTopDrawerOptions(newDrawer);
  }

  return (
    <Drawer anchor="left" variant="permanent" classes={{ paper: style.drawer }}>
      <List style={{ marginTop: "40px" }}>
        {topDrawerOptions.map((option, i) => (
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
              <ListItemText
                classes={{ primary: style.drawerText }}
                primary={option.label}
              />
            </ListItem>
          </Link>
        ))}

        <Divider style={{ backgroundColor: "white" }} />
        {bottomDrawerOptions.map((option, i) => (
          <Link key={i} style={getLinkStyle("white")} to={option.route}>
            <ListItem
              selected={option.selected}
              button
              classes={{
                root: style.listItemRoot,
                button: style.listItem,
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={option.icon} color="white" />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: style.drawerText }}
                primary={option.label}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
