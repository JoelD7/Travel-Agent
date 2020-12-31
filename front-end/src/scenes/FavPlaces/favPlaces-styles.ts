import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors } from "../../styles";

export const favPlacesStyles = makeStyles((theme: Theme) => ({
  favCard: {
    margin: "10px",
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: Colors.BACKGROUND,
  },
  mainGrid: {
    marginLeft: "265px",
    width: "81%",
  },
  slider: {
    width: "90%",
    display: "flex",
    alignItems: "center",
  },
}));
