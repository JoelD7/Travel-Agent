import { makeStyles, Theme } from "@material-ui/core";
import { Colors, Shadow } from "../../../styles";

export const restaurantDetailSliderStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    backdropFilter: "blur(4px)",
  },
  imageSlider: {
    width: "68vw",
    display: "flex",
    alignItems: "center",
    height: "100%",
    margin: "auto",

    [theme.breakpoints.down(1600)]: {
      width: "64vw",
    },
    [theme.breakpoints.down(1445)]: {
      width: "70vw",
    },
    [theme.breakpoints.down(1312)]: {
      width: "77vw",
    },
    [theme.breakpoints.down(1155)]: {
      width: "88vw",
    },
    [theme.breakpoints.down(837)]: {
      width: "92vw",
    },
    [theme.breakpoints.down(793)]: {
      width: "90vw",
    },
    [theme.breakpoints.down(635)]: {
      width: "88vw",
    },
    [theme.breakpoints.down(530)]: {
      width: "86vw",
    },
    [theme.breakpoints.down(450)]: {
      width: "94vw",
    },
  },
  paperImage: {
    maxWidth: "94vw",
    width: "auto",
    backgroundColor: Colors.TRANSPARENT,
    "&.MuiPaper-elevation24": {
      boxShadow: Shadow.TRANSPARENT,
    },
  },
  paperScrollPaper: {
    maxHeight: "fit-content",
  },
  photoContainer: {
    height: "451px",
    [theme.breakpoints.down(676)]: {
      height: "57vw",
    },
  },
  photoContainerImage: {
    maxWidth: "1004px",
    height: "90vh",
    display: "flex",
    width: "100%",
  },
  photo: {
    objectFit: "cover",
    height: "100%",
    borderRadius: "10px",
    width: "97%",
    margin: "auto 5px",

    [theme.breakpoints.down(1140)]: {},
  },
  photoInSlider: {
    objectFit: "contain",
    height: "90vh",
    width: "inherit",
    margin: "auto",
    borderRadius: "10px",
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
