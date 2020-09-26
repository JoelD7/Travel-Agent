import { makeStyles, Theme } from "@material-ui/core";
import { BLUE } from "./colors";
import { loginImage, signup } from "../assets/images";

export const signStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  formGrid: {
    width: "40%",
    minWidth: "412px",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    paddingTop: "0px",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  imageGrid: {
    width: "60%",
    height: "100vh",

    [theme.breakpoints.down(1045)]: {
      display: "none",
    },
  },
  mainContainerSignUp: {
    backgroundColor: "white",
    width: "99vw",
    height: "100vh",

    [theme.breakpoints.down(1045)]: {
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url(${signup})`,
      backgroundSize: "cover",
    },
  },
  mainContainerLogin: {
    backgroundColor: "white",
    width: "99vw",
    height: "100vh",

    [theme.breakpoints.down(1045)]: {
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url(${loginImage})`,
      backgroundSize: "cover",
    },
  },
  nameTextField: {
    width: "45%",
    minWidth: "147px",
  },
  logotype: {
    width: "40%",
    height: "40%",
  },
  title: {
    color: BLUE,
    fontWeight: "bolder",
    fontSize: "42px,",
  },
}));
