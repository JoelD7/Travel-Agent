import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors } from "../../styles";

export const thingsToDoStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: Colors.BLUE,
    width: "95%",
  },
  cardSelected: {
    backgroundColor: Colors.BLUE_HOVER,
    width: "95%",
  },
  mainContainer: {
    fontFamily: Font.Family,
  },
  menuItemRoot: {
    fontFamily: Font.Family,
    borderBottom: `2px solid rgba(0,0,0,0)`,
    fontWeight: "bold",
    margin: "0px 5px",
    color: Colors.PURPLE_HOVER,
  },
  parentCategoryBar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    marginTop: "20px",
    borderTop: "1px solid #cecece",
    borderBottom: "1px solid #cecece",
    justifyContent: "center",
  },
  pageContentContainer: {
    width: "80%",
    margin: "auto",
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
