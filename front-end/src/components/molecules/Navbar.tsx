import { faBars, faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { carlos, Font, logoIcon, logoType, logoTypeWhiteFore } from "../../assets";
import { Colors } from "../../styles";
import { navbarStyles } from "../../styles/Navbar/navbar-styles";
import {
  getLinkStyle,
  IATALocation,
  LocationType,
  Routes,
  selectOriginCity,
  selectSearchQuery,
} from "../../utils";
import {
  fetchNewAccessToken,
  isAccessTokenUpdatable,
  updateAccessToken,
} from "../../utils/external-apis/amadeus-apis";
import { CustomButton, IconTP, Text } from "../atoms";
import { IataAutocomplete } from "./IataAutocomplete/IataAutocomplete";
import { NavDrawer } from "./NavDrawer/NavDrawer";

interface Navbar {
  transparent?: boolean;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
}

export const Navbar: FunctionComponent<Navbar> = ({
  transparent,
  position = "relative",
}: Navbar) => {
  const style = navbarStyles();
  const searchQuery = useSelector(selectSearchQuery);

  useEffect(() => {
    if (isAccessTokenUpdatable()) {
      fetchNewAccessToken()
        .then((res) => {
          updateAccessToken(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [searchQuery]);

  let userLoggedIn = true;
  // userLoggedIn = false;

  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openOriginCityDialog, setOpenOriginCityDialog] = useState(false);
  const [openRequiredFieldSnack, setOpenRequiredFieldSnack] = useState(false);

  const originCity: IATALocation = useSelector(selectOriginCity);

  function onAvatarClick(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }

  function onContinueClick() {
    if (originCity === null) {
      setOpenRequiredFieldSnack(true);
      return;
    }

    setOpenOriginCityDialog(false);
  }

  function onMenuClose() {
    setAnchorEl(null);
  }

  function onChangeOriginCityClick() {
    setOpenOriginCityDialog(true);
  }

  return (
    <AppBar position={position} className={transparent ? style.appbarHome : style.appbar}>
      <Toolbar style={{ padding: "15px" }}>
        <Grid container alignItems="center">
          <Link
            to={Routes.HOME}
            style={{ outline: "none", border: "none" }}
            className={style.logoLinkContainer}
          >
            <img
              alt=" "
              src={transparent ? logoTypeWhiteFore : logoType}
              className={style.logotype}
            />
          </Link>

          {/* Home */}
          <Link
            to={Routes.HOME}
            style={{ outline: "none", border: "none" }}
            className={style.logoLinkContainerSm}
          >
            <img alt=" " src={logoIcon} className={style.logotype} />
          </Link>

          {/* Search box */}
          <Grid item className={style.searchBoxContainer}>
            <IataAutocomplete
              className={style.autocompleteContainer}
              type="city"
              isInNavbar
              home={transparent}
            />
          </Grid>

          <Grid item className={style.rightChildrenContainer}>
            <div className={style.defaultHomeNav}>
              {/* Trip reservations */}
              {userLoggedIn ? (
                <>
                  <MenuItem
                    // selected={page === }
                    classes={{ root: style.menuItemRoot }}
                  >
                    <Link
                      style={
                        transparent ? getLinkStyle("white") : getLinkStyle(Colors.BLUE)
                      }
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
                      style={
                        transparent ? getLinkStyle("white") : getLinkStyle(Colors.BLUE)
                      }
                      to={Routes.RESERVATIONS}
                    >
                      Reservations
                    </Link>
                  </MenuItem>
                </>
              ) : (
                // login
                <>
                  <MenuItem
                    onClick={() => {}}
                    style={transparent ? { color: "white" } : {}}
                    classes={{ root: style.menuItemRoot }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={() => {}}
                    style={transparent ? { color: "white" } : {}}
                    classes={{ root: style.menuItemRoot }}
                  >
                    Sign Up
                  </MenuItem>
                </>
              )}

              {userLoggedIn && (
                <IconButton onClick={onAvatarClick} style={{ marginLeft: "10px" }}>
                  <Avatar src={carlos} />
                </IconButton>
              )}
            </div>

            <IconButton onClick={() => setOpenDrawer(true)}>
              <FontAwesomeIcon
                color={transparent ? "white" : Colors.BLUE}
                icon={faBars}
              />
            </IconButton>
          </Grid>

          {/* Search box phones */}
          <Grid item className={style.searchBoxContainerPhone}>
            <IataAutocomplete
              className={style.autocompleteContainer}
              type="city"
              isInNavbar
              home={transparent}
            />
          </Grid>
        </Grid>
      </Toolbar>

      <NavDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />

      {/* Change origin city menu */}
      <div>
        <Menu
          open={Boolean(anchorEl)}
          onClose={() => onMenuClose()}
          style={{ top: "39px" }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem
            classes={{ root: style.menuItemRoot }}
            onClick={() => onChangeOriginCityClick()}
          >
            Change origin city
          </MenuItem>
        </Menu>
      </div>

      {/* Dialog */}
      <Dialog open={openOriginCityDialog} classes={{ paperWidthSm: style.paperWidthSm }}>
        {/* Title */}
        <Grid container style={{ padding: "15px" }} alignItems="center">
          <IconTP icon={faMapMarkerAlt} size={40} style={{ padding: "10px" }} />

          <Text component="h2" style={{ marginLeft: "10px" }} bold color={Colors.BLUE}>
            Where are you from?
          </Text>

          <IconButton
            className={style.closeDialogButton}
            onClick={() => setOpenOriginCityDialog(false)}
          >
            <FontAwesomeIcon icon={faTimes} color={Colors.BLUE} />
          </IconButton>
        </Grid>

        {/* Content */}
        <DialogContent>
          <Text style={{ marginLeft: "12px" }}>
            Quickly answer this question before continue.
          </Text>
          <IataAutocomplete type="city" cityType={LocationType.ORIGIN} required />
        </DialogContent>

        <DialogActions style={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton backgroundColor={Colors.GREEN} onClick={() => onContinueClick()}>
            Continue
          </CustomButton>
        </DialogActions>
      </Dialog>

      {/* Snack */}
      <Snackbar
        open={openRequiredFieldSnack}
        autoHideDuration={6000}
        onClose={() => setOpenRequiredFieldSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenRequiredFieldSnack(false)}
          severity="error"
        >
          The required field must be filled.
        </Alert>
      </Snackbar>
    </AppBar>
  );
};
