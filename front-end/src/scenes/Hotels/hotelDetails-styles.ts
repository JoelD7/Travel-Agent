import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../assets";
import { Colors, Shadow } from "../../styles";

export const hotelDetailsStyles = makeStyles((theme: Theme) => ({
  aboutHotelGrid: {
    width: "70%",
  },
  aboutHotelContainer: {
    borderRadius: "10px",
    backgroundColor: "white",
    padding: "35px",
    boxShadow: Shadow.MEDIUM,
  },
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: Colors.BACKGROUND,
  },
  pageContainer: {
    width: "85%",
    margin: "auto",
  },
  photoContainer: {
    height: "400px",
    margin: "50px 0px",
  },
  photo: {
    objectFit: "cover",
    height: "100%",
    borderRadius: "10px",
    width: "97%",
    margin: "auto 5px",

    [theme.breakpoints.down(1140)]: {
      width: "auto",
      margin: "auto",
    },
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
