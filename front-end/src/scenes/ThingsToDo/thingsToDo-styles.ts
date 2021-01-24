import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const thingsToDoStyles = makeStyles((theme: Theme) => ({
  card: {
    transition: "all .2s ease-in-out",
    width: "92%",
    borderRadius: "15px",
    boxShadow: Shadow.MEDIUM,
    "&:hover": {
      transform: "scale(1.1)",
      width: "87%",
      marginLeft: "8px",
    },
  },
  cardSelected: {
    transition: "all .2s ease-in-out",
    width: "87%",
    borderRadius: "15px",
    transform: "scale(1.1)",
    marginLeft: "8px",
    boxShadow: Shadow.MEDIUM,
  },

  categoryNameContainer: {
    height: "auto",
    marginTop: "auto",
  },
  mainContainer: {
    fontFamily: Font.Family,
    marginBottom: "40px",
    backgroundColor: Colors.BACKGROUND,
  },
  menuItemRoot: {
    fontFamily: Font.Family,
    fontWeight: "bold",
    borderBottom: `3px solid rgba(0,0,0,0)`,
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
  menuItemChild: {
    fontFamily: Font.Family,
    borderBottom: `3px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
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
  menuItemSelect: {
    borderBottom: `3px solid rgba(0,0,0,0)`,
    margin: "0px 5px",

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
    bottom: "10px",

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
    position: "relative",
    bottom: "137px",
  },
  pageTitleContainer: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    height: "55vh",
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
    borderRadius: "10px",
    margin: "auto",
    marginBottom: "10px",
    boxShadow: Shadow.LIGHT3D,
    width: "87%",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      width: "82%",
    },
  },
  poiCardGrid: {
    marginTop: "10px",
    [theme.breakpoints.down(965)]: {
      width: "110%",
      position: "relative",
      right: "36px",
    },
    [theme.breakpoints.down(906)]: {
      width: "120%",
      right: "70px",
    },
    [theme.breakpoints.down(824)]: {
      marginTop: "20px",
    },
    [theme.breakpoints.down(796)]: {
      width: "100%",
      position: "initial",
    },
  },
  poiCardContainer: {
    // display: "flex",
    // width: "100%",
  },
  poiSlider: {
    width: "108%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    right: "57px",
  },
  rating: {
    marginBottom: "15px",
  },
  secondaryMenuItems: {
    "&. MuiMenu-paper": {
      left: "388px",
    },
  },
  select: {
    height: "30px",
    "& .MuiOutlinedInput-input": {
      padding: "0px 14px",
      borderRadius: "10px",
    },
    "&.MuiInputBase-root": {
      fontFamily: Font.Family,
      backgroundColor: Colors.BLUE,
      boxShadow: Shadow.MEDIUM,
      color: "white",
    },
  },
  selectControl: {
    width: "230px",
    marginLeft: "10px",
    alignSelf: "center",
  },
  sortGrid: {
    marginLeft: "auto",
    [theme.breakpoints.down(824)]: {
      marginLeft: "0px",
      width: "100%",
    },
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
