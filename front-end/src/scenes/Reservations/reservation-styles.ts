import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const reservationStyles = makeStyles((theme: Theme) => ({
  flightCard: {
    width: "48%",
    margin: "8px",
    [theme.breakpoints.down(1325)]: {
      width: "595px",
    },
  },
  footerContainer: {
    position: "relative",
    zIndex: 3,
    marginTop: "250px",
    width: "90%",
    marginLeft: "auto",

    [theme.breakpoints.down(1000)]: {
      width: "100%",
    },
  },
  hotelCard: {
    borderRadius: "10px",
    width: "25%",
    minWidth: "290px",
    margin: "5px",
    boxShadow: Shadow.LIGHT3D,

    [theme.breakpoints.only("md")]: {
      width: "35%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "48%",
    },
    [theme.breakpoints.down(686)]: {
      width: "70%",
    },
    [theme.breakpoints.down(401)]: {
      width: "70%",
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
  noReservationContainer: {
    marginLeft: "260px",
    marginBottom: "100px",
    width: "calc(100% - 260px)",
    [theme.breakpoints.down(960)]: {
      margin: "auto",
      width: "97%",
    },

    [theme.breakpoints.down(450)]: {
      padding: 10,
    },
  },
  noReservationGrid: {
    height: "75vh",
    alignContent: "center",
    [theme.breakpoints.down(730)]: {
      width: "100%",
      margin: "auto",
    },
  },
  pageContentGrid: {
    marginLeft: "265px",
    marginBottom: "100px",
    width: "81%",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "85%",
    },
    [theme.breakpoints.down(666)]: {
      width: "95%",
    },
  },
}));
