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
    [theme.breakpoints.down(910)]: {
      width: "100%",
    },
    width: "60%",
    color: "white",
  },
  detailsContainer: {
    borderRadius: "5px",
    padding: "15px",
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.LIGHT,
  },
  imageGrid: {
    [theme.breakpoints.down(910)]: {
      width: "100%",
    },
    width: "38%",
    marginLeft: "10px",
    height: "500px",
  },
  restaurantImage: {
    objectFit: "cover",
    height: "100%",
    margin: "auto",
  },
  tripButtonGrid: {
    margin: "auto 0px auto auto",
    [theme.breakpoints.down(780)]: {
      margin: "10px auto auto auto",
      width: "100%",
    },
  },
}));
