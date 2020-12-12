import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const flightDetailsStyles = makeStyles((theme: Theme) => ({
  closeButton: {
    marginLeft: "auto",
    marginBottom: "32px",
  },
  flightCard: {
    borderRadius: "5px",
    boxShadow: Shadow.LIGHT,
    padding: "0px 15px",
    margin: "10px",
    backgroundColor: "white",
  },
  flightCardCities: {
    marginLeft: "auto",
    color: Colors.GRAY,
    fontSize: "14px",
  },
  firstTime: {
    textAlign: "end",
    fontWeight: "bold",
    margin: "auto",
  },
  firstIata: {
    textAlign: "end",
    marginTop: "0px",
  },
  secondTime: {
    textAlign: "start",
    fontWeight: "bold",
    margin: "auto",
  },
  secondIata: {
    textAlign: "start",
    marginTop: "0px",
  },
  timeDivider: {
    height: "5px",
    backgroundColor: Colors.BLUE,
    borderRadius: "10px",
  },
  flightCardDate: {
    fontSize: "14px",
    marginLeft: "7px",
    marginTop: "18px",
  },
  mainContainer: {
    fontFamily: Font.Family,
    width: "750px",
    padding: "10px 30px",
    borderRadius: "5px",
    backgroundColor: "#f6f6f9",
    minWidth: "525px",

    [theme.breakpoints.down(820)]: {
      width: "100%",
    },
    [theme.breakpoints.down(630)]: {
      padding: "10px 10px",
    },
  },
  paper: {
    maxWidth: "750px",
    minWidth: "525px",
    [theme.breakpoints.down(820)]: {
      width: "90%",
    },
  },
  subtitle: {
    marginTop: "0px",
  },
}));
