import { Theme, makeStyles } from "@material-ui/core";

export const profileStyles = makeStyles((theme: Theme) => ({
  firstNameGrid: {
    width: "48%",
    [theme.breakpoints.down(400)]: {
      width: "100%",
    },
  },
  lastNameGrid: {
    width: "48%",
    marginLeft: 15,
    [theme.breakpoints.down(400)]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  mainContainer: {
    backgroundColor: "white",
  },
  navbar: {
    width: "calc(100% - 251px)",
    marginLeft: "auto",
    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },
  pageContentContainer: {
    margin: "auto",
    width: 380,
    [theme.breakpoints.down(400)]: {
      width: "95%",
    },
  },
  progressContainer: {
    height: "85vh",
    marginLeft: "265px",
    width: "calc(100% - 300px)",
    [theme.breakpoints.down(960)]: {
      margin: "auto",
      width: "100%",
    },
  },
}));
