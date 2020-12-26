import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const restaurantListStyles = makeStyles((theme: Theme) => ({
  card: {
    width: "95%",
    margin: "auto 5px",
  },
  mainContainer: {
    fontFamily: Family,
    backgroundColor: Colors.BACKGROUND,
  },
  pageContentContainer: {
    width: "90%",
    margin: "auto",
  },
  filterGrid: {
    width: "22%",
  },
  filterContainer: {
    boxShadow: Shadow.LIGHT,
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "15px",
  },
  restaurantName: {
    fontSize: "14px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  restaurantCuisines: {
    fontSize: "13px",
    color: "#5f5f5f",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  restaurantsGrid: {
    backgroundColor: Colors.BACKGROUND,
    padding: "15px",
    width: "77%",
    marginLeft: "10px",
  },
  browseByFoodGrid: {
    width: "60%",
    marginLeft: "41px",
  },
  filterButtonGrid: {
    display: "none",
    marginBottom: "20px",
    [theme.breakpoints.down(1040)]: {
      display: "block",
      width: "50%",
    },
  },
  filterTitle: {
    marginBottom: "0px",
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
