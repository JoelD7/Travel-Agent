import {
  faCar,
  faDice,
  faHotel,
  faPlaneDeparture,
  faUser,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  createMuiTheme,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@material-ui/core";
import React, { useState } from "react";
import { carlos, logoTypeWhiteFore } from "../../../assets";
import { Family } from "../../../assets/fonts";
import { Colors, Shadow } from "../../../styles";
import { DrawerOptions } from "../../../utils/types/DrawerOptionsType";
import { CustomButton } from "../../atoms";
import { drawerButtonStyle, drawerStyles } from "./cdrawer-styles";

interface CDrawerProps {
  open: boolean;
  userLoggedIn?: boolean;
  onClose: () => void;
}

export function CDrawer({ open, onClose, userLoggedIn }: CDrawerProps) {
  const style = drawerStyles();

  const theme = createMuiTheme({
    overrides: {
      MuiListItem: {
        root: {
          borderBottom: `2px solid ${Colors.BLUE}`,
          "&.Mui-selected": {
            backgroundColor: Colors.BLUE_HOVER,

            "&:hover": {
              backgroundColor: Colors.BLUE_HOVER,
            },
          },
        },
      },
    },
  });

  const [drawerOptions, setDrawerOptions] = useState<DrawerOptions[]>([
    {
      label: "Hotels",
      icon: faHotel,
      route: "",
      selected: false,
    },
    {
      label: "Flights",
      icon: faPlaneDeparture,
      route: "",
      selected: false,
    },
    {
      label: "Restaurants",
      icon: faUtensils,
      route: "",
      selected: false,
    },
    {
      label: "Things to do",
      icon: faDice,
      route: "",
      selected: false,
    },
    {
      label: "Car rental",
      icon: faCar,
      route: "",
      selected: false,
    },
  ]);

  function onOptionClick(option: DrawerOptions) {
    let newDrawer = drawerOptions.map((op) => {
      if (op.label === option.label) {
        return { ...op, selected: !op.selected };
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
              label="Account"
              avatar={<Avatar src={carlos} />}
              backgroundColor={Colors.PURPLE}
              rounded
              style={drawerButtonStyle}
              onClick={() => {}}
            />

            <CustomButton
              label="Make trip"
              backgroundColor={Colors.PURPLE}
              rounded
              style={drawerButtonStyle}
              onClick={() => {}}
            />
          </div>
        ) : (
          <div style={{ fontFamily: Family }}>
            <CustomButton
              label="Login"
              backgroundColor={Colors.PURPLE}
              rounded
              style={{ ...drawerButtonStyle, marginBottom: "0px" }}
              onClick={() => {}}
            />

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
      <ThemeProvider theme={theme}>
        <List style={{ marginTop: "40px" }}>
          <DrawerButtons />

          <Divider style={{ backgroundColor: "#cecece" }} />

          {drawerOptions.map((option, i) => (
            <ListItem
              selected={option.selected}
              button
              key={i}
              classes={{
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
          ))}
        </List>
      </ThemeProvider>
    </Drawer>
  );
}
