import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const flightStyles = makeStyles((theme: Theme) => ({
  card: {
    width: "100%",
    margin: "10px",

    [theme.breakpoints.down(518)]: {
      margin: "10px 0px",
    },
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
  dealsContainer: {
    width: "70%",
    margin: "auto",
    [theme.breakpoints.down(1348)]: {
      width: "80%",
    },
    [theme.breakpoints.down(1150)]: {
      width: "90%",
    },
    [theme.breakpoints.down(990)]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down(518)]: {
      width: "101%",
    },
  },
  dealGrid: {
    width: "50%",
    [theme.breakpoints.down(990)]: {
      width: "77%",
    },
    [theme.breakpoints.down(865)]: {
      width: "85%",
    },
    [theme.breakpoints.down(635)]: {
      width: "100%",
    },
  },
  dealTitle: {
    fontWeight: "bold",
    fontSize: "16px",
    margin: "0px 0px",
    fontFamily: Family,
  },
  dealSubtitle: {
    fontSize: "13px",
    color: Colors.BLUE,
    margin: "0px auto",
  },
  largeGrid: {
    width: "50%",
    [theme.breakpoints.down(600)]: {
      width: "100%",
    },
  },
  largeGridFull: {
    width: "100%",
  },
  destinationTF: {
    width: "100%",
  },
  mainContainer: {
    fontFamily: Family,
  },
  menuItemRoot: {
    fontFamily: Family,
    borderBottom: `2px solid rgba(0,0,0,0)`,
    margin: "0px 5px",
    fontSize: "14px",
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
  pageTitleContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    padding: "10px",
  },
  passengerParamGrid: {
    width: "33%",
    [theme.breakpoints.down(600)]: {
      width: "50%",
    },
  },
  reservationContainer: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "20px",
    marginLeft: "20px",
    width: "550px",

    [theme.breakpoints.down(650)]: {
      width: "90%",
    },
  },
  reservationOptionsToolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    paddingLeft: "0px",
  },
  reservationParamText: {
    color: Colors.BLUE,
    marginLeft: "5px",
    marginBottom: "3px",
    marginTop: "5px",
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
  topContainer: {
    padding: "30px",
    fontFamily: Family,
    display: "flex",
    alignItems: "center",
  },
}));
