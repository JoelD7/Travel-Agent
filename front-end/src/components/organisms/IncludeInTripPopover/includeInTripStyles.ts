import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";

export const includeInTripStyles = makeStyles((theme: Theme) => ({
  datepicker: {
    backgroundColor: "white",
    fontFamily: Font.Family,
    width: "100%",
    maxWidth: "282px",
    borderRadius: "4px",

    "& .MuiIconButton-root": {
      color: Colors.BLUE,
    },

    "& .MuiInputBase-input": {
      padding: "6px 7px 7px",
    },
  },
  labelGrid: {
    width: "25%",
    [theme.breakpoints.down(430)]: {
      width: "100%",
    },
  },
  popoverPaper: {
    width: "375px",
    maxHeight: "280px",
    padding: "15px",
    borderRadius: "10px",
    [theme.breakpoints.down(430)]: {
      width: "85vw",
    },
  },
  select: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px",
      borderRadius: "10px",
      margin: "0px 5px",
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
      fontFamily: Font.Family,
    },
  },
  selectGrid: {
    width: "75%",
    [theme.breakpoints.down(430)]: {
      width: "100%",
      marginBottom: "10px",
    },
  },
  selectIcon: {
    color: Colors.BLUE,
  },
}));
