import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const flightListStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: Family,
    backgroundColor: Colors.BACKGROUND,
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
      height: "32px",
    },
    "& .MuiInput-underline::after": {
      borderBottom: `2px solid ${Colors.GREEN_HOVER}`,
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
    "&.MuiInputBase-root": {
      height: "30px",
    },
  },
  drawer: {
    width: "250px",
    backgroundColor: Colors.BLUE,
    fontFamily: Family,
    color: "white",
    padding: "10px",
  },
  filtersGrid: {
    backgroundColor: "white",
    boxShadow: Shadow.MEDIUM3D,
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
    paddingLeft: "20px",
    width: "65%",

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
    margin: "120px auto 20px auto",
    [theme.breakpoints.down(1318)]: {
      width: "95%",
    },
  },
  pageContentContainerGrid: {
    marginTop: "50px",
  },
  resevationParamsContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    padding: "10px",
    width: "85%",
    margin: "20px auto auto auto",
    position: "relative",
    top: "20px",
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
    height: "300px",
    backgroundPositionY: "20%",
    backgroundSize: "cover",

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
  selectControl: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: Colors.GREEN_HOVER,
      },
      "&.Mui-focused fieldset": {
        borderColor: Colors.GREEN_HOVER,
      },
    },
  },
  select: {
    height: "32px",
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px",
    },

    "& .MuiMenuItem-root": {
      fontFamily: Family,
    },
  },
}));
