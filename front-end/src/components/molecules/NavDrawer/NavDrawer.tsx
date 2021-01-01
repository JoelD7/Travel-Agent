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
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { carlos, logoTypeWhiteFore } from "../../../assets";
import { Family } from "../../../assets/fonts";
import { Colors } from "../../../styles";
import { getLinkStyle, Routes } from "../../../utils";
import { DrawerOptions } from "../../../utils/types/DrawerOptionsType";
import { CustomButton } from "../../atoms";
import { drawerButtonStyle, drawerStyles } from "./navDrawer-styles";

interface CDrawerProps {
  open: boolean;
  userLoggedIn?: boolean;
  onClose: () => void;
}

export function NavDrawer({ open, onClose, userLoggedIn }: CDrawerProps) {
  const style = drawerStyles();

  let segmentedURL = window.location.pathname.split("/").filter((e) => e.length > 0);
  let page = "/" + segmentedURL[segmentedURL.length - 1];

  const [drawerOptions, setDrawerOptions] = useState<DrawerOptions[]>([
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
      route: Routes.HOTELS,
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
      route: Routes.RESTAURANTS,
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
      route: "",
      selected: false,
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
              onClick={() => {}}
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

        <Divider style={{ backgroundColor: "#cecece" }} />

        {drawerOptions
          .filter((o) => !o.user)
          .map((option, i) => (
            <Link style={getLinkStyle("white")} to={option.route}>
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

                <ListItemText style={{ color: "white" }}>{option.label}</ListItemText>
              </ListItem>
            </Link>
          ))}
      </List>
    </Drawer>
  );
}
