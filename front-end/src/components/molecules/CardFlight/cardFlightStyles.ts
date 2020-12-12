import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../../assets/fonts";
import { Colors, Shadow } from "../../../styles";

export const cardFlightStyles = makeStyles((theme: Theme) => ({
  airportsText: {
    fontSize: "14px",
    color: "#5f5f5f",
    marginTop: "0px",
  },
  planeIconGrid: {
    width: "8.3%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timesIataGrid: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down(625)]: {
      width: "75.1%",
    },
  },
  timeStopsGrid: {
    width: "10.6%",
    alignItems: "center",
    justifyContent: "center",
  },
  priceButtonGrid: {
    width: "31%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    [theme.breakpoints.down(625)]: {
      display: "none",
    },
  },
  priceButtonGridFull: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    [theme.breakpoints.down(625)]: {
      display: "none",
    },
  },
  priceButtonXS: {
    display: "none",
    [theme.breakpoints.down(625)]: {
      display: "block",
    },
  },
  priceGridRes: {
    display: "none",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "50%",

    [theme.breakpoints.down(625)]: {
      display: "flex",
    },
  },
  buttonGridRes: {
    display: "none",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "50%",

    [theme.breakpoints.down(625)]: {
      display: "flex",
    },
  },
  durationText: {
    fontSize: "14px",
    marginBottom: "2px",
    marginTop: "20px",
  },
  durationSubText: {
    fontSize: "12px",
    marginTop: "4px",
    color: Colors.GRAY,
  },
  mainContainer: {
    fontFamily: Family,
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: Shadow.LIGHT,
  },
  timesText: {
    fontSize: "18px",
    marginBottom: "2px",
  },
}));
