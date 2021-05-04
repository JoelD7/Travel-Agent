import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Shadow } from "../../styles";

export const favPlacesStyles = makeStyles((theme: Theme) => ({
  favCard: {
    margin: "10px",
    boxShadow: Shadow.LIGHT3D,
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
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: "white",
  },
  mainGrid: {
    marginLeft: "290px",
    width: "calc(100% - 330px)",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      margin: "auto",
    },
  },
  navbar: {
    width: "calc(100% - 251px)",
    marginLeft: "auto",
    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
