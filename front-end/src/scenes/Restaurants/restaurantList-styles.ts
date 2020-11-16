import { makeStyles, Theme } from "@material-ui/core";
import { FONT } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const restaurantListStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: FONT,
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
}));
