import { Theme, makeStyles } from "@material-ui/core";

export const profileStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    backgroundColor: "white",
  },
  nameGrid: {
    width: "48%",
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
  },
}));
