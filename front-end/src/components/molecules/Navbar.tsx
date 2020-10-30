import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, IconButton, TextField, Toolbar } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoType } from "../../assets";
import { Colors } from "../../styles";
import { navbarStyles } from "../../styles/Navbar/navbar-styles";
import { selectSearchQuery, onQueryChanged } from "../../utils";
import { ButtonIcon } from "../atoms/ButtonIcon";

export const Navbar: FunctionComponent = ({ children }) => {
  const style = navbarStyles();
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  return (
    <AppBar position="static" className={style.appbar}>
      <Toolbar className={style.toolbar}>
        <img src={logoType} className={style.logotype} />

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

        <div className={style.rightChildrenContainer}>{children}</div>
      </Toolbar>
    </AppBar>
  );
};
