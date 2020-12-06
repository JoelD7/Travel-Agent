import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const restaurantDetailsStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: Font.Family,
  },
  pageContentContainer: {
    width: "85%",
    margin: "auto",
  },
  detailsGrid: {
    width: "60%",
    color: "white",
  },
  detailsContainer:{
    borderRadius: "5px",
    padding: "15px",
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.LIGHT,
  },
  imageGrid: {
    width: "40%",
    height: "500px",
  },
  restaurantImage: {
    objectFit: "cover",
    height: "100%",
  },
}));
