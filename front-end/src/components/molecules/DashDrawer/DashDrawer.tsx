import { getLinkStyle, Routes } from "../../../utils";
import { DrawerOptions } from "../../../utils/types/DrawerOptionsType";
import React, { useState } from "react";
import { faCalendar, faHeart, faPlane } from "@fortawesome/free-solid-svg-icons";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { dashDrawerStyles } from "./dashDrawer-styles";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

export function DashDrawer() {
  const style = dashDrawerStyles();

  let segmentedURL = window.location.pathname.split("/").filter((e) => e.length > 0);
  let page = "/" + segmentedURL[segmentedURL.length - 1];

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
  ]);

  const history = useHistory();

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

  return (
    <Drawer anchor="left" variant="permanent" classes={{ paper: style.drawer }}>
      <List style={{ marginTop: "40px" }}>
        {drawerOptions.map((option, i) => (
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
      </List>
    </Drawer>
  );
}
