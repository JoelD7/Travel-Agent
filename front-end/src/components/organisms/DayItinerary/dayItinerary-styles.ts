import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";

export const dayItineraryStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    backdropFilter: "blur(4px)",
  },
  cardsContainer: {
    width: "95%",
    borderRadius: "10px",
    padding: "15px",
  },
  cardGrid: {
    padding: 10,
    margin: "20px auto",
    borderRadius: "10px",
    boxShadow: Shadow.DARK,
    backgroundColor: Colors.BLUE,
  },
  datetimeGrid: {
    width: "50%",
    [theme.breakpoints.down(585)]: {
      width: "100%",
    },
  },
  detailButtonGrid: {
    width: "50%",
    [theme.breakpoints.down(585)]: {
      marginTop: 10,
      width: "100%",
    },
  },
  dialogTitle: {
    padding: "20px !important",
    marginRight: "10px !important",
    [theme.breakpoints.down(430)]: {
      marginTop: "10px !important",
    },
  },
  iconButton: {
    marginLeft: "auto",
    width: "45px",
    top: 12,
    height: "45px",
    position: "absolute",
    left: "92%",
    [theme.breakpoints.down(500)]: {
      left: "89%",
    },
    [theme.breakpoints.down(430)]: {
      marginTop: 10,
    },
    [theme.breakpoints.down(420)]: {
      left: "84%",
    },
  },
  mainContainer: {
    fontFamily: Font.Family,
  },
  paper: {
    height: "675px",
    backgroundColor: "white",
    width: "700px",
    padding: "10px",
  },
}));
