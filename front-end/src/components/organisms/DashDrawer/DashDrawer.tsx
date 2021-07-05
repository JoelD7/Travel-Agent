import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar,
  faCar,
  faDice,
  faHeart,
  faHotel,
  faPlane,
  faPlaneDeparture,
  faUser,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import {
  getCarRentalDefaultURL,
  getHotelSearchURL,
  getLinkStyle,
  getRestaurantsDefaultRoute,
  selectIsAuthenticated,
  Routes,
  selectLastTrip,
  Trip,
} from "../../../utils";
import { DrawerOptions } from "../../../utils/types/drawerOption-types";

interface DashDrawer {
  hiddenBreakpoint?: number;
}

export function DashDrawer({ hiddenBreakpoint = 960 }: DashDrawer) {
  const dashDrawerStyles = makeStyles((theme: Theme) => ({
    drawer: {
      width: "250px",
      backgroundColor: Colors.BLUE,
      zIndex: 1,

      [theme.breakpoints.down(hiddenBreakpoint)]: {
        display: "none",
      },
    },
    drawerText: {
      fontFamily: Font.Family,
      color: "white",
      fontSize: 14,
    },
    listItem: {
      "&:hover": {
        backgroundColor: Colors.BLUE_HOVER,
        borderBottom: "2px solid rgba(0,0,0,0)",
      },
    },
    listItemRoot: {
      borderBottom: `2px solid ${Colors.BLUE}`,
      "&.Mui-selected": {
        backgroundColor: Colors.GREEN,
        borderBottom: `2px solid ${Colors.GREEN}`,
        color: Colors.BLUE,

        "&:hover": {
          backgroundColor: Colors.GREEN,
        },
      },
    },
  }));

  const style = dashDrawerStyles();

  let segmentedURL = window.location.pathname.split("/").filter((e) => e.length > 0);
  let page = "/" + segmentedURL[segmentedURL.length - 1];

  let lastTrip: Trip | undefined = useSelector(selectLastTrip);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);

  const [topDrawerOptions, setTopDrawerOptions] = useState<DrawerOptions[]>([
    {
      label: "Profile",
      icon: faUser,
      route: Routes.PROFILE,
      selected: page === Routes.PROFILE,
      loggedUserRoute: true,
      visible: isAuthenticated,
    },
    {
      label: "Itinerary",
      icon: faCalendarAlt,
      route: lastTrip ? `${Routes.ITINERARY}?trip=${lastTrip.uuid}` : Routes.ITINERARY,
      selected: page === Routes.ITINERARY,
      loggedUserRoute: false,
      visible: true,
    },
    {
      label: "Reservations",
      icon: faCalendar,
      route: Routes.RESERVATIONS,
      selected: page === Routes.RESERVATIONS,
      loggedUserRoute: false,
      visible: true,
    },
    {
      label: "Trips",
      icon: faPlane,
      route: Routes.TRIPS,
      selected: page === Routes.TRIPS,
      loggedUserRoute: false,
      visible: true,
    },
    {
      label: "Favorite places",
      icon: faHeart,
      route: Routes.FAVORITE_PLACES,
      selected: page === Routes.FAVORITE_PLACES,
      loggedUserRoute: false,
      visible: true,
    },
  ]);

  const bottomDrawerOptions: DrawerOptions[] = [
    {
      label: "Hotels",
      icon: faHotel,
      route: getHotelSearchURL(),
      selected: page === Routes.HOTELS,
      loggedUserRoute: false,
      visible: true,
    },
    {
      label: "Flights",
      icon: faPlaneDeparture,
      route: Routes.FLIGHTS,
      selected: page === Routes.FLIGHTS,
      loggedUserRoute: false,
      visible: true,
    },
    {
      label: "Restaurants",
      icon: faUtensils,
      route: getRestaurantsDefaultRoute(),
      selected: page === Routes.RESTAURANTS,
      loggedUserRoute: false,
      visible: true,
    },
    {
      label: "Things to do",
      icon: faDice,
      route: Routes.THINGS_TODO,
      selected: page === Routes.THINGS_TODO,
      loggedUserRoute: false,
      visible: true,
    },
    {
      label: "Car rental",
      icon: faCar,
      route: getCarRentalDefaultURL(),
      selected: page === Routes.CAR_RENTAL,
      loggedUserRoute: false,
      visible: true,
    },
  ];

  useEffect(() => {
    let newOptions = topDrawerOptions.map((option) => {
      if (option.label === "Itinerary") {
        return {
          label: "Itinerary",
          icon: faCalendarAlt,
          route: lastTrip
            ? `${Routes.ITINERARY}?trip=${lastTrip.uuid}`
            : Routes.ITINERARY,
          selected: page === Routes.ITINERARY,
          loggedUserRoute: true,
          visible: true,
        };
      } else {
        return option;
      }
    });

    setTopDrawerOptions(newOptions);
  }, [lastTrip]);

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
      <List>
        {topDrawerOptions
        .filter(option=>option.visible)
        .map((option, i) => (
          <Link key={option.route} style={getLinkStyle("white")} to={option.route}>
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
        {bottomDrawerOptions
        .filter(option=>option.visible)
        .map((option, i) => (
          <Link key={option.route} style={getLinkStyle("white")} to={option.route}>
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
