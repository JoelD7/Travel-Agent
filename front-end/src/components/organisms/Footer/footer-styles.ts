import { makeStyles, Theme } from "@material-ui/core";
import { Colors } from "../../../styles";

export const footerStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    width: "80%",
    margin: "auto",
  },
  dividerGrid: {
    width: "5%",
  },
  link: {
    color: "white",
    marginTop: "5px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  logo: {
    height: "44px",
  },
  logoGrid: {
    width: "35%",
  },
  linkGrid: {
    width: "20%",
  },
  mainContainer: {
    backgroundColor: Colors.BLUE,
    width: "96.46vw",
    padding: "40px 20px",
    color: "white",
  },
}));
