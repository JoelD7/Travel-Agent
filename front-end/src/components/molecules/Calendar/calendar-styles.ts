import { makeStyles, Theme } from "@material-ui/core";
import { Colors } from "../../../styles";

export const calendarStyles = makeStyles((theme: Theme) => ({
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
}));
