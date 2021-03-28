import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Avatar, IconButton, MenuItem, Toolbar } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { carlos, logoIcon, logoType, logoTypeWhiteFore } from "../../assets";
import { Colors } from "../../styles";
import { navbarStyles } from "../../styles/Navbar/navbar-styles";
import {
  getLinkStyle,
  Routes,
  selectSearchQuery,
  updateCityPredictions,
} from "../../utils";
import {
  fetchAirportCitiesByInput,
  fetchNewAccessToken,
  isAccessTokenUpdatable,
  updateAccessToken,
} from "../../utils/external-apis/amadeus-apis";
import { IataAutocomplete } from "./IataAutocomplete/IataAutocomplete";
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAccessTokenUpdatable()) {
      fetchNewAccessToken()
        .then((res) => {
          updateAccessToken(res.data);
          // getCityPredictions();
        })
        .catch((error) => console.log(error));
    } else {
      // getCityPredictions();
    }
  }, [searchQuery]);

  function getCityPredictions() {
    if (searchQuery === "") {
      return;
    }
    fetchAirportCitiesByInput(searchQuery, "CITY")
      .then((res) => {
        dispatch(updateCityPredictions(res.data.data));
      })
      .catch((error) => console.log(error));
  }

  let userLoggedIn = true;
  // userLoggedIn = false;

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar position={position} className={home ? style.appbarHome : style.appbar}>
      <Toolbar className={style.toolbar}>
        <Link
          to={Routes.HOME}
          style={{ outline: "none", border: "none" }}
          className={style.logoLinkContainer}
        >
          <img src={home ? logoTypeWhiteFore : logoType} className={style.logotype} />
        </Link>

        <Link
          to={Routes.HOME}
          style={{ outline: "none", border: "none" }}
          className={style.logoLinkContainerSm}
        >
          <img src={logoIcon} className={style.logotype} />
        </Link>

        {/* Search box */}
        <IataAutocomplete
          className={style.autocompleteContainer}
          type="city"
          isInNavbar
          home={home}
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
