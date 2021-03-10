import { makeStyles, Theme } from "@material-ui/core";
import { Shadow } from "../../../styles";

export const hotelCardStyles = makeStyles((theme: Theme) => ({
  addressContactGrid: {
    display: "flex",
    justifyContent: "center",
    padding: "0px 10px 10px 10px",
    width: "49%",
    alignItems: "center",
    [theme.breakpoints.down(715)]: {
      width: "50%",
    },
  },
  cardText: {
    fontSize: "14px",
  },
  defaultContentContainer: {
    height: "73%",
    [theme.breakpoints.down(950)]: {
      display: "none",
    },
  },
  hotelCard: {
    boxShadow: Shadow.LIGHT3D,
    margin: "0px 0px 15px 0px",
    borderRadius: "10px",
    display: "flex",
    backgroundColor: "white",
    width: "100%",

    [theme.breakpoints.down(1280)]: {
      marginLeft: "0px",
    },
  },
  hotelContentGrid: {
    width: "66%",

    [theme.breakpoints.down(950)]: {
      width: "100%",
    },
    [theme.breakpoints.down(621)]: {
      padding: "10px",
    },
  },
  hotelImage: {
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    height: "100%",
    width: "100%",
    maxHeight: "193px",

    [theme.breakpoints.down(950)]: {
      borderRadius: "10px 10px 0px 0px",
      maxHeight: "100%",
    },
  },
  hotelImageGrid: {
    width: "33%",

    [theme.breakpoints.down(950)]: {
      width: "100%",
      height: "210px",
    },
  },
  priceAndDetailsGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 10px 10px 10px",
    width: "49%",

    [theme.breakpoints.down(715)]: {
      width: "50%",
    },
  },
  smContentContainer: {
    display: "none",

    [theme.breakpoints.down(950)]: {
      display: "flex",
    },
  },
}));
