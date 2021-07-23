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
  createTheme,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CloudImage, Font, logoTypeWhiteFore } from "../../../assets";
import { Family } from "../../../assets/fonts";
import { Colors } from "../../../styles";
import {
  backend,
  getCarRentalDefaultURL,
  getHotelSearchURL,
  getLinkStyle,
  getRestaurantsDefaultRoute,
  Person,
  Routes,
  selectIsAuthenticated,
  selectLastTrip,
  selectPerson,
  setIsAuthenticated,
  setLogout,
  setPerson,
  Trip,
} from "../../../utils";
import { DrawerOptions } from "../../../utils/types/drawerOption-types";
import { CustomButton } from "../../atoms";
import { drawerButtonStyle, drawerStyles } from "./navDrawer-styles";

interface NavDrawer {
  open: boolean;
  onClose: () => void;
}

export function NavDrawer({ open, onClose }: NavDrawer) {
  const style = drawerStyles();

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let page = location.pathname;

  let lastTrip: Trip | undefined = useSelector(selectLastTrip);
  const person: Person | undefined = useSelector(selectPerson);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);

  const theme = createTheme({
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
      route: lastTrip ? `${Routes.ITINERARY}?trip=${lastTrip.uuid}` : Routes.ITINERARY,
      selected: page === Routes.ITINERARY,
      loggedUserRoute: true,
      visible: true,
    },
    {
      label: "Reservations",
      icon: faCalendar,
      route: Routes.RESERVATIONS,
      selected: page === Routes.RESERVATIONS,
      loggedUserRoute: true,
      visible: true,
    },
    {
      label: "Trips",
      icon: faPlane,
      route: Routes.TRIPS,
      selected: page === Routes.TRIPS,
      loggedUserRoute: true,
      visible: true,
    },
    {
      label: "Favorite places",
      icon: faHeart,
      route: Routes.FAVORITE_PLACES,
      selected: page === Routes.FAVORITE_PLACES,
      loggedUserRoute: true,
      visible: true,
    },
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
  ]);

  useEffect(() => {
    let newOptions = drawerOptions.map((option) => {
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

    setDrawerOptions(newOptions);
  }, [lastTrip]);

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

  async function logout() {
    setLoading(true);
    dispatch(setIsAuthenticated(false));
    localStorage.removeItem("personUuid");
    dispatch(setPerson(undefined));
    dispatch(setLogout(""));
    history.push(Routes.LOGIN);

    const res = await backend.get(`/auth/logout`);
    setLoading(false);
  }

  function DrawerButtons() {
    return (
      <div style={{ padding: "0px 10px" }}>
        {isAuthenticated && person ? (
          <div>
            <CustomButton
              avatar={
                <Avatar
                  src={person.profilePic ? person.profilePic : CloudImage.avatarWhite}
                />
              }
              backgroundColor={Colors.PURPLE}
              rounded
              style={drawerButtonStyle}
              onClick={() => history.push(Routes.PROFILE)}
            >
              Profile
            </CustomButton>

            <CustomButton
              backgroundColor={Colors.PURPLE}
              rounded
              style={drawerButtonStyle}
              onClick={() => history.push(Routes.CREATE_TRIP)}
            >
              Make trip
            </CustomButton>

            <CustomButton
              backgroundColor={Colors.PURPLE}
              rounded
              loading={loading}
              style={drawerButtonStyle}
              onClick={() => logout()}
            >
              Log out
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
              <Link style={{ color: "white" }} to={Routes.SIGNUP}>
                register
              </Link>
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
        alt="."
        src={logoTypeWhiteFore}
        style={{ height: "40px", margin: "20px auto 0px auto" }}
      />
      <List style={{ marginTop: "40px" }}>
        <DrawerButtons />

        <Divider className={style.divider} />

        {/* Routes for logged users */}
        <ThemeProvider theme={theme}>
          {drawerOptions
            .filter((option) => option.loggedUserRoute)
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

                  <ListItemText
                    classes={{ primary: style.listItemText }}
                    style={{ color: "white" }}
                  >
                    {option.label}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
        </ThemeProvider>

        {/* Routes for all users */}
        <div className={style.routesContainer}>
          <Divider className={style.divider} />

          <ThemeProvider theme={theme}>
            {drawerOptions
              .filter((option) => !option.loggedUserRoute)
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

                    <ListItemText
                      style={{ color: "white" }}
                      classes={{ primary: style.listItemText }}
                    >
                      {option.label}
                    </ListItemText>
                  </ListItem>
                </Link>
              ))}
          </ThemeProvider>
        </div>
      </List>
    </Drawer>
  );
}
