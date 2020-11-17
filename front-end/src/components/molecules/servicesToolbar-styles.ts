import { makeStyles, Theme } from "@material-ui/core";
import { Family } from "../../assets/fonts";
import { Colors } from "../../styles";

export const servicesToolbarStyles = makeStyles((theme: Theme) => ({
  menuItemRoot: {
    fontFamily: Family,
    borderBottom: `2px solid rgba(0,0,0,0)`,
    fontWeight: "bold",
    margin: "0px 5px",
    color: Colors.BLUE,
  },
  servicesToolbar: {
    display: "flex",
    minHeight: "20px",
    height: "40px",
    marginTop: "20px",
    borderTop: "1px solid #cecece",
    borderBottom: "1px solid #cecece",
    justifyContent: "center",

    [theme.breakpoints.down(1000)]: {
      display: "none",
    },
  },
}));
