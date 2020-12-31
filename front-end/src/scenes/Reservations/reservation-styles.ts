import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors } from "../../styles";

export const reservationStyles = makeStyles((theme: Theme) => ({
  flightCard: {
    width: "48%",
    minWidth: "506px",
    margin: "8px",
    [theme.breakpoints.down(1325)]: {
      width: "595px",
    },
    [theme.breakpoints.down(560)]: {
      margin: "0px",
    },
  },
  hotelCard: {
    borderRadius: "10px",
    width: "25%",
    margin: "5px",

    [theme.breakpoints.only("md")]: {
      width: "35%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "48%",
    },
    [theme.breakpoints.down(686)]: {
      width: "70%",
    },
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: Colors.BACKGROUND,
  },
  pageContentGrid: {
    marginLeft: "265px",
    width: "81%",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "85%",
    },
    [theme.breakpoints.down(613)]: {
      width: "95%",
    },
  },
}));
