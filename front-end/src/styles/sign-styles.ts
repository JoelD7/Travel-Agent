import { makeStyles, Theme } from "@material-ui/core";
import { BLUE } from "./colors";

export const signStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    padding: "30px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  formGrid: {
    width: "40%",
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
  },
  mainContainer: {
    backgroundColor: "white",
    width: "99vw",
  },
  nameTextField: {
    width: "45%",
    minWidth: '147px',
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
