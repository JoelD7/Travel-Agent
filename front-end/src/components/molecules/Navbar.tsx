import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, IconButton, TextField, Toolbar, Avatar } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { carlos, logoType } from "../../assets";
import { Colors } from "../../styles";
import { navbarStyles } from "../../styles/Navbar/navbar-styles";
import { selectSearchQuery, onQueryChanged, Routes } from "../../utils";
import { CustomButton } from "../atoms";
import { ButtonIcon } from "../atoms/ButtonIcon";
import { CDrawer } from "./CDrawer/CDrawer";

export const Navbar: FunctionComponent = ({ children }) => {
  const style = navbarStyles();
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const buttonStyle: CreateCSSProperties<{}> = {
    margin: "0 5px 0 5px",
  };

  const userLoggedIn = false;

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar position="static" className={style.appbar}>
      <Toolbar className={style.toolbar}>
        <Link to={Routes.HOME} style={{outline: 'none', border: 'none'}}>
          <img src={logoType} className={style.logotype} />
        </Link>

        <TextField
          value={searchQuery}
          variant="outlined"
          className={style.searchBar}
          onChange={(e) => dispatch(onQueryChanged({ value: e.target.value }))}
          size="small"
          InputProps={{
            className: style.searchBarText,
            startAdornment: (
              <ButtonIcon
                size="small"
                style={{ marginRight: "5px", padding: "5px" }}
                icon={faSearch}
                primary={"#b1b1b1"}
                secondary={Colors.PURPLE}
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
                  backgroundColor={Colors.BLUE}
                />
                <CustomButton
                  style={buttonStyle}
                  label="Sign up"
                  backgroundColor={Colors.BLUE}
                />
              </>
            )}

            <CustomButton
              style={buttonStyle}
              label="Trips"
              backgroundColor={Colors.PURPLE}
            />

            {userLoggedIn && (
              <IconButton style={{ marginLeft: "10px" }}>
                <Avatar src={carlos} />
              </IconButton>
            )}
          </div>

          <IconButton
            className={style.drawerOpenButton}
            onClick={() => setOpenDrawer(true)}
          >
            <FontAwesomeIcon color={Colors.BLUE} icon={faBars} />
          </IconButton>
        </div>
      </Toolbar>

      <CDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </AppBar>
  );
};
