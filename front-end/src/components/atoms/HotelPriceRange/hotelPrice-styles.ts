import { makeStyles, Theme } from "@material-ui/core";
import { Colors } from "../../../styles";

export const hotelPriceStyles = makeStyles((theme: Theme) => ({
  sliderRoot: {
    color: Colors.PURPLE,
    width: "90%",
    margin: "auto",
    position: "relative",
  },
  sliderRailTrack: {
    height: "5px",
  },
  sliderThumb: {
    height: "16px",
    width: "16px",
  },
}));
