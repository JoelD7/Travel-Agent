import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  IconButton,
  TextField,
  Toolbar,
  Avatar,
  MenuItem,
} from "@material-ui/core";
import React, { FunctionComponent, ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { carlos, logoType, logoTypeWhiteFore } from "../../assets";
import { Colors } from "../../styles";
import { navbarStyles } from "../../styles/Navbar/navbar-styles";
import { selectSearchQuery, onQueryChanged, Routes, getLinkStyle } from "../../utils";
import { ButtonIcon } from "../atoms/ButtonIcon";
import { NavDrawer } from "./NavDrawer/NavDrawer";

interface Navbar {
  home?: boolean;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
}

export const Navbar: FunctionComponent<Navbar> = ({
  home,
  position = "relative",
}: Navbar) => {
  const style = navbarStyles();
  const searchQuery = useSelector(selectSearchQuery);
  console.log("Search query: ", searchQuery);
  const dispatch = useDispatch();
  const history = useHistory();

  let userLoggedIn = true;
  // userLoggedIn = false;

  const [openDrawer, setOpenDrawer] = useState(false);

  let segmentedURL = window.location.pathname.split("/").filter((e) => e.length > 0);
  let page = "/" + segmentedURL[segmentedURL.length - 1];

  function getInputPropsClasses() {
    return {
      root: home ? style.searchBarInputHome : style.searchBarInput,
      input: home ? style.searchBarTextHome : style.searchBarText,
    };
  }

  return (
    <AppBar position={position} className={home ? style.appbarHome : style.appbar}>
      <Toolbar className={style.toolbar}>
        <Link to={Routes.HOME} style={{ outline: "none", border: "none" }}>
          <img src={home ? logoTypeWhiteFore : logoType} className={style.logotype} />
        </Link>

        <TextField
          value={searchQuery}
          variant="outlined"
          placeholder="Search locations"
          className={style.searchBar}
          onChange={(e) => dispatch(onQueryChanged({ value: e.target.value }))}
          size="small"
          InputProps={{
            classes: getInputPropsClasses(),
            startAdornment: (
              <ButtonIcon
                size="small"
                style={{ marginRight: "5px", padding: "5px" }}
                icon={faSearch}
                primary={home ? "white" : "#b1b1b1"}
                secondary={home ? "white" : Colors.PURPLE}
                onClick={() => console.log("hello")}
              />
            ),
          }}
        />

        <div className={style.rightChildrenContainer}>
          <div className={style.defaultHomeNav}>
            {userLoggedIn ? (
              <>
                <MenuItem
                  // selected={page === }
                  classes={{ root: style.menuItemRoot }}
                >
                  <Link
                    style={home ? getLinkStyle("white") : getLinkStyle(Colors.BLUE)}
                    to={Routes.TRIPS}
                  >
                    Trips
                  </Link>
                </MenuItem>
                <MenuItem
                  // selected={page === }
                  classes={{ root: style.menuItemRoot }}
                >
                  <Link
                    style={home ? getLinkStyle("white") : getLinkStyle(Colors.BLUE)}
                    to={Routes.RESERVATIONS}
                  >
                    Reservations
                  </Link>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {}}
                  style={home ? { color: "white" } : {}}
                  classes={{ root: style.menuItemRoot }}
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                  style={home ? { color: "white" } : {}}
                  classes={{ root: style.menuItemRoot }}
                >
                  Sign Up
                </MenuItem>
              </>
            )}

            {userLoggedIn && (
              <IconButton style={{ marginLeft: "10px" }}>
                <Avatar src={carlos} />
              </IconButton>
            )}
          </div>

          <IconButton onClick={() => setOpenDrawer(true)}>
            <FontAwesomeIcon color={home ? "white" : Colors.BLUE} icon={faBars} />
          </IconButton>
        </div>
      </Toolbar>

      <NavDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </AppBar>
  );
};
