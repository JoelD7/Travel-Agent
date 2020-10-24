import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { Colors } from "..";
import { home } from "../../assets";
import { FONT } from "../../assets/fonts";

export const home_explore_button: CreateCSSProperties<{}> = {
  border: "3px solid white",
  borderRadius: "50px",
  color: "white",
  margin: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.35)",
};

export const homeStyles = makeStyles((theme: Theme) => ({
  exploreButtonContainer: {
    display: " flex",
    width: "100%",
    justifyContent: "center",
  },
  homeImageDiv: {
    borderRadius: "10px",
    height: "521px",
    width: "100%",
    display: "flex",
    backgroundImage: `url(${home})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  homeImageText: {
    fontFamily: '"Quicksand", sans-serif',
    color: "white",
    width: "100%",
  },
  locationQueryTF: {
    maxHeight: "30px",
    marginLeft: "10px",
    width: "200px",
    padding: "5px",

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
  },
  locationQueryText: {
    fontFamily: FONT,
  },
  mainPhotoGrid: {
    width: "60%",
    padding: "10px",
  },
  reservationGrid: {
    width: "40%",
  },
  searchLocationContainer: {
    width: "80%",
    display: "flex",
    margin: "auto",
    marginTop: "30px",
    justifyContent: "center",
  },
  servicesContainer: {
    width: "80%",
    display: "flex",
    margin: "auto",
    justifyContent: "space-evenly",
  },
  serviceIcon: {
    boxShadow: "5px 5px 5px #cecece",
    "& .MuiIconButton-root": {
      "&:hover": {
        backgroundColor: Colors.PURPLE_HOVER,
      },
    },
  },
  serviceIconPurple: {
    boxShadow: "5px 5px 5px #cecece",
    backgroundColor: Colors.PURPLE,

    "& .MuiIconButton-root": {
      "&:hover": {
        backgroundColor: Colors.PURPLE_HOVER,
      },
    },
  },
  serviceName: {
    textAlign: "center",
    marginTop: "2",
    color: Colors.BLUE,
    fontSize: "14px",
  },
}));
