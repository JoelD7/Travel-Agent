import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const restaurantListStyles = makeStyles((theme: Theme) => ({
  card: {
    width: "95%",
    margin: "auto 5px",
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: Colors.BACKGROUND,
  },
  pageContentContainer: {
    width: "90%",
    margin: "auto",
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
    boxShadow: Shadow.LIGHT,
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "15px",
  },
  pageTitleContainer: {
    height: "300px",
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Travel-Agent/restaurant.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
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
    // background:
    //   "linear-gradient(90deg, rgb(245, 245, 245) 0%, rgb(240, 240, 240) 50%, rgb(245, 245, 245) 100%)",
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
  textButton: {
    padding: "0px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
      textDecoration: "underline black solid",
    },
  },
}));
