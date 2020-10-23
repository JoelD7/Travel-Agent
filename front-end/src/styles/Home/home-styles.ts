import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { home } from "../../assets";

export const home_explore_button: CreateCSSProperties<{}> = {
  border: "3px solid white",
  borderRadius: "50px",
  color: "white",
  margin: 'auto',
  backgroundColor: "rgba(255, 255, 255, 0.35)",
};

export const homeStyles = makeStyles((theme: Theme) => ({
  homeImageDiv: {
    borderRadius: "10px",
    height: "521px",
    backgroundImage: `url(${home})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  mainPhotoGrid: {
    width: "60%",
    border: "1px solid black",
    padding: "10px",
  },
  reservationGrid: {
    width: "40%",
    border: "1px solid black",
  },
}));
