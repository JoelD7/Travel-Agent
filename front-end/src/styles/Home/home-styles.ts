import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { Colors, Shadow } from "..";
import { home, homeItinerary } from "../../assets";
import { FONT } from "../../assets/fonts";

export const home_explore_button: CreateCSSProperties<{}> = {
  border: "3px solid white",
  fontSize: "18px",
  borderRadius: "50px",
  color: "white",
  margin: "auto",
};

export const style_createTripButton: CreateCSSProperties<{}> = {
  boxShadow: Shadow.SHADOW_DARK,
};

export const homeStyles = makeStyles((theme: Theme) => ({
  createTripButton: {
    boxShadow: `5px 5px 10px ${Colors.BLUE}`,
  },
  exploreButtonContainer: {
    display: " flex",
    width: "100%",
    justifyContent: "center",
  },
  datepicker: {
    backgroundColor: "white",
    fontFamily: FONT,
    borderRadius: "20px",
    padding: "0px 10px 0px 10px",

    "& .MuiIconButton-root": {
      color: Colors.BLUE,
    },
  },
  datepickerItemGrid: {
    borderRadius: "20px",
    marginTop: "5px",
  },
  reservationParamText: {
    color: Colors.BLUE,
    marginLeft: "5px",
    marginBottom: "3px",
    marginTop: "5px",
  },
  homeImageDiv: {
    borderRadius: "10px",
    height: "521px",
    width: "100%",
    display: "flex",
    backgroundImage: `url(${home})`,
    backgroundSize: "cover",
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
  planTripPhotoContainer:{
    backgroundImage: `url(${homeItinerary})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: '10px',
  },
  redirectTripContainer: {
    backgroundColor: Colors.BLUE,
    width: "90%",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    margin: "40px auto",
  },
  reservationGrid: {
    width: "40%",
    marginTop: "20px",
  },
  reservationParamsGrid: {
    marginTop: "20px",
    borderRadius: "10px",
    backgroundColor: "#eeeeee",
    width: "90%",
    margin: "auto",
  },
  reservationParamsBox: {
    borderRadius: "20px",
  },
  searchLocationContainer: {
    width: "80%",
    display: "flex",
    margin: "auto",
    marginTop: "30px",
    justifyContent: "center",
  },
  section2: {
    width: "85%",
    margin: "auto",
    marginBottom: "40px",
    marginTop: "10px",
  },
  select: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px",
      borderRadius: "10px",
    },

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },

    "& .MuiMenuItem-root": {
      fontFamily: FONT,
    },
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
