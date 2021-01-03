import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";

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
