import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors } from "../../styles";

export const createTripStyles = makeStyles((theme: Theme) => ({
  footerContainer: {
    position: "relative",
    zIndex: 3,
    width: "90%",
    marginLeft: "auto",
    marginTop: "250px",
    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },
  leftPane: {
    width: "50%",
    [theme.breakpoints.down(720)]: {
      width: "100%",
    },
  },
  rightPane: {
    width: "50%",
    [theme.breakpoints.down(720)]: {
      width: "100%",
      marginTop: 30,
    },
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: "white",
  },
  pageContainer: {
    marginLeft: "275px",
    width: "calc(100% - 320px)",

    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },

    [theme.breakpoints.down(960)]: {
      width: "90%",
      margin: "auto",
    },
  },
  paramsContainer: {
    margin: 10,
  },
}));
