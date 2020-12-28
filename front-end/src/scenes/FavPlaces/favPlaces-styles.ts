import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors } from "../../styles";

export const favPlacesStyles = makeStyles((theme: Theme) => ({
  favCard: {
    margin: "10px",
    width: "25%",
  },
  mainContainer: {
    fontFamily: Font.Family,
  },
  mainGrid: {
    marginLeft: "265px",
    width: "81%",
  },
}));
