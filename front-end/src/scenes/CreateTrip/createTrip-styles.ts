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
  },
  leftPane: {
    width: "50%",
  },
  rightPane: {
    width: "50%",
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: "white",
  },
  pageContainer: {
    marginLeft: "275px",
    width: "calc(100% - 320px)",
  },
  paramsContainer: {
    margin: 10,
  },
}));
