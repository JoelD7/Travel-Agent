import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { Font } from "../../../assets";
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
      borderBottom: "2px solid rgba(0,0,0,0)",
    },
  },
  listItemRoot: {
    borderBottom: `2px solid ${Colors.BLUE}`,
    "&.Mui-selected": {
      backgroundColor: Colors.GREEN,
      borderBottom: `2px solid ${Colors.GREEN}`,
      color: Colors.BLUE,

      "&:hover": {
        backgroundColor: Colors.GREEN,
      },
    },
  },
  listItemText: {
    "&.MuiTypography-body1": {
      fontFamily: Font.Family,
    },
  },
}));
