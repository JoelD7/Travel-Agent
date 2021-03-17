import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";

export const dayItineraryStyles = makeStyles((theme: Theme) => ({
  cardsContainer: {
    width: "95%",
    backgroundColor: Colors.BACKGROUND,
    borderRadius: "10px",
    padding: "15px",
  },
  cardGrid: {
    padding: "5px",
    margin: "20px auto",
    borderRadius: "10px",
    boxShadow: Shadow.DARK,
    backgroundColor: Colors.BLUE,
  },
  iconButton: {
    marginLeft: "auto",
    marginBottom: "32px",
  },
  mainContainer: {
    fontFamily: Font.Family,
  },
  paper: {
    height: "675px",
    backgroundColor: Colors.BACKGROUND,
    width: "700px",
    padding: "10px",
  },
}));
