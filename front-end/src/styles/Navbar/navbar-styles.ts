import { makeStyles, Theme } from "@material-ui/core";
import { FONT } from "../../assets/fonts";

export const navbarStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: "white",
    height: "60px",
  },
  logotype: {
    maxHeight: "40px",
  },
  rightChildrenContainer:{
    marginLeft: 'auto',
  },
  searchBar: {
    maxHeight: "30px",
    marginLeft: '10px',
    width: '300px',
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#cecece",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cecece",
      },
    },
  },
  searchBarText: {
    fontFamily: FONT,
    fontSize: '14px',
  },
  toolbar: {
    minHeight: "60px",
    display: "flex",
  },
}));
