import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const restaurantDetailsStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: Colors.BACKGROUND,
  },
  pageContentContainer: {
    width: "85%",
    margin: "auto auto 50px auto",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: Shadow.LIGHT,
    padding: "10px",
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
  progressCircleContainer: {
    display: "flex",
    margin: "auto",
    position: "absolute",
    left: "50vw",
    top: "50vh",
  },
  restaurantImage: {
    objectFit: "cover",
    width: "95%",
    maxHeight: "490px",
    borderRadius: "5px",
    margin: "auto",
  },
  tripButtonGrid: {
    margin: "auto 0px auto auto",
    [theme.breakpoints.down(780)]: {
      margin: "10px auto auto auto",
      width: "100%",
    },
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
