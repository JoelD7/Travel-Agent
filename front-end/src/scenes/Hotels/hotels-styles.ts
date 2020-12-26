import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const hotelsStyles = makeStyles((theme: Theme) => ({
  cardData1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 10px 10px 10px",
    borderRight: "1px solid #cecece",
    width: "33%",

    [theme.breakpoints.down(715)]: {
      width: "50%",
    },
  },
  cardData2: {
    display: "flex",
    padding: "0px 10px 10px 10px",

    width: "33%",

    [theme.breakpoints.down(715)]: {
      width: "50%",
    },
  },
  cardText: {
    fontSize: "14px",
  },
  datepicker: {
    backgroundColor: "white",
    fontFamily: Family,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "4px",

    "& .MuiIconButton-root": {
      color: Colors.BLUE,
    },

    "& .MuiInputBase-input": {
      padding: "5px 0px 5px 10px",
    },
  },
  datepickerItemGrid: {
    borderRadius: "5px",
    marginTop: "5px",
    width: "24%",

    [theme.breakpoints.down(940)]: {
      width: "35%",
    },
    [theme.breakpoints.down(900)]: {
      width: "40%",
    },
    [theme.breakpoints.down(620)]: {
      width: "50%",
    },
    [theme.breakpoints.down(490)]: {
      width: "100%",
    },
  },
  defaultContentContainer: {
    [theme.breakpoints.down(950)]: {
      display: "none",
    },
  },
  smContentContainer: {
    display: "none",

    [theme.breakpoints.down(950)]: {
      display: "flex",
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
    borderRadius: "5px",
    width: "25%",
    boxShadow: Shadow.LIGHT,
    backgroundColor: "white",
    padding: "1px 15px 15px 15px",

    [theme.breakpoints.down(1280)]: {
      display: "none",
    },
  },
  filterButtonGrid: {
    display: "none",
    marginBottom: "20px",
    [theme.breakpoints.down(1280)]: {
      display: "block",
      width: "50%",
    },
  },
  hotelsGrid: {
    width: "75%",
    [theme.breakpoints.down(1280)]: {
      width: "100%",
    },
  },
  hotelCard: {
    boxShadow: Shadow.LIGHT,
    marginLeft: "15px",
    borderRadius: "10px",
    display: "flex",
    width: "100%",

    [theme.breakpoints.down(1280)]: {
      marginLeft: "0px",
    },
  },
  hotelImage: {
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    height: "100%",
    width: "100%",

    [theme.breakpoints.down(950)]: {
      borderRadius: "10px 10px 0px 0px",
    },
  },
  hotelImageGrid: {
    width: "33%",

    [theme.breakpoints.down(950)]: {
      width: "100%",
    },
  },
  hotelContentGrid: {
    width: "66%",

    [theme.breakpoints.down(950)]: {
      width: "100%",
    },
  },
  mainContainer: {
    fontFamily: Family,
    backgroundColor: Colors.BACKGROUND,
  },
  pageContainer: {
    padding: '0px 115px',
    margin: "20px auto",
  },
  pageContentContainer: {
    marginTop: "50px",
  },
  pageTitleContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.MEDIUM,
    borderRadius: "10px",
    padding: "10px",
  },
  revervationParamsGrid: {
    width: "14%",

    [theme.breakpoints.down(940)]: {
      width: "25%",
    },
    [theme.breakpoints.down(620)]: {
      width: "33%",
    },
  },
  reservationParamText: {
    color: "white",
    marginLeft: "5px",
    marginBottom: "3px",
    marginTop: "5px",
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
  textButton: {
    padding: "0px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
      textDecoration: "underline black solid",
    },
  },
}));
