import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";

export const footerStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    width: "90%",
    margin: "auto",
    [theme.breakpoints.down(1250)]: {
      width: "95%",
    },
  },
  contentGrid: {
    width: "70%",
    [theme.breakpoints.down(1050)]: {
      width: "100%",
      marginTop: "40px",
    },
  },
  currencyGrid: {
    width: "20%",
    [theme.breakpoints.down(1250)]: {
      width: "25%",
    },
    [theme.breakpoints.down(770)]: {
      width: "20%",
    },
    [theme.breakpoints.down(650)]: {
      width: "25%",
    },
    [theme.breakpoints.down(630)]: {
      width: "50%",
    },
    [theme.breakpoints.down(433)]: {
      width: "100%",
      marginBottom: "30px",
    },
  },
  dividerGrid: {
    width: "3%",
    [theme.breakpoints.down(630)]: {
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
    [theme.breakpoints.down(1290)]: {
      width: "27%",
    },
    [theme.breakpoints.down(1050)]: {
      width: "100%",
    },
  },
  linkGrid: {
    width: "25%",
    [theme.breakpoints.down(1530)]: {
      width: "22%",
    },
    [theme.breakpoints.down(770)]: {
      width: "30%",
      marginBottom: "30px",
    },
    [theme.breakpoints.down(630)]: {
      width: "50%",
    },
    [theme.breakpoints.down(433)]: {
      width: "100%",
    },
  },
  mainContainer: {
    backgroundColor: Colors.BLUE,
    padding: "40px 20px",
    color: "white",
  },
  selectControl: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 4,

      "&:hover fieldset": {
        borderColor: `${Colors.GREEN_HOVER} !important`,
      },
      "&.Mui-focused fieldset": {
        borderColor: `${Colors.GREEN_HOVER} !important`,
      },
    },
  },
  select: {
    height: "32px",
    backgroundColor: "white",
    "& .MuiOutlinedInput-input": {
      padding: "10px 25px 10px 15px !important",
      fontFamily: `${Font.Family} !important`,
    },

    "& .MuiMenuItem-root": {
      fontFamily: `${Font.Family} !important`,
    },
  },
  selectMenuItem: {
    fontFamily: `${Font.Family}`,
    color: "black",
    border: "2px solid white",
  },
}));
