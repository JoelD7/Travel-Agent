import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const restaurantDetailsStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: "white",
  },
  pageContentContainer: {
    width: "85%",
    margin: "auto auto 50px auto",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "10px",
  },
  detailsGrid: {
    width: "41%",
    color: "white",
    [theme.breakpoints.down(1214)]: {
      width: "77%",
      margin: "auto",
    },
    [theme.breakpoints.down(995)]: {
      width: "88%",
      margin: "auto",
    },
  },
  detailsContainer: {
    borderRadius: "5px",
    padding: "15px",
    backgroundColor: "white",
    boxShadow: Shadow.LIGHTER3D,
  },
  imageGrid: {
    width: "58%",
    marginLeft: "10px",
    height: "500px",
    [theme.breakpoints.down(1214)]: {
      width: "87%",
      margin: "auto",
    },
    [theme.breakpoints.down(995)]: {
      width: "100%",
    },
    [theme.breakpoints.down(676)]: {
      height: "auto",
      marginBottom: "20px",
    },
  },
  progressCircleContainer: {
    display: "flex",
    margin: "auto",
    position: "absolute",
    left: "50vw",
    top: "50vh",
  },
  photoContainer: {
    height: "470px",
    margin: "50px 0px",
  },

  restaurantImage: {
    objectFit: "cover",
    width: "95%",
    height: "100%",
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
    height: "100%",
  },
}));
