import { makeStyles, Theme } from "@material-ui/core";
import { FONT } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const hotelsStyles = makeStyles((theme: Theme) => ({
  cardData1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: '0px 10px 10px 10px',
    borderRight: "1px solid #cecece",
  },
  cardData2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  datepicker: {
    backgroundColor: "white",
    fontFamily: FONT,
    width: "100%",
    maxWidth: "100%",
    borderRadius: "10px",

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
    width: "24%",
  },
  filtersGrid: {
    border: "1px solid #cecece",
    borderRadius: "5px",
    padding: "10px",
  },
  hotelCard: {
    height: "221px",
    border: "1px solid black",
    marginLeft: "15px",
    borderRadius: "10px",
    display: 'flex',
  },
  hotelImage: {
    objectFit: "cover",
    height: "100%",
    width: '100%',
  },
  mainContainer: {
    fontFamily: FONT,
  },
  pageContentContainer: {
    marginTop: "50px",
  },
  pageTitleContainer: {
    backgroundColor: Colors.BLUE,
    boxShadow: Shadow.LIGHT,
    borderRadius: "10px",
    padding: "10px",
  },
  revervationParamsGrid: {
    width: "14%",
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
      fontFamily: FONT,
    },
  },
}));
