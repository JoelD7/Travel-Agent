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
  useMediaQuery,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { CSSProperties, FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { CloudImage, Font, logoIcon, logoType, logoTypeWhiteFore } from "../../assets";
import { Colors } from "../../styles";
import { navbarStyles } from "../../styles/Navbar/navbar-styles";
import {
  getLinkStyle,
  IATALocation,
  AutocompleteType,
  LocationType,
  Person,
  Routes,
  selectIsAuthenticated,
  selectOriginCity,
  selectPerson,
  selectSearchQuery,
} from "../../utils";
import {
  fetchNewAccessToken,
  isAccessTokenUpdatable,
  updateAccessToken,
} from "../../utils/external-apis/amadeus-apis";
import { CustomButton, IconTP, Text } from "../atoms";
import { IataAutocomplete, NavDrawer } from "../organisms";

interface Navbar {
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  variant?: "transparent" | "auth" | "dashboard" | "regular";
  className?: string;
  style?: CSSProperties;
  /**
   * Indicates if the navbar is on a page that includes
   * a dashboard. In this case, the navbar should be smaller.
   */
}

export const Navbar: FunctionComponent<Navbar> = ({
  variant = "regular",
  className,
  style: styleParam,
  position = "relative",
}: Navbar) => {
  const style = navbarStyles();
  const searchQuery = useSelector(selectSearchQuery);
  const match = useRouteMatch();
  const route = match.path;
  const history = useHistory();

  useEffect(() => {
    if (isAccessTokenUpdatable()) {
      fetchNewAccessToken()
        .then((res) => {
          updateAccessToken(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [searchQuery]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openOriginCityDialog, setOpenOriginCityDialog] = useState(false);
  const [openRequiredFieldSnack, setOpenRequiredFieldSnack] = useState(false);

  const originCity: IATALocation = useSelector(selectOriginCity);
  const person: Person | undefined = useSelector(selectPerson);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);

  const is450OrLess = useMediaQuery("(max-width:450px)");

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

  function getAppbarClassname() {
    return `${className} ${variant === "transparent" ? style.appbarHome : style.appbar}`;
  }

  function getAvatarPicture(): string {
    if (person && person.profilePic) {
      return person.profilePic;
    }

    return variant === "transparent" ? CloudImage.avatarWhite : CloudImage.avatar;
  }

  return (
    <AppBar style={styleParam} position={position} className={getAppbarClassname()}>
      <Toolbar style={is450OrLess ? { padding: "15px" } : {}}>
        <Grid container alignItems="center">
          <Link
            to={Routes.HOME}
            style={{ outline: "none", border: "none" }}
            className={style.logoLinkContainer}
          >
            <img
              alt=" "
              src={variant === "transparent" ? logoTypeWhiteFore : logoType}
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
          {variant !== "auth" && (
            <Grid item className={style.searchBoxContainer}>
              <IataAutocomplete
                className={style.autocompleteContainer}
                type={AutocompleteType.CITY}
                isInNavbar
                home={variant === "transparent"}
              />
            </Grid>
          )}

          <Grid item className={style.rightChildrenContainer}>
            <div
              className={
                variant === "dashboard"
                  ? style.defaultHomeNavDashboard
                  : style.defaultHomeNav
              }
            >
              {/* Trip reservations */}
              {isAuthenticated ? (
                <>
                  <MenuItem
                    selected={route === Routes.TRIPS}
                    classes={{ root: style.menuItemRoot }}
                  >
                    <Link
                      style={
                        variant === "transparent"
                          ? getLinkStyle("white")
                          : getLinkStyle(Colors.BLUE)
                      }
                      to={Routes.TRIPS}
                    >
                      Trips
                    </Link>
                  </MenuItem>
                  <MenuItem
                    selected={route === Routes.RESERVATIONS}
                    classes={{ root: style.menuItemRoot }}
                  >
                    <Link
                      style={
                        variant === "transparent"
                          ? getLinkStyle("white")
                          : getLinkStyle(Colors.BLUE)
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
                    selected={route === Routes.LOGIN}
                    style={variant === "transparent" ? { color: "white" } : {}}
                    classes={{ root: style.menuItemRoot }}
                  >
                    <Link
                      style={
                        variant === "transparent"
                          ? getLinkStyle("white")
                          : getLinkStyle(Colors.BLUE)
                      }
                      to={Routes.LOGIN}
                    >
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {}}
                    selected={route === Routes.SIGNUP}
                    style={variant === "transparent" ? { color: "white" } : {}}
                    classes={{ root: style.menuItemRoot }}
                  >
                    <Link
                      style={
                        variant === "transparent"
                          ? getLinkStyle("white")
                          : getLinkStyle(Colors.BLUE)
                      }
                      to={Routes.SIGNUP}
                    >
                      Sign up
                    </Link>
                  </MenuItem>
                </>
              )}

              {isAuthenticated && person && (
                <IconButton onClick={onAvatarClick} style={{ marginLeft: "10px" }}>
                  <Avatar src={getAvatarPicture()} />
                </IconButton>
              )}
            </div>

            <IconButton onClick={() => setOpenDrawer(true)}>
              <FontAwesomeIcon
                color={variant === "transparent" ? "white" : Colors.BLUE}
                icon={faBars}
              />
            </IconButton>
          </Grid>

          {/* Search box for phones */}
          {variant !== "auth" && (
            <Grid item className={style.searchBoxContainerPhone}>
              <IataAutocomplete
                className={style.autocompleteContainer}
                type={AutocompleteType.CITY}
                isInNavbar
                home={variant === "transparent"}
              />
            </Grid>
          )}
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
            style={{ fontSize: 16 }}
            classes={{ root: style.menuItemRoot }}
            onClick={() => history.push(Routes.PROFILE)}
          >
            Profile
          </MenuItem>

          <MenuItem
            style={{ fontSize: 16 }}
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
          <IataAutocomplete
            type={AutocompleteType.CITY}
            cityType={LocationType.ORIGIN}
            required
          />
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
