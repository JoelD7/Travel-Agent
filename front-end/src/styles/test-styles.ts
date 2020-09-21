import { makeStyles, Theme } from "@material-ui/core";
import {
  PURPLE,
  PURPLE_HOVER,
} from "./colors";

export const testStyles = makeStyles((theme: Theme) => ({
  button: {
    backgroundColor: PURPLE,
    color: "white",
    fontFamily: "Quicksand, sans-serif",
    textTransform: "lowercase",

    "&:hover": {
      backgroundColor: PURPLE_HOVER,
    },
  },
}));
