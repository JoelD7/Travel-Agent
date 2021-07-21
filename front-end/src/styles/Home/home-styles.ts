import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { Colors, Shadow } from "..";
import { Font, homeItinerary } from "../../assets";
import { Family } from "../../assets/fonts";

export const home_explore_button: CreateCSSProperties<{}> = {
  border: "3px solid white",
  fontSize: "18px",
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
  autocompelteListbox: {
    fontFamily: Font.Family,
  },
  autocompleteOption: {
    color: Colors.BLUE,
    fontWeight: "bold",
  },
  card: {
    boxShadow: Shadow.LIGHT3D,
    width: "94%",
  },
  createTripButton: {
    boxShadow: `5px 5px 10px ${Colors.BLUE}`,
  },
  exploreButtonContainer: {
    display: "flex",
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
      fontSize: 14,
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
  datepickerItemGridFlightFull: {
    borderRadius: "20px",
    margin: "auto",
    width: "100%",
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
    [theme.breakpoints.down(560)]: {
      height: "auto",
    },
  },
  homeImageText: {
    color: "white",
    padding: "10px",
    width: "100%",
  },
  locationParamsGrid: {
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
    fontFamily: Family,
  },
  mainPhotoGrid: {
    [theme.breakpoints.down(1150)]: {
      width: "43%",
      marginRight: 10,
    },
    [theme.breakpoints.down(930)]: {
      display: "none",
    },
    width: "60%",
    padding: "10px",
  },
  menuItemRoot: {
    fontFamily: Font.Family,
    borderBottom: `2px solid rgba(0,0,0,0)`,
    marginRight: 5,
    fontSize: 13,
    color: Colors.BLUE,

    "&.MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottom: `2px solid ${Colors.BLUE}`,
      },
    },
    "&.MuiListItem-button": {
      "&:hover": {
        borderBottom: `2px solid ${Colors.BLUE}`,
      },
    },
  },
  reservationOptionsToolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    paddingLeft: "0px",
  },
  reservationGrid: {
    [theme.breakpoints.down(1150)]: {
      width: "55%",
      margin: "auto",
    },
    [theme.breakpoints.down(930)]: {
      width: "85%",
    },
    width: "40%",
    marginTop: "20px",
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
    boxShadow: Shadow.LIGHT3D,

    [theme.breakpoints.down(990)]: {
      width: "100%",
    },
  },
  popupIndicatorOpen: {
    transform: "rotate(0deg)",
  },
  planTripGrid: {
    width: "50%",
    [theme.breakpoints.down(990)]: {
      width: "60%",
    },
  },
  redirectTripContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM3D,
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
    boxShadow: Shadow.LIGHT3D,
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

  reservationParamsGrid: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#eeeeee",
    width: "100%",
    margin: "auto",
  },
  reservationParamsBox: {
    borderRadius: "20px",
  },
  reservationContainer: {
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  searchLocationContainer: {
    minWidth: 250,
    width: "40%",
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
      fontSize: 14,
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
  mainContainer: {
    fontFamily: Font.Family,
    backgroundColor: "white",
  },
  serviceName: {
    textAlign: "center",
    fontSize: "14px !important",
    marginTop: "6px !important",
  },
  servicesTitle: {
    textAlign: "center",
    marginTop: "25px !important",
    marginBottom: "25px !important",
  },
  searchBarInput: {
    backgroundColor: "rgba(0,0,0,0)",
    color: Colors.BLUE,
    "& .MuiInputBase-input": {
      position: "relative",
      bottom: "4px",
    },
  },
  slider: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
