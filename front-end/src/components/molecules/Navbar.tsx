import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, IconButton, TextField, Toolbar, Avatar } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { FunctionComponent, ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { carlos, logoType, logoTypeWhiteFore } from "../../assets";
import { Colors } from "../../styles";
import { navbarStyles } from "../../styles/Navbar/navbar-styles";
import { selectSearchQuery, onQueryChanged, Routes } from "../../utils";
import { CustomButton } from "../atoms";
import { ButtonIcon } from "../atoms/ButtonIcon";
import { NavDrawer } from "./NavDrawer/NavDrawer";

interface Navbar {
  home?: boolean;
  children?: ReactNode;
}

export const Navbar: FunctionComponent<Navbar> = ({ children, home }: Navbar) => {
  const style = navbarStyles();
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const buttonStyle: CreateCSSProperties<{}> = {
    margin: "0 5px 0 5px",
  };

  const userLoggedIn = false;

  const [openDrawer, setOpenDrawer] = useState(false);

  function getInputPropsClasses() {
    return {
      root: home ? style.searchBarInputHome : style.searchBarInput,
      input: home ? style.searchBarTextHome : style.searchBarText,
    };
  }

  return (
    <AppBar position="static" className={home ? style.appbarHome : style.appbar}>
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
            {!userLoggedIn && (
              <>
                <CustomButton
                  style={buttonStyle}
                  label="Login"
                  backgroundColor={home ? "rgba(0,0,0,0)" : Colors.BLUE}
                />
                <CustomButton
                  style={buttonStyle}
                  label="Sign up"
                  backgroundColor={home ? "rgba(0,0,0,0)" : Colors.BLUE}
                />
              </>
            )}

            <CustomButton
              style={buttonStyle}
              label="Trips"
              backgroundColor={home ? "rgba(0,0,0,0)" : Colors.PURPLE}
            />

            {userLoggedIn && (
              <IconButton style={{ marginLeft: "10px" }}>
                <Avatar src={carlos} />
              </IconButton>
            )}
          </div>

          <IconButton
            onClick={() => setOpenDrawer(true)}
          >
            <FontAwesomeIcon color={Colors.BLUE} icon={faBars} />
          </IconButton>
        </div>
      </Toolbar>

      <NavDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </AppBar>
  );
};
