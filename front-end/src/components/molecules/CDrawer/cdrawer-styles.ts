import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { FONT } from "../../../assets/fonts";
import { Colors, Shadow } from "../../../styles";

export const drawerButtonStyle: CreateCSSProperties<{}> = {
  boxShadow: Shadow.DARK,
  width: "100%",
  marginBottom: '20px',
};

export const drawerStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: "250px",
    backgroundColor: Colors.BLUE,
  },
  drawerText: {
    fontFamily: FONT,
    color: "white",
  },
  listItem: {
    "&:hover": {
      backgroundColor: Colors.BLUE_HOVER,
    },
  },
}));
