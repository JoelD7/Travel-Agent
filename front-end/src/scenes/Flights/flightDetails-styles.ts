import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const flightDetailsStyles = makeStyles((theme: Theme) => ({
  airlineLogoGrid: {
    width: "21%",
    [theme.breakpoints.down(405)]: {
      display: "none",
    },
  },
  airlineLogoGridXs: {
    width: "50%",
    display: "none",
    [theme.breakpoints.down(405)]: {
      display: "block",
    },
  },
  backdrop: {
    backdropFilter: "blur(4px)",
  },
  closeButton: {
    marginLeft: "auto",
    marginBottom: "32px",
    width: "45px",
    height: "45px",
    position: "absolute",
    left: "92%",
    [theme.breakpoints.down(730)]: {
      top: "5px",
    },
    [theme.breakpoints.down(500)]: {
      left: "88%",
    },
  },
  citiesGrid: {
    width: "50%",
    [theme.breakpoints.down(460)]: {
      width: "100%",
    },
  },
  dateGrid: {
    width: "50%",
    marginTop: "10px",
    [theme.breakpoints.down(460)]: {
      width: "100%",
    },
  },
  dividerGrid: {
    width: "8.3%",
    [theme.breakpoints.down(730)]: {
      width: "15%",
    },
  },
  durationGrid: {
    width: "25%",
    [theme.breakpoints.down(730)]: {
      display: "none",
    },
  },
  durationGridSm: {
    display: "none",
    marginBottom: "10px",
    [theme.breakpoints.down(730)]: {
      display: "block",
      width: "21%",
    },
    [theme.breakpoints.down(405)]: {
      width: "50%",
    },
  },
  durationTextSm: {
    margin: "5px auto",
    textAlign: "center",
  },
  flightCard: {
    borderRadius: "5px",
    boxShadow: "2px 2px 8px rgb(118 118 118 / 50%)",
    padding: "0px 15px",
    margin: "10px",
    backgroundColor: "white",
  },
  flightCardCities: {
    marginLeft: "auto",
    color: Colors.GRAY_TEXT,
    textAlign: "end",
    marginBottom: "0px",
    fontSize: "14px",
    [theme.breakpoints.down(460)]: {
      textAlign: "start",
      marginTop: "2px",
    },
  },
  firstTime: {
    textAlign: "end",
    fontWeight: "bold",
    margin: "auto",
  },
  firstIata: {
    textAlign: "end",
    margin: "0px",
  },
  secondTime: {
    textAlign: "start",
    fontWeight: "bold",
    margin: "auto",
  },
  secondIata: {
    textAlign: "start",
    margin: "0px",
  },
  timeDivider: {
    height: "5px",
    backgroundColor: Colors.BLUE,
    borderRadius: "10px",
  },
  flightCardDate: {
    marginLeft: "7px !important",
    marginTop: "18px",
    marginBottom: "0px !important",
  },
  mainContainer: {
    fontFamily: Font.Family,
    width: "750px",
    padding: "10px 30px",
    borderRadius: "5px",

    [theme.breakpoints.down(820)]: {
      width: "100%",
    },
    [theme.breakpoints.down(630)]: {
      padding: "10px 10px",
    },
  },
  paper: {
    maxWidth: "750px",
    [theme.breakpoints.down(820)]: {
      width: "90%",
    },
  },
  subtitle: {
    marginTop: "0px",
  },
  timeGrid: {
    width: "25%",
    [theme.breakpoints.down(730)]: {
      width: "32%",
    },
    [theme.breakpoints.down(405)]: {
      width: "40%",
      marginBottom: "10px",
    },
  },
}));
