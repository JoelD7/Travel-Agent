import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const restaurantListStyles = makeStyles((theme: Theme) => ({
  card: {
    width: "95%",
    margin: 'auto 5px',
  },
  mainContainer: {
    fontFamily: Family,
  },
  pageContentContainer: {
    width: "85%",
    margin: "auto",
  },
  filterGrid: {
    border: "1px solid #cecece",
    borderRadius: "5px",
    padding: "10px",
    width: "25%",
  },
  restaurantName:{
    fontSize: "14px",
    fontWeight: 'bold',
  },
  restaurantCuisines: {
    fontSize: "13px",
    color: "#5f5f5f",
  },
  restaurantsGrid: {
    width: "74%",
    marginLeft: "10px",
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
  slideshowGrid:{
    width: '100%',
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
