import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";

export const footerStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    width: "90%",
    margin: "auto",

    [theme.breakpoints.down(735)]: {
      width: "100%",
    },
    [theme.breakpoints.down(660)]: {
      width: "90%",
    },
  },
  contentGrid: {
    width: "70%",
  },
  currencyGrid: {
    width: "15&",
  },
  dividerGrid: {
    width: "3%",
    [theme.breakpoints.down(660)]: {
      display: "none",
    },
  },
  link: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  linkText: {
    marginTop: "6px ​!important",
  },
  logo: {
    height: "44px",
  },
  logoGrid: {
    width: "30%",
  },
  linkGrid: {
    width: "25%",
  },
  mainContainer: {
    backgroundColor: Colors.BLUE,
    padding: "40px 20px",
    color: "white",
  },
  selectControl: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: Colors.GREEN_HOVER,
      },
      "&.Mui-focused fieldset": {
        borderColor: Colors.GREEN_HOVER,
      },
    },
  },
  select: {
    height: "32px",
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px",
    },

    "& .MuiMenuItem-root": {
      fontFamily: Font.Family,
    },
  },
}));
