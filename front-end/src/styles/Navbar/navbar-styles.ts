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
    boxShadow: "0px 0px rgba(0,0,0,0)",
    backgroundColor: "white",
    zIndex: 2,
  },

  appbarHome: {
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "0px 0px rgba(0,0,0,0)",
  },
  closeDialogButton: {
    bottom: "20px",
    marginLeft: "auto",
  },
  defaultHomeNav: {
    display: "flex",
    marginRight: "30px",
    alignItems: "center",
    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
  defaultHomeNavDashboard: {
    display: "flex",
    marginRight: "30px",
    alignItems: "center",
    [theme.breakpoints.down(1195)]: {
      display: "none",
    },
  },
  logoLinkContainer: {
    [theme.breakpoints.down(520)]: {
      display: "none",
    },
    [theme.breakpoints.down(375)]: {
      display: "block",
    },
  },
  logoLinkContainerSm: {
    display: "none",
    [theme.breakpoints.down(520)]: {
      display: "block",
    },
    [theme.breakpoints.down(375)]: {
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
  paperWidthSm: {
    width: "515px",
    borderRadius: "10px",
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
    color: Colors.GRAY_TEXT,
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
  searchBoxContainer: {
    width: "350px",
    marginLeft: "10px",
    [theme.breakpoints.down(610)]: {
      width: "57%",
    },
    [theme.breakpoints.down(520)]: {
      width: "71%",
    },
    [theme.breakpoints.down(375)]: {
      display: "none",
    },
  },
  searchBoxContainerPhone: {
    display: "none",
    width: "90%",
    [theme.breakpoints.down(375)]: {
      width: "100%",
      display: "block",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
  toolbar: {
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
  },
}));
