import { makeStyles, Theme } from "@material-ui/core";

export const notFoundStyles = makeStyles((theme: Theme) => ({
  imageContainer: {
    marginLeft: "20px",
    [theme.breakpoints.down(515)]: {
      display: "none",
    },
  },
}));
