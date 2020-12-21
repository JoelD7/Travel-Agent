import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";

export const navbarStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: "rgba(0,0,0,0)",
    height: "60px",
  },
  appbarHome: {
    backgroundColor: "rgba(0,0,0,0)",
    height: "60px",
    boxShadow: "0px 0px red",
  },
  defaultHomeNav: {
    display: "inline",
    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
  logotype: {
    maxHeight: "40px",
    height: "40px",
    cursor: "pointer",
  },
  rightChildrenContainer: {
    marginLeft: "auto",
  },
  searchBar: {
    maxHeight: "30px",
    marginLeft: "10px",
    width: "300px",
    borderRadius: '10px',
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
  },
  searchBarInput:{
    backgroundColor: "rgba(0,0,0,0)",
  },
  searchBarText: {
    fontFamily: Family,
    fontSize: "16px",
  },
  searchBarInputHome:{
    backgroundColor: "rgba(0,0,0,0)",
  },
  searchBarTextHome: {
    fontFamily: Family,
    fontSize: "16px",
    color: "white",
    "&::placeholder": {
      color: "white",
      opacity: '1',
    },
  },
  toolbar: {
    minHeight: "60px",
    display: "flex",
  },
}));
