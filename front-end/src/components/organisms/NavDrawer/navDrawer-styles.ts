import { makeStyles, Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/styles";
import { Font } from "../../../assets";
import { Family } from "../../../assets/fonts";
import { Colors, Shadow } from "../../../styles";

export const drawerButtonStyle: CreateCSSProperties<{}> = {
  boxShadow: Shadow.DARK,
  width: "100%",
  fontSize: 14,
  marginBottom: "20px",
};

export const drawerStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: "#cecece",
    width: "90%",
    margin: "auto",
  },
  drawer: {
    width: "250px",
    backgroundColor: Colors.BLUE,
    height: "96%",
    marginRight: 10,
    borderRadius: 20,
    marginTop: 15,
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
    fontSize: 14,
    "&.MuiTypography-body1": {
      fontFamily: Font.Family,
    },
  },
  routesContainer: {
    display: "none",
    [theme.breakpoints.down(1000)]: {
      display: "block",
    },
  },
}));
