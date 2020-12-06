import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";

export const navbarStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: "white",
    height: "60px",
  },
  defaultHomeNav: {
    display: "inline",
    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
  drawerOpenButton: {
    display: "none",
    [theme.breakpoints.down(1000)]: {
      display: "inline",
    },
  },
  logotype: {
    maxHeight: "40px",
    height: "40px",
    cursor: 'pointer',
  },
  rightChildrenContainer: {
    marginLeft: "auto",
  },
  searchBar: {
    maxHeight: "30px",
    marginLeft: "10px",
    width: "300px",
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
  },
  searchBarText: {
    fontFamily: Family,
    fontSize: "14px",
  },
  toolbar: {
    minHeight: "60px",
    display: "flex",
  },
}));
