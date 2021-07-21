import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";

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
  navbar: {
    width: "calc(100% - 251px)",
    marginLeft: "auto",
    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },
  noLoggedInContainer: {
    marginBottom: "100px",
    width: "100%",
    [theme.breakpoints.down(960)]: {
      margin: "auto",
      width: "97%",
    },

    [theme.breakpoints.down(450)]: {
      padding: 10,
    },
  },
  noLoggedInGrid: {
    height: "75vh",
    alignContent: "center",
    [theme.breakpoints.down(730)]: {
      width: "100%",
      margin: "auto",
    },
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
