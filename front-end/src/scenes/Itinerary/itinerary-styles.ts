import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const itineraryStyles = makeStyles((theme: Theme) => ({
  calendarGrid: {
    width: "100%",
  },
  calendarItemContainer: {
    width: "12.65%",
    padding: 3,
    height: "75px",
    [theme.breakpoints.down(405)]: {
      width: "12%",
    },
  },
  calendarItem: {
    paddingLeft: "5px",
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
    justifyContent: "flex-start",
    border: "1px solid #cecece",
    borderRadius: "5px",
    transition: "all .2s ease-in-out",
    zIndex: 1,
    "&:hover": {
      transform: "scale(1.05)",
      filter: "brightness(80%)",
      zIndex: 2,
    },
  },
  contentBackgroundContainer: {
    backgroundColor: "white",
    height: "611px",
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
    width: "100%",
    marginTop: "30px",
  },
  dayItemContainer: {
    width: "12.65%",
    padding: 3,
    height: 23,
    [theme.breakpoints.down(405)]: {
      width: "12%",
    },
  },
  iconGrid: {
    width: "100%",
    alignSelf: "flex-end",
    marginLeft: "auto",
    marginBottom: 3,
  },
  mainContainer: {
    backgroundColor: "white",
    fontFamily: Font.Family,
  },
  navbar: {
    width: "calc(100% - 251px)",
    marginLeft: "auto",
    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },
  pageContentContainer: {
    marginLeft: "260px",
    marginBottom: "100px",
    width: "calc(100% - 260px)",
    [theme.breakpoints.down(960)]: {
      margin: "auto",
      width: "97%",
    },
  },
}));
