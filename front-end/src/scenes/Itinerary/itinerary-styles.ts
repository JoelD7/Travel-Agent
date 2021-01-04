import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";

export const itineraryStyles = makeStyles((theme: Theme) => ({
  daysContainer: {
    width: "80vw",
    marginTop: "30px",
  },
  dayItem: {
    width: "calc(80vw / 7)",
  },
  mainContainer: {
    fontFamily: Font.Family,
  },
  pageContentContainer: {
    marginLeft: "265px",
    width: "calc(100% - 300px)",
  },
}));
