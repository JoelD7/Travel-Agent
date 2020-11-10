import { makeStyles, Theme } from "@material-ui/core";
import { FONT } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const flightListStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    fontFamily: FONT,
  },
  datepicker: {
    backgroundColor: "white",
    fontFamily: FONT,
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
    width: "20%",
  },
  destinationTF: {
    width: "100%",
  },
  filtersGrid: {
    border: "1px solid #cecece",
    borderRadius: "5px",
    padding: "10px",
    width: "25%",

    [theme.breakpoints.down(1280)]: {
      display: "none",
    },
  },
  filterButtonGrid: {
    display: "none",
    marginBottom: '20px',
    [theme.breakpoints.down(1280)]: {
      display: "block",
      width: "50%",
    },
  },
  pageContentContainer: {
    marginTop: "50px",
  },
  pageTitleContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    padding: "10px",
    width: '85%',
  },
  pageTitleContainerPic:{
    backgroundImage: `url('flights.jpg')`,
    backgroundPositionY: '20%',
    backgroundSize: 'cover',
    padding: '20px',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
  },
  passengerParamGrid: {
    width: "12.5%",
  },
  reservationOptionsToolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    paddingLeft: "0px",
  },
  reservationParamText: {
    color: 'white',
    marginLeft: "5px",
    marginBottom: "3px",
    marginTop: "5px",
  },
  reservParamGrid: {
    width: "25%",
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
      fontFamily: FONT,
    },
  },
}));
