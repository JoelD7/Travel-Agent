import { makeStyles, Theme } from "@material-ui/core";
import { Colors } from "..";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";

export const navbarStyles = makeStyles((theme: Theme) => ({
  appbar: {
    height: "60px",
    boxShadow: "0px 0px red",
    backgroundColor: "white",
    zIndex: 2,
  },
  appbarHome: {
    backgroundColor: "rgba(0,0,0,0)",
    height: "60px",
    boxShadow: "0px 0px red",
  },
  defaultHomeNav: {
    display: "flex",
    marginRight: '30px',
    alignItems: 'center',
    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
  logotype: {
    maxHeight: "40px",
    height: "40px",
    cursor: "pointer",
  },
  menuItemRoot: {
    fontFamily: Font.Family,
    borderBottom: `2px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
    fontSize: '18px',
    color: Colors.BLUE,
    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `2px solid ${Colors.PURPLE_HOVER}`,
      },
    },
    "&.MuiListItem-button": {
      "&:hover": {
        borderBottom: `2px solid ${Colors.PURPLE_HOVER}`,
      },
    },
  },
  rightChildrenContainer: {
    marginLeft: "auto",
    display: "flex",
    alignItems: 'center',
  },
  searchBar: {
    marginLeft: "10px",
    width: "300px",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
  },
  searchBarInput: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  searchBarText: {
    fontFamily: Family,
    fontSize: "16px",
  },
  searchBarInputHome: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  searchBarTextHome: {
    fontFamily: Family,
    fontSize: "16px",
    color: "white",
    "&::placeholder": {
      color: "white",
      opacity: "1",
    },
  },
  toolbar: {
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
  },
}));
