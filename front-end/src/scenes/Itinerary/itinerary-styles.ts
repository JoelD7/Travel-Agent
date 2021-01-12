import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const itineraryStyles = makeStyles((theme: Theme) => ({
  calendarGrid: {
    width: "79vw",
  },
  calendarItem: {
    width: "calc(75.5vw / 7)",
    height: "75px",
    margin: "3px",
    paddingLeft: "5px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    border: "1px solid #cecece",
    borderRadius: "5px",
  },
  contentBackgroundContainer: {
    backgroundColor: "white",
    height: "611px",
    boxShadow: Shadow.LIGHT,
    padding: "10px",
    borderRadius: "5px",
  },
  curDayContainer: {
    padding: "3px",
    backgroundColor: Colors.BLUE,
    borderRadius: "50%",
    height: "23px",
    width: "23px",
  },
  dayNumberContainer: {
    height: "30px",
    display: "flex",
    alignItems: "center",
  },
  daysContainer: {
    width: "79vw",
    marginTop: "30px",
  },
  dayItem: {
    width: "calc(78.5vw / 7)",
  },
  mainContainer: {
    backgroundColor: Colors.BACKGROUND,
    fontFamily: Font.Family,
  },
  pageContentContainer: {
    marginLeft: "265px",
    width: "calc(100% - 300px)",
  },
}));