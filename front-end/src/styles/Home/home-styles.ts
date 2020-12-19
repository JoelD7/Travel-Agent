import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { Colors, Shadow } from "..";
import { home, homeItinerary } from "../../assets";
import { Family } from "../../assets/fonts";

export const home_explore_button: CreateCSSProperties<{}> = {
  border: "3px solid white",
  fontSize: "18px",
  borderRadius: "50px",
  color: "white",
  margin: "auto",

  "& .MuiButton-label": {
    fontFamily: "Montserrat",
  },
};

export const style_createTripButton: CreateCSSProperties<{}> = {
  boxShadow: Shadow.DARK,
};

export const homeStyles = makeStyles((theme: Theme) => ({
  card: {
    width: "95%",
  },
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
    fontFamily: Family,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "20px",

    "& .MuiIconButton-root": {
      color: Colors.BLUE,
    },

    "& .MuiInputBase-input": {
      padding: "5px 0px 5px 10px",
    },
  },
  datepickerItemGrid: {
    borderRadius: "20px",
    marginTop: "5px",
    width: "50%",

    [theme.breakpoints.down(600)]: {
      width: "100%",
    },
  },
  datepickerItemGridCar: {
    [theme.breakpoints.down(740)]: {
      width: "100%",
      margin: "auto",
    },
    borderRadius: "20px",
    marginTop: "5px",
    width: "50%",
  },
  datepickerItemGridFlight: {
    [theme.breakpoints.down(560)]: {
      width: "100%",
      margin: "auto",
    },
    borderRadius: "20px",
    marginTop: "5px",
    width: "50%",
  },
  drawerOpenButton: {
    display: "none",
    [theme.breakpoints.down(1000)]: {
      display: "inline",
    },
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
  },
  topContainer: {
    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) ), url(https://images.unsplash.com/photo-1484804959297-65e7c19d7c9f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1014&q=80)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginBottom: "40px",
    height: "100vh",
  },
  homeImageText: {
    color: "white",
    padding: "10px",
    width: "100%",
  },
  locationParamsGrid: {
    width: "50%",
    [theme.breakpoints.down(595)]: {
      width: "100%",
    },
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
    fontFamily: Family,
  },
  mainPhotoGrid: {
    [theme.breakpoints.down(1150)]: {
      width: "100%",
    },
    width: "60%",
    padding: "10px",
  },

  nextButton: {
    backgroundColor: "white",
  },
  passengersClassGrid: {
    width: "50%",
    [theme.breakpoints.down(580)]: {
      width: "100%",
    },
  },
  planTripPhotoContainer: {
    width: "50%",
    backgroundImage: `url(${homeItinerary})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",

    [theme.breakpoints.down(990)]: {
      width: "100%",
    },
  },
  planTripGrid: {
    width: "50%",
    [theme.breakpoints.down(990)]: {
      width: "60%",
    },
  },
  redirectTripContainer: {
    backgroundColor: Colors.BLUE,
    width: "90%",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    margin: "40px auto",

    [theme.breakpoints.down(990)]: {
      display: "none",
    },
  },
  redirectTripContainerHidden: {
    backgroundColor: Colors.BLUE,
    width: "90%",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    margin: "40px auto",
    display: "none",

    [theme.breakpoints.down(990)]: {
      width: "60%",
      margin: "40px auto",
      display: "block",
    },
  },
  reservationGrid: {
    [theme.breakpoints.down(1150)]: {
      width: "85%",
      margin: "auto",
    },
    width: "40%",
    marginTop: "20px",
    padding: "10px",
  },
  reservationParamsGrid: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#eeeeee",
    width: "90%",
    margin: "auto",
  },
  reservationParamsBox: {
    borderRadius: "20px",
  },
  reservationContainer: {
    padding: "10px 0px",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  searchLocationContainer: {
    width: "80%",
    display: "flex",
    margin: "auto",
    marginTop: "30px",
    justifyContent: "center",
  },
  section: {
    width: "85%",
    margin: "auto",
    marginBottom: "60px",
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
      fontFamily: Family,
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

  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
