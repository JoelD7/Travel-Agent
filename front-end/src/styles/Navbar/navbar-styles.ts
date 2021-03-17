import { makeStyles, Theme } from "@material-ui/core";
import { Colors } from "..";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";

export const navbarStyles = makeStyles((theme: Theme) => ({
  autocompleteAdornment: {
    position: "absolute",
    top: "-5px",
  },
  autocompleteContainer: {
    width: "300px",
    [theme.breakpoints.down(500)]: {
      width: "68vw",
    },
  },
  autocompelteListbox: {
    fontFamily: Font.Family,
  },
  autocompleteOption: {
    color: Colors.BLUE,
    fontWeight: "bold",
  },
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
    marginRight: "30px",
    alignItems: "center",
    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
  logoLinkContainer: {
    [theme.breakpoints.down(520)]: {
      display: "none",
    },
  },
  logoLinkContainerSm: {
    display: "none",
    [theme.breakpoints.down(520)]: {
      display: "block",
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
    fontSize: "18px",
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
  popupIndicatorOpen: {
    transform: "rotate(0deg)",
  },
  rightChildrenContainer: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  searchBar: {
    marginLeft: "10px",
    width: "300px",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
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
    color: Colors.GRAY,
  },
  searchBarText: {
    fontFamily: Family,
    fontSize: "16px",
  },
  searchBarInputHome: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "white",
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
