import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../../assets/fonts";
import { Colors, Shadow } from "../../../styles";

export const cardFlightStyles = makeStyles((theme: Theme) => ({
  airportsText: {
    fontSize: "14px",
    color: "#5f5f5f",
    marginTop: "0px",
  },
  card: {
    width: "100%",

    [theme.breakpoints.down(518)]: {
      margin: "10px 0px",
    },
  },
  cardAnimated: {
    width: "100%",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
    [theme.breakpoints.down(518)]: {
      margin: "10px 0px",
    },
  },
  dealGrid: {
    width: "48%",
    margin: "10px",
    [theme.breakpoints.down(990)]: {
      width: "77%",
    },
    [theme.breakpoints.down(865)]: {
      width: "85%",
    },
    [theme.breakpoints.down(635)]: {
      width: "100%",
    },
  },
  dealSubtitle: {
    fontSize: "13px",
    color: Colors.BLUE,
    margin: "0px auto",
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
    [theme.breakpoints.down(925)]: {
      width: "45%",
    },
    [theme.breakpoints.down(625)]: {
      width: "50%",
    },
  },
  timeStopsGrid: {
    width: "10.6%",
    [theme.breakpoints.down(925)]: {
      width: "15%",
    },
    [theme.breakpoints.down(625)]: {
      width: "40%",
      justifyContent: "center",
    },
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
    marginBottom: "2px",
    marginTop: "20px",
  },
  durationSubText: {
    fontSize: "14px",
    marginTop: "4px",
    color: Colors.GRAY,
  },
  mainContainer: {
    fontFamily: Family,
    marginBottom: "10px",
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: Shadow.MEDIUM3D,
  },
  timesText: {
    fontSize: "18px",
    marginBottom: "2px",
  },
}));
