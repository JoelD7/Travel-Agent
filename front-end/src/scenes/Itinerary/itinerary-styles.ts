import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const itineraryStyles = makeStyles((theme: Theme) => ({
  calendarGrid: {
    width: "80vw",
  },
  calendarItem: {
    width: "calc(80vw / 7)",
    height: "75px",
    paddingLeft: "5px",
  },
  calendarItemBorderTopLeft: {
    borderTop: "1px solid #cecece",
    borderLeft: "1px solid #cecece",
    borderRight: "1px solid #cecece",
    borderBottom: "1px solid #cecece",
  },
  calendarItemBorderTop: {
    borderTop: "1px solid #cecece",
    borderRight: "1px solid #cecece",
    borderBottom: "1px solid #cecece",
  },
  calendarItemBorderReg: {
    borderRight: "1px solid #cecece",
    borderBottom: "1px solid #cecece",
  },
  calendarItemBorderRegLeft: {
    borderRight: "1px solid #cecece",
    borderLeft: "1px solid #cecece",
    borderBottom: "1px solid #cecece",
  },
  contentBackgroundContainer: {
    backgroundColor: "white",
    boxShadow: Shadow.LIGHT,
    padding: "10px",
    borderRadius: "5px",
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
