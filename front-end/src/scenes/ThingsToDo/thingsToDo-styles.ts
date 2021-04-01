import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const thingsToDoStyles = makeStyles((theme: Theme) => ({
  background: {
    height: "55vh",
    width: "100%",
    position: "absolute",
    zIndex: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
  },
  card: {
    transition: "all .2s ease-in-out",
    width: "92%",
    borderRadius: "15px",
    boxShadow: Shadow.MEDIUM,
    margin: "20px 15px",
    "&:hover": {
      transform: "scale(1.1)",
      width: "87%",
      margin: "20px auto 20px 23px",
    },
  },
  cardPlaceholder: {
    transition: "all .2s ease-in-out",
    width: "92%",
    borderRadius: "15px",
    boxShadow: Shadow.MEDIUM,
    filter: "blur(4px)",
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
  categoryIcon: {
    backgroundColor: Colors.PURPLE,
    borderRadius: "50px",
    height: "26px",
    marginRight: "5px",
  },
  mainContainer: {
    fontFamily: Font.Family,
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
    margin: "25px auto 40px auto",
    position: "relative",

    [theme.breakpoints.down(1035)]: {
      width: "90%",
    },
  },
  pageTitleContainer: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    height: "35vh",
  },
  pageTitleTextGrid: {
    margin: "0px auto",
    [theme.breakpoints.down(1000)]: {
      margin: "55px auto",
    },
  },
  activityCard: {
    borderRadius: "10px",
    margin: "10px",
    boxShadow: Shadow.LIGHT3D,
    width: "29%",

    [theme.breakpoints.down(1300)]: {
      width: "31%",
    },
    [theme.breakpoints.down(1160)]: {
      width: "47%",
    },
    [theme.breakpoints.down(763)]: {
      width: "75%",
      margin: "10px auto",
    },
  },
  pageSubtitle: {
    marginTop: "20px",
  },
  poiCard: {
    borderRadius: "10px",
    margin: "10px auto",
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
    [theme.breakpoints.down(824)]: {
      marginTop: "20px",
    },
  },
  poiCardGridLoading: {
    marginTop: "10px",
    height: "332px",
    [theme.breakpoints.down(824)]: {
      marginTop: "20px",
    },
  },
  poiCardGridLoadingMore: {
    marginTop: "10px",
    height: "644px",
    [theme.breakpoints.down(824)]: {
      marginTop: "20px",
    },
  },
  poiCardContainer: {
    height: "332px",
    position: "absolute",
  },
  poiCardContainerLoading: {
    height: "332px",
    position: "absolute",
    filter: "blur(4px)",
  },
  poiSlider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  poiSliderLoading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    filter: "blur(4px)",
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
  selectIcon: {
    color: "white",
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
    position: "absolute",
  },
  toursTitle: {
    marginTop: "40px !important",
    [theme.breakpoints.down(960)]: {
      marginTop: "60px !important",
    },
  },
}));
