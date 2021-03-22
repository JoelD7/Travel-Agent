import { makeStyles, Theme } from "@material-ui/core";
import { Colors } from "../../../styles";

export const footerStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down(1000)]: {
      width: "85%",
    },
    [theme.breakpoints.down(735)]: {
      width: "100%",
    },
    [theme.breakpoints.down(660)]: {
      width: "90%",
    },
  },
  contentGrid: {
    width: "65%",
    [theme.breakpoints.down(1000)]: {
      width: "100%",
      marginTop: "25px",
    },
  },
  dividerGrid: {
    width: "7%",
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
    width: "35%",
    [theme.breakpoints.down(1042)]: {
      width: "30%",
    },
    [theme.breakpoints.down(1000)]: {
      width: "100%",
    },
  },
  linkGrid: {
    width: "31%",
    [theme.breakpoints.down(735)]: {
      width: "25%",
    },
    [theme.breakpoints.down(660)]: {
      width: "50%",
      marginBottom: "20px",
    },
    [theme.breakpoints.down(450)]: {
      width: "100%",
      marginBottom: "20px",
    },
  },
  mainContainer: {
    backgroundColor: Colors.BLUE,
    padding: "40px 20px",
    color: "white",
  },
}));
