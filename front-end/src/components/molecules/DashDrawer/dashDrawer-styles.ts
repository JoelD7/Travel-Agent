import { makeStyles, Theme } from "@material-ui/core";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";

export const dashDrawerStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: "250px",
    backgroundColor: Colors.BLUE,
    zIndex: 1,
    paddingTop: "30px",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  drawerText: {
    fontFamily: Font.Family,
    color: "white",
  },
  listItem: {
    "&:hover": {
      backgroundColor: Colors.BLUE_HOVER,
    },
  },
  listItemRoot: {
    borderBottom: `2px solid ${Colors.BLUE}`,
    "&.Mui-selected": {
      backgroundColor: Colors.GREEN_DRAWER,
      borderBottom: `2px solid ${Colors.GREEN_DRAWER}`,
      color: Colors.BLUE,

      "&:hover": {
        backgroundColor: Colors.GREEN_DRAWER,
      },
    },
  },
}));
