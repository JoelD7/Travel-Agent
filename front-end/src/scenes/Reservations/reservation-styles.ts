import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors } from "../../styles";

export const reservationStyles = makeStyles((theme: Theme) => ({
  hotelCard: {
    borderRadius: "10px",
    width: "25%",
    margin: "5px",
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: Colors.BACKGROUND,
  },
  pageContentGrid: {},
}));
