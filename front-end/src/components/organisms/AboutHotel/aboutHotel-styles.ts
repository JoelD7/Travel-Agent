import { makeStyles, Theme } from "@material-ui/core";
import { Shadow } from "../../../styles";

export const aboutHotelStyles = makeStyles((theme: Theme) => ({
  aboutHotelContainer: {
    borderRadius: "10px",
    backgroundColor: "white",
    padding: "35px",
    boxShadow: Shadow.MEDIUM,
  },

  limitedAboutText: {
    display: "-webkit-box",
    WebkitLineClamp: 6,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
}));
