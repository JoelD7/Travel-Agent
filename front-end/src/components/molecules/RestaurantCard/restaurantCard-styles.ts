import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Shadow } from "../../../styles";

export const restaurantCardStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: Font.Family,
    boxShadow: Shadow.LIGHT,
    height: "210px",
    borderRadius: "5px",
    marginBottom: "20px",
    backgroundColor: "white",
  },
  cardImage: {
    objectFit: "cover",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    height: "100%",
    width: "100%",
  },
  photoGrid: {
    width: "30%",
    height: "100%",
    [theme.breakpoints.down(762)]: {
      width: "40%",
    },
    [theme.breakpoints.down(635)]: {
      display: "none",
    },
  },
  cardContentGrid: {
    width: "68%",
    marginLeft: "10px",
    [theme.breakpoints.down(762)]: {
      width: "58%",
    },
    [theme.breakpoints.down(635)]: {
      width: "100%",
    },
  },
  bodyText: {
    fontSize: "14px",
    margin: "10px",
  },
}));
