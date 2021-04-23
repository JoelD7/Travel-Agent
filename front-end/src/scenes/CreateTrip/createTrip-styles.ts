import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";

export const createTripStyles = makeStyles((theme: Theme) => ({
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
    width: "calc(100% - 300px)",
  },
  paramsContainer: {
    margin: 10,
  },
}));
