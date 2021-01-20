import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const thingsToDoStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: Colors.BLUE,
    transition: "background-color .2s ease-in-out",
    "&:hover": {
      backgroundColor: Colors.BLUE_HOVER,
    },
    width: "95%",
  },
  cardSelected: {
    backgroundColor: Colors.BLUE_HOVER,
    transition: "background-color .2s ease-in-out",
    "&:hover": {
      backgroundColor: Colors.BLUE,
    },
    width: "95%",
  },
  mainContainer: {
    fontFamily: Font.Family,
    marginBottom: "40px",
    backgroundColor: Colors.BACKGROUND,
  },
  menuItemRoot: {
    fontFamily: Font.Family,
    fontWeight: "bold",
    borderBottom: `2px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
    color: "white",
    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `3px solid ${Colors.GREEN}`,
      },
    },
    "&.MuiListItem-button": {
      "&:hover": {
        borderBottom: `3px solid ${Colors.GREEN}`,
      },
    },
  },
  parentCategoryBar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    margin: "20px auto",
    justifyContent: "center",
    boxShadow: Shadow.MEDIUM,
    backgroundColor: Colors.BLUE,
    borderRadius: "50px",
    width: "60%",
    position: "relative",
    top: "75px",

    [theme.breakpoints.down(1447)]: {
      width: "70%",
    },
    [theme.breakpoints.down(1233)]: {
      width: "80%",
    },
    [theme.breakpoints.down(1084)]: {
      width: "90%",
    },
  },
  pageContentContainer: {
    width: "80%",
    margin: "40px auto auto auto",
  },
  pageTitleContainer: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    height: "300px",
  },
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

    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  secondaryMenuItems: {
    "&. MuiMenu-paper": {
      left: "388px",
    },
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
