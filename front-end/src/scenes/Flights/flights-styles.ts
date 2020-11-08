import { makeStyles, Theme } from "@material-ui/core";
import { FONT } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";

export const flightStyles = makeStyles((theme: Theme) => ({
  datepicker: {
    backgroundColor: "white",
    fontFamily: FONT,
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
  destinationTF: {
    width: "100%",
  },
  menuItemRoot: {
    fontFamily: FONT,
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
  reservationContainer: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "20px",
    marginLeft: "20px",
    width: "35%",
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
      fontFamily: FONT,
    },
  },
  topContainer: {
    height: "525px",
    padding: "10px",
    fontFamily: FONT,
    display: "flex",
    alignItems: "center",
  },
}));
