import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Colors } from "../../../styles";

export const finderStyles = makeStyles((theme: Theme) => ({
  label: {
    display: "block",
  },
  input: {
    width: 200,
    color: "black",
  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    color: "black",
    backgroundColor: "white",
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "black",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "black",
    },
  },
  searchBar: {
    marginLeft: "10px",
    width: "300px",
    borderRadius: "10px",
    color: "white",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "10px",
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
    "& .MuiOutlinedInput-input": {
      color: Colors.GRAY,
    },
  },
  searchBarHome: {
    marginLeft: "10px",
    width: "300px",
    borderRadius: "10px",
    color: "white",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: "10px",
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
  },
}));
