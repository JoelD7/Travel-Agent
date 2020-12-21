import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { Family } from "../../../assets/fonts";
import { Colors, Shadow } from "../../../styles";

export const drawerButtonStyle: CreateCSSProperties<{}> = {
  boxShadow: Shadow.DARK,
  width: "100%",
  marginBottom: "20px",
};

export const drawerStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: "250px",
    backgroundColor: Colors.BLUE,
  },
  drawerText: {
    fontFamily: Family,
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
