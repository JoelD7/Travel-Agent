import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

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
    marginBottom: "40px",
    backgroundColor: Colors.BACKGROUND,
  },
  menuItemRoot: {
    fontFamily: Font.Family,
    borderBottom: `2px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
    color: Colors.BLUE,
    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `2px solid ${Colors.PURPLE_HOVER}`,
      },
    },
    "&.MuiListItem-button": {
      "&:hover": {
        borderBottom: `2px solid ${Colors.PURPLE_HOVER}`,
      },
    },
  },
  parentCategoryBar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    margin: "20px auto",
    justifyContent: "center",
    boxShadow: Shadow.LIGHT,
    borderRadius: "50px",
    width: "60%",
    backgroundColor: "white",
  },
  pageContentContainer: {
    width: "80%",
    margin: "auto",
  },
  pageContentParent: {},
  activityCard: {
    borderRadius: "10px",
    margin: "10px",
    boxShadow: Shadow.LIGHT3D,
    width: "25%",
  },
  pageSubtitle: {
    marginTop: "20px",
  },
  poiCard: {
    borderRadius: "5px",
    margin: "10px",
    boxShadow: Shadow.LIGHT3D,
    width: "30%",
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
