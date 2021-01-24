import { makeStyles, Theme } from "@material-ui/core";
import { Colors, Shadow } from "../../../styles";

export const restaurantSlidesStyles = makeStyles((theme: Theme) => ({
  card: {
    width: "91%",
    margin: "auto 5px",
    boxShadow: Shadow.LIGHT,
  },
  restaurantName: {
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
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  slideshowGrid: {
    width: "100%",
    backgroundColor: Colors.BACKGROUND,
    borderRadius: " 10px",
    padding: "10px",
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
