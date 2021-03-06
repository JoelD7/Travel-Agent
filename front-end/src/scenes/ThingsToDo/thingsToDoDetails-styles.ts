import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const thingsToDoDetailsStyles = makeStyles((theme: Theme) => ({
  aboutContainer: {
    borderRadius: "10px",
    background: "white",
    padding: "20px",
    boxShadow: Shadow.MEDIUM,
  },
  aboutGrid: {
    width: "48%",
    [theme.breakpoints.down(910)]: {
      width: "100%",
    },
  },
  detailsGrid: {
    [theme.breakpoints.down(910)]: {
      width: "100%",
    },
    width: "50%",
    color: "white",
  },
  detailsContainer: {
    borderRadius: "5px",
    padding: "15px",
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.LIGHT,
    color: "white",
  },
  divider: {
    background: "#cecece",
    marginBottom: "10px",
  },
  footerContainer: {
    position: "relative",
    marginTop: "250px",
    width: "90%",
    marginLeft: "auto",

    [theme.breakpoints.down(1000)]: {
      width: "100%",
    },
  },
  images: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    margin: "auto",
  },
  imageGrid: {
    [theme.breakpoints.down(910)]: {
      width: "100%",
    },
    [theme.breakpoints.down(676)]: {
      height: "60vw",
    },
    width: "48%",
    marginLeft: "10px",
    height: "500px",
  },
  imageGridNoImage: {
    [theme.breakpoints.down(910)]: {
      width: "100%",
    },
    width: "48%",
    marginLeft: "10px",
    height: "500px",
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: "white",
  },
  pageContentContainer: {
    width: "85%",
    margin: "auto auto 150px auto",
    borderRadius: "10px",
    boxShadow: Shadow.LIGHT,
    padding: "10px",
    backgroundColor: "white",
  },
  progressCircleContainer: {
    display: "flex",
    margin: "auto",
    position: "absolute",
    left: "50vw",
    top: "50vh",
  },
  titleRatingGrid: {
    width: "66.6%",
    [theme.breakpoints.down(400)]: {
      width: "100%",
      marginBottom: "10px",
    },
  },
  tripButtonGrid: {
    margin: "auto 0px auto auto",
    [theme.breakpoints.down(780)]: {
      margin: "10px auto auto auto",
      width: "100%",
    },
  },
}));
