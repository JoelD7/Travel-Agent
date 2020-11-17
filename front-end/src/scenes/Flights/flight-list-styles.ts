import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const flightListStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: Family,
  },
  datepicker: {
    backgroundColor: "white",
    fontFamily: Family,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "5px",

    "& .MuiIconButton-root": {
      color: Colors.BLUE,
    },

    "& .MuiInputBase-input": {
      padding: "5px 0px 5px 10px",
    },
    "& .MuiInputBase-root": {
      height: "37px",
    },
  },
  datepickerGrid: {
    width: "25%",
    [theme.breakpoints.down(1245)]: {
      width: "33%",
    },
    [theme.breakpoints.down(1083)]: {
      width: "50%",
    },
    [theme.breakpoints.down(640)]: {
      width: "100%",
    },
  },
  destinationTF: {
    width: "100%",
  },
  drawer: {
    width: "250px",
    backgroundColor: Colors.BLUE,
    fontFamily: Family,
    color: "white",
    padding: "10px",
  },
  filtersGrid: {
    border: "1px solid #cecece",
    borderRadius: "5px",
    padding: "10px",
    width: "25%",

    [theme.breakpoints.down(1215)]: {
      width: "30%",
    },
    [theme.breakpoints.down(1040)]: {
      display: "none",
    },
  },
  flightsGrid: {
    padding: "10px",
    width: "65%",
    backgroundColor: "#f6f6f9",

    [theme.breakpoints.down(1215)]: {
      width: "70%",
    },
    [theme.breakpoints.down(1040)]: {
      margin: "auto",
      width: "75%",
    },
    [theme.breakpoints.down(821)]: {
      width: "85%",
    },
    [theme.breakpoints.down(736)]: {
      width: "100%",
    },
  },
  filterButtonGrid: {
    display: "none",
    marginBottom: "20px",
    [theme.breakpoints.down(1040)]: {
      display: "block",
      width: "50%",
    },
  },
  pageContentContainer: {
    width: "85%",
    margin: "20px auto",
    [theme.breakpoints.down(1318)]: {
      width: "95%",
    },
  },
  pageContentContainerGrid: {
    marginTop: "50px",
  },
  pageTitleContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    padding: "10px",
    width: "85%",
  },
  pageTitleContainerPic: {
    backgroundImage: `url('flights.jpg')`,
    backgroundPositionY: "20%",
    backgroundSize: "cover",
    padding: "70px",
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down(1000)]: {
      margin: "auto",
      width: "100%",
    },
  },
  passengerParamGrid: {
    width: "12.5%",
    [theme.breakpoints.down(1245)]: {
      width: "22%",
    },
    [theme.breakpoints.down(1083)]: {
      width: "33%",
    },
  },
  reservationOptionsToolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    paddingLeft: "0px",
  },
  reservationParamText: {
    color: "white",
    marginLeft: "5px",
    marginBottom: "3px",
    marginTop: "5px",
  },
  reservParamGrid: {
    width: "25%",
    [theme.breakpoints.down(1245)]: {
      width: "33%",
    },
    [theme.breakpoints.down(1083)]: {
      width: "50%",
    },
    [theme.breakpoints.down(640)]: {
      width: "100%",
    },
  },
  reservationParamMenuItem: {
    "&. MuiListItem-button": {
      "&:hover": {
        borderColor: "#cecece",
      },
    },
  },
  select: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px",
      borderRadius: "5px",
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
}));
