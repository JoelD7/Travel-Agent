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
    backgroundColor: 'white',
  },
  photoGrid: {
    width: "30%",
    height: "100%",
  },
  cardImage: {
    objectFit: "cover",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
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
