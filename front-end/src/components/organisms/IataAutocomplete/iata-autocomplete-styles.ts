import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";

export const iataAutocompleteStyles = makeStyles((theme: Theme) => ({
  autocompleteAdornment: {
    position: "absolute",
    right: "12px !important",
  },
  autocompelteListbox: {
    fontFamily: Font.Family,
  },
  autocompleteOption: {
    color: Colors.BLUE,
    fontSize: 14,
    fontWeight: "bold",
  },
  popupIndicatorOpen: {
    transform: "rotate(0deg)",
  },
  navbar: {
    width: "300px",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      fontFamily: Font.Family,
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
  },
  searchBar: {
    "& .MuiOutlinedInput-root": {
      fontFamily: Font.Family,
      "&:hover fieldset": {
        borderColor: Colors.GRAY_BORDER_HOVER,
      },
      "&.Mui-focused fieldset": {
        borderColor: Colors.PURPLE,
      },
    },
  },
  searchBarInput: {
    width: "100%",
    backgroundColor: "white",
    color: Colors.BLUE,
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      position: "relative",
      bottom: 2,
    },
    "& .MuiInputBase-root": {
      height: "32px",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      "&:hover fieldset": {
        borderColor: Colors.GREEN_HOVER,
      },
      "&.Mui-focused fieldset": {
        borderColor: Colors.GREEN_HOVER,
      },
    },
  },
  searchBarInputHome: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "white",
    "& .MuiInputBase-input": {
      position: "relative",
    },
  },
}));
