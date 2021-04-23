import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const restaurantListStyles = makeStyles((theme: Theme) => ({
  backgroundImage: {
    objectFit: "cover",
    position: "absolute",
    height: "55vh",
    width: "100%",
  },
  card: {
    width: "95%",
    margin: "auto 5px",
  },
  drawer: {
    width: "250px",
    backgroundColor: "transparent",
    fontFamily: Family,
    padding: "10px",
    "&.MuiPaper-elevation16": {
      boxShadow: "2px 2px 3px rgba(0,0,0,0)",
    },
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: Colors.BACKGROUND,
  },
  filterGrid: {
    width: "22%",
    [theme.breakpoints.down(1040)]: {
      display: "none",
    },
  },
  restaurantsGrid: {
    padding: "15px",
    width: "77%",
    [theme.breakpoints.down(1040)]: {
      width: "100%",
    },
  },
  filterButtonGrid: {
    display: "none",
    [theme.breakpoints.down(1040)]: {
      display: "block",
      width: "50%",
    },
  },
  filterContainer: {
    boxShadow: Shadow.MEDIUM3D,
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "15px",
  },
  pagination: {
    margin: "20px 0px 40px auto",
    [theme.breakpoints.down(620)]: {
      margin: "20px 0px 40px",
    },
  },
  pageContentContainer: {
    width: "90%",
    margin: "auto",
    position: "relative",
    zIndex: 1,
  },
  pageTitleContainer: {
    "&::before": {
      content: '""',
      background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
      width: "100%",
      position: "absolute",
      height: "55vh",
      zIndex: 1,
    },
    height: "45vh",
    [theme.breakpoints.down(1040)]: {
      height: "40vh",
    },
    [theme.breakpoints.down(430)]: {
      height: "55vh",
    },
  },
  restaurantName: {
    fontSize: "14px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  restaurantCardContainer: {
    borderRadius: "10px",
    padding: "15px",
  },
  restaurantCuisines: {
    fontSize: "13px",
    color: "#5f5f5f",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  browseByFoodGrid: {
    width: "60%",
    marginLeft: "41px",
  },
  filterTitle: {
    marginBottom: "0px",
    marginTop: "5px",
    color: Colors.BLUE,
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  slideshowGrid: {
    width: "100%",
  },
  titleAndToolbarContainer: {
    [theme.breakpoints.down(1000)]: {
      height: "60%",
    },
  },
  textButton: {
    padding: "0px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
      textDecoration: "underline black solid",
    },
  },
  topSorter: {
    margin: "0px auto 0px 0px !important",
    height: "max-content",
    width: "157px !important",
  },
}));
