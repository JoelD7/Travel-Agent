import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";

export const iataAutocompleteStyles = makeStyles((theme: Theme) => ({
  autocompleteAdornment: {
    position: "absolute",
    top: "-5px",
  },
  autocompelteListbox: {
    fontFamily: Font.Family,
  },
  autocompleteOption: {
    color: Colors.BLUE,
    fontWeight: "bold",
  },
  popupIndicatorOpen: {
    transform: "rotate(0deg)",
  },
  searchBar: {
    marginLeft: "10px",
    width: "300px",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
  },
  searchBarInput: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
    color: Colors.BLUE,
    "& .MuiInputBase-input": {
      position: "relative",
      bottom: "4px",
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