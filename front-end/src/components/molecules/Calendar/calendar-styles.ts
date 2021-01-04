import { makeStyles, Theme } from "@material-ui/core";

export const calendarStyles = makeStyles((theme: Theme) => ({
  calendarGrid: {
    width: "80vw",
  },
  calendarItem: {
    width: "calc(80vw / 7)",
    height: "75px",
    paddingLeft: "5px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
}));
