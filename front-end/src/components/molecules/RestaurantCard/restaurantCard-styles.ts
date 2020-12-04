import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors, Shadow } from "../../../styles";

export const restaurantCardStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: Font.Family,
    boxShadow: Shadow.MEDIUM,
    height: "210px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  photoGrid: {
    width: "30%",
    height: "100%",
  },
  cardImage: {
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    height: "100%",
    width: "100%",
  },
  cardContentGrid: {
    width: "68%",
    marginLeft: "10px",
  },
  bodyText: {
    fontSize: "14px",
    margin: '10px',
  },
}));
